import { compile } from "../src/compile";
import * as slimdom from "slimdom";
import { evaluateXPathToNodes } from "fontoxpath";

test("xsl:attribute unprefixed name gets no namespace even with default namespace in scope", async () => {
  const xslt = slimdom.parseXmlDocument(`
    <xsl:stylesheet
      version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
      xmlns="http://www.w3.org/1999/xhtml">
      <xsl:template match="/">
        <xsl:element name="p">
          <xsl:attribute name="class">foo</xsl:attribute>
        </xsl:element>
      </xsl:template>
    </xsl:stylesheet>`);
  const transform = await compile(xslt);
  const result = transform(slimdom.parseXmlDocument("<root/>")).get("#default").document;
  const p = evaluateXPathToNodes("/p", result)[0] as slimdom.Element;
  expect(p.getAttribute("class")).toEqual("foo");
  expect(p.getAttributeNS("http://www.w3.org/1999/xhtml", "class")).toBeNull();
});
