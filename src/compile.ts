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
  mkArray,
  mkArrowFun,
  mkBlock,
  mkCall,
  mkCallWithContext,
  mkConst,
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
import { evaluateXPathToNodes } from "fontoxpath";
import { XSLT1_NSURI, XMLNS_NSURI, NamespaceResolver } from "./xjslt";

/**
 * Functions to walk a DOM tree of an XSLT stylesheet and generate an
 * ESTree that can be used to process an input document.
 */

interface SimpleElement {
  name: string;
  hasChildren: boolean;
  arguments: Map<string, string | undefined>;
}

function buildInResolver(prefix: string) {
  if (prefix === "xsl") {
    return XSLT1_NSURI;
  }
  return undefined;
}

const simpleElements = new Map<string, SimpleElement>([
  [
    "attribute",
    {
      name: "attribute",
      arguments: new Map([
        ["name", undefined],
        ["namespace", undefined],
      ]),
      hasChildren: true,
    },
  ],
  ["copy", { name: "copy", arguments: new Map(), hasChildren: true }],
  [
    "copy-of",
    {
      name: "copyOf",
      arguments: new Map([["select", undefined]]),
      hasChildren: true,
    },
  ],
  [
    "element",
    {
      name: "element",
      arguments: new Map([
        ["name", undefined],
        ["namespace", undefined],
      ]),
      hasChildren: true,
    },
  ],
  [
    "if",
    {
      name: "ifX",
      arguments: new Map([["test", undefined]]),
      hasChildren: true,
    },
  ],
  [
    "for-each",
    {
      name: "forEach",
      arguments: new Map([["select", undefined]]),
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
  [
    "value-of",
    {
      name: "valueOf",
      arguments: new Map([
        ["select", undefined],
        ["separator", undefined],
      ]),
      hasChildren: false,
    },
  ],
]);

function compileApplyTemplatesNode(node: any) {
  const mode = expandQname(node.getAttribute("mode"), getNodeNS(node));
  const args = {
    select: mkLiteral(node.getAttribute("select") || "child::node()"),
    mode: mkLiteral(mode || "#default"),
    params: compileParams("with-param", node.childNodes),
    namespaces: mkNamespaceArg(node),
  };
  return compileFuncall("applyTemplates", [mkObject(args)]);
}

/* Compile a param or variable, which contains either a select
   statement or a SequenceConstructor. */
function compileVariableLike(node: any) {
  let name = mkLiteral(node.getAttribute("name") || undefined);
  if (node.hasAttribute("select")) {
    return mkObject({
      name: name,
      content: mkLiteral(node.getAttribute("select") || undefined),
      namespaces: mkNamespaceArg(node),
    });
  } else if (node.hasChildNodes()) {
    return mkObject({
      name: name,
      content: mkArrowFun(compileSequenceConstructor(node.childNodes)),
      namespaces: mkNamespaceArg(node),
    });
  } else {
    return mkObject({
      name: name,
      content: mkLiteral(undefined),
      namespaces: mkObject({}),
    });
  }
}

function compileVariable(node: any) {
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

function compileCallTemplate(node: any) {
  let args = {};
  let name = expandQname(node.getAttribute("name"), getNodeNS(node));
  args["name"] = mkLiteral(name);
  if (!args["name"]) {
    throw new Error("");
  }
  args["params"] = compileParams("with-param", node.childNodes);
  return compileFuncall("callTemplate", [mkObject(args)]);
}

function compileFuncall(name: string, args: Expression[]) {
  return mkCallWithContext(mkMember("xjslt", name), args);
}

function compileFuncallWithChildren(
  node: any,
  name: string,
  args: ObjectExpression,
): ExpressionStatement {
  return mkCallWithContext(mkMember("xjslt", name), [
    args,
    mkArrowFun(compileSequenceConstructor(node.childNodes)),
  ]);
}

function mkNamespaceArg(node: any) {
  let namespaces = getNodeNS(node);
  for (let key in namespaces) {
    namespaces[key] = mkLiteral(namespaces[key]);
  }
  return mkObject(namespaces);
}

function compileArgs(
  node: any,
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

function compileSimpleElement(node: any) {
  const what = simpleElements.get(node.localName);
  const args = compileArgs(node, what.arguments);
  if (what.hasChildren) {
    return compileFuncallWithChildren(node, what.name, args);
  } else {
    return compileFuncall(what.name, [args]);
  }
}

function compileChooseNode(node: any) {
  let alternatives = [];
  for (let childNode of node.childNodes) {
    if (childNode.localName === "when") {
      alternatives.push(
        mkObject({
          test: mkLiteral(childNode.getAttribute("test") || undefined),
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
  return mkCallWithContext(mkMember("xjslt", "choose"), [
    mkArray(alternatives),
  ]);
}

function compileTopLevelParam(node: any) {
  let param = compileVariableLike(node);
  return mkCallWithContext(mkMember("xjslt", "param"), [param]);
}

function mkResolver(node: any): NamespaceResolver {
  return (prefix: string) => {
    return node.lookupNamespace(prefix);
  };
}

function compileLiteralElementNode(node: any) {
  let attributes = [];
  for (let n in node.attributes) {
    let attr = node.attributes[n];
    attributes.push(
      mkObject({
        name: mkLiteral(attr.name),
        value: mkLiteral(attr.value),
        namespace: mkLiteral(attr.namespaceURI),
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
    }),
    mkArrowFun(compileSequenceConstructor(node.childNodes)),
  ]);
}

export function getNodeNS(node: any, retval: object = undefined) {
  if (!retval) {
    retval = {};
  }
  if (node.parentElement) {
    getNodeNS(node.parentElement, retval);
  }
  if (node.attributes) {
    for (let attribute of node.attributes) {
      if (attribute.value === XSLT1_NSURI) {
        // We know about this!
      } else if (attribute.namespaceURI === XMLNS_NSURI) {
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
export function compileTopLevelNode(node: any) {
  if (node.nodeType === slimdom.Node.ELEMENT_NODE) {
    if (node.namespaceURI === XSLT1_NSURI) {
      if (node.localName === "template") {
        return compileTemplateNode(node);
      } else if (node.localName === "variable") {
        return compileVariable(node);
      } else if (node.localName === "param") {
        return compileTopLevelParam(node);
      } else if (
        node.localName === "output" ||
        node.localName === "preserve-space" ||
        node.localName === "import" ||
        node.localName === "include" ||
        node.localName === "attribute-set" ||
        node.localName === "character-map" ||
        node.localName === "decimal-format" ||
        node.localName === "function" ||
        node.localName === "import-schema" ||
        node.localName === "key" ||
        node.localName === "namespace-alias" ||
        node.localName === "output" ||
        node.localName === "preserve-space"
      ) {
        return undefined;
      } else if (node.localName === "strip-space") {
        return undefined;
      } else {
        throw new Error("Found unexpected XSL element: " + node.tagName);
      }
    }
  }
}

export function compileSequenceConstructorNode(node: any) {
  if (node.nodeType === slimdom.Node.TEXT_NODE) {
    return compileLiteralTextNode(node);
  } else if (node.nodeType === slimdom.Node.ELEMENT_NODE) {
    if (node.namespaceURI === XSLT1_NSURI) {
      if (simpleElements.has(node.localName)) {
        return compileSimpleElement(node);
      } else if (node.localName === "apply-templates") {
        return compileApplyTemplatesNode(node);
      } else if (node.localName === "choose") {
        return compileChooseNode(node);
      } else if (node.localName === "call-template") {
        return compileCallTemplate(node);
      } else if (node.localName === "copy-of") {
        // TODO
      } else if (node.localName === "key") {
        // TODO
      } else if (node.localName === "comment") {
        // TODO
      } else if (node.localName === "number") {
        // TODO
      } else if (node.localName === "copy") {
        // TODO
      } else if (node.localName === "param") {
        // Handled by special case.
      } else if (node.localName === "text") {
        return compileTextNode(node);
      } else if (node.localName === "variable") {
        return compileVariable(node);
      } else if (
        node.localName === "output" ||
        node.localName === "preserve-space"
      ) {
        return undefined;
      } else if (node.localName === "strip-space") {
        return undefined;
      } else {
        throw new Error("Found unexpected XSL element: " + node.tagName);
      }
    } else {
      return compileLiteralElementNode(node);
    }
  }
}

function compileTextNode(node: any) {
  if (node.childNodes.childElementCount > 0) {
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

export function compileStylesheetNode(node: any): Program {
  return {
    type: "Program",
    sourceType: "module",
    body: [
      ...mkImportsNode(),
      mkFun(
        mkIdentifier("transform"),
        [mkIdentifier("document"), mkIdentifier("initialMode")],
        mkBlock([
          mkConst(
            mkIdentifier("doc"),
            mkNew(mkMember("slimdom", "Document"), []),
          ),
          mkLet(mkIdentifier("templates"), mkArray([])),
          {
            type: "IfStatement",
            test: {
              type: "UnaryExpression",
              operator: "!",
              prefix: true,
              argument: mkIdentifier("initialMode"),
            },
            consequent: mkBlock([
              {
                type: "ExpressionStatement",
                expression: {
                  type: "AssignmentExpression",
                  operator: "=",
                  left: mkIdentifier("initialMode"),
                  right: mkLiteral("#default"),
                },
              },
            ]),
            alternate: null,
          },
          mkLet(
            mkIdentifier("context"),
            mkObject({
              outputDocument: mkIdentifier("doc"),
              outputNode: mkIdentifier("doc"),
              currentNode: mkIdentifier("document"),
              currentNodeList: mkArray([]),
              mode: mkIdentifier("initialMode"),
              templates: mkIdentifier("templates"),
              variableScopes: mkArray([mkNew(mkIdentifier("Map"), [])]),
            }),
          ),
          /* First compile the templates */
          ...compileNodeArray(
            evaluateXPathToNodes("./xsl:template", node, null, null, {
              namespaceResolver: buildInResolver,
            }),
            compileTopLevelNode,
          ),
          /* Then everything else */
          ...compileNodeArray(
            evaluateXPathToNodes(
              "./xsl:*[local-name()!='template']",
              node,
              null,
              null,
              { namespaceResolver: buildInResolver },
            ),
            compileTopLevelNode,
          ),
          mkCallWithContext(mkMember("xjslt", "processNode"), [
            mkArray([]),
            mkNamespaceArg(node),
          ]),
          mkReturn(mkIdentifier("context.outputDocument")),
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
    ],
  };
}

function expandQname(name: string, namespaces: object) {
  if (!name) {
    return name;
  }
  const [prefix, localName] = name.split(":");
  if (localName && namespaces[prefix]) {
    return `${namespaces[prefix]}#${localName}`;
  }
  return name;
}

function compileTemplateNode(node: any): ExpressionStatement {
  let allowedParams = compileParams("param", node.childNodes);
  let namespaces = getNodeNS(node);

  return mkCall(mkMember("templates", "push"), [
    mkObject({
      match: mkLiteral(node.getAttribute("match") || undefined),
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
      priority: mkLiteral(node.getAttribute("priority") || undefined),
      importPrecedence: mkLiteral(1), // TODO
    }),
  ]);
}

function compileLiteralTextNode(node: any): ExpressionStatement {
  return mkCallWithContext(mkMember("xjslt", "literalText"), [
    mkLiteral(node.textContent),
  ]);
}
