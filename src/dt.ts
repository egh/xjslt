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

import { Expression } from "estree";
import {
  mkArray,
  mkIdentifier,
  mkLiteral,
  mkNew,
  toEstree,
} from "./estree-util";

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
  serialize() {
    return mkNew(mkIdentifier(this.constructor.name), [toEstree(this.value)]);
  }
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
  * Defines a Rule that maps a set of Features to a result. The result
    can be used to store anything.
 */
export class Rule<T, U> {
  features: Feature<T, any>[];
  result: U;
  constructor(result: U, features: Feature<T, any>[]) {
    this.result = result;
    this.features = features;
  }
  toString() {
    return `Rule(features=${this.features})`;
  }
}

export class RuleTreeNode<T, U> {
  feature: Feature<T, any> | null;
  rules: Rule<T, U>[];
  left: RuleTreeNode<T, U> | null;
  right: RuleTreeNode<T, U> | null;

  constructor(
    feature: Feature<T, any> | null = null,
    rules: Rule<T, U>[] = [],
    left: RuleTreeNode<T, U> | null = null,
    right: RuleTreeNode<T, U> | null = null,
  ) {
    this.feature = feature;
    this.rules = rules;
    this.left = left;
    this.right = right;
  }

  toString() {
    const feature = this.feature ? this.feature.value : "null";
    const rules = this.rules.map((r) => r.toString());
    return `RuleTreeNode(feature=${feature}, rules=[${rules}] left=${this.left}, right=${this.right})`;
  }
}

export function buildRuleTree<T, U>(rules: Rule<T, U>[]): RuleTreeNode<T, U> {
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

  const matchingRules: Rule<T, U>[] = [];
  const nonMatchingRules: Rule<T, U>[] = [];

  for (const rule of rules) {
    if (rule.features.some((f) => f.equals(bestFeature))) {
      matchingRules.push(rule);
    } else {
      nonMatchingRules.push(rule);
    }
  }

  const node = new RuleTreeNode<T, U>(bestFeature);

  if (matchingRules.length > 0) {
    const remainingFeatureRules = matchingRules.map(
      (rule) =>
        new Rule(
          rule.result,
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

function ruleToEstree(rule: Rule<any, any>): Expression {
  return mkNew(mkIdentifier("Rule"), [
    toEstree(rule.result),
    mkArray(rule.features.map((f) => f.serialize())),
  ]);
}

export function ruleTreeNodeToEstree(node: RuleTreeNode<any, any>): Expression {
  return mkNew(mkIdentifier("RuleTreeNode"), [
    node.feature ? node.feature.serialize() : mkLiteral(null),
    mkArray(node.rules.map((r) => ruleToEstree(r))),
    node.left ? ruleTreeNodeToEstree(node.left) : mkLiteral(null),
    node.right ? ruleTreeNodeToEstree(node.right) : mkLiteral(null),
  ]);
}

export function findMatchingRules<T, U>(
  tree: RuleTreeNode<T, U>,
  thing_to_match: T,
): U[] {
  const matchingRules: Rule<T, U>[] = [];

  function traverse(node: RuleTreeNode<T, U> | null) {
    if (!node) return;

    matchingRules.push(...node.rules);

    if (node.feature) {
      if (node.feature.matches(thing_to_match)) {
        traverse(node.left);
      }
      // right holds rules that don't require this feature — always check them
      traverse(node.right);
    }
  }

  traverse(tree);
  return matchingRules.map((r) => r.result);
}
