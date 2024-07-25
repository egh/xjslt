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

import { expect } from "@jest/globals";
import * as slimdom from "slimdom";
import type { MatcherFunction } from "expect";
import { compile } from "xspattern";

/* Compare two dom objects and return a boolean if they are the same, */
export const domCompare = function (
  that,
  a: slimdom.Node,
  b: slimdom.Node,
): [boolean, () => string] {
  if (a.nodeType !== b.nodeType) {
    return [
      false,
      () =>
        `expected ${that.utils.printReceived(a)} to have the same nodeType as ${that.utils.printReceived(b)}`,
    ];
  }
  if (a.nodeName !== b.nodeName) {
    return [
      false,
      () =>
        `expected ${that.utils.printReceived(a)} to have the same name as ${that.utils.printReceived(b)}`,
    ];
  }
  if (
    a instanceof slimdom.CharacterData &&
    b instanceof slimdom.CharacterData
  ) {
    if (a.data !== b.data) {
      return [
        false,
        () =>
          `expected ${that.utils.printReceived(a.data)} to have the same text data as ${that.utils.printReceived(b.data)}`,
      ];
    }
  }
  if (a instanceof slimdom.Element && b instanceof slimdom.Element) {
    const xmlns = "http://www.w3.org/2000/xmlns/";
    let attributesA: any[] = [];
    let attributesB: any[] = [];
    for (const attrA of a.attributes) {
      if (attrA.namespaceURI != xmlns) {
        attributesA.push(attrA);
      }
    }
    for (const attrB of b.attributes) {
      if (attrB.namespaceURI != xmlns) {
        attributesB.push(attrB);
      }
    }

    if (attributesA) {
      if (attributesA.length !== attributesB.length) {
        return [
          false,
          () =>
            `expected ${that.utils.printReceived(a)} to have the same attribute count as ${that.utils.printReceived(b)}`,
        ];
      }
      for (const attrA of attributesA) {
        const attrB = b.getAttributeNode(attrA.name);
        if (!attrB) {
          return [
            false,
            () =>
              `expected ${that.utils.printReceived(b)} to have the attribute ${attrA.name}`,
          ];
        }
        if (
          attrA.value !== attrB.value ||
          attrA.localName !== attrB.localName ||
          (attrA.namespaceURI || "").toString() !==
            (attrB.namespaceURI || "").toString()
        ) {
          return [
            false,
            () =>
              `expected ${that.utils.printReceived(b)} to have the attribute ${attrA.localName} with value ${attrA.value} and namespace ${attrB.namespaceURI}`,
          ];
        }
      }
    }
  }
  if (a.hasChildNodes() || b.hasChildNodes()) {
    const childNodesA = a.childNodes;
    const childNodesB = b.childNodes;
    if (childNodesA.length !== childNodesB.length) {
      return [
        false,
        () =>
          `expected ${that.utils.printReceived(a)} to have the same number of children (${childNodesA.length} as ${that.utils.printReceived(b)} (${childNodesB.length}`,
      ];
    }
    for (let i = 0; i < childNodesA.length; i++) {
      const [result, msg] = domCompare(that, childNodesA[i], childNodesB[i]);
      if (!result) {
        return [false, msg];
      }
    }
    1;
  }
  return [true, () => ""];
};

export const toBeEquivalentDom: MatcherFunction<[b: unknown]> = function (
  a,
  b,
) {
  if (!(a instanceof slimdom.Node) || !(b instanceof slimdom.Node)) {
    throw new TypeError("Must be of type slimdom.Node!");
  }
  const [equal, message] = domCompare(this, a, b);
  if (equal) {
    const serializer = new slimdom.XMLSerializer();
    return {
      message: () =>
        `expected ${this.utils.printReceived(a)} not to equal ${this.utils.printReceived(b)}`,
      pass: true,
    };
  } else {
    return {
      message: message,
      pass: false,
    };
  }
};

export const toXSMatch: MatcherFunction<[expected: string]> = function (
  a,
  expected: string,
) {
  const matches = compile(expected as string)(a as string);
  if (matches) {
    return {
      message: () =>
        `expected ${this.utils.printReceived(a)} to match ${this.utils.printReceived(expected)}`,
      pass: true,
    };
  } else {
    return {
      message: () =>
        `expected ${this.utils.printReceived(a)} to match ${this.utils.printReceived(expected)}`,
      pass: false,
    };
  }
};

expect.extend({ toBeEquivalentDom });
expect.addEqualityTesters([
  (a: any, b: any) => {
    if (!(a instanceof slimdom.Node) || !(b instanceof slimdom.Node)) {
      return undefined;
    }
    return domCompare(undefined, a, b)[0];
  },
]);
expect.extend({ toXSMatch });
