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
import { DynamicContext, XPATH_NSURI } from "./definitions";
import { urlToDom } from "./util";
function fnCurrent({ currentContext }) {
  return currentContext.contextItem;
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

export function registerFunctions() {
  registerCustomXPathFunction(
    { namespaceURI: XPATH_NSURI, localName: "current" },
    [],
    "item()",
    fnCurrent,
  );

  registerCustomXPathFunction(
    { namespaceURI: XPATH_NSURI, localName: "current-output-uri" },
    [],
    "xs:string",
    fnCurrentOutputUri,
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
    /* This should be xs:anyAtomicType? but that makes fontoxpath crap
       out and xs:string is often correct */
    "xs:string?",
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
    { namespaceURI: XPATH_NSURI, localName: "system-property" },
    ["xs:string"],
    "xs:string",
    fnSystemProperty as (context: any, name: string) => string,
  );
}
