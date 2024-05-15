/*
 * Copyright (C) 2021 Erik Hetzner
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

import {
  applyTemplates,
  buildAttributeNode,
  buildNode,
  buildStylesheet,
  determineNamespace,
  evaluateAttributeValueTemplate,
  extendScope,
  literalText,
  mergeVariableScopes,
  processNode,
  setVariable,
  stripSpaceStylesheet,
  valueOf,
  VariableScope,
} from "../src/xjslt";
import { compileNode, getNodeNS } from "../src/compile";
import * as slimdom from "slimdom";
import * as path from "path";
import { evaluateXPathToString, evaluateXPathToNodes } from "fontoxpath";
import { generate } from "astring";
import { Parser } from "acorn";
import { tmpdir } from "os";
import { readFileSync, mkdtempSync, writeFileSync, unlinkSync } from "fs";

const serializer = new slimdom.XMLSerializer();

function makeSimpleTransform(match: string, template: string) {
  return makeTransform(`
<xsl:template match="${match}">
${template}
</xsl:template>`);
}

async function makeTransform(body: string) {
  const tempfile = path.join(tmpdir(), "temp.xsl");
  writeFileSync(
    tempfile,
    `<xsl:stylesheet
version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<root><xsl:apply-templates/></root>
</xsl:template>
${body}
</xsl:stylesheet>`,
  );
  const transform = await buildStylesheet(tempfile);
  unlinkSync(tempfile);
  return transform;
}

test("slimdon", () => {
  const document = new slimdom.Document();
  document.appendChild(document.createElement("root"));
  const xml = slimdom.serializeToWellFormedString(document);
  expect(xml).toEqual("<root/>");
});

test("slimdon", () => {
  const document = slimdom.parseXmlDocument("<root>text</root>");
  expect(evaluateXPathToString("/root/text()", document)).toEqual("text");
});

test("astring", () => {
  const parsed = Parser.parse("my('code');", { ecmaVersion: 2020 });
  expect(generate(parsed)).toEqual("my('code');\n");
});

/* Goal: generate a function that looks like this.*/
function transform(document: slimdom.Document, output: (str: string) => void) {
  let templates = [];
  templates.push({
    match: "/",
    allowedParams: [],
    modes: ["#default"],
    apply: function (context) {
      literalText(context, "Article -\n");
      valueOf(context, { select: "/Article/Title", namespaces: {} });
      literalText(context, "\nAuthors:");
      applyTemplates(context, {
        select: "/Article/Authors/Author",
        params: [],
        mode: "#default",
        namespaces: {},
      });
    },
  });
  templates.push({
    match: "Author",
    allowedParams: [],
    modes: ["#default"],
    apply: function (context) {
      literalText(context, "\n- ");
      valueOf(context, { select: ".", namespaces: {} });
    },
  });

  const doc = new slimdom.Document();
  doc.appendChild(doc.createElement("root"));
  let context = {
    outputDocument: doc,
    outputNode: doc.documentElement,
    currentNode: document,
    currentNodeList: [],
    mode: "#default",
    templates: templates,
    variableScopes: [new Map<string, any>()],
  };
  processNode(context, [], {});
  walkTree(doc, (node) => {
    if (node.nodeType == slimdom.Node.TEXT_NODE) {
      output(node.data);
    }
  });
}

const document = slimdom.parseXmlDocument(
  readFileSync("./test/simple.xml").toString(),
);

test("compiled", () => {
  let str = "";
  transform(document, (s: string) => {
    str += s;
  });
  expect(str).toEqual(readFileSync("./test/simple.out", "utf8"));
});

const xsltDoc = slimdom.parseXmlDocument(
  readFileSync("./test/simple.xslt").toString(),
);

const xslt2Doc = stripSpaceStylesheet(
  slimdom.parseXmlDocument(readFileSync("./test/simple2.xslt").toString()),
);

function walkTree(node: any, func: (node: any) => void): void {
  func(node);
  if (node.childNodes) {
    for (let child of node.childNodes) {
      walkTree(child, func);
    }
  }
}

const GENERATE_OPTS = { indent: "", lineEnd: "" };

test("compileTextNode", () => {
  const nodes = evaluateXPathToNodes("//text()", xsltDoc);
  expect(generate(compileNode(nodes[2]), GENERATE_OPTS)).toEqual(
    'xjslt.literalText(context, "Article -\\n");',
  );
});

