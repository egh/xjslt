/*
 * Copyright (C) 2021-2024 Erik Hetzner
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

import { toEstree } from "../src/estree-util";
import {
  buildAttributeNode,
  buildNode,
  evaluateAttributeValueTemplate,
  extendScope,
  mergeVariableScopes,
  setVariable,
  mkNodeAppender,
  KeyImpl,
} from "../src/xjslt";
import {
  buildStylesheet,
  compileAvtRaw,
  compileSequenceConstructorNode,
  compileTopLevelNode,
  getNodeNS,
} from "../src/compile";
import { VariableScope, OutputResult } from "../src/definitions";
import { computeDefaultPriority, determineNamespace } from "../src/shared";
import * as slimdom from "slimdom";
import * as path from "path";
import { evaluateXPathToString, evaluateXPathToNodes } from "fontoxpath";
import { generate } from "astring";
import { Parser } from "acorn";
import { tmpdir } from "os";
import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { expect } from "@jest/globals";
import { toBeEquivalentDom } from "./matchers";
import { OutputDefinition } from "../src/definitions";
import preprocessStripWhitespace2 from "../src/preprocess/stripWhitespace2";
expect.extend({ toBeEquivalentDom });

declare module "expect" {
  interface AsymmetricMatchers {
    toBeEquivalentDom(b: any): void;
    toXSMatch(expected: string): void;
  }
  interface Matchers<R> {
    toBeEquivalentDom(b: any): R;
    toXSMatch(expected: string): R;
  }
}
const serializer = new slimdom.XMLSerializer();

function makeSimpleTransform(match: string, template: string) {
  return makeTransform(`
<xsl:template match="${match}">
${template}
</xsl:template>`);
}

function makeTransform(body: string) {
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
  const transform = buildStylesheet(tempfile);
  unlinkSync(tempfile);
  return transform;
}

test("slimdon", () => {
  const document = new slimdom.Document();
  document.append(document.createElement("root"));
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

const document = slimdom.parseXmlDocument(
  readFileSync("./test/simple.xml").toString(),
);

const xsltDoc = preprocessStripWhitespace2(
  slimdom.parseXmlDocument(readFileSync("./test/simple.xslt").toString()),
).get("#default").document;

const xslt2Doc = preprocessStripWhitespace2(
  slimdom.parseXmlDocument(readFileSync("./test/simple2.xslt").toString()),
).get("#default").document;

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
  expect(
    generate(
      compileSequenceConstructorNode(nodes[0] as slimdom.Element, {
        templates: [],
        whitespaceDeclarations: [],
      }),
      GENERATE_OPTS,
    ),
  ).toEqual('xjslt.literalText(context, "Article -\\n");');
});

test("compileValueOfNode", () => {
  const nodes = evaluateXPathToNodes("//xsl:value-of", xsltDoc);
  expect(
    generate(
      compileSequenceConstructorNode(nodes[0] as slimdom.Element, {
        templates: [],
        whitespaceDeclarations: [],
      }),
      GENERATE_OPTS,
    ),
  ).toEqual(
    'xjslt.valueOf(context, {"select": "/Article/Title","separator": undefined,"namespaces": {"xsl": "http://www.w3.org/1999/XSL/Transform"}}, context => {});',
  );
});

test("compileVariableNode", () => {
  const nodes = evaluateXPathToNodes("//xsl:variable", xsltDoc);
  expect(
    generate(
      compileSequenceConstructorNode(nodes[0] as slimdom.Element, {
        templates: [],
        whitespaceDeclarations: [],
      }),
      GENERATE_OPTS,
    ),
  ).toEqual(
    'xjslt.variable(context, {"name": "author","content": ".","namespaces": {"xsl": "http://www.w3.org/1999/XSL/Transform"},"as": undefined});',
  );
});

test("compileApplyTemplatesNode", () => {
  const nodes = evaluateXPathToNodes("//xsl:apply-templates", xsltDoc);
  expect(
    generate(
      compileSequenceConstructorNode(nodes[0] as slimdom.Element, {
        templates: [],
        whitespaceDeclarations: [],
      }),
      GENERATE_OPTS,
    ),
  ).toEqual(
    'xjslt.applyTemplates(context, {"select": "/Article/Authors/Author","mode": "#default","params": [],"sortKeyComponents": [],"namespaces": {"xsl": "http://www.w3.org/1999/XSL/Transform"}});',
  );
});

test("compileForEachNode", () => {
  const xml =
    '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="/"><doc><xsl:for-each select="./*">foo</xsl:for-each></doc></xsl:template></xsl:stylesheet>';
  const dom = slimdom.parseXmlDocument(xml);
  const nodes = evaluateXPathToNodes("//xsl:for-each", dom);
  expect(
    generate(
      compileSequenceConstructorNode(nodes[0] as slimdom.Element, {
        templates: [],
        whitespaceDeclarations: [],
      }),
      GENERATE_OPTS,
    ),
  ).toEqual(
    'xjslt.forEach(context, {"select": "./*","sortKeyComponents": [],"namespaces": {"xsl": "http://www.w3.org/1999/XSL/Transform"}}, context => {xjslt.literalText(context, "foo");});',
  );
});

test("compileChooseNode", () => {
  const xml =
    '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="/"><xsl:choose><xsl:when test="[@att=\'bar\']">foo</xsl:when><xsl:otherwise>bar</xsl:otherwise></xsl:choose></xsl:template></xsl:stylesheet>';
  const dom = slimdom.parseXmlDocument(xml);
  const nodes = evaluateXPathToNodes("//xsl:choose", dom);
  expect(
    generate(
      compileSequenceConstructorNode(nodes[0] as slimdom.Element, {
        templates: [],
        whitespaceDeclarations: [],
      }),
      GENERATE_OPTS,
    ),
  ).toEqual(
    'xjslt.choose(context, [{"test": "[@att=\'bar\']","apply": context => {xjslt.literalText(context, "foo");}}, {"apply": context => {xjslt.literalText(context, "bar");}}]);',
  );
});

test("compileIfNode", () => {
  const xml =
    '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="/"><doc><xsl:if test="[@att=\'bar\']">foo</xsl:if></doc></xsl:template></xsl:stylesheet>';
  const dom = slimdom.parseXmlDocument(xml);
  const nodes = evaluateXPathToNodes("//xsl:if", dom);
  expect(
    generate(
      compileSequenceConstructorNode(nodes[0] as slimdom.Element, {
        templates: [],
        whitespaceDeclarations: [],
      }),
      GENERATE_OPTS,
    ),
  ).toEqual(
    'xjslt.ifX(context, {"test": "[@att=\'bar\']","namespaces": {"xsl": "http://www.w3.org/1999/XSL/Transform"}}, context => {xjslt.literalText(context, "foo");});',
  );
});

test("compileLiteralElementNode", () => {
  const nodes = evaluateXPathToNodes("//heading", xslt2Doc);
  expect(
    generate(
      compileSequenceConstructorNode(nodes[0] as slimdom.Element, {
        templates: [],
        whitespaceDeclarations: [],
      }),
      GENERATE_OPTS,
    ),
  ).toEqual(
    'xjslt.literalElement(context, {"name": "heading","attributes": [{"name": "type","value": ["top"],"namespace": undefined}],"namespace": undefined,"namespaces": {"xsl": "http://www.w3.org/1999/XSL/Transform"}}, context => {xjslt.valueOf(context, {"select": "Title","separator": undefined,"namespaces": {"xsl": "http://www.w3.org/1999/XSL/Transform"}}, context => {});});',
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
  expect(
    generate(
      compileSequenceConstructorNode(nodes[0] as slimdom.Element, {
        templates: [],
        whitespaceDeclarations: [],
      }),
      GENERATE_OPTS,
    ),
  ).toEqual(
    'xjslt.literalElement(context, {"name": "foo:node","attributes": [{"name": "xmlns:foo","value": ["http://example.org/foo"],"namespace": "http://www.w3.org/2000/xmlns/"}],"namespace": "http://example.org/foo","namespaces": {"xsl": "http://www.w3.org/1999/XSL/Transform","foo": "http://example.org/foo"}}, context => {xjslt.valueOf(context, {"select": ".","separator": undefined,"namespaces": {"xsl": "http://www.w3.org/1999/XSL/Transform","foo": "http://example.org/foo"}}, context => {});});',
  );
});

test("compileTemplateNode", () => {
  const nodes: slimdom.Element[] = evaluateXPathToNodes<slimdom.Element>(
    "//xsl:template",
    xslt2Doc,
  );
  let context = { templates: [], whitespaceDeclarations: [] };
  compileTopLevelNode(nodes[0], context);
  expect(generate(toEstree(context.templates), GENERATE_OPTS)).toEqual(
    '[{"match": "/","matchFunction": xjslt.compileMatchFunction("\\n\\treturn (contextItem, domFacade, runtimeLib, options) => {\\n\\t\\tconst {\\n\\t\\t\\terrXPDY0002,\\n\\t\\t} = runtimeLib;\\n\\t\\tif (!contextItem) {\\n\\t\\t\\tthrow errXPDY0002(\\"Context is needed to evaluate the given path expression.\\");\\n\\t\\t}\\n\\n\\t\\tif (!contextItem.nodeType) {\\n\\t\\t\\tthrow new Error(\\"Context item must be subtype of node().\\");\\n\\t\\t}\\n\\t\\t\\n\\t\\tconst nodes0 = (function* (contextItem0) {\\n\\t\\t\\tconst root0 = (function () {\\n\\t\\t\\t\\tlet n = contextItem0;\\n\\t\\t\\t\\twhile (n.nodeType !== /*DOCUMENT_NODE*/9) {\\n\\t\\t\\t\\t\\tn = domFacade.getParentNode(n);\\n\\t\\t\\t\\t\\tif (n === null) {\\n\\t\\t\\t\\t\\t\\tthrow new Error(\'XPDY0050: the root node of the context node is not a document node.\');\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\treturn n;\\n\\t\\t\\t})();\\n\\t\\t\\tyield root0;\\n\\t\\t});\\n\\t\\treturn Array.from(nodes0(contextItem));}\\n//# sourceURL=generated.js"),"name": undefined,"modes": ["#default"],"allowedParams": [],"apply": context => {xjslt.literalElement(context, {"name": "doc","attributes": [],"namespace": undefined,"namespaces": {"xsl": "http://www.w3.org/1999/XSL/Transform"}}, context => {xjslt.applyTemplates(context, {"select": "child::node()","mode": "#default","params": [],"sortKeyComponents": [],"namespaces": {"xsl": "http://www.w3.org/1999/XSL/Transform"}});});},"namespaces": {"xsl": "http://www.w3.org/1999/XSL/Transform"},"priority": undefined,"importPrecedence": 1}]',
  );
});

