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

import { generate } from "astring";
import {
  mkArray,
  mkArrowFun,
  mkBlock,
  mkCall,
  mkCallWithContext,
  mkFun,
  mkIdentifier,
  mkImportsNode,
  mkLet,
  mkLiteral,
  mkMember,
  mkNew,
  mkObject,
  mkReturn,
} from "./estree-util";
import {
  Expression,
  ExpressionStatement,
  ObjectExpression,
  Program,
  Statement,
} from "estree";
import * as slimdom from "slimdom";
import {
  compileXPathToJavaScript,
  evaluateXPath,
  evaluateXPathToBoolean,
  evaluateXPathToNodes,
  NamespaceResolver,
} from "fontoxpath";
import { readFileSync, writeFileSync, symlinkSync } from "fs";
import { pathToFileURL } from "url";
import * as path from "path";
import { tmpdir } from "os";
import { mkdtempSync } from "fs";
import preprocessSimplified from "./preprocess/simplified";
import preprocessInclude from "./preprocess/include";
import preprocessImport from "./preprocess/import";
import preprocessStripWhitespace1 from "./preprocess/stripWhitespace1";
import preprocessStripWhitespace2 from "./preprocess/stripWhitespace2";
import preprocessErrorAnalysis from "./preprocess/error-analysis";
import {
  XSLT1_NSURI,
  XMLNS_NSURI,
  NodeType,
  OutputDefinition,
  xpathstring,
} from "./definitions";
import { mkOutputDefinition, mkResolver } from "./shared";

/**
 * Functions to walk a DOM tree of an XSLT stylesheet and generate an
 * ESTree that can be used to process an input document.
 */

interface SimpleElement {
  name: string;
  hasChildren: boolean;
  arguments: Map<string, string | undefined>;
}

function buildInResolver(prefix: string): string | null {
  if (prefix === "xsl") {
    return XSLT1_NSURI;
  }
  return null;
}

const simpleElements = new Map<string, SimpleElement>([
  ["copy", { name: "copy", arguments: new Map(), hasChildren: true }],
  [
    "copy-of",
    {
      name: "copyOf",
      arguments: new Map([["select", undefined]]),
      hasChildren: true,
    },
  ],
  ["document", { name: "document", arguments: new Map(), hasChildren: true }],
  [
    "if",
    {
      name: "ifX",
      arguments: new Map([["test", undefined]]),
      hasChildren: true,
    },
  ],
  [
    "message",
    {
      name: "message",
      arguments: new Map([
        ["select", undefined],
        ["terminate", "no"],
      ]),
      hasChildren: true,
    },
  ],
  [
    "sequence",
    {
      name: "sequence",
      arguments: new Map([["select", undefined]]),
      hasChildren: false,
    },
  ],
]);

function compileApplyTemplatesNode(node: slimdom.Element) {
  const mode = expandQname(node.getAttribute("mode"), getNodeNS(node));
  const args = {
    select: mkLiteral(node.getAttribute("select") || "child::node()"),
    mode: mkLiteral(mode || "#default"),
    params: compileParams("with-param", node.childNodes),
    sortKeyComponents: compileSortKeyComponents(node.childNodes),
    namespaces: mkNamespaceArg(node),
  };
  return compileFuncall("applyTemplates", [mkObject(args)]);
}

function compileFunctionNode(node: slimdom.Element) {
  const [namespace, name] = resolveQname(
    node.getAttribute("name"),
    getNodeNS(node),
  );
  const args = {
    name: mkLiteral(name),
    namespace: mkLiteral(namespace),
    as: mkLiteral(node.getAttribute("as")),
    params: compileParams("param", node.childNodes),
    namespaces: mkNamespaceArg(node),
  };
  return compileFuncallWithChildren(node, "functionX", mkObject(args));
}

function compileForEachNode(node: slimdom.Element) {
  const args = {
    select: mkLiteral(node.getAttribute("select")),
    sortKeyComponents: compileSortKeyComponents(node.childNodes),
    namespaces: mkNamespaceArg(node),
  };
  return compileFuncallWithChildren(node, "forEach", mkObject(args));
}

