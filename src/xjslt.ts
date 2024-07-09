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

import {
  CompiledXPathFunction,
  createTypedValueFactory,
  evaluateXPath,
  evaluateXPathToString,
  evaluateXPathToNodes,
  evaluateXPathToBoolean,
  EvaluateXPath,
  evaluateXPathToNumber,
  executeJavaScriptCompiledXPath,
  registerCustomXPathFunction,
} from "fontoxpath";
import * as slimdom from "slimdom";
import { AttributeValueTemplate } from "./compile";
import { registerFunctions } from "./functions";

export const XSLT1_NSURI = "http://www.w3.org/1999/XSL/Transform";
export const XMLNS_NSURI = "http://www.w3.org/2000/xmlns/";
export const XPATH_NSURI = "http://www.w3.org/2005/xpath-functions";

export type SequenceConstructor = (context: DynamicContext) => void;

export type VariableScope = Map<string, any>;

export type NamespaceResolver = (prefix: string) => string;

interface AttributeOutputData {
  name: string;
  value: AttributeValueTemplate;
  namespace?: string;
}

interface ChooseAlternative {
  test?: string;
  apply: SequenceConstructor;
}

interface CompiledTemplate {
  match?: string;
  matchFunction?: CompiledXPathFunction;
  name?: string;
  modes: string[];
  priority?: number;
  apply: SequenceConstructor;
  allowedParams: Array<VariableLike>;
  importPrecedence: number;
}

const ELEMENT_NODE = 1;
const ATTRIBUTE_NODE = 2;
const TEXT_NODE = 3;
const CDATA_SECTION_NODE = 4;
const ENTITY_REFERENCE_NODE = 5;
const ENTITY_NODE = 6;
const PROCESSING_INSTRUCTION_NODE = 7;
const COMMENT_NODE = 8;
const DOCUMENT_NODE = 9;
const DOCUMENT_TYPE_NODE = 10;
const DOCUMENT_FRAGMENT_NODE = 11;
const NOTATION_NODE = 12;

/* Depth first node visit */
export function visitNodes(node: any, visit: (node: any) => void) {
  for (let childNode of node.childNodes) {
    visitNodes(childNode, visit);
  }
  visit(node);
}

export class Key {
  match: string;
  use: string | SequenceConstructor;
  namespaces: object;
  cache: Map<slimdom.Document, Map<any, any>>;
  constructor(
    match: string,
    use: string | SequenceConstructor,
    namespaces: object,
  ) {
    this.match = match;
    this.use = use;
    this.namespaces = namespaces;
    this.cache = new Map();
  }
  buildDocumentCache(
    nameTestCache: Map<string, Set<slimdom.Node>>,
    document: slimdom.Document,
    variableScopes: VariableScope[],
  ): Map<any, any> {
    let docCache = new Map();
    visitNodes(document, (node: any) => {
      if (typeof this.use === "string") {
        if (
          nameTest(
            nameTestCache,
            this.match,
            undefined,
            node,
            variableScopes,
            mkResolver(this.namespaces),
          )
        ) {
          let key = evaluateXPathToString(this.use, node);
          if (!docCache.has(key)) {
            docCache.set(key, []);
          }
          docCache.set(key, docCache.get(key).concat(node));
        }
      }
    });
    return docCache;
  }
  lookup(
    nameTestCache: Map<string, Set<slimdom.Node>>,
    document: slimdom.Document,
    variableScopes: VariableScope[],
    value: string,
  ) {
    if (!this.cache.has(document)) {
      this.cache.set(
        document,
        this.buildDocumentCache(nameTestCache, document, variableScopes),
      );
    }
    return this.cache.get(document).get(value);
  }
}

export interface DynamicContext {
  outputDocument: slimdom.Document;
  outputNode: any;
  contextItem: any;
  mode: string;
  templates: Array<CompiledTemplate>;
  variableScopes: Array<VariableScope>;
  nextMatches?: Generator<CompiledTemplate>;
  inputURL: URL;
  currentGroup?: any[];
  currentGroupingKey?: string;
  keys: Map<String, Key>;
  nameTestCache: Map<string, Set<slimdom.Node>>;
}

