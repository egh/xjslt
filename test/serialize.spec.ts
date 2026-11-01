/*
 * Copyright (C) 2021-2026 Erik Hetzner
 *
 * This file is part of XJSLT.
 *
 * XJSLT is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * XJSLT is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with XJSLT. If not, see
 * <https://www.gnu.org/licenses/>.
 */

import * as slimdom from "slimdom";
import { compile } from "../src/compile";
import { serialize } from "../src/xjslt";
import { expect } from "@jest/globals";

const input = slimdom.parseXmlDocument("<doc><a>1</a></doc>");

async function run(stylesheet: string): Promise<Map<string, any>> {
  const transform = await compile(
    slimdom.parseXmlDocument(
      `<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">${stylesheet}</xsl:stylesheet>`,
    ),
    new URL("http://example.org"),
  );
  return transform(input, {});
}

async function serializeDefault(stylesheet: string): Promise<string> {
  return serialize((await run(stylesheet)).get("#default"));
}

describe("xml output method", () => {
  test("is the default", async () => {
    expect(
      await serializeDefault(
        `<xsl:template match="/"><out><b/></out></xsl:template>`,
      ),
    ).toEqual(`<?xml version="1.0" encoding="UTF-8" ?><out><b/></out>`);
  });

  test("honors omit-xml-declaration on the unnamed output definition", async () => {
    expect(
      await serializeDefault(
        `<xsl:output omit-xml-declaration="yes"/>
         <xsl:template match="/"><out/></xsl:template>`,
      ),
    ).toEqual(`<out/>`);
  });

  test("honors standalone on the unnamed output definition", async () => {
    expect(
      await serializeDefault(
        `<xsl:output standalone="yes"/>
         <xsl:template match="/"><out/></xsl:template>`,
      ),
    ).toEqual(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><out/>`);
  });

  test("later unnamed output definitions override earlier ones", async () => {
    expect(
      await serializeDefault(
        `<xsl:output omit-xml-declaration="no" standalone="yes"/>
         <xsl:output omit-xml-declaration="yes"/>
         <xsl:template match="/"><out/></xsl:template>`,
      ),
    ).toEqual(`<out/>`);
  });
});

describe("html output method", () => {
  const page = `
    <html>
      <head>
        <meta charset="UTF-8"/>
        <script>if (1 &lt; 2 &amp;&amp; true) { console.log("ok"); }</script>
        <style>div &gt; p { color: red; }</style>
      </head>
      <body>
        <div class="empty"></div>
        <p>a &lt; b &amp; c</p>
        <br/>
        <input type="checkbox" checked="checked"/>
      </body>
    </html>`;
  const expected =
    `<!DOCTYPE html>` +
    `<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">` +
    `<meta charset="UTF-8">` +
    `<script>if (1 < 2 && true) { console.log("ok"); }</script>` +
    `<style>div > p { color: red; }</style></head>` +
    `<body><div class="empty"></div><p>a &lt; b &amp; c</p><br>` +
    `<input checked type="checkbox"></body></html>`;

  test("serializes as HTML when method='html'", async () => {
    expect(
      await serializeDefault(
        `<xsl:output method="html" indent="no"/>
         <xsl:template match="/">${page}</xsl:template>`,
      ),
    ).toEqual(expected);
  });

  test("is chosen by default when the document element is html", async () => {
    expect(
      await serializeDefault(`<xsl:template match="/">${page}</xsl:template>`),
    ).toEqual(expected);
  });

  test("is not chosen by default for other document elements", async () => {
    expect(
      await serializeDefault(
        `<xsl:template match="/"><div><br/></div></xsl:template>`,
      ),
    ).toEqual(`<?xml version="1.0" encoding="UTF-8" ?><div><br/></div>`);
  });

  test("outputs doctype-public and doctype-system", async () => {
    expect(
      await serializeDefault(
        `<xsl:output method="html" doctype-public="-//W3C//DTD HTML 4.01//EN" doctype-system="http://www.w3.org/TR/html4/strict.dtd"/>
         <xsl:template match="/"><html><body/></html></xsl:template>`,
      ),
    ).toEqual(
      `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"><html><body></body></html>`,
    );
  });

  test("honors include-content-type='no'", async () => {
    expect(
      await serializeDefault(
        `<xsl:output method="html" include-content-type="no"/>
         <xsl:template match="/"><html><head><title>t</title></head></html></xsl:template>`,
      ),
    ).toEqual(`<!DOCTYPE html><html><head><title>t</title></head></html>`);
  });

  test("does not escape < in attribute values or & before {", async () => {
    expect(
      await serializeDefault(
        `<xsl:output method="html"/>
         <xsl:template match="/"><p title="a &lt; b &amp; &quot;c&quot; &amp;{{d}}"/></xsl:template>`,
      ),
    ).toEqual(`<!DOCTYPE html><p title="a < b &amp; &quot;c&quot; &{d}"></p>`);
  });

  test("treats elements in the XHTML namespace as HTML", async () => {
    expect(
      await serializeDefault(
        `<xsl:output method="html"/>
         <xsl:template match="/"><html xmlns="http://www.w3.org/1999/xhtml"><body><hr/><p/></body></html></xsl:template>`,
      ),
    ).toEqual(
      `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><body><hr><p></p></body></html>`,
    );
  });

  test("serializes elements in other namespaces as XML", async () => {
    expect(
      await serializeDefault(
        `<xsl:output method="html"/>
         <xsl:template match="/"><div><svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0"/></svg></div></xsl:template>`,
      ),
    ).toEqual(
      `<!DOCTYPE html><div><svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0"/></svg></div>`,
    );
  });

  test("declares namespaces of prefixed attributes", async () => {
    expect(
      await serializeDefault(
        `<xsl:output method="html"/>
         <xsl:template match="/" xmlns:x="urn:x"><a x:b="1" xml:lang="en"/></xsl:template>`,
      ),
    ).toEqual(`<!DOCTYPE html><a xmlns:x="urn:x" x:b="1" xml:lang="en"></a>`);
  });

  test("serializes comments and processing instructions", async () => {
    expect(
      await serializeDefault(
        `<xsl:output method="html"/>
         <xsl:template match="/"><div><xsl:comment>c</xsl:comment><xsl:processing-instruction name="pi">x</xsl:processing-instruction></div></xsl:template>`,
      ),
    ).toEqual(`<!DOCTYPE html><div><!--c--><?pi x></div>`);
  });

  test("applies to xsl:result-document", async () => {
    const results = await run(
      `<xsl:output name="h" method="html"/>
       <xsl:template match="/">
         <xsl:result-document href="out.html" format="h"><html><body><br/></body></html></xsl:result-document>
         <xsl:result-document href="out2.html" method="html" include-content-type="no"><html><head/></html></xsl:result-document>
       </xsl:template>`,
    );
    expect(serialize(results.get("out.html"))).toEqual(
      `<!DOCTYPE html><html><body><br></body></html>`,
    );
    expect(serialize(results.get("out2.html"))).toEqual(
      `<!DOCTYPE html><html><head></head></html>`,
    );
  });
});

describe("named output definitions", () => {
  test("do not inherit unnamed settings for the principal result", async () => {
    expect(
      await serializeDefault(
        `<xsl:output method="text" standalone="yes"/>
         <xsl:output name="xmlFormat" omit-xml-declaration="yes"/>
         <xsl:template match="/">
           <xsl:result-document format="xmlFormat"><root>hello</root></xsl:result-document>
         </xsl:template>`,
      ),
    ).toEqual("<root>hello</root>");
  });

  test("empty named definitions use their own defaults", async () => {
    const results = await run(
      `<xsl:output method="text" omit-xml-declaration="yes"/>
       <xsl:output name="empty"/>
       <xsl:template match="/">
         <xsl:result-document format="empty"><root>hello</root></xsl:result-document>
       </xsl:template>`,
    );
    expect(serialize(results.get("#default"))).toEqual(
      `<?xml version="1.0" encoding="UTF-8" ?><root>hello</root>`,
    );
  });

  test("unnamed result documents still inherit defaults and honor overrides", async () => {
    const results = await run(
      `<xsl:output method="html" include-content-type="no"/>
       <xsl:template match="/">
         <xsl:result-document><html><head/></html></xsl:result-document>
         <xsl:result-document href="plain" method="text"><r>hello</r></xsl:result-document>
       </xsl:template>`,
    );
    expect(serialize(results.get("#default"))).toEqual(
      "<!DOCTYPE html><html><head></head></html>",
    );
    expect(serialize(results.get("plain"))).toEqual("hello");
  });

  test("are matched by expanded QName", async () => {
    const results = await run(
      `<xsl:output name="a:f" method="text" xmlns:a="urn:f"/>
       <xsl:output name="b:f" method="xml" omit-xml-declaration="yes" xmlns:b="urn:g"/>
       <xsl:template match="/" xmlns:c="urn:f">
         <xsl:result-document href="x" format="c:f"><r>t</r></xsl:result-document>
       </xsl:template>`,
    );
    expect(serialize(results.get("x"))).toEqual("t");
  });

  test("must exist", async () => {
    await expect(
      run(
        `<xsl:template match="/"><xsl:result-document format="nope"><r/></xsl:result-document></xsl:template>`,
      ),
    ).rejects.toThrow("XTDE1460");
  });
});

describe("xhtml output method", () => {
  test("uses XML syntax with HTML conventions", async () => {
    expect(
      await serializeDefault(
        `<xsl:output method="xhtml" omit-xml-declaration="yes"/>
         <xsl:template match="/"><html xmlns="http://www.w3.org/1999/xhtml"><head><script>1 &lt; 2</script></head><body><div/><br/><input checked="checked"/></body></html></xsl:template>`,
      ),
    ).toEqual(
      `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><script>1 &lt; 2</script></head><body><div></div><br /><input checked="checked" /></body></html>`,
    );
  });

  test("outputs an XML declaration unless omitted", async () => {
    expect(
      await serializeDefault(
        `<xsl:output method="xhtml" include-content-type="no"/>
         <xsl:template match="/"><html/></xsl:template>`,
      ),
    ).toEqual(
      `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE html><html></html>`,
    );
  });
});

describe("text output method", () => {
  test("outputs the string value of the result", async () => {
    expect(
      await serializeDefault(
        `<xsl:output method="text"/>
         <xsl:template match="/"><r>a &lt; <b>b</b><!-- c --></r></xsl:template>`,
      ),
    ).toEqual(`a < b`);
  });
});

describe("serialization regressions", () => {
  test("normalizes prefixed HTML, SVG and MathML element names", async () => {
    const result = await serializeDefault(
      `<xsl:output method="html"/>
       <xsl:template match="/">
         <h:html xmlns:h="http://www.w3.org/1999/xhtml">
           <h:body><h:p>Hello</h:p><h:script>1 &lt; 2</h:script>
             <s:svg xmlns:s="http://www.w3.org/2000/svg"><s:path/></s:svg>
             <m:math xmlns:m="http://www.w3.org/1998/Math/MathML"><m:mi>x</m:mi></m:math>
           </h:body>
         </h:html>
       </xsl:template>`,
    );
    expect(result).toEqual(
      '<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><body><p>Hello</p><script>1 < 2</script>' +
        '<svg xmlns="http://www.w3.org/2000/svg"><path/></svg>' +
        '<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>x</mi></math></body></html>',
    );
  });

  test("normalization preserves attribute namespaces and fixes the default namespace", () => {
    const document = slimdom.parseXmlDocument(
      '<h:html xmlns="urn:other" xmlns:h="http://www.w3.org/1999/xhtml" h:flag="yes"><h:body><child/></h:body></h:html>',
    );
    const result = serialize({ document, method: "html" });
    expect(result).toEqual(
      '<!DOCTYPE html><html xmlns:h="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml" h:flag="yes"><body><child xmlns="urn:other"/></body></html>',
    );
  });

  test.each(["html", "xhtml"])(
    "%s preserves dynamically constructed XML attributes",
    async (method) => {
      const result = await serializeDefault(
        `<xsl:output method="${method}" omit-xml-declaration="yes"/>
       <xsl:template match="/">
         <html xmlns="http://www.w3.org/1999/xhtml">
           <xsl:attribute name="lang" namespace="http://www.w3.org/XML/1998/namespace">de</xsl:attribute>
           <xsl:attribute name="space" namespace="http://www.w3.org/XML/1998/namespace">preserve</xsl:attribute>
         </html>
       </xsl:template>`,
      );
      const root = slimdom.parseXmlDocument(result).documentElement;
      expect(
        root.getAttributeNS("http://www.w3.org/XML/1998/namespace", "lang"),
      ).toBe("de");
      expect(
        root.getAttributeNS("http://www.w3.org/XML/1998/namespace", "space"),
      ).toBe("preserve");
      expect(root.hasAttribute("lang")).toBe(false);
    },
  );

  test.each(["html", "xhtml"])(
    "%s replaces existing content-type metadata",
    async (method) => {
      const result = await serializeDefault(
        `<xsl:output method="${method}" omit-xml-declaration="yes"/>
       <xsl:template match="/">
         <html xmlns="http://www.w3.org/1999/xhtml"><head>
           <meta http-equiv=" Content-TYPE " content="text/html; charset=ISO-8859-1"/>
           <meta http-equiv="Content-Type" content="text/html; charset=ASCII"/>
           <meta name="description" content="keep"/>
           <meta http-equiv="refresh" content="30"/>
         </head></html>
       </xsl:template>`,
      );
      expect(result.match(/charset=/g)).toHaveLength(1);
      expect(result).toContain("text/html; charset=UTF-8");
      expect(result).toContain('name="description"');
      expect(result).toContain('http-equiv="refresh"');
    },
  );

  test.each(["html", "xhtml"])(
    "%s retains existing metadata when insertion is disabled",
    async (method) => {
      const result = await serializeDefault(
        `<xsl:output method="${method}" include-content-type="no"/>
       <xsl:template match="/">
         <html><head><meta http-equiv="Content-Type" content="original"/></head></html>
       </xsl:template>`,
      );
      expect(result).toContain('content="original"');
      expect(result).not.toContain("charset=UTF-8");
    },
  );

  test("generated XHTML metadata has the head's namespace", async () => {
    const result = await serializeDefault(
      `<xsl:output method="xhtml" omit-xml-declaration="yes"/>
       <xsl:template match="/">
         <h:html xmlns:h="http://www.w3.org/1999/xhtml"><h:head/></h:html>
       </xsl:template>`,
    );
    const document = slimdom.parseXmlDocument(result);
    expect(
      document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "meta"),
    ).toHaveLength(1);
  });

  test.each(["script", "style"])(
    "preserves raw text and descendant attributes inside %s",
    async (element) => {
      const result = await serializeDefault(
        `<xsl:output method="html"/>
       <xsl:template match="/">
         <html><${element} title="a &amp; b"><b title="a &amp; b"><i>a &amp; b &lt; c</i></b></${element}><p>a &amp; b</p></html>
       </xsl:template>`,
      );
      expect(result).toEqual(
        `<!DOCTYPE html><html><${element} title="a &amp; b"><b title="a & b"><i>a & b < c</i></b></${element}><p>a &amp; b</p></html>`,
      );
    },
  );

  test("XHTML still escapes script descendants", async () => {
    const result = await serializeDefault(
      `<xsl:output method="xhtml" omit-xml-declaration="yes"/>
       <xsl:template match="/">
         <html><script><b title="a &amp; b">a &amp; b &lt; c</b></script></html>
       </xsl:template>`,
    );
    expect(result).toContain('<b title="a &amp; b">a &amp; b &lt; c</b>');
  });
});
