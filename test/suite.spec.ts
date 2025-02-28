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

import { log } from "console";
import { buildStylesheet } from "../src/compile";
import * as slimdom from "slimdom";
import * as path from "path";
import {
  evaluateXPathToString,
  evaluateXPathToNodes,
  evaluateXPathToBoolean,
  evaluateXPath,
  evaluateXPathToNumber,
} from "fontoxpath";
import { readFileSync } from "fs";
import { pathToFileURL } from "url";
import { KNOWN_SPEC_FAILURES } from "./suite.fail";
import { expect } from "@jest/globals";
import { toBeEquivalentDom, toXSMatch } from "./matchers";
import { serialize } from "../src/xjslt";
import { OutputResult } from "../src/definitions";
expect.extend({ toBeEquivalentDom, toXSMatch });

declare module "expect" {
  interface AsymmetricMatchers {
    toBeEquivalentDom(b: any): void;
    toXSMatch(expected: string): void;
  }
  interface Matchers<R> {
    toBeEquivalentDom(b: any): R;
    toXSMatch(expected: string): R;
  }
}

const testSetDom = slimdom.parseXmlDocument(
  readFileSync("xslt30-test/catalog.xml").toString(),
);

function applicableTest(node) {
  return (
    !evaluateXPathToBoolean("dependencies/spec/@value='XSLT30+'", node) &&
    !evaluateXPathToBoolean("dependencies/spec/@value='XML_1.1'", node) &&
    !evaluateXPathToBoolean("dependencies/spec/@value='XSLT30+'", node) &&
    !evaluateXPathToBoolean("dependencies/unicode-version", node) && // Skip unicode tests for now
    !evaluateXPathToBoolean("dependencies/sweep_and_posture", node) &&
    !evaluateXPathToBoolean(
      "dependencies/feature[@value='backwards_compatibility']",
      node,
    ) &&
    !evaluateXPathToBoolean(
      "dependencies/feature[@value='built_in_derived_types']",
      node,
    ) &&
    !evaluateXPathToBoolean(
      "dependencies/feature[@value='disabling_output_escaping']",
      node,
    ) &&
    !evaluateXPathToBoolean("dependencies/feature[@value='dtd']", node) &&
    !evaluateXPathToBoolean(
      "dependencies/feature[@value='dynamic_evaluation']",
      node,
    ) &&
    !evaluateXPathToBoolean(
      "dependencies/feature[@value='higher_order_functions']",
      node,
    ) &&
    !evaluateXPathToBoolean("dependencies/feature[@value='HTML4']", node) &&
    !evaluateXPathToBoolean("dependencies/feature[@value='HTML5']", node) &&
    !evaluateXPathToBoolean(
      "dependencies/feature[@value='namespace_axis']",
      node,
    ) &&
    !evaluateXPathToBoolean(
      "dependencies/feature[@value='schema_aware']",
      node,
    ) &&
    //    !evaluateXPathToBoolean("dependencies/feature[@value='serialization']", node) &&
    !evaluateXPathToBoolean("dependencies/feature[@value='streaming']", node) &&
    !evaluateXPathToBoolean(
      "dependencies/feature[@value='streaming-fallback']",
      node,
    ) &&
    !evaluateXPathToBoolean("dependencies/feature[@value='XML_1.1']", node) &&
    //    !evaluateXPathToBoolean("dependencies/feature[@value='XPath_3.1']", node) &&
    !evaluateXPathToBoolean("dependencies/feature[@value='XSD_1.1']", node) &&
    !evaluateXPathToBoolean(
      "dependencies/feature[@value='xsl-stylesheet-processing-instruction']",
      node,
    )
  );
}

let fileParseCache = new Map<string, any>();

/* Multiple tests use the same file, cache the parse */
function parseFile(path: string) {
  if (!fileParseCache.has(path)) {
    fileParseCache.set(
      path,
      slimdom.parseXmlDocument(readFileSync(path).toString()),
    );
  }
  return fileParseCache.get(path);
}

function parseEnvironment(rootDir: string, environment) {
  const file = evaluateXPathToString("source[@role='.']/@file", environment);
  if (file) {
    return [parseFile(path.join(rootDir, file)), file];
  } else if (evaluateXPathToBoolean("source/content", environment)) {
    return [
      slimdom.parseXmlDocument(
        evaluateXPathToString("source/content", environment),
      ),
      undefined,
    ];
  } else {
    return [undefined, undefined];
  }
}

function setupEnvironment(rootDir: string, testSetDom) {
  let environments = new Map();
  for (let environment of evaluateXPathToNodes(
    "/test-set/environment",
    testSetDom,
  )) {
    const name = evaluateXPathToString("@name", environment);
    environments.set(name, parseEnvironment(rootDir, environment));
  }
  return environments;
}

function checkAssertXml(rootDir: string, node: any, transformed: any) {
  const assertXmlFile = evaluateXPathToString("./@file", node);
  let assertXmlContents: string;
  if (assertXmlFile) {
    assertXmlContents = readFileSync(
      path.join(rootDir, assertXmlFile),
    ).toString();
  } else {
    assertXmlContents = evaluateXPathToString(".", node);
  }
  expect(transformed).toBeEquivalentDom(
    slimdom.parseXmlDocument(assertXmlContents),
  );
}

