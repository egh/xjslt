import * as slimdom from "slimdom";

import { rawCompile } from "./compile";
import { StylesheetTransform } from "./definitions";

function readDocument(uri: string): slimdom.Document {
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
): StylesheetTransform {
  return rawCompile(xslt, readDocument, inputURL);
}
