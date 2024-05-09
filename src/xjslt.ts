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
import {
  evaluateXPath,
  evaluateXPathToString,
  evaluateXPathToNodes,
  evaluateXPathToBoolean,
  EvaluateXPath,
} from "fontoxpath";
import { readFileSync, writeFileSync, symlinkSync, rmSync } from "fs";
import * as path from "path";
import { tmpdir } from "os";
import { mkdtemp } from "fs/promises";
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

export type SequenceConstructor = (context: ProcessingContext) => void;

export type VariableScope = Map<string, any>;

interface ApplyTemplateAttributes {
  select?: string;
  mode: string;
  params: VariableLike[];
}

interface CallTemplateAttributes {
  name: string;
  params: VariableLike[];
}

interface AttributeOutputData {
  name: string;
  value: string;
}

interface ChooseAlternative {
  test?: string;
  apply: SequenceConstructor;
}

interface CompiledTemplate {
  match?: string;
  name?: string;
  modes: string[];
  priority?: number;
  apply: SequenceConstructor;
  allowedParams: Array<VariableLike>;
}

interface IfAttributes {
  test: string;
}

interface ForEachAttributes {
  select: string;
}

interface SequenceAttributes {
  select: string;
}

interface TextAttributes {
  disableOutputEscaping: boolean;
}

interface NodeOutputData {
  ns?: string;
  name: string;
  attributes: Array<AttributeOutputData>;
}

interface ProcessingContext {
  outputDocument: slimdom.Document;
  outputNode: any;
  currentNode: any;
  currentNodeList: Array<any>;
  mode: string;
  templates: Array<CompiledTemplate>;
  variableScopes: Array<VariableScope>;
}

interface VariableLike {
  name: string;
  content: undefined | string | SequenceConstructor;
}

interface ValueOfAttributes {
  select: string;
  separator?: string;
  disableOutputEscaping?: boolean;
}

/* Implementation of https://www.w3.org/TR/xslt11/#patterns */
function nameTest(
  name: string,
  node: any,
  variableScopes: Array<VariableScope>,
  nsResolver?: (prefix: string) => string,
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
      undefined,
      mergeVariableScopes(variableScopes),
      options,
    );
    /* It counts as a match if the node we were testing against is in the resulting node set. */
    if (matches.includes(node)) {
      return true;
    } else {
      checkContext = checkContext.parentNode || checkContext.ownerElement;
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
  variableScopes: Array<VariableScope>,
  mode: string,
): CompiledTemplate {
  for (let template of templates) {
    if (template.modes.includes(mode) || template.modes[0] === "#all") {
      if (template.match) {
        /* some templates have no match */
        // console.log(`checking for ${mode} on ${node.localName} in ${template.match} with modes ${template.modes.join(',')}...`);
        if (nameTest(template.match, node, variableScopes)) {
          // console.log("matched");
          return template;
        }
      }
    }
  }
  return undefined;
}

const BUILT_IN_TEMPLATES = [
  {
    match: "*|/",
    apply: (context: ProcessingContext) => {
      applyTemplatesInternal(context, {
        select: "child::node()",
        params: [],
        mode: "#current",
      });
    },
    allowedParams: [],
    modes: ["#all"],
  },
  {
    match: "text()|@*",
    apply: (context: ProcessingContext) => {
      valueOfInternal(context, { select: "." });
    },
    allowedParams: [],
    modes: ["#all"],
  },
  {
    match: "processing-instruction()|comment()",
    apply: (_context: ProcessingContext) => {},
    allowedParams: [],
    modes: ["#all"],
  },
];

function getTemplateBuiltin(node: any): CompiledTemplate {
  return getTemplate(node, BUILT_IN_TEMPLATES, [], "#default");
}

export function processNode(
  context: ProcessingContext,
  params: VariableLike[],
) {
  const template =
    getTemplate(
      context.currentNode,
      context.templates,
      context.variableScopes,
      context.mode,
    ) || getTemplateBuiltin(context.currentNode);
  if (template) {
    evaluateTemplate(template, context, params);
  }
}

function getParam(
  name: string,
  params: VariableLike[],
): VariableLike | undefined {
  for (let param of params) {
    if (param.name === name) {
      return param;
    }
  }
  return undefined;
}

function evaluateTemplate(
  template: CompiledTemplate,
  context: ProcessingContext,
  passedParams: VariableLike[],
) {
  let newScope = extendScope(context.variableScopes);
  for (let allowedParam of template.allowedParams) {
    let passedParam = getParam(allowedParam.name, passedParams);
    if (passedParam !== undefined) {
      /* we were passed this param */
      setVariable(
        newScope,
        passedParam.name,
        evaluateVariableLike(context, passedParam),
      );
    } else {
      /* use the default */
      setVariable(
        newScope,
        allowedParam.name,
        evaluateVariableLike(context, allowedParam),
      );
    }
  }
  return template.apply({
    ...context,
    variableScopes: newScope,
  });
}