function compileForEachGroupNode(node: slimdom.Element) {
  const args = {
    select: mkLiteral(node.getAttribute("select")),
    groupBy: mkLiteral(node.getAttribute("group-by")),
    sortKeyComponents: compileSortKeyComponents(node.childNodes),
    namespaces: mkNamespaceArg(node),
  };
  return compileFuncallWithChildren(node, "forEachGroup", mkObject(args));
}

function compileNextMatchNode(node: slimdom.Element) {
  const args = {
    params: compileParams("with-param", node.childNodes),
    namespaces: mkNamespaceArg(node),
  };
  return compileFuncall("nextMatch", [mkObject(args)]);
}

function compileApplyImportsNodes(node: slimdom.Element) {
  const args = {
    params: compileParams("with-param", node.childNodes),
    namespaces: mkNamespaceArg(node),
  };
  return compileFuncall("applyImports", [mkObject(args)]);
}

/* Compile a param or variable, which contains either a select
   statement or a SequenceConstructor. */
function compileVariableLike(node: slimdom.Element) {
  let name = mkLiteral(node.getAttribute("name"));
  if (node.hasAttribute("select")) {
    return mkObject({
      name: name,
      content: mkLiteral(node.getAttribute("select")),
      namespaces: mkNamespaceArg(node),
      as: mkLiteral(node.getAttribute("as")),
    });
  } else if (node.hasChildNodes()) {
    return mkObject({
      name: name,
      content: mkArrowFun(compileSequenceConstructor(node.childNodes)),
      namespaces: mkNamespaceArg(node),
      as: mkLiteral(node.getAttribute("as")),
    });
  } else {
    return mkObject({
      name: name,
      content: mkLiteral(undefined),
      namespaces: mkObject({}),
      as: mkLiteral(node.getAttribute("as")),
    });
  }
}

function compileSortKeyComponents(nodes: any[]) {
  let sortKeyComponents = [];
  for (let node of nodes) {
    if (node.localName === "sort") {
      const args = {
        namespaces: mkNamespaceArg(node),
        order: compileAvt(node.getAttribute("order")),
        lang: compileAvt(node.getAttribute("lang")),
        dataType: mkLiteral(node.getAttribute("data-type")),
      };
      if (node.hasChildNodes()) {
        sortKeyComponents.push(
          mkObject({
            ...args,
            sortKey: mkArrowFun(compileSequenceConstructor(node.childNodes)),
          }),
        );
      } else {
        sortKeyComponents.push(
          mkObject({
            ...args,
            sortKey: mkLiteral(node.getAttribute("select") || "."),
          }),
        );
      }
    }
  }
  return mkArray(sortKeyComponents);
}

function compileVariable(node: slimdom.Element) {
  return compileFuncall("variable", [compileVariableLike(node)]);
}

function compileParams(nodename: string, nodes: any[]) {
  let params = [];
  for (let node of nodes) {
    if (node.localName === nodename) {
      params.push(compileVariableLike(node));
    }
  }
  return mkArray(params);
}

function compileCallTemplate(node: slimdom.Element) {
  let args = {};
  let name = expandQname(node.getAttribute("name"), getNodeNS(node));
  args["name"] = mkLiteral(name);
  if (!args["name"]) {
    throw new Error("");
  }
  args["params"] = compileParams("with-param", node.childNodes);
  return compileFuncall("callTemplate", [mkObject(args)]);
}

function compileResultDocument(node: slimdom.Element) {
  const args = {
    format: compileAvt(node.getAttribute("format")),
    href: compileAvt(node.getAttribute("href")),
    omitXmlDeclaration: compileAvt(node.getAttribute("omit-xml-declaration")),
    doctypeSystem: compileAvt(node.getAttribute("doctype-system")),
    doctypePublic: compileAvt(node.getAttribute("doctype-public")),
    standalone: compileAvt(node.getAttribute("standalone")),
    namespaces: mkNamespaceArg(node),
  };
  return compileFuncallWithChildren(node, "resultDocument", mkObject(args));
}

function compileFuncall(name: string, args: Expression[]) {
  return mkCallWithContext(mkMember("xjslt", name), args);
}

