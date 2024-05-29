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

import { compile } from "xspattern";
import { buildStylesheet } from "../src/xjslt";
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

const serializer = new slimdom.XMLSerializer();

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
      "dependencies/feature", // We don't support any feature, (backwards_compatibility, built_in_derived_types, disabling_output_escaping, dtd, dynamic_evaluation, higher_order_functions, HTML4, HTML5, namespace_axis, schema_aware, serialization, streaming, streaming-fallback, XML_1.1, XPath_3.1, XSD_1.1, xsl-stylesheet-processing-instruction)
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

/* Round trip xml string through slimdom to eliminate any variations due to slimdom peculiarities.
Self-closing tags, etc.*/
function roundTrip(xml: string): string {
  try {
    return serializer.serializeToString(slimdom.parseXmlFragment(xml));
  } catch (ex) {
    return xml;
  }
}

function parseEnvironment(rootDir, environment) {
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

function setupEnvironment(rootDir, testSetDom) {
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
  expect(serializer.serializeToString(transformed)).toEqual(
    roundTrip(assertXmlContents),
  );
}

function checkResult(rootDir, node, transformed) {
  if (node.localName == "all-of") {
    return () => {
      for (let childNode of evaluateXPathToNodes("./*", node)) {
        checkResult(rootDir, childNode, transformed)();
      }
    };
  } else if (node.localName === "any-of") {
    return () => {
      let lastCheck;
      for (let childNode of evaluateXPathToNodes("./*", node)) {
        /* hack to work with any of these results */
        try {
          lastCheck = checkResult(rootDir, childNode, transformed);
          lastCheck();
          return;
        } catch (err) {}
      }
      lastCheck();
    };
  } else if (node.localName === "assert-xml") {
    return () => {
      checkAssertXml(rootDir, node, transformed);
    };
  } else if (node.localName === "assert") {
    return () => {
      const assert = evaluateXPathToString(".", node);
      expect(evaluateXPathToBoolean(assert, transformed)).toBeTruthy();
    };
  } else if (node.localName === "assert-count") {
    return () => {
      const count = evaluateXPathToNumber(".", node);
      expect(evaluateXPathToNumber("count(.)", transformed)).toEqual(count);
    };
  } else if (node.localName === "serialization-matches") {
    return () => {
      const matcher = compile(evaluateXPathToString(".", node));
      expect(matcher(serializer.serializeToString(transformed))).toBeTruthy();
    };
  } else if (node.localName === "error") {
    return () => {};
    // TODO: depends on error reporting
  } else if (node.localName === "assert-result-document") {
    // TODO: depends on separate output files
    return () => {};
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
        if (
          applicableTest(testCase) &&
          !evaluateXPathToString("result/error/@code", testCase)
        ) {
          const stylesheetFile = path.join(
            rootDir,
            evaluateXPathToString("test/stylesheet/@file", testCase),
          );
          const initialMode =
            evaluateXPathToString("test/initial-mode/@name", testCase) ||
            undefined;

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
          let inputURL;
          if (filepath) {
            inputURL = pathToFileURL(filepath);
          }
          const tester = async () => {
            const transform = await buildStylesheet(stylesheetFile);
            expect(
              evaluateXPathToBoolean("count(./*) = 1 ", resultNode),
            ).toBeTruthy();
            checkResult(
              rootDir,
              evaluateXPathToNodes("./*", resultNode)[0],
              transform(environment, inputURL, initialMode),
            )();
          };

          if (KNOWN_SPEC_FAILURES.includes(testName)) {
            test.failing(description, tester);
          } else {
            test(description, tester);
          }
        }
      }
    });
  }
}
