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

import { generate } from "astring";
import { sync } from "slimdom-sax-parser";
import {
  evaluateXPath,
  evaluateXPathToString,
  evaluateXPathToNodes,
  evaluateXPathToBoolean,
  EvaluateXPath,
} from "fontoxpath";
import { readFileSync, writeFileSync, symlinkSync, rmdirSync } from "fs";
import * as path from "path";
import * as tempy from "tempy";
import * as slimdom from "slimdom";
import { compileNode } from "./compile";

export const XSLT1_NSURI = "http://www.w3.org/1999/XSL/Transform";

export const enum NodeType {
  ELEMENT_NODE = 1,
  ATTRIBUTE_NODE = 2,
  TEXT_NODE = 3,
  CDATA_SECTION_NODE = 4,
  ENTITY_REFERENCE_NODE = 5, // historical
  ENTITY_NODE = 6, // historical
  PROCESSING_INSTRUCTION_NODE = 7,
  COMMENT_NODE = 8,
  DOCUMENT_NODE = 9,
  DOCUMENT_TYPE_NODE = 10,
  DOCUMENT_FRAGMENT_NODE = 11,
  NOTATION_NODE = 12, // historical
}

interface ApplyTemplateAttributes {
  select?: string;
  mode?: string;
}

interface VariableAttributes {
  select?: string;
  name: string;
}

interface AttributeOutputData {
  name: string;
  value: string;
}

interface ChooseAlternative {
  test?: string;
  apply: (context: ProcessingContext) => void;
}

interface CompiledTemplate {
  attributes: TemplateAttributes;
  apply: (context: ProcessingContext) => void;
}

interface IfAttributes {
  test: string;
}

interface ForEachAttributes {
  select: string;
}

interface NodeOutputData {
  ns?: string;
  name: string;
  attributes: Array<AttributeOutputData>;
}

interface VariableScope {
  [key: string]: any;
}

interface ProcessingContext {
  outputDocument: slimdom.Document;
  outputNode: any;
  currentNode: any;
  currentNodeList: Array<any>;
  mode?: string;
  templates: Array<CompiledTemplate>;
  variableScopes: Array<VariableScope>;
}

interface TemplateAttributes {
  match?: string;
  name?: string;
  mode?: string;
  priority?: number;
}

interface ValueOfAttributes {
  select: string;
  disableOutputEscaping?: boolean;
}

/* Implementation of https://www.w3.org/TR/xslt11/#patterns */
function nameTest(
  name: string,
  node: any,
  variableScopes: Array<VariableScope>,
  nsResolver?: (prefix: string) => string
) {
  let checkContext = node;
  let options = {};
  if (nsResolver) {
    options["namespaceResolver"] = nsResolver;
  }
  /* Using ancestors as the potential contexts */
  while (checkContext) {
    const matches = evaluateXPathToNodes(
      name,
      checkContext,
      null,
      mergeVariableScopes(variableScopes),
      options
    );
    /* It counts as a match if the node we were testing against is in the resulting node set. */
    if (matches.includes(node)) {
      return true;
    } else {
      checkContext = checkContext.parentNode;
    }
  }
  return false;
}

/**
 * Find the template that should be used to process a node.
 *
 * @returns The template, or undefined if none can be found to match this node.
 */
function getTemplate(
  node: any,
  templates: Array<CompiledTemplate>,
  variableScopes: Array<VariableScope>
): CompiledTemplate {
  for (let template of templates) {
    if (nameTest(template.attributes.match, node, variableScopes)) {
      return template;
    }
  }
  return undefined;
}

const BUILT_IN_TEMPLATES = [
  {
    attributes: { match: "*|/" },
    apply: (context: ProcessingContext) => {
      applyTemplatesInternal(context, { select: null });
    },
  },
  {
    attributes: { match: "text()|@*" },
    apply: (context: ProcessingContext) => {
      valueOfInternal(context, { select: "." });
    },
  },
  {
    attributes: { match: "processing-instruction()|comment()" },
    apply: (_context: ProcessingContext) => {},
  },
];

function getTemplateBuiltin(node: any): CompiledTemplate {
  return getTemplate(node, BUILT_IN_TEMPLATES, null);
}

function processNode(context: ProcessingContext) {
  const template =
    getTemplate(
      context.currentNode,
      context.templates,
      context.variableScopes
    ) || getTemplateBuiltin(context.currentNode);
  if (template) {
    template.apply(context);
  }
}

function applyTemplatesInternal(
  context: ProcessingContext,
  attributes: ApplyTemplateAttributes
) {
  /* The nodes we want to apply templates on.*/
  let select: string;
  if (attributes.select) {
    select = attributes.select;
  } else {
    select = "node()";
  }
  const nodes = evaluateXPathToNodes(
    select,
    context.currentNode,
    null,
    mergeVariableScopes(context.variableScopes)
  );
  for (let node of nodes) {
    /* for each node */
    processNode({
      ...context,
      currentNode: node,
      currentNodeList: nodes,
      variableScopes: extendScope(context.variableScopes),
    });
  }
}

