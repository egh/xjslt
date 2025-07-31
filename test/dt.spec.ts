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
import { mkIdentifier, mkLiteral, mkMember, mkArray } from "../src/estree-util";
import { Feature, Rule } from "../src/dt";
  
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
  
  generateTest(nodeParam: string): Expression {
    return {
      type: 'BinaryExpression',
      operator: '===',
      left: mkMember(nodeParam, 'suit'),
      right: mkLiteral(this.value)
    };
  }
}

class RankFeature extends Feature<Card, RankValue> {
  matches(card: Card): boolean {
    return card.rank === this.value;
  }
  
  generateTest(nodeParam: string): Expression {
    return {
      type: 'BinaryExpression',
      operator: '===',
      left: mkMember(nodeParam, 'rank'),
      right: mkLiteral(this.value)
    };
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

const rules = [
  new Rule('clubs', [new SuitFeature(SuitValue.Clubs)]),
  new Rule('10 spades', [new SuitFeature(SuitValue.Spades), new RankFeature(RankValue.Ten)]),
  new Rule('spades', [new SuitFeature(SuitValue.Spades)]),
  new Rule('10 of hearts', [new SuitFeature(SuitValue.Hearts), new RankFeature(RankValue.Ten)]),
  new Rule('ace of hearts', [new SuitFeature(SuitValue.Hearts), new RankFeature(RankValue.Ace)]),
];
