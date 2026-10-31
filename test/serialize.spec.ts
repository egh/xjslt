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