function checkResult(rootDir, node, thunk: () => Map<string, OutputResult>) {
  if (node.localName == "all-of") {
    return () => {
      for (let childNode of evaluateXPathToNodes("./*", node)) {
        checkResult(rootDir, childNode, thunk)();
      }
    };
  } else if (node.localName === "any-of") {
    return () => {
      let lastCheck;
      for (let childNode of evaluateXPathToNodes("./*", node)) {
        /* hack to work with any of these results */
        try {
          lastCheck = checkResult(rootDir, childNode, thunk);
          lastCheck();
          return;
        } catch (err) {}
      }
      lastCheck();
    };
  } else if (node.localName === "assert-xml") {
    return () => {
      const dom = thunk().get("#default").document;
      checkAssertXml(rootDir, node, dom);
    };
  } else if (node.localName === "assert") {
    return () => {
      const assert = evaluateXPathToString(".", node);
      expect(
        evaluateXPathToBoolean(assert, thunk().get("#default").document),
      ).toBeTruthy();
    };
  } else if (node.localName === "assert-count") {
    return () => {
      const count = evaluateXPathToNumber(".", node);
      expect(
        evaluateXPathToNumber("count(.)", thunk().get("#default").document),
      ).toEqual(count);
    };
  } else if (node.localName === "serialization-matches") {
    return () => {
      expect(serialize(thunk().get("#default") as OutputResult)).toXSMatch(
        evaluateXPathToString(".", node),
      );
    };
  } else if (node.localName === "error") {
    return () => {
      expect(thunk).toThrow(evaluateXPathToString("@code", node));
    };
  } else if (node.localName === "assert-result-document") {
    // Just map #default to this one
    const newResults = new Map<string, OutputResult>([
      [
        "#default",
        thunk().get(evaluateXPathToString("@uri", node)) as OutputResult,
      ],
    ]);
    return () => {
      checkResult(
        rootDir,
        evaluateXPathToNodes("./*", node)[0],
        () => newResults,
      );
    };
  } else if (node.localName === "assert-string-value") {
    // TODO: not sure what this is?
    return () => {};
  } else if (node.localName === "assert-serialization") {
    // TODO: depends on non-xml output?
    return () => {};
  } else if (node.localName === "assert-message") {
    // TODO: depends on messages
    return () => {};
  } else {
    return () => {
      // TODO support assert-result-document, assert-string-value, error
      expect(node.localName).toEqual("");
    };
  }
}

let failingTests = 0;
let passingTests = 0;
for (let testSet of evaluateXPath("catalog/test-set/@file", testSetDom)) {
  testSet = path.join("xslt30-test", testSet);
  const rootDir = path.dirname(testSet);
  const testSetFile = readFileSync(testSet);
  const testSetDom = slimdom.parseXmlDocument(testSetFile.toString());
  if (applicableTest(evaluateXPathToNodes("/test-set", testSetDom)[0])) {
    const environments = setupEnvironment(rootDir, testSetDom);
    const testSetDescription = evaluateXPathToString(
      "/test-set/description",
      testSetDom,
    );
    describe(testSetDescription, () => {
      for (let testCase of evaluateXPathToNodes(
        "/test-set/test-case",
        testSetDom,
      )) {
        const resultNode = evaluateXPathToNodes("result", testCase)[0];
        if (applicableTest(testCase)) {
          const stylesheetFile = path.join(
            rootDir,
            evaluateXPathToString("test/stylesheet[1]/@file", testCase),
          );
          const initialMode =
            evaluateXPathToString("test/initial-mode/@name", testCase) ||
            undefined;

          let stylesheetParams = {};
          evaluateXPathToNodes("test/param", testCase).forEach((node) => {
            const name = evaluateXPathToString("@name", node);
            const select = evaluateXPathToString("@select", node);
            const value = evaluateXPathToString(select, null);
            stylesheetParams[name] = value;
          });
          let environment: any = undefined;
          let filepath: any = undefined;
          const environmentDom = evaluateXPathToNodes(
            "environment",
            testCase,
          )[0];
          if (environmentDom) {
            const environmentRef = evaluateXPathToString(
              "./@ref",
              environmentDom,
            );
            if (environmentRef) {
              [environment, filepath] = environments.get(environmentRef);
            } else {
              [environment, filepath] = parseEnvironment(
                rootDir,
                environmentDom,
              );
            }
          }
          const testDescription = evaluateXPathToString(
            "description",
            testCase,
          );
          const testName = evaluateXPathToString("@name", testCase);
          const description = `${testName}: ${testDescription} (${stylesheetFile})`;
          let inputURL: string | null = null;
          if (filepath) {
            inputURL = pathToFileURL(filepath).toString();
          }
          const tester = () => {
            expect(
              evaluateXPathToBoolean("count(./*) = 1 ", resultNode),
            ).toBeTruthy();
            checkResult(
              rootDir,
              evaluateXPathToNodes("./*", resultNode)[0],
              () => {
                const transform = buildStylesheet(stylesheetFile);
                return transform(environment || new slimdom.Document(), {
                  inputURL: inputURL,
                  initialMode: initialMode,
                  stylesheetParams: stylesheetParams,
                });
              },
            )();
          };

          if (KNOWN_SPEC_FAILURES.includes(testName)) {
            failingTests++;
            test.failing(description, tester);
          } else {
            passingTests++;
            test(description, tester);
          }
        }
      }
    });
  }
}
log(`Failing test count: ${failingTests}`);
log(`Passing test count: ${passingTests}`);