function compileFuncallWithChildren(
  node: slimdom.Element,
  name: string,
  args: ObjectExpression,
): ExpressionStatement {
  return mkCallWithContext(mkMember("xjslt", name), [
    args,
    mkArrowFun(compileSequenceConstructor(node.childNodes)),
  ]);
}

function mkNamespaceArg(node: slimdom.Element) {
  let namespaces = getNodeNS(node);
  for (let key in namespaces) {
    namespaces[key] = mkLiteral(namespaces[key]);
  }
  return mkObject(namespaces);
}

function compileArgs(
  node: slimdom.Element,
  keyList: Map<string, string | undefined>,
): ObjectExpression {
  var args = {};
  for (let [key, fallback] of keyList) {
    let value = node.getAttribute(key);
    if (value === null) {
      value = fallback;
    }
    args[key] = mkLiteral(value);
  }
  args["namespaces"] = mkNamespaceArg(node);
  return mkObject(args);
}

function compileSimpleElement(node: slimdom.Element) {
  const what = simpleElements.get(node.localName);
  const args = compileArgs(node, what.arguments);
  if (what.hasChildren) {
    return compileFuncallWithChildren(node, what.name, args);
  } else {
    return compileFuncall(what.name, [args]);
  }
}

function compileChooseNode(node: slimdom.Element) {
  let alternatives = [];
  for (let childNode of node.childNodes) {
    if (childNode instanceof slimdom.Element) {
      if (childNode.localName === "when") {
        alternatives.push(
          mkObject({
            test: mkLiteral(childNode.getAttribute("test")),
            apply: mkArrowFun(compileSequenceConstructor(childNode.childNodes)),
          }),
        );
      } else if (childNode.localName === "otherwise") {
        alternatives.push(
          mkObject({
            apply: mkArrowFun(compileSequenceConstructor(childNode.childNodes)),
          }),
        );
      }
    }
  }
  return mkCallWithContext(mkMember("xjslt", "choose"), [
    mkArray(alternatives),
  ]);
}

function compileStylesheetParam(node: slimdom.Element) {
  let param = compileVariableLike(node);
  return mkCallWithContext(mkMember("xjslt", "param"), [param]);
}

function compileWhitespaceDeclarationNode(
  node: slimdom.Element,
  preserve: boolean,
) {
  return mkCall(
    mkMember("whitespaceDeclarations", "push"),
    node
      .getAttribute("elements")
      .split(/[\n\r\t ]/)
      .map((e) => {
        return mkObject({
          importPrecedence: mkLiteral(
            node.getAttribute("import-precedence") || 1,
          ),
          match: mkLiteral(e),
          preserve: mkLiteral(preserve),
          namespaces: mkNamespaceArg(node),
        });
      }),
  );
}

function mkResolverForNode(node: slimdom.Element): NamespaceResolver {
  return (prefix: string) => {
    return node.lookupNamespaceURI(prefix);
  };
}

function skipAttribute(attr: slimdom.Attr): boolean {
  if (attr.namespaceURI == XMLNS_NSURI && attr.value === XSLT1_NSURI) {
    return true;
  }
  return false;
}

function compileLiteralElementNode(node: slimdom.Element) {
  let attributes = [];
  for (let n in node.attributes) {
    let attr = node.attributes[n];
    if (skipAttribute(attr)) {
      continue;
    }
    attributes.push(
      mkObject({
        name: mkLiteral(attr.name),
        value: compileAvt(attr.value),
        namespace: mkLiteral(attr.namespaceURI || undefined),
      }),
    );
  }
  /* The DOM API is so confusing... we don't need to do this with
     attributes. */
  let name = node.localName;
  if (node.prefix) {
    name = `${node.prefix}:${name}`;
  }
  return mkCallWithContext(mkMember("xjslt", "literalElement"), [
    mkObject({
      name: mkLiteral(name),
      attributes: mkArray(attributes),
      namespace: mkLiteral(node.namespaceURI),
      namespaces: mkNamespaceArg(node),
    }),
    mkArrowFun(compileSequenceConstructor(node.childNodes)),
  ]);
}

