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

import { registerCustomXPathFunction } from "fontoxpath";
import { readFileSync } from "fs";
import * as slimdom from "slimdom";
import { fileURLToPath, resolve } from "url";
import { DynamicContext, XPATH_NSURI } from "./xjslt";

function fnCurrent({ currentContext }) {
  return currentContext.contextItem;
}

let ids = new WeakMap<any, number>();
let counter = 0;
function fnGenerateId({ currentContext }, node: any) {
  if (!node) {
    node = currentContext.contextItem;
  }
  if (!ids.has(node)) {
    ids.set(node, counter++);
  }
  return ids.get(node).toString();
}

function urlToDom(context: DynamicContext, url: string) {
  const absoluteURL = context.inputURL
    ? resolve(context.inputURL.toString(), url)
    : url;

  if (absoluteURL.startsWith("file:")) {
    return slimdom.parseXmlDocument(
      readFileSync(fileURLToPath(new URL(absoluteURL))).toString(),
    );
  } else {
    /** How to do async with fontoxpath? */
    // const response = await fetch(absoluteURL);
    // return slimdom.parseXmlDocument(response.body.toString());
    return undefined;
  }
}

function fnDoc({ currentContext }, url: string) {
  return urlToDom(currentContext, url);
}

function fnCurrentGroupingKey({ currentContext }) {
  return currentContext.currentGroupingKey;
}

function fnCurrentGroup({ currentContext }) {
  return currentContext.currentGroup;
}

function fnKey({ currentContext }, name: string, value: any[]) {
  const { keys, contextItem, variableScopes, nameTestCache } =
    currentContext as DynamicContext;
  if (!keys.has(name)) {
    throw new Error("XTDE1260");
  }
  const retval = keys
    .get(name)
    .lookup(
      nameTestCache,
      contextItem.ownerDocument,
      variableScopes,
      value.map((s) => s.textContent).join(""),
    );
  if (!retval) {
    return [];
  } else {
    return retval;
  }
}

function fnSystemProperty(_, property: string) {
  if (property.split(":")[1] === "version") {
    return "2.0";
  } else if (property.split(":")[1] === "vendor") {
    return "xjslt";
  } else if (property.split(":")[1] === "vendor-url") {
    return "https://github.com/egh/xjslt";
  } else if (property.split(":")[1] === "product-name") {
    return "xjslt";
  } else if (property.split(":")[1] === "product-version") {
    return "0.1";
  } else if (property.split(":")[1] === "supports-backwards-compatibility") {
    return "no";
  } else if (property.split(":")[1] === "is-schema-aware") {
    return "no";
  } else if (property.split(":")[1] === "supports-serialization") {
    return "no";
  } else if (property.split(":")[1] === "supports-backwards-compatibility") {
    return "no";
  } else {
    return "";
  }
}

export function registerFunctions() {
  registerCustomXPathFunction(
    { namespaceURI: XPATH_NSURI, localName: "current" },
    [],
    "item()",
    fnCurrent,
  );

  registerCustomXPathFunction(
    { namespaceURI: XPATH_NSURI, localName: "generate-id" },
    [],
    "xs:string",
    fnGenerateId,
  );

  registerCustomXPathFunction(
    { namespaceURI: XPATH_NSURI, localName: "generate-id" },
    ["node()"],
    "xs:string",
    fnGenerateId,
  );

  registerCustomXPathFunction(
    { namespaceURI: XPATH_NSURI, localName: "doc" },
    ["xs:string"],
    "document-node()",
    fnDoc as (context: any, url: string) => any,
  );

  registerCustomXPathFunction(
    { namespaceURI: XPATH_NSURI, localName: "current-grouping-key" },
    [],
    "xs:anyAtomicType?",
    fnCurrentGroupingKey as (context: any) => any,
  );

  registerCustomXPathFunction(
    { namespaceURI: XPATH_NSURI, localName: "current-group" },
    [],
    "item()*",
    fnCurrentGroup as (context: any) => any,
  );

  registerCustomXPathFunction(
    { namespaceURI: XPATH_NSURI, localName: "key" },
    ["xs:string", "item()*"],
    "node()*",
    fnKey as (context: any, name: string, value: any) => any,
  );

  registerCustomXPathFunction(
    { namespaceURI: XPATH_NSURI, localName: "key" },
    ["xs:string", "item()*"],
    "node()*",
    fnKey as (context: any, name: string, value: any) => any,
  );

  registerCustomXPathFunction(
    { namespaceURI: XPATH_NSURI, localName: "system-property" },
    ["xs:string"],
    "xs:string",
    fnSystemProperty as (context: any, name: string) => string,
  );
}
