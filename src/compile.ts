/*
 * Copyright (C) 2021-2026 Erik Hetzner
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

import { generate } from "astring";
import {
  mkArray,
  mkArrowFun,
  mkBlock,
  mkCall,
  mkCallWithContext,
  mkFun,
  mkIdentifier,
  mkImportsNode,
  mkLet,
  mkLiteral,
  mkMember,
  mkNew,
  mkReturn,
  toEstree,
} from "./estree-util";
import {
  Expression,
  ExpressionStatement,
  ObjectExpression,
  Program,
  Statement,
} from "estree";
import * as slimdom from "slimdom";
import * as xjslt from "./xjslt";
import {
  compileXPathToJavaScript,
  evaluateXPath,
  evaluateXPathToBoolean,
  evaluateXPathToNodes,
} from "fontoxpath";
import { readFileSync, symlinkSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { pathToFileURL, fileURLToPath } from "url";
import * as path from "path";
import { tmpdir } from "os";
import { mkdtempSync } from "fs";
import { StylesheetTransform } from "./definitions";
import {
  compareSortable,
  computeDefaultPriority,
  isAlphanumeric,
  mkOutputDefinition,
  mkResolver,
  sortSortable,
} from "./shared";
import { compileStylesheetNode, preprocess } from "./compileGeneric";

async function readAndParseXml(path: string): Promise<slimdom.Document> {
  const str = (await readFile(path)).toString();
  return slimdom.parseXmlDocument(str);
}

function readAndParseXmlSync(path: string): slimdom.Document {
  const str = readFileSync(path).toString();
  return slimdom.parseXmlDocument(str);
}

/**
 * Build a stylesheet. Returns a function that will take an input DOM
 * document and return an output DOM document.
 */
export async function compileFromPath(
  xsltPath: string,
): Promise<StylesheetTransform> {
  return compile(await readAndParseXml(xsltPath), pathToFileURL(xsltPath));
}

export function compileFromPathSync(xsltPath: string): StylesheetTransform {
  return compile(readAndParseXmlSync(xsltPath), pathToFileURL(xsltPath));
}

export async function compileToFile(xsltPath: string) {
  let slimdom_path = require.resolve("slimdom").split(path.sep);
  let root_dir = path.join(
    "/",
    ...slimdom_path.slice(0, slimdom_path.indexOf("node_modules")),
  );
  var tempdir = mkdtempSync(path.join(tmpdir(), "xjslt-"));
  symlinkSync(
    path.join(root_dir, "node_modules"),
    path.join(tempdir, "node_modules"),
  );
  symlinkSync(
    path.join(root_dir, "package.json"),
    path.join(tempdir, "package.json"),
  );
  symlinkSync(path.join(root_dir, "dist"), path.join(tempdir, "dist"));
  var tempfile = path.join(tempdir, "transform.js");
  const xsltURL = pathToFileURL(xsltPath);
  const xsltDoc = await preprocess(
    await readAndParseXml(xsltPath),
    xsltURL,
    readDocumentDefault,
  );
  await writeFile(
    tempfile,
    generate(compileStylesheetNode(xsltDoc.documentElement)),
  );
  return tempfile;
  //  rmSync(tempdir, { recursive: true });
}

function readDocumentDefault(uri: string): slimdom.Document {
  if (uri.startsWith("file:")) {
    return slimdom.parseXmlDocument(
      readFileSync(fileURLToPath(new URL(uri))).toString(),
    );
  }
  throw new Error(`FODC0005: document ${uri} not found`);
}

/**
 * Compile an XSLT stylesheet document into a callable transform function.
 *
 * @param xslt - The XSLT stylesheet as a parsed slimdom Document.
 * @param inputURL The input URL, use to resolve relative URLs.
 * @param readDocument - Optional callback to override default. Receives the resolved
 *   URI (absolute when a base is known, otherwise the raw href) and must
 *   return a parsed slimdom Document. Also used at runtime for `doc()` calls.
 *
 * @returns A transform function with the signature
 *   `(document, params?) => Map<string, OutputResult>`.
 *   The `"#default"` key holds the primary output document.
 *
 * @example
 * ```ts
 * import * as slimdom from "slimdom";
 * import { compile } from "xjslt/compile";
 * import { serialize } from "xjslt";
 *
 * const xslt = slimdom.parseXmlDocument(`
 *   <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 *     <xsl:template match="/">
 *       <result><xsl:value-of select="/doc/title"/></result>
 *     </xsl:template>
 *   </xsl:stylesheet>
 * `);
 *
 * const transform = compile(xslt, new URL("http://example.org/");
 *
 * const input = slimdom.parseXmlDocument("<doc><title>Hello</title></doc>");
 * const output = transform(input).get("#default");
 * console.log(serialize(output)); // <result>Hello</result>
 * ```
 */
export function compile(
  xslt: slimdom.Document,
  inputURL: URL,
  readDocument?: (uri: string) => slimdom.Document,
): StylesheetTransform {
  const xsltDoc = preprocess(
    xslt,
    inputURL,
    readDocument || readDocumentDefault,
  );
  const code = generate(compileStylesheetNode(xsltDoc.documentElement, true));
  const m: { exports: { transform?: StylesheetTransform } } = { exports: {} };
  new Function("xjslt", "module", code)(xjslt, m);
  return m.exports.transform;
}