export function getNodeNS(node: slimdom.Element, retval: object = undefined) {
  if (!retval) {
    retval = {};
  }
  if (node.parentElement) {
    getNodeNS(node.parentElement, retval);
  }
  if (node.attributes) {
    for (let attribute of node.attributes) {
      if (attribute.namespaceURI === XMLNS_NSURI) {
        let name = attribute.localName;
        if (name === "xmlns") {
          name = "";
        }
        retval[name] = attribute.value;
      }
    }
  }
  return retval;
}

/* todo - separate into top-level & sequence-generator versions */
export function compileTopLevelNode(node: slimdom.Element) {
  if (node.nodeType === NodeType.ELEMENT) {
    if (node.namespaceURI === XSLT1_NSURI) {
      if (
        node.hasAttribute("use-when") &&
        !evaluateXPathToBoolean(node.getAttribute("use-when"))
      ) {
        return undefined;
      }
      if (node.localName === "template") {
        return compileTemplateNode(node);
      } else if (node.localName === "variable") {
        return compileVariable(node);
      } else if (node.localName === "param") {
        return compileStylesheetParam(node);
      } else if (node.localName === "key") {
        return compileKeyNode(node);
      } else if (node.localName === "function") {
        return compileFunctionNode(node);
      } else if (node.localName === "output") {
        return compileOutputNode(node);
      } else if (
        node.localName === "attribute-set" ||
        node.localName === "character-map" ||
        node.localName === "decimal-format" ||
        node.localName === "import-schema" ||
        node.localName === "namespace-alias"
      ) {
        return undefined;
      } else if (node.localName === "preserve-space") {
        return compileWhitespaceDeclarationNode(node, true);
      } else if (node.localName === "strip-space") {
        return compileWhitespaceDeclarationNode(node, false);
      } else {
        throw new Error("Found unexpected XSL element: " + node.tagName);
      }
    }
  }
}

export function compileOutputNode(node: slimdom.Element) {
  const name = node.getAttribute("name") || "#default";
  const outputDefinition: OutputDefinition = mkOutputDefinition({
    omitXmlDeclaration: node.getAttribute("omit-xml-declaration") || undefined,
    doctypeSystem: node.getAttribute("doctype-system") || undefined,
    doctypePublic: node.getAttribute("doctype-public") || undefined,
    standalone: node.getAttribute("standalone") || undefined,
  });
  let tmp = {};
  for (const key in outputDefinition) {
    tmp[key] = mkLiteral(outputDefinition[key]);
  }
  if (!name) {
    mkCall(mkMember("outputDefinitions", "set"), [
      {
        type: "ObjectExpression",
        properties: [
          { type: "SpreadElement", argument: mkObject(tmp) },
          {
            type: "SpreadElement",
            argument: {
              type: "CallExpression",
              callee: mkMember("outputDefinitions", "get"),
              arguments: [mkLiteral("#default")],
              optional: false,
            },
          },
        ],
      },
    ]);
  } else {
    return mkCall(mkMember("outputDefinitions", "set"), [
      mkLiteral(name),
      mkObject(tmp),
    ]);
  }
}

