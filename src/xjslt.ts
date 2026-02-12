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
  NamespaceResolver,
  registerCustomXPathFunction,
} from "fontoxpath";
import * as slimdom from "slimdom";
import { functionNameResolver, registerFunctions } from "./functions";
import {
  XMLNS_NSURI,
  Appender,
  AttributeOutputData,
  AttributeValueTemplate,
  ChooseAlternative,
  Template,
  Constructor,
  DynamicContext,
  Key,
  NodeGroup,
  NodeType,
  OutputDefinition,
  OutputResult,
  SequenceConstructor,
  SortKeyComponent,
  TransformParams,
  VariableLike,
  VariableScope,
  WhitespaceDeclaration,
  PatternMatchCache,
} from "./definitions";
import { determineNamespace, mkOutputDefinition, mkResolver } from "./shared";

/* Depth first node visit */
export function visitNodes(node: any, visit: (node: any) => void) {
  visit(node);
  if (node.childNodes) {
    for (let childNode of node.childNodes) {
      visitNodes(childNode, visit);
    }
  }
}

function coerceToString(value: any): string {
  if (Array.isArray(value)) {
    return value.map((s) => coerceToString(s)).join("");
  } else if (value.nodeType) {
    return value.textContent;
  } else {
    return value.toString();
  }
}

