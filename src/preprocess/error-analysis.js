(() => {
  var t = {
      925(t, e, n) {
        (n(898), n(594));
        let o = n(821);
        function a(t, e) {
          e = o.setParamDefaults(t, e);
          let n = new Map();
          n.set("#default", { document: e.outputDocument });
          let a = new Map(),
            r = new Map(),
            s = {
              outputDocument: e.outputDocument,
              append: o.mkNodeAppender(e.outputNode),
              resultDocuments: n,
              contextItem: t,
              mode: e.initialMode,
              templates: [
                {
                  match: "xsl:template/xsl:param",
                  matchFunction: o.compileMatchFunction(
                    '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-template");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "template" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tfor (let contextItem2 = domFacade.getFirstChild(contextItem1, "name-param");\n\t\t\t\t\t\t\tcontextItem2;\n\t\t\t\t\t\t\tcontextItem2 = domFacade.getNextSibling(contextItem2, "name-param")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem2.nodeType\n\t\t\t\t\t\t&& contextItem2.nodeType === /*ELEMENT_NODE*/ 1 && contextItem2.localName === "param" && (contextItem2.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem2;\n\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                  ),
                  name: void 0,
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (t) => {
                    (o.ifX(
                      t,
                      {
                        test: "preceding-sibling::*[not(self::xsl:param)]",
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                      },
                      (t) => {
                        o.message(
                          t,
                          {
                            select: void 0,
                            terminate: "yes",
                            namespaces: {
                              xsl: "http://www.w3.org/1999/XSL/Transform",
                            },
                          },
                          (t) => {
                            o.literalText(
                              t,
                              "XTSE0010: xsl:params must not be preceded by other elements",
                            );
                          },
                        );
                      },
                    ),
                      o.nextMatch(t, {
                        params: [],
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                      }));
                  },
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  priority: void 0,
                  importPrecedence: 1,
                },
                {
                  match: "xsl:template/xsl:template",
                  matchFunction: o.compileMatchFunction(
                    '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-template");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "template" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tfor (let contextItem2 = domFacade.getFirstChild(contextItem1, "name-template");\n\t\t\t\t\t\t\tcontextItem2;\n\t\t\t\t\t\t\tcontextItem2 = domFacade.getNextSibling(contextItem2, "name-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem2.nodeType\n\t\t\t\t\t\t&& contextItem2.nodeType === /*ELEMENT_NODE*/ 1 && contextItem2.localName === "template" && (contextItem2.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem2;\n\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                  ),
                  name: void 0,
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (t) => {
                    o.message(
                      t,
                      {
                        select: void 0,
                        terminate: "yes",
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                      },
                      (t) => {
                        o.literalText(
                          t,
                          "XTSE0010: xsl:template only allowed at the top level.",
                        );
                      },
                    );
                  },
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  priority: void 0,
                  importPrecedence: 1,
                },
                {
                  match: "xsl:template",
                  matchFunction: o.compileMatchFunction(
                    '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-template");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "template" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                  ),
                  name: void 0,
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (t) => {
                    (o.ifX(
                      t,
                      {
                        test: "not(@match) and (@mode or @priority)",
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                      },
                      (t) => {
                        o.message(
                          t,
                          {
                            select: void 0,
                            terminate: "yes",
                            namespaces: {
                              xsl: "http://www.w3.org/1999/XSL/Transform",
                            },
                          },
                          (t) => {
                            o.literalText(
                              t,
                              "XTSE0500: An xsl:template element that has no match attribute must have no mode attribute and no priority attribute.",
                            );
                          },
                        );
                      },
                    ),
                      o.ifX(
                        t,
                        {
                          test: "not(@match) and not(@name)",
                          namespaces: {
                            xsl: "http://www.w3.org/1999/XSL/Transform",
                          },
                        },
                        (t) => {
                          o.message(
                            t,
                            {
                              select: void 0,
                              terminate: "yes",
                              namespaces: {
                                xsl: "http://www.w3.org/1999/XSL/Transform",
                              },
                            },
                            (t) => {
                              o.literalText(
                                t,
                                "XTSE0500: An xsl:template element must have either a match attribute or a name attribute, or both.",
                              );
                            },
                          );
                        },
                      ),
                      o.nextMatch(t, {
                        params: [],
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                      }));
                  },
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  priority: void 0,
                  importPrecedence: 1,
                },
                {
                  match: "xsl:variable | xsl:with-param",
                  matchFunction: void 0,
                  name: void 0,
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (t) => {
                    (o.ifX(
                      t,
                      {
                        test: "@select and (node() or text()) ",
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                      },
                      (t) => {
                        o.message(
                          t,
                          {
                            select: void 0,
                            terminate: "yes",
                            namespaces: {
                              xsl: "http://www.w3.org/1999/XSL/Transform",
                            },
                          },
                          (t) => {
                            (o.literalText(
                              t,
                              "XTSE0620: Variable or parameter ",
                            ),
                              o.valueOf(
                                t,
                                {
                                  select: "@name",
                                  separator: void 0,
                                  namespaces: {
                                    xsl: "http://www.w3.org/1999/XSL/Transform",
                                  },
                                },
                                (t) => {},
                              ),
                              o.literalText(
                                t,
                                " has both @select and children.",
                              ));
                          },
                        );
                      },
                    ),
                      o.nextMatch(t, {
                        params: [],
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                      }));
                  },
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  priority: void 0,
                  importPrecedence: 1,
                },
                {
                  match: "/ | @* | node()",
                  matchFunction: void 0,
                  name: void 0,
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (t) => {
                    o.copy(
                      t,
                      {
                        namespaces: {
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
                            xsl: "http://www.w3.org/1999/XSL/Transform",
                          },
                        });
                      },
                    );
                  },
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  priority: void 0,
                  importPrecedence: 1,
                },
              ],
              variableScopes: [new Map()],
              inputURL: e.inputURL,
              keys: a,
              outputDefinitions: r,
              patternMatchCache: new Map(),
              stylesheetParams: e.stylesheetParams,
            };
          return (
            o.stripSpace(t, []),
            o.processNode(s, [], {
              xsl: "http://www.w3.org/1999/XSL/Transform",
            }),
            n
          );
        }
        ((t.exports.transform = a), (global.transform = a));
      },
      712(t, e) {
        "use strict";
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NodeType =
            e.DEFAULT_PRIORITIES =
            e.XPATH_NSURI =
            e.XMLNS_NSURI =
            e.XSLT1_NSURI =
              void 0));
        const n = String.raw`[^,:\(\)\*\[\]/]`,
          o = String.raw`(child::|attribute::|@)?`,
          a = String.raw`(document-node\()?`;
        var r;
        ((e.XSLT1_NSURI = "http://www.w3.org/1999/XSL/Transform"),
          (e.XMLNS_NSURI = "http://www.w3.org/2000/xmlns/"),
          (e.XPATH_NSURI = "http://www.w3.org/2005/xpath-functions"),
          (e.DEFAULT_PRIORITIES = new Map([
            [new RegExp(String.raw`^\s*/\s*$`), -0.5],
            [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${a}${o}processing-instruction`), 0],
            [new RegExp(String.raw`^\s*${a}${o}element\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${a}${o}attribute\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${a}${o}element\(${n}+\)\)?\s*$`), 0],
            [
              new RegExp(String.raw`^\s*${a}${o}element\(\*,\s*${n}+\)\)?\s*$`),
              0,
            ],
            [new RegExp(String.raw`^\s*${a}${o}attribute\(${n}+\)\)?\s*$`), 0],
            [
              new RegExp(
                String.raw`^\s*${a}${o}attribute\(\*,\s*${n}+\)\)?\s*$`,
              ),
              0,
            ],
            [
              new RegExp(
                String.raw`^\s*${a}${o}element\(${n}+,\s*${n}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${a}${o}attribute\(${n}+,\s*${n}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${a}${o}schema-element\(${n}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${a}${o}schema-attribute\(${n}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [new RegExp(String.raw`^\s*document-node\(\)\s*$`), -0.5],
            [
              new RegExp(
                String.raw`^\s*${o}(node\(\)|text\(\)|comment\(\))\s*$`,
              ),
              -0.5,
            ],
            [new RegExp(String.raw`^\s*${o}(${n}:)?\*\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${o}\*:${n}+\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${o}${n}+\s*$`), 0],
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
          })(r || (e.NodeType = r = {})));
      },
      379(t, e, n) {
        "use strict";
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.registerFunctions = function () {
            ((0, o.registerCustomXPathFunction)(
              { namespaceURI: a.XPATH_NSURI, localName: "current" },
              [],
              "item()",
              s,
            ),
              (0, o.registerCustomXPathFunction)(
                {
                  namespaceURI: a.XPATH_NSURI,
                  localName: "current-output-uri",
                },
                [],
                "xs:string",
                l,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XPATH_NSURI, localName: "doc" },
                ["xs:string"],
                "document-node()",
                c,
              ),
              (0, o.registerCustomXPathFunction)(
                {
                  namespaceURI: a.XPATH_NSURI,
                  localName: "current-grouping-key",
                },
                [],
                "xs:string?",
                i,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XPATH_NSURI, localName: "current-group" },
                [],
                "item()*",
                m,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XPATH_NSURI, localName: "key" },
                ["xs:string", "item()*"],
                "node()*",
                p,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XPATH_NSURI, localName: "system-property" },
                ["xs:string"],
                "xs:string",
                u,
              ));
          }));
        const o = n(594),
          a = n(712),
          r = n(472);
        function s({ currentContext: t }) {
          return t.contextItem;
        }
        function c({ currentContext: t }, e) {
          return (0, r.urlToDom)(t, e);
        }
        function i({ currentContext: t }) {
          return t.currentGroupingKey;
        }
        function m({ currentContext: t }) {
          return t.currentGroup;
        }
        function l({ currentContext: t }) {
          for (const [e, n] of t.resultDocuments)
            if (n === t.outputDocument) return e;
          return "#default";
        }
        function p({ currentContext: t }, e, n) {
          const {
            keys: o,
            contextItem: a,
            variableScopes: r,
            patternMatchCache: s,
          } = t;
          if (!o.has(e)) throw new Error("XTDE1260");
          return o.get(e).lookup(s, a.ownerDocument, r, n) || [];
        }
        function u(t, e) {
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
          (e.mkOutputDefinition = function (t) {
            return {
              omitXmlDeclaration: n(t.omitXmlDeclaration),
              standalone: o(t.standalone),
              doctypeSystem: t.doctypeSystem,
              doctypePublic: t.doctypePublic,
            };
          }),
          (e.mkResolver = function (t) {
            return (e) => t[e];
          }),
          (e.determineNamespace = function (t, e, n) {
            let o = n;
            if (void 0 !== o) return [o, t];
            let a = "";
            return (
              t.includes(":") && ([a, t] = t.split(":")),
              (o = e(a)),
              [o, t]
            );
          }),
          (e.computeDefaultPriority = i),
          (e.sortSortable = function (t) {
            return (
              t.reverse(),
              t.sort(
                (t, e) =>
                  (e.priority || i(e.match)) - (t.priority || i(t.match)),
              ),
              t.sort((t, e) => t.importPrecedence - e.importPrecedence),
              t
            );
          }));
        const a = String.raw`[^,:\(\)\*\[\]/]`,
          r = String.raw`(child::|attribute::|@)?`,
          s = String.raw`(document-node\()?`,
          c = new Map([
            [new RegExp(String.raw`^\s*/\s*$`), -0.5],
            [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${s}${r}processing-instruction`), 0],
            [new RegExp(String.raw`^\s*${s}${r}element\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${s}${r}attribute\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${s}${r}element\(${a}+\)\)?\s*$`), 0],
            [
              new RegExp(String.raw`^\s*${s}${r}element\(\*,\s*${a}+\)\)?\s*$`),
              0,
            ],
            [new RegExp(String.raw`^\s*${s}${r}attribute\(${a}+\)\)?\s*$`), 0],
            [
              new RegExp(
                String.raw`^\s*${s}${r}attribute\(\*,\s*${a}+\)\)?\s*$`,
              ),
              0,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${r}element\(${a}+,\s*${a}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${r}attribute\(${a}+,\s*${a}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${r}schema-element\(${a}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${s}${r}schema-attribute\(${a}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [new RegExp(String.raw`^\s*document-node\(\)\s*$`), -0.5],
            [
              new RegExp(
                String.raw`^\s*${r}(node\(\)|text\(\)|comment\(\))\s*$`,
              ),
              -0.5,
            ],
            [new RegExp(String.raw`^\s*${r}(${a}:)?\*\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${r}\*:${a}+\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${r}${a}+\s*$`), 0],
          ]);
        function i(t) {
          if (t && t.includes("|"))
            return Math.max(
              ...t
                .split("|")
                .filter((t) => "" !== t)
                .map((t) => i(t)),
            );
          for (let [e, n] of c) if (e.test(t)) return n;
          return 0.5;
        }
      },
      472(t, e, n) {
        "use strict";
        var o,
          a =
            (this && this.__createBinding) ||
            (Object.create
              ? function (t, e, n, o) {
                  void 0 === o && (o = n);
                  var a = Object.getOwnPropertyDescriptor(e, n);
                  ((a &&
                    !("get" in a
                      ? !e.__esModule
                      : a.writable || a.configurable)) ||
                    (a = {
                      enumerable: !0,
                      get: function () {
                        return e[n];
                      },
                    }),
                    Object.defineProperty(t, o, a));
                }
              : function (t, e, n, o) {
                  (void 0 === o && (o = n), (t[o] = e[n]));
                }),
          r =
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
                  "default" !== n[s] && a(e, t, n[s]);
              return (r(e, t), e);
            });
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.urlToDom = function (t, e) {
            const n = t.inputURL ? (0, c.resolve)(t.inputURL.toString(), e) : e;
            return n.startsWith("file:")
              ? m.parseXmlDocument(
                  (0, i.readFileSync)(
                    (0, c.fileURLToPath)(new URL(n)),
                  ).toString(),
                )
              : void 0;
          }));
        const c = n(16),
          i = n(896),
          m = s(n(898));
      },
      821(t, e, n) {
        "use strict";
        var o,
          a =
            (this && this.__createBinding) ||
            (Object.create
              ? function (t, e, n, o) {
                  void 0 === o && (o = n);
                  var a = Object.getOwnPropertyDescriptor(e, n);
                  ((a &&
                    !("get" in a
                      ? !e.__esModule
                      : a.writable || a.configurable)) ||
                    (a = {
                      enumerable: !0,
                      get: function () {
                        return e[n];
                      },
                    }),
                    Object.defineProperty(t, o, a));
                }
              : function (t, e, n, o) {
                  (void 0 === o && (o = n), (t[o] = e[n]));
                }),
          r =
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
                  "default" !== n[s] && a(e, t, n[s]);
              return (r(e, t), e);
            });
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.KeyImpl = void 0),
          (e.visitNodes = u),
          (e.processNode = y),
          (e.nextMatch = function (t, e) {
            const n = t.nextMatches;
            if (n) {
              const o = n.next();
              o.done ||
                E(
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
                E(
                  o.value,
                  Object.assign(Object.assign({}, t), { nextMatches: n }),
                  e.params,
                );
            }
          }),
          (e.sortNodes = S),
          (e.applyTemplates = N),
          (e.callTemplate = function (t, e) {
            for (let n of t.templates)
              if (void 0 !== n.name && e.name === n.name)
                return E(n, t, e.params);
            throw new Error(`Cannot find a template named ${e.name}`);
          }),
          (e.functionX = function (t, e) {
            const n = t.params.map((t) => "item()"),
              o = t.params.map((t) => t.name);
            (0, c.registerCustomXPathFunction)(
              { namespaceURI: t.namespace, localName: t.name },
              n,
              t.as || "item()",
              ({ currentContext: t }, ...n) => {
                let a = new Map();
                return (
                  o.forEach((t, e) => a.set(t, n[e])),
                  F(
                    Object.assign(Object.assign({}, t), {
                      variableScopes: [a].concat(t.variableScopes),
                    }),
                    e,
                  )
                );
              },
            );
          }),
          (e.copy = function (t, e, n) {
            const o = t.contextItem;
            let a, r;
            if (o.nodeType === l.NodeType.ELEMENT) {
              a = t.outputDocument.createElementNS(
                o.namespaceURI,
                o.prefix ? `${o.prefix}:${o.localName}` : o.localName,
              );
              for (let e of o.attributes)
                if (e.namespaceURI === l.XMLNS_NSURI) {
                  const n = e.localName;
                  a.setAttributeNode(
                    t.outputDocument.importNode(
                      o.getAttributeNodeNS(l.XMLNS_NSURI, n),
                    ),
                  );
                }
            } else
              a =
                o.nodeType === l.NodeType.DOCUMENT
                  ? void 0
                  : t.outputDocument.importNode(o);
            (a && (r = t.append(a)),
              n &&
                n(
                  Object.assign(Object.assign({}, t), {
                    append: r || t.append,
                  }),
                ));
          }),
          (e.copyOf = function (t, e, n) {
            let o = (0, c.evaluateXPath)(
              e.select,
              t.contextItem,
              void 0,
              D(t.variableScopes),
              c.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
              },
            );
            for (let e of o) t.append(e);
          }),
          (e.valueOf = I),
          (e.message = function (t, e, n) {
            const o = j(t, e.select || n, (0, p.mkResolver)(e.namespaces));
            if ("yes" === e.terminate) throw new Error(o);
            console.log(o);
          }),
          (e.text = function (t, e, n) {
            t.append(j(t, n, (0, p.mkResolver)(e.namespaces), [""]));
          }),
          (e.variable = function (t, e) {
            P(t.variableScopes, e.name, A(t, e));
          }),
          (e.param = function (t, e) {
            P(t.variableScopes, e.name, t.stylesheetParams[e.name] || A(t, e));
          }),
          (e.extendScope = R),
          (e.setVariable = P),
          (e.mergeVariableScopes = D),
          (e.literalText = function (t, e) {
            t.append(e);
          }),
          (e.sequence = function (t, e) {
            const n = (0, c.evaluateXPath)(
              e.select,
              t.contextItem,
              void 0,
              D(t.variableScopes),
              c.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
              },
            );
            t.append(n);
          }),
          (e.buildNode = C),
          (e.buildAttributeNode = M),
          (e.literalElement = function (t, e, n) {
            let o = C(t, { name: e.name, namespace: e.namespace });
            const a = (0, p.mkResolver)(e.namespaces);
            for (let n of e.attributes) {
              const e = U(t, n.value, a),
                r = M(t, { name: n.name, namespace: n.namespace, value: e });
              o.setAttributeNode(r);
            }
            const r = t.append(o);
            n(
              Object.assign(Object.assign({}, t), {
                variableScopes: R(t.variableScopes),
                append: r || t.append,
              }),
            );
          }),
          (e.attribute = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              a = U(t, e.name, o),
              [r, s] = (0, p.determineNamespace)(a, o, U(t, e.namespace, o)),
              c = M(t, {
                name: a,
                namespace: r,
                value: j(t, e.select || n, o, e.separator),
              });
            t.append(c);
          }),
          (e.processingInstruction = function (t, e, n) {
            const o = U(t, e.name, (0, p.mkResolver)(e.namespaces)),
              a = j(t, e.select || n, (0, p.mkResolver)(e.namespaces), [
                "",
              ]).trimStart();
            t.append(t.outputDocument.createProcessingInstruction(o, a));
          }),
          (e.comment = function (t, e, n) {
            const o = j(t, e.select || n, (0, p.mkResolver)(e.namespaces), [
              "",
            ]);
            t.append(t.outputDocument.createComment(o));
          }),
          (e.namespace = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              a = U(t, e.name, o),
              r = j(t, e.select || n, o, [""]),
              s = M(t, {
                name: `xmlns:${a}`,
                namespace: l.XMLNS_NSURI,
                value: r,
              });
            t.append(s);
          }),
          (e.element = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces);
            let a = U(t, e.name, o),
              r = U(t, e.namespace, o),
              s = C(t, {
                name: a,
                namespace: (0, p.determineNamespace)(
                  a,
                  (0, p.mkResolver)(e.namespaces),
                  r,
                )[0],
              });
            const c = t.append(s);
            n(
              Object.assign(Object.assign({}, t), {
                variableScopes: R(t.variableScopes),
                append: c || t.append,
              }),
            );
          }),
          (e.ifX = function (t, e, n) {
            (0, c.evaluateXPathToBoolean)(
              e.test,
              t.contextItem,
              void 0,
              D(t.variableScopes),
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
              },
            ) && n(t);
          }),
          (e.choose = function (t, e) {
            for (let n of e) {
              if (!n.test) return n.apply(t);
              if (
                (0, c.evaluateXPathToBoolean)(
                  n.test,
                  t.contextItem,
                  void 0,
                  D(t.variableScopes),
                  { currentContext: t },
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
              a = t.append(o);
            n(
              Object.assign(Object.assign({}, t), {
                outputDocument: o,
                append: a,
                mode: "#default",
                variableScopes: R(t.variableScopes),
              }),
            );
          }),
          (e.forEach = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              a = (0, c.evaluateXPath)(
                e.select,
                t.contextItem,
                void 0,
                D(t.variableScopes),
                c.evaluateXPath.ALL_RESULTS_TYPE,
                { currentContext: t, namespaceResolver: o },
              );
            if (a && Symbol.iterator in Object(a))
              for (let r of S(t, a, e.sortKeyComponents, o))
                n(
                  Object.assign(Object.assign({}, t), {
                    contextItem: r,
                    variableScopes: R(t.variableScopes),
                  }),
                );
          }),
          (e.forEachGroup = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              a = D(t.variableScopes),
              r = (0, c.evaluateXPathToNodes)(
                e.select,
                t.contextItem,
                void 0,
                a,
                { currentContext: t, namespaceResolver: o },
              );
            if (r && Symbol.iterator in Object(r)) {
              let a = (function (t, e, n, o) {
                const a = D(t.variableScopes);
                let r = new Map();
                for (let s of e) {
                  const e = (0, c.evaluateXPathToString)(n, s, void 0, a, {
                    currentContext: t,
                    namespaceResolver: o,
                  });
                  (r.has(e) || r.set(e, []), r.set(e, r.get(e).concat(s)));
                }
                return r;
              })(t, r, e.groupBy, o);
              for (let [e, o] of a)
                n(
                  Object.assign(Object.assign({}, t), {
                    contextItem: o[0],
                    currentGroupingKey: e,
                    currentGroup: o,
                    variableScopes: R(t.variableScopes),
                  }),
                );
            }
          }),
          (e.mkNodeAppender = _),
          (e.mkArrayAppender = L),
          (e.resultDocument = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces);
            function a(e) {
              return U(t, e, o);
            }
            const r = a(e.format);
            let s = (0, p.mkOutputDefinition)({
              omitXmlDeclaration: a(e.omitXmlDeclaration),
              doctypePublic: a(e.doctypePublic),
              doctypeSystem: a(e.doctypeSystem),
              standalone: a(e.standalone),
            });
            Object.keys(s).forEach((t) => {
              s[t] || delete s[t];
            });
            const c = Object.assign(
                Object.assign({}, r ? t.outputDefinitions.get(r) : {}),
                s,
              ),
              i = a(e.href);
            let m = null;
            if (
              ((c.doctypePublic || c.doctypeSystem) &&
                (m = t.outputDocument.implementation.createDocumentType(
                  "out",
                  c.doctypePublic || "",
                  c.doctypeSystem || "",
                )),
              i)
            ) {
              const e = t.outputDocument.implementation.createDocument(
                null,
                null,
                m,
              );
              if (t.resultDocuments.has(i))
                throw new Error(`XTDE1490: ${i} is a duplicate`);
              (t.resultDocuments.set(
                i,
                Object.assign(Object.assign({}, c), { document: e }),
              ),
                n(
                  Object.assign(Object.assign({}, t), {
                    outputDocument: e,
                    append: _(e),
                  }),
                ));
            } else {
              if (t.outputDocument.documentElement) throw new Error("XTDE1490");
              let e = t.outputDocument;
              (m &&
                ((e = t.outputDocument.implementation.createDocument(
                  null,
                  null,
                  m,
                )),
                (t.outputDocument = e),
                (t.append = _(e))),
                t.resultDocuments.set(
                  "#default",
                  Object.assign(Object.assign({}, c), { document: e }),
                ),
                n(t));
            }
          }),
          (e.stripSpace = function (t, e) {
            const n = RegExp("^[ \n\r\t]+$");
            let o = [];
            !(function t(a) {
              if (a.nodeType === l.NodeType.TEXT)
                n.test(a.textContent) &&
                  (function (t, e) {
                    let n = new Map();
                    for (const o of e) {
                      const e = (0, p.mkResolver)(o.namespaces);
                      if (h(n, o.match, null, t, [], e)) return !o.preserve;
                    }
                    return !1;
                  })(a.parentNode, e) &&
                  o.push(a);
              else if (a.hasChildNodes && a.hasChildNodes())
                for (let e of a.childNodes) t(e);
            })(t);
            for (let t of o) t.remove();
            return t;
          }),
          (e.evaluateAttributeValueTemplate = U),
          (e.serialize = function (t) {
            const e = new i.XMLSerializer();
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
          }));
        const c = n(594),
          i = s(n(898)),
          m = n(379),
          l = n(712),
          p = n(777);
        function u(t, e) {
          if ((e(t), t.childNodes)) for (let n of t.childNodes) u(n, e);
        }
        function d(t) {
          return Array.isArray(t)
            ? t.map((t) => d(t)).join("")
            : t.nodeType
              ? t.textContent
              : t.toString();
        }
        function f(t, e, n, o) {
          t.has(e) || t.set(e, new Map());
          const a = t.get(e);
          return (a.has(n) || a.set(n, o()), a.get(n));
        }
        e.KeyImpl = class {
          constructor(t, e, n) {
            ((this.match = t),
              (this.use = e),
              (this.namespaces = n),
              (this.cache = new Map()));
          }
          buildDocumentCache(t, e, n) {
            let o = new Map();
            return (
              u(e, (e) => {
                if (
                  "string" == typeof this.use &&
                  h(
                    t,
                    this.match,
                    void 0,
                    e,
                    n,
                    (0, p.mkResolver)(this.namespaces),
                  )
                ) {
                  let t = (0, c.evaluateXPathToString)(this.use, e);
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
              this.cache.get(e).get(d(o))
            );
          }
        };
        const g = new RegExp(/^[a-z |-]+$/),
          w = new RegExp(/^@[a-z]+$/),
          x = new RegExp(/text\(\)|node\(\)/),
          T = new RegExp(/@|attribute|node/);
        function h(t, e, n, o, a, r) {
          let s = o;
          if (
            o &&
            !(function (t, e) {
              return (
                (e.nodeType === l.NodeType.ATTRIBUTE && !T.exec(t)) ||
                (e.nodeType === l.NodeType.TEXT && !x.exec(t)) ||
                !(!g.exec(t) || e.nodeType === l.NodeType.ELEMENT) ||
                !(!w.exec(t) || e.nodeType === l.NodeType.ATTRIBUTE)
              );
            })(e, o)
          ) {
            if (
              (function (t, e) {
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
              })(e, o)
            )
              return !0;
            for (; s; ) {
              if (
                f(t, e, s, () =>
                  n
                    ? new Set((0, c.executeJavaScriptCompiledXPath)(n, s))
                    : new Set(
                        (0, c.evaluateXPathToNodes)(e, s, void 0, D(a), {
                          namespaceResolver: r,
                        }),
                      ),
                ).has(o)
              )
                return !0;
              s =
                s.parentNode ||
                (s.nodeType === l.NodeType.ATTRIBUTE && s.ownerElement);
            }
          }
          return !1;
        }
        function y(t, e, n) {
          let o = (function* (t, e, n, o, a, r) {
            for (let s of n)
              s.match &&
                ("#all" === s.modes[0] || s.modes.includes(a)) &&
                h(t, s.match, s.matchFunction, e, o, (0, p.mkResolver)(r)) &&
                (yield s);
          })(
            t.patternMatchCache,
            t.contextItem,
            t.templates.concat(
              (function (t) {
                return [
                  {
                    match: "processing-instruction()|comment()",
                    apply: (t) => {},
                    allowedParams: [],
                    modes: ["#all"],
                    importPrecedence: Number.MAX_VALUE,
                  },
                  {
                    match: "text()|@*",
                    apply: (e) => {
                      I(e, { select: ".", namespaces: t }, () => {});
                    },
                    allowedParams: [],
                    modes: ["#all"],
                    importPrecedence: Number.MAX_VALUE,
                  },
                  {
                    match: "*|/",
                    apply: (e) => {
                      N(e, {
                        select: "child::node()",
                        params: [],
                        mode: "#current",
                        namespaces: t,
                        sortKeyComponents: [],
                      });
                    },
                    allowedParams: [],
                    modes: ["#all"],
                    importPrecedence: Number.MAX_VALUE,
                  },
                ];
              })(n),
            ),
            t.variableScopes,
            t.mode,
            n,
          );
          const a = o.next();
          a.done ||
            E(
              a.value,
              Object.assign(Object.assign({}, t), { nextMatches: o }),
              e,
            );
        }
        function v(t, e, n, o) {
          let a;
          return (
            (a =
              "number" === n.dataType && "string" == typeof n.sortKey
                ? (function (t, e, n, o) {
                    let a = [];
                    for (let r of e) {
                      let e = (0, c.evaluateXPathToNumber)(
                        `number(${n.sortKey})`,
                        r,
                        void 0,
                        D(t.variableScopes),
                        { currentContext: t, namespaceResolver: o },
                      );
                      (isNaN(e) && (e = Number.MIN_SAFE_INTEGER),
                        a.push({ key: e, item: r }));
                    }
                    return (
                      a.sort((t, e) => t.key - e.key),
                      a.sort((t, e) => t.key - e.key).map((t) => t.item)
                    );
                  })(t, e, n, o)
                : (function (t, e, n, o) {
                    let a = [];
                    for (let r of e) {
                      const e = Object.assign(Object.assign({}, t), {
                        contextItem: r,
                      });
                      a.push({ key: j(e, n.sortKey, o), item: r });
                    }
                    const r = n.lang && U(t, n.lang, o);
                    let s = new Intl.Collator(r).compare;
                    return a.sort((t, e) => s(t.key, e.key)).map((t) => t.item);
                  })(t, e, n, o)),
            "descending" === U(t, n.order, o) && a.reverse(),
            a
          );
        }
        function S(t, e, n, o) {
          if (n) for (let a of [...n].reverse()) e = v(t, e, a, o);
          return e;
        }
        function b(t, e) {
          for (let n of e) if (n.name === t) return n;
        }
        function E(t, e, n) {
          let o = R(e.variableScopes);
          for (let a of t.allowedParams) {
            let t = b(a.name, n);
            void 0 !== t ? P(o, t.name, A(e, t)) : P(o, a.name, A(e, a));
          }
          return t.apply(
            Object.assign(Object.assign({}, e), { variableScopes: o }),
          );
        }
        function N(t, e) {
          const n = (0, p.mkResolver)(e.namespaces),
            o = (0, c.evaluateXPathToNodes)(
              e.select,
              t.contextItem,
              void 0,
              D(t.variableScopes),
              { currentContext: t, namespaceResolver: n },
            );
          let a = e.mode || "#default";
          "#current" === a && (a = t.mode);
          for (let r of S(t, o, e.sortKeyComponents, n))
            y(
              Object.assign(Object.assign({}, t), {
                mode: a,
                contextItem: r,
                variableScopes: R(t.variableScopes),
              }),
              e.params,
              e.namespaces,
            );
        }
        function I(t, e, n) {
          t.append(
            j(t, e.select || n, (0, p.mkResolver)(e.namespaces), e.separator),
          );
        }
        function R(t) {
          return t.concat([new Map()]);
        }
        const $ = (0, c.createTypedValueFactory)("xs:numeric*"),
          X = (0, c.createTypedValueFactory)("xs:string*"),
          O = (0, c.createTypedValueFactory)("item()*");
        function P(t, e, n) {
          var o;
          t[t.length - 1].set(
            e,
            ((o = n),
            Array.isArray(o)
              ? "string" == typeof o[0]
                ? X(o, null)
                : "number" == typeof o[0]
                  ? $(o, null)
                  : O(o, null)
              : o),
          );
        }
        function D(t) {
          let e = {};
          for (let n of t) for (let [t, o] of n) e[t] = o;
          return e;
        }
        function C(t, e) {
          let n;
          return (
            (n =
              void 0 !== e.namespace && null !== e.namespace
                ? t.outputDocument.createElementNS(e.namespace, e.name)
                : t.outputDocument.createElement(e.name)),
            n
          );
        }
        function M(t, e) {
          let n;
          return (
            (n = e.namespace
              ? t.outputDocument.createAttributeNS(e.namespace, e.name)
              : t.outputDocument.createAttribute(e.name)),
            (n.value = e.value),
            n
          );
        }
        function _(t) {
          const e = t.ownerDocument || t;
          return function n(o) {
            if (o.length && o.values) {
              let t = !0;
              const e = o.length > 0 && !o[0].nodeType;
              for (let a of o) (t ? (t = !1) : e && n(" "), n(a));
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
                return (o = o.documentElement) ? (n(o), _(o)) : _(t);
              }
              if (o.nodeType === l.NodeType.DOCUMENT_FRAGMENT) n(o.childNodes);
              else if (o.nodeType === l.NodeType.TEXT) n(o.data);
              else {
                if (o.nodeType) {
                  let n = e.importNode(o, !0);
                  return (t.append(n), _(n));
                }
                n(`${o}`);
              }
            }
          };
        }
        function L(t) {
          return function (e) {
            if (
              (t.push(e),
              e.nodeType &&
                (e.nodeType === l.NodeType.DOCUMENT ||
                  e.nodeType === l.NodeType.ELEMENT))
            )
              return _(e);
          };
        }
        function U(t, e, n) {
          if (e)
            return e
              .map((e) =>
                "string" == typeof e
                  ? e
                  : (0, c.evaluateXPathToString)(
                      e.xpath,
                      t.contextItem,
                      void 0,
                      D(t.variableScopes),
                      { currentContext: t, namespaceResolver: n },
                    ),
              )
              .join("");
        }
        function j(t, e, n, o) {
          o || (o = "string" == typeof e ? [" "] : []);
          const a = U(t, o, n);
          return "string" == typeof e
            ? (0, c.evaluateXPath)(
                e,
                t.contextItem,
                void 0,
                D(t.variableScopes),
                c.evaluateXPath.STRINGS_TYPE,
                { currentContext: t, namespaceResolver: n },
              ).join(a)
            : (function (t) {
                let e = [];
                return (
                  u(t, (t) => {
                    t.nodeType === l.NodeType.TEXT &&
                      "" !== t.data &&
                      (e = e.concat(t.data));
                  }),
                  e
                );
              })(F(t, e)).join(a);
        }
        function A(t, e) {
          return "string" == typeof e.content
            ? (0, c.evaluateXPath)(
                e.content,
                t.contextItem,
                void 0,
                D(t.variableScopes),
                c.evaluateXPath.ANY_TYPE,
                {
                  currentContext: t,
                  namespaceResolver: (0, p.mkResolver)(e.namespaces),
                },
              )
            : null == e.content
              ? ""
              : e.as
                ? (function (t, e) {
                    let n = [];
                    return (
                      e(
                        Object.assign(Object.assign({}, t), {
                          append: L(n),
                          mode: "#default",
                          variableScopes: R(t.variableScopes),
                        }),
                      ),
                      1 === n.length ? n[0] : n
                    );
                  })(t, e.content)
                : F(t, e.content);
        }
        function F(t, e) {
          const n = t.outputDocument.createDocumentFragment();
          if (
            (e(
              Object.assign(Object.assign({}, t), {
                append: _(n),
                outputDocument: t.outputDocument,
                mode: "#default",
                variableScopes: R(t.variableScopes),
              }),
            ),
            1 === n.childNodes.length && 1 === n.childElementCount)
          ) {
            const e = t.outputDocument.implementation.createDocument(
              null,
              null,
              null,
            );
            return (e.appendChild(n.firstChild), e);
          }
          return n;
        }
        (0, m.registerFunctions)();
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
      var a = e[o];
      if (void 0 !== a) return a.exports;
      var r = (e[o] = { exports: {} });
      return (t[o].call(r.exports, r, r.exports, n), r.exports);
    })(925);
  module.exports = n.transform;
})();
