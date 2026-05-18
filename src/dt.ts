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
  mkArray,
  mkIdentifier,
  mkLiteral,
  mkNew,
  toEstree,
} from "./estree-util";

import { Feature, Rule, RuleTreeNode } from "./definitions";

export function buildRuleTree<T, U>(rules: Rule<T, U>[]): RuleTreeNode<T, U> {
  if (rules.length === 0) {
    return { results: [] };
  }

  const allFeatures = new Set<Feature<T, any>>();
  for (const rule of rules) {
    for (const feature of rule.features) {
      allFeatures.add(feature);
    }
  }

  if (allFeatures.size === 0) {
    return { results: rules.map((rule) => rule.result) };
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

  let node: RuleTreeNode<T, U> = { feature: bestFeature, results: [] };

  if (matchingRules.length > 0) {
    const remainingFeatureRules = matchingRules.map((rule) => {
      return {
        ...rule,
        features: rule.features.filter((f) => !f.equals(bestFeature)),
      };
    });

    node.left = buildRuleTree(
      remainingFeatureRules.filter((rule) => rule.features.length > 0),
    );

    const fullyMatchedRules = matchingRules.filter(
      (_, index) => remainingFeatureRules[index].features.length === 0,
    );
    if (fullyMatchedRules.length > 0) {
      if (!node.left) {
        node.left = { results: [] };
      }
      node.left.results = fullyMatchedRules.map((rule) => rule.result);
    }
  }

  if (nonMatchingRules.length > 0) {
    node.right = buildRuleTree(nonMatchingRules);
  }

  return node;
}

export function findMatchingRules<T, U>(
  tree: RuleTreeNode<T, U>,
  thing_to_match: T,
): U[] {
  const results: U[] = [];
  const stack: (RuleTreeNode<T, U> | null)[] = [tree];

  while (stack.length > 0) {
    const node = stack.pop();
    if (!node) continue;

    results.push(...node.results);

    if (node.feature) {
      // right holds rules that don't require this feature — always
      // check them
      if (node.right) stack.push(node.right);
      if (node.feature.matches(thing_to_match) && node.left) {
        stack.push(node.left);
      }
    }
  }

  return results;
}
