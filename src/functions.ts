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

import { registerCustomXPathFunction, ResolvedQualifiedName } from "fontoxpath";
import { DynamicContext, XJSLT_NSURI, XPATH_NSURI } from "./definitions";
import { urlToDom } from "./util";

function fnCurrent({ currentContext }) {
  return currentContext.contextItem;
}

function fnDoc({ currentContext }, url: string) {
  return urlToDom(currentContext, url);
}

function fnCurrentGroupingKey({ currentContext }) {
  return currentContext.currentGroup.key;
}

function fnCurrentGroup({ currentContext }) {
  return currentContext.currentGroup.nodes;
}

function fnPosition({ currentContext }) {
  return currentContext.position;
}

function fnLast({ currentContext }) {
  return currentContext.contextList.length;
}

function fnCurrentOutputUri({ currentContext }) {
  for (const [uri, doc] of currentContext.resultDocuments) {
    if (doc === currentContext.outputDocument) {
      return uri;
    }
  }
  return "#default";
}

function fnKey({ currentContext }, name: string, value: any) {
  const { keys, contextItem, variableScopes, patternMatchCache } =
    currentContext as DynamicContext;
  if (!keys.has(name)) {
    throw new Error("XTDE1260");
  }
  const retval = keys
    .get(name)
    .lookup(
      patternMatchCache,
      contextItem.ownerDocument,
      variableScopes,
      value,
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

function fnNormalizeUnicode(_, value: string, normalizationForm: string) {
  const validForms = ["NFC", "NFD", "NFKC", "NFKD"];
  if (value === null || value === undefined) return "";
  const form = normalizationForm.toUpperCase().replace("-", "");
  if (!validForms.includes(form)) {
    throw new Error("FOCH0003: Normalization form not supported.");
  }
  return value.normalize(form as "NFC" | "NFD" | "NFKC" | "NFKD");
}

const FUNCTION_OVERRIDES = [
  "current",
  "current-group",
  "current-grouping-key",
  "current-output-uri",
  "doc",
  "key",
  "lastx",
  "normalize-unicode",
  "positionx",
  "system-property",
];

/**
 * Use our own namespace prefix for function builtins to override.
 */
export function functionNameResolver(
  { prefix, localName },
  _arity: number,
): ResolvedQualifiedName {
  if (!prefix || prefix === "fn") {
    if (FUNCTION_OVERRIDES.includes(localName)) {
      return { namespaceURI: XJSLT_NSURI, localName };
    }
  }
  return null;
}

export function registerFunctions() {
  registerCustomXPathFunction(
    { namespaceURI: XJSLT_NSURI, localName: "current" },
    [],
    "item()",
    fnCurrent,
  );

  registerCustomXPathFunction(
    { namespaceURI: XJSLT_NSURI, localName: "current-output-uri" },
    [],
    "xs:string",
    fnCurrentOutputUri,
  );

  registerCustomXPathFunction(
    { namespaceURI: XJSLT_NSURI, localName: "doc" },
    ["xs:string"],
    "document-node()",
    fnDoc as (context: any, url: string) => any,
  );

  registerCustomXPathFunction(
    { namespaceURI: XJSLT_NSURI, localName: "current-grouping-key" },
    [],
    /* This should be xs:anyAtomicType? but that makes fontoxpath crap
       out and xs:string is often correct */
    "xs:string?",
    fnCurrentGroupingKey as (context: any) => any,
  );

  registerCustomXPathFunction(
    { namespaceURI: XJSLT_NSURI, localName: "current-group" },
    [],
    "item()*",
    fnCurrentGroup as (context: any) => any,
  );

  registerCustomXPathFunction(
    { namespaceURI: XJSLT_NSURI, localName: "positionx" },
    [],
    "xs:integer",
    fnPosition as (context: any) => number,
  );

  registerCustomXPathFunction(
    { namespaceURI: XJSLT_NSURI, localName: "lastx" },
    [],
    "xs:integer",
    fnLast as (context: any) => number,
  );

  registerCustomXPathFunction(
    { namespaceURI: XJSLT_NSURI, localName: "key" },
    ["xs:string", "item()*"],
    "node()*",
    fnKey as (context: any, name: string, value: any) => any,
  );

  registerCustomXPathFunction(
    { namespaceURI: XJSLT_NSURI, localName: "system-property" },
    ["xs:string"],
    "xs:string",
    fnSystemProperty as (context: any, name: string) => string,
  );
  registerCustomXPathFunction(
    { namespaceURI: XJSLT_NSURI, localName: "normalize-unicode" },
    ["xs:string?"],
    "xs:string",
    (ctx: any, value: string) => fnNormalizeUnicode(ctx, value, "NFC"),
  );

  registerCustomXPathFunction(
    { namespaceURI: XJSLT_NSURI, localName: "normalize-unicode" },
    ["xs:string?", "xs:string"],
    "xs:string",
    fnNormalizeUnicode as (context: any, value: string, form: string) => string,
  );
}
