(() => {
  var e = {
      379: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.registerFunctions = function () {
            (0, o.registerCustomXPathFunction)(
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
                p,
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
                u,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XPATH_NSURI, localName: "key" },
                ["xs:string", "item()*"],
                "node()*",
                l,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XPATH_NSURI, localName: "system-property" },
                ["xs:string"],
                "xs:string",
                m,
              );
          });
        const o = n(594),
          a = n(821),
          r = n(472);
        function s({ currentContext: e }) {
          return e.contextItem;
        }
        function c({ currentContext: e }, t) {
          return (0, r.urlToDom)(e, t);
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
            contextItem: a,
            variableScopes: r,
            patternMatchCache: s,
          } = e;
          if (!o.has(t)) throw new Error("XTDE1260");
          return o.get(t).lookup(s, a.ownerDocument, r, n) || [];
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
      777: (e, t) => {
        "use strict";
        function n(e) {
          return "yes" === e;
        }
        function o(e) {
          return "omit" === e ? void 0 : "yes" === e;
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.parseYesNo = n),
          (t.parseYesNoOmit = o),
          (t.mkOutputDefinition = function (e) {
            return {
              omitXmlDeclaration: n(e.omitXmlDeclaration),
              standalone: o(e.standalone),
              doctypeSystem: e.doctypeSystem,
              doctypePublic: e.doctypePublic,
            };
          });
      },
      472: function (e, t, n) {
        "use strict";
        var o =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, n, o) {
                  void 0 === o && (o = n);
                  var a = Object.getOwnPropertyDescriptor(t, n);
                  (a &&
                    !("get" in a
                      ? !t.__esModule
                      : a.writable || a.configurable)) ||
                    (a = {
                      enumerable: !0,
                      get: function () {
                        return t[n];
                      },
                    }),
                    Object.defineProperty(e, o, a);
                }
              : function (e, t, n, o) {
                  void 0 === o && (o = n), (e[o] = t[n]);
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
          r =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var n in e)
                  "default" !== n &&
                    Object.prototype.hasOwnProperty.call(e, n) &&
                    o(t, e, n);
              return a(t, e), t;
            };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.urlToDom = function (e, t) {
            const n = e.inputURL ? (0, s.resolve)(e.inputURL.toString(), t) : t;
            return n.startsWith("file:")
              ? i.parseXmlDocument(
                  (0, c.readFileSync)(
                    (0, s.fileURLToPath)(new URL(n)),
                  ).toString(),
                )
              : void 0;
          });
        const s = n(16),
          c = n(896),
          i = r(n(898));
      },
      821: function (e, t, n) {
        "use strict";
        var o =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, n, o) {
                  void 0 === o && (o = n);
                  var a = Object.getOwnPropertyDescriptor(t, n);
                  (a &&
                    !("get" in a
                      ? !t.__esModule
                      : a.writable || a.configurable)) ||
                    (a = {
                      enumerable: !0,
                      get: function () {
                        return t[n];
                      },
                    }),
                    Object.defineProperty(e, o, a);
                }
              : function (e, t, n, o) {
                  void 0 === o && (o = n), (e[o] = t[n]);
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
          r =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var n in e)
                  "default" !== n &&
                    Object.prototype.hasOwnProperty.call(e, n) &&
                    o(t, e, n);
              return a(t, e), t;
            };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.Key = t.XPATH_NSURI = t.XMLNS_NSURI = t.XSLT1_NSURI = void 0),
          (t.visitNodes = h),
          (t.mkResolver = v),
          (t.computeDefaultPriority = D),
          (t.sortSortable = function (e) {
            e.reverse(),
              e.sort(
                (e, t) =>
                  (t.priority || D(t.match)) - (e.priority || D(e.match)),
              ),
              e.sort((e, t) => e.importPrecedence - t.importPrecedence);
          }),
          (t.processNode = O),
          (t.nextMatch = function (e, t) {
            const n = e.nextMatches;
            if (n) {
              const o = n.next();
              o.done ||
                _(
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
                _(
                  o.value,
                  Object.assign(Object.assign({}, e), { nextMatches: n }),
                  t.params,
                );
            }
          }),
          (t.sortNodes = j),
          (t.applyTemplates = I),
          (t.callTemplate = function (e, t) {
            for (let n of e.templates)
              if (void 0 !== n.name && t.name === n.name)
                return _(n, e, t.params);
            throw new Error(`Cannot find a template named ${t.name}`);
          }),
          (t.functionX = function (e, t, n) {
            const o = t.params.map((e) => "item()"),
              a = t.params.map((e) => e.name);
            (0, s.registerCustomXPathFunction)(
              { namespaceURI: t.namespace, localName: t.name },
              o,
              t.as || "item()",
              ({ currentContext: e }, ...t) => {
                let o = new Map();
                return (
                  a.forEach((e, n) => o.set(e, t[n])),
                  q(
                    Object.assign(Object.assign({}, e), {
                      variableScopes: [o].concat(e.variableScopes),
                    }),
                    n,
                  )
                );
              },
            );
          }),
          (t.copy = function (e, n, o) {
            const a = e.contextItem;
            let r, s;
            if (a.nodeType === p) {
              r = e.outputDocument.createElementNS(
                a.namespaceURI,
                a.prefix ? `${a.prefix}:${a.localName}` : a.localName,
              );
              for (let n of a.attributes)
                if (n.namespaceURI === t.XMLNS_NSURI) {
                  const o = n.localName;
                  r.setAttributeNode(
                    e.outputDocument.importNode(
                      a.getAttributeNodeNS(t.XMLNS_NSURI, o),
                    ),
                  );
                }
            } else
              r = a.nodeType === g ? void 0 : e.outputDocument.importNode(a);
            r && (s = e.append(r)),
              o &&
                o(
                  Object.assign(Object.assign({}, e), {
                    append: s || e.append,
                  }),
                );
          }),
          (t.copyOf = function (e, t, n) {
            let o = (0, s.evaluateXPath)(
              t.select,
              e.contextItem,
              void 0,
              F(e.variableScopes),
              s.evaluateXPath.ALL_RESULTS_TYPE,
              { currentContext: e, namespaceResolver: v(t.namespaces) },
            );
            for (let t of o) e.append(t);
          }),
          (t.valueOf = C),
          (t.message = function (e, t, n) {
            console.log(z(e, t.select || n, v(t.namespaces))),
              "yes" === t.terminate && process.exit();
          }),
          (t.text = function (e, t, n) {
            e.append(z(e, n, v(t.namespaces), [""]));
          }),
          (t.variable = function (e, t) {
            k(e.variableScopes, t.name, B(e, t));
          }),
          (t.param = function (e, t) {
            k(e.variableScopes, t.name, e.stylesheetParams[t.name] || B(e, t));
          }),
          (t.extendScope = M),
          (t.setVariable = k),
          (t.mergeVariableScopes = F),
          (t.literalText = function (e, t) {
            e.append(t);
          }),
          (t.sequence = function (e, t) {
            const n = (0, s.evaluateXPath)(
              t.select,
              e.contextItem,
              void 0,
              F(e.variableScopes),
              s.evaluateXPath.ALL_RESULTS_TYPE,
              { currentContext: e, namespaceResolver: v(t.namespaces) },
            );
            e.append(n);
          }),
          (t.buildNode = K),
          (t.buildAttributeNode = H),
          (t.literalElement = function (e, t, n) {
            let o = K(e, { name: t.name, namespace: t.namespace });
            const a = v(t.namespaces);
            for (let n of t.attributes) {
              const t = G(e, n.value, a),
                r = H(e, { name: n.name, namespace: n.namespace, value: t });
              o.setAttributeNode(r);
            }
            const r = e.append(o);
            n(
              Object.assign(Object.assign({}, e), {
                variableScopes: M(e.variableScopes),
                append: r || e.append,
              }),
            );
          }),
          (t.attribute = function (e, t, n) {
            const o = v(t.namespaces),
              a = G(e, t.name, o),
              r = H(e, {
                name: a,
                namespace: J(a, o, G(e, t.namespace, o)),
                value: z(e, t.select || n, o, t.separator),
              });
            e.append(r);
          }),
          (t.processingInstruction = function (e, t, n) {
            const o = G(e, t.name, v(t.namespaces)),
              a = z(e, t.select || n, v(t.namespaces), [""]).trimStart();
            e.append(e.outputDocument.createProcessingInstruction(o, a));
          }),
          (t.comment = function (e, t, n) {
            const o = z(e, t.select || n, v(t.namespaces), [""]);
            e.append(e.outputDocument.createComment(o));
          }),
          (t.namespace = function (e, n, o) {
            const a = v(n.namespaces),
              r = G(e, n.name, a),
              s = z(e, n.select || o, a, [""]),
              c = H(e, {
                name: `xmlns:${r}`,
                namespace: t.XMLNS_NSURI,
                value: s,
              });
            e.append(c);
          }),
          (t.element = function (e, t, n) {
            const o = v(t.namespaces),
              a = G(e, t.name, o),
              r = G(e, t.namespace, o);
            let s = K(e, { name: a, namespace: J(a, v(t.namespaces), r) });
            const c = e.append(s);
            n(
              Object.assign(Object.assign({}, e), {
                variableScopes: M(e.variableScopes),
                append: c || e.append,
              }),
            );
          }),
          (t.ifX = function (e, t, n) {
            (0, s.evaluateXPathToBoolean)(
              t.test,
              e.contextItem,
              void 0,
              F(e.variableScopes),
              { currentContext: e, namespaceResolver: v(t.namespaces) },
            ) && n(e);
          }),
          (t.choose = function (e, t) {
            for (let n of t) {
              if (!n.test) return n.apply(e);
              if (
                (0, s.evaluateXPathToBoolean)(
                  n.test,
                  e.contextItem,
                  void 0,
                  F(e.variableScopes),
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
              a = e.append(o);
            n(
              Object.assign(Object.assign({}, e), {
                outputDocument: o,
                append: a,
                mode: "#default",
                variableScopes: M(e.variableScopes),
              }),
            );
          }),
          (t.forEach = function (e, t, n) {
            const o = v(t.namespaces),
              a = (0, s.evaluateXPath)(
                t.select,
                e.contextItem,
                void 0,
                F(e.variableScopes),
                s.evaluateXPath.ALL_RESULTS_TYPE,
                { currentContext: e, namespaceResolver: o },
              );
            if (a && Symbol.iterator in Object(a))
              for (let r of j(e, a, t.sortKeyComponents, o))
                n(
                  Object.assign(Object.assign({}, e), {
                    contextItem: r,
                    variableScopes: M(e.variableScopes),
                  }),
                );
          }),
          (t.forEachGroup = function (e, t, n) {
            const o = v(t.namespaces),
              a = F(e.variableScopes),
              r = (0, s.evaluateXPathToNodes)(
                t.select,
                e.contextItem,
                void 0,
                a,
                { currentContext: e, namespaceResolver: o },
              );
            if (r && Symbol.iterator in Object(r)) {
              let a = (function (e, t, n, o) {
                const a = F(e.variableScopes);
                let r = new Map();
                for (let c of t) {
                  const t = (0, s.evaluateXPathToString)(n, c, void 0, a, {
                    currentContext: e,
                    namespaceResolver: o,
                  });
                  r.has(t) || r.set(t, []), r.set(t, r.get(t).concat(c));
                }
                return r;
              })(e, r, t.groupBy, o);
              for (let [t, o] of a)
                n(
                  Object.assign(Object.assign({}, e), {
                    contextItem: o[0],
                    currentGroupingKey: t,
                    currentGroup: o,
                    variableScopes: M(e.variableScopes),
                  }),
                );
            }
          }),
          (t.mkNodeAppender = V),
          (t.mkArrayAppender = Y),
          (t.resultDocument = function (e, t, n) {
            const o = v(t.namespaces);
            function a(t) {
              return G(e, t, o);
            }
            const r = a(t.format);
            let s = (0, u.mkOutputDefinition)({
              omitXmlDeclaration: a(t.omitXmlDeclaration),
              doctypePublic: a(t.doctypePublic),
              doctypeSystem: a(t.doctypeSystem),
              standalone: a(t.standalone),
            });
            Object.keys(s).forEach((e) => {
              s[e] || delete s[e];
            });
            const c = Object.assign(
                Object.assign({}, r ? e.outputDefinitions.get(r) : {}),
                s,
              ),
              i = a(t.href);
            let p = null;
            if (
              ((c.doctypePublic || c.doctypeSystem) &&
                (p = e.outputDocument.implementation.createDocumentType(
                  "out",
                  c.doctypePublic || "",
                  c.doctypeSystem || "",
                )),
              i)
            ) {
              const t = e.outputDocument.implementation.createDocument(
                null,
                null,
                p,
              );
              if (e.resultDocuments.has(i))
                throw new Error(`XTDE1490: ${i} is a duplicate`);
              e.resultDocuments.set(
                i,
                Object.assign(Object.assign({}, c), { document: t }),
              ),
                n(
                  Object.assign(Object.assign({}, e), {
                    outputDocument: t,
                    append: V(t),
                  }),
                );
            } else {
              if (e.outputDocument.documentElement) throw new Error("XTDE1490");
              let t = e.outputDocument;
              p &&
                ((t = e.outputDocument.implementation.createDocument(
                  null,
                  null,
                  p,
                )),
                (e.outputDocument = t),
                (e.append = V(t))),
                e.resultDocuments.set(
                  "#default",
                  Object.assign(Object.assign({}, c), { document: t }),
                ),
                n(e);
            }
          }),
          (t.stripSpace = function (e, t) {
            const n = RegExp("^[ \n\r\t]+$");
            let o = [];
            !(function e(a) {
              if (a.nodeType === m)
                n.test(a.textContent) &&
                  (function (e, t) {
                    let n = new Map();
                    for (const o of t) {
                      const t = v(o.namespaces);
                      if (P(n, o.match, null, e, [], t)) return !o.preserve;
                    }
                    return !1;
                  })(a.parentNode, t) &&
                  o.push(a);
              else if (a.hasChildNodes && a.hasChildNodes())
                for (let t of a.childNodes) e(t);
            })(e);
            for (let e of o) e.remove();
            return e;
          }),
          (t.evaluateAttributeValueTemplate = G),
          (t.determineNamespace = J),
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
          });
        const s = n(594),
          c = r(n(898)),
          i = n(379),
          u = n(777);
        (t.XSLT1_NSURI = "http://www.w3.org/1999/XSL/Transform"),
          (t.XMLNS_NSURI = "http://www.w3.org/2000/xmlns/"),
          (t.XPATH_NSURI = "http://www.w3.org/2005/xpath-functions");
        const p = 1,
          l = 2,
          m = 3,
          d = 7,
          f = 8,
          g = 9;
        function h(e, t) {
          for (let n of e.childNodes) h(n, t);
          t(e);
        }
        function b(e) {
          return Array.isArray(e)
            ? e.map((e) => b(e)).join("")
            : e.nodeType
              ? e.textContent
              : e.toString();
        }
        function v(e) {
          return (t) => e[t];
        }
        t.Key = class {
          constructor(e, t, n) {
            (this.match = e),
              (this.use = t),
              (this.namespaces = n),
              (this.cache = new Map());
          }
          buildDocumentCache(e, t, n) {
            let o = new Map();
            return (
              h(t, (t) => {
                if (
                  "string" == typeof this.use &&
                  P(e, this.match, void 0, t, n, v(this.namespaces))
                ) {
                  let e = (0, s.evaluateXPathToString)(this.use, t);
                  o.has(e) || o.set(e, []), o.set(e, o.get(e).concat(t));
                }
              }),
              o
            );
          }
          lookup(e, t, n, o) {
            return (
              this.cache.has(t) ||
                this.cache.set(t, this.buildDocumentCache(e, t, n)),
              this.cache.get(t).get(b(o))
            );
          }
        };
        const y = new RegExp(/^[a-z |-]+$/),
          S = new RegExp(/^@[a-z]+$/),
          x = new RegExp(/text\(\)|node\(\)/),
          w = new RegExp(/@|attribute|node/);
        function P(e, t, n, o, a, r) {
          let c = o;
          if (
            o &&
            !(function (e, t) {
              return (
                (t.nodeType === l && !w.exec(e)) ||
                (t.nodeType === m && !x.exec(e)) ||
                !(!y.exec(e) || t.nodeType === p) ||
                !(!S.exec(e) || t.nodeType === l)
              );
            })(t, o)
          ) {
            if (
              (function (e, t) {
                return "text()|@*" === e
                  ? t.nodeType === m || t.nodeType === l
                  : "processing-instruction()|comment()" === e
                    ? t.nodeType === d || t.nodeType === f
                    : "*|/" === e
                      ? t.nodeType === p || t.nodeType === g
                      : "text()" === e
                        ? t.nodeType === m
                        : "/" === e && t.nodeType === g;
              })(t, o)
            )
              return !0;
            for (; c; ) {
              const p = (0, s.evaluateXPathToString)("generate-id(.)", c);
              if (
                ((u = `${t}-${p}`),
                (h = () =>
                  n
                    ? new Set((0, s.executeJavaScriptCompiledXPath)(n, c))
                    : new Set(
                        (0, s.evaluateXPathToNodes)(t, c, void 0, F(a), {
                          namespaceResolver: r,
                        }),
                      )),
                (i = e).has(u) || i.set(u, h()),
                i.get(u)).has(o)
              )
                return !0;
              c = c.parentNode || (c.nodeType === l && c.ownerElement);
            }
          }
          var i, u, h;
          return !1;
        }
        const T = String.raw`[^,:\(\)\*\[\]/]`,
          N = String.raw`(child::|attribute::|@)?`,
          R = String.raw`(document-node\()?`,
          $ = new Map([
            [new RegExp(String.raw`^\s*/\s*$`), -0.5],
            [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${R}${N}processing-instruction`), 0],
            [new RegExp(String.raw`^\s*${R}${N}element\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${R}${N}attribute\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${R}${N}element\(${T}+\)\)?\s*$`), 0],
            [
              new RegExp(String.raw`^\s*${R}${N}element\(\*,\s*${T}+\)\)?\s*$`),
              0,
            ],
            [new RegExp(String.raw`^\s*${R}${N}attribute\(${T}+\)\)?\s*$`), 0],
            [
              new RegExp(
                String.raw`^\s*${R}${N}attribute\(\*,\s*${T}+\)\)?\s*$`,
              ),
              0,
            ],
            [
              new RegExp(
                String.raw`^\s*${R}${N}element\(${T}+,\s*${T}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${R}${N}attribute\(${T}+,\s*${T}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${R}${N}schema-element\(${T}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${R}${N}schema-attribute\(${T}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [new RegExp(String.raw`^\s*document-node\(\)\s*$`), -0.5],
            [
              new RegExp(
                String.raw`^\s*${N}(node\(\)|text\(\)|comment\(\))\s*$`,
              ),
              -0.5,
            ],
            [new RegExp(String.raw`^\s*${N}(${T}:)?\*\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${N}\*:${T}+\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${N}${T}+\s*$`), 0],
          ]);
        function D(e) {
          if (e && e.includes("|"))
            return Math.max(
              ...e
                .split("|")
                .filter((e) => "" !== e)
                .map((e) => D(e)),
            );
          for (let [t, n] of $) if (t.test(e)) return n;
          return 0.5;
        }
        function O(e, t, n) {
          let o = (function* (e, t, n, o, a, r) {
            for (let s of n)
              s.match &&
                ("#all" === s.modes[0] || s.modes.includes(a)) &&
                P(e, s.match, s.matchFunction, t, o, v(r)) &&
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
                      C(t, { select: ".", namespaces: e }, () => {});
                    },
                    allowedParams: [],
                    modes: ["#all"],
                    importPrecedence: Number.MAX_VALUE,
                  },
                  {
                    match: "*|/",
                    apply: (t) => {
                      I(t, {
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
          const a = o.next();
          a.done ||
            _(
              a.value,
              Object.assign(Object.assign({}, e), { nextMatches: o }),
              t,
            );
        }
        function X(e, t, n, o) {
          let a;
          return (
            (a =
              "number" === n.dataType && "string" == typeof n.sortKey
                ? (function (e, t, n, o) {
                    let a = [];
                    for (let r of t) {
                      let t = (0, s.evaluateXPathToNumber)(
                        `number(${n.sortKey})`,
                        r,
                        void 0,
                        F(e.variableScopes),
                        { currentContext: e, namespaceResolver: o },
                      );
                      isNaN(t) && (t = Number.MIN_SAFE_INTEGER),
                        a.push({ key: t, item: r });
                    }
                    return (
                      a.sort((e, t) => e.key - t.key),
                      a.sort((e, t) => e.key - t.key).map((e) => e.item)
                    );
                  })(e, t, n, o)
                : (function (e, t, n, o) {
                    let a = [];
                    for (let r of t) {
                      const t = Object.assign(Object.assign({}, e), {
                        contextItem: r,
                      });
                      a.push({ key: z(t, n.sortKey, o), item: r });
                    }
                    const r = n.lang && G(e, n.lang, o);
                    let s = new Intl.Collator(r).compare;
                    return a.sort((e, t) => s(e.key, t.key)).map((e) => e.item);
                  })(e, t, n, o)),
            "descending" === G(e, n.order, o) && a.reverse(),
            a
          );
        }
        function j(e, t, n, o) {
          if (n) for (let a of [...n].reverse()) t = X(e, t, a, o);
          return t;
        }
        function E(e, t) {
          for (let n of t) if (n.name === e) return n;
        }
        function _(e, t, n) {
          let o = M(t.variableScopes);
          for (let a of e.allowedParams) {
            let e = E(a.name, n);
            void 0 !== e ? k(o, e.name, B(t, e)) : k(o, a.name, B(t, a));
          }
          return e.apply(
            Object.assign(Object.assign({}, t), { variableScopes: o }),
          );
        }
        function I(e, t) {
          const n = v(t.namespaces),
            o = (0, s.evaluateXPathToNodes)(
              t.select,
              e.contextItem,
              void 0,
              F(e.variableScopes),
              { currentContext: e, namespaceResolver: n },
            );
          let a = t.mode || "#default";
          "#current" === a && (a = e.mode);
          for (let r of j(e, o, t.sortKeyComponents, n))
            O(
              Object.assign(Object.assign({}, e), {
                mode: a,
                contextItem: r,
                variableScopes: M(e.variableScopes),
              }),
              t.params,
              t.namespaces,
            );
        }
        function C(e, t, n) {
          e.append(z(e, t.select || n, v(t.namespaces), t.separator));
        }
        function M(e) {
          return e.concat([new Map()]);
        }
        const A = (0, s.createTypedValueFactory)("xs:numeric*"),
          U = (0, s.createTypedValueFactory)("xs:string*"),
          L = (0, s.createTypedValueFactory)("item()*");
        function k(e, t, n) {
          var o;
          e[e.length - 1].set(
            t,
            ((o = n),
            Array.isArray(o)
              ? "string" == typeof o[0]
                ? U(o, null)
                : "number" == typeof o[0]
                  ? A(o, null)
                  : L(o, null)
              : o),
          );
        }
        function F(e) {
          let t = {};
          for (let n of e) for (let [e, o] of n) t[e] = o;
          return t;
        }
        function K(e, t) {
          let n;
          return (
            (n =
              void 0 !== t.namespace && null !== t.namespace
                ? e.outputDocument.createElementNS(t.namespace, t.name)
                : e.outputDocument.createElement(t.name)),
            n
          );
        }
        function H(e, t) {
          let n;
          return (
            (n = t.namespace
              ? e.outputDocument.createAttributeNS(t.namespace, t.name)
              : e.outputDocument.createAttribute(t.name)),
            (n.value = t.value),
            n
          );
        }
        function V(e) {
          const t = e.ownerDocument || e;
          return function n(o) {
            if (Array.isArray(o)) {
              let e = !0;
              const t = o.length > 0 && !o[0].nodeType;
              for (let a of o) e ? (e = !1) : t && n(" "), n(a);
            } else if ("string" == typeof o) {
              if (e.nodeType !== g)
                if (e.lastChild && e.lastChild.nodeType === m)
                  e.lastChild.appendData(o);
                else if ("" !== o) {
                  const n = t.createTextNode(o);
                  n && e.append(n);
                }
            } else if (o.nodeType === l) {
              let n = t.importNode(o, !0);
              e.setAttributeNode(n);
            } else {
              if (o.nodeType === g) {
                const e = o;
                return (o = o.documentElement)
                  ? ("xsl:document" === o.localName ? n(o.childNodes) : n(o),
                    V(o))
                  : V(e);
              }
              if (o.nodeType === m) n(o.data);
              else {
                if (o.nodeType) {
                  let n = t.importNode(o, !0);
                  return e.append(n), V(n);
                }
                n(`${o}`);
              }
            }
          };
        }
        function Y(e) {
          return function (t) {
            if (
              (e.push(t), t.nodeType && (t.nodeType === g || t.nodeType === p))
            )
              return V(t);
          };
        }
        function G(e, t, n) {
          if (t)
            return t
              .map((t) =>
                "string" == typeof t
                  ? t
                  : (0, s.evaluateXPathToString)(
                      t.xpath,
                      e.contextItem,
                      void 0,
                      F(e.variableScopes),
                      { currentContext: e, namespaceResolver: n },
                    ),
              )
              .join("");
        }
        function z(e, t, n, o) {
          o || (o = "string" == typeof t ? [" "] : []);
          const a = G(e, o, n);
          return "string" == typeof t
            ? (0, s.evaluateXPath)(
                t,
                e.contextItem,
                void 0,
                F(e.variableScopes),
                s.evaluateXPath.STRINGS_TYPE,
                { currentContext: e, namespaceResolver: n },
              ).join(a)
            : (function (e) {
                let t = [];
                return (
                  (function e(n) {
                    if (
                      (n.nodeType === m &&
                        "" !== n.data &&
                        (t = t.concat(n.data)),
                      n.childNodes)
                    )
                      for (let t of n.childNodes) e(t);
                  })(e),
                  t
                );
              })(q(e, t)).join(a);
        }
        function B(e, t) {
          return "string" == typeof t.content
            ? (0, s.evaluateXPath)(
                t.content,
                e.contextItem,
                void 0,
                F(e.variableScopes),
                s.evaluateXPath.ANY_TYPE,
                { currentContext: e, namespaceResolver: v(t.namespaces) },
              )
            : null == t.content
              ? ""
              : t.as
                ? (function (e, t) {
                    let n = [];
                    return (
                      t(
                        Object.assign(Object.assign({}, e), {
                          append: Y(n),
                          mode: "#default",
                          variableScopes: M(e.variableScopes),
                        }),
                      ),
                      1 === n.length ? n[0] : n
                    );
                  })(e, t.content)
                : q(e, t.content);
        }
        function q(e, t) {
          const n = e.outputDocument.implementation.createDocument(
            null,
            null,
            null,
          );
          return (
            n.appendChild(n.createElement("xsl:document")),
            t(
              Object.assign(Object.assign({}, e), {
                outputDocument: n,
                append: V(n.documentElement),
                mode: "#default",
                variableScopes: M(e.variableScopes),
              }),
            ),
            n
          );
        }
        function J(e, t, n) {
          let o = n;
          if (void 0 !== o) return o;
          let a = "";
          return e.includes(":") && (a = e.split(":")[0]), (o = t(a)), o;
        }
        (0, i.registerFunctions)();
      },
      995: (e, t, n) => {
        n(898), n(594);
        let o = n(821);
        function a(e, t) {
          t = o.setParamDefaults(e, t);
          let n = [],
            a = [],
            r = new Map();
          r.set("#default", { document: t.outputDocument });
          let s = new Map(),
            c = new Map(),
            i = {
              outputDocument: t.outputDocument,
              append: o.mkNodeAppender(t.outputNode),
              resultDocuments: r,
              contextItem: e,
              mode: t.initialMode,
              templates: n,
              variableScopes: [new Map()],
              inputURL: t.inputURL,
              keys: s,
              outputDefinitions: c,
              patternMatchCache: new Map(),
              stylesheetParams: t.stylesheetParams,
            };
          return (
            n.push({
              match: "/ | @* | node()",
              matchFunction: void 0,
              name: void 0,
              modes: ["#default"],
              allowedParams: [],
              apply: (e) => {
                o.copy(
                  e,
                  {
                    namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
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
            }),
            n.push({
              match: "comment() | processing-instruction()",
              matchFunction: void 0,
              name: void 0,
              modes: ["#default"],
              allowedParams: [],
              apply: (e) => {},
              namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
              priority: void 0,
              importPrecedence: 1,
            }),
            o.sortSortable(n),
            o.sortSortable(a),
            o.stripSpace(e, a),
            o.processNode(i, [], {
              xsl: "http://www.w3.org/1999/XSL/Transform",
            }),
            r
          );
        }
        (e.exports.transform = a), (global.transform = a);
      },
      594: (e) => {
        "use strict";
        e.exports = require("fontoxpath");
      },
      898: (e) => {
        "use strict";
        e.exports = require("slimdom");
      },
      896: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      16: (e) => {
        "use strict";
        e.exports = require("url");
      },
    },
    t = {},
    n = (function n(o) {
      var a = t[o];
      if (void 0 !== a) return a.exports;
      var r = (t[o] = { exports: {} });
      return e[o].call(r.exports, r, r.exports, n), r.exports;
    })(995);
  module.exports = n.transform;
})();
