import * as estree from "./estree-util";
import { XSLT1_NSURI, NodeType } from "./xjslt";

/** 
 * Functions to walk a DOM tree of an XSLT stylesheet and generate an
 * ESTree that can be used to process an input document.
*/

function compileApplyTemplatesNode(node: any) {
  return estree.makeCallWithContext(
    estree.makeMember("xjslt", "applyTemplatesInternal"),
    [
      estree.makeObject({
        select: estree.makeLiteral(node.getAttribute("select")),
      }),
    ]
  );
}

function compileForEachNode(node: any) {
  return estree.makeCallWithContext(
    estree.makeMember("xjslt", "forEachInternal"),
    [
      estree.makeObject({
        select: estree.makeLiteral(node.getAttribute("select")),
      }),
      estree.makeArrowFunction(compileNodeArray(node.childNodes)),
    ]
  );
}

function compileLiteralXmlNode(node: any) {
  let attributes = [];
  for (let n in node.attributes) {
    attributes[node.attributes[n].localName] = estree.makeLiteral(
      node.attributes[n].value
    );
  }
  return estree.makeCallWithContext(
    estree.makeMember("xjslt", "literalXmlInternal"),
    [
      estree.makeObject({
        name: estree.makeLiteral(node.localName),
        attributes: estree.makeObject(attributes),
      }),
      estree.makeArrowFunction(compileNodeArray(node.childNodes)),
    ]
  );
}

export function compileNode(node: any) {
  if (node.nodeType === NodeType.TEXT_NODE) {
    return compileTextNode(node);
  } else if (node.nodeType === NodeType.ELEMENT_NODE) {
    if (node.namespaceURI === XSLT1_NSURI) {
      if (node.localName === "value-of") {
        return compileValueOfNode(node);
      } else if (node.localName === "apply-templates") {
        return compileApplyTemplatesNode(node);
      } else if (node.localName === "for-each") {
        return compileForEachNode(node);
      } else if (node.localName === "template") {
        return compileTemplateNode(node);
      } else if (node.localName === "stylesheet") {
        return compileStylesheetNode(node);
      } else if (node.localName === "output") {
        return undefined;
      } else {
        throw new Error("Found unexpected XSL element: " + node.tagName);
      }
    } else {
      return compileLiteralXmlNode(node);
    }
  } else if (node.nodeType === NodeType.DOCUMENT_NODE) {
    return compileNode(node.documentElement);
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
                  }),
                },
              ],
              kind: "let",
            },
            estree.makeCallWithContext(
              estree.makeMember("xjslt", "processNode"),
              []
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
      }),
      apply: estree.makeArrowFunction(compileNodeArray(node.childNodes)),
    }),
  ]);
}

function compileTextNode(node: any) {
  const args = [estree.makeLiteral(node.textContent)];
  return estree.makeCallWithContext(
    estree.makeMember("xjslt", "literalTextInternal"),
    args
  );
}

function compileValueOfNode(node: any) {
  return estree.makeCallWithContext(
    estree.makeMember("xjslt", "valueOfInternal"),
    [
      estree.makeObject({
        select: estree.makeLiteral(node.getAttribute("select")),
      }),
    ]
  );
}