export function compileSequenceConstructorNode(node: slimdom.Element) {
  if (node.nodeType === NodeType.TEXT) {
    return compileLiteralTextNode(node);
  } else if (node.nodeType === NodeType.ELEMENT) {
    if (node.namespaceURI === XSLT1_NSURI) {
      if (
        node.hasAttribute("use-when") &&
        !evaluateXPathToBoolean(node.getAttribute("use-when"))
      ) {
        return undefined;
      }
      if (simpleElements.has(node.localName)) {
        return compileSimpleElement(node);
      } else if (node.localName === "apply-imports") {
        return compileApplyImportsNodes(node);
      } else if (node.localName === "apply-templates") {
        return compileApplyTemplatesNode(node);
      } else if (node.localName === "attribute") {
        return compileAttributeNode(node);
      } else if (node.localName === "choose") {
        return compileChooseNode(node);
      } else if (node.localName === "call-template") {
        return compileCallTemplate(node);
      } else if (node.localName === "comment") {
        return compileCommentNode(node);
      } else if (node.localName === "element") {
        return compileElementNode(node);
      } else if (node.localName === "for-each") {
        return compileForEachNode(node);
      } else if (node.localName === "for-each-group") {
        return compileForEachGroupNode(node);
      } else if (node.localName === "namespace") {
        return compileNamespaceNode(node);
      } else if (node.localName === "next-match") {
        return compileNextMatchNode(node);
      } else if (node.localName === "number") {
        // TODO
      } else if (node.localName === "param") {
        // Handled by special case.
      } else if (node.localName === "processing-instruction") {
        return compileProcessingInstruction(node);
      } else if (node.localName === "result-document") {
        return compileResultDocument(node);
      } else if (node.localName === "sort") {
        // Handled by special case.
      } else if (node.localName === "text") {
        return compileTextNode(node);
      } else if (node.localName === "variable") {
        return compileVariable(node);
      } else if (node.localName === "strip-space") {
        return undefined;
      } else if (node.localName === "value-of") {
        return compileValueOf(node);
      } else {
        throw new Error("Found unexpected XSL element: " + node.tagName);
      }
    } else {
      return compileLiteralElementNode(node);
    }
  }
}

function compileElementNode(node: slimdom.Element) {
  const args = {
    name: compileAvt(node.getAttribute("name")),
    namespace: compileAvt(node.getAttribute("namespace")),
    namespaces: mkNamespaceArg(node),
  };
  return compileFuncallWithChildren(node, "element", mkObject(args));
}

function compileAttributeNode(node: slimdom.Element) {
  const args = {
    name: compileAvt(node.getAttribute("name")),
    separator: compileAvt(node.getAttribute("separator")),
    select: mkLiteral(node.getAttribute("select")),
    namespace: compileAvt(node.getAttribute("namespace")),
    namespaces: mkNamespaceArg(node),
  };
  return compileFuncallWithChildren(node, "attribute", mkObject(args));
}

function compileProcessingInstruction(node: slimdom.Element) {
  const args = {
    select: mkLiteral(node.getAttribute("select")),
    name: compileAvt(node.getAttribute("name")),
    namespaces: mkNamespaceArg(node),
  };
  return compileFuncallWithChildren(
    node,
    "processingInstruction",
    mkObject(args),
  );
}

function compileNamespaceNode(node: slimdom.Element) {
  const args = {
    select: mkLiteral(node.getAttribute("select")),
    name: compileAvt(node.getAttribute("name")),
    namespaces: mkNamespaceArg(node),
  };
  return compileFuncallWithChildren(node, "namespace", mkObject(args));
}

function compileCommentNode(node: slimdom.Element) {
  const args = {
    select: mkLiteral(node.getAttribute("select")),
    namespaces: mkNamespaceArg(node),
  };
  return compileFuncallWithChildren(node, "comment", mkObject(args));
}

function compileValueOf(node: slimdom.Element) {
  const args = {
    select: mkLiteral(node.getAttribute("select")),
    separator: compileAvt(node.getAttribute("separator")),
    namespaces: mkNamespaceArg(node),
  };
  return compileFuncallWithChildren(node, "valueOf", mkObject(args));
}

function compileTextNode(node: slimdom.Element) {
  if (node instanceof slimdom.Element && node.childElementCount > 0) {
    throw new Error("XTSE0010 element found as child of xsl:text");
  }
  return mkCallWithContext(mkMember("xjslt", "text"), [
    mkObject({
      disableOutputEscaping: mkLiteral(false), // TODO
    }),
    mkArrowFun([compileLiteralTextNode(node)]),
  ]);
}

function compileNodeArray(
  nodes: Array<any>,
  compilerFunc: (any) => Statement,
): Array<Statement> {
  let body = [];
  for (let n in nodes) {
    let compiled = compilerFunc(nodes[n]);
    if (compiled) body.push(compiled);
  }
  return body;
}

function compileSequenceConstructor(nodes: Array<any>): Array<Statement> {
  return compileNodeArray(nodes, compileSequenceConstructorNode);
}

