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

import * as estree from "./estree-util";
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

function compileFuncall(name, args) {
  return estree.makeCallWithContext(estree.makeMember("xjslt", name), [args]);
}

function compileFuncallWithChildren(node, name, args) {
  return estree.makeCallWithContext(estree.makeMember("xjslt", name), [
    args,
    estree.makeArrowFunction(compileNodeArray(node.childNodes)),
  ]);
}

function compileArgs(node, keyList) {
  var args = {};
  for (var key of keyList) {
    args[key] = estree.makeLiteral(node.getAttribute(key));
  }
  return estree.makeObject(args);
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
        estree.makeObject({
          test: estree.makeLiteral(childNode.getAttribute("test")),
          apply: estree.makeArrowFunction(
            compileNodeArray(childNode.childNodes),
          ),
        }),
      );
    } else if (childNode.localName === "otherwise") {
      alternatives.push(
        estree.makeObject({
          apply: estree.makeArrowFunction(
            compileNodeArray(childNode.childNodes),
          ),
        }),
      );
    }
  }
  return estree.makeCallWithContext(
    estree.makeMember("xjslt", "chooseInternal"),
    [{ type: "ArrayExpression", elements: alternatives }],
  );
}

function compileLiteralElementNode(node: any) {
  let attributes = [];
  for (let n in node.attributes) {
    attributes.push(
      estree.makeObject({
        name: estree.makeLiteral(node.attributes[n].localName),
        value: estree.makeLiteral(node.attributes[n].value),
      }),
    );
  }
  return estree.makeCallWithContext(
    estree.makeMember("xjslt", "literalElementInternal"),
    [
      estree.makeObject({
        name: estree.makeLiteral(node.localName),
        attributes: {
          type: "ArrayExpression",
          elements: attributes,
        },
      }),
      estree.makeArrowFunction(compileNodeArray(node.childNodes)),
    ],
  );
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
      } else if (node.localName === "output") {
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
      ...estree.makeImportsNode(),
      {
        type: "FunctionDeclaration",
        id: estree.makeIdentifier("transform"),
        expression: false,
        generator: false,
        async: false,
        params: [
          estree.makeIdentifier("document"),
          estree.makeIdentifier("output"),
        ],
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "VariableDeclaration",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: estree.makeIdentifier("templates"),
                  init: {
                    type: "ArrayExpression",
                    elements: [],
                  },
                },
              ],
              kind: "let",
            },
            ...compileNodeArray(node.childNodes),
            {
              type: "VariableDeclaration",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: estree.makeIdentifier("doc"),
                  init: {
                    type: "NewExpression",
                    callee: estree.makeMember("slimdom", "Document"),
                    arguments: [],
                  },
                },
              ],
              kind: "const",
            },
            {
              type: "VariableDeclaration",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: estree.makeIdentifier("context"),
                  init: estree.makeObject({
                    outputDocument: estree.makeIdentifier("doc"),
                    outputNode: estree.makeIdentifier("doc"),
                    currentNode: estree.makeIdentifier("document"),
                    currentNodeList: {
                      type: "ArrayExpression",
                      elements: [],
                    },
                    mode: estree.makeLiteral(null),
                    templates: estree.makeIdentifier("templates"),
                    variableScopes: {
                      type: "ArrayExpression",
                      elements: [],
                    },
                  }),
                },
              ],
              kind: "let",
            },
            estree.makeCallWithContext(
              estree.makeMember("xjslt", "processNode"),
              [],
            ),
            {
              type: "ReturnStatement",
              argument: estree.makeIdentifier("context.outputDocument"),
            },
          ],
        },
      },
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: {
            type: "MemberExpression",
            object: estree.makeMember("module", "exports"),
            property: estree.makeIdentifier("transform"),
            computed: false,
            optional: false,
          },
          right: estree.makeIdentifier("transform"),
        },
      },
    ],
  };
}

function compileTemplateNode(node: any) {
  return estree.makeCall(estree.makeMember("templates", "push"), [
    estree.makeObject({
      attributes: estree.makeObject({
        match: estree.makeLiteral(node.getAttribute("match")),
        name: estree.makeLiteral(node.getAttribute("name")),
      }),
      apply: estree.makeArrowFunction(compileNodeArray(node.childNodes)),
    }),
  ]);
}

function compileTextNode(node: any) {
  return estree.makeCallWithContext(
    estree.makeMember("xjslt", "literalTextInternal"),
    [estree.makeLiteral(node.textContent)],
  );
}