test("compileValueOfNode", () => {
  const nodes = evaluateXPathToNodes("//xsl:value-of", xsltDoc);
  expect(generate(compileNode(nodes[0]), GENERATE_OPTS)).toEqual(
    'xjslt.valueOf(context, {"select": "/Article/Title","separator": undefined,"namespaces": {}});',
  );
});

test("compileVariableNode", () => {
  const nodes = evaluateXPathToNodes("//xsl:variable", xsltDoc);
  expect(generate(compileNode(nodes[0]), GENERATE_OPTS)).toEqual(
    'xjslt.variable(context, {"name": "author","content": ".","namespaces": {}});',
  );
});

test("compileApplyTemplatesNode", () => {
  const nodes = evaluateXPathToNodes("//xsl:apply-templates", xsltDoc);
  expect(generate(compileNode(nodes[0]), GENERATE_OPTS)).toEqual(
    'xjslt.applyTemplates(context, {"select": "/Article/Authors/Author","mode": "#default","namespaces": {}});',
  );
});

test("compileForEachNode", () => {
  const xml =
    '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="/"><doc><xsl:for-each select="./*">foo</xsl:for-each></doc></xsl:template></xsl:stylesheet>';
  const dom = slimdom.parseXmlDocument(xml);
  const nodes = evaluateXPathToNodes("//xsl:for-each", dom);
  expect(generate(compileNode(nodes[0]), GENERATE_OPTS)).toEqual(
    'xjslt.forEach(context, {"select": "./*","namespaces": {}}, context => {xjslt.literalText(context, "foo");});',
  );
});

test("compileChooseNode", () => {
  const xml =
    '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="/"><xsl:choose><xsl:when test="[@att=\'bar\']">foo</xsl:when><xsl:otherwise>bar</xsl:otherwise></xsl:choose></xsl:template></xsl:stylesheet>';
  const dom = slimdom.parseXmlDocument(xml);
  const nodes = evaluateXPathToNodes("//xsl:choose", dom);
  expect(generate(compileNode(nodes[0]), GENERATE_OPTS)).toEqual(
    'xjslt.choose(context, [{"test": "[@att=\'bar\']","apply": context => {xjslt.literalText(context, "foo");}}, {"apply": context => {xjslt.literalText(context, "bar");}}]);',
  );
});

test("compileIfNode", () => {
  const xml =
    '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="/"><doc><xsl:if test="[@att=\'bar\']">foo</xsl:if></doc></xsl:template></xsl:stylesheet>';
  const dom = slimdom.parseXmlDocument(xml);
  const nodes = evaluateXPathToNodes("//xsl:if", dom);
  expect(generate(compileNode(nodes[0]), GENERATE_OPTS)).toEqual(
    'xjslt.ifX(context, {"test": "[@att=\'bar\']","namespaces": {}}, context => {xjslt.literalText(context, "foo");});',
  );
});

test("compileLiteralElementNode", () => {
  const nodes = evaluateXPathToNodes("//heading", xslt2Doc);
  expect(generate(compileNode(nodes[0]), GENERATE_OPTS)).toEqual(
    'xjslt.literalElement(context, {"ns": undefined,"prefix": undefined,"name": "heading","attributes": [{"name": "type","value": "top"}]}, context => {xjslt.valueOf(context, {"select": "Title","separator": undefined,"namespaces": {}});});',
  );
});

test("compileLiteralElementNode with namespace", () => {
  const xml = `
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="//Author" mode="foo">
    <foo:node xmlns:foo="http://example.org/foo"><xsl:value-of select="."/></foo:node>
  </xsl:template>
</xsl:stylesheet>`;
  const dom = slimdom.parseXmlDocument(xml);
  const nodes = evaluateXPathToNodes("//*[local-name()='node']", dom);
  expect(generate(compileNode(nodes[0]), GENERATE_OPTS)).toEqual(
    'xjslt.literalElement(context, {"ns": "http://example.org/foo","prefix": undefined,"name": "node","attributes": []}, context => {xjslt.valueOf(context, {"select": ".","separator": undefined,"namespaces": {"foo": "http://example.org/foo"}});});',
  );
});

