#!/usr/bin/env node
import * as slimdom from "slimdom";
import { Command } from "commander";
import { buildStylesheet } from "./xjslt";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { sync } from "slimdom-sax-parser";
const program = new Command();
program.version("0.0.1");
program
  .arguments("<xslt> <xml...>")
  .description("Transform XML", {
    xslt: "XSLT stylesheet",
    xml: "XML files to process",
  })
  .action((xslt, xmls) => {
    const transform = buildStylesheet(xslt);
    const serializer = new slimdom.XMLSerializer();
    for (let xml of xmls) {
      const outfile = xml + "_out";
      if (existsSync(outfile)) {
        throw new Error("File " + outfile + " exists!");
      } else {
        const xmlDom = sync(readFileSync(xml).toString());
        const transformed = transform(xmlDom);
        writeFileSync(outfile, serializer.serializeToString(transformed));
      }
    }
  });

program.parse(process.argv);
