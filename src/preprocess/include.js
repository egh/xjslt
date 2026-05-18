(() => {
  var t = {
      362(t, e, n) {
        (n(898), n(594));
        let o = n(821);
        function r(t, e) {
          e = o.setParamDefaults(t, e);
          let n = new Map();
          n.set("#default", { document: e.outputDocument });
          let r = new Map(),
            a = new Map(),
            s = new Map(),
            i = {
              outputDocument: e.outputDocument,
              append: o.mkNodeAppender(e.outputNode),
              resultDocuments: n,
              contextItem: t,
              contextList: [t],
              position: 1,
              mode: e.initialMode,
              templates: [
                {
                  apply: (t) => {},
                  allowedParams: [],
                  modes: ["#all"],
                  namespaces: {
                    xjslt: "https://www.e6h.org/xjslt",
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                  },
                  importPrecedence: 17976931348623157e292,
                  declarationOrder: 5e-324,
                },
                {
                  apply: (t) => {
                    o.valueOf(t, {
                      select: ".",
                      separator: void 0,
                      namespaces: {
                        xjslt: "https://www.e6h.org/xjslt",
                        xsl: "http://www.w3.org/1999/XSL/Transform",
                      },
                    });
                  },
                  allowedParams: [],
                  modes: ["#all"],
                  namespaces: {
                    xjslt: "https://www.e6h.org/xjslt",
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                  },
                  importPrecedence: 17976931348623157e292,
                  declarationOrder: 5e-324,
                },
                {
                  apply: (t) => {
                    o.applyTemplates(t, {
                      select: "child::node()",
                      params: [],
                      mode: "#current",
                      namespaces: {
                        xjslt: "https://www.e6h.org/xjslt",
                        xsl: "http://www.w3.org/1999/XSL/Transform",
                      },
                      sortKeyComponents: [],
                    });
                  },
                  allowedParams: [],
                  modes: ["#all"],
                  namespaces: {
                    xjslt: "https://www.e6h.org/xjslt",
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                  },
                  importPrecedence: 17976931348623157e292,
                  declarationOrder: 5e-324,
                },
                {
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (t) => {
                    o.copy(
                      t,
                      {
                        namespaces: {
                          xjslt: "https://www.e6h.org/xjslt",
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                      },
                      (t) => {
                        o.applyTemplates(t, {
                          select: "@* | node()",
                          mode: "#default",
                          params: [],
                          sortKeyComponents: [],
                          namespaces: {
                            xjslt: "https://www.e6h.org/xjslt",
                            xsl: "http://www.w3.org/1999/XSL/Transform",
                          },
                        });
                      },
                    );
                  },
                  namespaces: {
                    xjslt: "https://www.e6h.org/xjslt",
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                  },
                  priority: -0.25,
                  declarationOrder: 1,
                  importPrecedence: 1,
                },
                {
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (t) => {
                    (o.variable(t, {
                      name: "doc",
                      content: "doc(@href)",
                      namespaces: {
                        xjslt: "https://www.e6h.org/xjslt",
                        xsl: "http://www.w3.org/1999/XSL/Transform",
                      },
                      as: void 0,
                    }),
                      o.variable(t, {
                        name: "use-when",
                        content:
                          "$doc/xsl:stylesheet/@use-when | $doc/xsl:transform/@use-when",
                        namespaces: {
                          xjslt: "https://www.e6h.org/xjslt",
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                        as: void 0,
                      }),
                      o.ifX(
                        t,
                        {
                          test: "not($use-when) or xjslt:evaluate($use-when)",
                          namespaces: {
                            xjslt: "https://www.e6h.org/xjslt",
                            xsl: "http://www.w3.org/1999/XSL/Transform",
                          },
                        },
                        (t) => {
                          o.applyTemplates(t, {
                            select:
                              "$doc/xsl:stylesheet/* | $doc/xsl:transform/*",
                            mode: "#default",
                            params: [],
                            sortKeyComponents: [],
                            namespaces: {
                              xjslt: "https://www.e6h.org/xjslt",
                              xsl: "http://www.w3.org/1999/XSL/Transform",
                            },
                          });
                        },
                      ));
                  },
                  namespaces: {
                    xjslt: "https://www.e6h.org/xjslt",
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                  },
                  priority: 0.5,
                  declarationOrder: 2,
                  importPrecedence: 1,
                },
              ],
              nonRuleTemplateIndexes: [
                [
                  {
                    xpath: "xsl:include",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-include");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-include")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "include" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  4,
                ],
                [
                  {
                    xpath: "/",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\tconst root0 = (function () {\n\t\t\t\tlet n = contextItem0;\n\t\t\t\twhile (n.nodeType !== /*DOCUMENT_NODE*/9) {\n\t\t\t\t\tn = domFacade.getParentNode(n);\n\t\t\t\t\tif (n === null) {\n\t\t\t\t\t\tthrow new Error(\'XPDY0050: the root node of the context node is not a document node.\');\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn n;\n\t\t\t})();\n\t\t\tyield root0;\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  3,
                ],
                [
                  {
                    xpath: "@*",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (const contextItem1 of (contextItem0 && contextItem0.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem0, "type-2") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& (contextItem1.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem1.nodeType === /*ATTRIBUTE_NODE*/ 2))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  3,
                ],
                [
                  {
                    xpath: "node()",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0);\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1)) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(!!contextItem1.nodeType)) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  3,
                ],
                [{ xpath: "processing-instruction()", compiled: void 0 }, 0],
                [{ xpath: "comment()", compiled: void 0 }, 0],
                [
                  {
                    xpath: "text()",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "type-3");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "type-3")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!((contextItem1.nodeType === /*TEXT_NODE*/ 3 ||\n\t\t\t\tcontextItem1.nodeType === /* CDATA_SECTION_NODE */ 4))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  1,
                ],
                [
                  {
                    xpath: "@*",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (const contextItem1 of (contextItem0 && contextItem0.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem0, "type-2") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& (contextItem1.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem1.nodeType === /*ATTRIBUTE_NODE*/ 2))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  1,
                ],
                [
                  {
                    xpath: "/",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\tconst root0 = (function () {\n\t\t\t\tlet n = contextItem0;\n\t\t\t\twhile (n.nodeType !== /*DOCUMENT_NODE*/9) {\n\t\t\t\t\tn = domFacade.getParentNode(n);\n\t\t\t\t\tif (n === null) {\n\t\t\t\t\t\tthrow new Error(\'XPDY0050: the root node of the context node is not a document node.\');\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn n;\n\t\t\t})();\n\t\t\tyield root0;\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  2,
                ],
              ],
              namedTemplates: new Map([]),
              variableScopes: [new Map()],
              inputURL: e.inputURL,
              ruleTree: {
                feature: new o.NodeTypeFeature(o.selfNode, 1),
                results: [],
                left: { results: [2] },
              },
              keys: r,
              outputDefinitions: a,
              decimalFormats: s,
              patternMatchCache: new Map(),
              stylesheetParams: e.stylesheetParams,
            };
          return (
            o.initialize(i, {
              xjslt: "https://www.e6h.org/xjslt",
              xsl: "http://www.w3.org/1999/XSL/Transform",
            }),
            o.stripSpace(t, []),
            o.processNode(i, [], {
              xjslt: "https://www.e6h.org/xjslt",
              xsl: "http://www.w3.org/1999/XSL/Transform",
            }),
            n
          );
        }
        ((t.exports.transform = r), (global.transform = r));
      },
      712(t, e, n) {
        "use strict";
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.Feature =
            e.DEFAULT_DECIMAL_FORMAT =
            e.NodeType =
            e.DEFAULT_PRIORITIES =
            e.XJSLT_NSURI =
            e.XPATH_NSURI =
            e.XMLNS_NSURI =
            e.XSLT1_NSURI =
              void 0),
          (e.isNodeGroup = c),
          (e.isNodeGroupArray = function (t) {
            return Array.isArray(t) && (0 === t.length || c(t[0]));
          }));
        const o = n(953),
          r = String.raw`[^,:\(\)\*\[\]/]`,
          a = String.raw`(child::|attribute::|@)?`,
          s = String.raw`(document-node\()?`;
        var i;
        function c(t) {
          return (
            "object" == typeof t &&
            null !== t &&
            "string" == typeof t.key &&
            Array.isArray(t.nodes)
          );
        }
        ((e.XSLT1_NSURI = "http://www.w3.org/1999/XSL/Transform"),
          (e.XMLNS_NSURI = "http://www.w3.org/2000/xmlns/"),
          (e.XPATH_NSURI = "http://www.w3.org/2005/xpath-functions"),
          (e.XJSLT_NSURI = "https://www.e6h.org/xjslt"),
          (e.DEFAULT_PRIORITIES = new Map([
            [new RegExp(String.raw`^\s*/\s*$`), -0.5],
            [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${s}${a}processing-instruction`), 0],
            [new RegExp(String.raw`^\s*${s}${a}element\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${s}${a}attribute\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${s}${a}element\(${r}+\)\)?\s*$`), 0],
            [
              new RegExp(String.raw`^\s*${s}${a}element\(\*,\s*${r}+\)\)?\s*$`),
              0,
            ],
            [new RegExp(String.raw`^\s*${s}${a}attribute\(${r}+\)\)?\s*$`), 0],
            [
              new RegExp(
                String.raw`^\s*${s}${a}attribute\(\*,\s*${r}+\)\)?\s*$`,
              ),
              0,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${a}element\(${r}+,\s*${r}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${a}attribute\(${r}+,\s*${r}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${a}schema-element\(${r}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${a}schema-attribute\(${r}+\)\)?\s*$`,
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
            [new RegExp(String.raw`^\s*${a}(${r}:)?\*\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${a}\*:${r}+\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${a}${r}+\s*$`), 0],
          ])),
          (function (t) {
            ((t[(t.ELEMENT = 1)] = "ELEMENT"),
              (t[(t.ATTRIBUTE = 2)] = "ATTRIBUTE"),
              (t[(t.TEXT = 3)] = "TEXT"),
              (t[(t.CDATA_SECTION = 4)] = "CDATA_SECTION"),
              (t[(t.ENTITY_REFERENCE = 5)] = "ENTITY_REFERENCE"),
              (t[(t.ENTITY = 6)] = "ENTITY"),
              (t[(t.PROCESSING_INSTRUCTION = 7)] = "PROCESSING_INSTRUCTION"),
              (t[(t.COMMENT = 8)] = "COMMENT"),
              (t[(t.DOCUMENT = 9)] = "DOCUMENT"),
              (t[(t.DOCUMENT_TYPE = 10)] = "DOCUMENT_TYPE"),
              (t[(t.DOCUMENT_FRAGMENT = 11)] = "DOCUMENT_FRAGMENT"),
              (t[(t.NOTATION = 12)] = "NOTATION"));
          })(i || (e.NodeType = i = {})),
          (e.DEFAULT_DECIMAL_FORMAT = {
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
          (e.Feature = class {
            constructor(t) {
              this.value = t;
            }
            serialize() {
              return (0, o.mkNew)(
                (0, o.mkMember)("xjslt", this.constructor.name),
                [(0, o.toEstree)(this.value)],
              );
            }
            equals(t) {
              return (
                this.constructor === t.constructor && this.value === t.value
              );
            }
          }));
      },
      320(t, e, n) {
        "use strict";
        var o,
          r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (t, e, n, o) {
                  void 0 === o && (o = n);
                  var r = Object.getOwnPropertyDescriptor(e, n);
                  ((r &&
                    !("get" in r
                      ? !e.__esModule
                      : r.writable || r.configurable)) ||
                    (r = {
                      enumerable: !0,
                      get: function () {
                        return e[n];
                      },
                    }),
                    Object.defineProperty(t, o, r));
                }
              : function (t, e, n, o) {
                  (void 0 === o && (o = n), (t[o] = e[n]));
                }),
          a =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (t, e) {
                  Object.defineProperty(t, "default", {
                    enumerable: !0,
                    value: e,
                  });
                }
              : function (t, e) {
                  t.default = e;
                }),
          s =
            (this && this.__importStar) ||
            ((o = function (t) {
              return (
                (o =
                  Object.getOwnPropertyNames ||
                  function (t) {
                    var e = [];
                    for (var n in t)
                      Object.prototype.hasOwnProperty.call(t, n) &&
                        (e[e.length] = n);
                    return e;
                  }),
                o(t)
              );
            }),
            function (t) {
              if (t && t.__esModule) return t;
              var e = {};
              if (null != t)
                for (var n = o(t), s = 0; s < n.length; s++)
                  "default" !== n[s] && r(e, t, n[s]);
              return (a(e, t), e);
            });
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NodeAttributeFeature =
            e.NodeTextFeature =
            e.NodeNameFeature =
            e.NodeTypeFeature =
            e.NodeNamespaceFeature =
              void 0),
          (e.selfNode = m),
          (e.xpathToFeatures = function (t, e) {
            if (t)
              return (function (t, e) {
                const n = [];
                try {
                  return (
                    E(t, n, e, { level: 0 }),
                    [new h(m, l.Node.ELEMENT_NODE), ...n]
                  );
                } catch (t) {
                  return;
                }
              })(
                (0, u.parseScript)(
                  t,
                  { language: u.evaluateXPath.XPATH_3_1_LANGUAGE },
                  new l.Document(),
                ),
                e,
              );
          }));
        const i = n(953),
          c = n(712),
          u = n(594),
          l = s(n(898)),
          p = "http://www.w3.org/2005/XQueryX";
        function m(t) {
          return t;
        }
        class d extends c.Feature {
          constructor(t, e) {
            (super(e), (this.nodeExtractor = t));
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
        }
        class f extends d {
          matches(t) {
            var e;
            return (
              (null === (e = this.nodeExtractor(t)) || void 0 === e
                ? void 0
                : e.nodeType) === l.Node.ELEMENT_NODE &&
              t.namespaceURI === this.value
            );
          }
        }
        e.NodeNamespaceFeature = f;
        class h extends d {
          matches(t) {
            var e;
            return (
              (null === (e = this.nodeExtractor(t)) || void 0 === e
                ? void 0
                : e.nodeType) === this.value
            );
          }
        }
        e.NodeTypeFeature = h;
        class x extends d {
          matches(t) {
            var e;
            return (
              (null === (e = this.nodeExtractor(t)) || void 0 === e
                ? void 0
                : e.nodeName) === this.value
            );
          }
        }
        e.NodeNameFeature = x;
        class g extends d {
          matches(t) {
            var e;
            return (
              (null === (e = this.nodeExtractor(t)) || void 0 === e
                ? void 0
                : e.textContent) === this.value
            );
          }
        }
        e.NodeTextFeature = g;
        class w extends d {
          matches(t) {
            const e = this.nodeExtractor(t);
            return (
              e.nodeType === l.Node.ELEMENT_NODE &&
              e.getAttribute(this.value.name) === this.value.value
            );
          }
        }
        function v(t) {
          return (
            (function (t) {
              return 1 === t.nodeType;
            })(t) && t.namespaceURI === p
          );
        }
        function N(t, e) {
          return v(t) && t.localName === e;
        }
        function y(t, e) {
          for (const n of t.childNodes) if (N(n, e)) return n;
        }
        function T(t, e, n) {
          for (const o of t.childNodes) {
            if (!v(o)) continue;
            if (N(o, e) && (!n || n(o))) return o;
            const t = T(o, e, n);
            if (t) return t;
          }
        }
        function b(t) {
          var e;
          return (
            "descendant-or-self" ===
              (null === (e = y(t, "xpathAxis")) || void 0 === e
                ? void 0
                : e.textContent) && !!y(t, "anyKindTest")
          );
        }
        e.NodeAttributeFeature = w;
        class S extends Error {}
        function E(t, e, n, o) {
          var r, a;
          if (!v(t)) return;
          const s = t.localName;
          if (
            "module" === s ||
            "mainModule" === s ||
            "predicates" === s ||
            "queryBody" === s ||
            "andOp" === s ||
            "firstOperand" === s ||
            "secondOperand" === s
          )
            for (const r of t.childNodes) E(r, e, n, o);
          else if ("pathExpr" === s) {
            const r = t.childNodes.filter((t) => N(t, "stepExpr"));
            if (0 === r.length) throw new S();
            for (const t of r.slice(0, -1)) if (!b(t)) throw new S();
            E(r[r.length - 1], e, n, o);
          } else if ("stepExpr" === s) {
            const a =
              null === (r = y(t, "xpathAxis")) || void 0 === r
                ? void 0
                : r.textContent;
            if ("child" !== a) throw new S(`unsupported axis: ${a}`);
            if (o.level > 0) throw new S("Too many child axes.");
            for (const r of t.childNodes.slice(1))
              E(
                r,
                e,
                n,
                Object.assign(Object.assign({}, o), { level: o.level + 1 }),
              );
          } else if ("nameTest" === s) {
            const o = t.textContent;
            o && e.push(new x(m, o));
            const r = t.getAttributeNS(p, "prefix");
            if (r) {
              const t = null == n ? void 0 : n(r);
              if (!t) throw new S(`unresolved ns prefix: ${t}`);
              e.push(new f(m, t));
            }
            const a = t.getAttributeNS(p, "URI");
            a && e.push(new f(m, a));
          } else if ("Wildcard" === s) {
            const o = y(t, "NCName");
            if (o) {
              const t =
                null == n
                  ? void 0
                  : n(null !== (a = o.textContent) && void 0 !== a ? a : "");
              if (!t) throw new S(`unresolved ns prefix: ${t}`);
              e.push(new f(m, t));
            }
          } else {
            if ("equalOp" !== s) throw new S();
            {
              const n = y(t, "firstOperand"),
                o = y(t, "secondOperand");
              if (!n || !o) throw new S();
              const r = R(n, o) || R(o, n);
              if (!r) throw new S();
              e.push(r);
            }
          }
        }
        function R(t, e) {
          var n, o;
          const r = T(e, "value");
          if (!r) return;
          const a = null !== (n = r.textContent) && void 0 !== n ? n : "",
            s = T(t, "stepExpr", (t) => {
              var e;
              return (
                "attribute" ===
                (null === (e = y(t, "xpathAxis")) || void 0 === e
                  ? void 0
                  : e.textContent)
              );
            });
          if (s) {
            const t =
              null === (o = y(s, "nameTest")) || void 0 === o
                ? void 0
                : o.textContent;
            if (!t) return;
            return new w(m, { name: t, value: a });
          }
          return y(t, "contextItemExpr") || T(t, "textTest")
            ? new g(m, a)
            : void 0;
        }
      },
      324(t, e) {
        "use strict";
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.buildRuleTree = function t(e) {
            if (0 === e.length) return { results: [] };
            const n = new Set();
            for (const t of e) for (const e of t.features) n.add(e);
            if (0 === n.size) return { results: e.map((t) => t.result) };
            const o = Array.from(n)[0],
              r = [],
              a = [];
            for (const t of e)
              t.features.some((t) => t.equals(o)) ? r.push(t) : a.push(t);
            let s = { feature: o, results: [] };
            if (r.length > 0) {
              const e = r.map((t) =>
                Object.assign(Object.assign({}, t), {
                  features: t.features.filter((t) => !t.equals(o)),
                }),
              );
              s.left = t(e.filter((t) => t.features.length > 0));
              const n = r.filter((t, n) => 0 === e[n].features.length);
              n.length > 0 &&
                (s.left || (s.left = { results: [] }),
                (s.left.results = n.map((t) => t.result)));
            }
            return (a.length > 0 && (s.right = t(a)), s);
          }),
          (e.findMatchingRules = function (t, e) {
            const n = [],
              o = [t];
            for (; o.length > 0; ) {
              const t = o.pop();
              t &&
                (n.push(...t.results),
                t.feature &&
                  (t.right && o.push(t.right),
                  t.feature.matches(e) && t.left && o.push(t.left)));
            }
            return n;
          }));
      },
      953(t, e) {
        "use strict";
        function n(t, e) {
          return {
            type: "ExpressionStatement",
            expression: {
              type: "CallExpression",
              callee: t,
              arguments: e,
              optional: !1,
            },
          };
        }
        function o(t) {
          return { type: "Identifier", name: t };
        }
        function r(t) {
          return { type: "Literal", value: (t = null == t ? void 0 : t) };
        }
        function a(t, e) {
          return {
            type: "MemberExpression",
            object: o(t),
            property: o(e),
            computed: !1,
            optional: !1,
          };
        }
        function s(t, e) {
          return (
            e || (e = t),
            {
              type: "VariableDeclaration",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: o(t),
                  init: {
                    type: "CallExpression",
                    callee: o("require"),
                    arguments: [r(e)],
                    optional: !1,
                  },
                },
              ],
              kind: "let",
            }
          );
        }
        function i(t) {
          return { type: "ArrayExpression", elements: t };
        }
        function c(t, e, n) {
          return {
            type: "VariableDeclaration",
            declarations: [{ type: "VariableDeclarator", id: t, init: e }],
            kind: n,
          };
        }
        function u(t, e) {
          return { type: "NewExpression", callee: t, arguments: e };
        }
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.mkArrowFun = function (t) {
            return {
              type: "ArrowFunctionExpression",
              expression: !1,
              generator: !1,
              async: !1,
              params: [o("context")],
              body: { type: "BlockStatement", body: t },
            };
          }),
          (e.mkFun = function (t, e, n) {
            return {
              type: "FunctionDeclaration",
              id: t,
              generator: !1,
              async: !1,
              params: e,
              body: n,
            };
          }),
          (e.mkCall = n),
          (e.mkCallWithContext = function (t, e) {
            return n(t, [o("context"), ...e]);
          }),
          (e.mkIdentifier = o),
          (e.mkImports = function () {
            return [
              {
                type: "ImportDeclaration",
                attributes: [],
                specifiers: [
                  { type: "ImportNamespaceSpecifier", local: o("slimdom") },
                ],
                source: r("slimdom"),
              },
              {
                type: "ImportDeclaration",
                attributes: [],
                specifiers: [
                  {
                    type: "ImportSpecifier",
                    imported: o("evaluateXPathToString"),
                    local: o("evaluateXPathToString"),
                  },
                ],
                source: r("fontoxpath"),
              },
            ];
          }),
          (e.mkImportsNode = function () {
            return [s("slimdom"), s("fontoxpath"), s("xjslt", "xjslt")];
          }),
          (e.mkLiteral = r),
          (e.mkMember = a),
          (e.mkObject = function (t) {
            let e = [];
            for (let n in t)
              e.push({
                type: "Property",
                method: !1,
                shorthand: !1,
                computed: !1,
                key: r(n),
                value: t[n],
                kind: "init",
              });
            return { type: "ObjectExpression", properties: e };
          }),
          (e.mkRequire = s),
          (e.mkArray = i),
          (e.mkReturn = function (t) {
            return { type: "ReturnStatement", argument: t };
          }),
          (e.mkBlock = function (t) {
            return { type: "BlockStatement", body: t };
          }),
          (e.mkLet = function (t, e) {
            return c(t, e, "let");
          }),
          (e.mkConst = function (t, e) {
            return c(t, e, "const");
          }),
          (e.mkVariableDeclaration = c),
          (e.mkNew = u),
          (e.toEstree = function t(e) {
            const n = typeof e;
            return null == e ||
              "string" === n ||
              "number" === n ||
              "boolean" === n
              ? r(e)
              : Array.isArray(e)
                ? i(e.map((e) => t(e)))
                : "function" == typeof e.serialize
                  ? e.serialize()
                  : "function" === n
                    ? a("xjslt", e.name)
                    : "object" === n
                      ? e instanceof Map
                        ? u(o("Map"), [t(Array.from(e.entries()))])
                        : "type" in e
                          ? e
                          : (function (e) {
                              let n = [];
                              for (let o in e)
                                n.push({
                                  type: "Property",
                                  method: !1,
                                  shorthand: !1,
                                  computed: !1,
                                  key: t(o),
                                  value: t(e[o]),
                                  kind: "init",
                                });
                              return {
                                type: "ObjectExpression",
                                properties: n,
                              };
                            })(e)
                      : void 0;
          }));
      },
      379(t, e, n) {
        "use strict";
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.functionNameResolver = N),
          (e.registerFunctions = function () {
            ((0, o.registerCustomXPathFunction)(
              { namespaceURI: r.XJSLT_NSURI, localName: "current" },
              [],
              "item()",
              i,
            ),
              (0, o.registerCustomXPathFunction)(
                {
                  namespaceURI: r.XJSLT_NSURI,
                  localName: "current-output-uri",
                },
                [],
                "xs:string",
                d,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "doc" },
                ["xs:string"],
                "document-node()",
                c,
              ),
              (0, o.registerCustomXPathFunction)(
                {
                  namespaceURI: r.XJSLT_NSURI,
                  localName: "current-grouping-key",
                },
                [],
                "xs:string?",
                u,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "current-group" },
                [],
                "item()*",
                l,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "positionx" },
                [],
                "xs:integer",
                p,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "lastx" },
                [],
                "xs:integer",
                m,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "key" },
                ["xs:string", "item()*"],
                "node()*",
                f,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "system-property" },
                ["xs:string"],
                "xs:string",
                h,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "base-uri" },
                [],
                "xs:string?",
                x,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "base-uri" },
                ["node()?"],
                "xs:string?",
                x,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "evaluate" },
                ["xs:string"],
                "item()",
                (t, e) =>
                  (function ({ currentContext: t }, e) {
                    const n = (0, o.evaluateXPath)(
                      e,
                      void 0,
                      void 0,
                      void 0,
                      o.evaluateXPath.ALL_RESULTS_TYPE,
                      {
                        currentContext: { currentContext: t },
                        functionNameResolver: N,
                      },
                    );
                    return 1 === n.length ? n[0] : n;
                  })(t, e),
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "normalize-unicode" },
                ["xs:string?"],
                "xs:string",
                (t, e) => g(0, e, "NFC"),
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "normalize-unicode" },
                ["xs:string?", "xs:string"],
                "xs:string",
                g,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "format-number" },
                ["xs:numeric", "xs:string"],
                "xs:string",
                w,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "format-number" },
                ["xs:numeric", "xs:string", "xs:string"],
                "xs:string",
                w,
              ));
          }));
        const o = n(594),
          r = n(712),
          a = n(845),
          s = n(472);
        function i({ currentContext: t }) {
          return t.contextItem;
        }
        function c({ currentContext: t }, e) {
          return (0, s.urlToDom)(t, e);
        }
        function u({ currentContext: t }) {
          return t.currentGroup.key;
        }
        function l({ currentContext: t }) {
          return t.currentGroup.nodes;
        }
        function p({ currentContext: t }) {
          return t.position;
        }
        function m({ currentContext: t }) {
          return t.contextList.length;
        }
        function d({ currentContext: t }) {
          for (const [e, n] of t.resultDocuments)
            if (n === t.outputDocument) return e;
          return "#default";
        }
        function f({ currentContext: t }, e, n) {
          const {
            keys: o,
            contextItem: r,
            variableScopes: a,
            patternMatchCache: s,
          } = t;
          if (!o.has(e)) throw new Error("XTDE1260");
          return o.get(e).lookup(s, r.ownerDocument, a, n) || [];
        }
        function h(t, e) {
          return "version" === e.split(":")[1]
            ? "2.0"
            : "vendor" === e.split(":")[1]
              ? "xjslt"
              : "vendor-url" === e.split(":")[1]
                ? "https://github.com/egh/xjslt"
                : "product-name" === e.split(":")[1]
                  ? "xjslt"
                  : "product-version" === e.split(":")[1]
                    ? "0.1"
                    : "supports-backwards-compatibility" === e.split(":")[1] ||
                        "is-schema-aware" === e.split(":")[1] ||
                        "supports-serialization" === e.split(":")[1] ||
                        "supports-backwards-compatibility" === e.split(":")[1]
                      ? "no"
                      : "";
        }
        function x({ currentContext: t }, e) {
          const n = void 0 !== e ? e : t.contextItem;
          if (!n) return null;
          let o = n;
          const r = [];
          for (; o; ) {
            const t =
              1 === o.nodeType
                ? o.getAttributeNS(
                    "http://www.w3.org/XML/1998/namespace",
                    "base",
                  )
                : null;
            (t && r.unshift(t), (o = o.parentNode));
          }
          let a = t.inputURL || void 0;
          for (const t of r) a = URL.parse(t, a) || t;
          return a;
        }
        function g(t, e, n) {
          if (null == e) return "";
          const o = n.toUpperCase().replace("-", "");
          if (!["NFC", "NFD", "NFKC", "NFKD"].includes(o))
            throw new Error("FOCH0003: Normalization form not supported.");
          return e.normalize(o);
        }
        function w({ currentContext: t }, e, n, o) {
          var s, i;
          const c = o || "#default",
            u =
              null !==
                (i =
                  null === (s = t.decimalFormats) || void 0 === s
                    ? void 0
                    : s.get(c)) && void 0 !== i
                ? i
                : r.DEFAULT_DECIMAL_FORMAT;
          return (0, a.formatNumberWithPicture)(e, n, u);
        }
        const v = [
          "base-uri",
          "current",
          "current-group",
          "current-grouping-key",
          "current-output-uri",
          "doc",
          "format-number",
          "key",
          "lastx",
          "normalize-unicode",
          "positionx",
          "system-property",
        ];
        function N({ prefix: t, localName: e }, n) {
          return (t && "fn" !== t) || !v.includes(e)
            ? null
            : { namespaceURI: r.XJSLT_NSURI, localName: e };
        }
      },
      845(t, e, n) {
        "use strict";
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.toAlphabeticUpper = e.toAlphabetic = void 0),
          (e.groupNumeric = s),
          (e.toNumeric = i),
          (e.mkToAlphabetic = c),
          (e.toRoman = u),
          (e.formatWithToken = l),
          (e.formatNumber = function (t, e, n, o) {
            const r = [];
            e.prefix && r.push(e.prefix);
            for (let a = 0; a < t.length; a++) {
              const s = Math.min(a, e.formats.length - 1),
                i = e.formats[s];
              if (!i) throw new Error("No number format found");
              (i.separator && 0 !== a && r.push(i.separator),
                r.push(l(t[a], i.format, n, o)));
            }
            return (e.suffix && r.push(e.suffix), r.join(""));
          }),
          (e.remapDigits = m),
          (e.formatNumberWithPicture = function (t, e, n) {
            if (isNaN(t)) return n.nan;
            if (!isFinite(t)) return (t < 0 ? n.minusSign : "") + n.infinity;
            const a = e.split(n.patternSeparator);
            let c;
            if (t < 0)
              if (a.length > 1) c = p(a[1], n);
              else {
                const t = p(a[0], n);
                c = Object.assign(Object.assign({}, t), {
                  prefix: `${n.minusSign}${t.prefix || ""}`,
                });
              }
            else c = p(a[0], n);
            return (function (t, e, n) {
              var a;
              e.isPercent ? (t *= 100) : e.isPerMille && (t *= 1e3);
              const c = (0, o.evaluateXPathToNumber)(
                "round-half-to-even($number, $precision)",
                void 0,
                void 0,
                {
                  number: (0, r.wrapValue)(t, "xs:double"),
                  precision: (0, r.wrapValue)(e.decimalMaxDigits, "xs:integer"),
                },
              );
              let u = s(
                  i(Math.trunc(c), e.integerMinDigits),
                  n.groupingSeparator,
                  e.integerGroupSize,
                ),
                l =
                  null !== (a = c.toString().split(".")[1]) && void 0 !== a
                    ? a
                    : "";
              for (; l.length < e.decimalMinDigits; ) l += "0";
              const p = l.length > 0 ? n.decimalSeparator : "",
                d = n.zeroDigit.codePointAt(0);
              return (
                48 !== d && ((u = m(u, d)), (l = m(l, d))),
                `${e.prefix}${u}${p}${l}${e.suffix}`
              );
            })(Math.abs(t), c, n);
          }));
        const o = n(594),
          r = n(821),
          a = [
            49, 1633, 1777, 2407, 2535, 2663, 2791, 2919, 3047, 3175, 3303,
            3431, 3559, 3665, 3793, 3873, 4161, 4241, 6113, 6161, 6471, 6609,
            6785, 6801, 6993, 7089, 7233, 7249, 42529, 43217, 43265, 43473,
            43505, 43601, 44017, 65297, 66721, 68913, 69735, 69873, 69943,
            70097, 70385, 70737, 70865, 71249, 71361, 71473, 71905, 72785,
            73041, 73121, 92769, 93009, 120783, 120793, 120803, 120813, 120823,
            125265,
          ];
        function s(t, e, n) {
          if (!e || !n || t.length <= n) return t;
          const o = [];
          let r = t;
          for (; r.length > n; ) (o.unshift(r.slice(-n)), (r = r.slice(0, -n)));
          return (r && o.unshift(r), o.join(e));
        }
        function i(t, e) {
          return t.toString().padStart(e, "0");
        }
        function c(t, e) {
          const n = e - t + 1,
            o = [...Array(n)].map((e, n) => String.fromCodePoint(t + n));
          return function (t) {
            if (0 === t) return "0";
            let e = "",
              r = t;
            for (; r > 0; ) (r--, (e = o[r % n] + e), (r = Math.floor(r / n)));
            return e;
          };
        }
        function u(t) {
          const e = new Map([
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
          if (0 === t) return "0";
          let n = "",
            o = t;
          for (const [t, r] of e) for (; o >= t; ) ((n += r), (o -= t));
          return n;
        }
        function l(t, n, o, r) {
          if (isNaN(t) || !isFinite(t)) return "";
          if (/0*1/.test(n)) return s(i(t, n.length), o, r);
          if ("A" === n) return (0, e.toAlphabeticUpper)(t) || "";
          if ("a" === n) return (0, e.toAlphabetic)(t) || "";
          if ("I" === n) return u(t).toUpperCase();
          if ("i" === n) return u(t);
          for (const e of a) {
            if (49 === e) continue;
            const a = e - 1;
            if (
              new RegExp(
                `${String.fromCharCode(a)}*${String.fromCharCode(e)}`,
              ).test(n)
            )
              return s(m(i(t, n.length), a), o, r);
          }
          return s(i(t, n.length), o, r);
        }
        function p(t, e) {
          const n = e.zeroDigit,
            o = e.digit,
            r = e.decimalSeparator,
            a = e.groupingSeparator;
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
            for (; s < t.length && t[s] !== n && t[s] !== o && t[s] !== r; )
              (t[s] === e.percent && (u(), (i = !0)),
                t[s] === e.perMille && (u(), (c = !0)),
                (a += t[s++]));
            return a;
          }
          const p = l();
          let m,
            d = 0,
            f = 0,
            h = -1;
          for (; s < t.length && t[s] !== r; ) {
            const e = t[s];
            if (e === n) (d++, f++);
            else if (e === o) f++;
            else {
              if (e !== a) break;
              h = f;
            }
            s++;
          }
          h >= 0 && (m = f - h);
          let x = 0,
            g = 0;
          if (s < t.length && t[s] === r)
            for (s++; s < t.length; ) {
              const e = t[s];
              if (e === n) (x++, g++);
              else {
                if (e !== o) break;
                g++;
              }
              s++;
            }
          const w = l();
          if (s < t.length)
            throw new Error(
              `XTDE1310: Active characters after picture string suffix: ${t.slice(s)}`,
            );
          return {
            prefix: p,
            suffix: w,
            integerMinDigits: Math.max(d, 1),
            integerGroupSize: m,
            decimalMinDigits: x,
            decimalMaxDigits: g,
            isPercent: i,
            isPerMille: c,
          };
        }
        function m(t, e) {
          return [...t]
            .map((t) => {
              const n = t.codePointAt(0);
              return n >= 48 && n <= 57 ? String.fromCodePoint(e + n - 48) : t;
            })
            .join("");
        }
        ((e.toAlphabetic = c(97, 122)), (e.toAlphabeticUpper = c(65, 90)));
      },
      777(t, e) {
        "use strict";
        function n(t) {
          return "yes" === t;
        }
        function o(t) {
          return "omit" === t ? void 0 : "yes" === t;
        }
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.parseYesNo = n),
          (e.parseYesNoOmit = o),
          (e.isAlphanumeric = function (t) {
            return /^[\p{Nd}\p{Nl}\p{No}\p{Lu}\p{Ll}\p{Lt}\p{Lm}\p{Lo}]$/u.test(
              t,
            );
          }),
          (e.mkOutputDefinition = function (t) {
            return {
              omitXmlDeclaration: n(t.omitXmlDeclaration),
              standalone: o(t.standalone),
              doctypeSystem: t.doctypeSystem,
              doctypePublic: t.doctypePublic,
            };
          }),
          (e.mkResolver = function (t) {
            return (e) =>
              "" === e && "#xpath-default" in t
                ? t["#xpath-default"] || null
                : t[e];
          }),
          (e.determineNamespace = function (t, e, n) {
            let o = n;
            if (void 0 !== o) return [o, t];
            let r = "";
            return (
              t.includes(":") && ([r, t] = t.split(":")),
              (o = e(r)),
              [o, t]
            );
          }),
          (e.computeDefaultPriority = function t(e) {
            if (e && e.includes("|"))
              return Math.max(
                ...e
                  .split("|")
                  .filter((t) => "" !== t)
                  .map((e) => t(e)),
              );
            for (let [t, n] of i) if (t.test(e)) return n;
            return 0.5;
          }),
          (e.compareSortable = c),
          (e.sortSortable = function (t) {
            return t.sort(c);
          }),
          (e.zip = function (t, e) {
            if (void 0 === t || void 0 === e) return [];
            const n = Math.min(t.length, e.length);
            return t.slice(0, n).map((t, n) => [t, e[n]]);
          }));
        const r = String.raw`[^,:\(\)\*\[\]/]`,
          a = String.raw`(child::|attribute::|@)?`,
          s = String.raw`(document-node\()?`,
          i = new Map([
            [new RegExp(String.raw`^\s*/\s*$`), -0.5],
            [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${s}${a}processing-instruction`), 0],
            [new RegExp(String.raw`^\s*${s}${a}element\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${s}${a}attribute\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${s}${a}element\(${r}+\)\)?\s*$`), 0],
            [
              new RegExp(String.raw`^\s*${s}${a}element\(\*,\s*${r}+\)\)?\s*$`),
              0,
            ],
            [new RegExp(String.raw`^\s*${s}${a}attribute\(${r}+\)\)?\s*$`), 0],
            [
              new RegExp(
                String.raw`^\s*${s}${a}attribute\(\*,\s*${r}+\)\)?\s*$`,
              ),
              0,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${a}element\(${r}+,\s*${r}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${a}attribute\(${r}+,\s*${r}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${a}schema-element\(${r}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${a}schema-attribute\(${r}+\)\)?\s*$`,
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
            [new RegExp(String.raw`^\s*${a}(${r}:)?\*\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${a}\*:${r}+\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${a}${r}+\s*$`), 0],
          ]);
        function c(t, e) {
          const n = t.importPrecedence - e.importPrecedence;
          if (0 !== n) return n;
          {
            const n = e.priority - t.priority;
            return 0 !== n ? n : e.declarationOrder - t.declarationOrder;
          }
        }
      },
      472(t, e, n) {
        "use strict";
        var o,
          r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (t, e, n, o) {
                  void 0 === o && (o = n);
                  var r = Object.getOwnPropertyDescriptor(e, n);
                  ((r &&
                    !("get" in r
                      ? !e.__esModule
                      : r.writable || r.configurable)) ||
                    (r = {
                      enumerable: !0,
                      get: function () {
                        return e[n];
                      },
                    }),
                    Object.defineProperty(t, o, r));
                }
              : function (t, e, n, o) {
                  (void 0 === o && (o = n), (t[o] = e[n]));
                }),
          a =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (t, e) {
                  Object.defineProperty(t, "default", {
                    enumerable: !0,
                    value: e,
                  });
                }
              : function (t, e) {
                  t.default = e;
                }),
          s =
            (this && this.__importStar) ||
            ((o = function (t) {
              return (
                (o =
                  Object.getOwnPropertyNames ||
                  function (t) {
                    var e = [];
                    for (var n in t)
                      Object.prototype.hasOwnProperty.call(t, n) &&
                        (e[e.length] = n);
                    return e;
                  }),
                o(t)
              );
            }),
            function (t) {
              if (t && t.__esModule) return t;
              var e = {};
              if (null != t)
                for (var n = o(t), s = 0; s < n.length; s++)
                  "default" !== n[s] && r(e, t, n[s]);
              return (a(e, t), e);
            });
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.urlToDom = function (t, e) {
            const n = t.inputURL ? (0, i.resolve)(t.inputURL.toString(), e) : e;
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
      821(t, e, n) {
        "use strict";
        var o,
          r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (t, e, n, o) {
                  void 0 === o && (o = n);
                  var r = Object.getOwnPropertyDescriptor(e, n);
                  ((r &&
                    !("get" in r
                      ? !e.__esModule
                      : r.writable || r.configurable)) ||
                    (r = {
                      enumerable: !0,
                      get: function () {
                        return e[n];
                      },
                    }),
                    Object.defineProperty(t, o, r));
                }
              : function (t, e, n, o) {
                  (void 0 === o && (o = n), (t[o] = e[n]));
                }),
          a =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (t, e) {
                  Object.defineProperty(t, "default", {
                    enumerable: !0,
                    value: e,
                  });
                }
              : function (t, e) {
                  t.default = e;
                }),
          s =
            (this && this.__importStar) ||
            ((o = function (t) {
              return (
                (o =
                  Object.getOwnPropertyNames ||
                  function (t) {
                    var e = [];
                    for (var n in t)
                      Object.prototype.hasOwnProperty.call(t, n) &&
                        (e[e.length] = n);
                    return e;
                  }),
                o(t)
              );
            }),
            function (t) {
              if (t && t.__esModule) return t;
              var e = {};
              if (null != t)
                for (var n = o(t), s = 0; s < n.length; s++)
                  "default" !== n[s] && r(e, t, n[s]);
              return (a(e, t), e);
            });
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NodeTypeFeature =
            e.NodeTextFeature =
            e.NodeNameFeature =
            e.NodeNamespaceFeature =
            e.NodeAttributeFeature =
            e.selfNode =
            e.KeyImpl =
              void 0),
          (e.visitNodes = h),
          (e.dedupGenerator = b),
          (e.mergeTemplateGenerators = S),
          (e.processNode = E),
          (e.nextMatch = function (t, e) {
            const n = t.nextMatches;
            if (n) {
              const o = n.next();
              o.done ||
                $(
                  o.value,
                  Object.assign(Object.assign({}, t), { nextMatches: n }),
                  e.params,
                );
            }
          }),
          (e.applyImports = function (t, e) {
            const n = t.nextMatches;
            if (n) {
              let o = n.next();
              for (; !o.done && 1 === o.value.importPrecedence; ) o = n.next();
              o.done ||
                $(
                  o.value,
                  Object.assign(Object.assign({}, t), { nextMatches: n }),
                  e.params,
                );
            }
          }),
          (e.sort = C),
          (e.applyTemplates = function (t, e) {
            const n = (0, p.mkResolver)(e.namespaces),
              o = (0, i.evaluateXPathToNodes)(
                e.select,
                t.contextItem,
                void 0,
                A(t.variableScopes),
                {
                  currentContext: t,
                  namespaceResolver: n,
                  functionNameResolver: u.functionNameResolver,
                },
              );
            let r = e.mode || "#default";
            ("#current" === r && (r = t.mode),
              O(C(t, o, e.sortKeyComponents, n), t, (t) => {
                E(
                  Object.assign(Object.assign({}, t), {
                    mode: r,
                    variableScopes: j(t.variableScopes),
                  }),
                  e.params,
                  e.namespaces,
                );
              }));
          }),
          (e.callTemplate = function (t, e) {
            const n = t.namedTemplates.get(e.name);
            if (void 0 !== n) return $(t.templates[n], t, e.params);
            throw new Error(`Cannot find a template named ${e.name}`);
          }),
          (e.functionX = function (t, e) {
            const n = t.params.map((t) => "item()"),
              o = t.params.map((t) => t.name);
            (0, i.registerCustomXPathFunction)(
              { namespaceURI: t.namespace, localName: t.name },
              n,
              t.as || "item()",
              ({ currentContext: t }, ...n) => {
                let r = new Map();
                return (
                  o.forEach((t, e) => r.set(t, n[e])),
                  K(
                    Object.assign(Object.assign({}, t), {
                      variableScopes: [r].concat(t.variableScopes),
                    }),
                    e,
                  )
                );
              },
            );
          }),
          (e.copy = function (t, e, n) {
            const o = t.contextItem;
            let r, a;
            if (o.nodeType === l.NodeType.ELEMENT) {
              const e = o;
              r = t.outputDocument.createElementNS(
                e.namespaceURI,
                e.prefix ? `${e.prefix}:${e.localName}` : e.localName,
              );
              for (let n of e.attributes)
                if (n.namespaceURI === l.XMLNS_NSURI) {
                  const o = n.localName;
                  r.setAttributeNode(
                    t.outputDocument.importNode(
                      e.getAttributeNodeNS(l.XMLNS_NSURI, o),
                    ),
                  );
                }
            } else
              r =
                o.nodeType === l.NodeType.DOCUMENT
                  ? void 0
                  : t.outputDocument.importNode(o);
            (r && (a = t.append(r)),
              n &&
                n(
                  Object.assign(Object.assign({}, t), {
                    append: a || t.append,
                  }),
                ));
          }),
          (e.copyOf = function (t, e, n) {
            let o = (0, i.evaluateXPath)(
              e.select,
              t.contextItem,
              void 0,
              A(t.variableScopes),
              i.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: u.functionNameResolver,
              },
            );
            for (let e of o) t.append(e);
          }),
          (e.valueOf = function (t, e, n) {
            t.append(
              G(t, e.select || n, (0, p.mkResolver)(e.namespaces), e.separator),
            );
          }),
          (e.message = function (t, e, n) {
            const o = G(t, e.select || n, (0, p.mkResolver)(e.namespaces));
            if ("yes" === e.terminate) throw new Error(o);
            console.log(o);
          }),
          (e.text = function (t, e, n) {
            t.append(G(t, n, (0, p.mkResolver)(e.namespaces), [""]));
          }),
          (e.variable = function (t, e) {
            L(t.variableScopes, e.name, J(t, e));
          }),
          (e.param = function (t, e) {
            L(t.variableScopes, e.name, t.stylesheetParams[e.name] || J(t, e));
          }),
          (e.extendScope = j),
          (e.wrapValue = _),
          (e.setVariable = L),
          (e.mergeVariableScopes = A),
          (e.literalText = function (t, e) {
            t.append(e);
          }),
          (e.sequence = function (t, e) {
            const n = (0, i.evaluateXPath)(
              e.select,
              t.contextItem,
              void 0,
              A(t.variableScopes),
              i.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: u.functionNameResolver,
              },
            );
            t.append(n);
          }),
          (e.buildNode = U),
          (e.buildAttributeNode = F),
          (e.literalElement = function (t, e, n) {
            let o = U(t, { name: e.name, namespace: e.namespace });
            const r = (0, p.mkResolver)(e.namespaces);
            for (let n of e.attributes) {
              const e = B(t, n.value, r),
                a = F(t, { name: n.name, namespace: n.namespace, value: e });
              o.setAttributeNode(a);
            }
            const a = t.append(o);
            n(
              Object.assign(Object.assign({}, t), {
                variableScopes: j(t.variableScopes),
                append: a || t.append,
              }),
            );
          }),
          (e.attribute = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              r = B(t, e.name, o),
              [a, s] = (0, p.determineNamespace)(r, o, B(t, e.namespace, o)),
              i = F(t, {
                name: r,
                namespace: a,
                value: G(t, e.select || n, o, e.separator),
              });
            t.append(i);
          }),
          (e.processingInstruction = function (t, e, n) {
            const o = B(t, e.name, (0, p.mkResolver)(e.namespaces)),
              r = G(t, e.select || n, (0, p.mkResolver)(e.namespaces), [
                "",
              ]).trimStart();
            t.append(t.outputDocument.createProcessingInstruction(o, r));
          }),
          (e.comment = function (t, e, n) {
            const o = G(t, e.select || n, (0, p.mkResolver)(e.namespaces), [
              "",
            ]);
            t.append(t.outputDocument.createComment(o));
          }),
          (e.namespace = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              r = B(t, e.name, o),
              a = G(t, e.select || n, o, [""]),
              s = F(t, {
                name: `xmlns:${r}`,
                namespace: l.XMLNS_NSURI,
                value: a,
              });
            t.append(s);
          }),
          (e.element = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces);
            let r = B(t, e.name, o),
              a = B(t, e.namespace, o),
              s = U(t, {
                name: r,
                namespace: (0, p.determineNamespace)(
                  r,
                  (0, p.mkResolver)(e.namespaces),
                  a,
                )[0],
              });
            const i = t.append(s);
            n(
              Object.assign(Object.assign({}, t), {
                variableScopes: j(t.variableScopes),
                append: i || t.append,
              }),
            );
          }),
          (e.ifX = function (t, e, n) {
            (0, i.evaluateXPathToBoolean)(
              e.test,
              t.contextItem,
              void 0,
              A(t.variableScopes),
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: u.functionNameResolver,
              },
            ) && n(t);
          }),
          (e.choose = function (t, e) {
            for (let n of e) {
              if (!n.test) return n.apply(t);
              if (
                (0, i.evaluateXPathToBoolean)(
                  n.test,
                  t.contextItem,
                  void 0,
                  A(t.variableScopes),
                  {
                    currentContext: t,
                    functionNameResolver: u.functionNameResolver,
                  },
                )
              )
                return n.apply(t);
            }
          }),
          (e.document = function (t, e, n) {
            const o = t.outputDocument.implementation.createDocument(
                null,
                null,
                null,
              ),
              r = t.append(o);
            n(
              Object.assign(Object.assign({}, t), {
                outputDocument: o,
                append: r,
                mode: "#default",
                variableScopes: j(t.variableScopes),
              }),
            );
          }),
          (e.performSort = function (t, e) {
            const n = (0, p.mkResolver)(e.namespaces),
              o = (0, i.evaluateXPath)(
                e.select,
                t.contextItem,
                void 0,
                A(t.variableScopes),
                i.evaluateXPath.ALL_RESULTS_TYPE,
                {
                  currentContext: t,
                  namespaceResolver: n,
                  functionNameResolver: u.functionNameResolver,
                },
              );
            if (o && Symbol.iterator in Object(o)) {
              const r = C(t, o, e.sortKeyComponents, n);
              for (let e of r) t.append(e);
            }
          }),
          (e.forEach = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces);
            let r = (0, i.evaluateXPath)(
              e.select,
              t.contextItem,
              void 0,
              A(t.variableScopes),
              i.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: o,
                functionNameResolver: u.functionNameResolver,
              },
            );
            r &&
              Symbol.iterator in Object(r) &&
              ((r = C(t, r, e.sortKeyComponents, o)),
              O(r, t, (t) => {
                n(
                  Object.assign(Object.assign({}, t), {
                    variableScopes: j(t.variableScopes),
                  }),
                );
              }));
          }),
          (e.forEachGroup = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              r = A(t.variableScopes),
              a = (0, i.evaluateXPathToNodes)(
                e.select,
                t.contextItem,
                void 0,
                r,
                {
                  currentContext: t,
                  namespaceResolver: o,
                  functionNameResolver: u.functionNameResolver,
                },
              );
            if (a && Symbol.iterator in Object(a)) {
              let r = [];
              (e.groupBy
                ? (r = (function (t, e, n, o) {
                    const r = A(t.variableScopes);
                    let a = [];
                    return (
                      O(e, t, (t) => {
                        const e = (0, i.evaluateXPathToString)(
                          n,
                          t.contextItem,
                          void 0,
                          r,
                          {
                            currentContext: t,
                            namespaceResolver: o,
                            functionNameResolver: u.functionNameResolver,
                          },
                        );
                        let s = a.find((t) => t.key === e);
                        (s || ((s = { key: e, nodes: [] }), a.push(s)),
                          s.nodes.push(t.contextItem));
                      }),
                      a
                    );
                  })(t, a, e.groupBy, o))
                : e.groupAdjacent
                  ? (r = (function (t, e, n, o) {
                      const r = A(t.variableScopes);
                      let a = [],
                        s = null,
                        c = [];
                      return (
                        O(e, t, (t) => {
                          const e = t.contextItem,
                            l = (0, i.evaluateXPathToString)(n, e, void 0, r, {
                              currentContext: t,
                              namespaceResolver: o,
                              functionNameResolver: u.functionNameResolver,
                            });
                          l !== s
                            ? (k(a, c, s), (s = l), (c = [e]))
                            : c.push(e);
                        }),
                        k(a, c, s),
                        a
                      );
                    })(t, a, e.groupAdjacent, o))
                  : e.groupEndingWith
                    ? (r = (function (t, e, n, o) {
                        let r = [],
                          a = [];
                        return (
                          O(e, t, (t) => {
                            const e = t.contextItem;
                            (a.push(e),
                              T(
                                t.patternMatchCache,
                                n,
                                e,
                                t.variableScopes,
                                o,
                              ) && (k(r, a), (a = [])));
                          }),
                          k(r, a),
                          r
                        );
                      })(t, a, e.groupEndingWith, o))
                    : e.groupStartingWith &&
                      (r = (function (t, e, n, o) {
                        let r = [],
                          a = [];
                        return (
                          O(e, t, (t) => {
                            const e = t.contextItem;
                            (T(
                              t.patternMatchCache,
                              n,
                              e,
                              t.variableScopes,
                              o,
                            ) && (k(r, a), (a = [])),
                              a.push(e));
                          }),
                          k(r, a),
                          r
                        );
                      })(t, a, e.groupStartingWith, o)),
                (r = C(t, r, e.sortKeyComponents, o)),
                P(r, t, n));
            }
          }),
          (e.number = function (t, e) {
            const n = (0, p.mkResolver)(e.namespaces),
              o = A(t.variableScopes);
            let r;
            (e.value
              ? (r = (0, i.evaluateXPathToNumber)(
                  e.value,
                  t.contextItem,
                  void 0,
                  o,
                  {
                    currentContext: t,
                    namespaceResolver: n,
                    functionNameResolver: u.functionNameResolver,
                  },
                ))
              : "single" === e.level &&
                void 0 === e.value &&
                void 0 === e.select &&
                void 0 === e.count &&
                (r = t.position),
              t.append(
                (0, m.formatNumber)(
                  [r],
                  e.format,
                  e.groupingSeparator,
                  e.groupingSize,
                ),
              ));
          }),
          (e.mkNodeAppender = Y),
          (e.mkArrayAppender = z),
          (e.resultDocument = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces);
            function r(e) {
              return B(t, e, o);
            }
            const a = r(e.format);
            let s = (0, p.mkOutputDefinition)({
              omitXmlDeclaration: r(e.omitXmlDeclaration),
              doctypePublic: r(e.doctypePublic),
              doctypeSystem: r(e.doctypeSystem),
              standalone: r(e.standalone),
            });
            Object.keys(s).forEach((t) => {
              s[t] || delete s[t];
            });
            const i = Object.assign(
                Object.assign({}, a ? t.outputDefinitions.get(a) : {}),
                s,
              ),
              c = r(e.href);
            let u = null;
            if (
              ((i.doctypePublic || i.doctypeSystem) &&
                (u = t.outputDocument.implementation.createDocumentType(
                  "out",
                  i.doctypePublic || "",
                  i.doctypeSystem || "",
                )),
              c)
            ) {
              const e = t.outputDocument.implementation.createDocument(
                null,
                null,
                u,
              );
              if (t.resultDocuments.has(c))
                throw new Error(`XTDE1490: ${c} is a duplicate`);
              (t.resultDocuments.set(
                c,
                Object.assign(Object.assign({}, i), { document: e }),
              ),
                n(
                  Object.assign(Object.assign({}, t), {
                    outputDocument: e,
                    append: Y(e),
                  }),
                ));
            } else {
              if (t.outputDocument.documentElement) throw new Error("XTDE1490");
              let e = t.outputDocument;
              (u &&
                ((e = t.outputDocument.implementation.createDocument(
                  null,
                  null,
                  u,
                )),
                (t.outputDocument = e),
                (t.append = Y(e))),
                t.resultDocuments.set(
                  "#default",
                  Object.assign(Object.assign({}, i), { document: e }),
                ),
                n(t));
            }
          }),
          (e.stripSpace = function (t, e) {
            const n = RegExp("^[ \n\r\t]+$");
            let o = [];
            !(function t(r) {
              if (r.nodeType === l.NodeType.TEXT)
                n.test(r.textContent) &&
                  (function (t, e) {
                    let n = new Map();
                    for (const o of e) {
                      const e = (0, p.mkResolver)(o.namespaces);
                      if (T(n, o.match, t, [], e)) return !o.preserve;
                    }
                    return !1;
                  })(r.parentNode, e) &&
                  o.push(r);
              else if (r.hasChildNodes && r.hasChildNodes())
                for (let e of r.childNodes) t(e);
            })(t);
            for (let t of o) t.remove();
            return t;
          }),
          (e.evaluateAttributeValueTemplate = B),
          (e.serialize = function (t) {
            const e = new c.XMLSerializer();
            if (!0 !== t.omitXmlDeclaration) {
              let e = new Map([
                ["version", "1.0"],
                ["encoding", "UTF-8"],
                ["standalone", void 0],
              ]);
              void 0 !== t.standalone &&
                e.set("standalone", t.standalone ? "yes" : "no");
              const n = Array.from(e)
                .map(([t, e]) => (e ? `${t}="${e}"` : ""))
                .join(" ");
              t.document.insertBefore(
                t.document.createProcessingInstruction("xml", n),
                t.document.firstChild,
              );
            }
            return e.serializeToString(t.document);
          }),
          (e.setParamDefaults = function (t, e) {
            return (
              e || (e = {}),
              e.outputDocument ||
                (e.outputDocument = t.implementation.createDocument(
                  null,
                  null,
                )),
              e.outputNode || (e.outputNode = e.outputDocument),
              e.initialMode || (e.initialMode = "#default"),
              e.stylesheetParams || (e.stylesheetParams = {}),
              e
            );
          }),
          (e.compileMatchFunction = function (t) {
            try {
              return new Function(t);
            } catch (t) {
              return;
            }
          }),
          (e.initialize = function (t, e) {}));
        const i = n(594),
          c = s(n(898)),
          u = n(379),
          l = n(712),
          p = n(777),
          m = n(845),
          d = n(324),
          f = n(320);
        function h(t, e) {
          if ((e(t), t.childNodes)) for (let n of t.childNodes) h(n, e);
        }
        function x(t) {
          return Array.isArray(t)
            ? t.map((t) => x(t)).join("")
            : t.nodeType
              ? t.textContent
              : t.toString();
        }
        function g(t, e, n, o) {
          t.has(e) || t.set(e, new Map());
          const r = t.get(e);
          return (r.has(n) || r.set(n, o()), r.get(n));
        }
        (Object.defineProperty(e, "selfNode", {
          enumerable: !0,
          get: function () {
            return f.selfNode;
          },
        }),
          Object.defineProperty(e, "NodeAttributeFeature", {
            enumerable: !0,
            get: function () {
              return f.NodeAttributeFeature;
            },
          }),
          Object.defineProperty(e, "NodeNamespaceFeature", {
            enumerable: !0,
            get: function () {
              return f.NodeNamespaceFeature;
            },
          }),
          Object.defineProperty(e, "NodeNameFeature", {
            enumerable: !0,
            get: function () {
              return f.NodeNameFeature;
            },
          }),
          Object.defineProperty(e, "NodeTextFeature", {
            enumerable: !0,
            get: function () {
              return f.NodeTextFeature;
            },
          }),
          Object.defineProperty(e, "NodeTypeFeature", {
            enumerable: !0,
            get: function () {
              return f.NodeTypeFeature;
            },
          }),
          (e.KeyImpl = class {
            constructor(t, e, n) {
              ((this.match = t),
                (this.use = e),
                (this.namespaces = n),
                (this.cache = new Map()));
            }
            buildDocumentCache(t, e, n) {
              let o = new Map();
              return (
                h(e, (e) => {
                  if (
                    "string" == typeof this.use &&
                    T(
                      t,
                      { xpath: this.match },
                      e,
                      n,
                      (0, p.mkResolver)(this.namespaces),
                    )
                  ) {
                    let t = (0, i.evaluateXPathToString)(this.use, e);
                    (o.has(t) || o.set(t, []), o.set(t, o.get(t).concat(e)));
                  }
                }),
                o
              );
            }
            lookup(t, e, n, o) {
              return (
                this.cache.has(e) ||
                  this.cache.set(e, this.buildDocumentCache(t, e, n)),
                this.cache.get(e).get(x(o))
              );
            }
          }));
        const w = new RegExp(/^[a-z |-]+$/),
          v = new RegExp(/^@[a-z]+$/),
          N = new RegExp(/text\(\)|node\(\)/),
          y = new RegExp(/@|attribute|node/);
        function T(t, e, n, o, r) {
          return !(
            !n ||
            (function (t, e) {
              return (
                (e.nodeType === l.NodeType.ATTRIBUTE && !y.exec(t)) ||
                (e.nodeType === l.NodeType.TEXT && !N.exec(t)) ||
                !(!w.exec(t) || e.nodeType === l.NodeType.ELEMENT) ||
                !(!v.exec(t) || e.nodeType === l.NodeType.ATTRIBUTE)
              );
            })(e.xpath, n) ||
            (!(function (t, e) {
              return "text()|@*" === t
                ? e.nodeType === l.NodeType.TEXT ||
                    e.nodeType === l.NodeType.ATTRIBUTE
                : "processing-instruction()|comment()" === t
                  ? e.nodeType === l.NodeType.PROCESSING_INSTRUCTION ||
                    e.nodeType === l.NodeType.COMMENT
                  : "*|/" === t
                    ? e.nodeType === l.NodeType.ELEMENT ||
                      e.nodeType === l.NodeType.DOCUMENT
                    : "text()" === t
                      ? e.nodeType === l.NodeType.TEXT
                      : "/" === t && e.nodeType === l.NodeType.DOCUMENT;
            })(e.xpath, n) &&
              void 0 ===
                (function (t, e, n, o, r) {
                  let a = n;
                  for (; a; ) {
                    const s = g(t, e.xpath, a, () =>
                      e.compiled
                        ? (0, i.executeJavaScriptCompiledXPath)(e.compiled, a)
                        : (0, i.evaluateXPathToNodes)(
                            e.xpath,
                            a,
                            void 0,
                            A(o),
                            {
                              namespaceResolver: r,
                              functionNameResolver: u.functionNameResolver,
                            },
                          ),
                    );
                    if (-1 !== s.indexOf(n)) return s;
                    a =
                      a.parentNode ||
                      (a.nodeType === l.NodeType.ATTRIBUTE && a.ownerElement);
                  }
                })(t, e, n, o, r))
          );
        }
        function* b(t) {
          let e = new Set(),
            n = t.next();
          for (; !n.done; )
            (e.has(n.value) || (yield n.value, e.add(n.value)), (n = t.next()));
        }
        function* S(t, e) {
          let n = [t.next(), e.next()];
          for (; !n[0].done || !n[1].done; )
            n[0].done
              ? (yield n[1].value, (n[1] = e.next()))
              : n[1].done || (0, p.compareSortable)(n[0].value, n[1].value) < 0
                ? (yield n[0].value, (n[0] = t.next()))
                : (yield n[1].value, (n[1] = e.next()));
        }
        function E(t, e, n) {
          let o = (function* (t, e, n, o) {
              const r = (0, d.findMatchingRules)(e, t).map((t) => n[t]);
              for (let t of (0, p.sortSortable)(r))
                ("#all" === t.modes[0] || t.modes.includes(o)) && (yield t);
            })(t.contextItem, t.ruleTree, t.templates, t.mode),
            r = (function* (t, e, n, o, r, a, s) {
              for (let [i, c] of n) {
                const n = o[c];
                i &&
                  ("#all" === n.modes[0] || n.modes.includes(a)) &&
                  T(t, i, e, r, (0, p.mkResolver)(s)) &&
                  (yield n);
              }
            })(
              t.patternMatchCache,
              t.contextItem,
              t.nonRuleTemplateIndexes,
              t.templates,
              t.variableScopes,
              t.mode,
              n,
            ),
            a = b(S(o, r));
          const s = a.next();
          s.done ||
            $(
              s.value,
              Object.assign(Object.assign({}, t), { nextMatches: a }),
              e,
            );
        }
        function R(t, e, n, o) {
          let r;
          return (
            (r =
              "number" === n.dataType
                ? (function (t, e, n, o) {
                    const r = I(e, t, (t) => {
                      let e;
                      const r = G(t, n.sortKey, o);
                      return (
                        (e = Number(r)),
                        isNaN(e) && (e = Number.MIN_SAFE_INTEGER),
                        e
                      );
                    });
                    return (0, p.zip)(r, e)
                      .sort((t, e) => t[0] - e[0])
                      .map((t) => t[1]);
                  })(t, e, n, o)
                : (function (t, e, n, o) {
                    const r = I(e, t, (t) => G(t, n.sortKey, o)),
                      a = n.lang && B(t, n.lang, o);
                    let s = new Intl.Collator(a).compare;
                    return (0, p.zip)(r, e)
                      .sort((t, e) => s(t[0], e[0]))
                      .map((t) => t[1]);
                  })(t, e, n, o)),
            "descending" === B(t, n.order, o) && r.reverse(),
            r
          );
        }
        function I(t, e, n) {
          if (t.length > 0)
            return (0, l.isNodeGroupArray)(t) ? P(t, e, n) : O(t, e, n);
        }
        function O(t, e, n) {
          let o = 0;
          return t.map(
            (r) => (
              o++,
              n(
                Object.assign(Object.assign({}, e), {
                  contextItem: r,
                  contextList: t,
                  position: o,
                }),
              )
            ),
          );
        }
        function P(t, e, n) {
          let o = 0;
          return t.map((t) => {
            o++;
            const r = Object.assign(Object.assign({}, e), {
              contextItem: t.nodes[0],
              contextList: t.nodes,
              currentGroup: t,
              position: o,
              variableScopes: j(e.variableScopes),
            });
            return n(r);
          });
        }
        function C(t, e, n, o) {
          if (n) for (let r of [...n].reverse()) e = R(t, e, r, o);
          return e;
        }
        function D(t, e) {
          for (let n of e) if (n.name === t) return n;
        }
        function $(t, e, n) {
          let o = j(e.variableScopes);
          for (let r of t.allowedParams) {
            let t = D(r.name, n);
            void 0 !== t ? L(o, t.name, J(e, t)) : L(o, r.name, J(e, r));
          }
          return t.apply(
            Object.assign(Object.assign({}, e), { variableScopes: o }),
          );
        }
        function j(t) {
          return t.concat([new Map()]);
        }
        let M = new Map();
        function X(t) {
          return (
            M.has(t) || M.set(t, (0, i.createTypedValueFactory)(t)),
            M.get(t)
          );
        }
        function _(t, e) {
          if (Array.isArray(t) && 0 === t.length) return X("item()*")([], null);
          if (e)
            try {
              return X(e)(t, null);
            } catch (t) {}
          const n = Array.isArray(t),
            o = n ? t[0] : t;
          let r = "item()";
          const a = n ? "*" : "";
          return (
            "string" == typeof o
              ? (r = "xs:string")
              : "number" == typeof o &&
                (r = Number.isInteger(o) ? "xs:integer" : "xs:numeric"),
            X(`${r}${a}`)(t, null)
          );
        }
        function L(t, e, n) {
          t[t.length - 1].set(e, n);
        }
        function A(t) {
          let e = {};
          for (let n of t) for (let [t, o] of n) e[t] = o;
          return e;
        }
        function U(t, e) {
          let n;
          return (
            (n =
              void 0 !== e.namespace && null !== e.namespace
                ? t.outputDocument.createElementNS(e.namespace, e.name)
                : t.outputDocument.createElement(e.name)),
            n
          );
        }
        function F(t, e) {
          let n;
          return (
            (n = e.namespace
              ? t.outputDocument.createAttributeNS(e.namespace, e.name)
              : t.outputDocument.createAttribute(e.name)),
            (n.value = e.value),
            n
          );
        }
        function k(t, e, n) {
          e.length > 0 &&
            (null === n && (n = `group-${t.length + 1}`),
            t.push({ key: n, nodes: e }));
        }
        function Y(t) {
          const e = t.ownerDocument || t;
          return function n(o) {
            if (o.length && o.values) {
              let t = !0;
              const e = o.length > 0 && !o[0].nodeType;
              for (let r of o) (t ? (t = !1) : e && n(" "), n(r));
            } else if ("string" == typeof o) {
              if (t.nodeType !== l.NodeType.DOCUMENT)
                if (t.lastChild && t.lastChild.nodeType === l.NodeType.TEXT)
                  t.lastChild.appendData(o);
                else if ("" !== o) {
                  const n = e.createTextNode(o);
                  n && t.append(n);
                }
            } else if (o.nodeType === l.NodeType.ATTRIBUTE) {
              let n = e.importNode(o, !0);
              t.setAttributeNode(n);
            } else {
              if (o.nodeType === l.NodeType.DOCUMENT) {
                const t = o;
                return (o = o.documentElement) ? (n(o), Y(o)) : Y(t);
              }
              if (o.nodeType === l.NodeType.DOCUMENT_FRAGMENT) n(o.childNodes);
              else if (o.nodeType === l.NodeType.TEXT) n(o.data);
              else {
                if (o.nodeType) {
                  let n = e.importNode(o, !0);
                  return (t.append(n), Y(n));
                }
                n(`${o}`);
              }
            }
          };
        }
        function z(t) {
          return function (e) {
            if (
              (t.push(e),
              e.nodeType &&
                (e.nodeType === l.NodeType.DOCUMENT ||
                  e.nodeType === l.NodeType.ELEMENT))
            )
              return Y(e);
          };
        }
        function B(t, e, n) {
          if (e)
            return e
              .map((e) =>
                "string" == typeof e
                  ? e
                  : (0, i.evaluateXPathToString)(
                      e.xpath,
                      t.contextItem,
                      void 0,
                      A(t.variableScopes),
                      {
                        currentContext: t,
                        namespaceResolver: n,
                        functionNameResolver: u.functionNameResolver,
                      },
                    ),
              )
              .join("");
        }
        function G(t, e, n, o) {
          o || (o = "string" == typeof e ? [" "] : []);
          const r = B(t, o, n);
          return "string" == typeof e
            ? (0, i.evaluateXPath)(
                e,
                t.contextItem,
                void 0,
                A(t.variableScopes),
                i.evaluateXPath.STRINGS_TYPE,
                {
                  currentContext: t,
                  namespaceResolver: n,
                  functionNameResolver: u.functionNameResolver,
                },
              ).join(r)
            : (function (t) {
                let e = [];
                return (
                  h(t, (t) => {
                    t.nodeType === l.NodeType.TEXT &&
                      "" !== t.data &&
                      (e = e.concat(t.data));
                  }),
                  e
                );
              })(K(t, e)).join(r);
        }
        function J(t, e) {
          if ("string" == typeof e.content) {
            const n = e.as && e.as.match(/[\+\*]$/);
            let o = (0, i.evaluateXPath)(
              e.content,
              t.contextItem,
              void 0,
              A(t.variableScopes),
              i.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: u.functionNameResolver,
              },
            );
            return (1 !== o.length || n || (o = o[0]), _(o, e.as));
          }
          return null == e.content
            ? ""
            : e.as
              ? _(
                  (function (t, e) {
                    let n = [];
                    return (
                      e(
                        Object.assign(Object.assign({}, t), {
                          append: z(n),
                          mode: "#default",
                          variableScopes: j(t.variableScopes),
                        }),
                      ),
                      1 === n.length ? n[0] : n
                    );
                  })(t, e.content),
                  e.as,
                )
              : K(t, e.content);
        }
        function K(t, e) {
          return (function (t, e) {
            const n = t.outputDocument.createDocumentFragment();
            if (
              (e(Y(n)), 1 === n.childNodes.length && 1 === n.childElementCount)
            ) {
              const e = t.outputDocument.implementation.createDocument(
                null,
                null,
                null,
              );
              return (e.appendChild(n.firstChild), e);
            }
            return n;
          })(t, (n) => {
            e(
              Object.assign(Object.assign({}, t), {
                append: n,
                outputDocument: t.outputDocument,
                mode: "#default",
                variableScopes: j(t.variableScopes),
              }),
            );
          });
        }
        (0, u.registerFunctions)();
      },
      594(t) {
        "use strict";
        t.exports = require("fontoxpath");
      },
      898(t) {
        "use strict";
        t.exports = require("slimdom");
      },
      896(t) {
        "use strict";
        t.exports = require("fs");
      },
      16(t) {
        "use strict";
        t.exports = require("url");
      },
    },
    e = {},
    n = (function n(o) {
      var r = e[o];
      if (void 0 !== r) return r.exports;
      var a = (e[o] = { exports: {} });
      return (t[o].call(a.exports, a, a.exports, n), a.exports);
    })(362);
  module.exports = n.transform;
})();
