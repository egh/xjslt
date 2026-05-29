(() => {
  var e = {
      146(e, t, n) {
        (n(898), n(594));
        let r = n(821);
        function o(e, t) {
          t = r.setParamDefaults(e, t);
          let n = new Map();
          n.set("#default", { document: t.outputDocument });
          let o = new Map(),
            a = new Map(),
            s = new Map(),
            i = {
              outputDocument: t.outputDocument,
              append: r.mkNodeAppender(t.outputNode),
              resultDocuments: n,
              contextItem: e,
              contextList: [e],
              position: 1,
              mode: t.initialMode,
              templates: [
                {
                  apply: (e) => {},
                  allowedParams: [],
                  modes: ["#all"],
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  importPrecedence: 17976931348623157e292,
                  declarationOrder: 5e-324,
                },
                {
                  apply: (e) => {
                    r.valueOf(e, {
                      select: ".",
                      separator: void 0,
                      namespaces: {
                        xsl: "http://www.w3.org/1999/XSL/Transform",
                      },
                    });
                  },
                  allowedParams: [],
                  modes: ["#all"],
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  importPrecedence: 17976931348623157e292,
                  declarationOrder: 5e-324,
                },
                {
                  apply: (e) => {
                    r.applyTemplates(e, {
                      select: "child::node()",
                      params: [],
                      mode: "#current",
                      namespaces: {
                        xsl: "http://www.w3.org/1999/XSL/Transform",
                      },
                      sortKeyComponents: [],
                    });
                  },
                  allowedParams: [],
                  modes: ["#all"],
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  importPrecedence: 17976931348623157e292,
                  declarationOrder: 5e-324,
                },
                {
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (e) => {
                    r.copy(
                      e,
                      {
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                      },
                      (e) => {
                        r.applyTemplates(e, {
                          select: "@* | node()",
                          mode: "#default",
                          params: [],
                          sortKeyComponents: [],
                          namespaces: {
                            xsl: "http://www.w3.org/1999/XSL/Transform",
                          },
                        });
                      },
                    );
                  },
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  priority: -0.25,
                  declarationOrder: 1,
                  importPrecedence: 1,
                },
                {
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (e) => {
                    (r.variable(e, {
                      name: "parent-name",
                      content: "local-name(..)",
                      namespaces: {
                        xsl: "http://www.w3.org/1999/XSL/Transform",
                      },
                      as: void 0,
                    }),
                      r.variable(e, {
                        name: "ns-correct",
                        content:
                          "namespace-uri(..) = 'http://www.w3.org/1999/XSL/Transform'",
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                        as: void 0,
                      }),
                      r.variable(e, {
                        name: "nearest-preserve",
                        content: "./ancestor::*[@xml:space = 'preserve']",
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                        as: void 0,
                      }),
                      r.variable(e, {
                        name: "nearest-default",
                        content: "./ancestor::*[@xml:space = 'default']",
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                        as: void 0,
                      }),
                      r.choose(e, [
                        {
                          test: "$ns-correct and $parent-name = 'text'",
                          apply: (e) => {
                            r.copy(
                              e,
                              {
                                namespaces: {
                                  xsl: "http://www.w3.org/1999/XSL/Transform",
                                },
                              },
                              (e) => {},
                            );
                          },
                        },
                        {
                          test: "$parent-name = ('analyze-string', 'apply-imports', 'apply-templates', 'attribute-set', 'call-template', 'character-map', 'choose', 'next-match', 'stylesheet', 'transform')",
                          apply: (e) => {},
                        },
                        {
                          test: "$nearest-preserve and not($nearest-default)",
                          apply: (e) => {
                            r.copy(
                              e,
                              {
                                namespaces: {
                                  xsl: "http://www.w3.org/1999/XSL/Transform",
                                },
                              },
                              (e) => {},
                            );
                          },
                        },
                        {
                          test: "$nearest-preserve and $nearest-default and not($nearest-default = $nearest-preserve//*)",
                          apply: (e) => {
                            r.copy(
                              e,
                              {
                                namespaces: {
                                  xsl: "http://www.w3.org/1999/XSL/Transform",
                                },
                              },
                              (e) => {},
                            );
                          },
                        },
                        { apply: (e) => {} },
                      ]));
                  },
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  priority: 1,
                  declarationOrder: 2,
                  importPrecedence: 1,
                },
              ],
              nonRuleTemplateIndexes: [
                [
                  {
                    xpath: "text()[matches(., '^[\\s\\t\\n\\r]+$')]",
                    compiled: void 0,
                  },
                  4,
                ],
                [
                  {
                    xpath: "node()",
                    compiled: r.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0);\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1)) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(!!contextItem1.nodeType)) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  3,
                ],
              ],
              namedTemplates: new Map([]),
              variableScopes: [new Map()],
              inputURL: t.inputURL,
              ruleTree: {
                feature: new r.NodeTypeFeature(r.selfNode, 7),
                results: [],
                left: { results: [0] },
                right: {
                  feature: new r.NodeTypeFeature(r.selfNode, 8),
                  results: [],
                  left: { results: [0] },
                  right: {
                    feature: new r.NodeTypeFeature(r.selfNode, 3),
                    results: [],
                    left: { results: [1] },
                    right: {
                      feature: new r.NodeTypeFeature(r.selfNode, 2),
                      results: [],
                      left: { results: [1, 3] },
                      right: {
                        feature: new r.NodeTypeFeature(r.selfNode, 1),
                        results: [],
                        left: { results: [2] },
                        right: {
                          feature: new r.NodeTypeFeature(r.selfNode, 9),
                          results: [],
                          left: { results: [2, 3] },
                        },
                      },
                    },
                  },
                },
              },
              keys: o,
              outputDefinitions: a,
              decimalFormats: s,
              patternMatchCache: new Map(),
              stylesheetParams: t.stylesheetParams,
            };
          return (
            r.initialize(i, { xsl: "http://www.w3.org/1999/XSL/Transform" }),
            r.stripSpace(e, []),
            r.processNode(i, [], {
              xsl: "http://www.w3.org/1999/XSL/Transform",
            }),
            n
          );
        }
        ((e.exports.transform = o), (global.transform = o));
      },
      712(e, t, n) {
        "use strict";
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.Feature =
            t.DEFAULT_DECIMAL_FORMAT =
            t.NodeType =
            t.DEFAULT_PRIORITIES =
            t.XJSLT_NSURI =
            t.XPATH_NSURI =
            t.XMLNS_NSURI =
            t.XSLT1_NSURI =
              void 0),
          (t.isNodeGroup = c),
          (t.isNodeGroupArray = function (e) {
            return Array.isArray(e) && (0 === e.length || c(e[0]));
          }));
        const r = n(953),
          o = String.raw`[^,:\(\)\*\[\]/]`,
          a = String.raw`(child::|attribute::|@)?`,
          s = String.raw`(document-node\()?`;
        var i;
        function c(e) {
          return (
            "object" == typeof e &&
            null !== e &&
            "string" == typeof e.key &&
            Array.isArray(e.nodes)
          );
        }
        ((t.XSLT1_NSURI = "http://www.w3.org/1999/XSL/Transform"),
          (t.XMLNS_NSURI = "http://www.w3.org/2000/xmlns/"),
          (t.XPATH_NSURI = "http://www.w3.org/2005/xpath-functions"),
          (t.XJSLT_NSURI = "https://www.e6h.org/xjslt"),
          (t.DEFAULT_PRIORITIES = new Map([
            [new RegExp(String.raw`^\s*/\s*$`), -0.5],
            [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${s}${a}processing-instruction`), 0],
            [new RegExp(String.raw`^\s*${s}${a}element\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${s}${a}attribute\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${s}${a}element\(${o}+\)\)?\s*$`), 0],
            [
              new RegExp(String.raw`^\s*${s}${a}element\(\*,\s*${o}+\)\)?\s*$`),
              0,
            ],
            [new RegExp(String.raw`^\s*${s}${a}attribute\(${o}+\)\)?\s*$`), 0],
            [
              new RegExp(
                String.raw`^\s*${s}${a}attribute\(\*,\s*${o}+\)\)?\s*$`,
              ),
              0,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${a}element\(${o}+,\s*${o}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${a}attribute\(${o}+,\s*${o}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${a}schema-element\(${o}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${a}schema-attribute\(${o}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [new RegExp(String.raw`^\s*document-node\(\)\s*$`), -0.5],
            [
              new RegExp(
                String.raw`^\s*${a}(node\(\)|text\(\)|comment\(\))\s*$`,
              ),
              -0.5,
            ],
            [new RegExp(String.raw`^\s*${a}(${o}:)?\*\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${a}\*:${o}+\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${a}${o}+\s*$`), 0],
          ])),
          (function (e) {
            ((e[(e.ELEMENT = 1)] = "ELEMENT"),
              (e[(e.ATTRIBUTE = 2)] = "ATTRIBUTE"),
              (e[(e.TEXT = 3)] = "TEXT"),
              (e[(e.CDATA_SECTION = 4)] = "CDATA_SECTION"),
              (e[(e.ENTITY_REFERENCE = 5)] = "ENTITY_REFERENCE"),
              (e[(e.ENTITY = 6)] = "ENTITY"),
              (e[(e.PROCESSING_INSTRUCTION = 7)] = "PROCESSING_INSTRUCTION"),
              (e[(e.COMMENT = 8)] = "COMMENT"),
              (e[(e.DOCUMENT = 9)] = "DOCUMENT"),
              (e[(e.DOCUMENT_TYPE = 10)] = "DOCUMENT_TYPE"),
              (e[(e.DOCUMENT_FRAGMENT = 11)] = "DOCUMENT_FRAGMENT"),
              (e[(e.NOTATION = 12)] = "NOTATION"));
          })(i || (t.NodeType = i = {})),
          (t.DEFAULT_DECIMAL_FORMAT = {
            decimalSeparator: ".",
            digit: "#",
            groupingSeparator: ",",
            infinity: "Infinity",
            minusSign: "-",
            nan: "NaN",
            patternSeparator: ";",
            percent: "%",
            perMille: "‰",
            zeroDigit: "0",
          }),
          (t.Feature = class {
            constructor(e) {
              this.value = e;
            }
            serialize() {
              return (0, r.mkNew)(
                (0, r.mkMember)("xjslt", this.constructor.name),
                [(0, r.toEstree)(this.value)],
              );
            }
            equals(e) {
              return (
                this.constructor === e.constructor && this.value === e.value
              );
            }
          }));
      },
      320(e, t, n) {
        "use strict";
        var r,
          o =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, n, r) {
                  void 0 === r && (r = n);
                  var o = Object.getOwnPropertyDescriptor(t, n);
                  ((o &&
                    !("get" in o
                      ? !t.__esModule
                      : o.writable || o.configurable)) ||
                    (o = {
                      enumerable: !0,
                      get: function () {
                        return t[n];
                      },
                    }),
                    Object.defineProperty(e, r, o));
                }
              : function (e, t, n, r) {
                  (void 0 === r && (r = n), (e[r] = t[n]));
                }),
          a =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          s =
            (this && this.__importStar) ||
            ((r = function (e) {
              return (
                (r =
                  Object.getOwnPropertyNames ||
                  function (e) {
                    var t = [];
                    for (var n in e)
                      Object.prototype.hasOwnProperty.call(e, n) &&
                        (t[t.length] = n);
                    return t;
                  }),
                r(e)
              );
            }),
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var n = r(e), s = 0; s < n.length; s++)
                  "default" !== n[s] && o(t, e, n[s]);
              return (a(t, e), t);
            });
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.NodeAttributeFeature =
            t.NodeTextFeature =
            t.NodeNameFeature =
            t.NodeTypeFeature =
            t.NodeNamespaceFeature =
              void 0),
          (t.selfNode = m),
          (t.parentNode = d),
          (t.grandParentNode = f),
          (t.greatGrandParentNode = g),
          (t.xpathToFeatures = function (e, t) {
            if (e)
              return (function (e, t) {
                const n = [];
                try {
                  return (O(e, n, t), n);
                } catch (e) {
                  return;
                }
              })(
                (0, u.parseScript)(
                  e,
                  { language: u.evaluateXPath.XPATH_3_1_LANGUAGE },
                  new l.Document(),
                ),
                t,
              );
          }));
        const i = n(953),
          c = n(712),
          u = n(594),
          l = s(n(898)),
          p = "http://www.w3.org/2005/XQueryX";
        function m(e) {
          return e;
        }
        function d(e) {
          return e.parentNode || void 0;
        }
        function f(e) {
          var t;
          return (
            (null === (t = e.parentNode) || void 0 === t
              ? void 0
              : t.parentNode) || void 0
          );
        }
        function g(e) {
          var t, n;
          return (
            (null ===
              (n =
                null === (t = e.parentNode) || void 0 === t
                  ? void 0
                  : t.parentNode) || void 0 === n
              ? void 0
              : n.parentNode) || void 0
          );
        }
        class h extends c.Feature {
          constructor(e, t) {
            (super(t), (this.nodeExtractor = e));
          }
          serialize() {
            return (0, i.mkNew)(
              (0, i.mkMember)("xjslt", this.constructor.name),
              [
                (0, i.toEstree)(this.nodeExtractor),
                (0, i.toEstree)(this.value),
              ],
            );
          }
          equals(e) {
            return this.nodeExtractor === e.nodeExtractor && super.equals(e);
          }
        }
        class v extends h {
          matches(e) {
            var t;
            return (
              (null === (t = this.nodeExtractor(e)) || void 0 === t
                ? void 0
                : t.nodeType) === l.Node.ELEMENT_NODE &&
              e.namespaceURI === this.value
            );
          }
        }
        t.NodeNamespaceFeature = v;
        class N extends h {
          matches(e) {
            var t;
            return (
              (null === (t = this.nodeExtractor(e)) || void 0 === t
                ? void 0
                : t.nodeType) === this.value
            );
          }
        }
        t.NodeTypeFeature = N;
        class x extends h {
          matches(e) {
            var t;
            return (
              (null === (t = this.nodeExtractor(e)) || void 0 === t
                ? void 0
                : t.nodeName) === this.value
            );
          }
        }
        t.NodeNameFeature = x;
        class w extends h {
          matches(e) {
            var t;
            return (
              (null === (t = this.nodeExtractor(e)) || void 0 === t
                ? void 0
                : t.textContent) === this.value
            );
          }
        }
        t.NodeTextFeature = w;
        class y extends h {
          matches(e) {
            const t = this.nodeExtractor(e);
            return (
              t.nodeType === l.Node.ELEMENT_NODE &&
              t.getAttribute(this.value.name) === this.value.value
            );
          }
        }
        function b(e) {
          return (
            (function (e) {
              return 1 === e.nodeType;
            })(e) && e.namespaceURI === p
          );
        }
        function T(e, t) {
          return b(e) && e.localName === t;
        }
        function S(e, t) {
          for (const n of e.childNodes) if (T(n, t)) return n;
        }
        function R(e, t, n) {
          for (const r of e.childNodes) {
            if (!b(r)) continue;
            if (T(r, t) && (!n || n(r))) return r;
            const e = R(r, t, n);
            if (e) return e;
          }
        }
        t.NodeAttributeFeature = y;
        class E extends Error {}
        function O(e, t, n) {
          if (!b(e)) return;
          const r = e.localName;
          if ("module" === r || "mainModule" === r || "queryBody" === r)
            for (const r of e.childNodes) O(r, t, n);
          else {
            if ("pathExpr" !== r) throw new E();
            {
              const r = e.childNodes.filter((e) => T(e, "stepExpr"));
              if (T(e.firstChild, "rootExpr")) {
                if (0 === r.length)
                  return void t.push(new N(m, l.Node.DOCUMENT_NODE));
                if (
                  "descendant-or-self" !==
                    (null === (a = S((o = r[0]), "xpathAxis")) || void 0 === a
                      ? void 0
                      : a.textContent) ||
                  !S(o, "anyKindTest")
                )
                  throw new E();
                r.shift();
              }
              if (0 === r.length) throw new E();
              const s = r.reverse();
              if (0 == s.length || s.length > 4) throw new E();
              (P(m, s[0], t, n),
                s[1] && P(d, s[1], t, n),
                s[2] && P(f, s[2], t, n),
                s[3] && P(g, s[3], t, n));
            }
          }
          var o, a;
        }
        function $(e, t, n) {
          "attribute" === t
            ? n.push(new N(e, l.Node.ATTRIBUTE_NODE))
            : n.push(new N(e, l.Node.ELEMENT_NODE));
        }
        function P(e, t, n, r) {
          var o, a;
          const s =
            null === (o = S(t, "xpathAxis")) || void 0 === o
              ? void 0
              : o.textContent;
          if ("child" !== s && "attribute" !== s)
            throw new E(`unsupported axis: ${s}`);
          for (const o of t.childNodes.slice(1)) {
            if (!b(o)) continue;
            const i = o.localName;
            if ("nameTest" === i) (I(e, t, n, r), $(e, s, n));
            else if ("Wildcard" === i) {
              const t = S(o, "NCName");
              if (t) {
                const o =
                  null == r
                    ? void 0
                    : r(null !== (a = t.textContent) && void 0 !== a ? a : "");
                if (!o) throw new E(`unresolved ns prefix: ${o}`);
                n.push(new v(e, o));
              }
              $(e, s, n);
            } else if ("piTest" === i) {
              n.push(new N(e, l.Node.PROCESSING_INSTRUCTION_NODE));
              const t = S(o, "piTarget");
              (null == t ? void 0 : t.textContent) &&
                n.push(new x(e, t.textContent));
            } else if ("commentTest" === i)
              n.push(new N(e, l.Node.COMMENT_NODE));
            else if ("textTest" === i) n.push(new N(e, l.Node.TEXT_NODE));
            else {
              if ("predicates" !== i) throw new E();
              C(e, o, n, r);
            }
          }
        }
        function I(e, t, n, r) {
          const o = S(t, "nameTest");
          if (!o) throw new E();
          const a = o.textContent;
          a && n.push(new x(e, a));
          const s = o.getAttributeNS(p, "prefix");
          if (s) {
            const t = null == r ? void 0 : r(s);
            if (!t) throw new E(`unresolved ns prefix: ${t}`);
            n.push(new v(e, t));
          }
          const i = o.getAttributeNS(p, "URI");
          i && n.push(new v(e, i));
        }
        function C(e, t, n, r) {
          for (const o of t.childNodes) {
            if (!b(o)) throw new E();
            const t = o.localName;
            if ("equalOp" === t) {
              const t = S(o, "firstOperand"),
                r = S(o, "secondOperand");
              if (!t || !r) throw new E();
              const a = D(e, t, r) || D(e, r, t);
              if (!a) throw new E();
              n.push(a);
            } else {
              if ("andOp" !== t) throw new E();
              (C(e, S(o, "firstOperand"), n, r),
                C(e, S(o, "secondOperand"), n, r));
            }
          }
        }
        function D(e, t, n) {
          var r, o;
          const a = R(n, "value");
          if (!a) return;
          const s = null !== (r = a.textContent) && void 0 !== r ? r : "",
            i = R(t, "stepExpr", (e) => {
              var t;
              return (
                "attribute" ===
                (null === (t = S(e, "xpathAxis")) || void 0 === t
                  ? void 0
                  : t.textContent)
              );
            });
          if (i) {
            const t =
              null === (o = S(i, "nameTest")) || void 0 === o
                ? void 0
                : o.textContent;
            if (!t) return;
            return new y(e, { name: t, value: s });
          }
          return S(t, "contextItemExpr") || R(t, "textTest")
            ? new w(e, s)
            : void 0;
        }
      },
      324(e, t) {
        "use strict";
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.buildRuleTree = function e(t) {
            if (0 === t.length) return { results: [] };
            const n = new Set();
            for (const e of t) for (const t of e.features) n.add(t);
            if (0 === n.size) return { results: t.map((e) => e.result) };
            const r = Array.from(n)[0],
              o = [],
              a = [];
            for (const e of t)
              e.features.some((e) => e.equals(r)) ? o.push(e) : a.push(e);
            let s = { feature: r, results: [] };
            if (o.length > 0) {
              const t = o.map((e) =>
                Object.assign(Object.assign({}, e), {
                  features: e.features.filter((e) => !e.equals(r)),
                }),
              );
              s.left = e(t.filter((e) => e.features.length > 0));
              const n = o.filter((e, n) => 0 === t[n].features.length);
              n.length > 0 &&
                (s.left || (s.left = { results: [] }),
                (s.left.results = n.map((e) => e.result)));
            }
            return (a.length > 0 && (s.right = e(a)), s);
          }),
          (t.findMatchingRules = function (e, t) {
            const n = [],
              r = [e];
            for (; r.length > 0; ) {
              const e = r.pop();
              e &&
                (n.push(...e.results),
                e.feature &&
                  (e.right && r.push(e.right),
                  e.feature.matches(t) && e.left && r.push(e.left)));
            }
            return n;
          }));
      },
      953(e, t) {
        "use strict";
        function n(e, t) {
          return {
            type: "ExpressionStatement",
            expression: {
              type: "CallExpression",
              callee: e,
              arguments: t,
              optional: !1,
            },
          };
        }
        function r(e) {
          return { type: "Identifier", name: e };
        }
        function o(e) {
          return { type: "Literal", value: (e = e ?? void 0) };
        }
        function a(e, t) {
          return {
            type: "MemberExpression",
            object: r(e),
            property: r(t),
            computed: !1,
            optional: !1,
          };
        }
        function s(e, t) {
          return (
            t || (t = e),
            {
              type: "VariableDeclaration",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: r(e),
                  init: {
                    type: "CallExpression",
                    callee: r("require"),
                    arguments: [o(t)],
                    optional: !1,
                  },
                },
              ],
              kind: "let",
            }
          );
        }
        function i(e) {
          return { type: "ArrayExpression", elements: e };
        }
        function c(e, t, n) {
          return {
            type: "VariableDeclaration",
            declarations: [{ type: "VariableDeclarator", id: e, init: t }],
            kind: n,
          };
        }
        function u(e, t) {
          return { type: "NewExpression", callee: e, arguments: t };
        }
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.mkArrowFun = function (e) {
            return {
              type: "ArrowFunctionExpression",
              expression: !1,
              generator: !1,
              async: !1,
              params: [r("context")],
              body: { type: "BlockStatement", body: e },
            };
          }),
          (t.mkFun = function (e, t, n) {
            return {
              type: "FunctionDeclaration",
              id: e,
              generator: !1,
              async: !1,
              params: t,
              body: n,
            };
          }),
          (t.mkCall = n),
          (t.mkCallWithContext = function (e, t) {
            return n(e, [r("context"), ...t]);
          }),
          (t.mkIdentifier = r),
          (t.mkImports = function () {
            return [
              {
                type: "ImportDeclaration",
                attributes: [],
                specifiers: [
                  { type: "ImportNamespaceSpecifier", local: r("slimdom") },
                ],
                source: o("slimdom"),
              },
              {
                type: "ImportDeclaration",
                attributes: [],
                specifiers: [
                  {
                    type: "ImportSpecifier",
                    imported: r("evaluateXPathToString"),
                    local: r("evaluateXPathToString"),
                  },
                ],
                source: o("fontoxpath"),
              },
            ];
          }),
          (t.mkImportsNode = function () {
            return [s("slimdom"), s("fontoxpath"), s("xjslt", "xjslt")];
          }),
          (t.mkLiteral = o),
          (t.mkMember = a),
          (t.mkObject = function (e) {
            let t = [];
            for (let n in e)
              t.push({
                type: "Property",
                method: !1,
                shorthand: !1,
                computed: !1,
                key: o(n),
                value: e[n],
                kind: "init",
              });
            return { type: "ObjectExpression", properties: t };
          }),
          (t.mkRequire = s),
          (t.mkArray = i),
          (t.mkReturn = function (e) {
            return { type: "ReturnStatement", argument: e };
          }),
          (t.mkBlock = function (e) {
            return { type: "BlockStatement", body: e };
          }),
          (t.mkLet = function (e, t) {
            return c(e, t, "let");
          }),
          (t.mkConst = function (e, t) {
            return c(e, t, "const");
          }),
          (t.mkVariableDeclaration = c),
          (t.mkNew = u),
          (t.toEstree = function e(t) {
            const n = typeof t;
            return null == t ||
              "string" === n ||
              "number" === n ||
              "boolean" === n
              ? o(t)
              : Array.isArray(t)
                ? i(t.map((t) => e(t)))
                : "function" == typeof t.serialize
                  ? t.serialize()
                  : "function" === n
                    ? a("xjslt", t.name)
                    : "object" === n
                      ? t instanceof Map
                        ? u(r("Map"), [e(Array.from(t.entries()))])
                        : "type" in t
                          ? t
                          : (function (t) {
                              let n = [];
                              for (let r in t)
                                n.push({
                                  type: "Property",
                                  method: !1,
                                  shorthand: !1,
                                  computed: !1,
                                  key: e(r),
                                  value: e(t[r]),
                                  kind: "init",
                                });
                              return {
                                type: "ObjectExpression",
                                properties: n,
                              };
                            })(t)
                      : void 0;
          }));
      },
      379(e, t, n) {
        "use strict";
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.functionNameResolver = b),
          (t.registerFunctions = function () {
            ((0, r.registerCustomXPathFunction)(
              { namespaceURI: o.XJSLT_NSURI, localName: "current" },
              [],
              "item()",
              i,
            ),
              (0, r.registerCustomXPathFunction)(
                {
                  namespaceURI: o.XJSLT_NSURI,
                  localName: "current-output-uri",
                },
                [],
                "xs:string",
                d,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "doc" },
                ["xs:string"],
                "document-node()",
                c,
              ),
              (0, r.registerCustomXPathFunction)(
                {
                  namespaceURI: o.XJSLT_NSURI,
                  localName: "current-grouping-key",
                },
                [],
                "xs:string?",
                u,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "current-group" },
                [],
                "item()*",
                l,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "positionx" },
                [],
                "xs:integer",
                p,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "lastx" },
                [],
                "xs:integer",
                m,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "key" },
                ["xs:string", "item()*"],
                "node()*",
                f,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "system-property" },
                ["xs:string"],
                "xs:string",
                v,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "base-uri" },
                [],
                "xs:string?",
                N,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "base-uri" },
                ["node()?"],
                "xs:string?",
                N,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "evaluate" },
                ["xs:string"],
                "item()",
                (e, t) =>
                  (function ({ currentContext: e }, t) {
                    const n = (0, r.evaluateXPath)(
                      t,
                      void 0,
                      void 0,
                      void 0,
                      r.evaluateXPath.ALL_RESULTS_TYPE,
                      {
                        currentContext: { currentContext: e },
                        functionNameResolver: b,
                      },
                    );
                    return 1 === n.length ? n[0] : n;
                  })(e, t),
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "normalize-unicode" },
                ["xs:string?"],
                "xs:string",
                (e, t) => x(0, t, "NFC"),
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "normalize-unicode" },
                ["xs:string?", "xs:string"],
                "xs:string",
                x,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "element-available" },
                ["xs:string"],
                "xs:boolean",
                h,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "format-number" },
                ["xs:numeric", "xs:string"],
                "xs:string",
                w,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "format-number" },
                ["xs:numeric", "xs:string", "xs:string"],
                "xs:string",
                w,
              ));
          }));
        const r = n(594),
          o = n(712),
          a = n(845),
          s = n(472);
        function i({ currentContext: e }) {
          return e.contextItem;
        }
        function c({ currentContext: e }, t) {
          return (0, s.urlToDom)(e, t);
        }
        function u({ currentContext: e }) {
          return e.currentGroup.key;
        }
        function l({ currentContext: e }) {
          return e.currentGroup.nodes;
        }
        function p({ currentContext: e }) {
          return e.position;
        }
        function m({ currentContext: e }) {
          return e.contextList.length;
        }
        function d({ currentContext: e }) {
          for (const [t, n] of e.resultDocuments)
            if (n === e.outputDocument) return t;
          return "#default";
        }
        function f({ currentContext: e }, t, n) {
          const {
            keys: r,
            contextItem: o,
            variableScopes: a,
            patternMatchCache: s,
          } = e;
          if (!r.has(t)) throw new Error("XTDE1260");
          return r.get(t).lookup(s, o.ownerDocument, a, n) || [];
        }
        const g = new Set([
          "apply-imports",
          "apply-templates",
          "attribute",
          "call-template",
          "choose",
          "comment",
          "copy",
          "copy-of",
          "document",
          "element",
          "for-each",
          "for-each-group",
          "if",
          "message",
          "namespace",
          "next-match",
          "number",
          "perform-sort",
          "processing-instruction",
          "result-document",
          "sequence",
          "sort",
          "text",
          "value-of",
          "variable",
        ]);
        function h(e, t) {
          const [n, r] = t.split(":");
          return !(!n || !r) && g.has(r);
        }
        function v(e, t) {
          return "version" === t.split(":")[1]
            ? "2.0"
            : "vendor" === t.split(":")[1]
              ? "xjslt"
              : "vendor-url" === t.split(":")[1]
                ? "https://github.com/egh/xjslt"
                : "product-name" === t.split(":")[1]
                  ? "xjslt"
                  : "product-version" === t.split(":")[1]
                    ? "0.1"
                    : "supports-backwards-compatibility" === t.split(":")[1] ||
                        "is-schema-aware" === t.split(":")[1] ||
                        "supports-serialization" === t.split(":")[1] ||
                        "supports-backwards-compatibility" === t.split(":")[1]
                      ? "no"
                      : "";
        }
        function N({ currentContext: e }, t) {
          const n = void 0 !== t ? t : e.contextItem;
          if (!n) return null;
          let r = n;
          const o = [];
          for (; r; ) {
            const e =
              1 === r.nodeType
                ? r.getAttributeNS(
                    "http://www.w3.org/XML/1998/namespace",
                    "base",
                  )
                : null;
            (e && o.unshift(e), (r = r.parentNode));
          }
          let a = e.inputURL || void 0;
          for (const e of o) a = new URL(e, a) || e;
          return a;
        }
        function x(e, t, n) {
          if (null == t) return "";
          const r = n.toUpperCase().replace("-", "");
          if (!["NFC", "NFD", "NFKC", "NFKD"].includes(r))
            throw new Error("FOCH0003: Normalization form not supported.");
          return t.normalize(r);
        }
        function w({ currentContext: e }, t, n, r) {
          var s, i;
          const c = r || "#default",
            u =
              null !==
                (i =
                  null === (s = e.decimalFormats) || void 0 === s
                    ? void 0
                    : s.get(c)) && void 0 !== i
                ? i
                : o.DEFAULT_DECIMAL_FORMAT;
          return (0, a.formatNumberWithPicture)(t, n, u);
        }
        const y = [
          "base-uri",
          "current",
          "current-group",
          "current-grouping-key",
          "current-output-uri",
          "doc",
          "element-available",
          "format-number",
          "key",
          "lastx",
          "normalize-unicode",
          "positionx",
          "system-property",
        ];
        function b({ prefix: e, localName: t }, n) {
          return (e && "fn" !== e) || !y.includes(t)
            ? null
            : { namespaceURI: o.XJSLT_NSURI, localName: t };
        }
      },
      845(e, t, n) {
        "use strict";
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.toAlphabeticUpper = t.toAlphabetic = void 0),
          (t.groupNumeric = s),
          (t.toNumeric = i),
          (t.mkToAlphabetic = c),
          (t.toRoman = u),
          (t.formatWithToken = l),
          (t.formatNumber = function (e, t, n, r) {
            const o = [];
            t.prefix && o.push(t.prefix);
            for (let a = 0; a < e.length; a++) {
              const s = Math.min(a, t.formats.length - 1),
                i = t.formats[s];
              if (!i) throw new Error("No number format found");
              (i.separator && 0 !== a && o.push(i.separator),
                o.push(l(e[a], i.format, n, r)));
            }
            return (t.suffix && o.push(t.suffix), o.join(""));
          }),
          (t.remapDigits = m),
          (t.formatNumberWithPicture = function (e, t, n) {
            if (isNaN(e)) return n.nan;
            if (!isFinite(e)) return (e < 0 ? n.minusSign : "") + n.infinity;
            const a = t.split(n.patternSeparator);
            let c;
            if (e < 0)
              if (a.length > 1) c = p(a[1], n);
              else {
                const e = p(a[0], n);
                c = Object.assign(Object.assign({}, e), {
                  prefix: `${n.minusSign}${e.prefix || ""}`,
                });
              }
            else c = p(a[0], n);
            return (function (e, t, n) {
              var a;
              t.isPercent ? (e *= 100) : t.isPerMille && (e *= 1e3);
              const c = (0, r.evaluateXPathToNumber)(
                "round-half-to-even($number, $precision)",
                void 0,
                void 0,
                {
                  number: (0, o.wrapValue)(e, "xs:double"),
                  precision: (0, o.wrapValue)(t.decimalMaxDigits, "xs:integer"),
                },
              );
              let u = s(
                  i(Math.trunc(c), t.integerMinDigits),
                  n.groupingSeparator,
                  t.integerGroupSize,
                ),
                l =
                  null !== (a = c.toString().split(".")[1]) && void 0 !== a
                    ? a
                    : "";
              for (; l.length < t.decimalMinDigits; ) l += "0";
              const p = l.length > 0 ? n.decimalSeparator : "",
                d = n.zeroDigit.codePointAt(0);
              return (
                48 !== d && ((u = m(u, d)), (l = m(l, d))),
                `${t.prefix}${u}${p}${l}${t.suffix}`
              );
            })(Math.abs(e), c, n);
          }));
        const r = n(594),
          o = n(821),
          a = [
            49, 1633, 1777, 2407, 2535, 2663, 2791, 2919, 3047, 3175, 3303,
            3431, 3559, 3665, 3793, 3873, 4161, 4241, 6113, 6161, 6471, 6609,
            6785, 6801, 6993, 7089, 7233, 7249, 42529, 43217, 43265, 43473,
            43505, 43601, 44017, 65297, 66721, 68913, 69735, 69873, 69943,
            70097, 70385, 70737, 70865, 71249, 71361, 71473, 71905, 72785,
            73041, 73121, 92769, 93009, 120783, 120793, 120803, 120813, 120823,
            125265,
          ];
        function s(e, t, n) {
          if (!t || !n || e.length <= n) return e;
          const r = [];
          let o = e;
          for (; o.length > n; ) (r.unshift(o.slice(-n)), (o = o.slice(0, -n)));
          return (o && r.unshift(o), r.join(t));
        }
        function i(e, t) {
          return e.toString().padStart(t, "0");
        }
        function c(e, t) {
          const n = t - e + 1,
            r = [...Array(n)].map((t, n) => String.fromCodePoint(e + n));
          return function (e) {
            if (0 === e) return "0";
            let t = "",
              o = e;
            for (; o > 0; ) (o--, (t = r[o % n] + t), (o = Math.floor(o / n)));
            return t;
          };
        }
        function u(e) {
          const t = new Map([
            [1e3, "m"],
            [900, "cm"],
            [500, "d"],
            [400, "cd"],
            [100, "c"],
            [90, "xc"],
            [50, "l"],
            [40, "xl"],
            [10, "x"],
            [9, "ix"],
            [5, "v"],
            [4, "iv"],
            [1, "i"],
          ]);
          if (0 === e) return "0";
          let n = "",
            r = e;
          for (const [e, o] of t) for (; r >= e; ) ((n += o), (r -= e));
          return n;
        }
        function l(e, n, r, o) {
          if (isNaN(e) || !isFinite(e)) return "";
          if (/0*1/.test(n)) return s(i(e, n.length), r, o);
          if ("A" === n) return (0, t.toAlphabeticUpper)(e) || "";
          if ("a" === n) return (0, t.toAlphabetic)(e) || "";
          if ("I" === n) return u(e).toUpperCase();
          if ("i" === n) return u(e);
          for (const t of a) {
            if (49 === t) continue;
            const a = t - 1;
            if (
              new RegExp(
                `${String.fromCharCode(a)}*${String.fromCharCode(t)}`,
              ).test(n)
            )
              return s(m(i(e, n.length), a), r, o);
          }
          return s(i(e, n.length), r, o);
        }
        function p(e, t) {
          const n = t.zeroDigit,
            r = t.digit,
            o = t.decimalSeparator,
            a = t.groupingSeparator;
          let s = 0,
            i = !1,
            c = !1;
          function u() {
            if (i || c)
              throw new Error(
                "XTDE1310: Multiple percent/per-mille characters.",
              );
          }
          function l() {
            let a = "";
            for (; s < e.length && e[s] !== n && e[s] !== r && e[s] !== o; )
              (e[s] === t.percent && (u(), (i = !0)),
                e[s] === t.perMille && (u(), (c = !0)),
                (a += e[s++]));
            return a;
          }
          const p = l();
          let m,
            d = 0,
            f = 0,
            g = -1;
          for (; s < e.length && e[s] !== o; ) {
            const t = e[s];
            if (t === n) (d++, f++);
            else if (t === r) f++;
            else {
              if (t !== a) break;
              g = f;
            }
            s++;
          }
          g >= 0 && (m = f - g);
          let h = 0,
            v = 0;
          if (s < e.length && e[s] === o)
            for (s++; s < e.length; ) {
              const t = e[s];
              if (t === n) (h++, v++);
              else {
                if (t !== r) break;
                v++;
              }
              s++;
            }
          const N = l();
          if (s < e.length)
            throw new Error(
              `XTDE1310: Active characters after picture string suffix: ${e.slice(s)}`,
            );
          return {
            prefix: p,
            suffix: N,
            integerMinDigits: Math.max(d, 1),
            integerGroupSize: m,
            decimalMinDigits: h,
            decimalMaxDigits: v,
            isPercent: i,
            isPerMille: c,
          };
        }
        function m(e, t) {
          return [...e]
            .map((e) => {
              const n = e.codePointAt(0);
              return n >= 48 && n <= 57 ? String.fromCodePoint(t + n - 48) : e;
            })
            .join("");
        }
        ((t.toAlphabetic = c(97, 122)), (t.toAlphabeticUpper = c(65, 90)));
      },
      777(e, t) {
        "use strict";
        function n(e) {
          return "yes" === e;
        }
        function r(e) {
          return "omit" === e ? void 0 : "yes" === e;
        }
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.parseYesNo = n),
          (t.parseYesNoOmit = r),
          (t.isAlphanumeric = function (e) {
            return /^[\p{Nd}\p{Nl}\p{No}\p{Lu}\p{Ll}\p{Lt}\p{Lm}\p{Lo}]$/u.test(
              e,
            );
          }),
          (t.mkOutputDefinition = function (e) {
            return {
              omitXmlDeclaration: n(e.omitXmlDeclaration),
              standalone: r(e.standalone),
              doctypeSystem: e.doctypeSystem,
              doctypePublic: e.doctypePublic,
            };
          }),
          (t.mkResolver = function (e) {
            return (t) =>
              "" === t && "#xpath-default" in e
                ? e["#xpath-default"] || null
                : e[t];
          }),
          (t.determineNamespace = function (e, t, n) {
            let r = n;
            if (void 0 !== r) return [r, e];
            let o = "";
            return (
              e.includes(":") && ([o, e] = e.split(":")),
              (r = t(o)),
              [r, e]
            );
          }),
          (t.computeDefaultPriority = function e(t) {
            if (t && t.includes("|"))
              return Math.max(
                ...t
                  .split("|")
                  .filter((e) => "" !== e)
                  .map((t) => e(t)),
              );
            for (let [e, n] of i) if (e.test(t)) return n;
            return 0.5;
          }),
          (t.compareSortable = c),
          (t.sortSortable = function (e) {
            return e.sort(c);
          }),
          (t.zip = function (e, t) {
            if (void 0 === e || void 0 === t) return [];
            const n = Math.min(e.length, t.length);
            return e.slice(0, n).map((e, n) => [e, t[n]]);
          }));
        const o = String.raw`[^,:\(\)\*\[\]/]`,
          a = String.raw`(child::|attribute::|@)?`,
          s = String.raw`(document-node\()?`,
          i = new Map([
            [new RegExp(String.raw`^\s*/\s*$`), -0.5],
            [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${s}${a}processing-instruction`), 0],
            [new RegExp(String.raw`^\s*${s}${a}element\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${s}${a}attribute\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${s}${a}element\(${o}+\)\)?\s*$`), 0],
            [
              new RegExp(String.raw`^\s*${s}${a}element\(\*,\s*${o}+\)\)?\s*$`),
              0,
            ],
            [new RegExp(String.raw`^\s*${s}${a}attribute\(${o}+\)\)?\s*$`), 0],
            [
              new RegExp(
                String.raw`^\s*${s}${a}attribute\(\*,\s*${o}+\)\)?\s*$`,
              ),
              0,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${a}element\(${o}+,\s*${o}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${a}attribute\(${o}+,\s*${o}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${a}schema-element\(${o}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${a}schema-attribute\(${o}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [new RegExp(String.raw`^\s*document-node\(\)\s*$`), -0.5],
            [
              new RegExp(
                String.raw`^\s*${a}(node\(\)|text\(\)|comment\(\))\s*$`,
              ),
              -0.5,
            ],
            [new RegExp(String.raw`^\s*${a}(${o}:)?\*\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${a}\*:${o}+\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${a}${o}+\s*$`), 0],
          ]);
        function c(e, t) {
          const n = e.importPrecedence - t.importPrecedence;
          if (0 !== n) return n;
          {
            const n = t.priority - e.priority;
            return 0 !== n ? n : t.declarationOrder - e.declarationOrder;
          }
        }
      },
      472(e, t, n) {
        "use strict";
        var r,
          o =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, n, r) {
                  void 0 === r && (r = n);
                  var o = Object.getOwnPropertyDescriptor(t, n);
                  ((o &&
                    !("get" in o
                      ? !t.__esModule
                      : o.writable || o.configurable)) ||
                    (o = {
                      enumerable: !0,
                      get: function () {
                        return t[n];
                      },
                    }),
                    Object.defineProperty(e, r, o));
                }
              : function (e, t, n, r) {
                  (void 0 === r && (r = n), (e[r] = t[n]));
                }),
          a =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          s =
            (this && this.__importStar) ||
            ((r = function (e) {
              return (
                (r =
                  Object.getOwnPropertyNames ||
                  function (e) {
                    var t = [];
                    for (var n in e)
                      Object.prototype.hasOwnProperty.call(e, n) &&
                        (t[t.length] = n);
                    return t;
                  }),
                r(e)
              );
            }),
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var n = r(e), s = 0; s < n.length; s++)
                  "default" !== n[s] && o(t, e, n[s]);
              return (a(t, e), t);
            });
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.urlToDom = function (e, t) {
            const n = e.inputURL ? (0, i.resolve)(e.inputURL.toString(), t) : t;
            return n.startsWith("file:")
              ? u.parseXmlDocument(
                  (0, c.readFileSync)(
                    (0, i.fileURLToPath)(new URL(n)),
                  ).toString(),
                )
              : void 0;
          }));
        const i = n(16),
          c = n(896),
          u = s(n(898));
      },
      821(e, t, n) {
        "use strict";
        var r,
          o =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, n, r) {
                  void 0 === r && (r = n);
                  var o = Object.getOwnPropertyDescriptor(t, n);
                  ((o &&
                    !("get" in o
                      ? !t.__esModule
                      : o.writable || o.configurable)) ||
                    (o = {
                      enumerable: !0,
                      get: function () {
                        return t[n];
                      },
                    }),
                    Object.defineProperty(e, r, o));
                }
              : function (e, t, n, r) {
                  (void 0 === r && (r = n), (e[r] = t[n]));
                }),
          a =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          s =
            (this && this.__importStar) ||
            ((r = function (e) {
              return (
                (r =
                  Object.getOwnPropertyNames ||
                  function (e) {
                    var t = [];
                    for (var n in e)
                      Object.prototype.hasOwnProperty.call(e, n) &&
                        (t[t.length] = n);
                    return t;
                  }),
                r(e)
              );
            }),
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var n = r(e), s = 0; s < n.length; s++)
                  "default" !== n[s] && o(t, e, n[s]);
              return (a(t, e), t);
            });
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.NodeTypeFeature =
            t.NodeTextFeature =
            t.NodeNameFeature =
            t.NodeNamespaceFeature =
            t.NodeAttributeFeature =
            t.selfNode =
            t.greatGrandParentNode =
            t.grandParentNode =
            t.parentNode =
            t.KeyImpl =
              void 0),
          (t.visitNodes = g),
          (t.dedupGenerator = b),
          (t.mergeTemplateGenerators = T),
          (t.processNode = S),
          (t.nextMatch = function (e, t) {
            const n = e.nextMatches;
            if (n) {
              const r = n.next();
              r.done ||
                C(
                  r.value,
                  Object.assign(Object.assign({}, e), { nextMatches: n }),
                  t.params,
                );
            }
          }),
          (t.applyImports = function (e, t) {
            const n = e.nextMatches;
            if (n) {
              let r = n.next();
              for (; !r.done && 1 === r.value.importPrecedence; ) r = n.next();
              r.done ||
                C(
                  r.value,
                  Object.assign(Object.assign({}, e), { nextMatches: n }),
                  t.params,
                );
            }
          }),
          (t.sort = P),
          (t.applyTemplates = function (e, t) {
            const n = (0, p.mkResolver)(t.namespaces),
              r = (0, i.evaluateXPathToNodes)(
                t.select,
                e.contextItem,
                void 0,
                L(e.variableScopes),
                {
                  currentContext: e,
                  namespaceResolver: n,
                  functionNameResolver: u.functionNameResolver,
                },
              );
            let o = t.mode || "#default";
            ("#current" === o && (o = e.mode),
              O(P(e, r, t.sortKeyComponents, n), e, (e) => {
                S(
                  Object.assign(Object.assign({}, e), {
                    mode: o,
                    variableScopes: D(e.variableScopes),
                  }),
                  t.params,
                  t.namespaces,
                );
              }));
          }),
          (t.callTemplate = function (e, t) {
            const n = e.namedTemplates.get(t.name);
            if (void 0 !== n) return C(e.templates[n], e, t.params);
            throw new Error(`Cannot find a template named ${t.name}`);
          }),
          (t.functionX = function (e, t) {
            const n = e.params.map((e) => "item()"),
              r = e.params.map((e) => e.name);
            (0, i.registerCustomXPathFunction)(
              { namespaceURI: e.namespace, localName: e.name },
              n,
              e.as || "item()",
              ({ currentContext: e }, ...n) => {
                let o = new Map();
                return (
                  r.forEach((e, t) => o.set(e, n[t])),
                  Y(
                    Object.assign(Object.assign({}, e), {
                      variableScopes: [o].concat(e.variableScopes),
                    }),
                    t,
                  )
                );
              },
            );
          }),
          (t.copy = function (e, t, n) {
            const r = e.contextItem;
            let o, a;
            if (r.nodeType === l.NodeType.ELEMENT) {
              const t = r;
              o = e.outputDocument.createElementNS(
                t.namespaceURI,
                t.prefix ? `${t.prefix}:${t.localName}` : t.localName,
              );
              for (let n of t.attributes)
                if (n.namespaceURI === l.XMLNS_NSURI) {
                  const r = n.localName;
                  o.setAttributeNode(
                    e.outputDocument.importNode(
                      t.getAttributeNodeNS(l.XMLNS_NSURI, r),
                    ),
                  );
                }
            } else
              o =
                r.nodeType === l.NodeType.DOCUMENT
                  ? void 0
                  : e.outputDocument.importNode(r);
            (o && (a = e.append(o)),
              n &&
                n(
                  Object.assign(Object.assign({}, e), {
                    append: a || e.append,
                  }),
                ));
          }),
          (t.copyOf = function (e, t) {
            let n = (0, i.evaluateXPath)(
              t.select,
              e.contextItem,
              void 0,
              L(e.variableScopes),
              i.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: e,
                namespaceResolver: (0, p.mkResolver)(t.namespaces),
                functionNameResolver: u.functionNameResolver,
              },
            );
            for (let t of n) e.append(t);
          }),
          (t.valueOf = function (e, t, n) {
            e.append(
              J(e, t.select || n, (0, p.mkResolver)(t.namespaces), t.separator),
            );
          }),
          (t.message = function (e, t, n) {
            const r = J(e, t.select || n, (0, p.mkResolver)(t.namespaces));
            if ("yes" === t.terminate) throw new Error(r);
            console.log(r);
          }),
          (t.text = function (e, t, n) {
            e.append(J(e, n, (0, p.mkResolver)(t.namespaces), [""]));
          }),
          (t.variable = function (e, t) {
            j(e.variableScopes, t.name, B(e, t));
          }),
          (t.param = function (e, t) {
            j(e.variableScopes, t.name, e.stylesheetParams[t.name] || B(e, t));
          }),
          (t.extendScope = D),
          (t.wrapValue = M),
          (t.setVariable = j),
          (t.mergeVariableScopes = L),
          (t.literalText = function (e, t) {
            e.append(t);
          }),
          (t.sequence = function (e, t) {
            const n = (0, i.evaluateXPath)(
              t.select,
              e.contextItem,
              void 0,
              L(e.variableScopes),
              i.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: e,
                namespaceResolver: (0, p.mkResolver)(t.namespaces),
                functionNameResolver: u.functionNameResolver,
              },
            );
            e.append(n);
          }),
          (t.buildNode = U),
          (t.buildAttributeNode = A),
          (t.literalElement = function (e, t, n) {
            let r = U(e, { name: t.name, namespace: t.namespace });
            const o = (0, p.mkResolver)(t.namespaces);
            for (let n of t.attributes) {
              const t = G(e, n.value, o),
                a = A(e, { name: n.name, namespace: n.namespace, value: t });
              r.setAttributeNode(a);
            }
            const a = e.append(r);
            n(
              Object.assign(Object.assign({}, e), {
                variableScopes: D(e.variableScopes),
                append: a || e.append,
              }),
            );
          }),
          (t.attribute = function (e, t, n) {
            const r = (0, p.mkResolver)(t.namespaces),
              o = G(e, t.name, r),
              [a, s] = (0, p.determineNamespace)(o, r, G(e, t.namespace, r)),
              i = A(e, {
                name: o,
                namespace: a,
                value: J(e, t.select || n, r, t.separator),
              });
            e.append(i);
          }),
          (t.processingInstruction = function (e, t, n) {
            const r = G(e, t.name, (0, p.mkResolver)(t.namespaces)),
              o = J(e, t.select || n, (0, p.mkResolver)(t.namespaces), [
                "",
              ]).trimStart();
            e.append(e.outputDocument.createProcessingInstruction(r, o));
          }),
          (t.comment = function (e, t, n) {
            const r = J(e, t.select || n, (0, p.mkResolver)(t.namespaces), [
              "",
            ]);
            e.append(e.outputDocument.createComment(r));
          }),
          (t.namespace = function (e, t, n) {
            const r = (0, p.mkResolver)(t.namespaces),
              o = G(e, t.name, r),
              a = J(e, t.select || n, r, [""]),
              s = A(e, {
                name: `xmlns:${o}`,
                namespace: l.XMLNS_NSURI,
                value: a,
              });
            e.append(s);
          }),
          (t.element = function (e, t, n) {
            const r = (0, p.mkResolver)(t.namespaces);
            let o = G(e, t.name, r),
              a = G(e, t.namespace, r),
              s = U(e, {
                name: o,
                namespace: (0, p.determineNamespace)(
                  o,
                  (0, p.mkResolver)(t.namespaces),
                  a,
                )[0],
              });
            const i = e.append(s);
            n(
              Object.assign(Object.assign({}, e), {
                variableScopes: D(e.variableScopes),
                append: i || e.append,
              }),
            );
          }),
          (t.ifX = function (e, t, n) {
            (0, i.evaluateXPathToBoolean)(
              t.test,
              e.contextItem,
              void 0,
              L(e.variableScopes),
              {
                currentContext: e,
                namespaceResolver: (0, p.mkResolver)(t.namespaces),
                functionNameResolver: u.functionNameResolver,
              },
            ) && n(e);
          }),
          (t.choose = function (e, t) {
            for (let n of t) {
              if (!n.test) return n.apply(e);
              if (
                (0, i.evaluateXPathToBoolean)(
                  n.test,
                  e.contextItem,
                  void 0,
                  L(e.variableScopes),
                  {
                    currentContext: e,
                    functionNameResolver: u.functionNameResolver,
                  },
                )
              )
                return n.apply(e);
            }
          }),
          (t.document = function (e, t, n) {
            const r = e.outputDocument.implementation.createDocument(
                null,
                null,
                null,
              ),
              o = e.append(r);
            n(
              Object.assign(Object.assign({}, e), {
                outputDocument: r,
                append: o,
                mode: "#default",
                variableScopes: D(e.variableScopes),
              }),
            );
          }),
          (t.performSort = function (e, t) {
            const n = (0, p.mkResolver)(t.namespaces),
              r = (0, i.evaluateXPath)(
                t.select,
                e.contextItem,
                void 0,
                L(e.variableScopes),
                i.evaluateXPath.ALL_RESULTS_TYPE,
                {
                  currentContext: e,
                  namespaceResolver: n,
                  functionNameResolver: u.functionNameResolver,
                },
              );
            if (r && Symbol.iterator in Object(r)) {
              const o = P(e, r, t.sortKeyComponents, n);
              for (let t of o) e.append(t);
            }
          }),
          (t.forEach = function (e, t, n) {
            const r = (0, p.mkResolver)(t.namespaces);
            let o = (0, i.evaluateXPath)(
              t.select,
              e.contextItem,
              void 0,
              L(e.variableScopes),
              i.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: e,
                namespaceResolver: r,
                functionNameResolver: u.functionNameResolver,
              },
            );
            o &&
              Symbol.iterator in Object(o) &&
              ((o = P(e, o, t.sortKeyComponents, r)),
              O(o, e, (e) => {
                n(
                  Object.assign(Object.assign({}, e), {
                    variableScopes: D(e.variableScopes),
                  }),
                );
              }));
          }),
          (t.forEachGroup = function (e, t, n) {
            const r = (0, p.mkResolver)(t.namespaces),
              o = L(e.variableScopes),
              a = (0, i.evaluateXPathToNodes)(
                t.select,
                e.contextItem,
                void 0,
                o,
                {
                  currentContext: e,
                  namespaceResolver: r,
                  functionNameResolver: u.functionNameResolver,
                },
              );
            if (a && Symbol.iterator in Object(a)) {
              let o = [];
              (t.groupBy
                ? (o = (function (e, t, n, r) {
                    const o = L(e.variableScopes);
                    let a = [];
                    return (
                      O(t, e, (e) => {
                        const t = (0, i.evaluateXPathToString)(
                          n,
                          e.contextItem,
                          void 0,
                          o,
                          {
                            currentContext: e,
                            namespaceResolver: r,
                            functionNameResolver: u.functionNameResolver,
                          },
                        );
                        let s = a.find((e) => e.key === t);
                        (s || ((s = { key: t, nodes: [] }), a.push(s)),
                          s.nodes.push(e.contextItem));
                      }),
                      a
                    );
                  })(e, a, t.groupBy, r))
                : t.groupAdjacent
                  ? (o = (function (e, t, n, r) {
                      const o = L(e.variableScopes);
                      let a = [],
                        s = null,
                        c = [];
                      return (
                        O(t, e, (e) => {
                          const t = e.contextItem,
                            l = (0, i.evaluateXPathToString)(n, t, void 0, o, {
                              currentContext: e,
                              namespaceResolver: r,
                              functionNameResolver: u.functionNameResolver,
                            });
                          l !== s
                            ? (F(a, c, s), (s = l), (c = [t]))
                            : c.push(t);
                        }),
                        F(a, c, s),
                        a
                      );
                    })(e, a, t.groupAdjacent, r))
                  : t.groupEndingWith
                    ? (o = (function (e, t, n, r) {
                        let o = [],
                          a = [];
                        return (
                          O(t, e, (e) => {
                            const t = e.contextItem;
                            (a.push(t),
                              y(
                                e.patternMatchCache,
                                n,
                                t,
                                e.variableScopes,
                                r,
                              ) && (F(o, a), (a = [])));
                          }),
                          F(o, a),
                          o
                        );
                      })(e, a, t.groupEndingWith, r))
                    : t.groupStartingWith &&
                      (o = (function (e, t, n, r) {
                        let o = [],
                          a = [];
                        return (
                          O(t, e, (e) => {
                            const t = e.contextItem;
                            (y(
                              e.patternMatchCache,
                              n,
                              t,
                              e.variableScopes,
                              r,
                            ) && (F(o, a), (a = [])),
                              a.push(t));
                          }),
                          F(o, a),
                          o
                        );
                      })(e, a, t.groupStartingWith, r)),
                (o = P(e, o, t.sortKeyComponents, r)),
                $(o, e, n));
            }
          }),
          (t.number = function (e, t) {
            const n = (0, p.mkResolver)(t.namespaces),
              r = L(e.variableScopes);
            let o;
            (t.value
              ? (o = (0, i.evaluateXPathToNumber)(
                  t.value,
                  e.contextItem,
                  void 0,
                  r,
                  {
                    currentContext: e,
                    namespaceResolver: n,
                    functionNameResolver: u.functionNameResolver,
                  },
                ))
              : "single" === t.level &&
                void 0 === t.value &&
                void 0 === t.select &&
                void 0 === t.count &&
                (o = e.position),
              e.append(
                (0, m.formatNumber)(
                  [o],
                  t.format,
                  t.groupingSeparator,
                  t.groupingSize,
                ),
              ));
          }),
          (t.mkNodeAppender = k),
          (t.mkArrayAppender = z),
          (t.resultDocument = function (e, t, n) {
            const r = (0, p.mkResolver)(t.namespaces);
            function o(t) {
              return G(e, t, r);
            }
            const a = o(t.format);
            let s = (0, p.mkOutputDefinition)({
              omitXmlDeclaration: o(t.omitXmlDeclaration),
              doctypePublic: o(t.doctypePublic),
              doctypeSystem: o(t.doctypeSystem),
              standalone: o(t.standalone),
            });
            Object.keys(s).forEach((e) => {
              s[e] || delete s[e];
            });
            const i = Object.assign(
                Object.assign({}, a ? e.outputDefinitions.get(a) : {}),
                s,
              ),
              c = o(t.href);
            let u = null;
            if (
              ((i.doctypePublic || i.doctypeSystem) &&
                (u = e.outputDocument.implementation.createDocumentType(
                  "out",
                  i.doctypePublic || "",
                  i.doctypeSystem || "",
                )),
              c)
            ) {
              const t = e.outputDocument.implementation.createDocument(
                null,
                null,
                u,
              );
              if (e.resultDocuments.has(c))
                throw new Error(`XTDE1490: ${c} is a duplicate`);
              (e.resultDocuments.set(
                c,
                Object.assign(Object.assign({}, i), { document: t }),
              ),
                n(
                  Object.assign(Object.assign({}, e), {
                    outputDocument: t,
                    append: k(t),
                  }),
                ));
            } else {
              if (e.outputDocument.documentElement) throw new Error("XTDE1490");
              let t = e.outputDocument;
              (u &&
                ((t = e.outputDocument.implementation.createDocument(
                  null,
                  null,
                  u,
                )),
                (e.outputDocument = t),
                (e.append = k(t))),
                e.resultDocuments.set(
                  "#default",
                  Object.assign(Object.assign({}, i), { document: t }),
                ),
                n(e));
            }
          }),
          (t.stripSpace = function (e, t) {
            const n = RegExp("^[ \n\r\t]+$");
            let r = [];
            !(function e(o) {
              if (o.nodeType === l.NodeType.TEXT)
                n.test(o.textContent) &&
                  (function (e, t) {
                    let n = new Map();
                    for (const r of t) {
                      const t = (0, p.mkResolver)(r.namespaces);
                      if (y(n, r.match, e, [], t)) return !r.preserve;
                    }
                    return !1;
                  })(o.parentNode, t) &&
                  r.push(o);
              else if (o.hasChildNodes && o.hasChildNodes())
                for (let t of o.childNodes) e(t);
            })(e);
            for (let e of r) e.remove();
            return e;
          }),
          (t.evaluateAttributeValueTemplate = G),
          (t.serialize = function (e) {
            const t = new c.XMLSerializer();
            if (!0 !== e.omitXmlDeclaration) {
              let t = new Map([
                ["version", "1.0"],
                ["encoding", "UTF-8"],
                ["standalone", void 0],
              ]);
              void 0 !== e.standalone &&
                t.set("standalone", e.standalone ? "yes" : "no");
              const n = Array.from(t)
                .map(([e, t]) => (t ? `${e}="${t}"` : ""))
                .join(" ");
              e.document.insertBefore(
                e.document.createProcessingInstruction("xml", n),
                e.document.firstChild,
              );
            }
            return t.serializeToString(e.document);
          }),
          (t.setParamDefaults = function (e, t) {
            return (
              t || (t = {}),
              t.outputDocument ||
                (t.outputDocument = e.implementation.createDocument(
                  null,
                  null,
                )),
              t.outputNode || (t.outputNode = t.outputDocument),
              t.initialMode || (t.initialMode = "#default"),
              t.stylesheetParams || (t.stylesheetParams = {}),
              t
            );
          }),
          (t.compileMatchFunction = function (e) {
            try {
              return new Function(e);
            } catch (e) {
              return;
            }
          }),
          (t.initialize = function (e, t) {}));
        const i = n(594),
          c = s(n(898)),
          u = n(379),
          l = n(712),
          p = n(777),
          m = n(845),
          d = n(324),
          f = n(320);
        function g(e, t) {
          if ((t(e), e.childNodes)) for (let n of e.childNodes) g(n, t);
        }
        function h(e) {
          return Array.isArray(e)
            ? e.map((e) => h(e)).join("")
            : e.nodeType
              ? e.textContent
              : e.toString();
        }
        (Object.defineProperty(t, "greatGrandParentNode", {
          enumerable: !0,
          get: function () {
            return f.greatGrandParentNode;
          },
        }),
          Object.defineProperty(t, "grandParentNode", {
            enumerable: !0,
            get: function () {
              return f.grandParentNode;
            },
          }),
          Object.defineProperty(t, "parentNode", {
            enumerable: !0,
            get: function () {
              return f.parentNode;
            },
          }),
          Object.defineProperty(t, "selfNode", {
            enumerable: !0,
            get: function () {
              return f.selfNode;
            },
          }),
          Object.defineProperty(t, "NodeAttributeFeature", {
            enumerable: !0,
            get: function () {
              return f.NodeAttributeFeature;
            },
          }),
          Object.defineProperty(t, "NodeNamespaceFeature", {
            enumerable: !0,
            get: function () {
              return f.NodeNamespaceFeature;
            },
          }),
          Object.defineProperty(t, "NodeNameFeature", {
            enumerable: !0,
            get: function () {
              return f.NodeNameFeature;
            },
          }),
          Object.defineProperty(t, "NodeTextFeature", {
            enumerable: !0,
            get: function () {
              return f.NodeTextFeature;
            },
          }),
          Object.defineProperty(t, "NodeTypeFeature", {
            enumerable: !0,
            get: function () {
              return f.NodeTypeFeature;
            },
          }),
          (t.KeyImpl = class {
            constructor(e, t, n) {
              ((this.match = e),
                (this.use = t),
                (this.namespaces = n),
                (this.cache = new Map()));
            }
            buildDocumentCache(e, t, n) {
              let r = new Map();
              return (
                g(t, (t) => {
                  if (
                    "string" == typeof this.use &&
                    y(
                      e,
                      { xpath: this.match },
                      t,
                      n,
                      (0, p.mkResolver)(this.namespaces),
                    )
                  ) {
                    let e = (0, i.evaluateXPathToString)(this.use, t);
                    (r.has(e) || r.set(e, []), r.set(e, r.get(e).concat(t)));
                  }
                }),
                r
              );
            }
            lookup(e, t, n, r) {
              return (
                this.cache.has(t) ||
                  this.cache.set(t, this.buildDocumentCache(e, t, n)),
                this.cache.get(t).get(h(r))
              );
            }
          }));
        const v = new RegExp(/^[a-z |-]+$/),
          N = new RegExp(/^@[a-z]+$/),
          x = new RegExp(/text\(\)|node\(\)/),
          w = new RegExp(/@|attribute|node/);
        function y(e, t, n, r, o) {
          return !(
            (n &&
              (function (e, t) {
                return (
                  (t.nodeType === l.NodeType.ATTRIBUTE && !w.exec(e)) ||
                  (t.nodeType === l.NodeType.TEXT && !x.exec(e)) ||
                  !(!v.exec(e) || t.nodeType === l.NodeType.ELEMENT) ||
                  !(!N.exec(e) || t.nodeType === l.NodeType.ATTRIBUTE)
                );
              })(t.xpath, n)) ||
            void 0 ===
              (function (e, t, n, r, o) {
                let a = e.get(t.xpath);
                a || ((a = new Map()), e.set(t.xpath, a));
                let s = n;
                const c = L(r);
                for (; s; ) {
                  let e = a.get(s);
                  if (
                    (void 0 === e &&
                      ((e = t.compiled
                        ? (0, i.executeJavaScriptCompiledXPath)(t.compiled, s)
                        : (0, i.evaluateXPathToNodes)(t.xpath, s, void 0, c, {
                            namespaceResolver: o,
                            functionNameResolver: u.functionNameResolver,
                          })),
                      a.set(s, e)),
                    -1 !== e.indexOf(n))
                  )
                    return e;
                  s =
                    s.parentNode ||
                    (s.nodeType === l.NodeType.ATTRIBUTE && s.ownerElement);
                }
              })(e, t, n, r, o)
          );
        }
        function* b(e) {
          let t = new Set(),
            n = e.next();
          for (; !n.done; )
            (t.has(n.value) || (yield n.value, t.add(n.value)), (n = e.next()));
        }
        function* T(e, t) {
          let n = [e.next(), t.next()];
          for (; !n[0].done || !n[1].done; )
            n[0].done
              ? (yield n[1].value, (n[1] = t.next()))
              : n[1].done || (0, p.compareSortable)(n[0].value, n[1].value) < 0
                ? (yield n[0].value, (n[0] = e.next()))
                : (yield n[1].value, (n[1] = t.next()));
        }
        function S(e, t, n) {
          let r = (function* (e, t, n, r) {
              const o = (0, d.findMatchingRules)(t, e).map((e) => n[e]);
              for (let e of (0, p.sortSortable)(o))
                ("#all" === e.modes[0] || e.modes.includes(r)) && (yield e);
            })(e.contextItem, e.ruleTree, e.templates, e.mode),
            o = (function* (e, t, n, r, o, a, s) {
              for (let [i, c] of n) {
                const n = r[c];
                i &&
                  ("#all" === n.modes[0] || n.modes.includes(a)) &&
                  y(e, i, t, o, (0, p.mkResolver)(s)) &&
                  (yield n);
              }
            })(
              e.patternMatchCache,
              e.contextItem,
              e.nonRuleTemplateIndexes,
              e.templates,
              e.variableScopes,
              e.mode,
              n,
            ),
            a = b(T(r, o));
          const s = a.next();
          s.done ||
            C(
              s.value,
              Object.assign(Object.assign({}, e), { nextMatches: a }),
              t,
            );
        }
        function R(e, t, n, r) {
          const o = "descending" === G(e, n.order, r);
          return "number" === n.dataType
            ? (function (e, t, n, r, o) {
                const a = E(t, e, (e) => {
                  let t;
                  const o = J(e, n.sortKey, r);
                  return (
                    (t = Number(o)),
                    isNaN(t) && (t = Number.MIN_SAFE_INTEGER),
                    t
                  );
                });
                return (0, p.zip)(a, t)
                  .sort(o ? (e, t) => t[0] - e[0] : (e, t) => e[0] - t[0])
                  .map((e) => e[1]);
              })(e, t, n, r, o)
            : (function (e, t, n, r, o) {
                const a = E(t, e, (e) => J(e, n.sortKey, r)),
                  s = n.lang && G(e, n.lang, r);
                let i = new Intl.Collator(s).compare;
                return (0, p.zip)(a, t)
                  .sort(o ? (e, t) => i(t[0], e[0]) : (e, t) => i(e[0], t[0]))
                  .map((e) => e[1]);
              })(e, t, n, r, o);
        }
        function E(e, t, n) {
          if (e.length > 0)
            return (0, l.isNodeGroupArray)(e) ? $(e, t, n) : O(e, t, n);
        }
        function O(e, t, n) {
          let r = 0;
          return e.map(
            (o) => (
              r++,
              n(
                Object.assign(Object.assign({}, t), {
                  contextItem: o,
                  contextList: e,
                  position: r,
                }),
              )
            ),
          );
        }
        function $(e, t, n) {
          let r = 0;
          return e.map((e) => {
            r++;
            const o = Object.assign(Object.assign({}, t), {
              contextItem: e.nodes[0],
              contextList: e.nodes,
              currentGroup: e,
              position: r,
              variableScopes: D(t.variableScopes),
            });
            return n(o);
          });
        }
        function P(e, t, n, r) {
          if (n) for (let o of [...n].reverse()) t = R(e, t, o, r);
          return t;
        }
        function I(e, t) {
          for (let n of t) if (n.name === e) return n;
        }
        function C(e, t, n) {
          let r = D(t.variableScopes);
          for (let o of e.allowedParams) {
            let e = I(o.name, n);
            void 0 !== e ? j(r, e.name, B(t, e)) : j(r, o.name, B(t, o));
          }
          return e.apply(
            Object.assign(Object.assign({}, t), { variableScopes: r }),
          );
        }
        function D(e) {
          return e.concat([new Map()]);
        }
        new RegExp(/(^\/$|document-node\(|node\()/);
        let X = new Map();
        function _(e) {
          return (
            X.has(e) || X.set(e, (0, i.createTypedValueFactory)(e)),
            X.get(e)
          );
        }
        function M(e, t) {
          if (Array.isArray(e) && 0 === e.length) return _("item()*")([], null);
          if (t)
            try {
              return _(t)(e, null);
            } catch (e) {}
          const n = Array.isArray(e),
            r = n ? e[0] : e;
          let o = "item()";
          const a = n ? "*" : "";
          return (
            "string" == typeof r
              ? (o = "xs:string")
              : "number" == typeof r &&
                (o = Number.isInteger(r) ? "xs:integer" : "xs:numeric"),
            _(`${o}${a}`)(e, null)
          );
        }
        function j(e, t, n) {
          e[e.length - 1].set(t, n);
        }
        function L(e) {
          let t = {};
          for (let n of e) for (let [e, r] of n) t[e] = r;
          return t;
        }
        function U(e, t) {
          let n;
          return (
            (n =
              void 0 !== t.namespace && null !== t.namespace
                ? e.outputDocument.createElementNS(t.namespace, t.name)
                : e.outputDocument.createElement(t.name)),
            n
          );
        }
        function A(e, t) {
          let n;
          return (
            (n = t.namespace
              ? e.outputDocument.createAttributeNS(t.namespace, t.name)
              : e.outputDocument.createAttribute(t.name)),
            (n.value = t.value),
            n
          );
        }
        function F(e, t, n) {
          t.length > 0 &&
            (null === n && (n = `group-${e.length + 1}`),
            e.push({ key: n, nodes: t }));
        }
        function k(e) {
          const t = e.ownerDocument || e;
          return function n(r) {
            if (r.length && r.values) {
              let e = !0;
              const t = r.length > 0 && !r[0].nodeType;
              for (let o of r) (e ? (e = !1) : t && n(" "), n(o));
            } else if ("string" == typeof r) {
              if (e.nodeType !== l.NodeType.DOCUMENT)
                if (e.lastChild && e.lastChild.nodeType === l.NodeType.TEXT)
                  e.lastChild.appendData(r);
                else if ("" !== r) {
                  const n = t.createTextNode(r);
                  n && e.append(n);
                }
            } else if (r.nodeType === l.NodeType.ATTRIBUTE) {
              let n = t.importNode(r, !0);
              e.setAttributeNode(n);
            } else {
              if (r.nodeType === l.NodeType.DOCUMENT) {
                const e = r;
                return (r = r.documentElement) ? (n(r), k(r)) : k(e);
              }
              if (r.nodeType === l.NodeType.DOCUMENT_FRAGMENT) n(r.childNodes);
              else if (r.nodeType === l.NodeType.TEXT) n(r.data);
              else {
                if (r.nodeType) {
                  let n = t.importNode(r, !0);
                  return (e.append(n), k(n));
                }
                n(`${r}`);
              }
            }
          };
        }
        function z(e) {
          return function (t) {
            if (
              (e.push(t),
              t.nodeType &&
                (t.nodeType === l.NodeType.DOCUMENT ||
                  t.nodeType === l.NodeType.ELEMENT))
            )
              return k(t);
          };
        }
        function G(e, t, n) {
          if (!t) return;
          const r = L(e.variableScopes);
          return t
            .map((t) =>
              "string" == typeof t
                ? t
                : (0, i.evaluateXPathToString)(
                    t.xpath,
                    e.contextItem,
                    void 0,
                    r,
                    {
                      currentContext: e,
                      namespaceResolver: n,
                      functionNameResolver: u.functionNameResolver,
                    },
                  ),
            )
            .join("");
        }
        function J(e, t, n, r) {
          r || (r = "string" == typeof t ? [" "] : []);
          const o = G(e, r, n);
          if ("string" == typeof t) {
            const r = L(e.variableScopes);
            return (0, i.evaluateXPath)(
              t,
              e.contextItem,
              void 0,
              r,
              i.evaluateXPath.STRINGS_TYPE,
              {
                currentContext: e,
                namespaceResolver: n,
                functionNameResolver: u.functionNameResolver,
              },
            ).join(o);
          }
          return (function (e) {
            let t = [];
            return (
              g(e, (e) => {
                e.nodeType === l.NodeType.TEXT &&
                  "" !== e.data &&
                  (t = t.concat(e.data));
              }),
              t
            );
          })(Y(e, t)).join(o);
        }
        function B(e, t) {
          if ("string" == typeof t.content) {
            const n = t.as && t.as.match(/[\+\*]$/);
            let r = (0, i.evaluateXPath)(
              t.content,
              e.contextItem,
              void 0,
              L(e.variableScopes),
              i.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: e,
                namespaceResolver: (0, p.mkResolver)(t.namespaces),
                functionNameResolver: u.functionNameResolver,
              },
            );
            return (1 !== r.length || n || (r = r[0]), M(r, t.as));
          }
          return null == t.content
            ? ""
            : t.as
              ? M(
                  (function (e, t) {
                    let n = [];
                    return (
                      t(
                        Object.assign(Object.assign({}, e), {
                          append: z(n),
                          mode: "#default",
                          variableScopes: D(e.variableScopes),
                        }),
                      ),
                      1 === n.length ? n[0] : n
                    );
                  })(e, t.content),
                  t.as,
                )
              : Y(e, t.content);
        }
        function Y(e, t) {
          return (function (e, t) {
            const n = e.outputDocument.createDocumentFragment();
            if (
              (t(k(n)), 1 === n.childNodes.length && 1 === n.childElementCount)
            ) {
              const t = e.outputDocument.implementation.createDocument(
                null,
                null,
                null,
              );
              return (t.appendChild(n.firstChild), t);
            }
            return n;
          })(e, (n) => {
            t(
              Object.assign(Object.assign({}, e), {
                append: n,
                outputDocument: e.outputDocument,
                mode: "#default",
                variableScopes: D(e.variableScopes),
              }),
            );
          });
        }
        (0, u.registerFunctions)();
      },
      594(e) {
        "use strict";
        e.exports = require("fontoxpath");
      },
      898(e) {
        "use strict";
        e.exports = require("slimdom");
      },
      896(e) {
        "use strict";
        e.exports = require("fs");
      },
      16(e) {
        "use strict";
        e.exports = require("url");
      },
    },
    t = {},
    n = (function n(r) {
      var o = t[r];
      if (void 0 !== o) return o.exports;
      var a = (t[r] = { exports: {} });
      return (e[r].call(a.exports, a, a.exports, n), a.exports);
    })(146);
  module.exports = n.transform;
})();
