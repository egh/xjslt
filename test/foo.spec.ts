import { mocked } from "ts-jest/utils";
import { foo, compile } from "../src/xslt";
import * as slimdom from "slimdom";
import { evaluateXPathToString } from "fontoxpath";
import { generate } from 'astring';
import { sync } from "slimdom-sax-parser";
import { Parser } from "acorn"
import * as jsx from "acorn-jsx"
import * as saxes from "saxes";

test("works", () => {
  expect(foo()).toEqual("foo");
});

test("slimdon", () => {
  const document = new slimdom.Document();
  document.appendChild(document.createElement("root"));
  const xml = slimdom.serializeToWellFormedString(document);
  expect(xml).toEqual("<root/>");
});

test("slimdon-sax", () => {
  const document = sync("<root />");
  const xml = slimdom.serializeToWellFormedString(document);
  expect(xml).toEqual("<root/>");
});

test("slimdon", () => {
  const document = sync("<root>text</root>");
  expect(evaluateXPathToString("/root/text()", document)).toEqual("text");
});

test("acorn", () => {
  const parsed = Parser.extend(jsx()).parse("my(<foo/>, 'code');", {ecmaVersion: 2020});
  expect(parsed.type).toEqual("Program");
  expect(parsed.body[0].type).toEqual("ExpressionStatement");
});

test("astring", () => {
  const parsed = Parser.parse("my('code');", {ecmaVersion: 2020});
  expect(generate(parsed)).toEqual("my('code');\n");
});

test("saxes", () => {
  const parser = new saxes.SaxesParser();
  const textCallback = jest.fn(text => {});
  const openCallback = jest.fn(node => {});
  parser.on("text", textCallback);
  parser.on("opentag", openCallback);
  
  parser.write('<xml>Hello, <who name="world">world</who>!</xml>').close();
  expect(textCallback.mock.calls[0][0]).toBe("Hello, ");
  expect(textCallback.mock.calls[1][0]).toBe("world");
  expect(textCallback.mock.calls[2][0]).toBe("!");
  expect(openCallback.mock.calls[0][0].name).toBe("xml");
  expect(openCallback.mock.calls[1][0].name).toBe("who");
  expect(openCallback.mock.calls[1][0].attributes.name).toBe("world");
});

test("compile", () => {
  expect(generate(compile())).toEqual("import {evaluateXPathToString} from \"fontoxpath\";\n");
});
