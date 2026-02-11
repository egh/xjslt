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
  mkReturn,
  toEstree,
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
  CompileContext,
  XSLT1_NSURI,
  XMLNS_NSURI,
  NodeType,
  OutputDefinition,
  xpathstring,
} from "./definitions";
import { mkOutputDefinition, mkResolver, sortSortable } from "./shared";

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

function compileApplyTemplatesNode(
  node: slimdom.Element,
  context: CompileContext,
) {
  const mode = expandQname(node.getAttribute("mode"), getNodeNS(node));
  const args = {
    select: node.getAttribute("select") || "child::node()",
    mode: mode || "#default",
    params: compileParams("with-param", node.childNodes, context),
    sortKeyComponents: compileSortKeyComponents(node.childNodes, context),
    namespaces: getNodeNS(node),
  };
  return compileFuncall("applyTemplates", [toEstree(args)]);
}

function compileFunctionNode(node: slimdom.Element, context: CompileContext) {
  const [namespace, name] = resolveQname(
    node.getAttribute("name"),
    getNodeNS(node),
  );
  const args = {
    name: name,
    namespace: namespace,
    as: node.getAttribute("as"),
    params: compileParams("param", node.childNodes, context),
    namespaces: getNodeNS(node),
  };
  return mkCall(mkMember("xjslt", "functionX"), [
    toEstree(args),
    mkArrowFun(compileSequenceConstructor(node.childNodes, context)),
  ]);
}

function compileForEachNode(node: slimdom.Element, context: CompileContext) {
  const args = {
    select: node.getAttribute("select"),
    sortKeyComponents: compileSortKeyComponents(node.childNodes, context),
    namespaces: getNodeNS(node),
  };
  return compileFuncallWithChildren(node, "forEach", toEstree(args), context);
}

function compileForEachGroupNode(
  node: slimdom.Element,
  context: CompileContext,
) {
  return compileFuncallWithChildren(
    node,
    "forEachGroup",
    toEstree({
      select: node.getAttribute("select"),
      groupBy: node.getAttribute("group-by"),
      groupAdjacent: node.getAttribute("group-adjacent"),
      groupStartingWith: node.getAttribute("group-starting-with"),
      groupEndingWith: node.getAttribute("group-ending-with"),
      sortKeyComponents: compileSortKeyComponents(node.childNodes, context),
      namespaces: getNodeNS(node),
    }),
    context,
  );
}

function compilePerformSortNode(
  node: slimdom.Element,
  context: CompileContext,
) {
  return compileFuncall("performSort", [
    toEstree({
      select: node.getAttribute("select"),
      sortKeyComponents: compileSortKeyComponents(node.childNodes, context),
      namespaces: getNodeNS(node),
    }),
  ]);
}

function compileNextMatchNode(node: slimdom.Element, context: CompileContext) {
  return compileFuncall("nextMatch", [
    toEstree({
      params: compileParams("with-param", node.childNodes, context),
      namespaces: getNodeNS(node),
    }),
  ]);
}

function compileApplyImportsNodes(
  node: slimdom.Element,
  context: CompileContext,
) {
  return compileFuncall("applyImports", [
    toEstree({
      params: compileParams("with-param", node.childNodes, context),
      namespaces: getNodeNS(node),
    }),
  ]);
}

/* Compile a param or variable, which contains either a select
   statement or a SequenceConstructor. */
function compileVariableLike(node: slimdom.Element, context: CompileContext) {
  const name = node.getAttribute("name");
  const as = node.getAttribute("as");
  if (node.hasAttribute("select")) {
    return toEstree({
      name: name,
      content: node.getAttribute("select"),
      namespaces: getNodeNS(node),
      as: as,
    });
  } else if (node.hasChildNodes()) {
    return toEstree({
      name: name,
      content: mkArrowFun(compileSequenceConstructor(node.childNodes, context)),
      namespaces: getNodeNS(node),
      as: as,
    });
  } else {
    return toEstree({
      name: name,
      content: undefined,
      namespaces: {},
      as: as,
    });
  }
}

