(() => {
  var e = {
      172(e, t, n) {
        (n(898), n(594));
        let o = n(821);
        function r(e, t) {
          t = o.setParamDefaults(e, t);
          let n = new Map();
          n.set("#default", { document: t.outputDocument });
          let r = new Map(),
            a = new Map(),
            s = {
              outputDocument: t.outputDocument,
              append: o.mkNodeAppender(t.outputNode),
              resultDocuments: n,
              contextItem: e,
              mode: t.initialMode,
              templates: [
                {
                  match: "@* | node()",
                  matchFunction: void 0,
                  name: void 0,
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (e) => {
                    o.copy(
                      e,
                      {
                        namespaces: {
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
                {
                  match: "/",
                  matchFunction: o.compileMatchFunction(
                    '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\tconst root0 = (function () {\n\t\t\t\tlet n = contextItem0;\n\t\t\t\twhile (n.nodeType !== /*DOCUMENT_NODE*/9) {\n\t\t\t\t\tn = domFacade.getParentNode(n);\n\t\t\t\t\tif (n === null) {\n\t\t\t\t\t\tthrow new Error(\'XPDY0050: the root node of the context node is not a document node.\');\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn n;\n\t\t\t})();\n\t\t\tyield root0;\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                  ),
                  name: void 0,
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (e) => {
                    o.element(
                      e,
                      {
                        name: ["xsl:stylesheet"],
                        namespace: void 0,
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                      },
                      (e) => {
                        (o.attribute(
                          e,
                          {
                            name: ["version"],
                            separator: void 0,
                            select: "@xsl:version",
                            namespace: void 0,
                            namespaces: {
                              xsl: "http://www.w3.org/1999/XSL/Transform",
                            },
                          },
                          (e) => {},
                        ),
                          o.element(
                            e,
                            {
                              name: ["xsl:template"],
                              namespace: void 0,
                              namespaces: {
                                xsl: "http://www.w3.org/1999/XSL/Transform",
                              },
                            },
                            (e) => {
                              (o.attribute(
                                e,
                                {
                                  name: ["match"],
                                  separator: void 0,
                                  select: void 0,
                                  namespace: void 0,
                                  namespaces: {
                                    xsl: "http://www.w3.org/1999/XSL/Transform",
                                  },
                                },
                                (e) => {
                                  o.literalText(e, "/");
                                },
                              ),
                                o.copyOf(
                                  e,
                                  {
                                    select: ".",
                                    namespaces: {
                                      xsl: "http://www.w3.org/1999/XSL/Transform",
                                    },
                                  },
                                  (e) => {},
                                ));
                            },
                          ));
                      },
                    );
                  },
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  priority: void 0,
                  importPrecedence: 1,
                },
              ],
              variableScopes: [new Map()],
              inputURL: t.inputURL,
              keys: r,
              outputDefinitions: a,
              patternMatchCache: new Map(),
              stylesheetParams: t.stylesheetParams,
            };
          return (
            o.stripSpace(e, []),
            o.processNode(s, [], {
              xsl: "http://www.w3.org/1999/XSL/Transform",
            }),
            n
          );
        }
        ((e.exports.transform = r), (global.transform = r));
      },
      712(e, t) {
        "use strict";
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.NodeType =
            t.DEFAULT_PRIORITIES =
            t.XPATH_NSURI =
            t.XMLNS_NSURI =
            t.XSLT1_NSURI =
              void 0));
        const n = String.raw`[^,:\(\)\*\[\]/]`,
          o = String.raw`(child::|attribute::|@)?`,
          r = String.raw`(document-node\()?`;
        var a;
        ((t.XSLT1_NSURI = "http://www.w3.org/1999/XSL/Transform"),
          (t.XMLNS_NSURI = "http://www.w3.org/2000/xmlns/"),
          (t.XPATH_NSURI = "http://www.w3.org/2005/xpath-functions"),
          (t.DEFAULT_PRIORITIES = new Map([
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
          })(a || (t.NodeType = a = {})));
      },
      379(e, t, n) {
        "use strict";
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.registerFunctions = function () {
            ((0, o.registerCustomXPathFunction)(
              { namespaceURI: r.XPATH_NSURI, localName: "current" },
              [],
              "item()",
              s,
            ),
              (0, o.registerCustomXPathFunction)(
                {
                  namespaceURI: r.XPATH_NSURI,
                  localName: "current-output-uri",
                },
                [],
                "xs:string",
                p,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XPATH_NSURI, localName: "doc" },
                ["xs:string"],
                "document-node()",
                c,
              ),
              (0, o.registerCustomXPathFunction)(
                {
                  namespaceURI: r.XPATH_NSURI,
                  localName: "current-grouping-key",
                },
                [],
                "xs:string?",
                i,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XPATH_NSURI, localName: "current-group" },
                [],
                "item()*",
                u,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XPATH_NSURI, localName: "key" },
                ["xs:string", "item()*"],
                "node()*",
                l,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XPATH_NSURI, localName: "system-property" },
                ["xs:string"],
                "xs:string",
                m,
              ));
          }));
        const o = n(594),
          r = n(712),
          a = n(472);
        function s({ currentContext: e }) {
          return e.contextItem;
        }
        function c({ currentContext: e }, t) {
          return (0, a.urlToDom)(e, t);
        }
        function i({ currentContext: e }) {
          return e.currentGroupingKey;
        }
        function u({ currentContext: e }) {
          return e.currentGroup;
        }
        function p({ currentContext: e }) {
          for (const [t, n] of e.resultDocuments)
            if (n === e.outputDocument) return t;
          return "#default";
        }
        function l({ currentContext: e }, t, n) {
          const {
            keys: o,
            contextItem: r,
            variableScopes: a,
            patternMatchCache: s,
          } = e;
          if (!o.has(t)) throw new Error("XTDE1260");
          return o.get(t).lookup(s, r.ownerDocument, a, n) || [];
        }
        function m(e, t) {
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
          (t.mkOutputDefinition = function (e) {
            return {
              omitXmlDeclaration: n(e.omitXmlDeclaration),
              standalone: o(e.standalone),
              doctypeSystem: e.doctypeSystem,
              doctypePublic: e.doctypePublic,
            };
          }),
          (t.mkResolver = function (e) {
            return (t) => e[t];
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
          (t.computeDefaultPriority = i),
          (t.sortSortable = function (e) {
            return (
              e.reverse(),
              e.sort(
                (e, t) =>
                  (t.priority || i(t.match)) - (e.priority || i(e.match)),
              ),
              e.sort((e, t) => e.importPrecedence - t.importPrecedence),
              e
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
        function i(e) {
          if (e && e.includes("|"))
            return Math.max(
              ...e
                .split("|")
                .filter((e) => "" !== e)
                .map((e) => i(e)),
            );
          for (let [t, n] of c) if (t.test(e)) return n;
          return 0.5;
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
            const n = e.inputURL ? (0, c.resolve)(e.inputURL.toString(), t) : t;
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
          (t.KeyImpl = void 0),
          (t.visitNodes = m),
          (t.processNode = y),
          (t.nextMatch = function (e, t) {
            const n = e.nextMatches;
            if (n) {
              const o = n.next();
              o.done ||
                x(
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
                x(
                  o.value,
                  Object.assign(Object.assign({}, e), { nextMatches: n }),
                  t.params,
                );
            }
          }),
          (t.sortNodes = b),
          (t.applyTemplates = E),
          (t.callTemplate = function (e, t) {
            for (let n of e.templates)
              if (void 0 !== n.name && t.name === n.name)
                return x(n, e, t.params);
            throw new Error(`Cannot find a template named ${t.name}`);
          }),
          (t.functionX = function (e, t) {
            const n = e.params.map((e) => "item()"),
              o = e.params.map((e) => e.name);
            (0, c.registerCustomXPathFunction)(
              { namespaceURI: e.namespace, localName: e.name },
              n,
              e.as || "item()",
              ({ currentContext: e }, ...n) => {
                let r = new Map();
                return (
                  o.forEach((e, t) => r.set(e, n[t])),
                  k(
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
            if (o.nodeType === p.NodeType.ELEMENT) {
              r = e.outputDocument.createElementNS(
                o.namespaceURI,
                o.prefix ? `${o.prefix}:${o.localName}` : o.localName,
              );
              for (let t of o.attributes)
                if (t.namespaceURI === p.XMLNS_NSURI) {
                  const n = t.localName;
                  r.setAttributeNode(
                    e.outputDocument.importNode(
                      o.getAttributeNodeNS(p.XMLNS_NSURI, n),
                    ),
                  );
                }
            } else
              r =
                o.nodeType === p.NodeType.DOCUMENT
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
          (t.copyOf = function (e, t, n) {
            let o = (0, c.evaluateXPath)(
              t.select,
              e.contextItem,
              void 0,
              C(e.variableScopes),
              c.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: e,
                namespaceResolver: (0, l.mkResolver)(t.namespaces),
              },
            );
            for (let t of o) e.append(t);
          }),
          (t.valueOf = R),
          (t.message = function (e, t, n) {
            const o = A(e, t.select || n, (0, l.mkResolver)(t.namespaces));
            if ("yes" === t.terminate) throw new Error(o);
            console.log(o);
          }),
          (t.text = function (e, t, n) {
            e.append(A(e, n, (0, l.mkResolver)(t.namespaces), [""]));
          }),
          (t.variable = function (e, t) {
            I(e.variableScopes, t.name, L(e, t));
          }),
          (t.param = function (e, t) {
            I(e.variableScopes, t.name, e.stylesheetParams[t.name] || L(e, t));
          }),
          (t.extendScope = $),
          (t.setVariable = I),
          (t.mergeVariableScopes = C),
          (t.literalText = function (e, t) {
            e.append(t);
          }),
          (t.sequence = function (e, t) {
            const n = (0, c.evaluateXPath)(
              t.select,
              e.contextItem,
              void 0,
              C(e.variableScopes),
              c.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: e,
                namespaceResolver: (0, l.mkResolver)(t.namespaces),
              },
            );
            e.append(n);
          }),
          (t.buildNode = X),
          (t.buildAttributeNode = M),
          (t.literalElement = function (e, t, n) {
            let o = X(e, { name: t.name, namespace: t.namespace });
            const r = (0, l.mkResolver)(t.namespaces);
            for (let n of t.attributes) {
              const t = U(e, n.value, r),
                a = M(e, { name: n.name, namespace: n.namespace, value: t });
              o.setAttributeNode(a);
            }
            const a = e.append(o);
            n(
              Object.assign(Object.assign({}, e), {
                variableScopes: $(e.variableScopes),
                append: a || e.append,
              }),
            );
          }),
          (t.attribute = function (e, t, n) {
            const o = (0, l.mkResolver)(t.namespaces),
              r = U(e, t.name, o),
              [a, s] = (0, l.determineNamespace)(r, o, U(e, t.namespace, o)),
              c = M(e, {
                name: r,
                namespace: a,
                value: A(e, t.select || n, o, t.separator),
              });
            e.append(c);
          }),
          (t.processingInstruction = function (e, t, n) {
            const o = U(e, t.name, (0, l.mkResolver)(t.namespaces)),
              r = A(e, t.select || n, (0, l.mkResolver)(t.namespaces), [
                "",
              ]).trimStart();
            e.append(e.outputDocument.createProcessingInstruction(o, r));
          }),
          (t.comment = function (e, t, n) {
            const o = A(e, t.select || n, (0, l.mkResolver)(t.namespaces), [
              "",
            ]);
            e.append(e.outputDocument.createComment(o));
          }),
          (t.namespace = function (e, t, n) {
            const o = (0, l.mkResolver)(t.namespaces),
              r = U(e, t.name, o),
              a = A(e, t.select || n, o, [""]),
              s = M(e, {
                name: `xmlns:${r}`,
                namespace: p.XMLNS_NSURI,
                value: a,
              });
            e.append(s);
          }),
          (t.element = function (e, t, n) {
            const o = (0, l.mkResolver)(t.namespaces);
            let r = U(e, t.name, o),
              a = U(e, t.namespace, o),
              s = X(e, {
                name: r,
                namespace: (0, l.determineNamespace)(
                  r,
                  (0, l.mkResolver)(t.namespaces),
                  a,
                )[0],
              });
            const c = e.append(s);
            n(
              Object.assign(Object.assign({}, e), {
                variableScopes: $(e.variableScopes),
                append: c || e.append,
              }),
            );
          }),
          (t.ifX = function (e, t, n) {
            (0, c.evaluateXPathToBoolean)(
              t.test,
              e.contextItem,
              void 0,
              C(e.variableScopes),
              {
                currentContext: e,
                namespaceResolver: (0, l.mkResolver)(t.namespaces),
              },
            ) && n(e);
          }),
          (t.choose = function (e, t) {
            for (let n of t) {
              if (!n.test) return n.apply(e);
              if (
                (0, c.evaluateXPathToBoolean)(
                  n.test,
                  e.contextItem,
                  void 0,
                  C(e.variableScopes),
                  { currentContext: e },
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
                variableScopes: $(e.variableScopes),
              }),
            );
          }),
          (t.forEach = function (e, t, n) {
            const o = (0, l.mkResolver)(t.namespaces),
              r = (0, c.evaluateXPath)(
                t.select,
                e.contextItem,
                void 0,
                C(e.variableScopes),
                c.evaluateXPath.ALL_RESULTS_TYPE,
                { currentContext: e, namespaceResolver: o },
              );
            if (r && Symbol.iterator in Object(r))
              for (let a of b(e, r, t.sortKeyComponents, o))
                n(
                  Object.assign(Object.assign({}, e), {
                    contextItem: a,
                    variableScopes: $(e.variableScopes),
                  }),
                );
          }),
          (t.forEachGroup = function (e, t, n) {
            const o = (0, l.mkResolver)(t.namespaces),
              r = C(e.variableScopes),
              a = (0, c.evaluateXPathToNodes)(
                t.select,
                e.contextItem,
                void 0,
                r,
                { currentContext: e, namespaceResolver: o },
              );
            if (a && Symbol.iterator in Object(a)) {
              let r = (function (e, t, n, o) {
                const r = C(e.variableScopes);
                let a = new Map();
                for (let s of t) {
                  const t = (0, c.evaluateXPathToString)(n, s, void 0, r, {
                    currentContext: e,
                    namespaceResolver: o,
                  });
                  (a.has(t) || a.set(t, []), a.set(t, a.get(t).concat(s)));
                }
                return a;
              })(e, a, t.groupBy, o);
              for (let [t, o] of r)
                n(
                  Object.assign(Object.assign({}, e), {
                    contextItem: o[0],
                    currentGroupingKey: t,
                    currentGroup: o,
                    variableScopes: $(e.variableScopes),
                  }),
                );
            }
          }),
          (t.mkNodeAppender = _),
          (t.mkArrayAppender = j),
          (t.resultDocument = function (e, t, n) {
            const o = (0, l.mkResolver)(t.namespaces);
            function r(t) {
              return U(e, t, o);
            }
            const a = r(t.format);
            let s = (0, l.mkOutputDefinition)({
              omitXmlDeclaration: r(t.omitXmlDeclaration),
              doctypePublic: r(t.doctypePublic),
              doctypeSystem: r(t.doctypeSystem),
              standalone: r(t.standalone),
            });
            Object.keys(s).forEach((e) => {
              s[e] || delete s[e];
            });
            const c = Object.assign(
                Object.assign({}, a ? e.outputDefinitions.get(a) : {}),
                s,
              ),
              i = r(t.href);
            let u = null;
            if (
              ((c.doctypePublic || c.doctypeSystem) &&
                (u = e.outputDocument.implementation.createDocumentType(
                  "out",
                  c.doctypePublic || "",
                  c.doctypeSystem || "",
                )),
              i)
            ) {
              const t = e.outputDocument.implementation.createDocument(
                null,
                null,
                u,
              );
              if (e.resultDocuments.has(i))
                throw new Error(`XTDE1490: ${i} is a duplicate`);
              (e.resultDocuments.set(
                i,
                Object.assign(Object.assign({}, c), { document: t }),
              ),
                n(
                  Object.assign(Object.assign({}, e), {
                    outputDocument: t,
                    append: _(t),
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
                (e.append = _(t))),
                e.resultDocuments.set(
                  "#default",
                  Object.assign(Object.assign({}, c), { document: t }),
                ),
                n(e));
            }
          }),
          (t.stripSpace = function (e, t) {
            const n = RegExp("^[ \n\r\t]+$");
            let o = [];
            !(function e(r) {
              if (r.nodeType === p.NodeType.TEXT)
                n.test(r.textContent) &&
                  (function (e, t) {
                    let n = new Map();
                    for (const o of t) {
                      const t = (0, l.mkResolver)(o.namespaces);
                      if (h(n, o.match, null, e, [], t)) return !o.preserve;
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
          (t.evaluateAttributeValueTemplate = U),
          (t.serialize = function (e) {
            const t = new i.XMLSerializer();
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
          }));
        const c = n(594),
          i = s(n(898)),
          u = n(379),
          p = n(712),
          l = n(777);
        function m(e, t) {
          if ((t(e), e.childNodes)) for (let n of e.childNodes) m(n, t);
        }
        function d(e) {
          return Array.isArray(e)
            ? e.map((e) => d(e)).join("")
            : e.nodeType
              ? e.textContent
              : e.toString();
        }
        function f(e, t, n, o) {
          e.has(t) || e.set(t, new Map());
          const r = e.get(t);
          return (r.has(n) || r.set(n, o()), r.get(n));
        }
        t.KeyImpl = class {
          constructor(e, t, n) {
            ((this.match = e),
              (this.use = t),
              (this.namespaces = n),
              (this.cache = new Map()));
          }
          buildDocumentCache(e, t, n) {
            let o = new Map();
            return (
              m(t, (t) => {
                if (
                  "string" == typeof this.use &&
                  h(
                    e,
                    this.match,
                    void 0,
                    t,
                    n,
                    (0, l.mkResolver)(this.namespaces),
                  )
                ) {
                  let e = (0, c.evaluateXPathToString)(this.use, t);
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
              this.cache.get(t).get(d(o))
            );
          }
        };
        const g = new RegExp(/^[a-z |-]+$/),
          T = new RegExp(/^@[a-z]+$/),
          w = new RegExp(/text\(\)|node\(\)/),
          v = new RegExp(/@|attribute|node/);
        function h(e, t, n, o, r, a) {
          let s = o;
          if (
            o &&
            !(function (e, t) {
              return (
                (t.nodeType === p.NodeType.ATTRIBUTE && !v.exec(e)) ||
                (t.nodeType === p.NodeType.TEXT && !w.exec(e)) ||
                !(!g.exec(e) || t.nodeType === p.NodeType.ELEMENT) ||
                !(!T.exec(e) || t.nodeType === p.NodeType.ATTRIBUTE)
              );
            })(t, o)
          ) {
            if (
              (function (e, t) {
                return "text()|@*" === e
                  ? t.nodeType === p.NodeType.TEXT ||
                      t.nodeType === p.NodeType.ATTRIBUTE
                  : "processing-instruction()|comment()" === e
                    ? t.nodeType === p.NodeType.PROCESSING_INSTRUCTION ||
                      t.nodeType === p.NodeType.COMMENT
                    : "*|/" === e
                      ? t.nodeType === p.NodeType.ELEMENT ||
                        t.nodeType === p.NodeType.DOCUMENT
                      : "text()" === e
                        ? t.nodeType === p.NodeType.TEXT
                        : "/" === e && t.nodeType === p.NodeType.DOCUMENT;
              })(t, o)
            )
              return !0;
            for (; s; ) {
              if (
                f(e, t, s, () =>
                  n
                    ? new Set((0, c.executeJavaScriptCompiledXPath)(n, s))
                    : new Set(
                        (0, c.evaluateXPathToNodes)(t, s, void 0, C(r), {
                          namespaceResolver: a,
                        }),
                      ),
                ).has(o)
              )
                return !0;
              s =
                s.parentNode ||
                (s.nodeType === p.NodeType.ATTRIBUTE && s.ownerElement);
            }
          }
          return !1;
        }
        function y(e, t, n) {
          let o = (function* (e, t, n, o, r, a) {
            for (let s of n)
              s.match &&
                ("#all" === s.modes[0] || s.modes.includes(r)) &&
                h(e, s.match, s.matchFunction, t, o, (0, l.mkResolver)(a)) &&
                (yield s);
          })(
            e.patternMatchCache,
            e.contextItem,
            e.templates.concat(
              (function (e) {
                return [
                  {
                    match: "processing-instruction()|comment()",
                    apply: (e) => {},
                    allowedParams: [],
                    modes: ["#all"],
                    importPrecedence: Number.MAX_VALUE,
                  },
                  {
                    match: "text()|@*",
                    apply: (t) => {
                      R(t, { select: ".", namespaces: e }, () => {});
                    },
                    allowedParams: [],
                    modes: ["#all"],
                    importPrecedence: Number.MAX_VALUE,
                  },
                  {
                    match: "*|/",
                    apply: (t) => {
                      E(t, {
                        select: "child::node()",
                        params: [],
                        mode: "#current",
                        namespaces: e,
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
            e.variableScopes,
            e.mode,
            n,
          );
          const r = o.next();
          r.done ||
            x(
              r.value,
              Object.assign(Object.assign({}, e), { nextMatches: o }),
              t,
            );
        }
        function S(e, t, n, o) {
          let r;
          return (
            (r =
              "number" === n.dataType && "string" == typeof n.sortKey
                ? (function (e, t, n, o) {
                    let r = [];
                    for (let a of t) {
                      let t = (0, c.evaluateXPathToNumber)(
                        `number(${n.sortKey})`,
                        a,
                        void 0,
                        C(e.variableScopes),
                        { currentContext: e, namespaceResolver: o },
                      );
                      (isNaN(t) && (t = Number.MIN_SAFE_INTEGER),
                        r.push({ key: t, item: a }));
                    }
                    return (
                      r.sort((e, t) => e.key - t.key),
                      r.sort((e, t) => e.key - t.key).map((e) => e.item)
                    );
                  })(e, t, n, o)
                : (function (e, t, n, o) {
                    let r = [];
                    for (let a of t) {
                      const t = Object.assign(Object.assign({}, e), {
                        contextItem: a,
                      });
                      r.push({ key: A(t, n.sortKey, o), item: a });
                    }
                    const a = n.lang && U(e, n.lang, o);
                    let s = new Intl.Collator(a).compare;
                    return r.sort((e, t) => s(e.key, t.key)).map((e) => e.item);
                  })(e, t, n, o)),
            "descending" === U(e, n.order, o) && r.reverse(),
            r
          );
        }
        function b(e, t, n, o) {
          if (n) for (let r of [...n].reverse()) t = S(e, t, r, o);
          return t;
        }
        function N(e, t) {
          for (let n of t) if (n.name === e) return n;
        }
        function x(e, t, n) {
          let o = $(t.variableScopes);
          for (let r of e.allowedParams) {
            let e = N(r.name, n);
            void 0 !== e ? I(o, e.name, L(t, e)) : I(o, r.name, L(t, r));
          }
          return e.apply(
            Object.assign(Object.assign({}, t), { variableScopes: o }),
          );
        }
        function E(e, t) {
          const n = (0, l.mkResolver)(t.namespaces),
            o = (0, c.evaluateXPathToNodes)(
              t.select,
              e.contextItem,
              void 0,
              C(e.variableScopes),
              { currentContext: e, namespaceResolver: n },
            );
          let r = t.mode || "#default";
          "#current" === r && (r = e.mode);
          for (let a of b(e, o, t.sortKeyComponents, n))
            y(
              Object.assign(Object.assign({}, e), {
                mode: r,
                contextItem: a,
                variableScopes: $(e.variableScopes),
              }),
              t.params,
              t.namespaces,
            );
        }
        function R(e, t, n) {
          e.append(
            A(e, t.select || n, (0, l.mkResolver)(t.namespaces), t.separator),
          );
        }
        function $(e) {
          return e.concat([new Map()]);
        }
        const O = (0, c.createTypedValueFactory)("xs:numeric*"),
          P = (0, c.createTypedValueFactory)("xs:string*"),
          D = (0, c.createTypedValueFactory)("item()*");
        function I(e, t, n) {
          var o;
          e[e.length - 1].set(
            t,
            ((o = n),
            Array.isArray(o)
              ? "string" == typeof o[0]
                ? P(o, null)
                : "number" == typeof o[0]
                  ? O(o, null)
                  : D(o, null)
              : o),
          );
        }
        function C(e) {
          let t = {};
          for (let n of e) for (let [e, o] of n) t[e] = o;
          return t;
        }
        function X(e, t) {
          let n;
          return (
            (n =
              void 0 !== t.namespace && null !== t.namespace
                ? e.outputDocument.createElementNS(t.namespace, t.name)
                : e.outputDocument.createElement(t.name)),
            n
          );
        }
        function M(e, t) {
          let n;
          return (
            (n = t.namespace
              ? e.outputDocument.createAttributeNS(t.namespace, t.name)
              : e.outputDocument.createAttribute(t.name)),
            (n.value = t.value),
            n
          );
        }
        function _(e) {
          const t = e.ownerDocument || e;
          return function n(o) {
            if (o.length && o.values) {
              let e = !0;
              const t = o.length > 0 && !o[0].nodeType;
              for (let r of o) (e ? (e = !1) : t && n(" "), n(r));
            } else if ("string" == typeof o) {
              if (e.nodeType !== p.NodeType.DOCUMENT)
                if (e.lastChild && e.lastChild.nodeType === p.NodeType.TEXT)
                  e.lastChild.appendData(o);
                else if ("" !== o) {
                  const n = t.createTextNode(o);
                  n && e.append(n);
                }
            } else if (o.nodeType === p.NodeType.ATTRIBUTE) {
              let n = t.importNode(o, !0);
              e.setAttributeNode(n);
            } else {
              if (o.nodeType === p.NodeType.DOCUMENT) {
                const e = o;
                return (o = o.documentElement) ? (n(o), _(o)) : _(e);
              }
              if (o.nodeType === p.NodeType.DOCUMENT_FRAGMENT) n(o.childNodes);
              else if (o.nodeType === p.NodeType.TEXT) n(o.data);
              else {
                if (o.nodeType) {
                  let n = t.importNode(o, !0);
                  return (e.append(n), _(n));
                }
                n(`${o}`);
              }
            }
          };
        }
        function j(e) {
          return function (t) {
            if (
              (e.push(t),
              t.nodeType &&
                (t.nodeType === p.NodeType.DOCUMENT ||
                  t.nodeType === p.NodeType.ELEMENT))
            )
              return _(t);
          };
        }
        function U(e, t, n) {
          if (t)
            return t
              .map((t) =>
                "string" == typeof t
                  ? t
                  : (0, c.evaluateXPathToString)(
                      t.xpath,
                      e.contextItem,
                      void 0,
                      C(e.variableScopes),
                      { currentContext: e, namespaceResolver: n },
                    ),
              )
              .join("");
        }
        function A(e, t, n, o) {
          o || (o = "string" == typeof t ? [" "] : []);
          const r = U(e, o, n);
          return "string" == typeof t
            ? (0, c.evaluateXPath)(
                t,
                e.contextItem,
                void 0,
                C(e.variableScopes),
                c.evaluateXPath.STRINGS_TYPE,
                { currentContext: e, namespaceResolver: n },
              ).join(r)
            : (function (e) {
                let t = [];
                return (
                  m(e, (e) => {
                    e.nodeType === p.NodeType.TEXT &&
                      "" !== e.data &&
                      (t = t.concat(e.data));
                  }),
                  t
                );
              })(k(e, t)).join(r);
        }
        function L(e, t) {
          return "string" == typeof t.content
            ? (0, c.evaluateXPath)(
                t.content,
                e.contextItem,
                void 0,
                C(e.variableScopes),
                c.evaluateXPath.ANY_TYPE,
                {
                  currentContext: e,
                  namespaceResolver: (0, l.mkResolver)(t.namespaces),
                },
              )
            : null == t.content
              ? ""
              : t.as
                ? (function (e, t) {
                    let n = [];
                    return (
                      t(
                        Object.assign(Object.assign({}, e), {
                          append: j(n),
                          mode: "#default",
                          variableScopes: $(e.variableScopes),
                        }),
                      ),
                      1 === n.length ? n[0] : n
                    );
                  })(e, t.content)
                : k(e, t.content);
        }
        function k(e, t) {
          const n = e.outputDocument.createDocumentFragment();
          if (
            (t(
              Object.assign(Object.assign({}, e), {
                append: _(n),
                outputDocument: e.outputDocument,
                mode: "#default",
                variableScopes: $(e.variableScopes),
              }),
            ),
            1 === n.childNodes.length && 1 === n.childElementCount)
          ) {
            const t = e.outputDocument.implementation.createDocument(
              null,
              null,
              null,
            );
            return (t.appendChild(n.firstChild), t);
          }
          return n;
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
    })(172);
  module.exports = n.transform;
})();
