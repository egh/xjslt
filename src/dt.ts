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
1 */

import { NamespaceResolver } from "fontoxpath";

/*
 * Defines a "Feature" that can be found on a type of Thing, which can
   have a value of type ValueType. For instance, a Feature<Card,
   SuitValue>.
 */
export abstract class Feature<ThingType, ValueType> {
  value: ValueType;
  constructor(value: ValueType) {
    this.value = value;
  }
  abstract matches(thing: ThingType): boolean;
  equals(other: Feature<any, any>): boolean {
    if (this.constructor !== other.constructor) {
      return false;
    }
    if (this.value !== other.value) {
      return false;
    }
    return true;
  }
}

/*
 * A Rule is a set of features that resolve to a given result.
 */
export class Rule<FeatureType, ResultType> {
  features: Feature<FeatureType, any>[];
  name: string;
  result: ResultType;

  constructor(
    name: string,
    features: Feature<FeatureType, any>[],
    result: ResultType,
  ) {
    this.features = features;
    this.name = name;
    this.result = result;
  }
  toString() {
    return this.name;
  }
}

/*
 * A node (might be the root node) in a decision tree, which can be
 * used to find a set of results which match a given feature of
 * FeatureType.
 */
export class DecisionTreeNode<FeatureType, ResultType> {
  feature: Feature<FeatureType, any> | null;
  left: DecisionTreeNode<FeatureType, ResultType> | null;
  right: DecisionTreeNode<FeatureType, ResultType> | null;
  results: ResultType[];

  constructor(
    feature: Feature<FeatureType, any> | null = null,
    results: ResultType[] | null = null,
  ) {
    this.feature = feature;
    this.left = null;
    this.right = null;
    this.results = results ?? [];
  }

  toString() {
    const feature = this.feature ? this.feature.value : "null";
    return `RuleTreeNode(feature=${feature}, left=${this.left}, right=${this.right})`;
  }
}

export function buildDecisionTree<FeatureType, ResultType>(
  rules: Rule<FeatureType, ResultType>[],
): DecisionTreeNode<FeatureType, ResultType> {
  if (rules.length === 0) {
    return new DecisionTreeNode();
  }

  const allFeatures = new Set<Feature<FeatureType, any>>();
  for (const rule of rules) {
    for (const feature of rule.features) {
      allFeatures.add(feature);
    }
  }

  if (allFeatures.size === 0) {
    return new DecisionTreeNode(
      null,
      rules.map((rule) => rule.result),
    );
  }

  const bestFeature = Array.from(allFeatures)[0];

  const matchingRules: Rule<FeatureType, ResultType>[] = [];
  const nonMatchingRules: Rule<FeatureType, ResultType>[] = [];

  for (const rule of rules) {
    if (rule.features.some((f) => f.equals(bestFeature))) {
      matchingRules.push(rule);
    } else {
      nonMatchingRules.push(rule);
    }
  }

  const node = new DecisionTreeNode<FeatureType, ResultType>(bestFeature);

  if (matchingRules.length > 0) {
    const remainingFeatureRules = matchingRules.map(
      (rule) =>
        new Rule(
          rule.name,
          rule.features.filter((f) => !f.equals(bestFeature)),
          rule.result,
        ),
    );

    node.left = buildDecisionTree(
      remainingFeatureRules.filter((rule) => rule.features.length > 0),
    );

    const fullyMatchedRules = matchingRules.filter(
      (_, index) => remainingFeatureRules[index].features.length === 0,
    );
    if (fullyMatchedRules.length > 0) {
      if (!node.left) {
        node.left = new DecisionTreeNode();
      }
      node.left.results = fullyMatchedRules.map((rule) => rule.result);
    }
  }

  if (nonMatchingRules.length > 0) {
    node.right = buildDecisionTree(nonMatchingRules);
  }

  return node;
}

export function find<ThingType, U>(
  tree: DecisionTreeNode<ThingType, U>,
  thing: ThingType,
): U[] {
  const results: U[] = [];

  function traverse(node: DecisionTreeNode<ThingType, U> | null) {
    if (!node) return;

    results.push(...node.results);

    if (node.feature) {
      if (node.feature.matches(thing)) {
        traverse(node.left);
      } else {
        traverse(node.right);
      }
    }
  }

  traverse(tree);
  return results;
}

export class NamespaceFeature extends Feature<any, string | null> {
  matches(node: any): boolean {
    return node.namespaceURI === this.value;
  }
}

export class NodeNameFeature extends Feature<any, string> {
  matches(node: any): boolean {
    return node.nodeName === this.value;
  }
}

class NodeTextFeature extends Feature<any, string | null> {
  matches(node: any): boolean {
    return node.textContent === this.value;
  }
}

class AttributeFeature extends Feature<any, { name: string; value: string }> {
  matches(element: any): boolean {
    return element.getAttribute(this.value.name) === this.value.value;
  }
}

export type XMLFeature =
  | NamespaceFeature
  | NodeNameFeature
  | NodeTextFeature
  | AttributeFeature;

export function parseXPathToFeatures(
  xpathString: string,
  resolver: NamespaceResolver,
): XMLFeature[] | null {
  if (!xpathString) {
    return null;
  }
  const match = xpathString.match(/^(([a-zA-Z]+):)?([a-zA-Z]+)$/);
  if (match) {
    const prefix = match[2];
    const name = match[3];
    if (prefix) {
      const ns = resolver(prefix);
      if (!ns) {
        return null;
      }
      return [new NamespaceFeature(ns), new NodeNameFeature(name)];
    } else {
      return [new NodeNameFeature(name)];
    }
  }
  return null;
}
