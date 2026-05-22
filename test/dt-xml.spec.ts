/*
 * Copyright (C) 2021-2026 Erik Hetzner
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

import {
  greatGrandParentNode,
  grandParentNode,
  parentNode,
  selfNode,
  xpathToFeatures,
  NodeNameFeature,
  NodeNamespaceFeature,
  NodeAttributeFeature,
  NodeTextFeature,
  NodeTypeFeature,
} from "../src/dt-xml";

import type { Rule, RuleTreeNode } from "../src/definitions";
import { buildRuleTree, findMatchingRules } from "../src/dt";
import * as slimdom from "slimdom";
import { generate } from "astring";

const NS = "http://example.com/ns";
const noNs = (_prefix: string) => null;
const withNs = (prefix: string) => (prefix === "ns" ? NS : null);

type XMLFeatureArray = NonNullable<ReturnType<typeof xpathToFeatures>>;

function expectFeatures(
  result: ReturnType<typeof xpathToFeatures>,
  expected: XMLFeatureArray,
): void {
  expect(result).toBeDefined();
  expect(result).toHaveLength(expected.length);
  expect(result).toEqual(expect.arrayContaining(expected));
}

describe("xpathToFeatures", () => {
  describe("supported patterns", () => {
    test("element name", () => {
      expectFeatures(xpathToFeatures("div", noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(selfNode, "div"),
      ]);
    });

    test("wildcard * yields single node type feature", () => {
      expectFeatures(xpathToFeatures("*", noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
      ]);
    });

    test("element with attribute predicate", () => {
      expectFeatures(xpathToFeatures('div[@class="foo"]', noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(selfNode, "div"),
        new NodeAttributeFeature(selfNode, { name: "class", value: "foo" }),
      ]);
    });

    test("element with multiple attribute predicates", () => {
      expectFeatures(xpathToFeatures('div[@class="foo" and @id="bar"]', noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(selfNode, "div"),
        new NodeAttributeFeature(selfNode, { name: "class", value: "foo" }),
        new NodeAttributeFeature(selfNode, { name: "id", value: "bar" }),
      ]);
    });

    test("namespace-prefixed element", () => {
      expectFeatures(xpathToFeatures("ns:p", withNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(selfNode, "p"),
        new NodeNamespaceFeature(selfNode, NS),
      ]);
    });

    test("namespace-prefixed element with attribute predicate", () => {
      expectFeatures(xpathToFeatures('ns:p[@id="x"]', withNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(selfNode, "p"),
        new NodeNamespaceFeature(selfNode, NS),
        new NodeAttributeFeature(selfNode, { name: "id", value: "x" }),
      ]);
    });

    test("Q{uri} namespace syntax", () => {
      expectFeatures(xpathToFeatures(`Q{${NS}}div`, noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(selfNode, "div"),
        new NodeNamespaceFeature(selfNode, NS),
      ]);
    });

    test("namespace wildcard ns:*", () => {
      expectFeatures(xpathToFeatures("ns:*", withNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNamespaceFeature(selfNode, NS),
      ]);
    });

    test("descendant shorthand //elem", () => {
      expectFeatures(xpathToFeatures("//div", noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(selfNode, "div"),
      ]);
    });

    test("descendant shorthand with namespace //ns:elem", () => {
      expectFeatures(xpathToFeatures("//ns:p", withNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(selfNode, "p"),
        new NodeNamespaceFeature(selfNode, NS),
      ]);
    });

    test("context item text predicate [.='value']", () => {
      expectFeatures(xpathToFeatures('div[.="hello"]', noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(selfNode, "div"),
        new NodeTextFeature(selfNode, "hello"),
      ]);
    });

    test("text() predicate [text()='value']", () => {
      expectFeatures(xpathToFeatures('div[text()="hello"]', noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(selfNode, "div"),
        new NodeTextFeature(selfNode, "hello"),
      ]);
    });

    test("text predicate combined with attribute predicate", () => {
      expectFeatures(xpathToFeatures('div[@class="foo"][.="hello"]', noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(selfNode, "div"),
        new NodeAttributeFeature(selfNode, { name: "class", value: "foo" }),
        new NodeTextFeature(selfNode, "hello"),
      ]);
    });

    test("child predicate with wildcard parent", () => {
      expect(xpathToFeatures("*[foo]", noNs)).toEqual(undefined);
    });

    test("processing-instruction() yields PI node type feature", () => {
      expectFeatures(xpathToFeatures("processing-instruction()", noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.PROCESSING_INSTRUCTION_NODE),
      ]);
    });

    test("processing-instruction('foo') yields PI node type and name features", () => {
      expectFeatures(xpathToFeatures("processing-instruction('foo')", noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.PROCESSING_INSTRUCTION_NODE),
        new NodeNameFeature(selfNode, "foo"),
      ]);
    });

    test("comment() yields comment node type feature", () => {
      expectFeatures(xpathToFeatures("comment()", noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.COMMENT_NODE),
      ]);
    });

    test("text() yields text node type feature", () => {
      expectFeatures(xpathToFeatures("text()", noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.TEXT_NODE),
      ]);
    });

    test("@* yields attribute node type feature only", () => {
      expectFeatures(xpathToFeatures("@*", noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ATTRIBUTE_NODE),
      ]);
    });

    test("@foo yields attribute node type and name features", () => {
      expectFeatures(xpathToFeatures("@foo", noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ATTRIBUTE_NODE),
        new NodeNameFeature(selfNode, "foo"),
      ]);
    });

    test("@ns:foo yields attribute node type, name, and namespace features", () => {
      expectFeatures(xpathToFeatures("@ns:foo", withNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ATTRIBUTE_NODE),
        new NodeNameFeature(selfNode, "foo"),
        new NodeNamespaceFeature(selfNode, NS),
      ]);
    });

    test("parent/child path", () => {
      expectFeatures(xpathToFeatures("div/span", noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(selfNode, "span"),
        new NodeTypeFeature(parentNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(parentNode, "div"),
      ]);
    });

    test("//parent/child path", () => {
      expectFeatures(xpathToFeatures("//div/span", noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(selfNode, "span"),
        new NodeTypeFeature(parentNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(parentNode, "div"),
      ]);
    });

    test("grandparent/parent/child path", () => {
      expectFeatures(xpathToFeatures("a/b/c", noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(selfNode, "c"),
        new NodeTypeFeature(parentNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(parentNode, "b"),
        new NodeTypeFeature(grandParentNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(grandParentNode, "a"),
      ]);
    });

    test("ggp/grandparent/parent/child path", () => {
      expectFeatures(xpathToFeatures("a/b/c/d", noNs), [
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(selfNode, "d"),
        new NodeTypeFeature(parentNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(parentNode, "c"),
        new NodeTypeFeature(grandParentNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(grandParentNode, "b"),
        new NodeTypeFeature(greatGrandParentNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(greatGrandParentNode, "a"),
      ]);
    });

    test("parent/child with predicate on child", () => {
      expectFeatures(xpathToFeatures('div/span[@class="foo"]', noNs), [
        new NodeTypeFeature(parentNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(parentNode, "div"),
        new NodeTypeFeature(selfNode, slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature(selfNode, "span"),
        new NodeAttributeFeature(selfNode, { name: "class", value: "foo" }),
      ]);
    });
  });

  describe("unsupported patterns return undefined", () => {
    test("union a|b", () => {
      expect(xpathToFeatures("a|b", noNs)).toBeUndefined();
    });

    test("/foo", () => {
      expect(xpathToFeatures("/foo", noNs)).toBeUndefined();
    });

    test("position predicate [1]", () => {
      expect(xpathToFeatures("div[1]", noNs)).toBeUndefined();
    });

    test("id($x)", () => {
      expect(xpathToFeatures("id($x)", noNs)).toBeUndefined();
    });

    test("position() predicate", () => {
      expect(xpathToFeatures("div[position()=1]", noNs)).toBeUndefined();
    });

    test("inequality predicate [@attr!='value']", () => {
      expect(xpathToFeatures('div[@class!="foo"]', noNs)).toBeUndefined();
    });

    test("function-call predicate", () => {
      expect(xpathToFeatures("div[count(p)>0]", noNs)).toBeUndefined();
    });

    test("or expression", () => {
      expect(
        xpathToFeatures("span[@foo='foo' or @foo='bar']", noNs),
      ).toBeUndefined();
    });

    test("node() node test", () => {
      expect(xpathToFeatures("node()", noNs)).toBeUndefined();
    });

    test("namespace prefix not in resolver", () => {
      expect(xpathToFeatures("ns:*", noNs)).toBeUndefined();
    });
  });

  describe("throws on invalid XPath syntax", () => {
    test("malformed expression", () => {
      expect(() => xpathToFeatures("<<>>", noNs)).toThrow();
    });
  });
});

describe("finding rules", () => {
  const xmlRules = [
    { result: "div elements", features: xpathToFeatures("div")! },
    {
      result: "span with class=highlight",
      features: xpathToFeatures("span[@class='highlight']")!,
    },
    {
      result: "div with class=highlight",
      features: xpathToFeatures("div[@class='highlight']")!,
    },
    {
      result: "* with class=highlight",
      features: xpathToFeatures("*[@class='highlight']")!,
    },
    {
      result: "ns namespace elements",
      features: xpathToFeatures("ns:*", withNs)!,
    },
    {
      result: 'elements with text "hello"',
      features: xpathToFeatures("*[.='hello']")!,
    },
    {
      result: "p elements in ns",
      features: xpathToFeatures("ns:p", withNs)!,
    },
  ];
  const tree = buildRuleTree(xmlRules);
  const doc = new slimdom.Document();

  test("div element matches div rule only", () => {
    const el = doc.createElement("div");
    expect(findMatchingRules(tree, el)).toEqual(["div elements"]);
  });

  test("span without class matches no rules", () => {
    const el = doc.createElement("span");
    expect(findMatchingRules(tree, el)).toEqual([]);
  });

  test("span with class=highlight matches span rule and wildcard class rule", () => {
    const el = doc.createElement("span");
    el.setAttribute("class", "highlight");
    expect(findMatchingRules(tree, el)).toEqual(
      expect.arrayContaining([
        "span with class=highlight",
        "* with class=highlight",
      ]),
    );
    expect(findMatchingRules(tree, el)).toHaveLength(2);
  });

  test("div with class=highlight matches div rule, div class rule, and wildcard class rule", () => {
    const el = doc.createElement("div");
    el.setAttribute("class", "highlight");
    expect(findMatchingRules(tree, el)).toEqual(
      expect.arrayContaining([
        "div elements",
        "div with class=highlight",
        "* with class=highlight",
      ]),
    );
    expect(findMatchingRules(tree, el)).toHaveLength(3);
  });

  test("div without class matches only div rule", () => {
    const el = doc.createElement("div");
    expect(findMatchingRules(tree, el)).toEqual(["div elements"]);
  });

  test("arbitrary element with class=highlight matches only wildcard class rule", () => {
    const el = doc.createElement("p");
    el.setAttribute("class", "highlight");
    expect(findMatchingRules(tree, el)).toEqual(["* with class=highlight"]);
  });

  test("ns element matches ns namespace rule only", () => {
    const el = doc.createElementNS(NS, "ns:foo");
    expect(findMatchingRules(tree, el)).toEqual(["ns namespace elements"]);
  });

  test("element with text 'hello' matches text rule only", () => {
    const el = doc.createElement("p");
    el.appendChild(doc.createTextNode("hello"));
    expect(findMatchingRules(tree, el)).toEqual(['elements with text "hello"']);
  });

  test("div element with text 'hello' matches div and text rule", () => {
    const el = doc.createElement("div");
    el.appendChild(doc.createTextNode("hello"));
    expect(findMatchingRules(tree, el)).toEqual(
      expect.arrayContaining(["div elements", 'elements with text "hello"']),
    );
    expect(findMatchingRules(tree, el)).toHaveLength(2);
  });

  test("p in ns matches ns namespace rule then p-in-ns rule", () => {
    // createElementNS with unqualified name so nodeName === localName === "p"
    const el = doc.createElementNS(NS, "p");
    expect(findMatchingRules(tree, el)).toEqual(
      expect.arrayContaining(["ns namespace elements", "p elements in ns"]),
    );
    expect(findMatchingRules(tree, el)).toHaveLength(2);
  });

  test("unrelated element matches no rules", () => {
    const el = doc.createElement("article");
    expect(findMatchingRules(tree, el)).toEqual([]);
  });
});

describe("equality", () => {
  test("", () => {
    expect(
      new NodeNameFeature(selfNode, "foo").equals(
        new NodeNameFeature(selfNode, "foo"),
      ),
    ).toBe(true);
    expect(
      new NodeNameFeature(selfNode, "foo").equals(
        new NodeNameFeature(parentNode, "foo"),
      ),
    ).toBe(false);
    expect(
      new NodeNameFeature(selfNode, "foo").equals(
        new NodeNameFeature(selfNode, "bar"),
      ),
    ).toBe(false);
    expect(
      new NodeNameFeature(selfNode, "foo").equals(
        new NodeNamespaceFeature(selfNode, "foo"),
      ),
    ).toBe(false);
  });
});

describe("finding rules with parent name", () => {
  const parentRules = [
    { result: "span in div", features: xpathToFeatures("div/span")! },
    { result: "span anywhere", features: xpathToFeatures("span")! },
    { result: "p in div", features: xpathToFeatures("div/p")! },
  ];
  const tree = buildRuleTree(parentRules);
  const doc = new slimdom.Document();

  test("span with div parent matches span-in-div and span-anywhere rules", () => {
    const parent = doc.createElement("div");
    const el = doc.createElement("span");
    parent.appendChild(el);
    expect(findMatchingRules(tree, el)).toEqual(
      expect.arrayContaining(["span in div", "span anywhere"]),
    );
    expect(findMatchingRules(tree, el)).toHaveLength(2);
  });

  test("span with no parent matches only span-anywhere rule", () => {
    const el = doc.createElement("span");
    expect(findMatchingRules(tree, el)).toEqual(["span anywhere"]);
  });

  test("span with section parent matches only span-anywhere rule", () => {
    const parent = doc.createElement("section");
    const el = doc.createElement("span");
    parent.appendChild(el);
    expect(findMatchingRules(tree, el)).toEqual(["span anywhere"]);
  });

  test("p with div parent matches p-in-div rule", () => {
    const parent = doc.createElement("div");
    const el = doc.createElement("p");
    parent.appendChild(el);
    expect(findMatchingRules(tree, el)).toEqual(["p in div"]);
  });
});

describe("serialize", () => {
  test("NodeNameFeature", () => {
    expect(generate(new NodeNameFeature(selfNode, "div").serialize())).toBe(
      'new xjslt.NodeNameFeature(xjslt.selfNode, "div")',
    );
  });

  test("NodeNamespaceFeature", () => {
    expect(
      generate(
        new NodeNamespaceFeature(selfNode, "http://example.com").serialize(),
      ),
    ).toBe(
      'new xjslt.NodeNamespaceFeature(xjslt.selfNode, "http://example.com")',
    );
  });

  test("NodeTextFeature", () => {
    expect(generate(new NodeTextFeature(selfNode, "hello").serialize())).toBe(
      'new xjslt.NodeTextFeature(xjslt.selfNode, "hello")',
    );
  });

  test("NodeAttributeFeature", () => {
    expect(
      generate(
        new NodeAttributeFeature(selfNode, {
          name: "class",
          value: "foo",
        }).serialize(),
      ),
    ).toBe(
      'new xjslt.NodeAttributeFeature(xjslt.selfNode, {\n  "name": "class",\n  "value": "foo"\n})',
    );
  });

  test("NodeNameFeature(parentNode)", () => {
    expect(generate(new NodeNameFeature(parentNode, "div").serialize())).toBe(
      'new xjslt.NodeNameFeature(xjslt.parentNode, "div")',
    );
  });
});