function valueOfInternal(
  context: ProcessingContext,
  attributes: ValueOfAttributes
) {
  const newNode = context.outputDocument.createTextNode(
    evaluateXPathToString(
      attributes.select,
      context.currentNode,
      null,
      mergeVariableScopes(context.variableScopes)
    )
  );
  context.outputNode.appendChild(newNode);
}

function variableInternal(
  context: ProcessingContext,
  attributes: VariableAttributes,
  func: (context: ProcessingContext) => void
) {
  setVariable(
    context.variableScopes,
    attributes.name,
    evaluateSelectOrSequenceConstructor(context, attributes.select, func)
  );
}

function extendScope(variableScopes: Array<VariableScope>) {
  return variableScopes.concat([{}]);
}

function setVariable(
  variableScopes: Array<VariableScope>,
  name: string,
  value: any
) {
  variableScopes[variableScopes.length - 1][name] = value;
}

function mergeVariableScopes(variableScopes: Array<VariableScope>) {
  if (variableScopes) {
    let retval = {};
    for (let variableScope of variableScopes) {
      Object.assign(retval, variableScope);
    }
    return retval;
  }
  return {};
}

function literalTextInternal(context: ProcessingContext, text: string) {
  context.outputNode.appendChild(context.outputDocument.createTextNode(text));
}

function literalElementInternal(
  context: ProcessingContext,
  node: NodeOutputData,
  func: (context: ProcessingContext) => void
) {
  let newNode: any;
  if (node.ns) {
    newNode = context.outputDocument.createElementNS(node.ns, node.name);
  } else {
    newNode = context.outputDocument.createElement(node.name);
  }
  for (let attr of node.attributes) {
    const value = evaluteAttributeValueTemplate(context, attr.value);
    newNode.setAttribute(attr.name, value);
  }
  context.outputNode.appendChild(newNode);
  func({
    ...context,
    outputNode: newNode,
    variableScopes: extendScope(context.variableScopes),
  });
}

function attributeInternal(
  context: ProcessingContext,
  attributes: { name: string; ns?: string },
  func: (context: ProcessingContext) => void
) {
  const name = evaluteAttributeValueTemplate(context, attributes.name);
  const value = extractText(
    evaluateSequenceConstructorInTemporaryTree(context, func)
  );
  context.outputNode.setAttribute(name, value);
}

function elementInternal(
  context: ProcessingContext,
  node: NodeOutputData,
  func: (context: ProcessingContext) => void
) {
  let newNode: any;
  const name = evaluteAttributeValueTemplate(context, node.name);
  if (node.ns) {
    newNode = context.outputDocument.createElementNS(node.ns, name);
  } else {
    newNode = context.outputDocument.createElement(name);
  }
  context.outputNode.appendChild(newNode);
  func({
    ...context,
    outputNode: newNode,
    variableScopes: extendScope(context.variableScopes),
  });
}

function ifInternal(
  context: ProcessingContext,
  attributes: IfAttributes,
  func: (context: ProcessingContext) => void
) {
  if (
    evaluateXPathToBoolean(
      attributes.test,
      context.currentNode,
      null,
      mergeVariableScopes(context.variableScopes)
    )
  ) {
    func(context);
  }
}

function chooseInternal(
  context: ProcessingContext,
  alternatives: Array<ChooseAlternative>
) {
  for (let alternative of alternatives) {
    if (!alternative.test) {
      return alternative.apply(context);
    } else if (
      evaluateXPathToBoolean(
        alternative.test,
        context.currentNode,
        null,
        mergeVariableScopes(context.variableScopes)
      )
    ) {
      return alternative.apply(context);
    }
  }
}

function forEachInternal(
  context: ProcessingContext,
  attributes: ForEachAttributes,
  func: (context: ProcessingContext) => void
) {
  const nodeList = evaluateXPathToNodes(
    attributes.select,
    context.currentNode,
    null,
    mergeVariableScopes(context.variableScopes)
  );
  for (let node of nodeList) {
    func({
      ...context,
      currentNode: node,
      currentNodeList: nodeList,
      variableScopes: extendScope(context.variableScopes),
    });
  }
}

function findAttrValue(attrs: Array<any>, name: string) {
  const attr = attrs.find((attr) => attr.name === name);
  if (attr) {
    return attr.value;
  } else {
    return undefined;
  }
}

function makeTemplateAttributes(node: any): TemplateAttributes {
  const attrs = node.attributes;
  return {
    match: findAttrValue(attrs, "match"),
    priority: findAttrValue(attrs, "priority"),
    name: findAttrValue(attrs, "name"),
    mode: findAttrValue(attrs, "mode"),
  };
}

