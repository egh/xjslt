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
import { XSLT1_NSURI } from "./xjslt";

/**
 * Functions to walk a DOM tree of an XSLT stylesheet and generate an
 * ESTree that can be used to process an input document.
 */

interface SimpleElement {
  name: string;
  hasChildren: boolean;
  arguments: Map<string, string | undefined>;
}

const simpleElements = new Map<string, SimpleElement>([
  [
    "apply-templates",
    {
      name: "applyTemplates",
      arguments: new Map([
        ["select", "child::node()"],
        ["mode", "#default"],
      ]),
      hasChildren: false,
    },
  ],
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

/* Compile a param or variable, which contains either a select
   statement or a SequenceConstructor. */
function compileVariableLike(node: any) {
  let name = mkLiteral(node.getAttribute("name") || undefined);
  if (node.hasAttribute("select")) {
    return mkObject({
      name: name,
      content: mkLiteral(node.getAttribute("select") || undefined),
    });
  } else if (node.hasChildNodes()) {
    return mkObject({
      name: name,
      content: mkArrowFun(compileNodeArray(node.childNodes)),
    });
  } else {
    return mkObject({ name: name, content: mkLiteral(undefined) });
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
  args["name"] = mkLiteral(node.getAttribute("name"));
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
    mkArrowFun(compileNodeArray(node.childNodes)),
  ]);
}

function compileArgs(
  node: any,
  keyList: Map<string, string | undefined>,
): ObjectExpression {
  var args = {};
  for (let [key, fallback] of keyList) {
    args[key] = mkLiteral(node.getAttribute(key) || fallback);
  }
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
          apply: mkArrowFun(compileNodeArray(childNode.childNodes)),
        }),
      );
    } else if (childNode.localName === "otherwise") {
      alternatives.push(
        mkObject({
          apply: mkArrowFun(compileNodeArray(childNode.childNodes)),
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

function compileLiteralElementNode(node: any) {
  let attributes = [];
  for (let n in node.attributes) {
    attributes.push(
      mkObject({
        name: mkLiteral(node.attributes[n].localName),
        value: mkLiteral(node.attributes[n].value),
      }),
    );
  }
  return mkCallWithContext(mkMember("xjslt", "literalElement"), [
    mkObject({
      name: mkLiteral(node.localName),
      attributes: mkArray(attributes),
    }),
    mkArrowFun(compileNodeArray(node.childNodes)),
  ]);
}

/* todo - separate into top-level & sequence-generator versions */
export function compileNode(node: any) {
  if (node.nodeType === slimdom.Node.TEXT_NODE) {
    return compileLiteralTextNode(node);
  } else if (node.nodeType === slimdom.Node.ELEMENT_NODE) {
    if (node.namespaceURI === XSLT1_NSURI) {
      if (simpleElements.has(node.localName)) {
        return compileSimpleElement(node);
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
        return compileTopLevelParam(node);
      } else if (node.localName === "template") {
        return compileTemplateNode(node);
      } else if (node.localName === "text") {
        return compileTextNode(node);
      } else if (
        node.localName === "stylesheet" ||
        node.localName === "transform"
      ) {
        return compileStylesheetNode(node);
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
  } else if (node.nodeType === slimdom.Node.DOCUMENT_NODE) {
    return compileNode(node.documentElement);
  } else if (node.nodeType === slimdom.Node.COMMENT_NODE) {
    // Ignore, it's a comment.
  } else if (node.nodeType === slimdom.Node.PROCESSING_INSTRUCTION_NODE) {
    // Ignore??
  } else {
    throw new Error("Found node type: " + node.nodeType);
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

function compileNodeArray(nodes: Array<any>): Array<Statement> {
  let body = [];
  for (let n in nodes) {
    let compiled = compileNode(nodes[n]);
    if (compiled) body.push(compiled);
  }
  return body;
}

function compileStylesheetNode(node: any): Program {
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
          ...compileNodeArray(node.childNodes),
          mkCallWithContext(mkMember("xjslt", "processNode"), []),
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

function compileTemplateNode(node: any): ExpressionStatement {
  let allowedParams = compileParams("param", node.childNodes);
  let skipNodes = allowedParams.elements.length;
  return mkCall(mkMember("templates", "push"), [
    mkObject({
      match: mkLiteral(node.getAttribute("match") || undefined),
      name: mkLiteral(node.getAttribute("name") || undefined),
      modes: mkArray(
        (node.getAttribute("mode") || "#default").split(",").map(mkLiteral),
      ),
      allowedParams: allowedParams,
      apply: mkArrowFun(compileNodeArray(node.childNodes.slice(skipNodes))),
    }),
  ]);
}

function compileLiteralTextNode(node: any): ExpressionStatement {
  return mkCallWithContext(mkMember("xjslt", "literalText"), [
    mkLiteral(node.textContent),
  ]);
}
