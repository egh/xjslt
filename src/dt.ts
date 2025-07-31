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

import { generate } from "astring";
import { Expression, Identifier, Literal, MemberExpression, CallExpression, ArrayExpression, ConditionalExpression } from "estree";
import { mkIdentifier, mkLiteral, mkMember, mkArray } from "./estree-util";

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
  abstract generateTest(nodeParam: string): Expression;
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
  toString() { return this.name; }
}

class RuleTreeNode<T> {
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
    const feature = this.feature ? this.feature.value : 'null';
    const rules = this.rules.map(r=>r.toString());
    return `RuleTreeNode(feature=${feature}, rules=[${rules}] left=${this.left}, right=${this.right})`;
  }
  
  generateCode(nodeParam: string = 'node'): Expression {
    if (this.rules.length > 0 && !this.feature) {
      return mkArray(this.rules.map(rule => mkLiteral(rule.name)));
    }
    
    if (!this.feature) {
      return mkArray([]);
    }
    
    const testExpression = this.feature.generateTest(nodeParam);
    const leftExpression = this.left ? this.left.generateCode(nodeParam) : mkArray([]);
    const rightExpression = this.right ? this.right.generateCode(nodeParam) : mkArray([]);
    
    return {
      type: 'ConditionalExpression',
      test: testExpression,
      consequent: leftExpression,
      alternate: rightExpression
    } as ConditionalExpression;
  }
}

function buildRuleTree<T>(rules: Rule<T>[]): RuleTreeNode<T> {
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
    if (rule.features.some(f => f.equals(bestFeature))) {
      matchingRules.push(rule);
    } else {
      nonMatchingRules.push(rule);
    }
  }
  
  const node = new RuleTreeNode(bestFeature);
  
  if (matchingRules.length > 0) {
    const remainingFeatureRules = matchingRules.map(rule => 
      new Rule(rule.name, rule.features.filter(f => !f.equals(bestFeature)))
    );
    
    node.left = buildRuleTree(remainingFeatureRules.filter(rule => rule.features.length > 0));
    
    const fullyMatchedRules = matchingRules.filter((_, index) => remainingFeatureRules[index].features.length === 0);
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

function findMatchingRules<T>(tree: RuleTreeNode<T>, thing: T): Rule<T>[] {
  const matchingRules: Rule<T>[] = [];
  
  function traverse(node: RuleTreeNode<T> | null) {
    if (!node) return;
    
    matchingRules.push(...node.rules);
    
    if (node.feature) {
      if (node.feature.matches(thing)) {
        traverse(node.left);
      } else {
        traverse(node.right);
      }
    }
  }
  
  traverse(tree);
  return matchingRules;
}

class NamespaceFeature extends Feature<any, string | null> {
  matches(node: any): boolean {
    return node.namespaceURI === this.value;
  }
  
  generateTest(nodeParam: string): Expression {
    return {
      type: 'BinaryExpression',
      operator: '===',
      left: mkMember(nodeParam, 'namespaceURI'),
      right: mkLiteral(this.value)
    };
  }
}

class NodeNameFeature extends Feature<any, string> {
  matches(node: any): boolean {
    return node.nodeName === this.value;
  }
  
  generateTest(nodeParam: string): Expression {
    return {
      type: 'BinaryExpression',
      operator: '===',
      left: mkMember(nodeParam, 'nodeName'),
      right: mkLiteral(this.value)
    };
  }
}

class NodeTextFeature extends Feature<any, string | null> {
  matches(node: any): boolean {
    return node.textContent === this.value;
  }
  
  generateTest(nodeParam: string): Expression {
    return {
      type: 'BinaryExpression',
      operator: '===',
      left: mkMember(nodeParam, 'textContent'),
      right: mkLiteral(this.value)
    };
  }
}

class AttributeFeature extends Feature<any, {name: string, value: string}> {
  matches(element: any): boolean {
    return element.getAttribute(this.value.name) === this.value.value;
  }
  
  generateTest(nodeParam: string): Expression {
    return {
      type: 'BinaryExpression',
      operator: '===',
      left: {
        type: 'CallExpression',
        callee: mkMember(nodeParam, 'getAttribute'),
        arguments: [mkLiteral(this.value.name)],
        optional: false
      } as CallExpression,
      right: mkLiteral(this.value.value)
    };
  }
}

type XMLFeature = NamespaceFeature | NodeNameFeature | NodeTextFeature | AttributeFeature;

const xmlRules = [
  new Rule<any>('div elements', [new NodeNameFeature('DIV')]),
  new Rule<any>('span with class=highlight', [
    new NodeNameFeature('SPAN'), 
    new AttributeFeature({name: 'class', value: 'highlight'})
  ]),
  new Rule<any>('XHTML namespace elements', [new NamespaceFeature('http://www.w3.org/1999/xhtml')]),
  new Rule<any>('elements with text "Hello"', [new NodeTextFeature('Hello')]),
  new Rule<any>('p elements in XHTML', [
    new NamespaceFeature('http://www.w3.org/1999/xhtml'),
    new NodeNameFeature('P')
  ])
];

const xmlTree = buildRuleTree(xmlRules);
console.log('XML Tree:', xmlTree.toString());


