import {
  NodeType,
  applyTemplatesInternal,
  buildStylesheet,
  evaluteAttributeValueTemplate,
  literalTextInternal,
  makeTemplateAttributes,
  processNode,
  stripSpaceStylesheet,
  valueOfInternal,
} from "../src/xjslt";
import { compileNode } from "../src/compile";
import * as slimdom from "slimdom";
import { evaluateXPathToString, evaluateXPathToNodes } from "fontoxpath";
import { generate } from "astring";
import { sync } from "slimdom-sax-parser";
import { Parser } from "acorn";
import * as tempy from "tempy";
import * as saxes from "saxes";
import { readFileSync, writeFileSync, unlinkSync } from "fs";

function makeSimpleTransform(match: string, template: string) {
  const tempfile = tempy.file();
  writeFileSync(
    tempfile,
    `<xsl:stylesheet
version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<root><xsl:apply-templates/></root>
</xsl:template>
<xsl:template match="${match}">
${template}
</xsl:template>
</xsl:stylesheet>`
  );
  const transform = buildStylesheet(tempfile);
  unlinkSync(tempfile);
  return transform;
}

test("slimdon", () => {
  const document = new slimdom.Document();
  document.appendChild(document.createElement("root"));
  const xml = slimdom.serializeToWellFormedString(document);
  expect(xml).toEqual("<root/>");
});

test("slimdon-sax", () => {
  const document = sync("<root />");
  const xml = slimdom.serializeToWellFormedString(document);
  expect(xml).toEqual("<root/>");
});

test("slimdon", () => {
  const document = sync("<root>text</root>");
  expect(evaluateXPathToString("/root/text()", document)).toEqual("text");
});

test("astring", () => {
  const parsed = Parser.parse("my('code');", { ecmaVersion: 2020 });
  expect(generate(parsed)).toEqual("my('code');\n");
});

test("saxes", () => {
  const parser = new saxes.SaxesParser();
  const textCallback = jest.fn((_text) => {});
  const openCallback = jest.fn((_node) => {});
  parser.on("text", textCallback);
  parser.on("opentag", openCallback);

  parser.write('<xml>Hello, <who name="world">world</who>!</xml>').close();
  expect(textCallback.mock.calls[0][0]).toBe("Hello, ");
  expect(textCallback.mock.calls[1][0]).toBe("world");
  expect(textCallback.mock.calls[2][0]).toBe("!");
  expect(openCallback.mock.calls[0][0].name).toBe("xml");
  expect(openCallback.mock.calls[1][0].name).toBe("who");
  expect(openCallback.mock.calls[1][0].attributes.name).toBe("world");
});

/* Goal: generate a function that looks like this.*/
function transform(document: slimdom.Document, output: (str: string) => void) {
  let templates = [];
  templates.push({
    attributes: { match: "/" },
    apply: function (context) {
      literalTextInternal(context, "Article -\n");
      valueOfInternal(context, { select: "/Article/Title" });
      literalTextInternal(context, "\nAuthors:");
      applyTemplatesInternal(context, { select: "/Article/Authors/Author" });
    },
  });
  templates.push({
    attributes: { match: "Author" },
    apply: function (context) {
      literalTextInternal(context, "\n- ");
      valueOfInternal(context, { select: "." });
    },
  });

  const doc = new slimdom.Document();
  doc.appendChild(doc.createElement("root"));
  let context = {
    outputDocument: doc,
    outputNode: doc.documentElement,
    currentNode: document,
    currentNodeList: [],
    mode: null,
    templates: templates,
  };
  processNode(context);
  walkTree(doc, (node) => {
    if (node.nodeType == NodeType.TEXT_NODE) {
      output(node.data);
    }
  });
}

const document = sync(readFileSync("./test/simple.xml").toString());

test("compiled", () => {
  let str = "";
  transform(document, (s: string) => {
    str += s;
  });
  expect(str).toEqual(readFileSync("./test/simple.out", "utf8"));
});

const xsltDoc = sync(readFileSync("./test/simple.xslt").toString());

const xslt2Doc = stripSpaceStylesheet(
  sync(readFileSync("./test/simple2.xslt").toString())
);

function walkTree(node: any, func: (node: any) => void): void {
  func(node);
  if (node.childNodes) {
    for (let child of node.childNodes) {
      walkTree(child, func);
    }
  }
}

test("makeTemplateAttributes", () => {
  const templates = evaluateXPathToNodes("//xsl:template", xsltDoc);
  expect(makeTemplateAttributes(templates[0]).match).toEqual("/");
  expect(makeTemplateAttributes(templates[1]).match).toEqual("Author");
});

const GENERATE_OPTS = { indent: "", lineEnd: "" };

test("compileTextNode", () => {
  const nodes = evaluateXPathToNodes("//text()", xsltDoc);
  expect(generate(compileNode(nodes[2]), GENERATE_OPTS)).toEqual(
    'xjslt.literalTextInternal(context, "Article -\\n");'
  );
});

test("compileValueOfNode", () => {
  const nodes = evaluateXPathToNodes("//xsl:value-of", xsltDoc);
  expect(generate(compileNode(nodes[0]), GENERATE_OPTS)).toEqual(
    'xjslt.valueOfInternal(context, {select: "/Article/Title"});'
  );
});

test("compileApplyTemplatesNode", () => {
  const nodes = evaluateXPathToNodes("//xsl:apply-templates", xsltDoc);
  expect(generate(compileNode(nodes[0]), GENERATE_OPTS)).toEqual(
    'xjslt.applyTemplatesInternal(context, {select: "/Article/Authors/Author"});'
  );
});

