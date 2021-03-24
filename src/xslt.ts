import { ModuleDeclaration, Program } from "estree";
import { XMLDocument } from "slimdom";

function foo() {
  return "foo";
}

function compile(doc: XMLDocument): Program {
  return {
    type: "Program",
    body: makeImports(),
    sourceType: "module",
  };
}

function makeImports(): Array<ModuleDeclaration> {
  return [
    {
      type: "ImportDeclaration",
      specifiers: [
        {
          type: "ImportSpecifier",
          imported: {
            type: "Identifier",
            name: "evaluateXPathToString",
          },
          local: {
            type: "Identifier",
            name: "evaluateXPathToString",
          },
        },
      ],
      source: {
        type: "Literal",
        value: "fontoxpath",
      },
    },
  ];
}

export { foo, compile };
