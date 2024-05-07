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

import {
  buildStylesheet,
} from "../src/xjslt";
import * as slimdom from "slimdom";
import * as path from "path";
import {
  evaluateXPathToString,
  evaluateXPathToNodes,
  evaluateXPathToBoolean,
  evaluateXPath,
} from "fontoxpath";
import { readFileSync } from "fs";
import * as process from "process";

import { KNOWN_SPEC_FAILURES } from "./suite.fail";

const serializer = new slimdom.XMLSerializer();

let testArray = [];
let badTestArray = [];
let environments = new Map();
const testSetDom = slimdom.parseXmlDocument(
  readFileSync("xslt30-test/catalog.xml").toString(),
);

/* Roudd trip xml string through slimdom to eliminate any variations due to slimdom peculiarities.
Self-closing tags, etc.*/
function roundTrip(xml: string): string {
  try {
    return serializer.serializeToString(slimdom.parseXmlFragment(xml));
  } catch (ex) {
    return xml;
  }
}

for (let testSet of evaluateXPath("catalog/test-set/@file", testSetDom)) {
  testSet = path.join("xslt30-test", testSet);
  function resolve(filename: string) {
    return path.join(path.dirname(testSet), filename);
  }
  const testSetFile = readFileSync(testSet);
  const testSetDom = slimdom.parseXmlDocument(testSetFile.toString());
  if (
    !evaluateXPathToBoolean(
      "/test-set/dependencies/spec/@value='XSLT30+'",
      testSetDom,
    ) &&
    !evaluateXPathToBoolean("/test-set/@name='xml-version'", testSetDom) // slimdom doesn't support xml 1.1
  ) {
    for (let environment of evaluateXPathToNodes(
      "/test-set/environment",
      testSetDom,
    )) {
      const file = evaluateXPathToString(
        "source[@role='.']/@file",
        environment,
      );
      let xmlString: string;
      const name = evaluateXPathToString("@name", environment);
      if (file) {
        xmlString = readFileSync(resolve(file)).toString();
      } else {
        xmlString = evaluateXPathToString("source/content", environment);
      }
      if (xmlString) {
        environments.set(name, slimdom.parseXmlDocument(xmlString));
      }
    }
    const testSetDescription = evaluateXPathToString(
      "/test-set/description",
      testSetDom,
    );
    for (let testCase of evaluateXPathToNodes(
      "/test-set/test-case",
      testSetDom,
    )) {
      const stylesheetFile = resolve(
        evaluateXPathToString("test/stylesheet/@file", testCase),
      );
      const environment = evaluateXPathToString("environment/@ref", testCase);
      let assertXmlFile = evaluateXPathToString(
        "result/assert-xml/@file",
        testCase,
      );
      let assertXml;
      if (assertXmlFile) {
        assertXml = readFileSync(resolve(assertXmlFile)).toString();
      } else {
        assertXml = evaluateXPathToString("result/assert-xml", testCase);
      }
      if (assertXml) {
        assertXml = roundTrip(assertXml);
      }
      const assert = evaluateXPathToString("result/assert", testCase);
      if (
        !evaluateXPathToBoolean(
          "dependencies/spec/@value='XSLT30+'",
          testCase,
        ) &&
        !evaluateXPathToBoolean(
          "dependencies/feature/@value='schema_aware'",
          testCase,
        ) &&
        !evaluateXPathToString("result/error/@code", testCase)
      ) {
        const testDescription = evaluateXPathToString("description", testCase);
        const testName = evaluateXPathToString("@name", testCase);
        const test = [
          `${testSetDescription} / ${testDescription} (${testName}) - ${stylesheetFile}`,
          stylesheetFile,
          environment,
          assertXml,
          assert,
        ];
        if (KNOWN_SPEC_FAILURES.includes(testName)) {
          badTestArray.push(test);
        } else {
          testArray.push(test);
        }
      }
    }
  }
}

const tester = async (description, stylesheetFile, env, assertXml, assert) => {
  const transform = await buildStylesheet(stylesheetFile);
  const envContent = environments.get(env);
  const transformed = transform(envContent);
  if (assert) {
    expect(evaluateXPathToBoolean(assert, transformed)).toBeTruthy();
  } else {
    expect(serializer.serializeToString(transformed)).toEqual(assertXml);
  }
};

test.each(testArray)("%s", tester);

test.failing.each(badTestArray)("%s", tester);