test("stripSpaceStylesheet", () => {
  const document = slimdom.parseXmlDocument("<root> text </root>");
  const xml = slimdom.serializeToWellFormedString(
    stripSpaceStylesheet(document),
  );
  expect(xml).toEqual("<root> text </root>");
});

test("stripSpaceStylesheet with space", () => {
  const document = slimdom.parseXmlDocument(
    "<root>\n <foo> <bar>text</bar> </foo>\n </root>",
  );
  const xml = slimdom.serializeToWellFormedString(
    stripSpaceStylesheet(document),
  );
  expect(xml).toEqual("<root><foo><bar>text</bar></foo></root>");
});

test("stripSpaceStylesheet with preserved", () => {
  const raw =
    '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="/"><xsl:text> </xsl:text></xsl:template></xsl:stylesheet>';
  const document = slimdom.parseXmlDocument(raw);
  expect(
    slimdom.serializeToWellFormedString(stripSpaceStylesheet(document)),
  ).toEqual(raw);
});

test("compileTemplateNode", () => {
  const nodes = evaluateXPathToNodes("//xsl:template", xslt2Doc);
  expect(generate(compileNode(nodes[0]), GENERATE_OPTS)).toEqual(
    'templates.push({"match": "/","name": undefined,"modes": ["#default"],"allowedParams": [],"apply": context => {xjslt.literalElement(context, {"ns": undefined,"prefix": undefined,"name": "doc","attributes": []}, context => {xjslt.applyTemplates(context, {"select": "child::node()","mode": "#default","namespaces": {}});});},"namespaces": {}});',
  );
});

test("compileStylesheetNode", async () => {
  const transform = await buildStylesheet("./test/simple2.xslt");
  expect(
    slimdom.serializeToWellFormedString(
      transform(
        slimdom.parseXmlDocument(readFileSync("./test/simple.xml", "utf-8")),
      ),
    ),
  ).toEqual(readFileSync("./test/simple2.out", "utf-8"));
});

test("evaluateAttributeValueTemplate", () => {
  const nodes = evaluateXPathToNodes("//Author", document);
  const context = {
    outputDocument: undefined,
    outputNode: undefined,
    currentNode: nodes[0],
    currentNodeList: nodes,
    templates: [],
    mode: "#default",
    variableScopes: [new Map<string, any>()],
  };
  expect(
    evaluateAttributeValueTemplate(context, "{local-name()}-{text()}-foo"),
  ).toEqual("Author-Mr. Foo-foo");
});

test("elementNode", async () => {
  const transform = await makeSimpleTransform(
    "//Author",
    "<xsl:element name='test-{local-name()}'>Hi!</xsl:element>",
  );
  const results = transform(document);
  expect(evaluateXPathToString("/root/test-Author[1]/text()", results)).toEqual(
    "Hi!",
  );
});

test("attributeNode", async () => {
  const transform = await makeSimpleTransform(
    "//Author",
    "<test><xsl:attribute name='test-{local-name()}'><xsl:value-of select='text()'/></xsl:attribute></test>",
  );
  const results = transform(document);
  expect(evaluateXPathToString("/root/test[1]/@test-Author", results)).toEqual(
    "Mr. Foo",
  );
});

test("literalElementAttributeEvaluation", async () => {
  const transform = await makeSimpleTransform(
    "//Author",
    "<test name='test-{local-name()}'><xsl:value-of select='text()'/></test>",
  );
  const results = transform(document);
  expect(
    evaluateXPathToString("/root/test[@name='test-Author'][1]", results),
  ).toEqual("Mr. Foo");
});

test("variableShadowing", async () => {
  const transform = await makeSimpleTransform(
    "//Author",
    "<test><xsl:variable name='test' select='text()'/><xsl:value-of select='$test'/></test>",
  );
  const results = transform(document);
  expect(evaluateXPathToString("/root/test[1]/text()", results)).toEqual(
    "Mr. Foo",
  );
});

test("call with param", async () => {
  const transform = await makeTransform(
    `
  <xsl:template name="temp">
    <xsl:param name="foo">default</xsl:param>
    <xsl:value-of select="concat($foo, ' ', .)"/>
  </xsl:template>
  <xsl:template match="//Author">
    <li><xsl:call-template name="temp">
          <xsl:with-param name="foo" select="'foo'"/>
        </xsl:call-template></li>
  </xsl:template>
`,
  );
  const results = transform(document);
  expect(evaluateXPathToString("//li", results)).toEqual(
    "foo Mr. Foo foo Mr. Bar",
  );
});

