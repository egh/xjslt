import { mocked } from "ts-jest/utils";
import { foo } from "../src/xslt";
import * as slimdom from "slimdom";
import { evaluateXPathToString } from "fontoxpath";
import { sync } from "slimdom-sax-parser";

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
