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

import { buildStylesheet } from "../src/xjslt";
import * as slimdom from "slimdom";
import * as path from "path";
import {
  evaluateXPathToString,
  evaluateXPathToNodes,
  evaluateXPathToBoolean,
  evaluateXPath,
} from "fontoxpath";
import { readFileSync } from "fs";

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
    !evaluateXPathToBoolean("dependencies/sweep_and_posture", node) &&
    !evaluateXPathToBoolean(
      "dependencies/feature", // We don't support any feature, (backwards_compatibility, built_in_derived_types, disabling_output_escaping, dtd, dynamic_evaluation, higher_order_functions, HTML4, HTML5, namespace_axis, schema_aware, serialization, streaming, streaming-fallback, XML_1.1, XPath_3.1, XSD_1.1, xsl-stylesheet-processing-instruction)
      node,
    )
  );
}

/* Roudd trip xml string through slimdom to eliminate any variations due to slimdom peculiarities.
Self-closing tags, etc.*/
function roundTrip(xml: string): string {
  try {
    return serializer.serializeToString(slimdom.parseXmlFragment(xml));
  } catch (ex) {
    return xml;
  }
}

function setupEnvironment(rootDir, testSetDom) {
  let environments = new Map();
  for (let environment of evaluateXPathToNodes(
    "/test-set/environment",
    testSetDom,
  )) {
    const file = evaluateXPathToString("source[@role='.']/@file", environment);
    let xmlString: string;
    const name = evaluateXPathToString("@name", environment);
    if (file) {
      xmlString = readFileSync(path.join(rootDir, file)).toString();
    } else {
      xmlString = evaluateXPathToString("source/content", environment);
    }
    if (xmlString) {
      environments.set(name, slimdom.parseXmlDocument(xmlString));
    }
  }
  return environments;
}

function checkResult(rootDir, resultNode, transformed) {
  let assertXmlFile = evaluateXPathToString("assert-xml/@file", resultNode);

  // TODO support all-of, any-of, assert, assert-posture-and-sweep, assert-result-document, assert-string-value, assert-xml, error, serialization-matches
  let assertXml;
  if (assertXmlFile) {
    assertXml = readFileSync(path.join(rootDir, assertXmlFile)).toString();
  } else {
    assertXml = evaluateXPathToString("assert-xml", resultNode);
  }
  if (assertXml) {
    assertXml = roundTrip(assertXml);
  }
  const assert = evaluateXPathToString("assert", resultNode);
  if (assert) {
    expect(evaluateXPathToBoolean(assert, transformed)).toBeTruthy();
  } else {
    expect(serializer.serializeToString(transformed)).toEqual(assertXml);
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
        const stylesheetFile = path.join(
          rootDir,
          evaluateXPathToString("test/stylesheet/@file", testCase),
        );
        const environment = environments.get(
          evaluateXPathToString("environment/@ref", testCase),
        );
        const resultNode = evaluateXPathToNodes("result", testCase)[0];
        if (
          applicableTest(testCase) &&
          !evaluateXPathToString("result/error/@code", testCase)
        ) {
          const testDescription = evaluateXPathToString(
            "description",
            testCase,
          );
          const testName = evaluateXPathToString("@name", testCase);
          const description = `${testDescription} (${testName}) - ${stylesheetFile}`;
          const tester = async () => {
            const transform = await buildStylesheet(stylesheetFile);
            checkResult(rootDir, resultNode, transform(environment));
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
