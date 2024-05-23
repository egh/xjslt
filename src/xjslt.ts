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
import { compileStylesheetNode } from "./compile";

export const XSLT1_NSURI = "http://www.w3.org/1999/XSL/Transform";
export const XMLNS_NSURI = "http://www.w3.org/2000/xmlns/";

export type SequenceConstructor = (context: DynamicContext) => void;

export type VariableScope = Map<string, any>;

export type NamespaceResolver = (prefix: string) => string;

interface AttributeOutputData {
  name: string;
  value: string;
  namespace?: string;
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
  importPrecedence: number;
}

interface DynamicContext {
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

function mkResolver(namespaces: object) {
  return (prefix: string): string | null => {
    return namespaces[prefix];
  };
}

/* Implementation of https://www.w3.org/TR/xslt11/#patterns */
function nameTest(
  name: string,
  node: any,
  variableScopes: Array<VariableScope>,
  nsResolver: NamespaceResolver,
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
function getTemplates(
  node: any,
  templates: Array<CompiledTemplate>,
  variableScopes: Array<VariableScope>,
  mode: string,
  namespaces: object,
): Array<CompiledTemplate> {
  return templates.filter((template) => {
    if (template.modes.includes(mode) || template.modes[0] === "#all") {
      if (template.match) {
        /* some templates have no match */
        // console.log(`checking for ${mode} on ${node.localName} in ${template.match} with modes ${template.modes.join(',')}...`);
        if (
          nameTest(template.match, node, variableScopes, mkResolver(namespaces))
        ) {
          // console.log("matched");
          return true;
        }
      }
    }
    return false;
  });
}

function mkBuiltInTemplates(namespaces: object): Array<CompiledTemplate> {
  return [
    {
      match: "*|/",
      apply: (context: DynamicContext) => {
        applyTemplates(context, {
          select: "child::node()",
          params: [],
          mode: "#current",
          namespaces: namespaces,
        });
      },
      allowedParams: [],
      modes: ["#all"],
      importPrecedence: -Number.MAX_VALUE,
    },
    {
      match: "text()|@*",
      apply: (context: DynamicContext) => {
        valueOf(context, { select: ".", namespaces: namespaces });
      },
      allowedParams: [],
      modes: ["#all"],
      importPrecedence: -Number.MAX_VALUE,
    },
    {
      match: "processing-instruction()|comment()",
      apply: (_context: DynamicContext) => {},
      allowedParams: [],
      modes: ["#all"],
      importPrecedence: -Number.MAX_VALUE,
    },
  ];
}

const NC = String.raw`[^,:\(\)\*\[\]/]`; // Pretty much anything is a NCName
const PATTERN_AXIS = String.raw`(child::|attribute::|@)?`;
const DOC_NODE_OPT = String.raw`(document-node\()?`;

const DEFAULT_PRIORITIES = new Map<RegExp, number>([
  [new RegExp(String.raw`^\s*/\s*$`), -0.5],
  [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}processing-instruction`,
    ),
    0,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}element\(\*?\)\)?\s*$`,
    ),
    -0.5,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}attribute\(\*?\)\)?\s*$`,
    ),
    -0.5,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}element\(${NC}+\)\)?\s*$`,
    ),
    0,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}element\(\*,\s*${NC}+\)\)?\s*$`,
    ),
    0,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}attribute\(${NC}+\)\)?\s*$`,
    ),
    0,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}attribute\(\*,\s*${NC}+\)\)?\s*$`,
    ),
    0,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}element\(${NC}+,\s*${NC}+\)\)?\s*$`,
    ),
    0.25,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}attribute\(${NC}+,\s*${NC}+\)\)?\s*$`,
    ),
    0.25,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}schema-element\(${NC}+\)\)?\s*$`,
    ),
    0.25,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}schema-attribute\(${NC}+\)\)?\s*$`,
    ),
    0.25,
  ],
  [new RegExp(String.raw`^\s*document-node\(\)\s*$`), -0.5],
  [
    new RegExp(
      String.raw`^\s*${PATTERN_AXIS}(node\(\)|text\(\)|comment\(\))\s*$`,
    ),
    -0.5,
  ],
  [new RegExp(String.raw`^\s*${PATTERN_AXIS}(${NC}:)?\*\s*$`), -0.25],
  [new RegExp(String.raw`^\s*${PATTERN_AXIS}\*:${NC}+\s*$`), -0.25],
  [new RegExp(String.raw`^\s*${PATTERN_AXIS}${NC}+\s*$`), 0],
]);

export function computeDefaultPriority(match: string): number {
  /* https://www.w3.org/TR/xslt20/#conflict */
  if (match && match.includes("|")) {
    return Math.max(
      ...match
        .split("|")
        .filter((s) => s !== "")
        .map((s) => computeDefaultPriority(s)),
    );
  }
  for (let [regexp, priority] of DEFAULT_PRIORITIES) {
    if (regexp.test(match)) {
      return priority;
    }
  }
  return 0.5;
}

export function sortTemplates(templates: Array<CompiledTemplate>) {
  /* https://www.w3.org/TR/xslt20/#conflict */
  // Last declared is first priority.
  templates.reverse();
  // Higher priority comes first
  templates.sort(
    (a, b) =>
      (b.priority || computeDefaultPriority(b.match)) -
      (a.priority || computeDefaultPriority(a.match)),
  );
  // Higher import precedence comes first
  templates.sort((a, b) => b.importPrecedence - a.importPrecedence);
}

export function processNode(
  context: DynamicContext,
  params: VariableLike[],
  namespaces: object,
) {
  let allTemplates = [...context.templates, ...mkBuiltInTemplates(namespaces)];

  let templates = getTemplates(
    context.currentNode,
    allTemplates,
    context.variableScopes,
    context.mode,
    namespaces,
  );
  sortTemplates(templates);
  if (templates.length > 0) {
    evaluateTemplate(templates[0], context, params);
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
  context: DynamicContext,
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
  context: DynamicContext,
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
    { namespaceResolver: mkResolver(attributes.namespaces) },
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
  context: DynamicContext,
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
  context: DynamicContext,
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
  context: DynamicContext,
  attributes: { select: string; namespaces: object },
  func: SequenceConstructor,
) {
  let things = evaluateXPath(
    attributes.select,
    context.currentNode,
    undefined,
    mergeVariableScopes(context.variableScopes),
    evaluateXPath.ALL_RESULTS_TYPE,
    { namespaceResolver: mkResolver(attributes.namespaces) },
  );
  for (let thing of things) {
    appendToTree(thing, context);
  }
}

export function valueOf(
  context: DynamicContext,
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
    { namespaceResolver: mkResolver(attributes.namespaces) },
  );
  const str = strs.join(evaluateAttributeValueTemplate(context, separator));
  appendToTree(str, context);
}

export function text(
  context: DynamicContext,
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

export function variable(context: DynamicContext, variable: VariableLike) {
  setVariable(
    context.variableScopes,
    variable.name,
    evaluateVariableLike(context, variable),
  );
}

export function param(context: DynamicContext, variable: VariableLike) {
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

export function literalText(context: DynamicContext, text: string) {
  context.outputNode.appendChild(context.outputDocument.createTextNode(text));
}

/* Return true if we output a string. */
function appendToTree(thing: any, context: DynamicContext) {
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

function appendToTreeArray(things: any[], context: DynamicContext) {
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
  context: DynamicContext,
  attributes: { select: string; namespaces: object },
) {
  const things = evaluateXPath(
    attributes.select,
    context.currentNode,
    undefined,
    mergeVariableScopes(context.variableScopes),
    evaluateXPath.ALL_RESULTS_TYPE,
    { namespaceResolver: mkResolver(attributes.namespaces) },
  );
  appendToTreeArray(things, context);
}

export function buildNode(
  context: DynamicContext,
  data: { name: string; namespace?: string },
): any {
  let newNode: any;
  if (data.namespace !== undefined && data.namespace !== null) {
    newNode = context.outputDocument.createElementNS(data.namespace, data.name);
  } else {
    newNode = context.outputDocument.createElement(data.name);
  }
  return newNode;
}

export function buildAttributeNode(
  context: DynamicContext,
  data: { name: string; value: string; namespace?: string },
): any {
  let newNode: any;
  if (data.namespace) {
    newNode = context.outputDocument.createAttributeNS(
      data.namespace,
      data.name,
    );
  } else {
    newNode = context.outputDocument.createAttribute(data.name);
  }
  newNode.value = data.value;
  return newNode;
}

export function literalElement(
  context: DynamicContext,
  data: {
    name: string;
    namespace?: string;
    attributes: AttributeOutputData[];
  },
  func: SequenceConstructor,
) {
  let newNode = buildNode(context, {
    name: data.name,
    namespace: data.namespace,
  });
  for (let attr of data.attributes) {
    const value = evaluateAttributeValueTemplate(context, attr.value);
    const attrNode = buildAttributeNode(context, {
      name: attr.name,
      namespace: attr.namespace,
      value: value,
    });
    newNode.setAttributeNode(attrNode);
  }
  context.outputNode.appendChild(newNode);
  func({
    ...context,
    outputNode: newNode,
    variableScopes: extendScope(context.variableScopes),
  });
}

export function attribute(
  context: DynamicContext,
  data: { name: string; namespace?: string; namespaces: object },
  func: SequenceConstructor,
) {
  const name = evaluateAttributeValueTemplate(context, data.name);
  const ns = determineNamespace(
    name,
    mkResolver(data.namespaces),
    data.namespace,
  );
  const value = extractText(
    evaluateSequenceConstructorInTemporaryTree(context, func),
  );
  const attrNode = buildAttributeNode(context, {
    name: name,
    namespace: ns,
    value: value,
  });
  context.outputNode.setAttributeNode(attrNode);
}

export function processingInstruction(
  context: DynamicContext,
  data: { name: string; select?: string },
  func: SequenceConstructor,
) {
  const name = evaluateAttributeValueTemplate(context, data.name);
  const value = extractText(
    evaluateSequenceConstructorInTemporaryTree(context, func),
  );
  context.outputNode.appendChild(
    context.outputDocument.createProcessingInstruction(name, value),
  );
}

export function element(
  context: DynamicContext,
  data: { name: string; namespace?: string; namespaces: object },
  func: SequenceConstructor,
) {
  const name = evaluateAttributeValueTemplate(context, data.name);
  const namespace = evaluateAttributeValueTemplate(context, data.namespace);
  let newNode = buildNode(context, {
    name: name,
    namespace: determineNamespace(name, mkResolver(data.namespaces), namespace),
  });
  context.outputNode.appendChild(newNode);
  func({
    ...context,
    outputNode: newNode,
    variableScopes: extendScope(context.variableScopes),
  });
}

export function ifX(
  context: DynamicContext,
  attributes: { test: string; namespaces: object },
  func: SequenceConstructor,
) {
  if (
    evaluateXPathToBoolean(
      attributes.test,
      context.currentNode,
      undefined,
      mergeVariableScopes(context.variableScopes),
      { namespaceResolver: mkResolver(attributes.namespaces) },
    )
  ) {
    func(context);
  }
}

export function choose(
  context: DynamicContext,
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
        // {"namespaceResolver": mkResolver(attributes.namespaces)}
      )
    ) {
      return alternative.apply(context);
    }
  }
}

export function document(
  context: DynamicContext,
  attributes: { namespaces: object },
  func: SequenceConstructor,
) {
  const doc = new slimdom.Document();
  func({
    ...context,
    outputDocument: doc,
    outputNode: doc,
    currentNodeList: [],
    mode: "#default",
    variableScopes: extendScope(context.variableScopes),
  });
}

export function forEach(
  context: DynamicContext,
  attributes: { select: string; namespaces: object },
  func: SequenceConstructor,
) {
  const nodeList = evaluateXPath(
    attributes.select,
    context.currentNode,
    undefined,
    mergeVariableScopes(context.variableScopes),
    evaluateXPath.ALL_RESULTS_TYPE,
    { namespaceResolver: mkResolver(attributes.namespaces) },
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
  context: DynamicContext,
  avt: string,
): string | undefined {
  if (!avt) {
    return undefined;
  }
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
  context: DynamicContext,
  variable: VariableLike,
): string | EvaluateXPath | slimdom.Document {
  if (typeof variable.content === "string") {
    return evaluateXPath(
      variable.content,
      context.currentNode,
      undefined,
      mergeVariableScopes(context.variableScopes),
      evaluateXPath.ANY_TYPE,
      { namespaceResolver: mkResolver(variable.namespaces) },
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
  context: DynamicContext,
  func: SequenceConstructor,
) {
  const doc = new slimdom.Document();
  doc.appendChild(doc.createElement("xsl:document"));
  func({
    ...context,
    outputDocument: doc,
    outputNode: doc.documentElement,
    currentNodeList: [],
    mode: "#default",
    variableScopes: extendScope(context.variableScopes),
  });
  return doc;
}

/**
 * Extract text content of a document.
 */
function extractText(document: any) {
  let str = "";
  /* https://www.w3.org/TR/xslt20/#creating-text-nodes */
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

/* Implement algorithm to determine a namespace for a name. Takes a
   qname and resolver and an optional namespace and returns a
   namespace, or undefined if it's unqualified. */
export function determineNamespace(
  name: string,
  nsResolver: NamespaceResolver,
  passedNamespace?: string,
): string | undefined {
  let namespace: string | undefined = passedNamespace;
  if (namespace !== undefined) {
    return namespace;
  }
  let prefix: string = "";
  if (name.includes(":")) {
    prefix = name.split(":")[0];
  }
  namespace = nsResolver(prefix);
  return namespace;
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
  writeFileSync(
    tempfile,
    generate(compileStylesheetNode(xsltDoc.documentElement)),
  );
  let transform = await import(tempfile);
  // console.log(readFileSync(tempfile).toString());
  rmSync(tempdir, { recursive: true });
  return transform.transform;
}