type Constructor = string | SequenceConstructor;

interface SortKeyComponent {
  sortKey: Constructor;
  order?: AttributeValueTemplate;
  lang?: AttributeValueTemplate;
  dataType?: string;
}

interface VariableLike {
  name: string;
  content: undefined | Constructor;
  namespaces: object;
}

export function mkResolver(namespaces: object) {
  return (prefix: string): string | null => {
    return namespaces[prefix];
  };
}

function withCached<T>(cache: Map<string, T>, key: string, thunk: () => T): T {
  if (!cache.has(key)) {
    cache.set(key, thunk());
  }
  return cache.get(key);
}

const ELEMENT_ONLY_PATTERN = new RegExp(/^[a-z |-]+$/);
const ATTR_ONLY_PATTERN = new RegExp(/^@[a-z]+$/);
const TEXT_PATTERN = new RegExp(/text\(\)|node\(\)/);
const ATTR_PATTERN = new RegExp(/@|attribute|node/);
const DOCUMENT_PATTERN = new RegExp(/(^\/$|document-node\(|node\()/);

/* Fast check to see if a pattern will not match. Will return true if
   it will never match, false if it might be a match.*/
function failFast(pattern: string, node: slimdom.Node) {
  /* This should work, but doesn't */
  // let bucket = getBucketForSelector(pattern);
  // if (bucket && !getBucketsForNode(node).includes(bucket)) {
  //   return true;
  // }
  if (node.nodeType === ATTRIBUTE_NODE && !ATTR_PATTERN.exec(pattern)) {
    return true;
  }
  if (node.nodeType === TEXT_NODE && !TEXT_PATTERN.exec(pattern)) {
    return true;
  }
  // if (node.nodeType === DOCUMENT_NODE && !(DOCUMENT_PATTERN.exec(pattern))) {
  //   return true;
  // }
  if (ELEMENT_ONLY_PATTERN.exec(pattern) && !(node.nodeType === ELEMENT_NODE)) {
    return true;
  }
  if (ATTR_ONLY_PATTERN.exec(pattern) && !(node.nodeType === ATTRIBUTE_NODE)) {
    return true;
  }
  return false;
}

/* Fast check for success */
function fastSuccess(pattern: string, node: slimdom.Node) {
  if (pattern === "text()|@*") {
    return node.nodeType === TEXT_NODE || node.nodeType === ATTRIBUTE_NODE;
  } else if (pattern === "processing-instruction()|comment()") {
    return (
      node.nodeType === PROCESSING_INSTRUCTION_NODE ||
      node.nodeType === COMMENT_NODE
    );
  } else if (pattern === "*|/") {
    return node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_NODE;
  } else if (pattern === "text()") {
    return node.nodeType === TEXT_NODE;
  } else if (pattern === "/") {
    return node.nodeType === DOCUMENT_NODE;
  }
  return false;
}

/* Implementation of https://www.w3.org/TR/xslt11/#patterns */
function nameTest(
  nameTestCache: Map<string, Set<slimdom.Node>> | undefined,
  match: string,
  matchFunction: CompiledXPathFunction | undefined,
  node: slimdom.Node,
  variableScopes: Array<VariableScope>,
  nsResolver: NamespaceResolver,
): boolean {
  let checkContext = node;
  /* Using ancestors as the potential contexts */
  if (node && !failFast(match, node)) {
    if (fastSuccess(match, node)) {
      return true;
    } else {
      while (checkContext) {
        const nodeId = evaluateXPathToString("generate-id(.)", checkContext);
        const matches = withCached(nameTestCache, `${match}-${nodeId}`, () => {
          let results: slimdom.Node[];
          if (matchFunction) {
            results = executeJavaScriptCompiledXPath(
              matchFunction,
              checkContext,
            );
          } else {
            results = evaluateXPathToNodes(
              match,
              checkContext,
              undefined,
              /* TODO: Only top level variables are applicable here, so top
               level variables could be cached. */
              mergeVariableScopes(variableScopes),
              { namespaceResolver: nsResolver },
            );
          }
          return new Set(results);
        });
        /* It counts as a match if the node we were testing against is in the resulting node set. */
        if (matches.has(node)) {
          return true;
        }
        /* Match not found, continue up the tree */
        checkContext =
          checkContext.parentNode ||
          (checkContext.nodeType === ATTRIBUTE_NODE &&
            (checkContext as slimdom.Attr).ownerElement);
      }
    }
  }
  return false;
}

/**
 * Find the template that should be used to process a node.
 *
 * @returns The template, or undefined if none can be found to match this node.
 */
function* getTemplates(
  nameTestCache: Map<string, Set<slimdom.Node>>,
  node: any,
  templates: Array<CompiledTemplate>,
  variableScopes: Array<VariableScope>,
  mode: string,
  namespaces: object,
): Generator<CompiledTemplate> {
  for (let template of templates) {
    if (
      template.match &&
      (template.modes[0] === "#all" || template.modes.includes(mode)) &&
      nameTest(
        nameTestCache,
        template.match,
        template.matchFunction,
        node,
        variableScopes,
        mkResolver(namespaces),
      )
    ) {
      yield template;
    }
  }
}

function mkBuiltInTemplates(namespaces: object): Array<CompiledTemplate> {
  /* Pre-sorted in order of default priority */
  return [
    {
      match: "processing-instruction()|comment()",
      apply: (_context: DynamicContext) => {},
      allowedParams: [],
      modes: ["#all"],
      importPrecedence: -Number.MAX_VALUE,
    },
    {
      match: "text()|@*",
      apply: (context: DynamicContext) => {
        valueOf(
          context,
          { select: ".", namespaces: namespaces },
          () => undefined,
        );
      },
      allowedParams: [],
      modes: ["#all"],
      importPrecedence: -Number.MAX_VALUE,
    },
    {
      match: "*|/",
      apply: (context: DynamicContext) => {
        applyTemplates(context, {
          select: "child::node()",
          params: [],
          mode: "#current",
          namespaces: namespaces,
          sortKeyComponents: [],
        });
      },
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
  let templates = getTemplates(
    context.nameTestCache,
    context.contextItem,
    context.templates.concat(mkBuiltInTemplates(namespaces)),
    context.variableScopes,
    context.mode,
    namespaces,
  );
  const next = templates.next();
  if (!next.done) {
    evaluateTemplate(
      next.value,
      { ...context, nextMatches: templates },
      params,
    );
  }
}

export function nextMatch(
  context: DynamicContext,
  attributes: {
    params: VariableLike[];
    namespaces: object;
  },
) {
  const nextMatches = context.nextMatches;
  const next = nextMatches.next();
  if (!next.done) {
    evaluateTemplate(
      next.value,
      { ...context, nextMatches: nextMatches },
      attributes.params,
    );
  }
}

function sortNodesHelper(
  context: DynamicContext,
  nodes: any[],
  sort: SortKeyComponent,
  namespaceResolver: NamespaceResolver,
): any[] {
  let sorted: any[];
  if (sort.dataType === "number" && typeof sort.sortKey === "string") {
    sorted = sortNodesHelperNumeric(context, nodes, sort, namespaceResolver);
  } else {
    sorted = sortNodesHelperText(context, nodes, sort, namespaceResolver);
  }
  if (
    evaluateAttributeValueTemplate(context, sort.order, namespaceResolver) ===
    "descending"
  ) {
    sorted.reverse();
  }
  return sorted;
}

function sortNodesHelperNumeric(
  context: DynamicContext,
  nodes: any[],
  sort: SortKeyComponent,
  namespaceResolver: NamespaceResolver,
): any[] {
  let keyed: { key: number; item: any }[] = [];
  for (let node of nodes) {
    let key = evaluateXPathToNumber(
      `number(${sort.sortKey as string})`,
      node,
      undefined,
      mergeVariableScopes(context.variableScopes),
      { currentContext: context, namespaceResolver: namespaceResolver },
    );
    if (isNaN(key)) {
      key = Number.MIN_SAFE_INTEGER; // if we can't calculate a sort key, sort before everything
    }
    keyed.push({
      key: key,
      item: node,
    });
  }
  keyed.sort((a, b) => a.key - b.key);
  return keyed.sort((a, b) => a.key - b.key).map((obj) => obj.item);
}

function sortNodesHelperText(
  context: DynamicContext,
  nodes: any[],
  sort: SortKeyComponent,
  namespaceResolver: NamespaceResolver,
): any[] {
  let keyed: { key: string; item: any }[] = [];
  for (let node of nodes) {
    const newContext = { ...context, contextItem: node };
    keyed.push({
      key: constructSimpleContent(newContext, sort.sortKey, namespaceResolver),
      item: node,
    });
  }
  const lang =
    sort.lang &&
    evaluateAttributeValueTemplate(context, sort.lang, namespaceResolver);
  let collator = new Intl.Collator(lang).compare;
  return keyed.sort((a, b) => collator(a.key, b.key)).map((obj) => obj.item);
}

export function sortNodes(
  context: DynamicContext,
  nodes: any[],
  sorts: SortKeyComponent[],
  namespaceResolver: NamespaceResolver,
): any[] {
  if (sorts) {
    for (let sort of [...sorts].reverse()) {
      nodes = sortNodesHelper(context, nodes, sort, namespaceResolver);
    }
  }
  return nodes;
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
    sortKeyComponents: SortKeyComponent[];
  },
) {
  const nsResolver = mkResolver(attributes.namespaces);
  /* The nodes we want to apply templates on.*/
  const nodes = evaluateXPathToNodes(
    attributes.select,
    context.contextItem,
    undefined,
    mergeVariableScopes(context.variableScopes),
    { currentContext: context, namespaceResolver: nsResolver },
  );
  let mode = attributes.mode || "#default";
  if (mode === "#current") {
    /* keep the current mode */
    mode = context.mode;
  }
  for (let node of sortNodes(
    context,
    nodes,
    attributes.sortKeyComponents,
    nsResolver,
  )) {
    /* for each node */
    processNode(
      {
        ...context,
        mode: mode,
        contextItem: node,
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

export function functionX(
  context: DynamicContext,
  data: {
    name: string;
    as?: string;
    namespace: string;
    params: VariableLike[];
    namespaces: object;
  },
  func: SequenceConstructor,
) {
  const signature = data.params.map((p) => "item()");
  const variableNames = data.params.map((p) => p.name);
  registerCustomXPathFunction(
    { namespaceURI: data.namespace, localName: data.name },
    signature,
    data.as || "item()",
    ({ currentContext }, ...args: any[]) => {
      let vars = new Map<string, any>();
      variableNames.forEach((name, i) => vars.set(name, args[i]));
      return evaluateSequenceConstructorInTemporaryTree(
        {
          ...currentContext,
          variableScopes: [vars].concat(currentContext.variableScopes),
        },
        func,
      );
    },
  );
}

export function copy(
  context: DynamicContext,
  attributes: { namespaces: object },
  func: SequenceConstructor,
) {
  const node = context.contextItem;
  let newNode;
  if (node.nodeType === ELEMENT_NODE) {
    newNode = context.outputDocument.createElementNS(
      node.namespaceURI,
      node.prefix ? `${node.prefix}:${node.localName}` : node.localName,
    );
    // We maybe shouldn't do this, but in some cases we need to copy
    // nodes & their namespaces & retain the namespaces even if not a
    // single node beneath it uses the namespace. e.g.
    // <xsl:template match="foo:bar" xmlns:foo="...">
    //   <out/>
    // </xsl:template>
    for (let attribute of node.attributes) {
      if (attribute.namespaceURI === XMLNS_NSURI) {
        const name = attribute.localName;
        newNode.setAttributeNode(
          context.outputDocument.importNode(
            node.getAttributeNodeNS(XMLNS_NSURI, name),
          ),
        );
      }
    }
  } else if (node.nodeType === DOCUMENT_NODE) {
    newNode = undefined;
  } else {
    newNode = context.outputDocument.importNode(node);
  }
  if (!newNode) {
    // ...
  } else if (newNode.nodeType === ATTRIBUTE_NODE) {
    context.outputNode.setAttributeNode(newNode);
  } else {
    context.outputNode.appendChild(newNode);
  }
  if (func) {
    func({
      ...context,
      outputNode: newNode || context.outputNode,
    });
  }
}

export function copyOf(
  context: DynamicContext,
  attributes: { select: string; namespaces: object },
  func: SequenceConstructor,
) {
  let things = evaluateXPath(
    attributes.select,
    context.contextItem,
    undefined,
    mergeVariableScopes(context.variableScopes),
    evaluateXPath.ALL_RESULTS_TYPE,
    {
      currentContext: context,
      namespaceResolver: mkResolver(attributes.namespaces),
    },
  );
  for (let thing of things) {
    appendToTree(thing, context);
  }
}

export function valueOf(
  context: DynamicContext,
  attributes: {
    select?: string;
    separator?: AttributeValueTemplate;
    disableOutputEscaping?: boolean;
    namespaces: object;
  },
  func: SequenceConstructor,
) {
  appendToTree(
    constructSimpleContent(
      context,
      attributes.select || func,
      mkResolver(attributes.namespaces),
      attributes.separator,
    ),
    context,
  );
}

export function message(
  context: DynamicContext,
  attributes: {
    select?: string;
    namespaces: object;
    terminate: string;
  },
  func: SequenceConstructor,
) {
  console.log(
    constructSimpleContent(
      context,
      attributes.select || func,
      mkResolver(attributes.namespaces),
    ),
  );
  if (attributes.terminate === "yes") {
    process.exit();
  }
}

export function text(
  context: DynamicContext,
  attributes: {
    disableOutputEscaping: boolean;
    namespaces: object;
  },
  func: SequenceConstructor,
) {
  appendToTree(
    constructSimpleContent(context, func, mkResolver(attributes.namespaces), [
      "",
    ]),
    context,
  );
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
const wrapItemSequence = createTypedValueFactory("item()*");

function wrapValue(thing: any) {
  /* wraps a value for fontoxpath */
  if (Array.isArray(thing)) {
    if (typeof thing[0] === "string") {
      return wrapStringSequence(thing, null);
    } else if (typeof thing[0] === "number") {
      return wrapNumericSequence(thing, null);
    } else {
      return wrapItemSequence(thing, null);
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
  if (thing.nodeType === ATTRIBUTE_NODE) {
    let newNode = context.outputDocument.importNode(thing, true);
    context.outputNode.setAttributeNode(newNode);
  } else if (thing.nodeType === DOCUMENT_NODE) {
    thing = (thing as slimdom.Document).documentElement;
    if ((thing as slimdom.Element).localName === "xsl:document") {
      appendToTreeArray(thing.childNodes, context);
    } else {
      appendToTree(thing, context);
    }
  } else if (thing.nodeType) {
    let newNode = context.outputDocument.importNode(thing, true);
    context.outputNode.appendChild(newNode);
  } else {
    let str = `${thing}`;
    if (str !== "") {
      const newNode = context.outputDocument.createTextNode(str);
      if (newNode) {
        context.outputNode.appendChild(newNode);
      }
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
    context.contextItem,
    undefined,
    mergeVariableScopes(context.variableScopes),
    evaluateXPath.ALL_RESULTS_TYPE,
    {
      currentContext: context,
      namespaceResolver: mkResolver(attributes.namespaces),
    },
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
    namespaces: object;
  },
  func: SequenceConstructor,
) {
  let newNode = buildNode(context, {
    name: data.name,
    namespace: data.namespace,
  });
  const resolver = mkResolver(data.namespaces);
  for (let attr of data.attributes) {
    const value = evaluateAttributeValueTemplate(context, attr.value, resolver);
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
  data: {
    name: AttributeValueTemplate;
    namespace?: AttributeValueTemplate;
    namespaces: object;
    select?: string;
    separator?: AttributeValueTemplate;
  },
  func: SequenceConstructor,
) {
  const resolver = mkResolver(data.namespaces);
  const name = evaluateAttributeValueTemplate(context, data.name, resolver);
  const ns = determineNamespace(
    name,
    resolver,
    evaluateAttributeValueTemplate(context, data.namespace, resolver),
  );
  const value = constructSimpleContent(
    context,
    data.select || func,
    resolver,
    data.separator,
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
  data: { name: AttributeValueTemplate; select?: string; namespaces: object },
  func: SequenceConstructor,
) {
  const name = evaluateAttributeValueTemplate(
    context,
    data.name,
    mkResolver(data.namespaces),
  );
  const value = constructSimpleContent(
    context,
    data.select || func,
    mkResolver(data.namespaces),
    [""],
  );
  context.outputNode.appendChild(
    context.outputDocument.createProcessingInstruction(name, value),
  );
}

export function comment(
  context: DynamicContext,
  data: { select?: string; namespaces: object },
  func: SequenceConstructor,
) {
  const value = constructSimpleContent(
    context,
    data.select || func,
    mkResolver(data.namespaces),
    [""],
  );
  context.outputNode.appendChild(context.outputDocument.createComment(value));
}

export function namespace(
  context: DynamicContext,
  data: { name: AttributeValueTemplate; select?: string; namespaces: object },
  func: SequenceConstructor,
) {
  const resolver = mkResolver(data.namespaces);
  const name = evaluateAttributeValueTemplate(context, data.name, resolver);
  const value = constructSimpleContent(context, data.select || func, resolver, [
    "",
  ]);
  const attrNode = buildAttributeNode(context, {
    name: `xmlns:${name}`,
    namespace: XMLNS_NSURI,
    value: value,
  });
  context.outputNode.setAttributeNode(attrNode);
}

export function element(
  context: DynamicContext,
  data: {
    name: AttributeValueTemplate;
    namespace?: AttributeValueTemplate;
    namespaces: object;
  },
  func: SequenceConstructor,
) {
  const resolver = mkResolver(data.namespaces);
  const name = evaluateAttributeValueTemplate(context, data.name, resolver);
  const namespace = evaluateAttributeValueTemplate(
    context,
    data.namespace,
    resolver,
  );
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
      context.contextItem,
      undefined,
      mergeVariableScopes(context.variableScopes),
      {
        currentContext: context,
        namespaceResolver: mkResolver(attributes.namespaces),
      },
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
        context.contextItem,
        undefined,
        mergeVariableScopes(context.variableScopes),
        { currentContext: context },
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
  const doc = context.outputDocument.implementation.createDocument(
    null,
    null,
    null,
  );
  func({
    ...context,
    outputDocument: doc,
    outputNode: doc,
    mode: "#default",
    variableScopes: extendScope(context.variableScopes),
  });
}

export function forEach(
  context: DynamicContext,
  data: {
    select: string;
    namespaces: object;
    sortKeyComponents: SortKeyComponent[];
  },
  func: SequenceConstructor,
) {
  const nsResolver = mkResolver(data.namespaces);
  const nodeList = evaluateXPath(
    data.select,
    context.contextItem,
    undefined,
    mergeVariableScopes(context.variableScopes),
    evaluateXPath.ALL_RESULTS_TYPE,
    { currentContext: context, namespaceResolver: nsResolver },
  );
  if (nodeList && Symbol.iterator in Object(nodeList)) {
    for (let node of sortNodes(
      context,
      nodeList,
      data.sortKeyComponents,
      nsResolver,
    )) {
      func({
        ...context,
        contextItem: node,
        variableScopes: extendScope(context.variableScopes),
      });
    }
  }
}

function groupBy(
  context: DynamicContext,
  nodes: any[],
  groupBy: string,
  nsResolver: NamespaceResolver,
): Map<string, any[]> {
  const variables = mergeVariableScopes(context.variableScopes);
  let retval = new Map<string, any[]>();
  for (let node of nodes) {
    const key = evaluateXPathToString(groupBy, node, undefined, variables, {
      currentContext: context,
      namespaceResolver: nsResolver,
    });
    if (!retval.has(key)) {
      retval.set(key, []);
    }
    retval.set(key, retval.get(key).concat(node));
  }
  return retval;
}

export function forEachGroup(
  context: DynamicContext,
  data: {
    select: string;
    groupBy?: string;
    namespaces: object;
    sortKeyComponents: SortKeyComponent[];
  },
  func: SequenceConstructor,
) {
  const nsResolver = mkResolver(data.namespaces);
  const variables = mergeVariableScopes(context.variableScopes);
  const nodeList = evaluateXPathToNodes(
    data.select,
    context.contextItem,
    undefined,
    variables,
    { currentContext: context, namespaceResolver: nsResolver },
  );
  if (nodeList && Symbol.iterator in Object(nodeList)) {
    let groupedNodes = groupBy(context, nodeList, data.groupBy, nsResolver);
    // TODO: sort
    for (let [key, nodes] of groupedNodes) {
      func({
        ...context,
        contextItem: nodes[0],
        currentGroupingKey: key,
        currentGroup: nodes,
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
    let nameTestCache: Map<string, Set<slimdom.Node>> = new Map();
    if (nameTest(nameTestCache, name, undefined, node, [], nsResolver)) {
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
    if (node.nodeType === TEXT_NODE) {
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

export function evaluateAttributeValueTemplate(
  context: DynamicContext,
  avt: AttributeValueTemplate,
  namespaceResolver: NamespaceResolver,
): string | undefined {
  if (!avt) {
    return undefined;
  }
  return avt
    .map((piece) => {
      if (typeof piece === "string") {
        return piece;
      } else {
        return evaluateXPathToString(
          piece.xpath,
          context.contextItem,
          undefined,
          mergeVariableScopes(context.variableScopes),
          { currentContext: context, namespaceResolver: namespaceResolver },
        );
      }
    })
    .join("");
}

function constructSimpleContent(
  context: DynamicContext,
  generator: Constructor,
  namespaceResolver: NamespaceResolver,
  separator?: AttributeValueTemplate,
): any {
  if (!separator) {
    if (typeof generator === "string") {
      separator = [" "];
    } else {
      separator = [];
    }
  }
  const effectiveSeparator = evaluateAttributeValueTemplate(
    context,
    separator,
    namespaceResolver,
  );
  if (typeof generator === "string") {
    return evaluateXPath(
      generator,
      context.contextItem,
      undefined,
      mergeVariableScopes(context.variableScopes),
      evaluateXPath.STRINGS_TYPE,
      { currentContext: context, namespaceResolver: namespaceResolver },
    ).join(effectiveSeparator);
  } else {
    return extractText(
      evaluateSequenceConstructorInTemporaryTree(context, generator),
    ).join(effectiveSeparator);
  }
}

function evaluateVariableLike(
  context: DynamicContext,
  variable: VariableLike,
): string | EvaluateXPath | slimdom.Document {
  if (typeof variable.content === "string") {
    return evaluateXPath(
      variable.content,
      context.contextItem,
      undefined,
      mergeVariableScopes(context.variableScopes),
      evaluateXPath.ANY_TYPE,
      {
        currentContext: context,
        namespaceResolver: mkResolver(variable.namespaces),
      },
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
  const doc = context.outputDocument.implementation.createDocument(
    null,
    null,
    null,
  );
  doc.appendChild(doc.createElement("xsl:document"));
  func({
    ...context,
    outputDocument: doc,
    outputNode: doc.documentElement,
    mode: "#default",
    variableScopes: extendScope(context.variableScopes),
  });
  return doc;
}

/**
 * Extract text content of a document.
 */
function extractText(document: any): string[] {
  let strs = [];
  /* https://www.w3.org/TR/xslt20/#creating-text-nodes */
  function walkTree(node: any): void {
    if (node.nodeType === TEXT_NODE && node.data !== "") {
      strs = strs.concat(node.data);
    }
    if (node.childNodes) {
      for (let child of node.childNodes) {
        walkTree(child);
      }
    }
  }
  walkTree(document);
  return strs;
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

registerFunctions();