test("compileStylesheetNode", () => {
  const transform = buildStylesheet("./test/simple2.xslt");
  expect(
    slimdom.serializeToWellFormedString(
      transform(
        slimdom.parseXmlDocument(readFileSync("./test/simple.xml", "utf-8")),
        new slimdom.Document(),
      ).get("#default").document,
    ),
  ).toEqual(readFileSync("./test/simple2.out", "utf-8"));
});

test("evaluateAttributeValueTemplate", () => {
  const nodes = evaluateXPathToNodes("//Author", document);
  const context = {
    outputDocument: undefined,
    resultDocuments: new Map<string, OutputResult>(),
    outputDefinitions: new Map<string, OutputDefinition>(),
    append: undefined,
    contextItem: nodes[0],
    templates: [],
    mode: "#default",
    variableScopes: [new Map<string, any>()],
    inputURL: new URL("file:///fake.xml"),
    keys: new Map(),
    patternMatchCache: new Map(),
  };
  expect(
    evaluateAttributeValueTemplate(
      context,
      compileAvtRaw("{local-name()}-{text()}-foo"),
      (prefix: string) => "",
    ),
  ).toEqual("Author-Mr. Foo-foo");
  expect(
    evaluateAttributeValueTemplate(
      context,
      compileAvtRaw(""),
      (prefix: string) => "",
    ),
  ).toEqual("");
});

