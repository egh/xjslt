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

import { mkMember, mkNew, toEstree } from "./estree-util";

import { Feature } from "./definitions";
import { parseScript, evaluateXPath, NamespaceResolver } from "fontoxpath";
import * as slimdom from "slimdom";

const XQX_NS = "http://www.w3.org/2005/XQueryX";

type NodeExtractor = (node: slimdom.Node) => slimdom.Node | undefined;

export function selfNode(node: slimdom.Node): slimdom.Node {
  return node;
}

abstract class NodeFeature<T> extends Feature<slimdom.Node, T> {
  nodeExtractor: NodeExtractor;
  constructor(nodeExtractor: NodeExtractor, value: T) {
    super(value);
    this.nodeExtractor = nodeExtractor;
  }
  serialize() {
    return mkNew(mkMember("xjslt", this.constructor.name), [
      toEstree(this.nodeExtractor),
      toEstree(this.value),
    ]);
  }
}

export class NodeNamespaceFeature extends NodeFeature<string | null> {
  matches(node: slimdom.Node): boolean {
    if (this.nodeExtractor(node)?.nodeType !== slimdom.Node.ELEMENT_NODE) {
      return false;
    } else {
      return (node as slimdom.Element).namespaceURI === this.value;
    }
  }
}

export class NodeTypeFeature extends NodeFeature<number | null> {
  matches(node: slimdom.Node): boolean {
    return this.nodeExtractor(node)?.nodeType === this.value;
  }
}

export class NodeNameFeature extends NodeFeature<string> {
  matches(node: slimdom.Node): boolean {
    return this.nodeExtractor(node)?.nodeName === this.value;
  }
}

export class NodeTextFeature extends NodeFeature<string | null> {
  matches(node: slimdom.Node): boolean {
    return this.nodeExtractor(node)?.textContent === this.value;
  }
}

export class NodeAttributeFeature extends NodeFeature<{
  name: string;
  value: string;
}> {
  matches(node: slimdom.Node): boolean {
    const realNode = this.nodeExtractor(node);
    if (realNode.nodeType !== slimdom.Node.ELEMENT_NODE) {
      return false;
    } else {
      return (
        (realNode as slimdom.Element).getAttribute(this.value.name) ===
        this.value.value
      );
    }
  }
}

export type XMLFeature =
  | NodeAttributeFeature
  | NodeNameFeature
  | NodeNamespaceFeature
  | NodeTextFeature
  | NodeTypeFeature;

/**
 * Parse an XPath 3 expression string with fontoxpath's parseScript and extract
 * Feature objects that characterise what nodes it matches.
 *
 * Returns `undefined` if the XPath contains constraints that cannot
 * current be fully represented as features
 *
 * Supported patterns:
 *  - `elem`                 → NodeNameFeature
 *  - `ns:elem`              → NodeNameFeature + NamespaceFeature
 *  - `Q{uri}elem`           → NodeNameFeature + NamespaceFeature
 *  - `ns:*`                 → NamespaceFeature (wildcard local name)
 *  - `*`                    → [] (matches any element)
 *  - `//elem` / `//ns:elem` → same as above (leading `//` is ignored)
 *  - `[@attr='value']`      → AttributeFeature (one per predicate)
 *
 * @param xpath      XPath 3 pattern string (e.g. `ns:div[@class='foo']`)
 * @param namespaceResolver namespace resolver
 */
export function xpathToFeatures(
  xpath: string,
  nsResolver?: NamespaceResolver,
): XMLFeature[] | undefined {
  if (!xpath) {
    return undefined;
  }
  const ast = parseScript(
    xpath,
    { language: evaluateXPath.XPATH_3_1_LANGUAGE },
    new slimdom.Document(),
  );
  return extractFeaturesFromAst(ast, nsResolver);
}

function isElement(node: slimdom.Node): node is slimdom.Element {
  return node.nodeType === 1;
}

function isXqxElement(node: slimdom.Node): node is slimdom.Element {
  return isElement(node) && node.namespaceURI === XQX_NS;
}

function isNamedXqxElement(
  node: slimdom.Node,
  name: string,
): node is slimdom.Element {
  return isXqxElement(node) && node.localName === name;
}

/** Returns all direct XQX element children with the given local name. */
function xqxChildren(
  el: slimdom.Element,
  localName: string,
): slimdom.Element[] {
  return el.childNodes.filter((child) => isNamedXqxElement(child, localName));
}

/** Returns the first direct XQX element child with the given local name. */
function firstXqxChild(
  el: slimdom.Element,
  localName: string,
): slimdom.Element | undefined {
  for (const child of el.childNodes) {
    if (isNamedXqxElement(child, localName)) {
      return child;
    }
  }
  return undefined;
}

/** Returns the first XQX descendant with the given local name, optionally filtered. */
function findXqxDescendant(
  el: slimdom.Element,
  localName: string,
  predicate?: (el: slimdom.Element) => boolean,
): slimdom.Element | undefined {
  for (const child of el.childNodes) {
    if (!isXqxElement(child)) continue;
    if (
      isNamedXqxElement(child, localName) &&
      (!predicate || predicate(child))
    ) {
      return child;
    }
    const found = findXqxDescendant(child, localName, predicate);
    if (found) return found;
  }
  return undefined;
}

