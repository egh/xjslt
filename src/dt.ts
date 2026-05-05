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

import {
  CallExpression,
  Expression,
  ConditionalExpression,
  SpreadElement,
} from "estree";

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

export class Rule<T> {
  features: Feature<T, any>[];
  name: string;
  constructor(name: string, features: Feature<T, any>[]) {
    this.features = features;
    this.name = name;
  }
  toString() {
    return this.name;
  }
}

export class RuleTreeNode<T> {
  feature: Feature<T, any> | null;
  rules: Rule<T>[];
  left: RuleTreeNode<T> | null;
  right: RuleTreeNode<T> | null;

  constructor(feature: Feature<T, any> | null = null, rules: Rule<T>[] = []) {
    this.feature = feature;
    this.rules = rules;
    this.left = null;
    this.right = null;
  }

  toString() {
    const feature = this.feature ? this.feature.value : "null";
    const rules = this.rules.map((r) => r.toString());
    return `RuleTreeNode(feature=${feature}, rules=[${rules}] left=${this.left}, right=${this.right})`;
  }
}

export function buildRuleTree<T>(rules: Rule<T>[]): RuleTreeNode<T> {
  if (rules.length === 0) {
    return new RuleTreeNode();
  }

  const allFeatures = new Set<Feature<T, any>>();
  for (const rule of rules) {
    for (const feature of rule.features) {
      allFeatures.add(feature);
    }
  }

  if (allFeatures.size === 0) {
    return new RuleTreeNode(null, rules);
  }

  const bestFeature = Array.from(allFeatures)[0];

  const matchingRules: Rule<T>[] = [];
  const nonMatchingRules: Rule<T>[] = [];

  for (const rule of rules) {
    if (rule.features.some((f) => f.equals(bestFeature))) {
      matchingRules.push(rule);
    } else {
      nonMatchingRules.push(rule);
    }
  }

  const node = new RuleTreeNode(bestFeature);

  if (matchingRules.length > 0) {
    const remainingFeatureRules = matchingRules.map(
      (rule) =>
        new Rule(
          rule.name,
          rule.features.filter((f) => !f.equals(bestFeature)),
        ),
    );

    node.left = buildRuleTree(
      remainingFeatureRules.filter((rule) => rule.features.length > 0),
    );

    const fullyMatchedRules = matchingRules.filter(
      (_, index) => remainingFeatureRules[index].features.length === 0,
    );
    if (fullyMatchedRules.length > 0) {
      if (!node.left) {
        node.left = new RuleTreeNode();
      }
      node.left.rules = fullyMatchedRules;
    }
  }

  if (nonMatchingRules.length > 0) {
    node.right = buildRuleTree(nonMatchingRules);
  }

  return node;
}

export function findMatchingRules<T>(
  tree: RuleTreeNode<T>,
  thing: T,
): Rule<T>[] {
  const matchingRules: Rule<T>[] = [];

  function traverse(node: RuleTreeNode<T> | null) {
    if (!node) return;

    matchingRules.push(...node.rules);

    if (node.feature) {
      if (node.feature.matches(thing)) {
        traverse(node.left);
      }
      // right holds rules that don't require this feature — always check them
      traverse(node.right);
    }
  }

  traverse(tree);
  return matchingRules;
}