test("elementNode", () => {
  const transform = makeSimpleTransform(
    "//Author",
    "<xsl:element name='test-{local-name()}'>Hi!</xsl:element>",
  );
  const results = transform(document, new slimdom.Document()).get(
    "#default",
  ).document;
  expect(evaluateXPathToString("/root/test-Author[1]/text()", results)).toEqual(
    "Hi!",
  );
});

test("attributeNode", () => {
  const transform = makeSimpleTransform(
    "//Author",
    "<test><xsl:attribute name='test-{local-name()}'><xsl:value-of select='text()'/></xsl:attribute></test>",
  );
  const results = transform(document, new slimdom.Document()).get(
    "#default",
  ).document;
  expect(evaluateXPathToString("/root/test[1]/@test-Author", results)).toEqual(
    "Mr. Foo",
  );
});

test("literalElementAttributeEvaluation", () => {
  const transform = makeSimpleTransform(
    "//Author",
    "<test name='test-{local-name()}'><xsl:value-of select='text()'/></test>",
  );
  const results = transform(document, new slimdom.Document()).get(
    "#default",
  ).document;
  expect(
    evaluateXPathToString("/root/test[@name='test-Author'][1]", results),
  ).toEqual("Mr. Foo");
});

test("variableShadowing", () => {
  const transform = makeSimpleTransform(
    "//Author",
    "<test><xsl:variable name='test' select='text()'/><xsl:value-of select='$test'/></test>",
  );
  const results = transform(document, new slimdom.Document()).get(
    "#default",
  ).document;
  expect(evaluateXPathToString("/root/test[1]/text()", results)).toEqual(
    "Mr. Foo",
  );
});

