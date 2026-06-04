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
import { compile, compileStylesheetNode, preprocess } from "./compile";

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
  return compile(
    await readAndParseXml(xsltPath),
    mkFsReadDocument(),
    pathToFileURL(xsltPath),
  );
}

export function compileFromPathSync(xsltPath: string): StylesheetTransform {
  return compile(
    readAndParseXmlSync(xsltPath),
    mkFsReadDocument(),
    pathToFileURL(xsltPath),
  );
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
    mkFsReadDocument(),
  );
  await writeFile(
    tempfile,
    generate(compileStylesheetNode(xsltDoc.documentElement)),
  );
  return tempfile;
  //  rmSync(tempdir, { recursive: true });
}

function mkFsReadDocument(): (uri: string) => slimdom.Document {
  return (uri: string) => {
    if (uri.startsWith("file:")) {
      return slimdom.parseXmlDocument(
        readFileSync(fileURLToPath(new URL(uri))).toString(),
      );
    }
    throw new Error(`FODC0005: document ${uri} not found`);
  };
}
