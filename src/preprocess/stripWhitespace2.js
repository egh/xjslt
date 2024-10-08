(() => {
  var e = {
      379: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.registerFunctions = function () {
            (0, a.registerCustomXPathFunction)(
              { namespaceURI: o.XPATH_NSURI, localName: "current" },
              [],
              "item()",
              s,
            ),
              (0, a.registerCustomXPathFunction)(
                {
                  namespaceURI: o.XPATH_NSURI,
                  localName: "current-output-uri",
                },
                [],
                "xs:string",
                p,
              ),
              (0, a.registerCustomXPathFunction)(
                { namespaceURI: o.XPATH_NSURI, localName: "doc" },
                ["xs:string"],
                "document-node()",
                c,
              ),
              (0, a.registerCustomXPathFunction)(
                {
                  namespaceURI: o.XPATH_NSURI,
                  localName: "current-grouping-key",
                },
                [],
                "xs:string?",
                i,
              ),
              (0, a.registerCustomXPathFunction)(
                { namespaceURI: o.XPATH_NSURI, localName: "current-group" },
                [],
                "item()*",
                u,
              ),
              (0, a.registerCustomXPathFunction)(
                { namespaceURI: o.XPATH_NSURI, localName: "key" },
                ["xs:string", "item()*"],
                "node()*",
                l,
              ),
              (0, a.registerCustomXPathFunction)(
                { namespaceURI: o.XPATH_NSURI, localName: "system-property" },
                ["xs:string"],
                "xs:string",
                m,
              );
          });
        const a = n(594),
          o = n(821),
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
            keys: a,
            contextItem: o,
            variableScopes: r,
            patternMatchCache: s,
          } = e;
          if (!a.has(t)) throw new Error("XTDE1260");
          return a.get(t).lookup(s, o.ownerDocument, r, n) || [];
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
        function a(e) {
          return "omit" === e ? void 0 : "yes" === e;
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.parseYesNo = n),
          (t.parseYesNoOmit = a),
          (t.mkOutputDefinition = function (e) {
            return {
              omitXmlDeclaration: n(e.omitXmlDeclaration),
              standalone: a(e.standalone),
              doctypeSystem: e.doctypeSystem,
              doctypePublic: e.doctypePublic,
            };
          });
      },
      472: function (e, t, n) {
        "use strict";
        var a =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, n, a) {
                  void 0 === a && (a = n);
                  var o = Object.getOwnPropertyDescriptor(t, n);
                  (o &&
                    !("get" in o
                      ? !t.__esModule
                      : o.writable || o.configurable)) ||
                    (o = {
                      enumerable: !0,
                      get: function () {
                        return t[n];
                      },
                    }),
                    Object.defineProperty(e, a, o);
                }
              : function (e, t, n, a) {
                  void 0 === a && (a = n), (e[a] = t[n]);
                }),
          o =
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
                    a(t, e, n);
              return o(t, e), t;
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
        var a =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, n, a) {
                  void 0 === a && (a = n);
                  var o = Object.getOwnPropertyDescriptor(t, n);
                  (o &&
                    !("get" in o
                      ? !t.__esModule
                      : o.writable || o.configurable)) ||
                    (o = {
                      enumerable: !0,
                      get: function () {
                        return t[n];
                      },
                    }),
                    Object.defineProperty(e, a, o);
                }
              : function (e, t, n, a) {
                  void 0 === a && (a = n), (e[a] = t[n]);
                }),
          o =
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
                    a(t, e, n);
              return o(t, e), t;
            };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.Key = t.XPATH_NSURI = t.XMLNS_NSURI = t.XSLT1_NSURI = void 0),
          (t.visitNodes = h),
          (t.mkResolver = y),
          (t.computeDefaultPriority = R),
          (t.sortSortable = function (e) {
            e.reverse(),
              e.sort(
                (e, t) =>
                  (t.priority || R(t.match)) - (e.priority || R(e.match)),
              ),
              e.sort((e, t) => e.importPrecedence - t.importPrecedence);
          }),
          (t.processNode = D),
          (t.nextMatch = function (e, t) {
            const n = e.nextMatches;
            if (n) {
              const a = n.next();
              a.done ||
                _(
                  a.value,
                  Object.assign(Object.assign({}, e), { nextMatches: n }),
                  t.params,
                );
            }
          }),
          (t.applyImports = function (e, t) {
            const n = e.nextMatches;
            if (n) {
              let a = n.next();
              for (; !a.done && 1 === a.value.importPrecedence; ) a = n.next();
              a.done ||
                _(
                  a.value,
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
            const a = t.params.map((e) => "item()"),
              o = t.params.map((e) => e.name);
            (0, s.registerCustomXPathFunction)(
              { namespaceURI: t.namespace, localName: t.name },
              a,
              t.as || "item()",
              ({ currentContext: e }, ...t) => {
                let a = new Map();
                return (
                  o.forEach((e, n) => a.set(e, t[n])),
                  q(
                    Object.assign(Object.assign({}, e), {
                      variableScopes: [a].concat(e.variableScopes),
                    }),
                    n,
                  )
                );
              },
            );
          }),
          (t.copy = function (e, n, a) {
            const o = e.contextItem;
            let r, s;
            if (o.nodeType === p) {
              r = e.outputDocument.createElementNS(
                o.namespaceURI,
                o.prefix ? `${o.prefix}:${o.localName}` : o.localName,
              );
              for (let n of o.attributes)
                if (n.namespaceURI === t.XMLNS_NSURI) {
                  const a = n.localName;
                  r.setAttributeNode(
                    e.outputDocument.importNode(
                      o.getAttributeNodeNS(t.XMLNS_NSURI, a),
                    ),
                  );
                }
            } else
              r = o.nodeType === g ? void 0 : e.outputDocument.importNode(o);
            r && (s = e.append(r)),
              a &&
                a(
                  Object.assign(Object.assign({}, e), {
                    append: s || e.append,
                  }),
                );
          }),
          (t.copyOf = function (e, t, n) {
            let a = (0, s.evaluateXPath)(
              t.select,
              e.contextItem,
              void 0,
              F(e.variableScopes),
              s.evaluateXPath.ALL_RESULTS_TYPE,
              { currentContext: e, namespaceResolver: y(t.namespaces) },
            );
            for (let t of a) e.append(t);
          }),
          (t.valueOf = C),
          (t.message = function (e, t, n) {
            console.log(G(e, t.select || n, y(t.namespaces))),
              "yes" === t.terminate && process.exit();
          }),
          (t.text = function (e, t, n) {
            e.append(G(e, n, y(t.namespaces), [""]));
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
              { currentContext: e, namespaceResolver: y(t.namespaces) },
            );
            e.append(n);
          }),
          (t.buildNode = K),
          (t.buildAttributeNode = H),
          (t.literalElement = function (e, t, n) {
            let a = K(e, { name: t.name, namespace: t.namespace });
            const o = y(t.namespaces);
            for (let n of t.attributes) {
              const t = z(e, n.value, o),
                r = H(e, { name: n.name, namespace: n.namespace, value: t });
              a.setAttributeNode(r);
            }
            const r = e.append(a);
            n(
              Object.assign(Object.assign({}, e), {
                variableScopes: M(e.variableScopes),
                append: r || e.append,
              }),
            );
          }),
          (t.attribute = function (e, t, n) {
            const a = y(t.namespaces),
              o = z(e, t.name, a),
              r = H(e, {
                name: o,
                namespace: J(o, a, z(e, t.namespace, a)),
                value: G(e, t.select || n, a, t.separator),
              });
            e.append(r);
          }),
          (t.processingInstruction = function (e, t, n) {
            const a = z(e, t.name, y(t.namespaces)),
              o = G(e, t.select || n, y(t.namespaces), [""]).trimStart();
            e.append(e.outputDocument.createProcessingInstruction(a, o));
          }),
          (t.comment = function (e, t, n) {
            const a = G(e, t.select || n, y(t.namespaces), [""]);
            e.append(e.outputDocument.createComment(a));
          }),
          (t.namespace = function (e, n, a) {
            const o = y(n.namespaces),
              r = z(e, n.name, o),
              s = G(e, n.select || a, o, [""]),
              c = H(e, {
                name: `xmlns:${r}`,
                namespace: t.XMLNS_NSURI,
                value: s,
              });
            e.append(c);
          }),
          (t.element = function (e, t, n) {
            const a = y(t.namespaces),
              o = z(e, t.name, a),
              r = z(e, t.namespace, a);
            let s = K(e, { name: o, namespace: J(o, y(t.namespaces), r) });
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
              { currentContext: e, namespaceResolver: y(t.namespaces) },
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
            const a = e.outputDocument.implementation.createDocument(
                null,
                null,
                null,
              ),
              o = e.append(a);
            n(
              Object.assign(Object.assign({}, e), {
                outputDocument: a,
                append: o,
                mode: "#default",
                variableScopes: M(e.variableScopes),
              }),
            );
          }),
          (t.forEach = function (e, t, n) {
            const a = y(t.namespaces),
              o = (0, s.evaluateXPath)(
                t.select,
                e.contextItem,
                void 0,
                F(e.variableScopes),
                s.evaluateXPath.ALL_RESULTS_TYPE,
                { currentContext: e, namespaceResolver: a },
              );
            if (o && Symbol.iterator in Object(o))
              for (let r of j(e, o, t.sortKeyComponents, a))
                n(
                  Object.assign(Object.assign({}, e), {
                    contextItem: r,
                    variableScopes: M(e.variableScopes),
                  }),
                );
          }),
          (t.forEachGroup = function (e, t, n) {
            const a = y(t.namespaces),
              o = F(e.variableScopes),
              r = (0, s.evaluateXPathToNodes)(
                t.select,
                e.contextItem,
                void 0,
                o,
                { currentContext: e, namespaceResolver: a },
              );
            if (r && Symbol.iterator in Object(r)) {
              let o = (function (e, t, n, a) {
                const o = F(e.variableScopes);
                let r = new Map();
                for (let c of t) {
                  const t = (0, s.evaluateXPathToString)(n, c, void 0, o, {
                    currentContext: e,
                    namespaceResolver: a,
                  });
                  r.has(t) || r.set(t, []), r.set(t, r.get(t).concat(c));
                }
                return r;
              })(e, r, t.groupBy, a);
              for (let [t, a] of o)
                n(
                  Object.assign(Object.assign({}, e), {
                    contextItem: a[0],
                    currentGroupingKey: t,
                    currentGroup: a,
                    variableScopes: M(e.variableScopes),
                  }),
                );
            }
          }),
          (t.mkNodeAppender = V),
          (t.mkArrayAppender = Y),
          (t.resultDocument = function (e, t, n) {
            const a = y(t.namespaces);
            function o(t) {
              return z(e, t, a);
            }
            const r = o(t.format);
            let s = (0, u.mkOutputDefinition)({
              omitXmlDeclaration: o(t.omitXmlDeclaration),
              doctypePublic: o(t.doctypePublic),
              doctypeSystem: o(t.doctypeSystem),
              standalone: o(t.standalone),
            });
            Object.keys(s).forEach((e) => {
              s[e] || delete s[e];
            });
            const c = Object.assign(
                Object.assign({}, r ? e.outputDefinitions.get(r) : {}),
                s,
              ),
              i = o(t.href);
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
            let a = [];
            !(function e(o) {
              if (o.nodeType === m)
                n.test(o.textContent) &&
                  (function (e, t) {
                    let n = new Map();
                    for (const a of t) {
                      const t = y(a.namespaces);
                      if (T(n, a.match, null, e, [], t)) return !a.preserve;
                    }
                    return !1;
                  })(o.parentNode, t) &&
                  a.push(o);
              else if (o.hasChildNodes && o.hasChildNodes())
                for (let t of o.childNodes) e(t);
            })(e);
            for (let e of a) e.remove();
            return e;
          }),
          (t.evaluateAttributeValueTemplate = z),
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
        function v(e) {
          return Array.isArray(e)
            ? e.map((e) => v(e)).join("")
            : e.nodeType
              ? e.textContent
              : e.toString();
        }
        function y(e) {
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
            let a = new Map();
            return (
              h(t, (t) => {
                if (
                  "string" == typeof this.use &&
                  T(e, this.match, void 0, t, n, y(this.namespaces))
                ) {
                  let e = (0, s.evaluateXPathToString)(this.use, t);
                  a.has(e) || a.set(e, []), a.set(e, a.get(e).concat(t));
                }
              }),
              a
            );
          }
          lookup(e, t, n, a) {
            return (
              this.cache.has(t) ||
                this.cache.set(t, this.buildDocumentCache(e, t, n)),
              this.cache.get(t).get(v(a))
            );
          }
        };
        const b = new RegExp(/^[a-z |-]+$/),
          w = new RegExp(/^@[a-z]+$/),
          S = new RegExp(/text\(\)|node\(\)/),
          x = new RegExp(/@|attribute|node/);
        function T(e, t, n, a, o, r) {
          let c = a;
          if (
            a &&
            !(function (e, t) {
              return (
                (t.nodeType === l && !x.exec(e)) ||
                (t.nodeType === m && !S.exec(e)) ||
                !(!b.exec(e) || t.nodeType === p) ||
                !(!w.exec(e) || t.nodeType === l)
              );
            })(t, a)
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
              })(t, a)
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
                        (0, s.evaluateXPathToNodes)(t, c, void 0, F(o), {
                          namespaceResolver: r,
                        }),
                      )),
                (i = e).has(u) || i.set(u, h()),
                i.get(u)).has(a)
              )
                return !0;
              c = c.parentNode || (c.nodeType === l && c.ownerElement);
            }
          }
          var i, u, h;
          return !1;
        }
        const P = String.raw`[^,:\(\)\*\[\]/]`,
          N = String.raw`(child::|attribute::|@)?`,
          $ = String.raw`(document-node\()?`,
          X = new Map([
            [new RegExp(String.raw`^\s*/\s*$`), -0.5],
            [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${$}${N}processing-instruction`), 0],
            [new RegExp(String.raw`^\s*${$}${N}element\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${$}${N}attribute\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${$}${N}element\(${P}+\)\)?\s*$`), 0],
            [
              new RegExp(String.raw`^\s*${$}${N}element\(\*,\s*${P}+\)\)?\s*$`),
              0,
            ],
            [new RegExp(String.raw`^\s*${$}${N}attribute\(${P}+\)\)?\s*$`), 0],
            [
              new RegExp(
                String.raw`^\s*${$}${N}attribute\(\*,\s*${P}+\)\)?\s*$`,
              ),
              0,
            ],
            [
              new RegExp(
                String.raw`^\s*${$}${N}element\(${P}+,\s*${P}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${$}${N}attribute\(${P}+,\s*${P}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${$}${N}schema-element\(${P}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${$}${N}schema-attribute\(${P}+\)\)?\s*$`,
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
            [new RegExp(String.raw`^\s*${N}(${P}:)?\*\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${N}\*:${P}+\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${N}${P}+\s*$`), 0],
          ]);
        function R(e) {
          if (e && e.includes("|"))
            return Math.max(
              ...e
                .split("|")
                .filter((e) => "" !== e)
                .map((e) => R(e)),
            );
          for (let [t, n] of X) if (t.test(e)) return n;
          return 0.5;
        }
        function D(e, t, n) {
          let a = (function* (e, t, n, a, o, r) {
            for (let s of n)
              s.match &&
                ("#all" === s.modes[0] || s.modes.includes(o)) &&
                T(e, s.match, s.matchFunction, t, a, y(r)) &&
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
          const o = a.next();
          o.done ||
            _(
              o.value,
              Object.assign(Object.assign({}, e), { nextMatches: a }),
              t,
            );
        }
        function O(e, t, n, a) {
          let o;
          return (
            (o =
              "number" === n.dataType && "string" == typeof n.sortKey
                ? (function (e, t, n, a) {
                    let o = [];
                    for (let r of t) {
                      let t = (0, s.evaluateXPathToNumber)(
                        `number(${n.sortKey})`,
                        r,
                        void 0,
                        F(e.variableScopes),
                        { currentContext: e, namespaceResolver: a },
                      );
                      isNaN(t) && (t = Number.MIN_SAFE_INTEGER),
                        o.push({ key: t, item: r });
                    }
                    return (
                      o.sort((e, t) => e.key - t.key),
                      o.sort((e, t) => e.key - t.key).map((e) => e.item)
                    );
                  })(e, t, n, a)
                : (function (e, t, n, a) {
                    let o = [];
                    for (let r of t) {
                      const t = Object.assign(Object.assign({}, e), {
                        contextItem: r,
                      });
                      o.push({ key: G(t, n.sortKey, a), item: r });
                    }
                    const r = n.lang && z(e, n.lang, a);
                    let s = new Intl.Collator(r).compare;
                    return o.sort((e, t) => s(e.key, t.key)).map((e) => e.item);
                  })(e, t, n, a)),
            "descending" === z(e, n.order, a) && o.reverse(),
            o
          );
        }
        function j(e, t, n, a) {
          if (n) for (let o of [...n].reverse()) t = O(e, t, o, a);
          return t;
        }
        function E(e, t) {
          for (let n of t) if (n.name === e) return n;
        }
        function _(e, t, n) {
          let a = M(t.variableScopes);
          for (let o of e.allowedParams) {
            let e = E(o.name, n);
            void 0 !== e ? k(a, e.name, B(t, e)) : k(a, o.name, B(t, o));
          }
          return e.apply(
            Object.assign(Object.assign({}, t), { variableScopes: a }),
          );
        }
        function I(e, t) {
          const n = y(t.namespaces),
            a = (0, s.evaluateXPathToNodes)(
              t.select,
              e.contextItem,
              void 0,
              F(e.variableScopes),
              { currentContext: e, namespaceResolver: n },
            );
          let o = t.mode || "#default";
          "#current" === o && (o = e.mode);
          for (let r of j(e, a, t.sortKeyComponents, n))
            D(
              Object.assign(Object.assign({}, e), {
                mode: o,
                contextItem: r,
                variableScopes: M(e.variableScopes),
              }),
              t.params,
              t.namespaces,
            );
        }
        function C(e, t, n) {
          e.append(G(e, t.select || n, y(t.namespaces), t.separator));
        }
        function M(e) {
          return e.concat([new Map()]);
        }
        const L = (0, s.createTypedValueFactory)("xs:numeric*"),
          A = (0, s.createTypedValueFactory)("xs:string*"),
          U = (0, s.createTypedValueFactory)("item()*");
        function k(e, t, n) {
          var a;
          e[e.length - 1].set(
            t,
            ((a = n),
            Array.isArray(a)
              ? "string" == typeof a[0]
                ? A(a, null)
                : "number" == typeof a[0]
                  ? L(a, null)
                  : U(a, null)
              : a),
          );
        }
        function F(e) {
          let t = {};
          for (let n of e) for (let [e, a] of n) t[e] = a;
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
          return function n(a) {
            if (Array.isArray(a)) {
              let e = !0;
              const t = a.length > 0 && !a[0].nodeType;
              for (let o of a) e ? (e = !1) : t && n(" "), n(o);
            } else if ("string" == typeof a) {
              if (e.nodeType !== g)
                if (e.lastChild && e.lastChild.nodeType === m)
                  e.lastChild.appendData(a);
                else if ("" !== a) {
                  const n = t.createTextNode(a);
                  n && e.append(n);
                }
            } else if (a.nodeType === l) {
              let n = t.importNode(a, !0);
              e.setAttributeNode(n);
            } else {
              if (a.nodeType === g) {
                const e = a;
                return (a = a.documentElement)
                  ? ("xsl:document" === a.localName ? n(a.childNodes) : n(a),
                    V(a))
                  : V(e);
              }
              if (a.nodeType === m) n(a.data);
              else {
                if (a.nodeType) {
                  let n = t.importNode(a, !0);
                  return e.append(n), V(n);
                }
                n(`${a}`);
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
        function z(e, t, n) {
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
        function G(e, t, n, a) {
          a || (a = "string" == typeof t ? [" "] : []);
          const o = z(e, a, n);
          return "string" == typeof t
            ? (0, s.evaluateXPath)(
                t,
                e.contextItem,
                void 0,
                F(e.variableScopes),
                s.evaluateXPath.STRINGS_TYPE,
                { currentContext: e, namespaceResolver: n },
              ).join(o)
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
              })(q(e, t)).join(o);
        }
        function B(e, t) {
          return "string" == typeof t.content
            ? (0, s.evaluateXPath)(
                t.content,
                e.contextItem,
                void 0,
                F(e.variableScopes),
                s.evaluateXPath.ANY_TYPE,
                { currentContext: e, namespaceResolver: y(t.namespaces) },
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
          let a = n;
          if (void 0 !== a) return a;
          let o = "";
          return e.includes(":") && (o = e.split(":")[0]), (a = t(o)), a;
        }
        (0, i.registerFunctions)();
      },
      964: (e, t, n) => {
        n(898), n(594);
        let a = n(821);
        function o(e, t) {
          t = a.setParamDefaults(e, t);
          let n = [],
            o = [],
            r = new Map();
          r.set("#default", { document: t.outputDocument });
          let s = new Map(),
            c = new Map(),
            i = {
              outputDocument: t.outputDocument,
              append: a.mkNodeAppender(t.outputNode),
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
                a.copy(
                  e,
                  {
                    namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  },
                  (e) => {
                    a.applyTemplates(e, {
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
              match: "text()[matches(., '^[\\s\\t\\n\\r]+$')]",
              matchFunction: void 0,
              name: void 0,
              modes: ["#default"],
              allowedParams: [],
              apply: (e) => {
                a.variable(e, {
                  name: "parent-name",
                  content: "local-name(..)",
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  as: void 0,
                }),
                  a.variable(e, {
                    name: "ns-correct",
                    content:
                      "namespace-uri(..) = 'http://www.w3.org/1999/XSL/Transform'",
                    namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                    as: void 0,
                  }),
                  a.variable(e, {
                    name: "nearest-preserve",
                    content: "./ancestor::*[@xml:space = 'preserve']",
                    namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                    as: void 0,
                  }),
                  a.variable(e, {
                    name: "nearest-default",
                    content: "./ancestor::*[@xml:space = 'default']",
                    namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                    as: void 0,
                  }),
                  a.choose(e, [
                    {
                      test: "$ns-correct and $parent-name = 'text'",
                      apply: (e) => {
                        a.copy(
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
                        a.copy(
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
                        a.copy(
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
                  ]);
              },
              namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
              priority: "1",
              importPrecedence: 1,
            }),
            a.sortSortable(n),
            a.sortSortable(o),
            a.stripSpace(e, o),
            a.processNode(i, [], {
              xsl: "http://www.w3.org/1999/XSL/Transform",
            }),
            r
          );
        }
        (e.exports.transform = o), (global.transform = o);
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
    n = (function n(a) {
      var o = t[a];
      if (void 0 !== o) return o.exports;
      var r = (t[a] = { exports: {} });
      return e[a].call(r.exports, r, r.exports, n), r.exports;
    })(964);
  module.exports = n.transform;
})();