export function applyTemplatesInternal(
  context: ProcessingContext,
  attributes: ApplyTemplateAttributes,
) {
  /* The nodes we want to apply templates on.*/
  const nodes = evaluateXPathToNodes(
    attributes.select,
    context.currentNode,
    undefined,
    mergeVariableScopes(context.variableScopes),
  );
  let mode = attributes.mode || "#default";
  if (mode === "#current") {
    /* keep the current mode */
    mode = context.mode;
  }
  for (let node of nodes) {
    /* for each node */
    processNode(
      {
        ...context,
        mode: mode,
        currentNode: node,
        currentNodeList: nodes,
        variableScopes: extendScope(context.variableScopes),
      },
      attributes.params,
    );
  }
}

export function callTemplateInternal(
  context: ProcessingContext,
  attributes: CallTemplateAttributes,
  params: VariableLike[],
) {
  for (let template of context.templates) {
    if (template.name !== undefined && attributes.name === template.name) {
      return evaluateTemplate(template, context, params);
    }
  }
  throw new Error(`Cannot find a template named ${attributes.name}`);
}

export function copyInternal(
  context: ProcessingContext,
  attributes: {},
  func: SequenceConstructor,
) {
  if (context.currentNode.nodeType === NodeType.ELEMENT_NODE) {
    const newNode = context.outputDocument.createElementNS(
      context.currentNode.ns,
      context.currentNode.localName,
    );
    context.outputNode.appendChild(newNode);
    if (func) {
      func({
        ...context,
        outputNode: newNode,
      });
    }
  } else {
    context.outputNode.appendChild(context.currentNode);
  }
}

export function valueOfInternal(
  context: ProcessingContext,
  attributes: ValueOfAttributes,
) {
  let strs = evaluateXPath(
    attributes.select,
    context.currentNode,
    undefined,
    mergeVariableScopes(context.variableScopes),
    evaluateXPath.STRINGS_TYPE,
  );
  const str = strs.join(
    evaluateAttributeValueTemplate(context, attributes.separator || ""),
  );
  if (str !== "") {
    const newNode = context.outputDocument.createTextNode(str);
    context.outputNode.appendChild(newNode);
  }
}

export function textInternal(
  context: ProcessingContext,
  attributes: TextAttributes,
  func: SequenceConstructor,
) {
  const out = evaluateSequenceConstructorInTemporaryTree(context, func);
  const newNode = context.outputDocument.createTextNode(extractText(out));
  context.outputNode.appendChild(newNode);
}

export function variableInternal(
  context: ProcessingContext,
  variable: VariableLike,
) {
  setVariable(
    context.variableScopes,
    variable.name,
    evaluateVariableLike(context, variable),
  );
}

export function paramInternal(
  context: ProcessingContext,
  variable: VariableLike,
) {
  /** todo: allow passing in params */
  setVariable(
    context.variableScopes,
    variable.name,
    evaluateVariableLike(context, variable),
  );
}

export function extendScope(variableScopes: Array<VariableScope>) {
  return variableScopes.concat([new Map()]);
}

export function setVariable(
  variableScopes: Array<VariableScope>,
  name: string,
  value: any,
) {
  variableScopes[variableScopes.length - 1].set(name, value);
}

export function mergeVariableScopes(variableScopes: Array<VariableScope>) {
  let retval = {};
  for (let variableScope of variableScopes) {
    for (let [key, value] of variableScope) {
      retval[key] = value;
    }
  }
  return retval;
}

export function literalTextInternal(context: ProcessingContext, text: string) {
  context.outputNode.appendChild(context.outputDocument.createTextNode(text));
}

function appendToTree(thing: any, context: ProcessingContext) {
  if (thing instanceof slimdom.Node) {
    context.outputNode.appendChild(thing);
  } else {
    context.outputNode.appendChild(
      context.outputDocument.createTextNode(thing.toString()),
    );
  }
}

export function sequenceInternal(
  context: ProcessingContext,
  attributes: SequenceAttributes,
) {
  const things = evaluateXPath(
    attributes.select,
    context.currentNode,
    undefined,
    mergeVariableScopes(context.variableScopes),
    evaluateXPath.ALL_RESULTS_TYPE,
  );
  for (let thing of things) {
    appendToTree(thing, context);
  }
}

export function literalElementInternal(
  context: ProcessingContext,
  node: NodeOutputData,
  func: SequenceConstructor,
) {
  let newNode: any;
  if (node.ns) {
    newNode = context.outputDocument.createElementNS(node.ns, node.name);
  } else {
    newNode = context.outputDocument.createElement(node.name);
  }
  for (let attr of node.attributes) {
    const value = evaluateAttributeValueTemplate(context, attr.value);
    newNode.setAttribute(attr.name, value);
  }
  context.outputNode.appendChild(newNode);
  func({
    ...context,
    outputNode: newNode,
    variableScopes: extendScope(context.variableScopes),
  });
}

export function attributeInternal(
  context: ProcessingContext,
  attributes: { name: string; ns?: string },
  func: SequenceConstructor,
) {
  const name = evaluateAttributeValueTemplate(context, attributes.name);
  const value = extractText(
    evaluateSequenceConstructorInTemporaryTree(context, func),
  );
  context.outputNode.setAttribute(name, value);
}

