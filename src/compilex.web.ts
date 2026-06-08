import { generate } from "astring";
import * as slimdom from "slimdom";
import * as xjslt from "./xjslt";
import { preprocess, compileStylesheetNode } from "./compile";
import { StylesheetTransform } from "./definitions";

function readDocumentDefault(uri: string): slimdom.Document {
  // This should be async, but fontoxpath can't handle async custom
  // functions, and this is used by those, so it has to be synchronous
  // for now.
  const xhr = new XMLHttpRequest();
  xhr.open("GET", uri, false);
  xhr.send(null); // blocks
  return xhr.responseXML as unknown as slimdom.Document; // force convert to slimdom.Document, should be fine
}

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
