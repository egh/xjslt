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
  xpathToFeatures,
  NodeNameFeature,
  NamespaceFeature,
  AttributeFeature,
  NodeTextFeature,
  XMLFeature,
  NodeTypeFeature,
} from "../src/dt-xml";

import type { Rule, RuleTreeNode } from "../src/definitions";
import { buildRuleTree, findMatchingRules } from "../src/dt";
import * as slimdom from "slimdom";
import { generate } from "astring";

const NS = "http://example.com/ns";
const noNs = (_prefix: string) => null;
const withNs = (prefix: string) => (prefix === "ns" ? NS : null);

describe("xpathToFeatures", () => {
  describe("supported patterns", () => {
    test("element name", () => {
      expect(xpathToFeatures("div", noNs)).toEqual([
        new NodeTypeFeature(slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature("div"),
      ]);
    });

    test("wildcard * yields single node type feature", () => {
      expect(xpathToFeatures("*", noNs)).toEqual([
        new NodeTypeFeature(slimdom.Node.ELEMENT_NODE),
      ]);
    });

    test("element with attribute predicate", () => {
      expect(xpathToFeatures('div[@class="foo"]', noNs)).toEqual([
        new NodeTypeFeature(slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature("div"),
        new AttributeFeature({ name: "class", value: "foo" }),
      ]);
    });

    test("element with multiple attribute predicates", () => {
      expect(xpathToFeatures('div[@class="foo" and @id="bar"]', noNs)).toEqual([
        new NodeTypeFeature(slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature("div"),
        new AttributeFeature({ name: "class", value: "foo" }),
        new AttributeFeature({ name: "id", value: "bar" }),
      ]);
    });

    test("namespace-prefixed element", () => {
      expect(xpathToFeatures("ns:p", withNs)).toEqual([
        new NodeTypeFeature(slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature("p"),
        new NamespaceFeature(NS),
      ]);
    });

    test("namespace-prefixed element with attribute predicate", () => {
      expect(xpathToFeatures('ns:p[@id="x"]', withNs)).toEqual([
        new NodeTypeFeature(slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature("p"),
        new NamespaceFeature(NS),
        new AttributeFeature({ name: "id", value: "x" }),
      ]);
    });

    test("Q{uri} namespace syntax", () => {
      expect(xpathToFeatures(`Q{${NS}}div`, noNs)).toEqual([
        new NodeTypeFeature(slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature("div"),
        new NamespaceFeature(NS),
      ]);
    });

    test("namespace wildcard ns:*", () => {
      expect(xpathToFeatures("ns:*", withNs)).toEqual([
        new NodeTypeFeature(slimdom.Node.ELEMENT_NODE),
        new NamespaceFeature(NS),
      ]);
    });

    test("descendant shorthand //elem", () => {
      expect(xpathToFeatures("//div", noNs)).toEqual([
        new NodeTypeFeature(slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature("div"),
      ]);
    });

    test("descendant shorthand with namespace //ns:elem", () => {
      expect(xpathToFeatures("//ns:p", withNs)).toEqual([
        new NodeTypeFeature(slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature("p"),
        new NamespaceFeature(NS),
      ]);
    });

    test("context item text predicate [.='value']", () => {
      expect(xpathToFeatures('div[.="hello"]', noNs)).toEqual([
        new NodeTypeFeature(slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature("div"),
        new NodeTextFeature("hello"),
      ]);
    });

    test("text() predicate [text()='value']", () => {
      expect(xpathToFeatures('div[text()="hello"]', noNs)).toEqual([
        new NodeTypeFeature(slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature("div"),
        new NodeTextFeature("hello"),
      ]);
    });

    test("text predicate combined with attribute predicate", () => {
      expect(xpathToFeatures('div[@class="foo"][.="hello"]', noNs)).toEqual([
        new NodeTypeFeature(slimdom.Node.ELEMENT_NODE),
        new NodeNameFeature("div"),
        new AttributeFeature({ name: "class", value: "foo" }),
        new NodeTextFeature("hello"),
      ]);
    });

    test("child predicate with wildcard parent", () => {
      expect(xpathToFeatures("*[foo]", noNs)).toEqual(undefined);
    });
  });

  describe("unsupported patterns return undefined", () => {
    test("union a|b", () => {
      expect(xpathToFeatures("a|b", noNs)).toBeUndefined();
    });

    test("position predicate [1]", () => {
      expect(xpathToFeatures("div[1]", noNs)).toBeUndefined();
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

    test("multi-step path div/span", () => {
      expect(xpathToFeatures("div/span", noNs)).toBeUndefined();
    });

    test("or expression", () => {
      expect(
        xpathToFeatures("span[@foo='foo' or @foo='bar']", noNs),
      ).toBeUndefined();
    });

    test("text() node test", () => {
      expect(xpathToFeatures("text()", noNs)).toBeUndefined();
    });

    test("node() node test", () => {
      expect(xpathToFeatures("node()", noNs)).toBeUndefined();
    });

    test("comment() node test", () => {
      expect(xpathToFeatures("comment()", noNs)).toBeUndefined();
    });

    test("attribute axis @attr", () => {
      expect(xpathToFeatures("@class", noNs)).toBeUndefined();
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
    expect(findMatchingRules(tree, el)).toEqual([
      "span with class=highlight",
      "* with class=highlight",
    ]);
  });

  test("div with class=highlight matches div rule, div class rule, and wildcard class rule", () => {
    const el = doc.createElement("div");
    el.setAttribute("class", "highlight");
    expect(findMatchingRules(tree, el)).toEqual([
      "div elements",
      "div with class=highlight",
      "* with class=highlight",
    ]);
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
    expect(findMatchingRules(tree, el)).toEqual([
      "div elements",
      'elements with text "hello"',
    ]);
  });

  test("p in ns matches ns namespace rule then p-in-ns rule", () => {
    // createElementNS with unqualified name so nodeName === localName === "p"
    const el = doc.createElementNS(NS, "p");
    expect(findMatchingRules(tree, el)).toEqual([
      "ns namespace elements",
      "p elements in ns",
    ]);
  });

  test("unrelated element matches no rules", () => {
    const el = doc.createElement("article");
    expect(findMatchingRules(tree, el)).toEqual([]);
  });
});

describe("serialize", () => {
  test("NodeNameFeature", () => {
    expect(generate(new NodeNameFeature("div").serialize())).toBe(
      'new xjslt.NodeNameFeature("div")',
    );
  });

  test("NamespaceFeature", () => {
    expect(
      generate(new NamespaceFeature("http://example.com").serialize()),
    ).toBe('new xjslt.NamespaceFeature("http://example.com")');
  });

  test("NodeTextFeature", () => {
    expect(generate(new NodeTextFeature("hello").serialize())).toBe(
      'new xjslt.NodeTextFeature("hello")',
    );
  });

  test("AttributeFeature", () => {
    expect(
      generate(
        new AttributeFeature({ name: "class", value: "foo" }).serialize(),
      ),
    ).toBe(
      'new xjslt.AttributeFeature({\n  "name": "class",\n  "value": "foo"\n})',
    );
  });
});
