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
  createTypedValueFactory,
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
export const XMLNS_NSURI = "http://www.w3.org/2000/xmlns/";

export type SequenceConstructor = (context: ProcessingContext) => void;

export type VariableScope = Map<string, any>;

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
  namespaces: object;
}

function resolver(namespaces: object) {
  return (prefix: string): string | null => {
    return namespaces[prefix] || null;
  };
}

/* Implementation of https://www.w3.org/TR/xslt11/#patterns */
function nameTest(
  name: string,
  node: any,
  variableScopes: Array<VariableScope>,
  nsResolver: (prefix: string) => string,
) {
  let checkContext = node;
  /* Using ancestors as the potential contexts */
  while (checkContext) {
    const matches = evaluateXPathToNodes(
      name,
      checkContext,
      undefined,
      /* TODO: Only top level variables are applicable here, so top
         level variables could be cached. */
      mergeVariableScopes(variableScopes),
      { namespaceResolver: nsResolver },
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
  namespaces: object,
): CompiledTemplate {
  for (let template of templates) {
    if (template.modes.includes(mode) || template.modes[0] === "#all") {
      if (template.match) {
        /* some templates have no match */
        // console.log(`checking for ${mode} on ${node.localName} in ${template.match} with modes ${template.modes.join(',')}...`);
        if (
          nameTest(template.match, node, variableScopes, resolver(namespaces))
        ) {
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
      applyTemplates(context, {
        select: "child::node()",
        params: [],
        mode: "#current",
        namespaces: {},
      });
    },
    allowedParams: [],
    modes: ["#all"],
  },
  {
    match: "text()|@*",
    apply: (context: ProcessingContext) => {
      valueOf(context, { select: ".", namespaces: {} });
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
  return getTemplate(node, BUILT_IN_TEMPLATES, [], "#default", {});
}

export function processNode(
  context: ProcessingContext,
  params: VariableLike[],
  namespaces: object,
) {
  const template =
    getTemplate(
      context.currentNode,
      context.templates,
      context.variableScopes,
      context.mode,
      namespaces,
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

export function applyTemplates(
  context: ProcessingContext,
  attributes: {
    select?: string;
    mode: string;
    params: VariableLike[];
    namespaces: object;
  },
) {
  /* The nodes we want to apply templates on.*/
  const nodes = evaluateXPathToNodes(
    attributes.select,
    context.currentNode,
    undefined,
    mergeVariableScopes(context.variableScopes),
    { namespaceResolver: resolver(attributes.namespaces) },
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
      attributes.namespaces,
    );
  }
}

export function callTemplate(
  context: ProcessingContext,
  attributes: {
    name: string;
    params: VariableLike[];
    namespaces: object;
  },
) {
  for (let template of context.templates) {
    if (template.name !== undefined && attributes.name === template.name) {
      return evaluateTemplate(template, context, attributes.params);
    }
  }
  throw new Error(`Cannot find a template named ${attributes.name}`);
}

export function copy(
  context: ProcessingContext,
  attributes: {},
  func: SequenceConstructor,
) {
  if (context.currentNode.nodeType === slimdom.Node.ELEMENT_NODE) {
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
  } else if (context.currentNode.nodeType === slimdom.Node.DOCUMENT_NODE) {
    context.outputNode.appendChild(
      context.outputDocument.importNode(context.currentNode.documentElement),
    );
  } else {
    context.outputNode.appendChild(
      context.outputDocument.importNode(context.currentNode),
    );
  }
}

export function copyOf(
  context: ProcessingContext,
  attributes: { select: string; namespaces: object },
  func: SequenceConstructor,
) {
  let things = evaluateXPath(
    attributes.select,
    context.currentNode,
    undefined,
    mergeVariableScopes(context.variableScopes),
    evaluateXPath.ALL_RESULTS_TYPE,
    { namespaceResolver: resolver(attributes.namespaces) },
  );
  for (let thing of things) {
    appendToTree(thing, context);
  }
}

export function valueOf(
  context: ProcessingContext,
  attributes: {
    select: string;
    separator?: string;
    disableOutputEscaping?: boolean;
    namespaces: object;
  },
) {
  let separator = attributes.separator;
  if (!separator) {
    if (attributes.select) {
      separator = " ";
    } else {
      separator = "";
    }
  }
  let strs = evaluateXPath(
    attributes.select,
    context.currentNode,
    undefined,
    mergeVariableScopes(context.variableScopes),
    evaluateXPath.STRINGS_TYPE,
    { namespaceResolver: resolver(attributes.namespaces) },
  );
  const str = strs.join(evaluateAttributeValueTemplate(context, separator));
  appendToTree(str, context);
}

export function text(
  context: ProcessingContext,
  attributes: {
    disableOutputEscaping: boolean;
    namespaces: object;
  },
  func: SequenceConstructor,
) {
  const out = evaluateSequenceConstructorInTemporaryTree(context, func);
  const newNode = context.outputDocument.createTextNode(extractText(out));
  context.outputNode.appendChild(newNode);
}

export function variable(context: ProcessingContext, variable: VariableLike) {
  setVariable(
    context.variableScopes,
    variable.name,
    evaluateVariableLike(context, variable),
  );
}

export function param(context: ProcessingContext, variable: VariableLike) {
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

const wrapNumericSequence = createTypedValueFactory("xs:numeric*");
const wrapStringSequence = createTypedValueFactory("xs:string*");

function wrapValue(thing: any) {
  /* wraps a value for fontoxpath */
  if (Array.isArray(thing)) {
    if (typeof thing[0] === "string") {
      return wrapStringSequence(thing, null);
    } else if (typeof thing[0] === "number") {
      return wrapNumericSequence(thing, null);
    }
  }
  return thing;
}

export function setVariable(
  variableScopes: Array<VariableScope>,
  name: string,
  value: any,
) {
  variableScopes[variableScopes.length - 1].set(name, wrapValue(value));
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

export function literalText(context: ProcessingContext, text: string) {
  context.outputNode.appendChild(context.outputDocument.createTextNode(text));
}

/* Return true if we output a string. */
function appendToTree(thing: any, context: ProcessingContext) {
  if (thing instanceof slimdom.Node) {
    if (thing.nodeType == slimdom.Node.DOCUMENT_NODE) {
      thing = (thing as slimdom.Document).documentElement;
      if (thing.localName === "xsl:document") {
        thing = thing.firstChild;
      }
    }
    let newNode = context.outputDocument.importNode(thing, true);
    context.outputNode.appendChild(newNode);
  } else {
    let str = thing.toString();
    if (str !== "") {
      context.outputNode.appendChild(
        context.outputDocument.createTextNode(str),
      );
      return true;
    }
  }
  return false;
}

function appendToTreeArray(things: any[], context: ProcessingContext) {
  let lastWasString = false;
  for (let thing of things) {
    if (lastWasString) {
      context.outputNode.appendChild(
        context.outputDocument.createTextNode(" "),
      );
    }
    lastWasString = appendToTree(thing, context);
  }
}

export function sequence(
  context: ProcessingContext,
  attributes: { select: string; namespaces: object },
) {
  const things = evaluateXPath(
    attributes.select,
    context.currentNode,
    undefined,
    mergeVariableScopes(context.variableScopes),
    evaluateXPath.ALL_RESULTS_TYPE,
    { namespaceResolver: resolver(attributes.namespaces) },
  );
  appendToTreeArray(things, context);
}

export function literalElement(
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

export function attribute(
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

export function element(
  context: ProcessingContext,
  node: { name: string; namespace?: string },
  func: SequenceConstructor,
) {
  let newNode: any;
  const name = evaluateAttributeValueTemplate(context, node.name);
  if (node.namespace) {
    newNode = context.outputDocument.createElementNS(node.namespace, name);
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

export function ifX(
  context: ProcessingContext,
  attributes: { test: string; namespaces: object },
  func: SequenceConstructor,
) {
  if (
    evaluateXPathToBoolean(
      attributes.test,
      context.currentNode,
      undefined,
      mergeVariableScopes(context.variableScopes),
      { namespaceResolver: resolver(attributes.namespaces) },
    )
  ) {
    func(context);
  }
}

export function choose(
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
        //        {"namespaceResolver": resolver(attributes.namespaces)}
      )
    ) {
      return alternative.apply(context);
    }
  }
}

export function forEach(
  context: ProcessingContext,
  attributes: { select: string; namespaces: object },
  func: SequenceConstructor,
) {
  const nodeList = evaluateXPath(
    attributes.select,
    context.currentNode,
    undefined,
    mergeVariableScopes(context.variableScopes),
    evaluateXPath.ALL_RESULTS_TYPE,
    { namespaceResolver: resolver(attributes.namespaces) },
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
    if (node.nodeType === slimdom.Node.TEXT_NODE) {
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
      evaluateXPath.ANY_TYPE,
      { namespaceResolver: resolver(variable.namespaces) },
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
  doc.appendChild(doc.createElement("xsl:document"));
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
    if (node.nodeType == slimdom.Node.TEXT_NODE) {
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
