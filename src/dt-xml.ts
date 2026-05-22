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

export function parentNode(node: slimdom.Node): slimdom.Node | undefined {
  return node.parentNode || undefined;
}

export function grandParentNode(node: slimdom.Node): slimdom.Node | undefined {
  return node.parentNode?.parentNode || undefined;
}

export function greatGrandParentNode(
  node: slimdom.Node,
): slimdom.Node | undefined {
  return node.parentNode?.parentNode?.parentNode || undefined;
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
  equals(other: NodeFeature<any>): boolean {
    if (this.nodeExtractor !== other.nodeExtractor) {
      return false;
    }
    return super.equals(other);
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
    visitXqx(ast, features, nsResolver);
    return features;
  } catch (err: any) {
    return undefined;
  }
}

/**
 * Recursively walk an XQueryX AST node, accumulating Feature objects.
 * throws ExtractFeatureError if unsupported xpath is found.
 */
function visitXqx(
  node: slimdom.Node,
  features: XMLFeature[],
  nsResolver: NamespaceResolver,
): void {
  if (!isXqxElement(node)) return;
  const name = node.localName;
  if (name === "module" || name === "mainModule" || name === "queryBody") {
    // Transparent structural nodes — recurse into all children
    for (const child of node.childNodes) {
      visitXqx(child, features, nsResolver);
    }
  } else if (name === "pathExpr") {
    const steps = xqxChildren(node, "stepExpr");
    if (steps.length === 0) {
      throw new ExtractFeatureError();
    }
    if (isNamedXqxElement(node.firstChild, "rootExpr")) {
      if (isDescendantOrSelfStep(steps[0])) {
        steps.shift();
      } else {
        throw new ExtractFeatureError();
      }
    }
    // The set of potential ancestor steps, reversed so its self, parent, grandparent, ...
    const ancestorSteps = steps.reverse();
    if (ancestorSteps.length == 0 || ancestorSteps.length > 4)
      throw new ExtractFeatureError();
    processStep(selfNode, ancestorSteps[0], features, nsResolver);
    if (ancestorSteps[1]) {
      processStep(parentNode, ancestorSteps[1], features, nsResolver);
    }
    if (ancestorSteps[2]) {
      processStep(grandParentNode, ancestorSteps[2], features, nsResolver);
    }
    if (ancestorSteps[3]) {
      processStep(greatGrandParentNode, ancestorSteps[3], features, nsResolver);
    }
  } else {
    throw new ExtractFeatureError();
  }
}

function extractNamedNodeType(
  nodeExtractor: NodeExtractor,
  axis: string,
  features: XMLFeature[],
) {
  if (axis === "attribute") {
    features.push(
      new NodeTypeFeature(nodeExtractor, slimdom.Node.ATTRIBUTE_NODE),
    );
  } else {
    features.push(
      new NodeTypeFeature(nodeExtractor, slimdom.Node.ELEMENT_NODE),
    );
  }
}

function processStep(
  nodeExtractor: NodeExtractor,
  step: slimdom.Element,
  features: XMLFeature[],
  nsResolver: NamespaceResolver,
) {
  const axis = firstXqxChild(step, "xpathAxis")?.textContent;
  if (axis !== "child" && axis !== "attribute")
    throw new ExtractFeatureError(`unsupported axis: ${axis}`);
  for (const child of step.childNodes.slice(1)) {
    if (!isXqxElement(child)) continue;
    const name = child.localName;
    if (name === "nameTest") {
      extractNameFeatures(nodeExtractor, step, features, nsResolver);
      extractNamedNodeType(nodeExtractor, axis, features);
    } else if (name === "Wildcard") {
      const ncName = firstXqxChild(child, "NCName");
      if (ncName) {
        const ns = nsResolver?.(ncName.textContent ?? "");
        if (!ns) throw new ExtractFeatureError(`unresolved ns prefix: ${ns}`);
        features.push(new NodeNamespaceFeature(nodeExtractor, ns));
      }
      extractNamedNodeType(nodeExtractor, axis, features);
    } else if (name === "piTest") {
      features.push(
        new NodeTypeFeature(
          nodeExtractor,
          slimdom.Node.PROCESSING_INSTRUCTION_NODE,
        ),
      );
      const target = firstXqxChild(child, "piTarget");
      if (target?.textContent) {
        features.push(new NodeNameFeature(nodeExtractor, target.textContent));
      }
    } else if (name === "commentTest") {
      features.push(
        new NodeTypeFeature(nodeExtractor, slimdom.Node.COMMENT_NODE),
      );
    } else if (name === "textTest") {
      features.push(new NodeTypeFeature(nodeExtractor, slimdom.Node.TEXT_NODE));
    } else if (name === "predicates") {
      extractPredicates(nodeExtractor, child, features, nsResolver);
    } else {
      throw new ExtractFeatureError(); // unsupported XQX construct
    }
  }
}

function extractNameFeatures(
  nodeExtractor: NodeExtractor,
  step: slimdom.Element,
  features: XMLFeature[],
  nsResolver: NamespaceResolver,
): void {
  const nameTest = firstXqxChild(step, "nameTest");
  if (!nameTest) throw new ExtractFeatureError();
  const localName = nameTest.textContent;
  if (localName) features.push(new NodeNameFeature(nodeExtractor, localName));
  const prefix = nameTest.getAttributeNS(XQX_NS, "prefix");
  if (prefix) {
    const ns = nsResolver?.(prefix);
    if (!ns) throw new ExtractFeatureError(`unresolved ns prefix: ${ns}`);
    features.push(new NodeNamespaceFeature(nodeExtractor, ns));
  }
  const uri = nameTest.getAttributeNS(XQX_NS, "URI");
  if (uri) features.push(new NodeNamespaceFeature(nodeExtractor, uri));
}

function extractPredicates(
  nodeExtractor: NodeExtractor,
  predicates: slimdom.Element,
  features: XMLFeature[],
  nsResolver: NamespaceResolver,
) {
  for (const child of predicates.childNodes) {
    if (!isXqxElement(child)) throw new ExtractFeatureError();
    const name = child.localName;
    if (name === "equalOp") {
      const firstOp = firstXqxChild(child, "firstOperand");
      const secondOp = firstXqxChild(child, "secondOperand");
      if (!firstOp || !secondOp) throw new ExtractFeatureError();
      const feature =
        extractEqualsOpPredicate(nodeExtractor, firstOp, secondOp) ||
        extractEqualsOpPredicate(nodeExtractor, secondOp, firstOp);
      if (!feature) throw new ExtractFeatureError();
      features.push(feature);
    } else if (name === "andOp") {
      extractPredicates(
        nodeExtractor,
        firstXqxChild(child, "firstOperand"),
        features,
        nsResolver,
      );
      extractPredicates(
        nodeExtractor,
        firstXqxChild(child, "secondOperand"),
        features,
        nsResolver,
      );
    } else {
      throw new ExtractFeatureError(); // unsupported XQX construct
    }
  }
}

function extractEqualsOpPredicate(
  nodeExtractor: NodeExtractor,
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
    return new NodeAttributeFeature(nodeExtractor, { name: attrName, value });
  }

  // Case 2: . = 'value'  (context item expression)
  if (firstXqxChild(firstOp, "contextItemExpr")) {
    return new NodeTextFeature(nodeExtractor, value);
  }

  // Case 3: text() = 'value'  (child text node)
  if (findXqxDescendant(firstOp, "textTest")) {
    return new NodeTextFeature(nodeExtractor, value);
  }

  return undefined;
}
