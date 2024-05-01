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
import { ObjectExpression } from "estree";
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
    "call-template",
    {
      name: "callTemplateInternal",
      arguments: ["name"],
      hasChildren: false,
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
    { name: "valueOfInternal", arguments: ["select"], hasChildren: false },
  ],
  [
    "variable",
    {
      name: "variableInternal",
      arguments: ["name", "select"],
      hasChildren: false,
    },
  ],
]);

function compileFuncall(name: string, args: ObjectExpression) {
  return mkCallWithContext(mkMember("xjslt", name), [args]);
}

function compileFuncallWithChildren(
  node: any,
  name: string,
  args: ObjectExpression,
) {
  return mkCallWithContext(mkMember("xjslt", name), [
    args,
    mkArrowFun(compileNodeArray(node.childNodes)),
  ]);
}

function compileArgs(node: any, keyList: string[]): ObjectExpression {
  var args = {};
  for (var key of keyList) {
    args[key] = mkLiteral(node.getAttribute(key));
  }
  return mkObject(args);
}

function compileSimpleElement(node: any) {
  const what = simpleElements.get(node.localName);
  const args = compileArgs(node, what.arguments);
  if (what.hasChildren) {
    return compileFuncallWithChildren(node, what.name, args);
  } else {
    return compileFuncall(what.name, args);
  }
}

function compileChooseNode(node: any) {
  let alternatives = [];
  for (let childNode of node.childNodes) {
    if (childNode.localName === "when") {
      alternatives.push(
        mkObject({
          test: mkLiteral(childNode.getAttribute("test")),
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

export function compileNode(node: any) {
  if (node.nodeType === NodeType.TEXT_NODE) {
    return compileTextNode(node);
  } else if (node.nodeType === NodeType.ELEMENT_NODE) {
    if (node.namespaceURI === XSLT1_NSURI) {
      if (simpleElements.has(node.localName)) {
        return compileSimpleElement(node);
      } else if (node.localName === "choose") {
        return compileChooseNode(node);
      } else if (node.localName === "template") {
        return compileTemplateNode(node);
      } else if (node.localName === "stylesheet") {
        return compileStylesheetNode(node);
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

function compileNodeArray(nodes: Array<any>) {
  let body = [];
  for (let n in nodes) {
    let compiled = compileNode(nodes[n]);
    if (compiled) body.push(compiled);
  }
  return body;
}

function compileStylesheetNode(node: any) {
  return {
    type: "Program",
    body: [
      ...mkImportsNode(),
      mkFun(
        mkIdentifier("transform"),
        [mkIdentifier("document"), mkIdentifier("output")],
        mkBlock([
          mkLet(mkIdentifier("templates"), mkArray([])),
          ...compileNodeArray(node.childNodes),
          mkConst(
            mkIdentifier("doc"),
            mkNew(mkMember("slimdom", "Document"), []),
          ),
          mkLet(
            mkIdentifier("context"),
            mkObject({
              outputDocument: mkIdentifier("doc"),
              outputNode: mkIdentifier("doc"),
              currentNode: mkIdentifier("document"),
              currentNodeList: mkArray([]),
              mode: mkLiteral(null),
              templates: mkIdentifier("templates"),
              variableScopes: mkArray([]),
            }),
          ),
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

function compileTemplateNode(node: any) {
  return mkCall(mkMember("templates", "push"), [
    mkObject({
      attributes: mkObject({
        match: mkLiteral(node.getAttribute("match")),
        name: mkLiteral(node.getAttribute("name")),
      }),
      apply: mkArrowFun(compileNodeArray(node.childNodes)),
    }),
  ]);
}

function compileTextNode(node: any) {
  return mkCallWithContext(mkMember("xjslt", "literalTextInternal"), [
    mkLiteral(node.textContent),
  ]);
}
