#!/usr/bin/env node
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
