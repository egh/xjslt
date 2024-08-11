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

import {
  ArrayExpression,
  ArrowFunctionExpression,
  BlockStatement,
  Expression,
  ExpressionStatement,
  FunctionDeclaration,
  Identifier,
  Literal,
  MemberExpression,
  ModuleDeclaration,
  NewExpression,
  ObjectExpression,
  ReturnStatement,
  SpreadElement,
  Statement,
  Super,
  VariableDeclaration,
} from "estree";

/**
 * Helper methods to make generating ESTree structures more easily.
 * These are tailored very closely to what XJSLT needs.
 */

export function mkArrowFun(body: Array<Statement>): ArrowFunctionExpression {
  return {
    type: "ArrowFunctionExpression",
    expression: false,
    generator: false,
    async: false,
    params: [mkIdentifier("context")],
    body: {
      type: "BlockStatement",
      body: body,
    },
  };
}

export function mkFun(
  name: Identifier,
  params: Identifier[],
  body: BlockStatement,
): FunctionDeclaration {
  return {
    type: "FunctionDeclaration",
    id: name,
    generator: false,
    async: false,
    params: params,
    body: body,
  };
}

export function mkCall(
  callee: Expression,
  args: Expression[],
): ExpressionStatement {
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

export function mkCallWithContext(
  callee: Expression,
  args: Expression[],
): ExpressionStatement {
  return mkCall(callee, [mkIdentifier("context"), ...args]);
}

export function mkIdentifier(name: string): Identifier {
  return {
    type: "Identifier",
    name: name,
  };
}

export function mkImports(): Array<ModuleDeclaration> {
  return [
    {
      type: "ImportDeclaration",
      specifiers: [
        {
          type: "ImportNamespaceSpecifier",
          local: mkIdentifier("slimdom"),
        },
      ],
      source: mkLiteral("slimdom"),
    },
    {
      type: "ImportDeclaration",
      specifiers: [
        {
          type: "ImportSpecifier",
          imported: mkIdentifier("evaluateXPathToString"),
          local: mkIdentifier("evaluateXPathToString"),
        },
      ],
      source: mkLiteral("fontoxpath"),
    },
  ];
}

export function mkImportsNode(): Array<Statement> {
  return [
    mkRequire("slimdom"),
    mkRequire("fontoxpath"),
    mkRequire("xjslt", "xjslt"),
  ];
}

export function mkLiteral(
  value: string | boolean | number | undefined,
): Literal {
  value = value === null || value === undefined ? undefined : value;
  return {
    type: "Literal",
    value: value,
  };
}

export function mkMember(obj: string, prop: string): MemberExpression {
  return {
    type: "MemberExpression",
    object: mkIdentifier(obj),
    property: mkIdentifier(prop),
    computed: false,
    optional: false,
  };
}

export function mkObject(obj: any): ObjectExpression {
  let properties = [];
  for (let key in obj) {
    properties.push({
      type: "Property",
      method: false,
      shorthand: false,
      computed: false,
      key: mkLiteral(key),
      value: obj[key],
      kind: "init",
    });
  }

  return {
    type: "ObjectExpression",
    properties: properties,
  };
}

export function mkRequire(name: string, path?: string): Statement {
  if (!path) {
    path = name;
  }
  return {
    type: "VariableDeclaration",
    declarations: [
      {
        type: "VariableDeclarator",
        id: mkIdentifier(name),
        init: {
          type: "CallExpression",
          callee: mkIdentifier("require"),
          arguments: [mkLiteral(path)],
          optional: false,
        },
      },
    ],
    kind: "let",
  };
}

export function mkArray(elements: Array<any>): ArrayExpression {
  return {
    type: "ArrayExpression",
    elements: elements,
  };
}

export function mkReturn(argument: Expression | undefined): ReturnStatement {
  return {
    type: "ReturnStatement",
    argument: argument,
  };
}

export function mkBlock(body: Array<Statement>): BlockStatement {
  return { type: "BlockStatement", body: body };
}

export function mkLet(
  identifier: Identifier,
  init?: Expression,
): VariableDeclaration {
  return mkVariableDeclaration(identifier, init, "let");
}

export function mkConst(
  identifier: Identifier,
  init?: Expression,
): VariableDeclaration {
  return mkVariableDeclaration(identifier, init, "const");
}

export function mkVariableDeclaration(
  identifier: Identifier,
  init: Expression | undefined,
  kind: "var" | "let" | "const",
): VariableDeclaration {
  return {
    type: "VariableDeclaration",
    declarations: [
      {
        type: "VariableDeclarator",
        id: identifier,
        init: init,
      },
    ],
    kind: kind,
  };
}

export function mkNew(
  callee: Expression | Super,
  args: Array<Expression | SpreadElement>,
): NewExpression {
  return {
    type: "NewExpression",
    callee: callee,
    arguments: args,
  };
}
