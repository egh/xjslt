/*
 * Copyright (C) 2021-2026 Erik Hetzner
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

/*
 * Serialization of result documents for the html, xhtml and text
 * output methods. See
 * https://www.w3.org/TR/xslt-xquery-serialization/
 */

import * as slimdom from "slimdom";
import { NodeType, OutputResult, XMLNS_NSURI } from "./definitions";

export type OutputMethod = "xml" | "html" | "xhtml" | "text";

const XHTML_NSURI = "http://www.w3.org/1999/xhtml";
const XML_NSURI = "http://www.w3.org/XML/1998/namespace";

/* https://html.spec.whatwg.org/multipage/syntax.html#void-elements
   plus the empty elements of HTML 4. */
const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

/* Elements whose content is not escaped by the html output method. */
const RAW_TEXT_ELEMENTS = new Set(["script", "style"]);

/* Attributes that the html output method writes in minimized form
   when their value equals their name. */
const BOOLEAN_ATTRIBUTES = new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "compact",
  "controls",
  "declare",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nohref",
  "noresize",
  "noshade",
  "novalidate",
  "nowrap",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected",
]);

/**
 * Determine the output method to use for a result. If no method was
 * declared, the html method is used when the document element is
 * `html` in no namespace (XSLT 2.0 section 20), otherwise xml.
 */
export function effectiveOutputMethod(result: OutputResult): OutputMethod {
  const method = result.method;
  if (
    method === "xml" ||
    method === "html" ||
    method === "xhtml" ||
    method === "text"
  ) {
    return method;
  }
  if (method === undefined) {
    const root = result.document.documentElement;
    if (
      root &&
      root.namespaceURI === null &&
      root.localName.toLowerCase() === "html"
    ) {
      return "html";
    }
  }
  return "xml";
}

/**
 * The text output method: the string value of the document.
 */
export function serializeText(result: OutputResult): string {
  const out: string[] = [];
  const visit = (node: slimdom.Node) => {
    if (
      node.nodeType === NodeType.TEXT ||
      node.nodeType === NodeType.CDATA_SECTION
    ) {
      out.push((node as slimdom.CharacterData).data);
    } else if (
      node.nodeType === NodeType.ELEMENT ||
      node.nodeType === NodeType.DOCUMENT ||
      node.nodeType === NodeType.DOCUMENT_FRAGMENT
    ) {
      for (const child of node.childNodes) {
        visit(child);
      }
    }
  };
  visit(result.document);
  return out.join("");
}

/**
 * The html and xhtml output methods.
 */
export function serializeHtml(
  result: OutputResult,
  method: "html" | "xhtml",
): string {
  const out: string[] = [];
  if (method === "xhtml" && result.omitXmlDeclaration !== true) {
    out.push(xmlDeclaration(result));
  }
  out.push(doctypeDeclaration(result, method));
  const scope = new Map<string, string | null>([
    ["", null],
    ["xml", XML_NSURI],
  ]);
  for (const child of result.document.childNodes) {
    serializeNode(child, out, method, scope, false, result);
  }
  return out.join("");
}

function xmlDeclaration(result: OutputResult): string {
  let decl = `<?xml version="1.0" encoding="UTF-8"`;
  if (result.standalone !== undefined) {
    decl += ` standalone="${result.standalone ? "yes" : "no"}"`;
  }
  return decl + "?>";
}

function doctypeDeclaration(
  result: OutputResult,
  method: "html" | "xhtml",
): string {
  if (result.doctypeSystem) {
    if (result.doctypePublic) {
      return `<!DOCTYPE html PUBLIC "${result.doctypePublic}" "${result.doctypeSystem}">`;
    }
    return `<!DOCTYPE html SYSTEM "${result.doctypeSystem}">`;
  }
  if (result.doctypePublic) {
    if (method === "html") {
      return `<!DOCTYPE html PUBLIC "${result.doctypePublic}">`;
    }
    /* xhtml follows the xml rule: no system identifier, no doctype. */
    return "";
  }
  /* HTML 5 */
  return "<!DOCTYPE html>";
}

