#!/usr/bin/env node
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

import * as slimdom from "slimdom";
import { Command } from "commander";
import { buildStylesheet } from "./xjslt";
import { createReadStream } from "fs";
import { async } from "slimdom-sax-parser";

async function run(xslt: string, xmls: Array<string>) {
  const transform = buildStylesheet(xslt);
  const serializer = new slimdom.XMLSerializer();
  for (let xml of xmls) {
    const xmlDom = await async(createReadStream(xml));
    const transformed = transform(xmlDom);
    process.stdout.write(serializer.serializeToString(transformed));
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
  await program.parseAsync(process.argv);
}
main();
