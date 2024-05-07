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
import { XSLT1_NSURI, NodeType } from "./xjslt";

/**
 * Functions to walk a DOM tree of an XSLT stylesheet and generate an
 * ESTree that can be used to process an input document.
 */

interface SimpleElement {
  name: string;
  hasChildren: boolean;
  arguments: Array<string>;
}

const simpleElements = new Map<string, SimpleElement>([
  [
    "apply-templates",
    {
      name: "applyTemplatesInternal",
      arguments: ["select"],
      hasChildren: false,
    },
  ],
  [
    "attribute",
    {
      name: "attributeInternal",
      arguments: ["name", "namespace"],
      hasChildren: true,
    },
  ],
  [
    "element",
    {
      name: "elementInternal",
      arguments: ["name", "namespace"],
      hasChildren: true,
    },
  ],
  [
    "if",
    {
      name: "ifInternal",
      arguments: ["test"],
      hasChildren: true,
    },
  ],
  [
    "for-each",
    {
      name: "forEachInternal",
      arguments: ["select"],
      hasChildren: true,
    },
  ],
  [
    "sequence",
    { name: "sequenceInternal", arguments: ["select"], hasChildren: false },
  ],
  [
    "value-of",
    {
      name: "valueOfInternal",
      arguments: ["select", "separator"],
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
  return compileFuncall("variableInternal", [compileVariableLike(node)]);
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
  let args = compileArgs(node, ["name"]);
  let params = compileParams("with-param", node.childNodes);
  return compileFuncall("callTemplateInternal", [args, params]);
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

function compileArgs(node: any, keyList: string[]): ObjectExpression {
  var args = {};
  for (var key of keyList) {
    args[key] = mkLiteral(node.getAttribute(key) || undefined);
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
  return mkCallWithContext(mkMember("xjslt", "chooseInternal"), [
    mkArray(alternatives),
  ]);
}

function compileTopLevelParam(node: any) {
  let param = compileVariableLike(node);
  return mkCallWithContext(mkMember("xjslt", "paramInternal"), [param]);
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
  return mkCallWithContext(mkMember("xjslt", "literalElementInternal"), [
    mkObject({
      name: mkLiteral(node.localName),
      attributes: mkArray(attributes),
    }),
    mkArrowFun(compileNodeArray(node.childNodes)),
  ]);
}

/* todo - separate into top-level & sequence-generator versions */
export function compileNode(node: any) {
  if (node.nodeType === NodeType.TEXT_NODE) {
    return compileLiteralTextNode(node);
  } else if (node.nodeType === NodeType.ELEMENT_NODE) {
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
  } else if (node.nodeType === NodeType.DOCUMENT_NODE) {
    return compileNode(node.documentElement);
  } else if (node.nodeType === NodeType.COMMENT_NODE) {
    // Ignore, it's a comment.
  } else if (node.nodeType === NodeType.PROCESSING_INSTRUCTION_NODE) {
    // Ignore??
  } else {
    throw new Error("Found node type: " + node.nodeType);
  }
}

function compileTextNode(node: any) {
  if (node.childNodes.childElementCount > 0) {
    throw new Error("XTSE0010 element found as child of xsl:text");
  }
  return mkCallWithContext(mkMember("xjslt", "textInternal"), [
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
        [mkIdentifier("document"), mkIdentifier("output")],
        mkBlock([
          mkConst(
            mkIdentifier("doc"),
            mkNew(mkMember("slimdom", "Document"), []),
          ),
          mkLet(mkIdentifier("templates"), mkArray([])),
          mkLet(
            mkIdentifier("context"),
            mkObject({
              outputDocument: mkIdentifier("doc"),
              outputNode: mkIdentifier("doc"),
              currentNode: mkIdentifier("document"),
              currentNodeList: mkArray([]),
              mode: mkLiteral(undefined),
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
      allowedParams: allowedParams,
      apply: mkArrowFun(compileNodeArray(node.childNodes.slice(skipNodes))),
    }),
  ]);
}

function compileLiteralTextNode(node: any): ExpressionStatement {
  return mkCallWithContext(mkMember("xjslt", "literalTextInternal"), [
    mkLiteral(node.textContent),
  ]);
}