test("param shadowed by variable", async () => {
  const transform = await makeTransform(
    `
  <xsl:template name="temp">
    <xsl:param name="foo">default</xsl:param>
    <xsl:variable name="foo">shadowed</xsl:variable>
    <xsl:value-of select="concat($foo, ' ', .)"/>
  </xsl:template>
  <xsl:template match="//Author">
    <li><xsl:call-template name="temp">
          <xsl:with-param name="foo" select="'foo'"/>
        </xsl:call-template></li>
  </xsl:template>
`,
  );
  const results = transform(document);
  expect(evaluateXPathToString("//li", results)).toEqual(
    "shadowed Mr. Foo shadowed Mr. Bar",
  );
});

test("toplevel param", async () => {
  const transform = await makeTransform(
    `
    <xsl:param name="foo">toplevel</xsl:param>
  <xsl:template name="temp">
    <xsl:value-of select="concat($foo, ' ', .)"/>
  </xsl:template>
  <xsl:template match="//Author">
    <li><xsl:call-template name="temp"></xsl:call-template></li>
  </xsl:template>
`,
  );
  const results = transform(document);
  expect(evaluateXPathToString("//li", results)).toEqual(
    "toplevel Mr. Foo toplevel Mr. Bar",
  );
});

test("call with param defaults", async () => {
  const transform = await makeTransform(
    `
  <xsl:template name="temp">
    <xsl:param name="foo">default</xsl:param>
    <xsl:value-of select="concat($foo, ' ', .)"/>
  </xsl:template>
  <xsl:template match="//Author">
    <li><xsl:call-template name="temp">
        </xsl:call-template></li>
  </xsl:template>
`,
  );
  const results = transform(document);
  expect(evaluateXPathToString("//li", results)).toEqual(
    "default Mr. Foo default Mr. Bar",
  );
});

test("template mode", async () => {
  const transform = await makeTransform(
    `
  <xsl:template match="Author" mode="foo">
    FOO <xsl:value-of select="."/>
  </xsl:template>
  <xsl:template match="Author" mode="bar">
    BAR <xsl:value-of select="."/>
  </xsl:template>
  <xsl:template match="/Article">
    <li><xsl:apply-templates mode="foo" select="Authors/Author"/></li>
  </xsl:template>
`,
  );
  const results = transform(document);
  const str = evaluateXPathToString("//li", results);
  expect(str).toMatch(/.*FOO Mr. Foo/);
  expect(str).toMatch(/.*FOO Mr. Bar/);
});

test("text node", async () => {
  const transform = await makeSimpleTransform(
    "//Author",
    `<li><xsl:text>
-</xsl:text><xsl:value-of select="."/></li>`,
  );
  const results = transform(document);
  expect(evaluateXPathToString("//li/text()", results)).toEqual(
    `
- Mr. Foo 
- Mr. Bar`,
  );
});

test("variable scopes", () => {
  let scopes: VariableScope[] = [new Map()];
  setVariable(scopes, "a", 1);
  setVariable(scopes, "b", 2);
  let newScopes = extendScope(scopes);
  setVariable(newScopes, "b", 3);
  let merged = mergeVariableScopes(newScopes);
  expect(merged["a"]).toEqual(1);
  expect(merged["b"]).toEqual(3);
  expect(mergeVariableScopes([])).toEqual({});
  expect(mergeVariableScopes([new Map()])).toEqual({});
});

test("getNodeNS", () => {
  const xml =
    '<foo:root xmlns:foo="http://example.org/foo" xmlns:bar="http://example.org/bar" baz="http://example.org/baz"><node/></foo:root>';
  const dom = slimdom.parseXmlDocument(xml);
  expect(getNodeNS(dom.documentElement)).toEqual({
    foo: "http://example.org/foo",
    bar: "http://example.org/bar",
  });
});