export class KeyImpl implements Key {
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
    patternMatchCache: PatternMatchCache,
    document: slimdom.Document,
    variableScopes: VariableScope[],
  ): Map<any, any> {
    let docCache = new Map();
    visitNodes(document, (node: any) => {
      if (typeof this.use === "string") {
        if (
          patternMatch(
            patternMatchCache,
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
    patternMatchCache: PatternMatchCache,
    document: slimdom.Document,
    variableScopes: VariableScope[],
    value: any,
  ) {
    if (!this.cache.has(document)) {
      this.cache.set(
        document,
        this.buildDocumentCache(patternMatchCache, document, variableScopes),
      );
    }
    return this.cache.get(document).get(coerceToString(value));
  }
}

function withCached<T>(
  cache: Map<string, Map<slimdom.Node, T>>,
  pattern: string,
  node: slimdom.Node,
  thunk: () => T,
): T {
  if (!cache.has(pattern)) {
    cache.set(pattern, new Map());
  }
  const cacheForPattern = cache.get(pattern);
  if (!cacheForPattern.has(node)) {
    cacheForPattern.set(node, thunk());
  }
  return cacheForPattern.get(node);
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
  if (node.nodeType === NodeType.ATTRIBUTE && !ATTR_PATTERN.exec(pattern)) {
    return true;
  }
  if (node.nodeType === NodeType.TEXT && !TEXT_PATTERN.exec(pattern)) {
    return true;
  }
  // if (node.nodeType === DOCUMENT_NODE && !(DOCUMENT_PATTERN.exec(pattern))) {
  //   return true;
  // }
  if (
    ELEMENT_ONLY_PATTERN.exec(pattern) &&
    !(node.nodeType === NodeType.ELEMENT)
  ) {
    return true;
  }
  if (
    ATTR_ONLY_PATTERN.exec(pattern) &&
    !(node.nodeType === NodeType.ATTRIBUTE)
  ) {
    return true;
  }
  return false;
}

/* Fast check for success */
function fastSuccess(pattern: string, node: slimdom.Node) {
  if (pattern === "text()|@*") {
    return (
      node.nodeType === NodeType.TEXT || node.nodeType === NodeType.ATTRIBUTE
    );
  } else if (pattern === "processing-instruction()|comment()") {
    return (
      node.nodeType === NodeType.PROCESSING_INSTRUCTION ||
      node.nodeType === NodeType.COMMENT
    );
  } else if (pattern === "*|/") {
    return (
      node.nodeType === NodeType.ELEMENT || node.nodeType === NodeType.DOCUMENT
    );
  } else if (pattern === "text()") {
    return node.nodeType === NodeType.TEXT;
  } else if (pattern === "/") {
    return node.nodeType === NodeType.DOCUMENT;
  }
  return false;
}

/* Implementation of https://www.w3.org/TR/xslt20/#pattern-syntax */
function patternMatch(
  patternMatchCache: PatternMatchCache | undefined,
  match: string,
  matchFunction: CompiledXPathFunction | undefined,
  node: slimdom.Node,
  variableScopes: Array<VariableScope>,
  namespaceResolver: NamespaceResolver,
): boolean {
  let checkContext = node;
  /* Using ancestors as the potential contexts */
  if (node && !failFast(match, node)) {
    if (fastSuccess(match, node)) {
      return true;
    } else {
      while (checkContext) {
        const matches = withCached(
          patternMatchCache,
          match,
          checkContext,
          () => {
            if (matchFunction) {
              return new Set(
                executeJavaScriptCompiledXPath(matchFunction, checkContext),
              );
            }
            return new Set(
              evaluateXPathToNodes(
                match,
                checkContext,
                undefined,
                /* TODO: Only top level variables are applicable here, so top
            level variables could be cached. */
                mergeVariableScopes(variableScopes),
                { namespaceResolver, functionNameResolver },
              ),
            );
          },
        );
        /* It counts as a match if the node we were testing against is in the resulting node set. */
        if (matches.has(node)) {
          return true;
        }
        /* Match not found, continue up the tree */
        checkContext =
          checkContext.parentNode ||
          (checkContext.nodeType === NodeType.ATTRIBUTE &&
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
  patternMatchCache: PatternMatchCache,
  node: any,
  templates: Array<Template>,
  variableScopes: Array<VariableScope>,
  mode: string,
  namespaces: object,
): Generator<Template> {
  for (let template of templates) {
    if (
      template.match &&
      (template.modes[0] === "#all" || template.modes.includes(mode)) &&
      patternMatch(
        patternMatchCache,
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

function mkBuiltInTemplates(namespaces: object): Array<Template> {
  /* Pre-sorted in order of default priority */
  return [
    {
      match: "processing-instruction()|comment()",
      apply: (_context: DynamicContext) => {},
      allowedParams: [],
      modes: ["#all"],
      importPrecedence: Number.MAX_VALUE,
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
      importPrecedence: Number.MAX_VALUE,
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
      importPrecedence: Number.MAX_VALUE,
    },
  ];
}

export function processNode(
  context: DynamicContext,
  params: VariableLike[],
  namespaces: object,
) {
  let templates = getTemplates(
    context.patternMatchCache,
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
  data: {
    params: VariableLike[];
    namespaces: object;
  },
) {
  const nextMatches = context.nextMatches;
  if (nextMatches) {
    const next = nextMatches.next();
    if (!next.done) {
      evaluateTemplate(
        next.value,
        { ...context, nextMatches: nextMatches },
        data.params,
      );
    }
  }
}

export function applyImports(
  context: DynamicContext,
  data: {
    params: VariableLike[];
    namespaces: object;
  },
) {
  const nextMatches = context.nextMatches;
  if (nextMatches) {
    let next = nextMatches.next();
    /* applyImports should only find imports. If importPrecedence is 1,
    this is the original stylesheet. */
    while (!next.done && next.value.importPrecedence === 1) {
      next = nextMatches.next();
    }
    if (!next.done) {
      evaluateTemplate(
        next.value,
        { ...context, nextMatches: nextMatches },
        data.params,
      );
    }
  }
}

function sortNodesHelper(
  context: DynamicContext,
  nodes: any[],
  sort: SortKeyComponent,
  namespaceResolver: NamespaceResolver,
): any[] {
  let sorted: any[];
  if (sort.dataType === "number") {
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

function iterateNodes(
  nodes: any[],
  f: (node: any, position: number, last: number) => void,
) {
  const last = nodes.length;
  let position = 0;
  for (const node of nodes) {
    position++;
    f(node, position, last);
  }
}

function sortNodesHelperNumeric(
  context: DynamicContext,
  nodes: any[],
  sort: SortKeyComponent,
  namespaceResolver: NamespaceResolver,
): any[] {
  let keyed: { key: number; item: any }[] = [];
  iterateNodes(nodes, (contextItem, position, last) => {
    let key: number;
    const text = constructSimpleContent(
      { ...context, last, contextItem, position },
      sort.sortKey,
      namespaceResolver,
    );
    key = Number(text);

    if (isNaN(key)) {
      key = Number.MIN_SAFE_INTEGER; // if we can't calculate a sort key, sort before everything
    }
    keyed.push({
      key: key,
      item: contextItem,
    });
  });
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
  template: Template,
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
  data: {
    select?: string;
    mode: string;
    params: VariableLike[];
    namespaces: object;
    sortKeyComponents: SortKeyComponent[];
  },
) {
  const namespaceResolver = mkResolver(data.namespaces);
  /* The nodes we want to apply templates on.*/
  const nodes = evaluateXPathToNodes(
    data.select,
    context.contextItem,
    undefined,
    mergeVariableScopes(context.variableScopes),
    { currentContext: context, namespaceResolver, functionNameResolver },
  );
  let mode = data.mode || "#default";
  if (mode === "#current") {
    /* keep the current mode */
    mode = context.mode;
  }
  for (let node of sortNodes(
    context,
    nodes,
    data.sortKeyComponents,
    namespaceResolver,
  )) {
    /* for each node */
    processNode(
      {
        ...context,
        mode: mode,
        contextItem: node,
        variableScopes: extendScope(context.variableScopes),
      },
      data.params,
      data.namespaces,
    );
  }
}

export function callTemplate(
  context: DynamicContext,
  data: {
    name: string;
    params: VariableLike[];
    namespaces: object;
  },
) {
  for (let template of context.templates) {
    if (template.name !== undefined && data.name === template.name) {
      return evaluateTemplate(template, context, data.params);
    }
  }
  throw new Error(`Cannot find a template named ${data.name}`);
}

export function functionX(
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
  data: { namespaces: object },
  func: SequenceConstructor,
) {
  const node = context.contextItem;
  let newNode: slimdom.Node;
  if (node.nodeType === NodeType.ELEMENT) {
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
        (newNode as slimdom.Element).setAttributeNode(
          context.outputDocument.importNode(
            node.getAttributeNodeNS(XMLNS_NSURI, name),
          ),
        );
      }
    }
  } else if (node.nodeType === NodeType.DOCUMENT) {
    newNode = undefined;
  } else {
    newNode = context.outputDocument.importNode(node);
  }
  let newAppender: Appender | undefined = undefined;
  if (!newNode) {
    // ...
  } else {
    newAppender = context.append(newNode);
  }

  if (func) {
    func({ ...context, append: newAppender || context.append });
  }
}

export function copyOf(
  context: DynamicContext,
  data: { select: string; namespaces: object },
  func: SequenceConstructor,
) {
  let things = evaluateXPath(
    data.select,
    context.contextItem,
    undefined,
    mergeVariableScopes(context.variableScopes),
    evaluateXPath.ALL_RESULTS_TYPE,
    {
      currentContext: context,
      namespaceResolver: mkResolver(data.namespaces),
      functionNameResolver,
    },
  );
  for (let thing of things) {
    context.append(thing);
  }
}

export function valueOf(
  context: DynamicContext,
  data: {
    select?: string;
    separator?: AttributeValueTemplate;
    disableOutputEscaping?: boolean;
    namespaces: object;
  },
  func: SequenceConstructor,
) {
  context.append(
    constructSimpleContent(
      context,
      data.select || func,
      mkResolver(data.namespaces),
      data.separator,
    ),
  );
}

export function message(
  context: DynamicContext,
  data: {
    select?: string;
    namespaces: object;
    terminate: string;
  },
  func: SequenceConstructor,
) {
  const msg = constructSimpleContent(
    context,
    data.select || func,
    mkResolver(data.namespaces),
  );

  if (data.terminate === "yes") {
    throw new Error(msg);
  } else {
    console.log(msg);
  }
}

export function text(
  context: DynamicContext,
  data: {
    disableOutputEscaping: boolean;
    namespaces: object;
  },
  func: SequenceConstructor,
) {
  context.append(
    constructSimpleContent(context, func, mkResolver(data.namespaces), [""]),
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
  /** todo: check allowed, required params */
  setVariable(
    context.variableScopes,
    variable.name,
    context.stylesheetParams[variable.name] ||
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
  context.append(text);
}
export function sequence(
  context: DynamicContext,
  data: { select: string; namespaces: object },
) {
  const things = evaluateXPath(
    data.select,
    context.contextItem,
    undefined,
    mergeVariableScopes(context.variableScopes),
    evaluateXPath.ALL_RESULTS_TYPE,
    {
      currentContext: context,
      namespaceResolver: mkResolver(data.namespaces),
      functionNameResolver,
    },
  );
  context.append(things);
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
  const newAppender = context.append(newNode);
  func({
    ...context,
    variableScopes: extendScope(context.variableScopes),
    append: newAppender || context.append,
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
  const [ns, _] = determineNamespace(
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
  context.append(attrNode);
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
  ).trimStart();
  context.append(
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
  context.append(context.outputDocument.createComment(value));
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
  context.append(attrNode);
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
  let name = evaluateAttributeValueTemplate(context, data.name, resolver);
  let namespace = evaluateAttributeValueTemplate(
    context,
    data.namespace,
    resolver,
  );
  let newNode = buildNode(context, {
    name: name,
    namespace: determineNamespace(
      name,
      mkResolver(data.namespaces),
      namespace,
    )[0],
  });
  const newAppender = context.append(newNode);
  func({
    ...context,
    variableScopes: extendScope(context.variableScopes),
    append: newAppender || context.append,
  });
}

export function ifX(
  context: DynamicContext,
  data: { test: string; namespaces: object },
  func: SequenceConstructor,
) {
  if (
    evaluateXPathToBoolean(
      data.test,
      context.contextItem,
      undefined,
      mergeVariableScopes(context.variableScopes),
      {
        currentContext: context,
        namespaceResolver: mkResolver(data.namespaces),
        functionNameResolver,
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
        { currentContext: context, functionNameResolver },
        // {"namespaceResolver": mkResolver(attributes.namespaces)}
      )
    ) {
      return alternative.apply(context);
    }
  }
}

export function document(
  context: DynamicContext,
  data: { namespaces: object },
  func: SequenceConstructor,
) {
  const doc = context.outputDocument.implementation.createDocument(
    null,
    null,
    null,
  );
  const newAppender = context.append(doc);
  func({
    ...context,
    outputDocument: doc,
    append: newAppender,
    mode: "#default",
    variableScopes: extendScope(context.variableScopes),
  });
}

export function performSort(
  context: DynamicContext,
  data: {
    select: string;
    namespaces: object;
    sortKeyComponents: SortKeyComponent[];
  },
) {
  const namespaceResolver = mkResolver(data.namespaces);
  const nodeList = evaluateXPath(
    data.select,
    context.contextItem,
    undefined,
    mergeVariableScopes(context.variableScopes),
    evaluateXPath.ALL_RESULTS_TYPE,
    { currentContext: context, namespaceResolver, functionNameResolver },
  );
  if (nodeList && Symbol.iterator in Object(nodeList)) {
    const sorted = sortNodes(
      context,
      nodeList,
      data.sortKeyComponents,
      namespaceResolver,
    );
    for (let node of sorted) {
      context.append(node);
    }
  }
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
  const namespaceResolver = mkResolver(data.namespaces);
  const nodeList = evaluateXPath(
    data.select,
    context.contextItem,
    undefined,
    mergeVariableScopes(context.variableScopes),
    evaluateXPath.ALL_RESULTS_TYPE,
    { currentContext: context, namespaceResolver, functionNameResolver },
  );
  if (nodeList && Symbol.iterator in Object(nodeList)) {
    const nodes = sortNodes(
      context,
      nodeList,
      data.sortKeyComponents,
      namespaceResolver,
    );
    iterateNodes(nodes, (contextItem, position, last) => {
      func({
        ...context,
        last,
        position,
        contextItem,
        variableScopes: extendScope(context.variableScopes),
      });
    });
  }
}

function groupBy(
  context: DynamicContext,
  nodes: any[],
  groupBy: string,
  namespaceResolver: NamespaceResolver,
): NodeGroup[] {
  const variables = mergeVariableScopes(context.variableScopes);
  let retval: NodeGroup[] = [];
  iterateNodes(nodes, (node, position, last) => {
    const key = evaluateXPathToString(groupBy, node, undefined, variables, {
      currentContext: context,
      namespaceResolver,
      functionNameResolver,
    });
    let group = retval.find((g) => g.key === key);
    if (!group) {
      group = { key: key, nodes: [] };
      retval.push(group);
    }
    group.nodes.push(node);
  });
  return retval;
}

function finishGroup(grouped: NodeGroup[], currentGroup: any[], key?: string) {
  if (currentGroup.length > 0) {
    if (key === null) {
      const groupNo = grouped.length + 1;
      key = `group-${groupNo}`;
    }
    grouped.push({ key: key, nodes: currentGroup });
  }
}

function groupAdjacent(
  context: DynamicContext,
  nodes: any[],
  groupAdjacent: string,
  namespaceResolver: NamespaceResolver,
): NodeGroup[] {
  const variables = mergeVariableScopes(context.variableScopes);
  let retval: NodeGroup[] = [];
  let currentKey: string | null = null;
  let currentGroup: any[] = [];

  iterateNodes(nodes, (node, position, last) => {
    const key = evaluateXPathToString(
      groupAdjacent,
      node,
      undefined,
      variables,
      {
        currentContext: context,
        namespaceResolver,
        functionNameResolver,
      },
    );

    if (key !== currentKey) {
      finishGroup(retval, currentGroup, currentKey!);
      currentKey = key;
      currentGroup = [node];
    } else {
      // Add to current group
      currentGroup.push(node);
    }
  });

  // Last group
  finishGroup(retval, currentGroup, currentKey!);

  return retval;
}

function groupStartingWith(
  context: DynamicContext,
  nodes: any[],
  pattern: string,
  namespaceResolver: NamespaceResolver,
): NodeGroup[] {
  const variables = mergeVariableScopes(context.variableScopes);
  let retval: NodeGroup[] = [];
  let currentGroup: any[] = [];

  iterateNodes(nodes, (node, position, last) => {
    const matches = evaluateXPathToBoolean(
      pattern,
      node,
      undefined,
      variables,
      {
        currentContext: context,
        namespaceResolver,
        functionNameResolver,
      },
    );

    if (matches) {
      finishGroup(retval, currentGroup);
      currentGroup = [];
    }
    currentGroup.push(node);
  });

  // Last group
  finishGroup(retval, currentGroup);

  return retval;
}

function groupEndingWith(
  context: DynamicContext,
  nodes: any[],
  pattern: string,
  namespaceResolver: NamespaceResolver,
): NodeGroup[] {
  const variables = mergeVariableScopes(context.variableScopes);
  let retval: NodeGroup[] = [];
  let currentGroup: any[] = [];

  iterateNodes(nodes, (node, position, last) => {
    currentGroup.push(node);

    const matches = evaluateXPathToBoolean(
      pattern,
      node,
      undefined,
      variables,
      {
        currentContext: context,
        namespaceResolver,
        functionNameResolver,
      },
    );

    if (matches) {
      finishGroup(retval, currentGroup);
      currentGroup = [];
    }
  });

  // Last group
  finishGroup(retval, currentGroup);

  return retval;
}

export function forEachGroup(
  context: DynamicContext,
  data: {
    select: string;
    groupBy?: string;
    groupAdjacent?: string;
    groupStartingWith?: string;
    groupEndingWith?: string;
    namespaces: object;
    sortKeyComponents: SortKeyComponent[];
  },
  func: SequenceConstructor,
) {
  const namespaceResolver = mkResolver(data.namespaces);
  const variables = mergeVariableScopes(context.variableScopes);
  const nodeList = evaluateXPathToNodes(
    data.select,
    context.contextItem,
    undefined,
    variables,
    { currentContext: context, namespaceResolver, functionNameResolver },
  );
  if (nodeList && Symbol.iterator in Object(nodeList)) {
    let groupedNodes: NodeGroup[] = [];
    if (data.groupBy) {
      groupedNodes = groupBy(
        context,
        nodeList,
        data.groupBy,
        namespaceResolver,
      );
    } else if (data.groupAdjacent) {
      groupedNodes = groupAdjacent(
        context,
        nodeList,
        data.groupAdjacent,
        namespaceResolver,
      );
    } else if (data.groupEndingWith) {
      groupedNodes = groupEndingWith(
        context,
        nodeList,
        data.groupEndingWith,
        namespaceResolver,
      );
    } else if (data.groupStartingWith) {
      groupedNodes = groupStartingWith(
        context,
        nodeList,
        data.groupStartingWith,
        namespaceResolver,
      );
    }
    // TODO: sort
    const last = groupedNodes.length;
    iterateNodes(groupedNodes, ({ key, nodes }, position, last) => {
      const newContext = {
        ...context,
        contextItem: nodes[0],
        currentGroupingKey: key,
        currentGroup: nodes,
        position,
        last,
        variableScopes: extendScope(context.variableScopes),
      };
      func(newContext);
    });
  }
}

export function mkNodeAppender(
  outputNode: slimdom.Element | slimdom.Document | slimdom.DocumentFragment,
): Appender {
  /* If ownerDocument returns null, the node is a document itself. */
  const outputDocument: slimdom.Document =
    outputNode.ownerDocument || (outputNode as slimdom.Document);
  return function append(thing: any): Appender | undefined {
    if (thing.length && thing.values) {
      let first = true;
      const shouldSeparate = thing.length > 0 && !thing[0].nodeType;
      for (let piece of thing) {
        if (first) {
          first = false;
        } else {
          if (shouldSeparate) append(" ");
        }
        append(piece);
      }
    } else {
      if (typeof thing === "string") {
        if (outputNode.nodeType !== NodeType.DOCUMENT) {
          if (
            outputNode.lastChild &&
            outputNode.lastChild.nodeType === NodeType.TEXT
          ) {
            (outputNode.lastChild as slimdom.Text).appendData(thing);
          } else {
            if (thing !== "") {
              const newNode = outputDocument.createTextNode(thing);
              if (newNode) {
                outputNode.append(newNode);
              }
            }
          }
        }
      } else {
        if (thing.nodeType === NodeType.ATTRIBUTE) {
          let newNode = outputDocument.importNode(thing, true);
          (outputNode as slimdom.Element).setAttributeNode(newNode);
        } else if (thing.nodeType === NodeType.DOCUMENT) {
          const oldThing = thing;
          thing = (thing as slimdom.Document).documentElement;
          if (!thing) {
            return mkNodeAppender(oldThing);
          }
          append(thing);
          return mkNodeAppender(thing);
        } else if (thing.nodeType === NodeType.DOCUMENT_FRAGMENT) {
          append(thing.childNodes);
        } else if (thing.nodeType === NodeType.TEXT) {
          append((thing as slimdom.Text).data);
        } else if (thing.nodeType) {
          let newNode = outputDocument.importNode(thing, true);
          outputNode.append(newNode);
          return mkNodeAppender(newNode);
        } else {
          append(`${thing}`);
        }
      }
    }
    return undefined;
  };
}

export function mkArrayAppender(output: any[]): Appender {
  return function append(thing: any): Appender | undefined {
    output.push(thing);
    if (
      thing.nodeType &&
      (thing.nodeType === NodeType.DOCUMENT ||
        thing.nodeType === NodeType.ELEMENT)
    ) {
      return mkNodeAppender(thing);
    }
    return undefined;
  };
}

export function resultDocument(
  context: DynamicContext,
  data: {
    format?: AttributeValueTemplate;
    href?: AttributeValueTemplate;
    namespaces: object;
    omitXmlDeclaration?: AttributeValueTemplate;
    doctypePublic?: AttributeValueTemplate;
    doctypeSystem?: AttributeValueTemplate;
    standalone?: AttributeValueTemplate;
  },
  func: SequenceConstructor,
) {
  const resolver = mkResolver(data.namespaces);
  function evalAvt(avt: AttributeValueTemplate) {
    return evaluateAttributeValueTemplate(context, avt, resolver);
  }
  const format = evalAvt(data.format);
  let overrideDefinition = mkOutputDefinition({
    omitXmlDeclaration: evalAvt(data.omitXmlDeclaration),
    doctypePublic: evalAvt(data.doctypePublic),
    doctypeSystem: evalAvt(data.doctypeSystem),
    standalone: evalAvt(data.standalone),
  });
  Object.keys(overrideDefinition).forEach((key) => {
    if (!overrideDefinition[key]) {
      delete overrideDefinition[key];
    }
  });
  const od: OutputDefinition = {
    ...(format ? context.outputDefinitions.get(format) : {}),
    ...overrideDefinition,
  };
  const href = evalAvt(data.href);
  let doctype: slimdom.DocumentType | null = null;
  if (od.doctypePublic || od.doctypeSystem) {
    // TODO: Get a better name?
    doctype = context.outputDocument.implementation.createDocumentType(
      "out",
      od.doctypePublic || "",
      od.doctypeSystem || "",
    );
  }
  if (!href) {
    /* TODO: We probably shouldn't allow passing in an outputDocument
       and then changing it. This logic could be improved. */
    if (context.outputDocument.documentElement) {
      /* Already started writing to this, you can't write now! */
      throw new Error("XTDE1490");
    }
    let outputDocument = context.outputDocument;
    if (doctype) {
      /* Need to recreate document with doctype */
      outputDocument = context.outputDocument.implementation.createDocument(
        null,
        null,
        doctype,
      );
      context.outputDocument = outputDocument;
      context.append = mkNodeAppender(outputDocument);
    }
    context.resultDocuments.set("#default", {
      ...od,
      document: outputDocument,
    });
    func(context);
  } else {
    const resultDocument = context.outputDocument.implementation.createDocument(
      null,
      null,
      doctype,
    );
    if (context.resultDocuments.has(href)) {
      throw new Error(`XTDE1490: ${href} is a duplicate`);
    }
    context.resultDocuments.set(href, {
      ...od,
      document: resultDocument,
    });
    func({
      ...context,
      outputDocument: resultDocument,
      append: mkNodeAppender(resultDocument),
    });
  }
}

/* Check if this node should have space stripped. */
function shouldStripSpace(
  node: slimdom.Element,
  whitespaceDeclarations: WhitespaceDeclaration[],
): boolean {
  let patternMatchCache: PatternMatchCache = new Map();
  for (const decl of whitespaceDeclarations) {
    const namespaceResolver = mkResolver(decl.namespaces);
    if (
      patternMatch(
        patternMatchCache,
        decl.match,
        null,
        node,
        [],
        namespaceResolver,
      )
    ) {
      if (decl.preserve) {
        return false;
      } else {
        return true;
      }
    }
  }
  return false;
}

/* https://www.w3.org/TR/xslt20/#strip */
export function stripSpace(
  doc: any,
  whitespaceDeclarations: WhitespaceDeclaration[],
) {
  const ONLY_WHITESPACE = RegExp("^[ \n\r\t]+$");
  let toRemove = [];
  function walkTree(node: any) {
    if (node.nodeType === NodeType.TEXT) {
      if (
        ONLY_WHITESPACE.test(node.textContent) &&
        shouldStripSpace(node.parentNode, whitespaceDeclarations)
      ) {
        toRemove.push(node);
      }
    } else {
      if (node.hasChildNodes && node.hasChildNodes()) {
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
): string {
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
      {
        currentContext: context,
        namespaceResolver: namespaceResolver,
        functionNameResolver,
      },
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
): string | EvaluateXPath | slimdom.Document | slimdom.DocumentFragment {
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
  } else if (variable.as) {
    return evaluateSequenceConstructorToArray(context, variable.content);
  } else {
    return evaluateSequenceConstructorInTemporaryTree(
      context,
      variable.content,
    );
  }
}

function evaluateSequenceConstructorToArray(
  context: DynamicContext,
  func: SequenceConstructor,
) {
  let output = [];
  func({
    ...context,
    append: mkArrayAppender(output),
    mode: "#default",
    variableScopes: extendScope(context.variableScopes),
  });
  if (output.length === 1) {
    return output[0];
  }
  return output;
}

function withTemporaryTree(
  context: DynamicContext,
  f: (appender: Appender) => void,
) {
  const fragment = context.outputDocument.createDocumentFragment();
  const appender = mkNodeAppender(fragment);
  f(appender);
  /* If there is a single element child, return a document, which is more versatile. */
  if (fragment.childNodes.length === 1 && fragment.childElementCount === 1) {
    const doc = context.outputDocument.implementation.createDocument(
      null,
      null,
      null,
    );
    doc.appendChild(fragment.firstChild);
    return doc;
  }
  return fragment;
}

/**
 * Evaluate a sequence constructor in a temporary tree and return the
 * output document. Use for <xsl:attribute> and <xsl:variable>
 * https://www.w3.org/TR/xslt20/#temporary-trees
 */
function evaluateSequenceConstructorInTemporaryTree(
  context: DynamicContext,
  func: SequenceConstructor,
): any {
  return withTemporaryTree(context, (appender: Appender) => {
    func({
      ...context,
      append: appender,
      outputDocument: context.outputDocument,
      mode: "#default",
      variableScopes: extendScope(context.variableScopes),
    });
  });
}

/**
 * Extract text content of a document.
 */
function extractText(document: any): string[] {
  let strs: string[] = [];
  /* https://www.w3.org/TR/xslt20/#creating-text-nodes */
  visitNodes(document, (node) => {
    if (node.nodeType === NodeType.TEXT && node.data !== "") {
      strs = strs.concat(node.data);
    }
  });
  return strs;
}

export function serialize(result: OutputResult): string {
  const serializer = new slimdom.XMLSerializer();
  if (result.omitXmlDeclaration !== true) {
    let params: Map<string, string | undefined> = new Map([
      ["version", "1.0"],
      ["encoding", "UTF-8"],
      ["standalone", undefined],
    ]);
    if (result.standalone !== undefined) {
      params.set("standalone", result.standalone ? "yes" : "no");
    }
    const paramString = Array.from(params)
      .map(([k, v]) => {
        if (!v) {
          return "";
        } else {
          return `${k}="${v}"`;
        }
      })
      .join(" ");
    result.document.insertBefore(
      result.document.createProcessingInstruction("xml", paramString),
      result.document.firstChild,
    );
  }
  return serializer.serializeToString(result.document);
}

export function setParamDefaults(
  document: slimdom.Document,
  params: TransformParams,
) {
  if (!params) {
    params = {};
  }
  if (!params.outputDocument) {
    params.outputDocument = document.implementation.createDocument(null, null);
  }
  if (!params.outputNode) {
    params.outputNode = params.outputDocument;
  }
  if (!params.initialMode) {
    params.initialMode = "#default";
  }
  if (!params.stylesheetParams) {
    params.stylesheetParams = {};
  }
  return params;
}

export function compileMatchFunction(matchFunction: string) {
  try {
    return new Function(matchFunction);
  } catch {
    // Not allowed in some contexts, so just return undefined.
    return undefined;
  }
}

registerFunctions();
