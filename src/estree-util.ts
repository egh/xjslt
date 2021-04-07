import {
  ArrowFunctionExpression,
  Expression,
  Identifier,
  Literal,
  MemberExpression,
  ModuleDeclaration,
  ObjectExpression,
  Statement,
} from "estree";

/**
 * Helper methods to make generating ESTree structures more easily.
 * These are tailored very closely to what XJSLT needs.
 */

export function makeArrowFunction(
  body: Array<Statement>
): ArrowFunctionExpression {
  return {
    type: "ArrowFunctionExpression",
    expression: false,
    generator: false,
    async: false,
    params: [
      {
        type: "Identifier",
        name: "context",
      },
    ],
    body: {
      type: "BlockStatement",
      body: body,
    },
  };
}

export function makeCall(callee: Expression, args: Array<any>) {
  return {
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: callee,
      arguments: args,
      optional: false,
    },
  };
}

export function makeCallWithContext(callee: Expression, args: Array<any>) {
  return makeCall(callee, [makeIdentifier("context"), ...args]);
}

export function makeIdentifier(name: string): Identifier {
  return {
    type: "Identifier",
    name: name,
  };
}

export function makeImports(): Array<ModuleDeclaration> {
  return [
    {
      type: "ImportDeclaration",
      specifiers: [
        {
          type: "ImportNamespaceSpecifier",
          local: makeIdentifier("slimdom"),
        },
      ],
      source: makeLiteral("slimdom"),
    },
    {
      type: "ImportDeclaration",
      specifiers: [
        {
          type: "ImportSpecifier",
          imported: makeIdentifier("evaluateXPathToString"),
          local: makeIdentifier("evaluateXPathToString"),
        },
      ],
      source: makeLiteral("fontoxpath"),
    },
  ];
}

export function makeImportsNode(): Array<Statement> {
  return [
    makeRequire("slimdom"),
    makeRequire("fontoxpath"),
    makeRequire("xjslt", "./src/xjslt"),
  ];
}

export function makeLiteral(value: string): Literal {
  return {
    type: "Literal",
    value: value,
  };
}

export function makeMember(obj: string, prop: string): MemberExpression {
  return {
    type: "MemberExpression",
    object: makeIdentifier(obj),
    property: makeIdentifier(prop),
    computed: false,
    optional: false,
  };
}

export function makeObject(obj: any): ObjectExpression {
  let properties = [];
  for (let key in obj) {
    properties.push({
      type: "Property",
      method: false,
      shorthand: false,
      computed: false,
      key: makeIdentifier(key),
      value: obj[key],
      kind: "init",
    });
  }

  return {
    type: "ObjectExpression",
    properties: properties,
  };
}

export function makeRequire(name: string, path?: string): Statement {
  if (!path) {
    path = name;
  }
  return {
    type: "VariableDeclaration",
    declarations: [
      {
        type: "VariableDeclarator",
        id: makeIdentifier(name),
        init: {
          type: "CallExpression",
          callee: makeIdentifier("require"),
          arguments: [makeLiteral(path)],
          optional: false,
        },
      },
    ],
    kind: "let",
  };
}