function compileSortKeyComponents(nodes: any[], context: CompileContext) {
  let sortKeyComponents = [];
  for (let node of nodes) {
    if (node.localName === "sort") {
      const args = {
        namespaces: getNodeNS(node),
        order: compileAvt(node.getAttribute("order")),
        lang: compileAvt(node.getAttribute("lang")),
        dataType: node.getAttribute("data-type"),
      };
      if (node.hasChildNodes()) {
        sortKeyComponents.push(
          toEstree({
            ...args,
            sortKey: mkArrowFun(
              compileSequenceConstructor(node.childNodes, context),
            ),
          }),
        );
      } else {
        sortKeyComponents.push(
          toEstree({
            ...args,
            sortKey: node.getAttribute("select") || ".",
          }),
        );
      }
    }
  }
  return toEstree(sortKeyComponents);
}

function compileVariable(node: slimdom.Element, context: CompileContext) {
  return compileFuncall("variable", [compileVariableLike(node, context)]);
}

function compileParams(
  nodename: string,
  nodes: any[],
  context: CompileContext,
) {
  let params = [];
  for (let node of nodes) {
    if (node.localName === nodename) {
      params.push(compileVariableLike(node, context));
    }
  }
  return toEstree(params);
}

function compileCallTemplate(node: slimdom.Element, context: CompileContext) {
  let args = {};
  let name = expandQname(node.getAttribute("name"), getNodeNS(node));
  args["name"] = name;
  if (!args["name"]) {
    throw new Error("");
  }
  args["params"] = compileParams("with-param", node.childNodes, context);
  return compileFuncall("callTemplate", [toEstree(args)]);
}

function compileResultDocument(node: slimdom.Element, context: CompileContext) {
  const args = {
    format: compileAvt(node.getAttribute("format")),
    href: compileAvt(node.getAttribute("href")),
    omitXmlDeclaration: compileAvt(node.getAttribute("omit-xml-declaration")),
    doctypeSystem: compileAvt(node.getAttribute("doctype-system")),
    doctypePublic: compileAvt(node.getAttribute("doctype-public")),
    standalone: compileAvt(node.getAttribute("standalone")),
    namespaces: getNodeNS(node),
  };
  return compileFuncallWithChildren(
    node,
    "resultDocument",
    toEstree(args),
    context,
  );
}

function compileFuncall(name: string, args: Expression[]) {
  return mkCallWithContext(mkMember("xjslt", name), args);
}

function compileFuncallWithChildren(
  node: slimdom.Element,
  name: string,
  args: ObjectExpression,
  context: CompileContext,
): ExpressionStatement {
  return mkCallWithContext(mkMember("xjslt", name), [
    args,
    mkArrowFun(compileSequenceConstructor(node.childNodes, context)),
  ]);
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
    args[key] = value;
  }
  args["namespaces"] = getNodeNS(node);
  return toEstree(args);
}

function compileSimpleElement(node: slimdom.Element, context: CompileContext) {
  const what = simpleElements.get(node.localName);
  const args = compileArgs(node, what.arguments);
  if (what.hasChildren) {
    return compileFuncallWithChildren(node, what.name, args, context);
  } else {
    return compileFuncall(what.name, [args]);
  }
}

function compileChooseNode(node: slimdom.Element, context: CompileContext) {
  let alternatives = [];
  for (let childNode of node.childNodes) {
    if (childNode instanceof slimdom.Element) {
      if (childNode.localName === "when") {
        alternatives.push(
          toEstree({
            test: childNode.getAttribute("test"),
            apply: mkArrowFun(
              compileSequenceConstructor(childNode.childNodes, context),
            ),
          }),
        );
      } else if (childNode.localName === "otherwise") {
        alternatives.push(
          toEstree({
            apply: mkArrowFun(
              compileSequenceConstructor(childNode.childNodes, context),
            ),
          }),
        );
      }
    }
  }
  return mkCallWithContext(mkMember("xjslt", "choose"), [
    mkArray(alternatives),
  ]);
}

