(() => {
  var t = {
      617(t, e, n) {
        (n(898), n(594));
        let o = n(821);
        function r(t, e) {
          e = o.setParamDefaults(t, e);
          let n = new Map();
          n.set("#default", { document: e.outputDocument });
          let r = new Map(),
            a = new Map(),
            s = {
              outputDocument: e.outputDocument,
              append: o.mkNodeAppender(e.outputNode),
              resultDocuments: n,
              contextItem: t,
              contextList: [t],
              mode: e.initialMode,
              templates: [
                {
                  match: {
                    xpath: "xsl:template/xsl:param",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-template");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "template" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tfor (let contextItem2 = domFacade.getFirstChild(contextItem1, "name-param");\n\t\t\t\t\t\t\tcontextItem2;\n\t\t\t\t\t\t\tcontextItem2 = domFacade.getNextSibling(contextItem2, "name-param")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem2.nodeType\n\t\t\t\t\t\t&& contextItem2.nodeType === /*ELEMENT_NODE*/ 1 && contextItem2.localName === "param" && (contextItem2.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem2;\n\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
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
                  match: {
                    xpath: "xsl:template/xsl:template",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-template");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "template" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tfor (let contextItem2 = domFacade.getFirstChild(contextItem1, "name-template");\n\t\t\t\t\t\t\tcontextItem2;\n\t\t\t\t\t\t\tcontextItem2 = domFacade.getNextSibling(contextItem2, "name-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem2.nodeType\n\t\t\t\t\t\t&& contextItem2.nodeType === /*ELEMENT_NODE*/ 1 && contextItem2.localName === "template" && (contextItem2.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem2;\n\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
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
                  match: {
                    xpath: "xsl:template",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-template");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "template" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
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
                  match: {
                    xpath: "xsl:variable | xsl:with-param",
                    compiled: void 0,
                  },
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
                  match: { xpath: "/ | @* | node()", compiled: void 0 },
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
              keys: r,
              outputDefinitions: a,
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
        ((t.exports.transform = r), (global.transform = r));
      },
      712(t, e) {
        "use strict";
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NodeType =
            e.DEFAULT_PRIORITIES =
            e.XJSLT_NSURI =
            e.XPATH_NSURI =
            e.XMLNS_NSURI =
            e.XSLT1_NSURI =
              void 0));
        const n = String.raw`[^,:\(\)\*\[\]/]`,
          o = String.raw`(child::|attribute::|@)?`,
          r = String.raw`(document-node\()?`;
        var a;
        ((e.XSLT1_NSURI = "http://www.w3.org/1999/XSL/Transform"),
          (e.XMLNS_NSURI = "http://www.w3.org/2000/xmlns/"),
          (e.XPATH_NSURI = "http://www.w3.org/2005/xpath-functions"),
          (e.XJSLT_NSURI = "https://www.e6h.org/xjslt"),
          (e.DEFAULT_PRIORITIES = new Map([
            [new RegExp(String.raw`^\s*/\s*$`), -0.5],
            [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${r}${o}processing-instruction`), 0],
            [new RegExp(String.raw`^\s*${r}${o}element\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${r}${o}attribute\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${r}${o}element\(${n}+\)\)?\s*$`), 0],
            [
              new RegExp(String.raw`^\s*${r}${o}element\(\*,\s*${n}+\)\)?\s*$`),
              0,
            ],
            [new RegExp(String.raw`^\s*${r}${o}attribute\(${n}+\)\)?\s*$`), 0],
            [
              new RegExp(
                String.raw`^\s*${r}${o}attribute\(\*,\s*${n}+\)\)?\s*$`,
              ),
              0,
            ],
            [
              new RegExp(
                String.raw`^\s*${r}${o}element\(${n}+,\s*${n}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${r}${o}attribute\(${n}+,\s*${n}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${r}${o}schema-element\(${n}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${r}${o}schema-attribute\(${n}+\)\)?\s*$`,
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
          })(a || (e.NodeType = a = {})));
      },
      379(t, e, n) {
        "use strict";
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.functionNameResolver = function ({ prefix: t, localName: e }, n) {
            return (t && "fn" !== t) || !x.includes(e)
              ? null
              : { namespaceURI: r.XJSLT_NSURI, localName: e };
          }),
          (e.registerFunctions = function () {
            ((0, o.registerCustomXPathFunction)(
              { namespaceURI: r.XJSLT_NSURI, localName: "current" },
              [],
              "item()",
              s,
            ),
              (0, o.registerCustomXPathFunction)(
                {
                  namespaceURI: r.XJSLT_NSURI,
                  localName: "current-output-uri",
                },
                [],
                "xs:string",
                m,
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
                i,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "current-group" },
                [],
                "item()*",
                u,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "positionx" },
                [],
                "xs:integer",
                l,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "lastx" },
                [],
                "xs:integer",
                p,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "key" },
                ["xs:string", "item()*"],
                "node()*",
                d,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "system-property" },
                ["xs:string"],
                "xs:string",
                f,
              ));
          }));
        const o = n(594),
          r = n(712),
          a = n(472);
        function s({ currentContext: t }) {
          return t.contextItem;
        }
        function c({ currentContext: t }, e) {
          return (0, a.urlToDom)(t, e);
        }
        function i({ currentContext: t }) {
          return t.currentGroupingKey;
        }
        function u({ currentContext: t }) {
          return t.currentGroup;
        }
        function l({ currentContext: t }) {
          return t.contextList.indexOf(t.contextItem) + 1;
        }
        function p({ currentContext: t }) {
          return t.contextList.length;
        }
        function m({ currentContext: t }) {
          for (const [e, n] of t.resultDocuments)
            if (n === t.outputDocument) return e;
          return "#default";
        }
        function d({ currentContext: t }, e, n) {
          const {
            keys: o,
            contextItem: r,
            variableScopes: a,
            patternMatchCache: s,
          } = t;
          if (!o.has(e)) throw new Error("XTDE1260");
          return o.get(e).lookup(s, r.ownerDocument, a, n) || [];
        }
        function f(t, e) {
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
        const x = [
          "current",
          "current-group",
          "current-grouping-key",
          "current-output-uri",
          "doc",
          "key",
          "lastx",
          "positionx",
          "system-property",
        ];
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
          (e.computeDefaultPriority = i),
          (e.sortSortable = function (t) {
            return (
              t.reverse(),
              t.sort((t, e) => {
                var n, o;
                return (
                  (e.priority ||
                    i(
                      null === (n = e.match) || void 0 === n ? void 0 : n.xpath,
                    )) -
                  (t.priority ||
                    i(
                      null === (o = t.match) || void 0 === o ? void 0 : o.xpath,
                    ))
                );
              }),
              t.sort((t, e) => t.importPrecedence - e.importPrecedence),
              t
            );
          }));
        const r = String.raw`[^,:\(\)\*\[\]/]`,
          a = String.raw`(child::|attribute::|@)?`,
          s = String.raw`(document-node\()?`,
          c = new Map([
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
            const n = t.inputURL ? (0, c.resolve)(t.inputURL.toString(), e) : e;
            return n.startsWith("file:")
              ? u.parseXmlDocument(
                  (0, i.readFileSync)(
                    (0, c.fileURLToPath)(new URL(n)),
                  ).toString(),
                )
              : void 0;
          }));
        const c = n(16),
          i = n(896),
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
          (e.toAlphabeticUpper =
            e.toAlphabetic =
            e.toNumeric =
            e.KeyImpl =
              void 0),
          (e.visitNodes = m),
          (e.hackXpath = f),
          (e.processNode = N),
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
          (e.sortNodes = b),
          (e.applyTemplates = I),
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
                let r = new Map();
                return (
                  o.forEach((t, e) => r.set(t, n[e])),
                  q(
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
              r = t.outputDocument.createElementNS(
                o.namespaceURI,
                o.prefix ? `${o.prefix}:${o.localName}` : o.localName,
              );
              for (let e of o.attributes)
                if (e.namespaceURI === l.XMLNS_NSURI) {
                  const n = e.localName;
                  r.setAttributeNode(
                    t.outputDocument.importNode(
                      o.getAttributeNodeNS(l.XMLNS_NSURI, n),
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
            let o = (0, c.evaluateXPath)(
              f(e.select),
              t.contextItem,
              void 0,
              D(t.variableScopes),
              c.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: u.functionNameResolver,
              },
            );
            for (let e of o) t.append(e);
          }),
          (e.valueOf = $),
          (e.message = function (t, e, n) {
            const o = W(t, e.select || n, (0, p.mkResolver)(e.namespaces));
            if ("yes" === e.terminate) throw new Error(o);
            console.log(o);
          }),
          (e.text = function (t, e, n) {
            t.append(W(t, n, (0, p.mkResolver)(e.namespaces), [""]));
          }),
          (e.variable = function (t, e) {
            L(t.variableScopes, e.name, z(t, e));
          }),
          (e.param = function (t, e) {
            L(t.variableScopes, e.name, t.stylesheetParams[e.name] || z(t, e));
          }),
          (e.extendScope = X),
          (e.setVariable = L),
          (e.mergeVariableScopes = D),
          (e.literalText = function (t, e) {
            t.append(e);
          }),
          (e.sequence = function (t, e) {
            const n = (0, c.evaluateXPath)(
              f(e.select),
              t.contextItem,
              void 0,
              D(t.variableScopes),
              c.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: u.functionNameResolver,
              },
            );
            t.append(n);
          }),
          (e.buildNode = M),
          (e.buildAttributeNode = U),
          (e.literalElement = function (t, e, n) {
            let o = M(t, { name: e.name, namespace: e.namespace });
            const r = (0, p.mkResolver)(e.namespaces);
            for (let n of e.attributes) {
              const e = V(t, n.value, r),
                a = U(t, { name: n.name, namespace: n.namespace, value: e });
              o.setAttributeNode(a);
            }
            const a = t.append(o);
            n(
              Object.assign(Object.assign({}, t), {
                variableScopes: X(t.variableScopes),
                append: a || t.append,
              }),
            );
          }),
          (e.attribute = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              r = V(t, e.name, o),
              [a, s] = (0, p.determineNamespace)(r, o, V(t, e.namespace, o)),
              c = U(t, {
                name: r,
                namespace: a,
                value: W(t, e.select || n, o, e.separator),
              });
            t.append(c);
          }),
          (e.processingInstruction = function (t, e, n) {
            const o = V(t, e.name, (0, p.mkResolver)(e.namespaces)),
              r = W(t, e.select || n, (0, p.mkResolver)(e.namespaces), [
                "",
              ]).trimStart();
            t.append(t.outputDocument.createProcessingInstruction(o, r));
          }),
          (e.comment = function (t, e, n) {
            const o = W(t, e.select || n, (0, p.mkResolver)(e.namespaces), [
              "",
            ]);
            t.append(t.outputDocument.createComment(o));
          }),
          (e.namespace = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              r = V(t, e.name, o),
              a = W(t, e.select || n, o, [""]),
              s = U(t, {
                name: `xmlns:${r}`,
                namespace: l.XMLNS_NSURI,
                value: a,
              });
            t.append(s);
          }),
          (e.element = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces);
            let r = V(t, e.name, o),
              a = V(t, e.namespace, o),
              s = M(t, {
                name: r,
                namespace: (0, p.determineNamespace)(
                  r,
                  (0, p.mkResolver)(e.namespaces),
                  a,
                )[0],
              });
            const c = t.append(s);
            n(
              Object.assign(Object.assign({}, t), {
                variableScopes: X(t.variableScopes),
                append: c || t.append,
              }),
            );
          }),
          (e.ifX = function (t, e, n) {
            (0, c.evaluateXPathToBoolean)(
              f(e.test),
              t.contextItem,
              void 0,
              D(t.variableScopes),
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
                (0, c.evaluateXPathToBoolean)(
                  f(n.test),
                  t.contextItem,
                  void 0,
                  D(t.variableScopes),
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
                variableScopes: X(t.variableScopes),
              }),
            );
          }),
          (e.performSort = function (t, e) {
            const n = (0, p.mkResolver)(e.namespaces),
              o = (0, c.evaluateXPath)(
                f(e.select),
                t.contextItem,
                void 0,
                D(t.variableScopes),
                c.evaluateXPath.ALL_RESULTS_TYPE,
                {
                  currentContext: t,
                  namespaceResolver: n,
                  functionNameResolver: u.functionNameResolver,
                },
              );
            if (o && Symbol.iterator in Object(o)) {
              const r = b(t, o, e.sortKeyComponents, n);
              for (let e of r) t.append(e);
            }
          }),
          (e.forEach = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              r = (0, c.evaluateXPath)(
                f(e.select),
                t.contextItem,
                void 0,
                D(t.variableScopes),
                c.evaluateXPath.ALL_RESULTS_TYPE,
                {
                  currentContext: t,
                  namespaceResolver: o,
                  functionNameResolver: u.functionNameResolver,
                },
              );
            r &&
              Symbol.iterator in Object(r) &&
              y(b(t, r, e.sortKeyComponents, o), t, (t) => {
                n(
                  Object.assign(Object.assign({}, t), {
                    variableScopes: X(t.variableScopes),
                  }),
                );
              });
          }),
          (e.forEachGroup = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              r = D(t.variableScopes),
              a = (0, c.evaluateXPathToNodes)(
                f(e.select),
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
              e.groupBy
                ? (r = (function (t, e, n, o) {
                    const r = D(t.variableScopes);
                    let a = [];
                    return (
                      y(e, t, (t) => {
                        const e = (0, c.evaluateXPathToString)(
                          f(n),
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
                      const r = D(t.variableScopes);
                      let a = [],
                        s = null,
                        i = [];
                      return (
                        y(e, t, (t) => {
                          const e = t.contextItem,
                            l = (0, c.evaluateXPathToString)(
                              f(n),
                              e,
                              void 0,
                              r,
                              {
                                currentContext: t,
                                namespaceResolver: o,
                                functionNameResolver: u.functionNameResolver,
                              },
                            );
                          l !== s
                            ? (_(a, i, s), (s = l), (i = [e]))
                            : i.push(e);
                        }),
                        _(a, i, s),
                        a
                      );
                    })(t, a, e.groupAdjacent, o))
                  : e.groupEndingWith
                    ? (r = (function (t, e, n, o) {
                        let r = [],
                          a = [];
                        return (
                          y(e, t, (t) => {
                            const e = t.contextItem;
                            (a.push(e),
                              v(
                                t.patternMatchCache,
                                n,
                                e,
                                t.variableScopes,
                                o,
                              ) && (_(r, a), (a = [])));
                          }),
                          _(r, a),
                          r
                        );
                      })(t, a, e.groupEndingWith, o))
                    : e.groupStartingWith &&
                      (r = (function (t, e, n, o) {
                        let r = [],
                          a = [];
                        return (
                          y(e, t, (t) => {
                            const e = t.contextItem;
                            (v(
                              t.patternMatchCache,
                              n,
                              e,
                              t.variableScopes,
                              o,
                            ) && (_(r, a), (a = [])),
                              a.push(e));
                          }),
                          _(r, a),
                          r
                        );
                      })(t, a, e.groupStartingWith, o));
              for (const { key: e, nodes: o } of r)
                n(
                  Object.assign(Object.assign({}, t), {
                    contextItem: o[0],
                    contextList: o,
                    currentGroupingKey: e,
                    currentGroup: o,
                    variableScopes: X(t.variableScopes),
                  }),
                );
            }
          }),
          (e.groupNumeric = A),
          (e.mkToNumeric = k),
          (e.mkToAlphabetic = F),
          (e.formatWithToken = Y),
          (e.formatNumber = B),
          (e.number = function (t, e) {
            const n = (0, p.mkResolver)(e.namespaces),
              o = D(t.variableScopes);
            let r;
            (e.value &&
              (r = (0, c.evaluateXPathToNumber)(
                f(e.value),
                t.contextItem,
                void 0,
                o,
                {
                  currentContext: t,
                  namespaceResolver: n,
                  functionNameResolver: u.functionNameResolver,
                },
              )),
              t.append(B([r], e.format, e.groupingSeparator, e.groupingSize)));
          }),
          (e.toRoman = G),
          (e.mkNodeAppender = J),
          (e.mkArrayAppender = K),
          (e.resultDocument = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces);
            function r(e) {
              return V(t, e, o);
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
            const c = Object.assign(
                Object.assign({}, a ? t.outputDefinitions.get(a) : {}),
                s,
              ),
              i = r(e.href);
            let u = null;
            if (
              ((c.doctypePublic || c.doctypeSystem) &&
                (u = t.outputDocument.implementation.createDocumentType(
                  "out",
                  c.doctypePublic || "",
                  c.doctypeSystem || "",
                )),
              i)
            ) {
              const e = t.outputDocument.implementation.createDocument(
                null,
                null,
                u,
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
                    append: J(e),
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
                (t.append = J(e))),
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
            !(function t(r) {
              if (r.nodeType === l.NodeType.TEXT)
                n.test(r.textContent) &&
                  (function (t, e) {
                    let n = new Map();
                    for (const o of e) {
                      const e = (0, p.mkResolver)(o.namespaces);
                      if (v(n, o.match, t, [], e)) return !o.preserve;
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
          (e.evaluateAttributeValueTemplate = V),
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
          u = n(379),
          l = n(712),
          p = n(777);
        function m(t, e) {
          if ((e(t), t.childNodes)) for (let n of t.childNodes) m(n, e);
        }
        function d(t) {
          return Array.isArray(t)
            ? t.map((t) => d(t)).join("")
            : t.nodeType
              ? t.textContent
              : t.toString();
        }
        function f(t) {
          let e = "",
            n = 0,
            o = 0;
          for (; o < t.length; ) {
            const r = t[o];
            if ("[" === r) (n++, (e += r), o++);
            else if ("]" === r) (n--, (e += r), o++);
            else if (0 === n) {
              const n = o > 0 && "/" === t[o - 1],
                a = o > 1 && "::" === t.substring(o - 2, o);
              n || a
                ? ((e += r), o++)
                : t.substring(o).startsWith("position()")
                  ? ((e += "positionx()"), (o += 10))
                  : t.substring(o).startsWith("last()")
                    ? ((e += "lastx()"), (o += 6))
                    : ((e += r), o++);
            } else ((e += r), o++);
          }
          return e;
        }
        function x(t, e, n, o) {
          t.has(e) || t.set(e, new Map());
          const r = t.get(e);
          return (r.has(n) || r.set(n, o()), r.get(n));
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
              m(e, (e) => {
                if (
                  "string" == typeof this.use &&
                  v(
                    t,
                    { xpath: this.match },
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
          h = new RegExp(/^@[a-z]+$/),
          w = new RegExp(/text\(\)|node\(\)/),
          T = new RegExp(/@|attribute|node/);
        function v(t, e, n, o, r) {
          return !(
            !n ||
            (function (t, e) {
              return (
                (e.nodeType === l.NodeType.ATTRIBUTE && !T.exec(t)) ||
                (e.nodeType === l.NodeType.TEXT && !w.exec(t)) ||
                !(!g.exec(t) || e.nodeType === l.NodeType.ELEMENT) ||
                !(!h.exec(t) || e.nodeType === l.NodeType.ATTRIBUTE)
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
                    const s = x(t, e.xpath, a, () =>
                      e.compiled
                        ? (0, c.executeJavaScriptCompiledXPath)(e.compiled, a)
                        : (0, c.evaluateXPathToNodes)(
                            e.xpath,
                            a,
                            void 0,
                            D(o),
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
        function N(t, e, n) {
          let o = (function* (t, e, n, o, r, a) {
            for (let s of n)
              s.match &&
                ("#all" === s.modes[0] || s.modes.includes(r)) &&
                v(t, s.match, e, o, (0, p.mkResolver)(a)) &&
                (yield s);
          })(
            t.patternMatchCache,
            t.contextItem,
            t.templates.concat(
              (function (t) {
                return [
                  {
                    match: { xpath: "processing-instruction()|comment()" },
                    apply: (t) => {},
                    allowedParams: [],
                    modes: ["#all"],
                    importPrecedence: Number.MAX_VALUE,
                  },
                  {
                    match: { xpath: "text()|@*" },
                    apply: (e) => {
                      $(e, { select: ".", namespaces: t }, () => {});
                    },
                    allowedParams: [],
                    modes: ["#all"],
                    importPrecedence: Number.MAX_VALUE,
                  },
                  {
                    match: { xpath: "*|/" },
                    apply: (e) => {
                      I(e, {
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
          const r = o.next();
          r.done ||
            E(
              r.value,
              Object.assign(Object.assign({}, t), { nextMatches: o }),
              e,
            );
        }
        function S(t, e, n, o) {
          let r;
          return (
            (r =
              "number" === n.dataType
                ? (function (t, e, n, o) {
                    let r = [];
                    return (
                      y(e, t, (t) => {
                        let e;
                        const a = W(t, n.sortKey, o);
                        ((e = Number(a)),
                          isNaN(e) && (e = Number.MIN_SAFE_INTEGER),
                          r.push({ key: e, item: t.contextItem }));
                      }),
                      r.sort((t, e) => t.key - e.key).map((t) => t.item)
                    );
                  })(t, e, n, o)
                : (function (t, e, n, o) {
                    let r = [];
                    y(e, t, (t) => {
                      r.push({ key: W(t, n.sortKey, o), item: t.contextItem });
                    });
                    const a = n.lang && V(t, n.lang, o);
                    let s = new Intl.Collator(a).compare;
                    return r.sort((t, e) => s(t.key, e.key)).map((t) => t.item);
                  })(t, e, n, o)),
            "descending" === V(t, n.order, o) && r.reverse(),
            r
          );
        }
        function y(t, e, n) {
          for (const o of t)
            n(
              Object.assign(Object.assign({}, e), {
                contextItem: o,
                contextList: t,
              }),
            );
        }
        function b(t, e, n, o) {
          if (n) for (let r of [...n].reverse()) e = S(t, e, r, o);
          return e;
        }
        function R(t, e) {
          for (let n of e) if (n.name === t) return n;
        }
        function E(t, e, n) {
          let o = X(e.variableScopes);
          for (let r of t.allowedParams) {
            let t = R(r.name, n);
            void 0 !== t ? L(o, t.name, z(e, t)) : L(o, r.name, z(e, r));
          }
          return t.apply(
            Object.assign(Object.assign({}, e), { variableScopes: o }),
          );
        }
        function I(t, e) {
          const n = (0, p.mkResolver)(e.namespaces),
            o = (0, c.evaluateXPathToNodes)(
              f(e.select),
              t.contextItem,
              void 0,
              D(t.variableScopes),
              {
                currentContext: t,
                namespaceResolver: n,
                functionNameResolver: u.functionNameResolver,
              },
            );
          let r = e.mode || "#default";
          ("#current" === r && (r = t.mode),
            y(b(t, o, e.sortKeyComponents, n), t, (t) => {
              N(
                Object.assign(Object.assign({}, t), {
                  mode: r,
                  variableScopes: X(t.variableScopes),
                }),
                e.params,
                e.namespaces,
              );
            }));
        }
        function $(t, e, n) {
          t.append(
            W(t, e.select || n, (0, p.mkResolver)(e.namespaces), e.separator),
          );
        }
        function X(t) {
          return t.concat([new Map()]);
        }
        const O = (0, c.createTypedValueFactory)("xs:numeric*"),
          P = (0, c.createTypedValueFactory)("xs:string*"),
          C = (0, c.createTypedValueFactory)("item()*");
        function L(t, e, n) {
          var o;
          t[t.length - 1].set(
            e,
            ((o = n),
            Array.isArray(o)
              ? "string" == typeof o[0]
                ? P(o, null)
                : "number" == typeof o[0]
                  ? O(o, null)
                  : C(o, null)
              : o),
          );
        }
        function D(t) {
          let e = {};
          for (let n of t) for (let [t, o] of n) e[t] = o;
          return e;
        }
        function M(t, e) {
          let n;
          return (
            (n =
              void 0 !== e.namespace && null !== e.namespace
                ? t.outputDocument.createElementNS(e.namespace, e.name)
                : t.outputDocument.createElement(e.name)),
            n
          );
        }
        function U(t, e) {
          let n;
          return (
            (n = e.namespace
              ? t.outputDocument.createAttributeNS(e.namespace, e.name)
              : t.outputDocument.createAttribute(e.name)),
            (n.value = e.value),
            n
          );
        }
        function _(t, e, n) {
          e.length > 0 &&
            (null === n && (n = `group-${t.length + 1}`),
            t.push({ key: n, nodes: e }));
        }
        const j = [
          49, 1633, 1777, 2407, 2535, 2663, 2791, 2919, 3047, 3175, 3303, 3431,
          3559, 3665, 3793, 3873, 4161, 4241, 6113, 6161, 6471, 6609, 6785,
          6801, 6993, 7089, 7233, 7249, 42529, 43217, 43265, 43473, 43505,
          43601, 44017, 65297, 66721, 68913, 69735, 69873, 69943, 70097, 70385,
          70737, 70865, 71249, 71361, 71473, 71905, 72785, 73041, 73121, 92769,
          93009, 120783, 120793, 120803, 120813, 120823, 125265,
        ];
        function A(t, e, n) {
          if (!e || !n || t.length <= n) return t;
          const o = [];
          let r = t;
          for (; r.length > n; ) (o.unshift(r.slice(-n)), (r = r.slice(0, -n)));
          return (r && o.unshift(r), o.join(e));
        }
        function k(t) {
          const e = t - 1,
            n = [...Array(10)].map((t, n) => String.fromCodePoint(e + n));
          return function (t, e = 0) {
            if (0 === t) return n[0].padStart(e, n[0]);
            let o = "",
              r = t;
            for (; r > 0; ) ((o = n[r % 10] + o), (r = Math.floor(r / 10)));
            return o.padStart(e, n[0]);
          };
        }
        function F(t, n) {
          const o = n - t + 1,
            r = [...Array(o)].map((e, n) => String.fromCodePoint(t + n));
          return function (t) {
            if (0 === t) return (0, e.toNumeric)(t);
            let n = "",
              a = t;
            for (; a > 0; ) (a--, (n = r[a % o] + n), (a = Math.floor(a / o)));
            return n;
          };
        }
        function Y(t, n, o, r) {
          if (isNaN(t) || !isFinite(t)) return "";
          if (/0*1/.test(n)) return A((0, e.toNumeric)(t, n.length), o, r);
          if ("A" === n) return (0, e.toAlphabeticUpper)(t) || "";
          if ("a" === n) return (0, e.toAlphabetic)(t) || "";
          if ("I" === n) return G(t).toUpperCase();
          if ("i" === n) return G(t);
          for (const e of j) {
            if (49 === e) continue;
            const a = e - 1;
            if (
              new RegExp(
                `${String.fromCharCode(a)}*${String.fromCharCode(e)}`,
              ).test(n)
            )
              return A(k(e)(t, n.length), o, r);
          }
          return A((0, e.toNumeric)(t, n.length), o, r);
        }
        function B(t, e, n, o) {
          const r = [];
          e.prefix && r.push(e.prefix);
          for (let a = 0; a < t.length; a++) {
            const s = Math.min(a, e.formats.length - 1),
              c = e.formats[s];
            if (!c) throw new Error("No number format found");
            (c.separator && 0 !== a && r.push(c.separator),
              r.push(Y(t[a], c.format, n, o)));
          }
          return (e.suffix && r.push(e.suffix), r.join(""));
        }
        function G(t) {
          const n = new Map([
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
          if (0 === t) return (0, e.toNumeric)(t);
          let o = "",
            r = t;
          for (const [t, e] of n) for (; r >= t; ) ((o += e), (r -= t));
          return o;
        }
        function J(t) {
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
                return (o = o.documentElement) ? (n(o), J(o)) : J(t);
              }
              if (o.nodeType === l.NodeType.DOCUMENT_FRAGMENT) n(o.childNodes);
              else if (o.nodeType === l.NodeType.TEXT) n(o.data);
              else {
                if (o.nodeType) {
                  let n = e.importNode(o, !0);
                  return (t.append(n), J(n));
                }
                n(`${o}`);
              }
            }
          };
        }
        function K(t) {
          return function (e) {
            if (
              (t.push(e),
              e.nodeType &&
                (e.nodeType === l.NodeType.DOCUMENT ||
                  e.nodeType === l.NodeType.ELEMENT))
            )
              return J(e);
          };
        }
        function V(t, e, n) {
          if (e)
            return e
              .map((e) =>
                "string" == typeof e
                  ? e
                  : (0, c.evaluateXPathToString)(
                      f(e.xpath),
                      t.contextItem,
                      void 0,
                      D(t.variableScopes),
                      { currentContext: t, namespaceResolver: n },
                    ),
              )
              .join("");
        }
        function W(t, e, n, o) {
          o || (o = "string" == typeof e ? [" "] : []);
          const r = V(t, o, n);
          return "string" == typeof e
            ? (0, c.evaluateXPath)(
                f(e),
                t.contextItem,
                void 0,
                D(t.variableScopes),
                c.evaluateXPath.STRINGS_TYPE,
                {
                  currentContext: t,
                  namespaceResolver: n,
                  functionNameResolver: u.functionNameResolver,
                },
              ).join(r)
            : (function (t) {
                let e = [];
                return (
                  m(t, (t) => {
                    t.nodeType === l.NodeType.TEXT &&
                      "" !== t.data &&
                      (e = e.concat(t.data));
                  }),
                  e
                );
              })(q(t, e)).join(r);
        }
        function z(t, e) {
          return "string" == typeof e.content
            ? (0, c.evaluateXPath)(
                f(e.content),
                t.contextItem,
                void 0,
                D(t.variableScopes),
                c.evaluateXPath.ANY_TYPE,
                {
                  currentContext: t,
                  namespaceResolver: (0, p.mkResolver)(e.namespaces),
                  functionNameResolver: u.functionNameResolver,
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
                          append: K(n),
                          mode: "#default",
                          variableScopes: X(t.variableScopes),
                        }),
                      ),
                      1 === n.length ? n[0] : n
                    );
                  })(t, e.content)
                : q(t, e.content);
        }
        function q(t, e) {
          return (function (t, e) {
            const n = t.outputDocument.createDocumentFragment();
            if (
              (e(J(n)), 1 === n.childNodes.length && 1 === n.childElementCount)
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
                variableScopes: X(t.variableScopes),
              }),
            );
          });
        }
        ((e.toNumeric = k(49)),
          (e.toAlphabetic = F(97, 122)),
          (e.toAlphabeticUpper = F(65, 90)),
          (0, u.registerFunctions)());
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
    })(617);
  module.exports = n.transform;
})();
