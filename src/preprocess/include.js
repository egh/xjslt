(() => {
  var e = {
      334(e, t, n) {
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
                  match: {
                    xpath: "xsl:include",
                    compiled: r.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-include");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-include")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "include" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  name: void 0,
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (e) => {
                    (r.variable(e, {
                      name: "doc",
                      content: "doc(@href)",
                      namespaces: {
                        xsl: "http://www.w3.org/1999/XSL/Transform",
                      },
                      as: void 0,
                    }),
                      r.applyTemplates(e, {
                        select: "$doc/xsl:stylesheet/* | $doc/xsl:transform/*",
                        mode: "#default",
                        params: [],
                        sortKeyComponents: [],
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                      }));
                  },
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  priority: 0.5,
                  declarationOrder: 2,
                  importPrecedence: 1,
                },
                {
                  match: { xpath: "/ | @* | node()", compiled: void 0 },
                  name: void 0,
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
              ],
              variableScopes: [new Map()],
              inputURL: t.inputURL,
              ruleTree: { rules: [] },
              keys: o,
              outputDefinitions: a,
              decimalFormats: s,
              patternMatchCache: new Map(),
              stylesheetParams: t.stylesheetParams,
            };
          return (
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
          (t.AttributeFeature =
            t.NodeTextFeature =
            t.NodeNameFeature =
            t.NodeTypeFeature =
            t.NamespaceFeature =
              void 0),
          (t.xpathToFeatures = function (e, t) {
            if (e)
              return (function (e, t) {
                const n = [];
                try {
                  return (
                    T(e, n, t, { level: 0 }),
                    [new m(u.Node.ELEMENT_NODE), ...n]
                  );
                } catch (e) {
                  return;
                }
              })(
                (0, c.parseScript)(
                  e,
                  { language: c.evaluateXPath.XPATH_3_1_LANGUAGE },
                  new u.Document(),
                ),
                t,
              );
          }));
        const i = n(712),
          c = n(594),
          u = s(n(898)),
          l = "http://www.w3.org/2005/XQueryX";
        class p extends i.Feature {
          matches(e) {
            return (
              e.nodeType === u.Node.ELEMENT_NODE &&
              e.namespaceURI === this.value
            );
          }
        }
        t.NamespaceFeature = p;
        class m extends i.Feature {
          matches(e) {
            return e.nodeType === this.value;
          }
        }
        t.NodeTypeFeature = m;
        class f extends i.Feature {
          matches(e) {
            return e.nodeName === this.value;
          }
        }
        t.NodeNameFeature = f;
        class d extends i.Feature {
          matches(e) {
            return e.textContent === this.value;
          }
        }
        t.NodeTextFeature = d;
        class g extends i.Feature {
          matches(e) {
            return (
              e.nodeType === u.Node.ELEMENT_NODE &&
              e.getAttribute(this.value.name) === this.value.value
            );
          }
        }
        function h(e) {
          return (
            (function (e) {
              return 1 === e.nodeType;
            })(e) && e.namespaceURI === l
          );
        }
        function v(e, t) {
          return h(e) && e.localName === t;
        }
        function x(e, t) {
          for (const n of e.childNodes) if (v(n, t)) return n;
        }
        function N(e, t, n) {
          for (const r of e.childNodes) {
            if (!h(r)) continue;
            if (v(r, t) && (!n || n(r))) return r;
            const e = N(r, t, n);
            if (e) return e;
          }
        }
        function y(e) {
          var t;
          return (
            "descendant-or-self" ===
              (null === (t = x(e, "xpathAxis")) || void 0 === t
                ? void 0
                : t.textContent) && !!x(e, "anyKindTest")
          );
        }
        t.AttributeFeature = g;
        class b extends Error {}
        function T(e, t, n, r) {
          var o, a;
          if (!h(e)) return;
          const s = e.localName;
          if (
            "module" === s ||
            "mainModule" === s ||
            "predicates" === s ||
            "queryBody" === s ||
            "andOp" === s ||
            "firstOperand" === s ||
            "secondOperand" === s
          )
            for (const o of e.childNodes) T(o, t, n, r);
          else if ("pathExpr" === s) {
            const o = e.childNodes.filter((e) => v(e, "stepExpr"));
            if (0 === o.length) throw new b();
            for (const e of o.slice(0, -1)) if (!y(e)) throw new b();
            T(o[o.length - 1], t, n, r);
          } else if ("stepExpr" === s) {
            const a =
              null === (o = x(e, "xpathAxis")) || void 0 === o
                ? void 0
                : o.textContent;
            if ("child" !== a) throw new b(`unsupported axis: ${a}`);
            if (r.level > 0) throw new b("Too many child axes.");
            for (const o of e.childNodes.slice(1))
              T(
                o,
                t,
                n,
                Object.assign(Object.assign({}, r), { level: r.level + 1 }),
              );
          } else if ("nameTest" === s) {
            const r = e.textContent;
            r && t.push(new f(r));
            const o = e.getAttributeNS(l, "prefix");
            if (o) {
              const e = null == n ? void 0 : n(o);
              if (!e) throw new b(`unresolved ns prefix: ${e}`);
              t.push(new p(e));
            }
            const a = e.getAttributeNS(l, "URI");
            a && t.push(new p(a));
          } else if ("Wildcard" === s) {
            const r = x(e, "NCName");
            if (r) {
              const e =
                null == n
                  ? void 0
                  : n(null !== (a = r.textContent) && void 0 !== a ? a : "");
              if (!e) throw new b(`unresolved ns prefix: ${e}`);
              t.push(new p(e));
            }
          } else {
            if ("equalOp" !== s) throw new b();
            {
              const n = x(e, "firstOperand"),
                r = x(e, "secondOperand");
              if (!n || !r) throw new b();
              const o = S(n, r) || S(r, n);
              if (!o) throw new b();
              t.push(o);
            }
          }
        }
        function S(e, t) {
          var n, r;
          const o = N(t, "value");
          if (!o) return;
          const a = null !== (n = o.textContent) && void 0 !== n ? n : "",
            s = N(e, "stepExpr", (e) => {
              var t;
              return (
                "attribute" ===
                (null === (t = x(e, "xpathAxis")) || void 0 === t
                  ? void 0
                  : t.textContent)
              );
            });
          if (s) {
            const e =
              null === (r = x(s, "nameTest")) || void 0 === r
                ? void 0
                : r.textContent;
            if (!e) return;
            return new g({ name: e, value: a });
          }
          return x(e, "contextItemExpr") || N(e, "textTest")
            ? new d(a)
            : void 0;
        }
      },
      324(e, t) {
        "use strict";
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.buildRuleTree = function e(t) {
            if (0 === t.length) return { rules: t };
            const n = new Set();
            for (const e of t) for (const t of e.features) n.add(t);
            if (0 === n.size) return { rules: t };
            const r = Array.from(n)[0],
              o = [],
              a = [];
            for (const e of t)
              e.features.some((e) => e.equals(r)) ? o.push(e) : a.push(e);
            let s = { feature: r, rules: [] };
            if (o.length > 0) {
              const t = o.map((e) =>
                Object.assign(Object.assign({}, e), {
                  features: e.features.filter((e) => !e.equals(r)),
                }),
              );
              s.left = e(t.filter((e) => e.features.length > 0));
              const n = o.filter((e, n) => 0 === t[n].features.length);
              n.length > 0 &&
                (s.left || (s.left = { rules: [] }), (s.left.rules = n));
            }
            return (a.length > 0 && (s.right = e(a)), s);
          }),
          (t.findMatchingRules = function (e, t) {
            const n = [],
              r = [e];
            for (; r.length > 0; ) {
              const e = r.pop();
              e &&
                (n.push(...e.rules),
                e.feature &&
                  (e.right && r.push(e.right),
                  e.feature.matches(t) && e.left && r.push(e.left)));
            }
            return n.map((e) => e.result);
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
          return { type: "Literal", value: (e = null == e ? void 0 : e) };
        }
        function a(e, t) {
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
        function s(e) {
          return { type: "ArrayExpression", elements: e };
        }
        function i(e, t, n) {
          return {
            type: "VariableDeclaration",
            declarations: [{ type: "VariableDeclarator", id: e, init: t }],
            kind: n,
          };
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
            return [a("slimdom"), a("fontoxpath"), a("xjslt", "xjslt")];
          }),
          (t.mkLiteral = o),
          (t.mkMember = function (e, t) {
            return {
              type: "MemberExpression",
              object: r(e),
              property: r(t),
              computed: !1,
              optional: !1,
            };
          }),
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
          (t.mkRequire = a),
          (t.mkArray = s),
          (t.mkReturn = function (e) {
            return { type: "ReturnStatement", argument: e };
          }),
          (t.mkBlock = function (e) {
            return { type: "BlockStatement", body: e };
          }),
          (t.mkLet = function (e, t) {
            return i(e, t, "let");
          }),
          (t.mkConst = function (e, t) {
            return i(e, t, "const");
          }),
          (t.mkVariableDeclaration = i),
          (t.mkNew = function (e, t) {
            return { type: "NewExpression", callee: e, arguments: t };
          }),
          (t.toEstree = function e(t) {
            const n = typeof t;
            return null == t ||
              "string" === n ||
              "number" === n ||
              "boolean" === n
              ? o(t)
              : Array.isArray(t)
                ? s(t.map((t) => e(t)))
                : "function" == typeof t.serialize
                  ? t.serialize()
                  : "object" === n
                    ? "type" in t
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
                          return { type: "ObjectExpression", properties: n };
                        })(t)
                    : void 0;
          }));
      },
      379(e, t, n) {
        "use strict";
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.functionNameResolver = y),
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
                f,
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
                d,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "system-property" },
                ["xs:string"],
                "xs:string",
                g,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "base-uri" },
                [],
                "xs:string?",
                h,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "base-uri" },
                ["node()?"],
                "xs:string?",
                h,
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
                        functionNameResolver: y,
                      },
                    );
                    return 1 === n.length ? n[0] : n;
                  })(e, t),
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "normalize-unicode" },
                ["xs:string?"],
                "xs:string",
                (e, t) => v(0, t, "NFC"),
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "normalize-unicode" },
                ["xs:string?", "xs:string"],
                "xs:string",
                v,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "format-number" },
                ["xs:numeric", "xs:string"],
                "xs:string",
                x,
              ),
              (0, r.registerCustomXPathFunction)(
                { namespaceURI: o.XJSLT_NSURI, localName: "format-number" },
                ["xs:numeric", "xs:string", "xs:string"],
                "xs:string",
                x,
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
        function f({ currentContext: e }) {
          for (const [t, n] of e.resultDocuments)
            if (n === e.outputDocument) return t;
          return "#default";
        }
        function d({ currentContext: e }, t, n) {
          const {
            keys: r,
            contextItem: o,
            variableScopes: a,
            patternMatchCache: s,
          } = e;
          if (!r.has(t)) throw new Error("XTDE1260");
          return r.get(t).lookup(s, o.ownerDocument, a, n) || [];
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
        function h({ currentContext: e }, t) {
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
          for (const e of o) a = URL.parse(e, a) || e;
          return a;
        }
        function v(e, t, n) {
          if (null == t) return "";
          const r = n.toUpperCase().replace("-", "");
          if (!["NFC", "NFD", "NFKC", "NFKD"].includes(r))
            throw new Error("FOCH0003: Normalization form not supported.");
          return t.normalize(r);
        }
        function x({ currentContext: e }, t, n, r) {
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
        const N = [
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
        function y({ prefix: e, localName: t }, n) {
          return (e && "fn" !== e) || !N.includes(t)
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
                f = n.zeroDigit.codePointAt(0);
              return (
                48 !== f && ((u = m(u, f)), (l = m(l, f))),
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
            f = 0,
            d = 0,
            g = -1;
          for (; s < e.length && e[s] !== o; ) {
            const t = e[s];
            if (t === n) (f++, d++);
            else if (t === r) d++;
            else {
              if (t !== a) break;
              g = d;
            }
            s++;
          }
          g >= 0 && (m = d - g);
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
          const x = l();
          if (s < e.length)
            throw new Error(
              `XTDE1310: Active characters after picture string suffix: ${e.slice(s)}`,
            );
          return {
            prefix: p,
            suffix: x,
            integerMinDigits: Math.max(f, 1),
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
            t.NamespaceFeature =
            t.AttributeFeature =
            t.KeyImpl =
              void 0),
          (t.visitNodes = g),
          (t.mergeTemplateGenerators = S),
          (t.processNode = w),
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
          (t.sort = $),
          (t.applyTemplates = M),
          (t.callTemplate = function (e, t) {
            for (let n of e.templates)
              if (void 0 !== n.name && t.name === n.name)
                return C(n, e, t.params);
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
                  K(
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
          (t.copyOf = function (e, t, n) {
            let r = (0, i.evaluateXPath)(
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
            for (let t of r) e.append(t);
          }),
          (t.valueOf = _),
          (t.message = function (e, t, n) {
            const r = V(e, t.select || n, (0, p.mkResolver)(t.namespaces));
            if ("yes" === t.terminate) throw new Error(r);
            console.log(r);
          }),
          (t.text = function (e, t, n) {
            e.append(V(e, n, (0, p.mkResolver)(t.namespaces), [""]));
          }),
          (t.variable = function (e, t) {
            j(e.variableScopes, t.name, Y(e, t));
          }),
          (t.param = function (e, t) {
            j(e.variableScopes, t.name, e.stylesheetParams[t.name] || Y(e, t));
          }),
          (t.extendScope = D),
          (t.wrapValue = U),
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
          (t.buildNode = F),
          (t.buildAttributeNode = k),
          (t.literalElement = function (e, t, n) {
            let r = F(e, { name: t.name, namespace: t.namespace });
            const o = (0, p.mkResolver)(t.namespaces);
            for (let n of t.attributes) {
              const t = B(e, n.value, o),
                a = k(e, { name: n.name, namespace: n.namespace, value: t });
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
              o = B(e, t.name, r),
              [a, s] = (0, p.determineNamespace)(o, r, B(e, t.namespace, r)),
              i = k(e, {
                name: o,
                namespace: a,
                value: V(e, t.select || n, r, t.separator),
              });
            e.append(i);
          }),
          (t.processingInstruction = function (e, t, n) {
            const r = B(e, t.name, (0, p.mkResolver)(t.namespaces)),
              o = V(e, t.select || n, (0, p.mkResolver)(t.namespaces), [
                "",
              ]).trimStart();
            e.append(e.outputDocument.createProcessingInstruction(r, o));
          }),
          (t.comment = function (e, t, n) {
            const r = V(e, t.select || n, (0, p.mkResolver)(t.namespaces), [
              "",
            ]);
            e.append(e.outputDocument.createComment(r));
          }),
          (t.namespace = function (e, t, n) {
            const r = (0, p.mkResolver)(t.namespaces),
              o = B(e, t.name, r),
              a = V(e, t.select || n, r, [""]),
              s = k(e, {
                name: `xmlns:${o}`,
                namespace: l.XMLNS_NSURI,
                value: a,
              });
            e.append(s);
          }),
          (t.element = function (e, t, n) {
            const r = (0, p.mkResolver)(t.namespaces);
            let o = B(e, t.name, r),
              a = B(e, t.namespace, r),
              s = F(e, {
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
              const o = $(e, r, t.sortKeyComponents, n);
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
              ((o = $(e, o, t.sortKeyComponents, r)),
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
                            ? (z(a, c, s), (s = l), (c = [t]))
                            : c.push(t);
                        }),
                        z(a, c, s),
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
                              T(
                                e.patternMatchCache,
                                n,
                                t,
                                e.variableScopes,
                                r,
                              ) && (z(o, a), (a = [])));
                          }),
                          z(o, a),
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
                            (T(
                              e.patternMatchCache,
                              n,
                              t,
                              e.variableScopes,
                              r,
                            ) && (z(o, a), (a = [])),
                              a.push(t));
                          }),
                          z(o, a),
                          o
                        );
                      })(e, a, t.groupStartingWith, r)),
                (o = $(e, o, t.sortKeyComponents, r)),
                I(o, e, n));
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
          (t.mkNodeAppender = G),
          (t.mkArrayAppender = J),
          (t.resultDocument = function (e, t, n) {
            const r = (0, p.mkResolver)(t.namespaces);
            function o(t) {
              return B(e, t, r);
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
                    append: G(t),
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
                (e.append = G(t))),
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
                      if (T(n, r.match, e, [], t)) return !r.preserve;
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
          (t.evaluateAttributeValueTemplate = B),
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
          }));
        const i = n(594),
          c = s(n(898)),
          u = n(379),
          l = n(712),
          p = n(777),
          m = n(845),
          f = n(324),
          d = n(320);
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
        function v(e, t, n, r) {
          e.has(t) || e.set(t, new Map());
          const o = e.get(t);
          return (o.has(n) || o.set(n, r()), o.get(n));
        }
        (Object.defineProperty(t, "AttributeFeature", {
          enumerable: !0,
          get: function () {
            return d.AttributeFeature;
          },
        }),
          Object.defineProperty(t, "NamespaceFeature", {
            enumerable: !0,
            get: function () {
              return d.NamespaceFeature;
            },
          }),
          Object.defineProperty(t, "NodeNameFeature", {
            enumerable: !0,
            get: function () {
              return d.NodeNameFeature;
            },
          }),
          Object.defineProperty(t, "NodeTextFeature", {
            enumerable: !0,
            get: function () {
              return d.NodeTextFeature;
            },
          }),
          Object.defineProperty(t, "NodeTypeFeature", {
            enumerable: !0,
            get: function () {
              return d.NodeTypeFeature;
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
                    T(
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
        const x = new RegExp(/^[a-z |-]+$/),
          N = new RegExp(/^@[a-z]+$/),
          y = new RegExp(/text\(\)|node\(\)/),
          b = new RegExp(/@|attribute|node/);
        function T(e, t, n, r, o) {
          return !(
            !n ||
            (function (e, t) {
              return (
                (t.nodeType === l.NodeType.ATTRIBUTE && !b.exec(e)) ||
                (t.nodeType === l.NodeType.TEXT && !y.exec(e)) ||
                !(!x.exec(e) || t.nodeType === l.NodeType.ELEMENT) ||
                !(!N.exec(e) || t.nodeType === l.NodeType.ATTRIBUTE)
              );
            })(t.xpath, n) ||
            (!(function (e, t) {
              return "text()|@*" === e
                ? t.nodeType === l.NodeType.TEXT ||
                    t.nodeType === l.NodeType.ATTRIBUTE
                : "processing-instruction()|comment()" === e
                  ? t.nodeType === l.NodeType.PROCESSING_INSTRUCTION ||
                    t.nodeType === l.NodeType.COMMENT
                  : "*|/" === e
                    ? t.nodeType === l.NodeType.ELEMENT ||
                      t.nodeType === l.NodeType.DOCUMENT
                    : "text()" === e
                      ? t.nodeType === l.NodeType.TEXT
                      : "/" === e && t.nodeType === l.NodeType.DOCUMENT;
            })(t.xpath, n) &&
              void 0 ===
                (function (e, t, n, r, o) {
                  let a = n;
                  for (; a; ) {
                    const s = v(e, t.xpath, a, () =>
                      t.compiled
                        ? (0, i.executeJavaScriptCompiledXPath)(t.compiled, a)
                        : (0, i.evaluateXPathToNodes)(
                            t.xpath,
                            a,
                            void 0,
                            L(r),
                            {
                              namespaceResolver: o,
                              functionNameResolver: u.functionNameResolver,
                            },
                          ),
                    );
                    if (-1 !== s.indexOf(n)) return s;
                    a =
                      a.parentNode ||
                      (a.nodeType === l.NodeType.ATTRIBUTE && a.ownerElement);
                  }
                })(e, t, n, r, o))
          );
        }
        function* S(e, t) {
          let n = [e.next(), t.next()];
          for (; !n[0].done || !n[1].done; )
            n[0].done
              ? (yield n[1].value, (n[1] = t.next()))
              : n[1].done || (0, p.compareSortable)(n[0].value, n[1].value) < 0
                ? (yield n[0].value, (n[0] = e.next()))
                : (yield n[1].value, (n[1] = t.next()));
        }
        function w(e, t, n) {
          let r = (function* (e, t, n) {
              if ("#default" === n)
                for (let n of (0, p.sortSortable)(
                  (0, f.findMatchingRules)(t, e),
                ))
                  yield n;
            })(e.contextItem, e.ruleTree, e.mode),
            o = (function* (e, t, n, r, o, a) {
              for (let s of n)
                s.match &&
                  ("#all" === s.modes[0] || s.modes.includes(o)) &&
                  T(e, s.match, t, r, (0, p.mkResolver)(a)) &&
                  (yield s);
            })(
              e.patternMatchCache,
              e.contextItem,
              e.templates.concat(
                (function (e) {
                  return [
                    {
                      match: { xpath: "processing-instruction()|comment()" },
                      apply: (e) => {},
                      allowedParams: [],
                      modes: ["#all"],
                      importPrecedence: Number.MAX_VALUE,
                      declarationOrder: Number.MIN_VALUE,
                    },
                    {
                      match: { xpath: "text()|@*" },
                      apply: (t) => {
                        _(t, { select: ".", namespaces: e }, () => {});
                      },
                      allowedParams: [],
                      modes: ["#all"],
                      importPrecedence: Number.MAX_VALUE,
                      declarationOrder: Number.MIN_VALUE,
                    },
                    {
                      match: { xpath: "*|/" },
                      apply: (t) => {
                        M(t, {
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
                      declarationOrder: Number.MIN_VALUE,
                    },
                  ];
                })(n),
              ),
              e.variableScopes,
              e.mode,
              n,
            ),
            a = S(r, o);
          const s = a.next();
          s.done ||
            C(
              s.value,
              Object.assign(Object.assign({}, e), { nextMatches: a }),
              t,
            );
        }
        function R(e, t, n, r) {
          let o;
          return (
            (o =
              "number" === n.dataType
                ? (function (e, t, n, r) {
                    const o = E(t, e, (e) => {
                      let t;
                      const o = V(e, n.sortKey, r);
                      return (
                        (t = Number(o)),
                        isNaN(t) && (t = Number.MIN_SAFE_INTEGER),
                        t
                      );
                    });
                    return (0, p.zip)(o, t)
                      .sort((e, t) => e[0] - t[0])
                      .map((e) => e[1]);
                  })(e, t, n, r)
                : (function (e, t, n, r) {
                    const o = E(t, e, (e) => V(e, n.sortKey, r)),
                      a = n.lang && B(e, n.lang, r);
                    let s = new Intl.Collator(a).compare;
                    return (0, p.zip)(o, t)
                      .sort((e, t) => s(e[0], t[0]))
                      .map((e) => e[1]);
                  })(e, t, n, r)),
            "descending" === B(e, n.order, r) && o.reverse(),
            o
          );
        }
        function E(e, t, n) {
          if (e.length > 0)
            return (0, l.isNodeGroupArray)(e) ? I(e, t, n) : O(e, t, n);
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
        function I(e, t, n) {
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
        function $(e, t, n, r) {
          if (n) for (let o of [...n].reverse()) t = R(e, t, o, r);
          return t;
        }
        function P(e, t) {
          for (let n of t) if (n.name === e) return n;
        }
        function C(e, t, n) {
          let r = D(t.variableScopes);
          for (let o of e.allowedParams) {
            let e = P(o.name, n);
            void 0 !== e ? j(r, e.name, Y(t, e)) : j(r, o.name, Y(t, o));
          }
          return e.apply(
            Object.assign(Object.assign({}, t), { variableScopes: r }),
          );
        }
        function M(e, t) {
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
            O($(e, r, t.sortKeyComponents, n), e, (e) => {
              w(
                Object.assign(Object.assign({}, e), {
                  mode: o,
                  variableScopes: D(e.variableScopes),
                }),
                t.params,
                t.namespaces,
              );
            }));
        }
        function _(e, t, n) {
          e.append(
            V(e, t.select || n, (0, p.mkResolver)(t.namespaces), t.separator),
          );
        }
        function D(e) {
          return e.concat([new Map()]);
        }
        let X = new Map();
        function A(e) {
          return (
            X.has(e) || X.set(e, (0, i.createTypedValueFactory)(e)),
            X.get(e)
          );
        }
        function U(e, t) {
          if (Array.isArray(e) && 0 === e.length) return A("item()*")([], null);
          if (t)
            try {
              return A(t)(e, null);
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
            A(`${o}${a}`)(e, null)
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
        function k(e, t) {
          let n;
          return (
            (n = t.namespace
              ? e.outputDocument.createAttributeNS(t.namespace, t.name)
              : e.outputDocument.createAttribute(t.name)),
            (n.value = t.value),
            n
          );
        }
        function z(e, t, n) {
          t.length > 0 &&
            (null === n && (n = `group-${e.length + 1}`),
            e.push({ key: n, nodes: t }));
        }
        function G(e) {
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
                return (r = r.documentElement) ? (n(r), G(r)) : G(e);
              }
              if (r.nodeType === l.NodeType.DOCUMENT_FRAGMENT) n(r.childNodes);
              else if (r.nodeType === l.NodeType.TEXT) n(r.data);
              else {
                if (r.nodeType) {
                  let n = t.importNode(r, !0);
                  return (e.append(n), G(n));
                }
                n(`${r}`);
              }
            }
          };
        }
        function J(e) {
          return function (t) {
            if (
              (e.push(t),
              t.nodeType &&
                (t.nodeType === l.NodeType.DOCUMENT ||
                  t.nodeType === l.NodeType.ELEMENT))
            )
              return G(t);
          };
        }
        function B(e, t, n) {
          if (t)
            return t
              .map((t) =>
                "string" == typeof t
                  ? t
                  : (0, i.evaluateXPathToString)(
                      t.xpath,
                      e.contextItem,
                      void 0,
                      L(e.variableScopes),
                      {
                        currentContext: e,
                        namespaceResolver: n,
                        functionNameResolver: u.functionNameResolver,
                      },
                    ),
              )
              .join("");
        }
        function V(e, t, n, r) {
          r || (r = "string" == typeof t ? [" "] : []);
          const o = B(e, r, n);
          return "string" == typeof t
            ? (0, i.evaluateXPath)(
                t,
                e.contextItem,
                void 0,
                L(e.variableScopes),
                i.evaluateXPath.STRINGS_TYPE,
                {
                  currentContext: e,
                  namespaceResolver: n,
                  functionNameResolver: u.functionNameResolver,
                },
              ).join(o)
            : (function (e) {
                let t = [];
                return (
                  g(e, (e) => {
                    e.nodeType === l.NodeType.TEXT &&
                      "" !== e.data &&
                      (t = t.concat(e.data));
                  }),
                  t
                );
              })(K(e, t)).join(o);
        }
        function Y(e, t) {
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
            return (1 !== r.length || n || (r = r[0]), U(r, t.as));
          }
          return null == t.content
            ? ""
            : t.as
              ? U(
                  (function (e, t) {
                    let n = [];
                    return (
                      t(
                        Object.assign(Object.assign({}, e), {
                          append: J(n),
                          mode: "#default",
                          variableScopes: D(e.variableScopes),
                        }),
                      ),
                      1 === n.length ? n[0] : n
                    );
                  })(e, t.content),
                  t.as,
                )
              : K(e, t.content);
        }
        function K(e, t) {
          return (function (e, t) {
            const n = e.outputDocument.createDocumentFragment();
            if (
              (t(G(n)), 1 === n.childNodes.length && 1 === n.childElementCount)
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
    })(334);
  module.exports = n.transform;
})();
