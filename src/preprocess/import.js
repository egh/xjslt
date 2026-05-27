(() => {
  var e = {
      100(e, t, n) {
        (n(898), n(594));
        let o = n(821);
        function r(e, t) {
          t = o.setParamDefaults(e, t);
          let n = new Map();
          n.set("#default", { document: t.outputDocument });
          let r = new Map(),
            a = new Map(),
            s = new Map(),
            i = {
              outputDocument: t.outputDocument,
              append: o.mkNodeAppender(t.outputNode),
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
                  namespaces: {
                    xjslt: "https://www.e6h.org/xjslt",
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                  },
                  importPrecedence: 17976931348623157e292,
                  declarationOrder: 5e-324,
                },
                {
                  apply: (e) => {
                    o.valueOf(e, {
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
                  apply: (e) => {
                    o.applyTemplates(e, {
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
                  apply: (e) => {
                    o.copy(
                      e,
                      {
                        namespaces: {
                          xjslt: "https://www.e6h.org/xjslt",
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                      },
                      (e) => {
                        o.applyTemplates(e, {
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
                  allowedParams: [
                    {
                      name: "import-precedence",
                      content: void 0,
                      namespaces: {},
                      as: void 0,
                    },
                  ],
                  apply: (e) => {
                    o.copy(
                      e,
                      {
                        namespaces: {
                          xjslt: "https://www.e6h.org/xjslt",
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                      },
                      (e) => {
                        (o.applyTemplates(e, {
                          select: "@* | node()",
                          mode: "#default",
                          params: [],
                          sortKeyComponents: [],
                          namespaces: {
                            xjslt: "https://www.e6h.org/xjslt",
                            xsl: "http://www.w3.org/1999/XSL/Transform",
                          },
                        }),
                          o.attribute(
                            e,
                            {
                              name: ["import-precedence"],
                              separator: void 0,
                              select: "$import-precedence",
                              namespace: ["https://www.e6h.org/xjslt"],
                              namespaces: {
                                xjslt: "https://www.e6h.org/xjslt",
                                xsl: "http://www.w3.org/1999/XSL/Transform",
                              },
                            },
                            (e) => {},
                          ));
                      },
                    );
                  },
                  namespaces: {
                    xjslt: "https://www.e6h.org/xjslt",
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                  },
                  priority: 0.5,
                  declarationOrder: 2,
                  importPrecedence: 1,
                },
                {
                  modes: ["#default"],
                  allowedParams: [
                    {
                      name: "import-precedence",
                      content: void 0,
                      namespaces: {},
                      as: void 0,
                    },
                  ],
                  apply: (e) => {
                    o.copy(
                      e,
                      {
                        namespaces: {
                          xjslt: "https://www.e6h.org/xjslt",
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                      },
                      (e) => {
                        (o.applyTemplates(e, {
                          select: "@* | node()",
                          mode: "#default",
                          params: [],
                          sortKeyComponents: [],
                          namespaces: {
                            xjslt: "https://www.e6h.org/xjslt",
                            xsl: "http://www.w3.org/1999/XSL/Transform",
                          },
                        }),
                          o.attribute(
                            e,
                            {
                              name: ["import-precedence"],
                              separator: void 0,
                              select: "$import-precedence",
                              namespace: ["https://www.e6h.org/xjslt"],
                              namespaces: {
                                xjslt: "https://www.e6h.org/xjslt",
                                xsl: "http://www.w3.org/1999/XSL/Transform",
                              },
                            },
                            (e) => {},
                          ));
                      },
                    );
                  },
                  namespaces: {
                    xjslt: "https://www.e6h.org/xjslt",
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                  },
                  priority: 0.5,
                  declarationOrder: 3,
                  importPrecedence: 1,
                },
                {
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (e) => {
                    (o.variable(e, {
                      name: "doc",
                      content: "doc(@href)",
                      namespaces: {
                        xjslt: "https://www.e6h.org/xjslt",
                        xsl: "http://www.w3.org/1999/XSL/Transform",
                      },
                      as: void 0,
                    }),
                      o.variable(e, {
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
                        e,
                        {
                          test: "not($use-when) or xjslt:evaluate($use-when)",
                          namespaces: {
                            xjslt: "https://www.e6h.org/xjslt",
                            xsl: "http://www.w3.org/1999/XSL/Transform",
                          },
                        },
                        (e) => {
                          o.applyTemplates(e, {
                            select:
                              "$doc/xsl:stylesheet/* | $doc/xsl:transform/*",
                            mode: "#default",
                            params: [
                              {
                                name: "import-precedence",
                                content: "positionx() + $base-precedence",
                                namespaces: {
                                  xjslt: "https://www.e6h.org/xjslt",
                                  xsl: "http://www.w3.org/1999/XSL/Transform",
                                },
                                as: void 0,
                              },
                            ],
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
                  declarationOrder: 4,
                  importPrecedence: 1,
                },
              ],
              nonRuleTemplateIndexes: [
                [
                  {
                    xpath: "xsl:import",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-import");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-import")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "import" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  6,
                ],
                [
                  {
                    xpath: "xsl:strip-space",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-strip-space");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-strip-space")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "strip-space" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  5,
                ],
                [
                  {
                    xpath: "xsl:preserve-space",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-preserve-space");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-preserve-space")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "preserve-space" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  5,
                ],
                [
                  {
                    xpath: "xsl:template",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-template");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "template" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  4,
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
              ],
              namedTemplates: new Map([]),
              variableScopes: [new Map()],
              inputURL: t.inputURL,
              ruleTree: {
                feature: new o.NodeTypeFeature(o.selfNode, 7),
                results: [],
                left: { results: [0] },
                right: {
                  feature: new o.NodeTypeFeature(o.selfNode, 8),
                  results: [],
                  left: { results: [0] },
                  right: {
                    feature: new o.NodeTypeFeature(o.selfNode, 3),
                    results: [],
                    left: { results: [1] },
                    right: {
                      feature: new o.NodeTypeFeature(o.selfNode, 2),
                      results: [],
                      left: { results: [1, 3] },
                      right: {
                        feature: new o.NodeTypeFeature(o.selfNode, 1),
                        results: [],
                        left: { results: [2] },
                        right: {
                          feature: new o.NodeTypeFeature(o.selfNode, 9),
                          results: [],
                          left: { results: [2, 3] },
                        },
                      },
                    },
                  },
                },
              },
              keys: r,
              outputDefinitions: a,
              decimalFormats: s,
              patternMatchCache: new Map(),
              stylesheetParams: t.stylesheetParams,
            };
          return (
            o.initialize(i, {
              xjslt: "https://www.e6h.org/xjslt",
              xsl: "http://www.w3.org/1999/XSL/Transform",
            }),
            o.param(i, {
              name: "base-precedence",
              content: void 0,
              namespaces: {},
              as: void 0,
            }),
            o.stripSpace(e, []),
            o.processNode(i, [], {
              xjslt: "https://www.e6h.org/xjslt",
              xsl: "http://www.w3.org/1999/XSL/Transform",
            }),
            n
          );
        }
        ((e.exports.transform = r), (global.transform = r));
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
        const o = n(953),
          r = String.raw`[^,:\(\)\*\[\]/]`,
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
              return (0, o.mkNew)(
                (0, o.mkMember)("xjslt", this.constructor.name),
                [(0, o.toEstree)(this.value)],
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
        var o,
          r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, n, o) {
                  void 0 === o && (o = n);
                  var r = Object.getOwnPropertyDescriptor(t, n);
                  ((r &&
                    !("get" in r
                      ? !t.__esModule
                      : r.writable || r.configurable)) ||
                    (r = {
                      enumerable: !0,
                      get: function () {
                        return t[n];
                      },
                    }),
                    Object.defineProperty(e, o, r));
                }
              : function (e, t, n, o) {
                  (void 0 === o && (o = n), (e[o] = t[n]));
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
            ((o = function (e) {
              return (
                (o =
                  Object.getOwnPropertyNames ||
                  function (e) {
                    var t = [];
                    for (var n in e)
                      Object.prototype.hasOwnProperty.call(e, n) &&
                        (t[t.length] = n);
                    return t;
                  }),
                o(e)
              );
            }),
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var n = o(e), s = 0; s < n.length; s++)
                  "default" !== n[s] && r(t, e, n[s]);
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
          (t.greatGrandParentNode = h),
          (t.xpathToFeatures = function (e, t) {
            if (e)
              return (function (e, t) {
                const n = [];
                try {
                  return (I(e, n, t), n);
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
        function h(e) {
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
        class x extends c.Feature {
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
        class g extends x {
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
        t.NodeNamespaceFeature = g;
        class w extends x {
          matches(e) {
            var t;
            return (
              (null === (t = this.nodeExtractor(e)) || void 0 === t
                ? void 0
                : t.nodeType) === this.value
            );
          }
        }
        t.NodeTypeFeature = w;
        class v extends x {
          matches(e) {
            var t;
            return (
              (null === (t = this.nodeExtractor(e)) || void 0 === t
                ? void 0
                : t.nodeName) === this.value
            );
          }
        }
        t.NodeNameFeature = v;
        class N extends x {
          matches(e) {
            var t;
            return (
              (null === (t = this.nodeExtractor(e)) || void 0 === t
                ? void 0
                : t.textContent) === this.value
            );
          }
        }
        t.NodeTextFeature = N;
        class y extends x {
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
        function E(e, t, n) {
          for (const o of e.childNodes) {
            if (!b(o)) continue;
            if (T(o, t) && (!n || n(o))) return o;
            const e = E(o, t, n);
            if (e) return e;
          }
        }
        t.NodeAttributeFeature = y;
        class R extends Error {}
        function I(e, t, n) {
          if (!b(e)) return;
          const o = e.localName;
          if ("module" === o || "mainModule" === o || "queryBody" === o)
            for (const o of e.childNodes) I(o, t, n);
          else {
            if ("pathExpr" !== o) throw new R();
            {
              const o = e.childNodes.filter((e) => T(e, "stepExpr"));
              if (T(e.firstChild, "rootExpr")) {
                if (0 === o.length)
                  return void t.push(new w(m, l.Node.DOCUMENT_NODE));
                if (
                  "descendant-or-self" !==
                    (null === (a = S((r = o[0]), "xpathAxis")) || void 0 === a
                      ? void 0
                      : a.textContent) ||
                  !S(r, "anyKindTest")
                )
                  throw new R();
                o.shift();
              }
              if (0 === o.length) throw new R();
              const s = o.reverse();
              if (0 == s.length || s.length > 4) throw new R();
              (O(m, s[0], t, n),
                s[1] && O(d, s[1], t, n),
                s[2] && O(f, s[2], t, n),
                s[3] && O(h, s[3], t, n));
            }
          }
          var r, a;
        }
        function j(e, t, n) {
          "attribute" === t
            ? n.push(new w(e, l.Node.ATTRIBUTE_NODE))
            : n.push(new w(e, l.Node.ELEMENT_NODE));
        }
        function O(e, t, n, o) {
          var r, a;
          const s =
            null === (r = S(t, "xpathAxis")) || void 0 === r
              ? void 0
              : r.textContent;
          if ("child" !== s && "attribute" !== s)
            throw new R(`unsupported axis: ${s}`);
          for (const r of t.childNodes.slice(1)) {
            if (!b(r)) continue;
            const i = r.localName;
            if ("nameTest" === i) (P(e, t, n, o), j(e, s, n));
            else if ("Wildcard" === i) {
              const t = S(r, "NCName");
              if (t) {
                const r =
                  null == o
                    ? void 0
                    : o(null !== (a = t.textContent) && void 0 !== a ? a : "");
                if (!r) throw new R(`unresolved ns prefix: ${r}`);
                n.push(new g(e, r));
              }
              j(e, s, n);
            } else if ("piTest" === i) {
              n.push(new w(e, l.Node.PROCESSING_INSTRUCTION_NODE));
              const t = S(r, "piTarget");
              (null == t ? void 0 : t.textContent) &&
                n.push(new v(e, t.textContent));
            } else if ("commentTest" === i)
              n.push(new w(e, l.Node.COMMENT_NODE));
            else if ("textTest" === i) n.push(new w(e, l.Node.TEXT_NODE));
            else {
              if ("predicates" !== i) throw new R();
              $(e, r, n, o);
            }
          }
        }
        function P(e, t, n, o) {
          const r = S(t, "nameTest");
          if (!r) throw new R();
          const a = r.textContent;
          a && n.push(new v(e, a));
          const s = r.getAttributeNS(p, "prefix");
          if (s) {
            const t = null == o ? void 0 : o(s);
            if (!t) throw new R(`unresolved ns prefix: ${t}`);
            n.push(new g(e, t));
          }
          const i = r.getAttributeNS(p, "URI");
          i && n.push(new g(e, i));
        }
        function $(e, t, n, o) {
          for (const r of t.childNodes) {
            if (!b(r)) throw new R();
            const t = r.localName;
            if ("equalOp" === t) {
              const t = S(r, "firstOperand"),
                o = S(r, "secondOperand");
              if (!t || !o) throw new R();
              const a = C(e, t, o) || C(e, o, t);
              if (!a) throw new R();
              n.push(a);
            } else {
              if ("andOp" !== t) throw new R();
              ($(e, S(r, "firstOperand"), n, o),
                $(e, S(r, "secondOperand"), n, o));
            }
          }
        }
        function C(e, t, n) {
          var o, r;
          const a = E(n, "value");
          if (!a) return;
          const s = null !== (o = a.textContent) && void 0 !== o ? o : "",
            i = E(t, "stepExpr", (e) => {
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
              null === (r = S(i, "nameTest")) || void 0 === r
                ? void 0
                : r.textContent;
            if (!t) return;
            return new y(e, { name: t, value: s });
          }
          return S(t, "contextItemExpr") || E(t, "textTest")
            ? new N(e, s)
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
            const o = Array.from(n)[0],
              r = [],
              a = [];
            for (const e of t)
              e.features.some((e) => e.equals(o)) ? r.push(e) : a.push(e);
            let s = { feature: o, results: [] };
            if (r.length > 0) {
              const t = r.map((e) =>
                Object.assign(Object.assign({}, e), {
                  features: e.features.filter((e) => !e.equals(o)),
                }),
              );
              s.left = e(t.filter((e) => e.features.length > 0));
              const n = r.filter((e, n) => 0 === t[n].features.length);
              n.length > 0 &&
                (s.left || (s.left = { results: [] }),
                (s.left.results = n.map((e) => e.result)));
            }
            return (a.length > 0 && (s.right = e(a)), s);
          }),
          (t.findMatchingRules = function (e, t) {
            const n = [],
              o = [e];
            for (; o.length > 0; ) {
              const e = o.pop();
              e &&
                (n.push(...e.results),
                e.feature &&
                  (e.right && o.push(e.right),
                  e.feature.matches(t) && e.left && o.push(e.left)));
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
        function o(e) {
          return { type: "Identifier", name: e };
        }
        function r(e) {
          return { type: "Literal", value: (e = e ?? void 0) };
        }
        function a(e, t) {
          return {
            type: "MemberExpression",
            object: o(e),
            property: o(t),
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
                  id: o(e),
                  init: {
                    type: "CallExpression",
                    callee: o("require"),
                    arguments: [r(t)],
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
              params: [o("context")],
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
            return n(e, [o("context"), ...t]);
          }),
          (t.mkIdentifier = o),
          (t.mkImports = function () {
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
          (t.mkImportsNode = function () {
            return [s("slimdom"), s("fontoxpath"), s("xjslt", "xjslt")];
          }),
          (t.mkLiteral = r),
          (t.mkMember = a),
          (t.mkObject = function (e) {
            let t = [];
            for (let n in e)
              t.push({
                type: "Property",
                method: !1,
                shorthand: !1,
                computed: !1,
                key: r(n),
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
              ? r(t)
              : Array.isArray(t)
                ? i(t.map((t) => e(t)))
                : "function" == typeof t.serialize
                  ? t.serialize()
                  : "function" === n
                    ? a("xjslt", t.name)
                    : "object" === n
                      ? t instanceof Map
                        ? u(o("Map"), [e(Array.from(t.entries()))])
                        : "type" in t
                          ? t
                          : (function (t) {
                              let n = [];
                              for (let o in t)
                                n.push({
                                  type: "Property",
                                  method: !1,
                                  shorthand: !1,
                                  computed: !1,
                                  key: e(o),
                                  value: e(t[o]),
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
                g,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "base-uri" },
                [],
                "xs:string?",
                w,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "base-uri" },
                ["node()?"],
                "xs:string?",
                w,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "evaluate" },
                ["xs:string"],
                "item()",
                (e, t) =>
                  (function ({ currentContext: e }, t) {
                    const n = (0, o.evaluateXPath)(
                      t,
                      void 0,
                      void 0,
                      void 0,
                      o.evaluateXPath.ALL_RESULTS_TYPE,
                      {
                        currentContext: { currentContext: e },
                        functionNameResolver: b,
                      },
                    );
                    return 1 === n.length ? n[0] : n;
                  })(e, t),
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "normalize-unicode" },
                ["xs:string?"],
                "xs:string",
                (e, t) => v(0, t, "NFC"),
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "normalize-unicode" },
                ["xs:string?", "xs:string"],
                "xs:string",
                v,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "element-available" },
                ["xs:string"],
                "xs:boolean",
                x,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "format-number" },
                ["xs:numeric", "xs:string"],
                "xs:string",
                N,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "format-number" },
                ["xs:numeric", "xs:string", "xs:string"],
                "xs:string",
                N,
              ));
          }));
        const o = n(594),
          r = n(712),
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
            keys: o,
            contextItem: r,
            variableScopes: a,
            patternMatchCache: s,
          } = e;
          if (!o.has(t)) throw new Error("XTDE1260");
          return o.get(t).lookup(s, r.ownerDocument, a, n) || [];
        }
        const h = new Set([
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
        function x(e, t) {
          const [n, o] = t.split(":");
          return !(!n || !o) && h.has(o);
        }
        function g(e, t) {
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
        function w({ currentContext: e }, t) {
          const n = void 0 !== t ? t : e.contextItem;
          if (!n) return null;
          let o = n;
          const r = [];
          for (; o; ) {
            const e =
              1 === o.nodeType
                ? o.getAttributeNS(
                    "http://www.w3.org/XML/1998/namespace",
                    "base",
                  )
                : null;
            (e && r.unshift(e), (o = o.parentNode));
          }
          let a = e.inputURL || void 0;
          for (const e of r) a = new URL(e, a) || e;
          return a;
        }
        function v(e, t, n) {
          if (null == t) return "";
          const o = n.toUpperCase().replace("-", "");
          if (!["NFC", "NFD", "NFKC", "NFKD"].includes(o))
            throw new Error("FOCH0003: Normalization form not supported.");
          return t.normalize(o);
        }
        function N({ currentContext: e }, t, n, o) {
          var s, i;
          const c = o || "#default",
            u =
              null !==
                (i =
                  null === (s = e.decimalFormats) || void 0 === s
                    ? void 0
                    : s.get(c)) && void 0 !== i
                ? i
                : r.DEFAULT_DECIMAL_FORMAT;
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
            : { namespaceURI: r.XJSLT_NSURI, localName: t };
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
          (t.formatNumber = function (e, t, n, o) {
            const r = [];
            t.prefix && r.push(t.prefix);
            for (let a = 0; a < e.length; a++) {
              const s = Math.min(a, t.formats.length - 1),
                i = t.formats[s];
              if (!i) throw new Error("No number format found");
              (i.separator && 0 !== a && r.push(i.separator),
                r.push(l(e[a], i.format, n, o)));
            }
            return (t.suffix && r.push(t.suffix), r.join(""));
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
              const c = (0, o.evaluateXPathToNumber)(
                "round-half-to-even($number, $precision)",
                void 0,
                void 0,
                {
                  number: (0, r.wrapValue)(e, "xs:double"),
                  precision: (0, r.wrapValue)(t.decimalMaxDigits, "xs:integer"),
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
        function s(e, t, n) {
          if (!t || !n || e.length <= n) return e;
          const o = [];
          let r = e;
          for (; r.length > n; ) (o.unshift(r.slice(-n)), (r = r.slice(0, -n)));
          return (r && o.unshift(r), o.join(t));
        }
        function i(e, t) {
          return e.toString().padStart(t, "0");
        }
        function c(e, t) {
          const n = t - e + 1,
            o = [...Array(n)].map((t, n) => String.fromCodePoint(e + n));
          return function (e) {
            if (0 === e) return "0";
            let t = "",
              r = e;
            for (; r > 0; ) (r--, (t = o[r % n] + t), (r = Math.floor(r / n)));
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
            o = e;
          for (const [e, r] of t) for (; o >= e; ) ((n += r), (o -= e));
          return n;
        }
        function l(e, n, o, r) {
          if (isNaN(e) || !isFinite(e)) return "";
          if (/0*1/.test(n)) return s(i(e, n.length), o, r);
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
              return s(m(i(e, n.length), a), o, r);
          }
          return s(i(e, n.length), o, r);
        }
        function p(e, t) {
          const n = t.zeroDigit,
            o = t.digit,
            r = t.decimalSeparator,
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
            for (; s < e.length && e[s] !== n && e[s] !== o && e[s] !== r; )
              (e[s] === t.percent && (u(), (i = !0)),
                e[s] === t.perMille && (u(), (c = !0)),
                (a += e[s++]));
            return a;
          }
          const p = l();
          let m,
            d = 0,
            f = 0,
            h = -1;
          for (; s < e.length && e[s] !== r; ) {
            const t = e[s];
            if (t === n) (d++, f++);
            else if (t === o) f++;
            else {
              if (t !== a) break;
              h = f;
            }
            s++;
          }
          h >= 0 && (m = f - h);
          let x = 0,
            g = 0;
          if (s < e.length && e[s] === r)
            for (s++; s < e.length; ) {
              const t = e[s];
              if (t === n) (x++, g++);
              else {
                if (t !== o) break;
                g++;
              }
              s++;
            }
          const w = l();
          if (s < e.length)
            throw new Error(
              `XTDE1310: Active characters after picture string suffix: ${e.slice(s)}`,
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
        function o(e) {
          return "omit" === e ? void 0 : "yes" === e;
        }
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.parseYesNo = n),
          (t.parseYesNoOmit = o),
          (t.isAlphanumeric = function (e) {
            return /^[\p{Nd}\p{Nl}\p{No}\p{Lu}\p{Ll}\p{Lt}\p{Lm}\p{Lo}]$/u.test(
              e,
            );
          }),
          (t.mkOutputDefinition = function (e) {
            return {
              omitXmlDeclaration: n(e.omitXmlDeclaration),
              standalone: o(e.standalone),
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
            let o = n;
            if (void 0 !== o) return [o, e];
            let r = "";
            return (
              e.includes(":") && ([r, e] = e.split(":")),
              (o = t(r)),
              [o, e]
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
        var o,
          r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, n, o) {
                  void 0 === o && (o = n);
                  var r = Object.getOwnPropertyDescriptor(t, n);
                  ((r &&
                    !("get" in r
                      ? !t.__esModule
                      : r.writable || r.configurable)) ||
                    (r = {
                      enumerable: !0,
                      get: function () {
                        return t[n];
                      },
                    }),
                    Object.defineProperty(e, o, r));
                }
              : function (e, t, n, o) {
                  (void 0 === o && (o = n), (e[o] = t[n]));
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
            ((o = function (e) {
              return (
                (o =
                  Object.getOwnPropertyNames ||
                  function (e) {
                    var t = [];
                    for (var n in e)
                      Object.prototype.hasOwnProperty.call(e, n) &&
                        (t[t.length] = n);
                    return t;
                  }),
                o(e)
              );
            }),
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var n = o(e), s = 0; s < n.length; s++)
                  "default" !== n[s] && r(t, e, n[s]);
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
        var o,
          r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, n, o) {
                  void 0 === o && (o = n);
                  var r = Object.getOwnPropertyDescriptor(t, n);
                  ((r &&
                    !("get" in r
                      ? !t.__esModule
                      : r.writable || r.configurable)) ||
                    (r = {
                      enumerable: !0,
                      get: function () {
                        return t[n];
                      },
                    }),
                    Object.defineProperty(e, o, r));
                }
              : function (e, t, n, o) {
                  (void 0 === o && (o = n), (e[o] = t[n]));
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
            ((o = function (e) {
              return (
                (o =
                  Object.getOwnPropertyNames ||
                  function (e) {
                    var t = [];
                    for (var n in e)
                      Object.prototype.hasOwnProperty.call(e, n) &&
                        (t[t.length] = n);
                    return t;
                  }),
                o(e)
              );
            }),
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var n = o(e), s = 0; s < n.length; s++)
                  "default" !== n[s] && r(t, e, n[s]);
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
          (t.visitNodes = h),
          (t.dedupGenerator = b),
          (t.mergeTemplateGenerators = T),
          (t.processNode = S),
          (t.nextMatch = function (e, t) {
            const n = e.nextMatches;
            if (n) {
              const o = n.next();
              o.done ||
                $(
                  o.value,
                  Object.assign(Object.assign({}, e), { nextMatches: n }),
                  t.params,
                );
            }
          }),
          (t.applyImports = function (e, t) {
            const n = e.nextMatches;
            if (n) {
              let o = n.next();
              for (; !o.done && 1 === o.value.importPrecedence; ) o = n.next();
              o.done ||
                $(
                  o.value,
                  Object.assign(Object.assign({}, e), { nextMatches: n }),
                  t.params,
                );
            }
          }),
          (t.sort = O),
          (t.applyTemplates = function (e, t) {
            const n = (0, p.mkResolver)(t.namespaces),
              o = (0, i.evaluateXPathToNodes)(
                t.select,
                e.contextItem,
                void 0,
                _(e.variableScopes),
                {
                  currentContext: e,
                  namespaceResolver: n,
                  functionNameResolver: u.functionNameResolver,
                },
              );
            let r = t.mode || "#default";
            ("#current" === r && (r = e.mode),
              I(O(e, o, t.sortKeyComponents, n), e, (e) => {
                S(
                  Object.assign(Object.assign({}, e), {
                    mode: r,
                    variableScopes: C(e.variableScopes),
                  }),
                  t.params,
                  t.namespaces,
                );
              }));
          }),
          (t.callTemplate = function (e, t) {
            const n = e.namedTemplates.get(t.name);
            if (void 0 !== n) return $(e.templates[n], e, t.params);
            throw new Error(`Cannot find a template named ${t.name}`);
          }),
          (t.functionX = function (e, t) {
            const n = e.params.map((e) => "item()"),
              o = e.params.map((e) => e.name);
            (0, i.registerCustomXPathFunction)(
              { namespaceURI: e.namespace, localName: e.name },
              n,
              e.as || "item()",
              ({ currentContext: e }, ...n) => {
                let r = new Map();
                return (
                  o.forEach((e, t) => r.set(e, n[t])),
                  B(
                    Object.assign(Object.assign({}, e), {
                      variableScopes: [r].concat(e.variableScopes),
                    }),
                    t,
                  )
                );
              },
            );
          }),
          (t.copy = function (e, t, n) {
            const o = e.contextItem;
            let r, a;
            if (o.nodeType === l.NodeType.ELEMENT) {
              const t = o;
              r = e.outputDocument.createElementNS(
                t.namespaceURI,
                t.prefix ? `${t.prefix}:${t.localName}` : t.localName,
              );
              for (let n of t.attributes)
                if (n.namespaceURI === l.XMLNS_NSURI) {
                  const o = n.localName;
                  r.setAttributeNode(
                    e.outputDocument.importNode(
                      t.getAttributeNodeNS(l.XMLNS_NSURI, o),
                    ),
                  );
                }
            } else
              r =
                o.nodeType === l.NodeType.DOCUMENT
                  ? void 0
                  : e.outputDocument.importNode(o);
            (r && (a = e.append(r)),
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
              _(e.variableScopes),
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
              Y(e, t.select || n, (0, p.mkResolver)(t.namespaces), t.separator),
            );
          }),
          (t.message = function (e, t, n) {
            const o = Y(e, t.select || n, (0, p.mkResolver)(t.namespaces));
            if ("yes" === t.terminate) throw new Error(o);
            console.log(o);
          }),
          (t.text = function (e, t, n) {
            e.append(Y(e, n, (0, p.mkResolver)(t.namespaces), [""]));
          }),
          (t.variable = function (e, t) {
            M(e.variableScopes, t.name, J(e, t));
          }),
          (t.param = function (e, t) {
            M(e.variableScopes, t.name, e.stylesheetParams[t.name] || J(e, t));
          }),
          (t.extendScope = C),
          (t.wrapValue = L),
          (t.setVariable = M),
          (t.mergeVariableScopes = _),
          (t.literalText = function (e, t) {
            e.append(t);
          }),
          (t.sequence = function (e, t) {
            const n = (0, i.evaluateXPath)(
              t.select,
              e.contextItem,
              void 0,
              _(e.variableScopes),
              i.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: e,
                namespaceResolver: (0, p.mkResolver)(t.namespaces),
                functionNameResolver: u.functionNameResolver,
              },
            );
            e.append(n);
          }),
          (t.buildNode = F),
          (t.buildAttributeNode = U),
          (t.literalElement = function (e, t, n) {
            let o = F(e, { name: t.name, namespace: t.namespace });
            const r = (0, p.mkResolver)(t.namespaces);
            for (let n of t.attributes) {
              const t = G(e, n.value, r),
                a = U(e, { name: n.name, namespace: n.namespace, value: t });
              o.setAttributeNode(a);
            }
            const a = e.append(o);
            n(
              Object.assign(Object.assign({}, e), {
                variableScopes: C(e.variableScopes),
                append: a || e.append,
              }),
            );
          }),
          (t.attribute = function (e, t, n) {
            const o = (0, p.mkResolver)(t.namespaces),
              r = G(e, t.name, o),
              [a, s] = (0, p.determineNamespace)(r, o, G(e, t.namespace, o)),
              i = U(e, {
                name: r,
                namespace: a,
                value: Y(e, t.select || n, o, t.separator),
              });
            e.append(i);
          }),
          (t.processingInstruction = function (e, t, n) {
            const o = G(e, t.name, (0, p.mkResolver)(t.namespaces)),
              r = Y(e, t.select || n, (0, p.mkResolver)(t.namespaces), [
                "",
              ]).trimStart();
            e.append(e.outputDocument.createProcessingInstruction(o, r));
          }),
          (t.comment = function (e, t, n) {
            const o = Y(e, t.select || n, (0, p.mkResolver)(t.namespaces), [
              "",
            ]);
            e.append(e.outputDocument.createComment(o));
          }),
          (t.namespace = function (e, t, n) {
            const o = (0, p.mkResolver)(t.namespaces),
              r = G(e, t.name, o),
              a = Y(e, t.select || n, o, [""]),
              s = U(e, {
                name: `xmlns:${r}`,
                namespace: l.XMLNS_NSURI,
                value: a,
              });
            e.append(s);
          }),
          (t.element = function (e, t, n) {
            const o = (0, p.mkResolver)(t.namespaces);
            let r = G(e, t.name, o),
              a = G(e, t.namespace, o),
              s = F(e, {
                name: r,
                namespace: (0, p.determineNamespace)(
                  r,
                  (0, p.mkResolver)(t.namespaces),
                  a,
                )[0],
              });
            const i = e.append(s);
            n(
              Object.assign(Object.assign({}, e), {
                variableScopes: C(e.variableScopes),
                append: i || e.append,
              }),
            );
          }),
          (t.ifX = function (e, t, n) {
            (0, i.evaluateXPathToBoolean)(
              t.test,
              e.contextItem,
              void 0,
              _(e.variableScopes),
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
                  _(e.variableScopes),
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
            const o = e.outputDocument.implementation.createDocument(
                null,
                null,
                null,
              ),
              r = e.append(o);
            n(
              Object.assign(Object.assign({}, e), {
                outputDocument: o,
                append: r,
                mode: "#default",
                variableScopes: C(e.variableScopes),
              }),
            );
          }),
          (t.performSort = function (e, t) {
            const n = (0, p.mkResolver)(t.namespaces),
              o = (0, i.evaluateXPath)(
                t.select,
                e.contextItem,
                void 0,
                _(e.variableScopes),
                i.evaluateXPath.ALL_RESULTS_TYPE,
                {
                  currentContext: e,
                  namespaceResolver: n,
                  functionNameResolver: u.functionNameResolver,
                },
              );
            if (o && Symbol.iterator in Object(o)) {
              const r = O(e, o, t.sortKeyComponents, n);
              for (let t of r) e.append(t);
            }
          }),
          (t.forEach = function (e, t, n) {
            const o = (0, p.mkResolver)(t.namespaces);
            let r = (0, i.evaluateXPath)(
              t.select,
              e.contextItem,
              void 0,
              _(e.variableScopes),
              i.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: e,
                namespaceResolver: o,
                functionNameResolver: u.functionNameResolver,
              },
            );
            r &&
              Symbol.iterator in Object(r) &&
              ((r = O(e, r, t.sortKeyComponents, o)),
              I(r, e, (e) => {
                n(
                  Object.assign(Object.assign({}, e), {
                    variableScopes: C(e.variableScopes),
                  }),
                );
              }));
          }),
          (t.forEachGroup = function (e, t, n) {
            const o = (0, p.mkResolver)(t.namespaces),
              r = _(e.variableScopes),
              a = (0, i.evaluateXPathToNodes)(
                t.select,
                e.contextItem,
                void 0,
                r,
                {
                  currentContext: e,
                  namespaceResolver: o,
                  functionNameResolver: u.functionNameResolver,
                },
              );
            if (a && Symbol.iterator in Object(a)) {
              let r = [];
              (t.groupBy
                ? (r = (function (e, t, n, o) {
                    const r = _(e.variableScopes);
                    let a = [];
                    return (
                      I(t, e, (e) => {
                        const t = (0, i.evaluateXPathToString)(
                          n,
                          e.contextItem,
                          void 0,
                          r,
                          {
                            currentContext: e,
                            namespaceResolver: o,
                            functionNameResolver: u.functionNameResolver,
                          },
                        );
                        let s = a.find((e) => e.key === t);
                        (s || ((s = { key: t, nodes: [] }), a.push(s)),
                          s.nodes.push(e.contextItem));
                      }),
                      a
                    );
                  })(e, a, t.groupBy, o))
                : t.groupAdjacent
                  ? (r = (function (e, t, n, o) {
                      const r = _(e.variableScopes);
                      let a = [],
                        s = null,
                        c = [];
                      return (
                        I(t, e, (e) => {
                          const t = e.contextItem,
                            l = (0, i.evaluateXPathToString)(n, t, void 0, r, {
                              currentContext: e,
                              namespaceResolver: o,
                              functionNameResolver: u.functionNameResolver,
                            });
                          l !== s
                            ? (A(a, c, s), (s = l), (c = [t]))
                            : c.push(t);
                        }),
                        A(a, c, s),
                        a
                      );
                    })(e, a, t.groupAdjacent, o))
                  : t.groupEndingWith
                    ? (r = (function (e, t, n, o) {
                        let r = [],
                          a = [];
                        return (
                          I(t, e, (e) => {
                            const t = e.contextItem;
                            (a.push(t),
                              y(
                                e.patternMatchCache,
                                n,
                                t,
                                e.variableScopes,
                                o,
                              ) && (A(r, a), (a = [])));
                          }),
                          A(r, a),
                          r
                        );
                      })(e, a, t.groupEndingWith, o))
                    : t.groupStartingWith &&
                      (r = (function (e, t, n, o) {
                        let r = [],
                          a = [];
                        return (
                          I(t, e, (e) => {
                            const t = e.contextItem;
                            (y(
                              e.patternMatchCache,
                              n,
                              t,
                              e.variableScopes,
                              o,
                            ) && (A(r, a), (a = [])),
                              a.push(t));
                          }),
                          A(r, a),
                          r
                        );
                      })(e, a, t.groupStartingWith, o)),
                (r = O(e, r, t.sortKeyComponents, o)),
                j(r, e, n));
            }
          }),
          (t.number = function (e, t) {
            const n = (0, p.mkResolver)(t.namespaces),
              o = _(e.variableScopes);
            let r;
            (t.value
              ? (r = (0, i.evaluateXPathToNumber)(
                  t.value,
                  e.contextItem,
                  void 0,
                  o,
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
                (r = e.position),
              e.append(
                (0, m.formatNumber)(
                  [r],
                  t.format,
                  t.groupingSeparator,
                  t.groupingSize,
                ),
              ));
          }),
          (t.mkNodeAppender = k),
          (t.mkArrayAppender = z),
          (t.resultDocument = function (e, t, n) {
            const o = (0, p.mkResolver)(t.namespaces);
            function r(t) {
              return G(e, t, o);
            }
            const a = r(t.format);
            let s = (0, p.mkOutputDefinition)({
              omitXmlDeclaration: r(t.omitXmlDeclaration),
              doctypePublic: r(t.doctypePublic),
              doctypeSystem: r(t.doctypeSystem),
              standalone: r(t.standalone),
            });
            Object.keys(s).forEach((e) => {
              s[e] || delete s[e];
            });
            const i = Object.assign(
                Object.assign({}, a ? e.outputDefinitions.get(a) : {}),
                s,
              ),
              c = r(t.href);
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
            let o = [];
            !(function e(r) {
              if (r.nodeType === l.NodeType.TEXT)
                n.test(r.textContent) &&
                  (function (e, t) {
                    let n = new Map();
                    for (const o of t) {
                      const t = (0, p.mkResolver)(o.namespaces);
                      if (y(n, o.match, e, [], t)) return !o.preserve;
                    }
                    return !1;
                  })(r.parentNode, t) &&
                  o.push(r);
              else if (r.hasChildNodes && r.hasChildNodes())
                for (let t of r.childNodes) e(t);
            })(e);
            for (let e of o) e.remove();
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
        function h(e, t) {
          if ((t(e), e.childNodes)) for (let n of e.childNodes) h(n, t);
        }
        function x(e) {
          return Array.isArray(e)
            ? e.map((e) => x(e)).join("")
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
              let o = new Map();
              return (
                h(t, (t) => {
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
                    (o.has(e) || o.set(e, []), o.set(e, o.get(e).concat(t)));
                  }
                }),
                o
              );
            }
            lookup(e, t, n, o) {
              return (
                this.cache.has(t) ||
                  this.cache.set(t, this.buildDocumentCache(e, t, n)),
                this.cache.get(t).get(x(o))
              );
            }
          }));
        const g = new RegExp(/^[a-z |-]+$/),
          w = new RegExp(/^@[a-z]+$/),
          v = new RegExp(/text\(\)|node\(\)/),
          N = new RegExp(/@|attribute|node/);
        function y(e, t, n, o, r) {
          return !(
            (n &&
              (function (e, t) {
                return (
                  (t.nodeType === l.NodeType.ATTRIBUTE && !N.exec(e)) ||
                  (t.nodeType === l.NodeType.TEXT && !v.exec(e)) ||
                  !(!g.exec(e) || t.nodeType === l.NodeType.ELEMENT) ||
                  !(!w.exec(e) || t.nodeType === l.NodeType.ATTRIBUTE)
                );
              })(t.xpath, n)) ||
            void 0 ===
              (function (e, t, n, o, r) {
                let a = e.get(t.xpath);
                a || ((a = new Map()), e.set(t.xpath, a));
                let s = n;
                const c = _(o);
                for (; s; ) {
                  let e = a.get(s);
                  if (
                    (void 0 === e &&
                      ((e = t.compiled
                        ? (0, i.executeJavaScriptCompiledXPath)(t.compiled, s)
                        : (0, i.evaluateXPathToNodes)(t.xpath, s, void 0, c, {
                            namespaceResolver: r,
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
              })(e, t, n, o, r)
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
          let o = (function* (e, t, n, o) {
              const r = (0, d.findMatchingRules)(t, e).map((e) => n[e]);
              for (let e of (0, p.sortSortable)(r))
                ("#all" === e.modes[0] || e.modes.includes(o)) && (yield e);
            })(e.contextItem, e.ruleTree, e.templates, e.mode),
            r = (function* (e, t, n, o, r, a, s) {
              for (let [i, c] of n) {
                const n = o[c];
                i &&
                  ("#all" === n.modes[0] || n.modes.includes(a)) &&
                  y(e, i, t, r, (0, p.mkResolver)(s)) &&
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
            a = b(T(o, r));
          const s = a.next();
          s.done ||
            $(
              s.value,
              Object.assign(Object.assign({}, e), { nextMatches: a }),
              t,
            );
        }
        function E(e, t, n, o) {
          const r = "descending" === G(e, n.order, o);
          return "number" === n.dataType
            ? (function (e, t, n, o, r) {
                const a = R(t, e, (e) => {
                  let t;
                  const r = Y(e, n.sortKey, o);
                  return (
                    (t = Number(r)),
                    isNaN(t) && (t = Number.MIN_SAFE_INTEGER),
                    t
                  );
                });
                return (0, p.zip)(a, t)
                  .sort(r ? (e, t) => t[0] - e[0] : (e, t) => e[0] - t[0])
                  .map((e) => e[1]);
              })(e, t, n, o, r)
            : (function (e, t, n, o, r) {
                const a = R(t, e, (e) => Y(e, n.sortKey, o)),
                  s = n.lang && G(e, n.lang, o);
                let i = new Intl.Collator(s).compare;
                return (0, p.zip)(a, t)
                  .sort(r ? (e, t) => i(t[0], e[0]) : (e, t) => i(e[0], t[0]))
                  .map((e) => e[1]);
              })(e, t, n, o, r);
        }
        function R(e, t, n) {
          if (e.length > 0)
            return (0, l.isNodeGroupArray)(e) ? j(e, t, n) : I(e, t, n);
        }
        function I(e, t, n) {
          let o = 0;
          return e.map(
            (r) => (
              o++,
              n(
                Object.assign(Object.assign({}, t), {
                  contextItem: r,
                  contextList: e,
                  position: o,
                }),
              )
            ),
          );
        }
        function j(e, t, n) {
          let o = 0;
          return e.map((e) => {
            o++;
            const r = Object.assign(Object.assign({}, t), {
              contextItem: e.nodes[0],
              contextList: e.nodes,
              currentGroup: e,
              position: o,
              variableScopes: C(t.variableScopes),
            });
            return n(r);
          });
        }
        function O(e, t, n, o) {
          if (n) for (let r of [...n].reverse()) t = E(e, t, r, o);
          return t;
        }
        function P(e, t) {
          for (let n of t) if (n.name === e) return n;
        }
        function $(e, t, n) {
          let o = C(t.variableScopes);
          for (let r of e.allowedParams) {
            let e = P(r.name, n);
            void 0 !== e ? M(o, e.name, J(t, e)) : M(o, r.name, J(t, r));
          }
          return e.apply(
            Object.assign(Object.assign({}, t), { variableScopes: o }),
          );
        }
        function C(e) {
          return e.concat([new Map()]);
        }
        new RegExp(/(^\/$|document-node\(|node\()/);
        let X = new Map();
        function D(e) {
          return (
            X.has(e) || X.set(e, (0, i.createTypedValueFactory)(e)),
            X.get(e)
          );
        }
        function L(e, t) {
          if (Array.isArray(e) && 0 === e.length) return D("item()*")([], null);
          if (t)
            try {
              return D(t)(e, null);
            } catch (e) {}
          const n = Array.isArray(e),
            o = n ? e[0] : e;
          let r = "item()";
          const a = n ? "*" : "";
          return (
            "string" == typeof o
              ? (r = "xs:string")
              : "number" == typeof o &&
                (r = Number.isInteger(o) ? "xs:integer" : "xs:numeric"),
            D(`${r}${a}`)(e, null)
          );
        }
        function M(e, t, n) {
          e[e.length - 1].set(t, n);
        }
        function _(e) {
          let t = {};
          for (let n of e) for (let [e, o] of n) t[e] = o;
          return t;
        }
        function F(e, t) {
          let n;
          return (
            (n =
              void 0 !== t.namespace && null !== t.namespace
                ? e.outputDocument.createElementNS(t.namespace, t.name)
                : e.outputDocument.createElement(t.name)),
            n
          );
        }
        function U(e, t) {
          let n;
          return (
            (n = t.namespace
              ? e.outputDocument.createAttributeNS(t.namespace, t.name)
              : e.outputDocument.createAttribute(t.name)),
            (n.value = t.value),
            n
          );
        }
        function A(e, t, n) {
          t.length > 0 &&
            (null === n && (n = `group-${e.length + 1}`),
            e.push({ key: n, nodes: t }));
        }
        function k(e) {
          const t = e.ownerDocument || e;
          return function n(o) {
            if (o.length && o.values) {
              let e = !0;
              const t = o.length > 0 && !o[0].nodeType;
              for (let r of o) (e ? (e = !1) : t && n(" "), n(r));
            } else if ("string" == typeof o) {
              if (e.nodeType !== l.NodeType.DOCUMENT)
                if (e.lastChild && e.lastChild.nodeType === l.NodeType.TEXT)
                  e.lastChild.appendData(o);
                else if ("" !== o) {
                  const n = t.createTextNode(o);
                  n && e.append(n);
                }
            } else if (o.nodeType === l.NodeType.ATTRIBUTE) {
              let n = t.importNode(o, !0);
              e.setAttributeNode(n);
            } else {
              if (o.nodeType === l.NodeType.DOCUMENT) {
                const e = o;
                return (o = o.documentElement) ? (n(o), k(o)) : k(e);
              }
              if (o.nodeType === l.NodeType.DOCUMENT_FRAGMENT) n(o.childNodes);
              else if (o.nodeType === l.NodeType.TEXT) n(o.data);
              else {
                if (o.nodeType) {
                  let n = t.importNode(o, !0);
                  return (e.append(n), k(n));
                }
                n(`${o}`);
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
          const o = _(e.variableScopes);
          return t
            .map((t) =>
              "string" == typeof t
                ? t
                : (0, i.evaluateXPathToString)(
                    t.xpath,
                    e.contextItem,
                    void 0,
                    o,
                    {
                      currentContext: e,
                      namespaceResolver: n,
                      functionNameResolver: u.functionNameResolver,
                    },
                  ),
            )
            .join("");
        }
        function Y(e, t, n, o) {
          o || (o = "string" == typeof t ? [" "] : []);
          const r = G(e, o, n);
          if ("string" == typeof t) {
            const o = _(e.variableScopes);
            return (0, i.evaluateXPath)(
              t,
              e.contextItem,
              void 0,
              o,
              i.evaluateXPath.STRINGS_TYPE,
              {
                currentContext: e,
                namespaceResolver: n,
                functionNameResolver: u.functionNameResolver,
              },
            ).join(r);
          }
          return (function (e) {
            let t = [];
            return (
              h(e, (e) => {
                e.nodeType === l.NodeType.TEXT &&
                  "" !== e.data &&
                  (t = t.concat(e.data));
              }),
              t
            );
          })(B(e, t)).join(r);
        }
        function J(e, t) {
          if ("string" == typeof t.content) {
            const n = t.as && t.as.match(/[\+\*]$/);
            let o = (0, i.evaluateXPath)(
              t.content,
              e.contextItem,
              void 0,
              _(e.variableScopes),
              i.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: e,
                namespaceResolver: (0, p.mkResolver)(t.namespaces),
                functionNameResolver: u.functionNameResolver,
              },
            );
            return (1 !== o.length || n || (o = o[0]), L(o, t.as));
          }
          return null == t.content
            ? ""
            : t.as
              ? L(
                  (function (e, t) {
                    let n = [];
                    return (
                      t(
                        Object.assign(Object.assign({}, e), {
                          append: z(n),
                          mode: "#default",
                          variableScopes: C(e.variableScopes),
                        }),
                      ),
                      1 === n.length ? n[0] : n
                    );
                  })(e, t.content),
                  t.as,
                )
              : B(e, t.content);
        }
        function B(e, t) {
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
                variableScopes: C(e.variableScopes),
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
    n = (function n(o) {
      var r = t[o];
      if (void 0 !== r) return r.exports;
      var a = (t[o] = { exports: {} });
      return (e[o].call(a.exports, a, a.exports, n), a.exports);
    })(100);
  module.exports = n.transform;
})();
