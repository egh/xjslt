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

import { Feature, Rule, buildDecisionTree, find, parseXPathToFeatures, NodeNameFeature, NamespaceFeature } from "../src/dt";
  
enum RankValue {
  Ace = 1,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King
}

type CardFeature = SuitFeature | RankFeature;

class SuitFeature extends Feature<Card, SuitValue> {
  matches(card: Card): boolean {
    return card.suit === this.value;
  }
}

class RankFeature extends Feature<Card, RankValue> {
  matches(card: Card): boolean {
    return card.rank === this.value;
  }
}

enum SuitValue {
  Spades = "Spades",
  Hearts = "Hearts",
  Diamonds = "Diamonds",
  Clubs = "Clubs"
}


class Card {
  rank: RankValue;
  suit: SuitValue;
  
  constructor(rank: RankValue, suit: SuitValue) {
    this.rank = rank;
    this.suit = suit;
  }
}

const rules : Rule<Card, string>[] = [
  new Rule('clubs', [new SuitFeature(SuitValue.Clubs)], 'clubs'),
  new Rule('10 of spades', [new SuitFeature(SuitValue.Spades), new RankFeature(RankValue.Ten)], '10 of spades'),
  new Rule('spades', [new SuitFeature(SuitValue.Spades)], 'spades'),
  new Rule('10 of hearts', [new SuitFeature(SuitValue.Hearts), new RankFeature(RankValue.Ten)], '10 of hearts'),
  new Rule('ace of hearts', [new SuitFeature(SuitValue.Hearts), new RankFeature(RankValue.Ace)], 'ace of hearts'),
];

const tree = buildDecisionTree(rules);

test("find", () => {
  expect(
    find(tree, new Card(RankValue.Ten, SuitValue.Spades)).sort()
  ).toEqual(['10 of spades', 'spades']);
});

test("find", () => {
  expect(
    find(tree, new Card(RankValue.Ace, SuitValue.Spades)).sort()
  ).toEqual(['spades']);
});

test("find", () => {
  expect(
    find(tree, new Card(RankValue.Ace, SuitValue.Clubs)).sort()
  ).toEqual(['clubs']);
});

test("find", () => {
  expect(
    find(tree, new Card(RankValue.Ace, SuitValue.Diamonds)).sort()
  ).toEqual([]);
});

test("find", () => {
  expect(
    find(tree, new Card(RankValue.Ace, SuitValue.Hearts)).sort()
  ).toEqual(['ace of hearts']);
});

test("parseXPathToFeatures", () => {
  expect(
    parseXPathToFeatures("foo", (s)=>null)
  ).toEqual([new NodeNameFeature("foo")]);
});

const ns = "https://example.org";

test("parseXPathToFeatures", () => {
  expect(
    parseXPathToFeatures("foo:bar", (s)=>ns)
  ).toEqual([new NamespaceFeature(ns), new NodeNameFeature("bar")]);
});

test("parseXPathToFeatures", () => {
  expect(
    parseXPathToFeatures("foo:bar", (s)=>null)
  ).toEqual(null)
});

test("parseXPathToFeatures", () => {
  expect(
    parseXPathToFeatures("123", (s)=>null)
  ).toEqual(null)
});