export function compileStylesheetNode(node: slimdom.Element): Program {
  return {
    type: "Program",
    sourceType: "module",
    body: [
      ...mkImportsNode(),
      mkFun(
        mkIdentifier("transform"),
        [mkIdentifier("document"), mkIdentifier("params")],
        mkBlock([
          {
            type: "ExpressionStatement",
            expression: {
              type: "AssignmentExpression",
              operator: "=",
              left: mkIdentifier("params"),
              right: {
                type: "CallExpression",
                callee: mkMember("xjslt", "setParamDefaults"),
                arguments: [mkIdentifier("document"), mkIdentifier("params")],
                optional: false,
              },
            },
          },
          mkLet(mkIdentifier("templates"), mkArray([])),
          mkLet(mkIdentifier("whitespaceDeclarations"), mkArray([])),
          mkLet(
            mkIdentifier("resultDocuments"),
            mkNew(mkIdentifier("Map"), []),
          ),
          mkCall(mkMember("resultDocuments", "set"), [
            mkLiteral("#default"),
            mkObject({ document: mkMember("params", "outputDocument") }),
          ]),
          mkLet(mkIdentifier("keys"), mkNew(mkIdentifier("Map"), [])),
          mkLet(
            mkIdentifier("outputDefinitions"),
            mkNew(mkIdentifier("Map"), []),
          ),
          mkLet(
            mkIdentifier("context"),
            mkObject({
              outputDocument: mkMember("params", "outputDocument"),
              append: {
                type: "CallExpression",
                callee: mkMember("xjslt", "mkNodeAppender"),
                arguments: [mkMember("params", "outputNode")],
                optional: false,
              },
              resultDocuments: mkIdentifier("resultDocuments"),
              contextItem: mkIdentifier("document"),
              mode: mkMember("params", "initialMode"),
              templates: mkIdentifier("templates"),
              variableScopes: mkArray([mkNew(mkIdentifier("Map"), [])]),
              inputURL: mkMember("params", "inputURL"),
              keys: mkIdentifier("keys"),
              outputDefinitions: mkIdentifier("outputDefinitions"),
              patternMatchCache: mkNew(mkIdentifier("Map"), []),
              stylesheetParams: mkMember("params", "stylesheetParams"),
            }),
          ),
          /* First compile the keys */
          ...compileNodeArray(
            evaluateXPathToNodes("./xsl:key", node, undefined, undefined, {
              namespaceResolver: buildInResolver,
            }),
            compileTopLevelNode,
          ),
          /* Then the functions */
          ...compileNodeArray(
            evaluateXPathToNodes("./xsl:function", node, undefined, undefined, {
              namespaceResolver: buildInResolver,
            }),
            compileTopLevelNode,
          ),
          /* Then the output definitions */
          ...compileNodeArray(
            evaluateXPathToNodes("./xsl:output", node, undefined, undefined, {
              namespaceResolver: buildInResolver,
            }),
            compileTopLevelNode,
          ),
          /* Then compile the templates */
          ...compileNodeArray(
            evaluateXPathToNodes("./xsl:template", node, undefined, undefined, {
              namespaceResolver: buildInResolver,
            }),
            compileTopLevelNode,
          ),
          mkCall(mkMember("xjslt", "sortSortable"), [
            mkIdentifier("templates"),
          ]),
          /* Then everything else */
          ...compileNodeArray(
            evaluateXPathToNodes(
              "./xsl:*[local-name()!='template' and local-name()!='key' and local-name()!='function' and local-name()!='output']",
              node,
              undefined,
              undefined,
              { namespaceResolver: buildInResolver },
            ),
            compileTopLevelNode,
          ),
          mkCall(mkMember("xjslt", "sortSortable"), [
            mkIdentifier("whitespaceDeclarations"),
          ]),
          mkCall(mkMember("xjslt", "stripSpace"), [
            mkIdentifier("document"),
            mkIdentifier("whitespaceDeclarations"),
          ]),
          mkCallWithContext(mkMember("xjslt", "processNode"), [
            mkArray([]),
            mkNamespaceArg(node),
          ]),
          mkReturn(mkIdentifier("resultDocuments")),
        ]),
      ),
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: {
            type: "MemberExpression",
            object: mkMember("module", "exports"),
            property: mkIdentifier("transform"),
            computed: false,
            optional: false,
          },
          right: mkIdentifier("transform"),
        },
      },
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: {
            type: "MemberExpression",
            object: mkIdentifier("global"),
            property: mkIdentifier("transform"),
            computed: false,
            optional: false,
          },
          right: mkIdentifier("transform"),
        },
      },
    ],
  };
}