test("compileForEachNode", () => {
  const xml =
    '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="/"><doc><xsl:for-each select="./*">foo</xsl:for-each></doc></xsl:template></xsl:stylesheet>';
  const dom = sync(xml);
  const nodes = evaluateXPathToNodes("//xsl:for-each", dom);
  expect(generate(compileNode(nodes[0]), GENERATE_OPTS)).toEqual(
    'xjslt.forEachInternal(context, {select: "./*"}, context => {xjslt.literalTextInternal(context, "foo");});'
  );
});

test("compileChooseNode", () => {
  const xml =
    '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="/"><xsl:choose><xsl:when test="[@att=\'bar\']">foo</xsl:when><xsl:otherwise>bar</xsl:otherwise></xsl:choose></xsl:template></xsl:stylesheet>';
  const dom = sync(xml);
  const nodes = evaluateXPathToNodes("//xsl:choose", dom);
  expect(generate(compileNode(nodes[0]), GENERATE_OPTS)).toEqual(
    'xjslt.chooseInternal(context, [{test: "[@att=\'bar\']",apply: context => {xjslt.literalTextInternal(context, "foo");}}, {apply: context => {xjslt.literalTextInternal(context, "bar");}}]);'
  );
});

test("compileIfNode", () => {
  const xml =
    '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="/"><doc><xsl:if test="[@att=\'bar\']">foo</xsl:if></doc></xsl:template></xsl:stylesheet>';
  const dom = sync(xml);
  const nodes = evaluateXPathToNodes("//xsl:if", dom);
  expect(generate(compileNode(nodes[0]), GENERATE_OPTS)).toEqual(
    'xjslt.ifInternal(context, {test: "[@att=\'bar\']"}, context => {xjslt.literalTextInternal(context, "foo");});'
  );
});

test("compileLiteralElementNode", () => {
  const nodes = evaluateXPathToNodes("//heading", xslt2Doc);
  expect(generate(compileNode(nodes[0]), GENERATE_OPTS)).toEqual(
    'xjslt.literalElementInternal(context, {name: "heading",attributes: {type: "top"}}, context => {xjslt.valueOfInternal(context, {select: "Title"});});'
  );
});

test("stripSpaceStylesheet", () => {
  const document = sync("<root> text </root>");
  const xml = slimdom.serializeToWellFormedString(
    stripSpaceStylesheet(document)
  );
  expect(xml).toEqual("<root> text </root>");
});

test("stripSpaceStylesheet with space", () => {
  const document = sync("<root>\n <foo> <bar>text</bar> </foo>\n </root>");
  const xml = slimdom.serializeToWellFormedString(
    stripSpaceStylesheet(document)
  );
  expect(xml).toEqual("<root><foo><bar>text</bar></foo></root>");
});

test("stripSpaceStylesheet with preserved", () => {
  const raw =
    '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="/"><xsl:text> </xsl:text></xsl:template></xsl:stylesheet>';
  const document = sync(raw);
  expect(
    slimdom.serializeToWellFormedString(stripSpaceStylesheet(document))
  ).toEqual(raw);
});

test("compileTemplateNode", () => {
  const nodes = evaluateXPathToNodes("//xsl:template", xslt2Doc);
  expect(generate(compileNode(nodes[0]), GENERATE_OPTS)).toEqual(
    'templates.push({attributes: {match: "/"},apply: context => {xjslt.literalElementInternal(context, {name: "doc",attributes: {}}, context => {xjslt.applyTemplatesInternal(context, {select: null});});}});'
  );
});

test("compileStylesheetNode", () => {
  expect(generate(compileNode(xslt2Doc), GENERATE_OPTS)).toEqual(
    'let slimdom = require("slimdom");let fontoxpath = require("fontoxpath");let xjslt = require("./dist/xjslt");function transform(document, output) {let templates = [];templates.push({attributes: {match: "/"},apply: context => {xjslt.literalElementInternal(context, {name: "doc",attributes: {}}, context => {xjslt.applyTemplatesInternal(context, {select: null});});}});templates.push({attributes: {match: "Article"},apply: context => {xjslt.literalElementInternal(context, {name: "heading",attributes: {type: "top"}}, context => {xjslt.valueOfInternal(context, {select: "Title"});});xjslt.literalElementInternal(context, {name: "list",attributes: {}}, context => {xjslt.applyTemplatesInternal(context, {select: "Authors/Author"});});}});templates.push({attributes: {match: "Author"},apply: context => {xjslt.literalElementInternal(context, {name: "item",attributes: {}}, context => {xjslt.valueOfInternal(context, {select: "."});});}});const doc = new slimdom.Document();let context = {outputDocument: doc,outputNode: doc,currentNode: document,currentNodeList: [],mode: null,templates: templates};xjslt.processNode(context);return context.outputDocument;}module.exports.transform = transform;'
  );
});

test("compileStylesheetNode", () => {
  const transform = buildStylesheet("./test/simple2.xslt");
  expect(
    slimdom.serializeToWellFormedString(
      transform(sync(readFileSync("./test/simple.xml", "utf-8")))
    )
  ).toEqual(readFileSync("./test/simple2.out", "utf-8"));
});

test("evaluteAttributeValueTemplate", () => {
  const nodes = evaluateXPathToNodes("//Author", document);
  const context = {
    outputDocument: null,
    outputNode: null,
    currentNode: nodes[0],
    currentNodeList: nodes,
    templates: [],
  };
  expect(
    evaluteAttributeValueTemplate(context, "{local-name()}-{text()}-foo")
  ).toEqual("Author-Mr. Foo-foo");
});

test("elementNode", () => {
  const transform = makeSimpleTransform(
    "//Author",
    "<xsl:element name='test-{local-name()}'>Hi!</xsl:element>"
  );
  const results = transform(document);
  expect(evaluateXPathToString("/root/test-Author[1]/text()", results)).toEqual(
    "Hi!"
  );
});