test("getNodeNS with default ns", () => {
  const xml = '<root xmlns="http://example.org/foo"><node/></root>';
  const dom = slimdom.parseXmlDocument(xml);
  expect(getNodeNS(dom.documentElement)).toEqual({
    "": "http://example.org/foo",
  });
});

test("getNodeNS nested", () => {
  const xml =
    '<foo:root xmlns:foo="http://example.org/foo"><bar:node xmlns:bar="http://example.org/bar"></bar:node></foo:root>';
  const dom = slimdom.parseXmlDocument(xml);
  expect(getNodeNS(dom.documentElement.firstChild)).toEqual({
    foo: "http://example.org/foo",
    bar: "http://example.org/bar",
  });
});

test("getNodeNS override nested", () => {
  const xml =
    '<foo:root xmlns:foo="http://example.org/foo"><foo:node xmlns:foo="http://example.org/bar"></foo:node></foo:root>';
  const dom = slimdom.parseXmlDocument(xml);
  expect(getNodeNS(dom.documentElement.firstChild)).toEqual({
    foo: "http://example.org/bar",
  });
});

test("determineNamespace", () => {
  const nsResolver = (prefix) => {
    return {
      foo: "http://example.org/foo",
      bar: "http://example.org/bar",
    }[prefix];
  };
  expect(
    determineNamespace("foo", nsResolver, "http://example.org/baz"),
  ).toEqual(["http://example.org/baz", undefined, "foo"]);
  expect(
    determineNamespace("foo:bar", nsResolver, "http://example.org/baz"),
  ).toEqual(["http://example.org/baz", "foo", "bar"]);
  expect(determineNamespace("foo:bar", nsResolver, undefined)).toEqual([
    "http://example.org/foo",
    "foo",
    "bar",
  ]);
  expect(
    determineNamespace("foo:bar", nsResolver, "http://example.org/override"),
  ).toEqual(["http://example.org/override", "foo", "bar"]);
});

test("buildNode", () => {
  const doc = new slimdom.Document();
  let context = {
    outputDocument: doc,
    outputNode: doc.documentElement,
    currentNode: undefined,
    currentNodeList: [],
    mode: "#default",
    templates: [],
    variableScopes: [new Map<string, any>()],
  };
  let nodeA = buildNode(context, {
    name: "foo",
    ns: "http://example.org/baz",
    prefix: "baz",
  });
  expect(nodeA.prefix).toEqual("baz");
  expect(nodeA.localName).toEqual("foo");
  expect(nodeA.namespaceURI).toEqual("http://example.org/baz");

  let nodeB = buildNode(context, { name: "foo", prefix: "baz" });
  expect(nodeB.prefix).toEqual("baz");
  expect(nodeB.localName).toEqual("foo");
  expect(nodeB.namespaceURI).toEqual(null);

  let nodeC = buildNode(context, {
    name: "foo",
  });
  expect(nodeC.prefix).toEqual(null);
  expect(nodeC.localName).toEqual("foo");
  expect(nodeC.namespaceURI).toEqual(null);
});

test("buildAttributeNode", () => {
  const doc = new slimdom.Document();
  let context = {
    outputDocument: doc,
    outputNode: doc.documentElement,
    currentNode: undefined,
    currentNodeList: [],
    mode: "#default",
    templates: [],
    variableScopes: [new Map<string, any>()],
  };
  let nodeA = buildAttributeNode(context, {
    name: "foo",
    ns: "http://example.org/baz",
    prefix: "baz",
    value: "value",
  });
  expect(nodeA.prefix).toEqual("baz");
  expect(nodeA.localName).toEqual("foo");
  expect(nodeA.namespaceURI).toEqual("http://example.org/baz");
  expect(nodeA.value).toEqual("value");

  let nodeB = buildAttributeNode(context, {
    name: "foo",
    prefix: "baz",
    value: "value",
  });
  expect(nodeB.prefix).toEqual("baz");
  expect(nodeB.localName).toEqual("foo");
  expect(nodeB.namespaceURI).toEqual(null);
  expect(nodeB.value).toEqual("value");

  let nodeC = buildAttributeNode(context, {
    name: "foo",
    value: "foo",
  });
  expect(nodeC.prefix).toEqual(null);
  expect(nodeC.localName).toEqual("foo");
  expect(nodeC.namespaceURI).toEqual(null);
  expect(nodeC.value).toEqual("foo");
});