function expandQname(name: string | null, namespaces: object) {
  if (!name) {
    return name;
  }
  const [prefix, localName] = name.split(":");
  if (localName && namespaces[prefix]) {
    return `${namespaces[prefix]}#${localName}`;
  }
  return name;
}

function resolveQname(name: string | null, namespaces: object) {
  if (!name) {
    return [undefined, name];
  }
  const [prefix, localName] = name.split(":");
  if (localName && namespaces[prefix]) {
    return [namespaces[prefix], localName];
  }
  return [undefined, name];
}

function compileTemplateNode(node: slimdom.Element): ExpressionStatement {
  let allowedParams = compileParams("param", node.childNodes);
  let namespaces = getNodeNS(node);
  const match: string | undefined = node.getAttribute("match") || undefined;
  let matchFunction: any = mkLiteral(undefined);
  if (match) {
    let compiled = compileXPathToJavaScript(match, evaluateXPath.NODES_TYPE, {
      namespaceResolver: mkResolverForNode(node),
    });
    if (compiled.isAstAccepted) {
      matchFunction = {
        type: "CallExpression",
        callee: mkMember("xjslt", "compileMatchFunction"),
        arguments: [mkLiteral(compiled.code)],
        optional: false,
      };
    }
  }
  return mkCall(mkMember("templates", "push"), [
    mkObject({
      match: mkLiteral(match),
      matchFunction: matchFunction,
      name: mkLiteral(
        expandQname(node.getAttribute("name"), namespaces) || undefined,
      ),
      modes: mkArray(
        (node.getAttribute("mode") || "#default")
          .split(" ")
          .filter((s) => s !== "")
          .map((m) => expandQname(m.trim(), namespaces))
          .map(mkLiteral),
      ),
      allowedParams: allowedParams,
      apply: mkArrowFun(
        compileNodeArray(node.childNodes, compileSequenceConstructorNode),
      ),
      namespaces: mkNamespaceArg(node),
      priority: mkLiteral(node.getAttribute("priority")),
      importPrecedence: mkLiteral(node.getAttribute("import-precedence") || 1),
    }),
  ]);
}

function compileKeyNode(node: slimdom.Element): ExpressionStatement {
  let namespaces = getNodeNS(node);

  return mkCall(mkMember("keys", "set"), [
    mkLiteral(expandQname(node.getAttribute("name"), namespaces)),
    mkNew(mkMember("xjslt", "KeyImpl"), [
      mkLiteral(node.getAttribute("match")),
      node.getAttribute("use")
        ? mkLiteral(node.getAttribute("use"))
        : mkArrowFun(
            compileNodeArray(node.childNodes, compileSequenceConstructorNode),
          ),
      mkNamespaceArg(node),
    ]),
  ]);
}

function compileLiteralTextNode(node: slimdom.Element): ExpressionStatement {
  return mkCallWithContext(mkMember("xjslt", "literalText"), [
    mkLiteral(node.textContent),
  ]);
}

