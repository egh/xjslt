#!/usr/bin/env node
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

import * as slimdom from "slimdom";
import { Command, Option } from "commander";
import { buildStylesheet, compileStylesheet } from "./compile";
import { serialize } from "./xjslt";
import { readFileSync, writeFileSync } from "fs";
import { pathToFileURL } from "url";
import { webpack } from "webpack";
import * as url from "url";
import * as path from "path";
import * as fs from "fs";
import * as process from "process";

async function run(xslt: string, xmls: Array<string>) {
  const transform = await buildStylesheet(xslt);
  for (let xml of xmls) {
    const xmlDom = slimdom.parseXmlDocument(readFileSync(xml).toString());
    const outputDocument = new slimdom.Document();
    const baseUrl = pathToFileURL(xml);
    const results = transform(xmlDom, outputDocument, outputDocument, baseUrl);
    for (const [uri, result] of results) {
      const serialized = serialize(result);
      if (uri !== "#default") {
        const path = url.fileURLToPath(url.resolve(baseUrl.toString(), uri));
        if (!path) {
          throw new Error(`Can't write to ${uri}`);
        }
        if (fs.existsSync(path)) {
          throw new Error(`${path} exists!`);
        }
        fs.writeFileSync(path, serialized);
      } else {
        process.stdout.write(serialized);
      }
    }
  }
}

async function compile(xslt: string, destination: string, options) {
  const destinationAbs = path.resolve(destination);
  if (fs.existsSync(destinationAbs)) {
    throw new Error(`${destinationAbs} exists!`);
  }
  const src = await compileStylesheet(xslt);
  try {
    if (options.internal) {
      /* Stupid hack, but it's easier than figuring out nodejs build stuff. */
      const content = readFileSync(src).toString().replace("dist/", "../");
      writeFileSync(destinationAbs, content);
    } else {
      const config = {
        entry: [src],
        output: {
          path: path.dirname(destinationAbs),
          filename: path.basename(destinationAbs),
        },
        module: {
          rules: [
            {
              test: /\.ts(x)?$/,
              loader: "ts-loader",
              exclude: /node_modules/,
            },
          ],
        },
        resolve: {
          extensions: [".web.ts", ".web.js", ".ts", ".js"],
        },
      };
      const compiler = webpack(config);
      let err,
        stats = await new Promise((resolve, reject) => {
          compiler.run((err, stats) => {
            resolve([err, stats]);
          });
        });
      await compiler.close;
    }
  } catch (err) {
    console.log(err);
  }
}

async function main() {
  const program = new Command();
  program.version("0.0.1");
  program
    .arguments("<xslt> <xml...>")
    .description("Transform XML", {
      xslt: "XSLT stylesheet",
      xml: "XML files to process",
    })
    .action(run);
  program
    .command("compile")
    .argument("<xslt>", "xslt file to compile")
    .argument("[destination]", "destination file to compile to", "transform.js")
    .addOption(
      new Option("-w, --web", "build a standalone js file for the web").conflicts("internal"))
    .addOption(
      new Option("-i, --internal", "build an internal js file for prefilters").conflicts("web"))
    .description("Compile an XSLT stylesheet to JavaScript", {
      xslt: "XSLT stylesheet",
    })
    .action(compile);
  await program.parseAsync(process.argv);
}

main();
