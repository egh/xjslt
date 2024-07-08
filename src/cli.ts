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
import { Command } from "commander";
import { buildStylesheet, compileStylesheet } from "./compile";
import { readFileSync } from "fs";
import { pathToFileURL } from "url";
import { webpack } from "webpack";
import * as path from "path";
import * as fs from "fs";
import * as process from "process";

async function run(xslt: string, xmls: Array<string>) {
  const transform = await buildStylesheet(xslt);
  const serializer = new slimdom.XMLSerializer();
  for (let xml of xmls) {
    const xmlDom = slimdom.parseXmlDocument(readFileSync(xml).toString());
    const outputDocument = new slimdom.Document();
    const transformed = transform(xmlDom, outputDocument, pathToFileURL(xml));
    // wish there was a better way?
    transformed.insertBefore(
      transformed.createProcessingInstruction(
        "xml",
        'version="1.0" encoding="utf-8"',
      ),
      transformed.firstChild,
    );
    process.stdout.write(serializer.serializeToString(transformed));
  }
}

async function compile(xslt: string, destination: string) {
  const destinationAbs = path.resolve(destination);
  if (fs.existsSync(destinationAbs)) {
    throw new Error(`${destinationAbs} exists!`);
  }
  const src = await compileStylesheet(xslt);
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
  try {
    let err,
      stats = await new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
          resolve([err, stats]);
        });
      });
    await compiler.close;
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
    .description("Compile an XSLT stylesheet to JavaScript", {
      xslt: "XSLT stylesheet",
    })
    .action(compile);
  await program.parseAsync(process.argv);
}

main();