function compileStylesheetParam(
  node: slimdom.Element,
  context: CompileContext,
) {
  let param = compileVariableLike(node, context);
  return mkCallWithContext(mkMember("xjslt", "param"), [param]);
}

function compileWhitespaceDeclarationNode(
  node: slimdom.Element,
  preserve: boolean,
  context: CompileContext,
) {
  context.whitespaceDeclarations.push(
    ...node
      .getAttribute("elements")
      .split(/[\n\r\t ]+/)
      .map((e) => {
        return toEstree({
          importPrecedence: node.getAttribute("import-precedence") || 1,
          match: e,
          preserve: preserve,
          namespaces: getNodeNS(node),
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

function compileLiteralElementNode(
  node: slimdom.Element,
  context: CompileContext,
) {
  let attributes = [];
  for (let n in node.attributes) {
    let attr = node.attributes[n];
    if (skipAttribute(attr)) {
      continue;
    }
    attributes.push(
      toEstree({
        name: attr.name,
        value: compileAvt(attr.value),
        namespace: attr.namespaceURI || undefined,
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
    toEstree({
      name: name,
      attributes: attributes,
      namespace: node.namespaceURI,
      namespaces: getNodeNS(node),
    }),
    mkArrowFun(compileSequenceConstructor(node.childNodes, context)),
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
export function compileTopLevelNode(
  node: slimdom.Element,
  context: CompileContext,
) {
  if (node.nodeType === NodeType.ELEMENT) {
    if (node.namespaceURI === XSLT1_NSURI) {
      if (
        node.hasAttribute("use-when") &&
        !evaluateXPathToBoolean(node.getAttribute("use-when"))
      ) {
        return undefined;
      }
      if (node.localName === "template") {
        return compileTemplateNode(node, context);
      } else if (node.localName === "variable") {
        return compileVariable(node, context);
      } else if (node.localName === "param") {
        return compileStylesheetParam(node, context);
      } else if (node.localName === "key") {
        return compileKeyNode(node, context);
      } else if (node.localName === "function") {
        return compileFunctionNode(node, context);
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
        return compileWhitespaceDeclarationNode(node, true, context);
      } else if (node.localName === "strip-space") {
        return compileWhitespaceDeclarationNode(node, false, context);
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
    tmp[key] = outputDefinition[key];
  }
  if (!name) {
    mkCall(mkMember("outputDefinitions", "set"), [
      {
        type: "ObjectExpression",
        properties: [
          { type: "SpreadElement", argument: toEstree(tmp) },
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
    return mkCall(mkMember("outputDefinitions", "set"), toEstree([name, tmp]));
  }
}

export function compileSequenceConstructorNode(
  node: slimdom.Element,
  context: CompileContext,
) {
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
        return compileSimpleElement(node, context);
      } else if (node.localName === "apply-imports") {
        return compileApplyImportsNodes(node, context);
      } else if (node.localName === "apply-templates") {
        return compileApplyTemplatesNode(node, context);
      } else if (node.localName === "attribute") {
        return compileAttributeNode(node, context);
      } else if (node.localName === "choose") {
        return compileChooseNode(node, context);
      } else if (node.localName === "call-template") {
        return compileCallTemplate(node, context);
      } else if (node.localName === "comment") {
        return compileCommentNode(node, context);
      } else if (node.localName === "element") {
        return compileElementNode(node, context);
      } else if (node.localName === "for-each") {
        return compileForEachNode(node, context);
      } else if (node.localName === "for-each-group") {
        return compileForEachGroupNode(node, context);
      } else if (node.localName === "perform-sort") {
        return compilePerformSortNode(node, context);
      } else if (node.localName === "namespace") {
        return compileNamespaceNode(node, context);
      } else if (node.localName === "next-match") {
        return compileNextMatchNode(node, context);
      } else if (node.localName === "number") {
        // TODO
      } else if (node.localName === "param") {
        // Handled by special case.
      } else if (node.localName === "processing-instruction") {
        return compileProcessingInstruction(node, context);
      } else if (node.localName === "result-document") {
        return compileResultDocument(node, context);
      } else if (node.localName === "sort") {
        // Handled by special case.
      } else if (node.localName === "text") {
        return compileTextNode(node);
      } else if (node.localName === "variable") {
        return compileVariable(node, context);
      } else if (node.localName === "strip-space") {
        return undefined;
      } else if (node.localName === "value-of") {
        return compileValueOf(node, context);
      } else {
        throw new Error("Found unexpected XSL element: " + node.tagName);
      }
    } else {
      return compileLiteralElementNode(node, context);
    }
  }
}

function compileElementNode(node: slimdom.Element, context: CompileContext) {
  return compileFuncallWithChildren(
    node,
    "element",
    toEstree({
      name: compileAvt(node.getAttribute("name")),
      namespace: compileAvt(node.getAttribute("namespace")),
      namespaces: getNodeNS(node),
    }),
    context,
  );
}

function compileAttributeNode(node: slimdom.Element, context: CompileContext) {
  return compileFuncallWithChildren(
    node,
    "attribute",
    toEstree({
      name: compileAvt(node.getAttribute("name")),
      separator: compileAvt(node.getAttribute("separator")),
      select: node.getAttribute("select"),
      namespace: compileAvt(node.getAttribute("namespace")),
      namespaces: getNodeNS(node),
    }),
    context,
  );
}

function compileProcessingInstruction(
  node: slimdom.Element,
  context: CompileContext,
) {
  return compileFuncallWithChildren(
    node,
    "processingInstruction",
    toEstree({
      select: node.getAttribute("select"),
      name: compileAvt(node.getAttribute("name")),
      namespaces: getNodeNS(node),
    }),
    context,
  );
}

function compileNamespaceNode(node: slimdom.Element, context: CompileContext) {
  return compileFuncallWithChildren(
    node,
    "namespace",
    toEstree({
      select: node.getAttribute("select"),
      name: compileAvt(node.getAttribute("name")),
      namespaces: getNodeNS(node),
    }),
    context,
  );
}

function compileCommentNode(node: slimdom.Element, context: CompileContext) {
  return compileFuncallWithChildren(
    node,
    "comment",
    toEstree({
      select: node.getAttribute("select"),
      namespaces: getNodeNS(node),
    }),
    context,
  );
}

function compileValueOf(node: slimdom.Element, context: CompileContext) {
  return compileFuncallWithChildren(
    node,
    "valueOf",
    toEstree({
      select: node.getAttribute("select"),
      separator: compileAvt(node.getAttribute("separator")),
      namespaces: getNodeNS(node),
    }),
    context,
  );
}

function compileTextNode(node: slimdom.Element) {
  if (node instanceof slimdom.Element && node.childElementCount > 0) {
    throw new Error("XTSE0010 element found as child of xsl:text");
  }
  return mkCallWithContext(mkMember("xjslt", "text"), [
    toEstree({
      disableOutputEscaping: false, // TODO
    }),
    mkArrowFun([compileLiteralTextNode(node)]),
  ]);
}

function compileNodeArray(
  nodes: Array<any>,
  context: CompileContext,
  compilerFunc: (node: any, context: CompileContext) => Statement | void,
): Array<Statement> {
  let body = [];
  for (let n in nodes) {
    let compiled = compilerFunc(nodes[n], context);
    if (compiled) body.push(compiled);
  }
  return body;
}

function compileSequenceConstructor(
  nodes: Array<any>,
  context: CompileContext,
): Array<Statement> {
  return compileNodeArray(nodes, context, compileSequenceConstructorNode);
}

export function compileStylesheetNode(node: slimdom.Element): Program {
  let context: CompileContext = { templates: [], whitespaceDeclarations: [] };
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
          mkLet(
            mkIdentifier("resultDocuments"),
            mkNew(mkIdentifier("Map"), []),
          ),
          mkCall(mkMember("resultDocuments", "set"), [
            mkLiteral("#default"),
            toEstree({ document: mkMember("params", "outputDocument") }),
          ]),
          mkLet(mkIdentifier("keys"), mkNew(mkIdentifier("Map"), [])),
          mkLet(
            mkIdentifier("outputDefinitions"),
            mkNew(mkIdentifier("Map"), []),
          ),
          /* First compile the keys */
          ...compileNodeArray(
            evaluateXPathToNodes("./xsl:key", node, undefined, undefined, {
              namespaceResolver: buildInResolver,
            }),
            context,
            compileTopLevelNode,
          ),
          /* Then the functions */
          ...compileNodeArray(
            evaluateXPathToNodes("./xsl:function", node, undefined, undefined, {
              namespaceResolver: buildInResolver,
            }),
            context,
            compileTopLevelNode,
          ),
          /* Then the output definitions */
          ...compileNodeArray(
            evaluateXPathToNodes("./xsl:output", node, undefined, undefined, {
              namespaceResolver: buildInResolver,
            }),
            context,
            compileTopLevelNode,
          ),
          /* Then compile the templates */
          ...compileNodeArray(
            evaluateXPathToNodes("./xsl:template", node, undefined, undefined, {
              namespaceResolver: buildInResolver,
            }),
            context,
            compileTopLevelNode,
          ),
          mkLet(
            mkIdentifier("context"),
            toEstree({
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
              templates: sortSortable(context.templates),
              variableScopes: [mkNew(mkIdentifier("Map"), [])],
              inputURL: mkMember("params", "inputURL"),
              keys: mkIdentifier("keys"),
              outputDefinitions: mkIdentifier("outputDefinitions"),
              patternMatchCache: mkNew(mkIdentifier("Map"), []),
              stylesheetParams: mkMember("params", "stylesheetParams"),
            }),
          ),
          /* Then everything else */
          ...compileNodeArray(
            evaluateXPathToNodes(
              "./xsl:*[local-name()!='template' and local-name()!='key' and local-name()!='function' and local-name()!='output']",
              node,
              undefined,
              undefined,
              { namespaceResolver: buildInResolver },
            ),
            context,
            compileTopLevelNode,
          ),
          mkCall(mkMember("xjslt", "stripSpace"), [
            mkIdentifier("document"),
            toEstree(sortSortable(context.whitespaceDeclarations)),
          ]),
          mkCallWithContext(mkMember("xjslt", "processNode"), [
            toEstree([]),
            toEstree(getNodeNS(node)),
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

function compileTemplateNode(node: slimdom.Element, context: CompileContext) {
  let allowedParams = compileParams("param", node.childNodes, context);
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
  context.templates.push({
    match: match,
    matchFunction: matchFunction,
    name: expandQname(node.getAttribute("name"), namespaces) || undefined,
    modes: (node.getAttribute("mode") || "#default")
      .split(" ")
      .filter((s) => s !== "")
      .map((m) => expandQname(m.trim(), namespaces)),
    allowedParams: allowedParams,
    apply: mkArrowFun(
      compileNodeArray(
        node.childNodes,
        context,
        compileSequenceConstructorNode,
      ),
    ),
    namespaces: getNodeNS(node),
    priority: parseFloat(node.getAttribute("priority")) || undefined,
    importPrecedence: parseInt(node.getAttribute("import-precedence")) || 1,
  });
}

function compileKeyNode(
  node: slimdom.Element,
  context: CompileContext,
): ExpressionStatement {
  let namespaces = getNodeNS(node);

  return mkCall(mkMember("keys", "set"), [
    mkLiteral(expandQname(node.getAttribute("name"), namespaces)),
    mkNew(mkMember("xjslt", "KeyImpl"), [
      mkLiteral(node.getAttribute("match")),
      node.getAttribute("use")
        ? mkLiteral(node.getAttribute("use"))
        : mkArrowFun(
            compileNodeArray(
              node.childNodes,
              context,
              compileSequenceConstructorNode,
            ),
          ),
      toEstree(getNodeNS(node)),
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
  if (Array.isArray(avtRaw)) {
    return toEstree(
      avtRaw.map((comp) => {
        if (typeof comp === "string") {
          return comp;
        } else {
          return { xpath: comp.xpath };
        }
      }),
    );
  } else {
    return toEstree(avtRaw);
  }
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
  let basePrecedence = 100;
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