/** True if `step` is the descendant-or-self::node() step produced by `//`. */
function isDescendantOrSelfStep(step: slimdom.Element): boolean {
  return (
    firstXqxChild(step, "xpathAxis")?.textContent === "descendant-or-self" &&
    !!firstXqxChild(step, "anyKindTest")
  );
}

class ExtractFeatureError extends Error {}

function extractFeaturesFromAst(
  ast: any,
  nsResolver: NamespaceResolver,
): XMLFeature[] | undefined {
  const features: XMLFeature[] = [];
  try {
    visitXqx(ast, features, nsResolver, { level: 0 });
    // Only works for elements right now
    return [
      new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
      ...features,
    ];
  } catch (err: any) {
    return undefined;
  }
}

interface ExtractContext {
  currentAxis?: "node" | "attribute" | "child";
  level: number;
}

/**
 * Recursively walk an XQueryX AST node, accumulating Feature objects.
 * throws ExtractFeatureError if unsupported xpath is found.
 */
function visitXqx(
  node: slimdom.Node,
  features: XMLFeature[],
  nsResolver: NamespaceResolver,
  context: ExtractContext,
): void {
  if (!isXqxElement(node)) return;
  const name = node.localName;
  if (
    name === "module" ||
    name === "mainModule" ||
    name === "predicates" ||
    name === "queryBody" ||
    name === "andOp" ||
    name === "firstOperand" ||
    name === "secondOperand"
  ) {
    // Transparent structural nodes — recurse into all children
    for (const child of node.childNodes) {
      visitXqx(child, features, nsResolver, context);
    }
  } else if (name === "pathExpr") {
    const steps = xqxChildren(node, "stepExpr");
    if (steps.length === 0) throw new ExtractFeatureError();
    // Leading steps must each be the `//` abbreviation (descendant-or-self::node())
    for (const step of steps.slice(0, -1)) {
      if (!isDescendantOrSelfStep(step)) throw new ExtractFeatureError();
    }
    visitXqx(steps[steps.length - 1], features, nsResolver, context);
  } else if (name === "stepExpr") {
    const axis = firstXqxChild(node, "xpathAxis")?.textContent;
    if (axis !== "child")
      throw new ExtractFeatureError(`unsupported axis: ${axis}`);
    if (context.level > 0) {
      throw new ExtractFeatureError(`Too many child axes.`);
    }
    for (const child of node.childNodes.slice(1)) {
      visitXqx(child, features, nsResolver, {
        ...context,
        level: context.level + 1,
      });
    }
  } else if (name === "nameTest") {
    const localName = node.textContent;
    if (localName) features.push(new NodeNameFeature(selfNode, localName));
    const prefix = node.getAttributeNS(XQX_NS, "prefix");
    if (prefix) {
      const ns = nsResolver?.(prefix);
      if (!ns) throw new ExtractFeatureError(`unresolved ns prefix: ${ns}`);
      features.push(new NodeNamespaceFeature(selfNode, ns));
    }
    const uri = node.getAttributeNS(XQX_NS, "URI");
    if (uri) features.push(new NodeNamespaceFeature(selfNode, uri));
  } else if (name === "Wildcard") {
    const ncName = firstXqxChild(node, "NCName");
    if (ncName) {
      const ns = nsResolver?.(ncName.textContent ?? "");
      if (!ns) throw new ExtractFeatureError(`unresolved ns prefix: ${ns}`);
      features.push(new NodeNamespaceFeature(selfNode, ns));
    }
    // Basic wildcard, matches all elements
  } else if (name === "equalOp") {
    const firstOp = firstXqxChild(node, "firstOperand");
    const secondOp = firstXqxChild(node, "secondOperand");
    if (!firstOp || !secondOp) throw new ExtractFeatureError();
    const feature =
      extractEqualsOpPredicate(firstOp, secondOp) ||
      extractEqualsOpPredicate(secondOp, firstOp);
    if (!feature) throw new ExtractFeatureError();
    features.push(feature);
  } else {
    throw new ExtractFeatureError(); // unsupported XQX construct
  }
}

function extractEqualsOpPredicate(
  firstOp: slimdom.Element,
  secondOp: slimdom.Element,
): XMLFeature | undefined {
  // One operand must be a string literal — assume it's the second.
  const valueNode = findXqxDescendant(secondOp, "value");
  if (!valueNode) return undefined;
  const value = valueNode.textContent ?? "";

  // Case 1: @attrName = 'value'
  const attrStep = findXqxDescendant(
    firstOp,
    "stepExpr",
    (el) => firstXqxChild(el, "xpathAxis")?.textContent === "attribute",
  );
  if (attrStep) {
    const attrName = firstXqxChild(attrStep, "nameTest")?.textContent;
    if (!attrName) return undefined;
    return new NodeAttributeFeature(selfNode, { name: attrName, value });
  }

  // Case 2: . = 'value'  (context item expression)
  if (firstXqxChild(firstOp, "contextItemExpr")) {
    return new NodeTextFeature(selfNode, value);
  }

  // Case 3: text() = 'value'  (child text node)
  if (findXqxDescendant(firstOp, "textTest")) {
    return new NodeTextFeature(selfNode, value);
  }

  return undefined;
}
