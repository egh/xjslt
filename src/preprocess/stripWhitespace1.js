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
                u,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XPATH_NSURI, localName: "key" },
                ["xs:string", "item()*"],
                "node()*",
                p,
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
        function l({ currentContext: e }) {
          for (const [t, n] of e.resultDocuments)
            if (n === e.outputDocument) return t;
          return "#default";
        }
        function p({ currentContext: e }, t, n) {
          const {
            keys: o,
            contextItem: a,
            variableScopes: r,
            patternMatchCache: s,
          } = e;
          if (!o.has(t)) throw new Error("XTDE1260");
          return (
            o
              .get(t)
              .lookup(
                s,
                a.ownerDocument,
                r,
                n.map((e) => e.textContent).join(""),
              ) || []
          );
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
          (t.mkResolver = b),
          (t.computeDefaultPriority = $),
          (t.sortSortable = function (e) {
            e.reverse(),
              e.sort(
                (e, t) =>
                  (t.priority || $(t.match)) - (e.priority || $(e.match)),
              ),
              e.sort((e, t) => e.importPrecedence - t.importPrecedence);
          }),
          (t.processNode = X),
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
          (t.sortNodes = O),
          (t.applyTemplates = E),
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
                  z(
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
            if (a.nodeType === l) {
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
              k(e.variableScopes),
              s.evaluateXPath.ALL_RESULTS_TYPE,
              { currentContext: e, namespaceResolver: b(t.namespaces) },
            );
            for (let t of o) e.append(t);
          }),
          (t.valueOf = I),
          (t.message = function (e, t, n) {
            console.log(Y(e, t.select || n, b(t.namespaces))),
              "yes" === t.terminate && process.exit();
          }),
          (t.text = function (e, t, n) {
            e.append(Y(e, n, b(t.namespaces), [""]));
          }),
          (t.variable = function (e, t) {
            L(e.variableScopes, t.name, G(e, t));
          }),
          (t.param = function (e, t) {
            L(e.variableScopes, t.name, e.stylesheetParams[t.name] || G(e, t));
          }),
          (t.extendScope = C),
          (t.setVariable = L),
          (t.mergeVariableScopes = k),
          (t.literalText = function (e, t) {
            e.append(t);
          }),
          (t.sequence = function (e, t) {
            const n = (0, s.evaluateXPath)(
              t.select,
              e.contextItem,
              void 0,
              k(e.variableScopes),
              s.evaluateXPath.ALL_RESULTS_TYPE,
              { currentContext: e, namespaceResolver: b(t.namespaces) },
            );
            e.append(n);
          }),
          (t.buildNode = F),
          (t.buildAttributeNode = K),
          (t.literalElement = function (e, t, n) {
            let o = F(e, { name: t.name, namespace: t.namespace });
            const a = b(t.namespaces);
            for (let n of t.attributes) {
              const t = V(e, n.value, a),
                r = K(e, { name: n.name, namespace: n.namespace, value: t });
              o.setAttributeNode(r);
            }
            const r = e.append(o);
            n(
              Object.assign(Object.assign({}, e), {
                variableScopes: C(e.variableScopes),
                append: r || e.append,
              }),
            );
          }),
          (t.attribute = function (e, t, n) {
            const o = b(t.namespaces),
              a = V(e, t.name, o),
              r = K(e, {
                name: a,
                namespace: B(a, o, V(e, t.namespace, o)),
                value: Y(e, t.select || n, o, t.separator),
              });
            e.append(r);
          }),
          (t.processingInstruction = function (e, t, n) {
            const o = V(e, t.name, b(t.namespaces)),
              a = Y(e, t.select || n, b(t.namespaces), [""]).trimStart();
            e.append(e.outputDocument.createProcessingInstruction(o, a));
          }),
          (t.comment = function (e, t, n) {
            const o = Y(e, t.select || n, b(t.namespaces), [""]);
            e.append(e.outputDocument.createComment(o));
          }),
          (t.namespace = function (e, n, o) {
            const a = b(n.namespaces),
              r = V(e, n.name, a),
              s = Y(e, n.select || o, a, [""]),
              c = K(e, {
                name: `xmlns:${r}`,
                namespace: t.XMLNS_NSURI,
                value: s,
              });
            e.append(c);
          }),
          (t.element = function (e, t, n) {
            const o = b(t.namespaces),
              a = V(e, t.name, o),
              r = V(e, t.namespace, o);
            let s = F(e, { name: a, namespace: B(a, b(t.namespaces), r) });
            const c = e.append(s);
            n(
              Object.assign(Object.assign({}, e), {
                variableScopes: C(e.variableScopes),
                append: c || e.append,
              }),
            );
          }),
          (t.ifX = function (e, t, n) {
            (0, s.evaluateXPathToBoolean)(
              t.test,
              e.contextItem,
              void 0,
              k(e.variableScopes),
              { currentContext: e, namespaceResolver: b(t.namespaces) },
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
                  k(e.variableScopes),
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
            );
            n(
              Object.assign(Object.assign({}, e), {
                outputDocument: o,
                append: H(o),
                mode: "#default",
                variableScopes: C(e.variableScopes),
              }),
            );
          }),
          (t.forEach = function (e, t, n) {
            const o = b(t.namespaces),
              a = (0, s.evaluateXPath)(
                t.select,
                e.contextItem,
                void 0,
                k(e.variableScopes),
                s.evaluateXPath.ALL_RESULTS_TYPE,
                { currentContext: e, namespaceResolver: o },
              );
            if (a && Symbol.iterator in Object(a))
              for (let r of O(e, a, t.sortKeyComponents, o))
                n(
                  Object.assign(Object.assign({}, e), {
                    contextItem: r,
                    variableScopes: C(e.variableScopes),
                  }),
                );
          }),
          (t.forEachGroup = function (e, t, n) {
            const o = b(t.namespaces),
              a = k(e.variableScopes),
              r = (0, s.evaluateXPathToNodes)(
                t.select,
                e.contextItem,
                void 0,
                a,
                { currentContext: e, namespaceResolver: o },
              );
            if (r && Symbol.iterator in Object(r)) {
              let a = (function (e, t, n, o) {
                const a = k(e.variableScopes);
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
                    variableScopes: C(e.variableScopes),
                  }),
                );
            }
          }),
          (t.mkNodeAppender = H),
          (t.resultDocument = function (e, t, n) {
            const o = b(t.namespaces);
            function a(t) {
              return V(e, t, o);
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
            let l = null;
            if (
              ((c.doctypePublic || c.doctypeSystem) &&
                (l = e.outputDocument.implementation.createDocumentType(
                  "out",
                  c.doctypePublic || "",
                  c.doctypeSystem || "",
                )),
              i)
            ) {
              const t = e.outputDocument.implementation.createDocument(
                null,
                null,
                l,
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
                    append: H(t),
                  }),
                );
            } else {
              if (e.outputDocument.documentElement) throw new Error("XTDE1490");
              let t = e.outputDocument;
              l &&
                ((t = e.outputDocument.implementation.createDocument(
                  null,
                  null,
                  l,
                )),
                (e.outputDocument = t),
                (e.append = H(t))),
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
                      const t = b(o.namespaces);
                      if (w(n, o.match, null, e, [], t)) return !o.preserve;
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
          (t.evaluateAttributeValueTemplate = V),
          (t.determineNamespace = B),
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
        const l = 1,
          p = 2,
          m = 3,
          d = 7,
          f = 8,
          g = 9;
        function h(e, t) {
          for (let n of e.childNodes) h(n, t);
          t(e);
        }
        function b(e) {
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
                  w(e, this.match, void 0, t, n, b(this.namespaces))
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
              this.cache.get(t).get(o)
            );
          }
        };
        const v = new RegExp(/^[a-z |-]+$/),
          y = new RegExp(/^@[a-z]+$/),
          S = new RegExp(/text\(\)|node\(\)/),
          x = new RegExp(/@|attribute|node/);
        function w(e, t, n, o, a, r) {
          let c = o;
          if (
            o &&
            !(function (e, t) {
              return (
                (t.nodeType === p && !x.exec(e)) ||
                (t.nodeType === m && !S.exec(e)) ||
                !(!v.exec(e) || t.nodeType === l) ||
                !(!y.exec(e) || t.nodeType === p)
              );
            })(t, o)
          ) {
            if (
              (function (e, t) {
                return "text()|@*" === e
                  ? t.nodeType === m || t.nodeType === p
                  : "processing-instruction()|comment()" === e
                    ? t.nodeType === d || t.nodeType === f
                    : "*|/" === e
                      ? t.nodeType === l || t.nodeType === g
                      : "text()" === e
                        ? t.nodeType === m
                        : "/" === e && t.nodeType === g;
              })(t, o)
            )
              return !0;
            for (; c; ) {
              const l = (0, s.evaluateXPathToString)("generate-id(.)", c);
              if (
                ((u = `${t}-${l}`),
                (h = () =>
                  n
                    ? new Set((0, s.executeJavaScriptCompiledXPath)(n, c))
                    : new Set(
                        (0, s.evaluateXPathToNodes)(t, c, void 0, k(a), {
                          namespaceResolver: r,
                        }),
                      )),
                (i = e).has(u) || i.set(u, h()),
                i.get(u)).has(o)
              )
                return !0;
              c = c.parentNode || (c.nodeType === p && c.ownerElement);
            }
          }
          var i, u, h;
          return !1;
        }
        const P = String.raw`[^,:\(\)\*\[\]/]`,
          N = String.raw`(child::|attribute::|@)?`,
          T = String.raw`(document-node\()?`,
          R = new Map([
            [new RegExp(String.raw`^\s*/\s*$`), -0.5],
            [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${T}${N}processing-instruction`), 0],
            [new RegExp(String.raw`^\s*${T}${N}element\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${T}${N}attribute\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${T}${N}element\(${P}+\)\)?\s*$`), 0],
            [
              new RegExp(String.raw`^\s*${T}${N}element\(\*,\s*${P}+\)\)?\s*$`),
              0,
            ],
            [new RegExp(String.raw`^\s*${T}${N}attribute\(${P}+\)\)?\s*$`), 0],
            [
              new RegExp(
                String.raw`^\s*${T}${N}attribute\(\*,\s*${P}+\)\)?\s*$`,
              ),
              0,
            ],
            [
              new RegExp(
                String.raw`^\s*${T}${N}element\(${P}+,\s*${P}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${T}${N}attribute\(${P}+,\s*${P}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${T}${N}schema-element\(${P}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${T}${N}schema-attribute\(${P}+\)\)?\s*$`,
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
        function $(e) {
          if (e && e.includes("|"))
            return Math.max(
              ...e
                .split("|")
                .filter((e) => "" !== e)
                .map((e) => $(e)),
            );
          for (let [t, n] of R) if (t.test(e)) return n;
          return 0.5;
        }
        function X(e, t, n) {
          let o = (function* (e, t, n, o, a, r) {
            for (let s of n)
              s.match &&
                ("#all" === s.modes[0] || s.modes.includes(a)) &&
                w(e, s.match, s.matchFunction, t, o, b(r)) &&
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
                      I(t, { select: ".", namespaces: e }, () => {});
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
          const a = o.next();
          a.done ||
            _(
              a.value,
              Object.assign(Object.assign({}, e), { nextMatches: o }),
              t,
            );
        }
        function D(e, t, n, o) {
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
                        k(e.variableScopes),
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
                      a.push({ key: Y(t, n.sortKey, o), item: r });
                    }
                    const r = n.lang && V(e, n.lang, o);
                    let s = new Intl.Collator(r).compare;
                    return a.sort((e, t) => s(e.key, t.key)).map((e) => e.item);
                  })(e, t, n, o)),
            "descending" === V(e, n.order, o) && a.reverse(),
            a
          );
        }
        function O(e, t, n, o) {
          if (n) for (let a of [...n].reverse()) t = D(e, t, a, o);
          return t;
        }
        function j(e, t) {
          for (let n of t) if (n.name === e) return n;
        }
        function _(e, t, n) {
          let o = C(t.variableScopes);
          for (let a of e.allowedParams) {
            let e = j(a.name, n);
            void 0 !== e ? L(o, e.name, G(t, e)) : L(o, a.name, G(t, a));
          }
          return e.apply(
            Object.assign(Object.assign({}, t), { variableScopes: o }),
          );
        }
        function E(e, t) {
          const n = b(t.namespaces),
            o = (0, s.evaluateXPathToNodes)(
              t.select,
              e.contextItem,
              void 0,
              k(e.variableScopes),
              { currentContext: e, namespaceResolver: n },
            );
          let a = t.mode || "#default";
          "#current" === a && (a = e.mode);
          for (let r of O(e, o, t.sortKeyComponents, n))
            X(
              Object.assign(Object.assign({}, e), {
                mode: a,
                contextItem: r,
                variableScopes: C(e.variableScopes),
              }),
              t.params,
              t.namespaces,
            );
        }
        function I(e, t, n) {
          e.append(Y(e, t.select || n, b(t.namespaces), t.separator));
        }
        function C(e) {
          return e.concat([new Map()]);
        }
        const M = (0, s.createTypedValueFactory)("xs:numeric*"),
          U = (0, s.createTypedValueFactory)("xs:string*"),
          A = (0, s.createTypedValueFactory)("item()*");
        function L(e, t, n) {
          var o;
          e[e.length - 1].set(
            t,
            ((o = n),
            Array.isArray(o)
              ? "string" == typeof o[0]
                ? U(o, null)
                : "number" == typeof o[0]
                  ? M(o, null)
                  : A(o, null)
              : o),
          );
        }
        function k(e) {
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
        function K(e, t) {
          let n;
          return (
            (n = t.namespace
              ? e.outputDocument.createAttributeNS(t.namespace, t.name)
              : e.outputDocument.createAttribute(t.name)),
            (n.value = t.value),
            n
          );
        }
        function H(e) {
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
            } else if (o.nodeType === p) {
              let n = t.importNode(o, !0);
              e.setAttributeNode(n);
            } else {
              if (o.nodeType === g)
                return (
                  "xsl:document" === (o = o.documentElement).localName
                    ? n(o.childNodes)
                    : n(o),
                  H(o)
                );
              if (o.nodeType === m) n(o.data);
              else {
                if (o.nodeType) {
                  let n = t.importNode(o, !0);
                  return e.append(n), H(n);
                }
                n(`${o}`);
              }
            }
          };
        }
        function V(e, t, n) {
          if (t)
            return t
              .map((t) =>
                "string" == typeof t
                  ? t
                  : (0, s.evaluateXPathToString)(
                      t.xpath,
                      e.contextItem,
                      void 0,
                      k(e.variableScopes),
                      { currentContext: e, namespaceResolver: n },
                    ),
              )
              .join("");
        }
        function Y(e, t, n, o) {
          o || (o = "string" == typeof t ? [" "] : []);
          const a = V(e, o, n);
          return "string" == typeof t
            ? (0, s.evaluateXPath)(
                t,
                e.contextItem,
                void 0,
                k(e.variableScopes),
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
              })(z(e, t)).join(a);
        }
        function G(e, t) {
          return "string" == typeof t.content
            ? (0, s.evaluateXPath)(
                t.content,
                e.contextItem,
                void 0,
                k(e.variableScopes),
                s.evaluateXPath.ANY_TYPE,
                { currentContext: e, namespaceResolver: b(t.namespaces) },
              )
            : null == t.content
              ? ""
              : z(e, t.content);
        }
        function z(e, t) {
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
                append: H(n.documentElement),
                mode: "#default",
                variableScopes: C(e.variableScopes),
              }),
            ),
            n
          );
        }
        function B(e, t, n) {
          let o = n;
          if (void 0 !== o) return o;
          let a = "";
          return e.includes(":") && (a = e.split(":")[0]), (o = t(a)), o;
        }
        (0, i.registerFunctions)();
      },
      476: (e, t, n) => {
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
    })(476);
  module.exports = n.transform;
})();