function preserveSpace(
  node: any,
  preserve: Array<string>,
  nsResolver: (prefix: string) => string
) {
  for (let name of preserve) {
    if (nameTest(name, node, null, nsResolver)) {
      return true;
    }
  }
  return false;
}

/* https://www.w3.org/TR/xslt11/#strip */
function stripSpace(
  doc: any,
  preserve: Array<string>,
  nsResolver: (prefix: string) => string
) {
  const ONLY_WHITESPACE = RegExp("^[ \n\r\t]+$");
  let toRemove = [];
  function walkTree(node: any) {
    if (node.nodeType === NodeType.TEXT_NODE) {
      if (
        ONLY_WHITESPACE.test(node.textContent) &&
        !preserveSpace(node.parentNode, preserve, nsResolver)
      ) {
        toRemove.push(node);
      }
    } else {
      if (node.hasChildNodes()) {
        for (let child of node.childNodes) {
          walkTree(child);
        }
      }
    }
  }
  walkTree(doc);
  for (let node of toRemove) {
    node.remove();
  }
  return doc;
}

/* Strip space for an XSLT stylesheet. */
function stripSpaceStylesheet(doc: any) {
  const nsResolver = (prefix: string): string => {
    if (prefix === "xsl") {
      return XSLT1_NSURI;
    }
  };
  return stripSpace(doc, ["xsl:text"], nsResolver);
}

function evaluteAttributeValueTemplate(
  context: ProcessingContext,
  avt: string
): string {
  return Array.from(avt.matchAll(/({[^}]+}|[^{}]+)/g))
    .map((match) => {
      const piece = match[0];
      if (piece[0] === "{") {
        return evaluateXPathToString(
          piece.substring(1, piece.length - 1),
          context.currentNode,
          null,
          mergeVariableScopes(context.variableScopes)
        );
      } else {
        return piece;
      }
    })
    .join("");
}

function evaluateSelectOrSequenceConstructor(
  context: ProcessingContext,
  select: string,
  func: (context: ProcessingContext) => void
): EvaluateXPath | slimdom.Document {
  if (select) {
    return evaluateXPath(
      select,
      context.currentNode,
      null,
      mergeVariableScopes(context.variableScopes)
    );
  } else {
    return evaluateSequenceConstructorInTemporaryTree(context, func);
  }
}

/**
 * Evaluate a sequence constructor in a temporary tree and return the
 * output document. Use for <xsl:attribute> and <xsl:variable>
 * https://www.w3.org/TR/xslt20/#temporary-trees
 */
function evaluateSequenceConstructorInTemporaryTree(
  origContext: ProcessingContext,
  func: (context: ProcessingContext) => void
) {
  const doc = new slimdom.Document();
  doc.appendChild(doc.createElement("root"));
  let context = {
    outputDocument: doc,
    outputNode: doc.documentElement,
    currentNode: origContext.currentNode,
    currentNodeList: [],
    mode: null,
    templates: origContext.templates,
    variableScopes: extendScope(origContext.variableScopes),
  };
  func(context);
  return context.outputDocument;
}

/**
 * Extract text content of a document.
 */
function extractText(document: any) {
  let str = "";
  function walkTree(node: any): void {
    if (node.nodeType == NodeType.TEXT_NODE) {
      str += node.data;
    }
    if (node.childNodes) {
      for (let child of node.childNodes) {
        walkTree(child);
      }
    }
  }
  walkTree(document);
  return str;
}

/**
 * Build a stylesheet. Returns a function that will take an input DOM
 * document and return an output DOM document.
 */
function buildStylesheet(xsltPath: string) {
  let slimdom_path = require.resolve("slimdom").split(path.sep);
  let root_dir = path.join(
    "/",
    ...slimdom_path.slice(0, slimdom_path.indexOf("node_modules"))
  );
  var tempdir = tempy.directory({ prefix: "xjslt" });
  symlinkSync(
    path.join(root_dir, "node_modules"),
    path.join(tempdir, "node_modules")
  );
  symlinkSync(
    path.join(root_dir, "package.json"),
    path.join(tempdir, "package.json")
  );
  symlinkSync(path.join(root_dir, "dist"), path.join(tempdir, "dist"));
  var tempfile = path.join(tempdir, "transform.js");
  const xsltDoc = stripSpaceStylesheet(sync(readFileSync(xsltPath).toString()));
  writeFileSync(tempfile, generate(compileNode(xsltDoc)));
  let transform = require(tempfile);
  rmdirSync(tempdir, { recursive: true });
  return transform.transform;
}

export {
  applyTemplatesInternal,
  attributeInternal,
  buildStylesheet,
  chooseInternal,
  elementInternal,
  evaluteAttributeValueTemplate,
  extendScope,
  forEachInternal,
  ifInternal,
  literalTextInternal,
  literalElementInternal,
  makeTemplateAttributes,
  mergeVariableScopes,
  processNode,
  setVariable,
  stripSpace,
  stripSpaceStylesheet,
  valueOfInternal,
  variableInternal,
};
