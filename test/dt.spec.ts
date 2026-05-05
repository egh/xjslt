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

import { Expression } from "estree";
import {
  mkIdentifier,
  mkLiteral,
  mkMember,
  mkNew,
  toEstree,
} from "../src/estree-util";
import { Feature, Rule, buildRuleTree, findMatchingRules } from "../src/dt";

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
  King,
}

type CardFeature = SuitFeature | RankFeature;

class SuitFeature extends Feature<Card, SuitValue> {
  matches(card: Card): boolean {
    return card.suit === this.value;
  }
  serialize() {
    return mkNew(mkIdentifier("SuitFeature"), [toEstree(this.value)]);
  }
}

class RankFeature extends Feature<Card, RankValue> {
  matches(card: Card): boolean {
    return card.rank === this.value;
  }
  serialize() {
    return mkNew(mkIdentifier("RankFeature"), [toEstree(this.value)]);
  }
}

enum SuitValue {
  Spades = "Spades",
  Hearts = "Hearts",
  Diamonds = "Diamonds",
  Clubs = "Clubs",
}

class Card {
  rank: RankValue;
  suit: SuitValue;

  constructor(rank: RankValue, suit: SuitValue) {
    this.rank = rank;
    this.suit = suit;
  }
}

describe("generic rule tree tests", () => {
  const rules = [
    new Rule("clubs", [new SuitFeature(SuitValue.Clubs)]),
    new Rule("10 spades", [
      new SuitFeature(SuitValue.Spades),
      new RankFeature(RankValue.Ten),
    ]),
    new Rule("spades", [new SuitFeature(SuitValue.Spades)]),
    new Rule("10 of hearts", [
      new SuitFeature(SuitValue.Hearts),
      new RankFeature(RankValue.Ten),
    ]),
    new Rule("ace of hearts", [
      new SuitFeature(SuitValue.Hearts),
      new RankFeature(RankValue.Ace),
    ]),
    new Rule("10", [new RankFeature(RankValue.Ten)]),
  ];
  const ruleTree = buildRuleTree(rules);

  describe("buildRuleTree", () => {
    it("returns empty node for empty rules", () => {
      const tree = buildRuleTree([]);
      expect(tree.feature).toBeNull();
      expect(tree.rules).toHaveLength(0);
    });

    it("returns node with rules for featureless rules", () => {
      const tree = buildRuleTree([new Rule("any", []), new Rule("other", [])]);
      expect(tree.feature).toBeNull();
      expect(tree.rules).toHaveLength(2);
      expect(tree.rules.map((r) => r.result)).toEqual(["any", "other"]);
    });

    it("builds a tree with a feature at the root", () => {
      expect(ruleTree.feature).not.toBeNull();
    });
  });

  describe("findMatchingRules", () => {
    it("matches a clubs card to the clubs rule only", () => {
      const matches = findMatchingRules(
        ruleTree,
        new Card(RankValue.King, SuitValue.Clubs),
      );
      expect(matches).toEqual(["clubs"]);
    });

    it("matches ten of spades to 10 spades and spades and 10", () => {
      const matches = findMatchingRules(
        ruleTree,
        new Card(RankValue.Ten, SuitValue.Spades),
      );
      expect(matches.sort()).toEqual(["10", "10 spades", "spades"].sort());
    });

    it("matches a non-ten spades card to spades only", () => {
      const matches = findMatchingRules(
        ruleTree,
        new Card(RankValue.King, SuitValue.Spades),
      );
      const names = expect(matches).toEqual(["spades"]);
    });

    it("matches ten of hearts to 10 of hearts and 10", () => {
      const matches = findMatchingRules(
        ruleTree,
        new Card(RankValue.Ten, SuitValue.Hearts),
      );
      expect(matches.sort()).toEqual(["10 of hearts", "10"].sort());
    });

    it("matches ace of hearts to ace of hearts only", () => {
      const matches = findMatchingRules(
        ruleTree,
        new Card(RankValue.Ace, SuitValue.Hearts),
      );
      expect(matches).toEqual(["ace of hearts"]);
    });

    it("returns no matches for a card with no matching rule", () => {
      const matches = findMatchingRules(
        ruleTree,
        new Card(RankValue.King, SuitValue.Diamonds),
      );
      expect(matches).toHaveLength(0);
    });
  });
});