test("call with param", () => {
  const transform = makeTransform(
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
  const results = transform(document).get("#default").document;
  expect(evaluateXPathToString("//li", results)).toEqual(
    "foo Mr. Foo foo Mr. Bar",
  );
});

test("param shadowed by variable", () => {
  const transform = makeTransform(
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
  const results = transform(document).get("#default").document;
  expect(evaluateXPathToString("//li", results)).toEqual(
    "shadowed Mr. Foo shadowed Mr. Bar",
  );
});

test("toplevel param", () => {
  const transform = makeTransform(
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
  const results = transform(document).get("#default").document;
  expect(evaluateXPathToString("//li", results)).toEqual(
    "toplevel Mr. Foo toplevel Mr. Bar",
  );
});

test("call with param defaults", () => {
  const transform = makeTransform(
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
  const results = transform(document).get("#default").document;
  expect(evaluateXPathToString("//li", results)).toEqual(
    "default Mr. Foo default Mr. Bar",
  );
});

test("template mode", () => {
  const transform = makeTransform(
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
  const results = transform(document).get("#default").document;
  const str = evaluateXPathToString("//li", results);
  expect(str).toMatch(/.*FOO Mr. Foo/);
  expect(str).toMatch(/.*FOO Mr. Bar/);
});

test("text node", () => {
  const transform = makeSimpleTransform(
    "//Author",
    `<li><xsl:text>
-</xsl:text><xsl:value-of select="."/></li>`,
  );
  const results = transform(document).get("#default").document;
  expect(evaluateXPathToString("//li/text()", results)).toEqual(
    `
-Mr. Foo 
-Mr. Bar`,
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
  expect(getNodeNS(dom.documentElement.firstChild as slimdom.Element)).toEqual({
    foo: "http://example.org/foo",
    bar: "http://example.org/bar",
  });
});

test("getNodeNS override nested", () => {
  const xml =
    '<foo:root xmlns:foo="http://example.org/foo"><foo:node xmlns:foo="http://example.org/bar"></foo:node></foo:root>';
  const dom = slimdom.parseXmlDocument(xml);
  expect(getNodeNS(dom.documentElement.firstChild as slimdom.Element)).toEqual({
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
  ).toEqual(["http://example.org/baz", "foo"]);
  expect(
    determineNamespace("foo:bar", nsResolver, "http://example.org/baz"),
  ).toEqual(["http://example.org/baz", "foo:bar"]);
  expect(determineNamespace("foo:bar", nsResolver, undefined)).toEqual([
    "http://example.org/foo",
    "bar",
  ]);
  expect(
    determineNamespace("foo:bar", nsResolver, "http://example.org/override"),
  ).toEqual(["http://example.org/override", "foo:bar"]);
});

test("buildNode", () => {
  const doc = new slimdom.Document();
  let context = {
    outputDocument: doc,
    resultDocuments: new Map<string, OutputResult>(),
    outputDefinitions: new Map<string, OutputDefinition>(),
    append: mkNodeAppender(doc),
    contextItem: undefined,
    mode: "#default",
    templates: [],
    variableScopes: [new Map<string, any>()],
    inputURL: new URL("file:///fake.xml"),
    keys: new Map(),
    patternMatchCache: new Map<string, Set<slimdom.Node>>(),
  };
  let nodeA = buildNode(context, {
    name: "baz:foo",
    namespace: "http://example.org/baz",
  });
  expect(nodeA.prefix).toEqual("baz");
  expect(nodeA.localName).toEqual("foo");
  expect(nodeA.namespaceURI).toEqual("http://example.org/baz");

  let nodeB = buildNode(context, { name: "baz:foo" });
  expect(nodeB.prefix).toEqual(null);
  expect(nodeB.localName).toEqual("baz:foo");
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
    resultDocuments: new Map<string, OutputResult>(),
    outputDefinitions: new Map<string, OutputDefinition>(),
    append: mkNodeAppender(doc),
    contextItem: undefined,
    mode: "#default",
    templates: [],
    variableScopes: [new Map<string, any>()],
    inputURL: new URL("file:///fake.xml"),
    keys: new Map(),
    patternMatchCache: new Map<string, Set<slimdom.Node>>(),
  };
  let nodeA = buildAttributeNode(context, {
    name: "baz:foo",
    namespace: "http://example.org/baz",
    value: "value",
  });
  expect(nodeA.prefix).toEqual("baz");
  expect(nodeA.localName).toEqual("foo");
  expect(nodeA.name).toEqual("baz:foo");
  expect(nodeA.namespaceURI).toEqual("http://example.org/baz");
  expect(nodeA.value).toEqual("value");

  /* without a namespace, the localname is baz:foo */
  let nodeB = buildAttributeNode(context, {
    name: "baz:foo",
    value: "value",
  });
  expect(nodeB.prefix).toEqual(null);
  expect(nodeB.localName).toEqual("baz:foo");
  expect(nodeB.name).toEqual("baz:foo");
  expect(nodeB.namespaceURI).toEqual(null);
  expect(nodeB.value).toEqual("value");

  let nodeC = buildAttributeNode(context, {
    name: "foo",
    value: "foo",
  });
  expect(nodeC.prefix).toEqual(null);
  expect(nodeC.localName).toEqual("foo");
  expect(nodeC.name).toEqual("foo");
  expect(nodeC.namespaceURI).toEqual(null);
  expect(nodeC.value).toEqual("foo");
});

test("computeDefaultPriority", () => {
  expect(computeDefaultPriority("/")).toEqual(-0.5);
  expect(computeDefaultPriority("foo")).toEqual(0);
  expect(computeDefaultPriority("@foo")).toEqual(0);
  expect(computeDefaultPriority("child::foo")).toEqual(0);
  expect(computeDefaultPriority("attribute::foo")).toEqual(0);
  expect(computeDefaultPriority("processing-instruction('foo')")).toEqual(0);
  expect(computeDefaultPriority("processing-instruction(foo)")).toEqual(0);
  expect(
    computeDefaultPriority("child::processing-instruction('foo')"),
  ).toEqual(0);
  expect(computeDefaultPriority("element()")).toEqual(-0.5);
  expect(computeDefaultPriority("element(*)")).toEqual(-0.5);
  expect(computeDefaultPriority("attribute()")).toEqual(-0.5);
  expect(computeDefaultPriority("attribute(*)")).toEqual(-0.5);
  expect(computeDefaultPriority("element(foo)")).toEqual(0);
  expect(computeDefaultPriority("element(*, foo)")).toEqual(0);
  expect(computeDefaultPriority("attribute(foo)")).toEqual(0);
  expect(computeDefaultPriority("attribute(*, foo)")).toEqual(0);
  expect(computeDefaultPriority("element(foo, bar)")).toEqual(0.25);
  expect(computeDefaultPriority("attribute(foo, bar)")).toEqual(0.25);
  expect(computeDefaultPriority("schema-element(foo)")).toEqual(0.25);
  expect(computeDefaultPriority("schema-attribute(foo)")).toEqual(0.25);
  expect(computeDefaultPriority("document-node()")).toEqual(-0.5);
  expect(computeDefaultPriority("node()")).toEqual(-0.5);
  expect(computeDefaultPriority("comment()")).toEqual(-0.5);
  expect(computeDefaultPriority("child::comment()")).toEqual(-0.5);
  expect(computeDefaultPriority("child::node()")).toEqual(-0.5);
  expect(computeDefaultPriority("doc[true()]")).toEqual(0.5);
  expect(computeDefaultPriority("foo/bar")).toEqual(0.5);
  expect(computeDefaultPriority("*")).toEqual(-0.5);
  expect(computeDefaultPriority("*|foo|element(foo,bar)")).toEqual(0.25);
});

test(`domCompare`, () => {
  expect(() => expect(undefined).toBeEquivalentDom(undefined)).toThrow(
    TypeError,
  );
});

let docs = [
  [`<root/>`, `<root/>`],
  [`<root>foo</root>`, `<root>foo</root>`],
  [`<root a="b">foo</root>`, `<root a="b">foo</root>`],
  [`<root a="b" b="a">foo</root>`, `<root b="a" a="b">foo</root>`],
];
for (const [astring, bstring] of docs) {
  test(`domCompare ${astring} = ${bstring}`, () => {
    const a = slimdom.parseXmlDocument(astring);
    const b = slimdom.parseXmlDocument(bstring);
    expect(a).toBeEquivalentDom(b);
  });
}

for (const [astring, bstring] of [
  [`<root/>`, `<rootx/>`],
  [`<root>foo</root>`, `<root>foox</root>`],
  [`<root a="b">foo</root>`, `<root a="bx">foo</root>`],
  [`<root a="b" b="a">foo</root>`, `<root b="ax" a="b">foo</root>`],
]) {
  test(`domCompare ${astring} != ${bstring}`, () => {
    const a = slimdom.parseXmlDocument(astring);
    const b = slimdom.parseXmlDocument(bstring);
    expect(a).not.toBeEquivalentDom(b);
  });
}

test("compileAvtRaw", () => {
  expect(compileAvtRaw("{$foo}")).toEqual([{ xpath: "$foo" }]);
  expect(compileAvtRaw("{{{$foo}")).toEqual(["{", { xpath: "$foo" }]);
  expect(compileAvtRaw("{{{$foo}}}")).toEqual(["{", { xpath: "$foo" }, "}"]);
  expect(compileAvtRaw("")).toEqual([]);
  expect(compileAvtRaw(undefined)).toEqual(undefined);
  expect(() => {
    compileAvtRaw("{$foo");
  }).toThrow("XTSE0350");
  expect(() => {
    compileAvtRaw("fo}o");
  }).toThrow("XTSE0370");
});

test("key class", () => {
  let key = new KeyImpl("foo", "@bar", {});
  const dom = slimdom.parseXmlDocument(`
<doc>
<foo bar="1">one</foo>
  </doc>`);
  expect(
    key.lookup(new Map<string, Set<slimdom.Node>>(), dom, [], "1"),
  ).toEqual(evaluateXPathToNodes("/doc/foo[@bar='1']", dom));
});