function escapeText(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(value: string, method: "html" | "xhtml"): string {
  if (method === "html") {
    /* The html output method does not escape < in attribute values,
       nor & when followed by { */
    return value.replace(/&(?!\{)/g, "&amp;").replace(/"/g, "&quot;");
  }
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
    .replace(/\t/g, "&#9;")
    .replace(/\n/g, "&#10;")
    .replace(/\r/g, "&#13;");
}

function namespaceDeclaration(prefix: string, uri: string | null): string {
  if (prefix === "") {
    return ` xmlns="${escapeAttribute(uri || "", "xhtml")}"`;
  }
  return ` xmlns:${prefix}="${escapeAttribute(uri || "", "xhtml")}"`;
}

function isHtmlElement(element: slimdom.Element): boolean {
  return element.namespaceURI === null || element.namespaceURI === XHTML_NSURI;
}

function serializeNode(
  node: slimdom.Node,
  out: string[],
  method: "html" | "xhtml",
  scope: Map<string, string | null>,
  rawText: boolean,
  result: OutputResult,
) {
  switch (node.nodeType) {
    case NodeType.ELEMENT:
      serializeElement(node as slimdom.Element, out, method, scope, result);
      break;
    case NodeType.TEXT: {
      const data = (node as slimdom.Text).data;
      out.push(rawText ? data : escapeText(data));
      break;
    }
    case NodeType.CDATA_SECTION: {
      const data = (node as slimdom.CDATASection).data;
      if (method === "xhtml") {
        out.push(`<![CDATA[${data}]]>`);
      } else {
        out.push(rawText ? data : escapeText(data));
      }
      break;
    }
    case NodeType.COMMENT:
      out.push(`<!--${(node as slimdom.Comment).data}-->`);
      break;
    case NodeType.PROCESSING_INSTRUCTION: {
      const pi = node as slimdom.ProcessingInstruction;
      const body = pi.data ? `${pi.target} ${pi.data}` : pi.target;
      out.push(method === "html" ? `<?${body}>` : `<?${body}?>`);
      break;
    }
    case NodeType.DOCUMENT:
    case NodeType.DOCUMENT_FRAGMENT:
      for (const child of node.childNodes) {
        serializeNode(child, out, method, scope, rawText, result);
      }
      break;
    default:
      /* Document type nodes are replaced by the doctype declaration
         computed from the output definition. */
      break;
  }
}

function serializeElement(
  element: slimdom.Element,
  out: string[],
  method: "html" | "xhtml",
  parentScope: Map<string, string | null>,
  result: OutputResult,
) {
  const scope = new Map(parentScope);
  const isHtml = isHtmlElement(element);
  const name = element.localName.toLowerCase();
  const attributes = Array.from(element.attributes);
  out.push(`<${element.tagName}`);

  /* Explicit namespace declarations first, so that they are in scope
     for the element and attribute names. */
  for (const attribute of attributes) {
    if (attribute.namespaceURI === XMLNS_NSURI) {
      const prefix = attribute.prefix === "xmlns" ? attribute.localName : "";
      const uri = attribute.value || null;
      if (scope.get(prefix) !== uri) {
        scope.set(prefix, uri);
        out.push(namespaceDeclaration(prefix, uri));
      }
    }
  }
  const elementPrefix = element.prefix || "";
  if ((scope.get(elementPrefix) ?? null) !== element.namespaceURI) {
    scope.set(elementPrefix, element.namespaceURI);
    out.push(namespaceDeclaration(elementPrefix, element.namespaceURI));
  }

  for (const attribute of attributes) {
    if (attribute.namespaceURI === XMLNS_NSURI) {
      continue;
    }
    let attributeName = attribute.name;
    const uri = attribute.namespaceURI;
    if (uri && uri !== XML_NSURI) {
      let prefix = attribute.prefix;
      if (!prefix || scope.get(prefix) !== uri) {
        /* Reuse an in-scope prefix for this namespace, or declare one. */
        prefix = undefined;
        for (const [p, u] of scope) {
          if (p !== "" && u === uri) {
            prefix = p;
            break;
          }
        }
        if (!prefix) {
          prefix = attribute.prefix;
          if (!prefix || scope.has(prefix)) {
            let n = 0;
            while (scope.has(`ns${n}`)) {
              n++;
            }
            prefix = `ns${n}`;
          }
          scope.set(prefix, uri);
          out.push(namespaceDeclaration(prefix, uri));
        }
      }
      attributeName = `${prefix}:${attribute.localName}`;
    }
    const localName = attribute.localName.toLowerCase();
    if (
      method === "html" &&
      isHtml &&
      !uri &&
      BOOLEAN_ATTRIBUTES.has(localName) &&
      attribute.value.toLowerCase() === localName
    ) {
      out.push(` ${attributeName}`);
    } else {
      out.push(
        ` ${attributeName}="${escapeAttribute(attribute.value, method)}"`,
      );
    }
  }

  const isVoid = isHtml && VOID_ELEMENTS.has(name);
  const children = Array.from(element.childNodes);
  if (method === "html") {
    if (isVoid) {
      /* Void elements have no end tag (and no content). */
      out.push(">");
      return;
    }
    if (!isHtml && children.length === 0) {
      out.push("/>");
      return;
    }
  } else {
    if (isVoid && children.length === 0) {
      out.push(" />");
      return;
    }
    if (!isHtml && children.length === 0) {
      out.push("/>");
      return;
    }
  }
  out.push(">");

  if (isHtml && name === "head" && result.includeContentType !== false) {
    out.push(
      `<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"${
        method === "html" ? ">" : " />"
      }`,
    );
  }

  const rawText = method === "html" && isHtml && RAW_TEXT_ELEMENTS.has(name);
  for (const child of children) {
    serializeNode(child, out, method, scope, rawText, result);
  }
  out.push(`</${element.tagName}>`);
}