export function compileAvtRaw(avt: string | undefined | null): any {
  if (avt === undefined || avt === null) {
    return undefined;
  }
  let retval: Array<any> = [];
  let strOutput: string = "";
  let xpathOutput: xpathstring = { xpath: "" };
  let inXpath = false;
  for (let i = 0; i < avt.length; i++) {
    if (avt[i] === "{") {
      if (i + 1 < avt.length && avt[i + 1] === "{") {
        // quoted {
        i++;
        strOutput += "{";
      } else {
        // starting xpath
        if (inXpath) {
          throw new Error();
        }
        if (strOutput != "") {
          retval = retval.concat(strOutput);
        }
        strOutput = "";
        inXpath = true;
      }
    } else if (avt[i] === "}") {
      if (i + 1 < avt.length && avt[i + 1] === "}") {
        // quoted }
        i++;
        strOutput += "}";
      } else {
        if (!inXpath) {
          throw new Error("XTSE0370");
        }
        // Ending xpath
        retval = retval.concat(xpathOutput);
        xpathOutput = { xpath: "" };
        inXpath = false;
      }
    } else {
      if (inXpath) {
        if (avt[i] === "'" || avt[i] === '"') {
          /* In a silly exception, you don't need to escape braces in literals. Consume the literal. */
          const quote = avt[i];
          do {
            xpathOutput.xpath += avt[i++];
          } while (i < avt.length && avt[i] !== quote);
        }
        xpathOutput.xpath += avt[i];
      } else {
        strOutput += avt[i];
      }
    }
  }
  /* Finish up */
  if (inXpath) {
    throw new Error("XTSE0350");
  } else {
    if (strOutput != "") {
      retval = retval.concat(strOutput);
    }
  }
  return retval;
}

function compileAvt(avt: string | null) {
  const avtRaw = compileAvtRaw(avt);
  if (avtRaw === undefined || avtRaw === null) {
    return mkLiteral(undefined);
  }
  return mkArray(
    avtRaw.map((comp) => {
      if (typeof comp === "string") {
        return mkLiteral(comp);
      } else {
        return mkObject({ xpath: mkLiteral(comp.xpath) });
      }
    }),
  );
}

function preprocess(doc: slimdom.Document, path: string): slimdom.Document {
  if (
    !evaluateXPathToBoolean(
      "/xsl:stylesheet|/xsl:transform",
      doc,
      undefined,
      undefined,
      { namespaceResolver: mkResolver({ xsl: XSLT1_NSURI }) },
    )
  ) {
    doc = preprocessSimplified(doc).get("#default").document;
  }
  let counter = 0;
  while (
    evaluateXPathToBoolean(
      "//xsl:include|//xsl:import",
      doc,
      undefined,
      undefined,
      {
        namespaceResolver: mkResolver({ xsl: XSLT1_NSURI }),
      },
    )
  ) {
    let basePrecedence = 100;
    doc = preprocessInclude(doc, {
      inputURL: pathToFileURL(path),
    }).get("#default").document;
    doc = preprocessImport(doc, {
      inputURL: pathToFileURL(path),
      stylesheetParams: { "base-precedence": basePrecedence },
    }).get("#default").document;
    basePrecedence += 100;
    if (counter > 100) throw new Error("Import level too deep!");
    counter++;
  }
  doc = preprocessErrorAnalysis(doc).get("#default").document;
  /* https://www.w3.org/TR/xslt20/#stylesheet-stripping */
  doc = preprocessStripWhitespace1(doc).get("#default").document;
  doc = preprocessStripWhitespace2(doc).get("#default").document;
  return doc;
}

export function compileStylesheet(xsltPath: string) {
  let slimdom_path = require.resolve("slimdom").split(path.sep);
  let root_dir = path.join(
    "/",
    ...slimdom_path.slice(0, slimdom_path.indexOf("node_modules")),
  );
  var tempdir = mkdtempSync(path.join(tmpdir(), "xjslt-"));
  symlinkSync(
    path.join(root_dir, "node_modules"),
    path.join(tempdir, "node_modules"),
  );
  symlinkSync(
    path.join(root_dir, "package.json"),
    path.join(tempdir, "package.json"),
  );
  symlinkSync(path.join(root_dir, "dist"), path.join(tempdir, "dist"));
  var tempfile = path.join(tempdir, "transform.js");
  let xsltDoc = preprocess(
    slimdom.parseXmlDocument(readFileSync(xsltPath).toString()),
    xsltPath,
  );
  writeFileSync(
    tempfile,
    generate(compileStylesheetNode(xsltDoc.documentElement)),
  );
  return tempfile;
  //  rmSync(tempdir, { recursive: true });
}

/**
 * Build a stylesheet. Returns a function that will take an input DOM
 * document and return an output DOM document.
 */
export function buildStylesheet(xsltPath: string) {
  const tempfile = compileStylesheet(xsltPath);
  let transform = require(tempfile);
  // console.log(readFileSync(tempfile).toString());
  return transform.transform;
}