export function elementInternal(
  context: ProcessingContext,
  node: NodeOutputData,
  func: SequenceConstructor,
) {
  let newNode: any;
  const name = evaluateAttributeValueTemplate(context, node.name);
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

export function ifInternal(
  context: ProcessingContext,
  attributes: IfAttributes,
  func: SequenceConstructor,
) {
  if (
    evaluateXPathToBoolean(
      attributes.test,
      context.currentNode,
      undefined,
      mergeVariableScopes(context.variableScopes),
    )
  ) {
    func(context);
  }
}

export function chooseInternal(
  context: ProcessingContext,
  alternatives: Array<ChooseAlternative>,
) {
  for (let alternative of alternatives) {
    if (!alternative.test) {
      return alternative.apply(context);
    } else if (
      evaluateXPathToBoolean(
        alternative.test,
        context.currentNode,
        undefined,
        mergeVariableScopes(context.variableScopes),
      )
    ) {
      return alternative.apply(context);
    }
  }
}

export function forEachInternal(
  context: ProcessingContext,
  attributes: ForEachAttributes,
  func: SequenceConstructor,
) {
  const nodeList = evaluateXPath(
    attributes.select,
    context.currentNode,
    undefined,
    mergeVariableScopes(context.variableScopes),
  );
  if (nodeList && Symbol.iterator in Object(nodeList)) {
    for (let node of nodeList) {
      func({
        ...context,
        currentNode: node,
        currentNodeList: nodeList,
        variableScopes: extendScope(context.variableScopes),
      });
    }
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

function preserveSpace(
  node: any,
  preserve: Array<string>,
  nsResolver: (prefix: string) => string,
) {
  for (let name of preserve) {
    if (nameTest(name, node, [], nsResolver)) {
      return true;
    }
  }
  return false;
}

/* https://www.w3.org/TR/xslt11/#strip */
export function stripSpace(
  doc: any,
  preserve: Array<string>,
  nsResolver: (prefix: string) => string,
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
export function stripSpaceStylesheet(doc: any) {
  const nsResolver = (prefix: string): string => {
    if (prefix === "xsl") {
      return XSLT1_NSURI;
    }
  };
  return stripSpace(doc, ["xsl:text"], nsResolver);
}

export function evaluateAttributeValueTemplate(
  context: ProcessingContext,
  avt: string,
): string {
  return Array.from(avt.matchAll(/({[^}]+}|[^{}]+)/g))
    .map((match) => {
      const piece = match[0];
      if (piece[0] === "{") {
        return evaluateXPathToString(
          piece.substring(1, piece.length - 1),
          context.currentNode,
          undefined,
          mergeVariableScopes(context.variableScopes),
        );
      } else {
        return piece;
      }
    })
    .join("");
}

function evaluateVariableLike(
  context: ProcessingContext,
  variable: VariableLike,
): string | EvaluateXPath | slimdom.Document {
  if (typeof variable.content === "string") {
    return evaluateXPath(
      variable.content,
      context.currentNode,
      undefined,
      mergeVariableScopes(context.variableScopes),
    );
  } else if (variable.content == undefined) {
    return "";
  } else {
    return evaluateSequenceConstructorInTemporaryTree(
      context,
      variable.content,
    );
  }
}

/**
 * Evaluate a sequence constructor in a temporary tree and return the
 * output document. Use for <xsl:attribute> and <xsl:variable>
 * https://www.w3.org/TR/xslt20/#temporary-trees
 */
function evaluateSequenceConstructorInTemporaryTree(
  origContext: ProcessingContext,
  func: SequenceConstructor,
) {
  const doc = new slimdom.Document();
  doc.appendChild(doc.createElement("root"));
  let context = {
    outputDocument: doc,
    outputNode: doc.documentElement,
    currentNode: origContext.currentNode,
    currentNodeList: [],
    mode: "#default",
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
export async function buildStylesheet(xsltPath: string) {
  let slimdom_path = require.resolve("slimdom").split(path.sep);
  let root_dir = path.join(
    "/",
    ...slimdom_path.slice(0, slimdom_path.indexOf("node_modules")),
  );
  var tempdir = await mkdtemp(path.join(tmpdir(), "xjslt-"));
  symlinkSync(
    path.join(root_dir, "node_modules"),
    path.join(tempdir, "node_modules"),
  );
  symlinkSync(
    path.join(root_dir, "package.json"),
    path.join(tempdir, "package.json"),
  );
  symlinkSync(path.join(root_dir, "dist"), path.join(tempdir, "dist"));
  var tempfile = path.join(tempdir, "transform.js");
  const xsltDoc = stripSpaceStylesheet(
    slimdom.parseXmlDocument(readFileSync(xsltPath).toString()),
  );
  writeFileSync(tempfile, generate(compileNode(xsltDoc)));
  let transform = await import(tempfile);
  // console.log(readFileSync(tempfile).toString())
  rmSync(tempdir, { recursive: true });
  return transform.transform;
}
