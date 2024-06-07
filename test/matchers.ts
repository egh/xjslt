import { expect } from "@jest/globals";
import * as slimdom from "slimdom";
import type { MatcherFunction } from "expect";

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
          `expected ${that.utils.printReceived(a)} to have the same text data as ${that.utils.printReceived(b)}`,
      ];
    }
  }
  if (a instanceof slimdom.Element && b instanceof slimdom.Element) {
    if (a.attributes) {
      if (a.attributes.length !== b.attributes.length) {
        return [
          false,
          () =>
            `expected ${that.utils.printReceived(a)} to have the same attribute count as ${that.utils.printReceived(b)}`,
        ];
      }
      for (const attrA of a.attributes) {
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
          attrA.namespaceURI !== attrB.namespaceURI
        ) {
          return [
            false,
            () =>
              `expected ${that.utils.printReceived(b)} to have the attribute ${attrA.localName} with value ${attrB.value}`,
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


expect.extend({ toBeEquivalentDom });
expect.addEqualityTesters([
  (a: any, b: any) => {
    if (!(a instanceof slimdom.Node) || !(b instanceof slimdom.Node)) {
      return undefined;
    }
    return domCompare(undefined, a, b)[0];
  },
]);
