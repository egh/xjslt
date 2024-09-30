(() => {
  var t = {
      379: (t, e, n) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.registerFunctions = function () {
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
                m,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XPATH_NSURI, localName: "key" },
                ["xs:string", "item()*"],
                "node()*",
                u,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XPATH_NSURI, localName: "system-property" },
                ["xs:string"],
                "xs:string",
                p,
              );
          });
        const o = n(594),
          a = n(821),
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
        function u({ currentContext: t }, e, n) {
          const {
            keys: o,
            contextItem: a,
            variableScopes: r,
            patternMatchCache: s,
          } = t;
          if (!o.has(e)) throw new Error("XTDE1260");
          return o.get(e).lookup(s, a.ownerDocument, r, n) || [];
        }
        function p(t, e) {
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
      777: (t, e) => {
        "use strict";
        function n(t) {
          return "yes" === t;
        }
        function o(t) {
          return "omit" === t ? void 0 : "yes" === t;
        }
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.parseYesNo = n),
          (e.parseYesNoOmit = o),
          (e.mkOutputDefinition = function (t) {
            return {
              omitXmlDeclaration: n(t.omitXmlDeclaration),
              standalone: o(t.standalone),
              doctypeSystem: t.doctypeSystem,
              doctypePublic: t.doctypePublic,
            };
          });
      },
      472: function (t, e, n) {
        "use strict";
        var o =
            (this && this.__createBinding) ||
            (Object.create
              ? function (t, e, n, o) {
                  void 0 === o && (o = n);
                  var a = Object.getOwnPropertyDescriptor(e, n);
                  (a &&
                    !("get" in a
                      ? !e.__esModule
                      : a.writable || a.configurable)) ||
                    (a = {
                      enumerable: !0,
                      get: function () {
                        return e[n];
                      },
                    }),
                    Object.defineProperty(t, o, a);
                }
              : function (t, e, n, o) {
                  void 0 === o && (o = n), (t[o] = e[n]);
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
          r =
            (this && this.__importStar) ||
            function (t) {
              if (t && t.__esModule) return t;
              var e = {};
              if (null != t)
                for (var n in t)
                  "default" !== n &&
                    Object.prototype.hasOwnProperty.call(t, n) &&
                    o(e, t, n);
              return a(e, t), e;
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.urlToDom = function (t, e) {
            const n = t.inputURL ? (0, s.resolve)(t.inputURL.toString(), e) : e;
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
      821: function (t, e, n) {
        "use strict";
        var o =
            (this && this.__createBinding) ||
            (Object.create
              ? function (t, e, n, o) {
                  void 0 === o && (o = n);
                  var a = Object.getOwnPropertyDescriptor(e, n);
                  (a &&
                    !("get" in a
                      ? !e.__esModule
                      : a.writable || a.configurable)) ||
                    (a = {
                      enumerable: !0,
                      get: function () {
                        return e[n];
                      },
                    }),
                    Object.defineProperty(t, o, a);
                }
              : function (t, e, n, o) {
                  void 0 === o && (o = n), (t[o] = e[n]);
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
          r =
            (this && this.__importStar) ||
            function (t) {
              if (t && t.__esModule) return t;
              var e = {};
              if (null != t)
                for (var n in t)
                  "default" !== n &&
                    Object.prototype.hasOwnProperty.call(t, n) &&
                    o(e, t, n);
              return a(e, t), e;
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.Key = e.XPATH_NSURI = e.XMLNS_NSURI = e.XSLT1_NSURI = void 0),
          (e.visitNodes = w),
          (e.mkResolver = y),
          (e.computeDefaultPriority = R),
          (e.sortSortable = function (t) {
            t.reverse(),
              t.sort(
                (t, e) =>
                  (e.priority || R(e.match)) - (t.priority || R(t.match)),
              ),
              t.sort((t, e) => t.importPrecedence - e.importPrecedence);
          }),
          (e.processNode = D),
          (e.nextMatch = function (t, e) {
            const n = t.nextMatches;
            if (n) {
              const o = n.next();
              o.done ||
                L(
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
                L(
                  o.value,
                  Object.assign(Object.assign({}, t), { nextMatches: n }),
                  e.params,
                );
            }
          }),
          (e.sortNodes = $),
          (e.applyTemplates = C),
          (e.callTemplate = function (t, e) {
            for (let n of t.templates)
              if (void 0 !== n.name && e.name === n.name)
                return L(n, t, e.params);
            throw new Error(`Cannot find a template named ${e.name}`);
          }),
          (e.functionX = function (t, e, n) {
            const o = e.params.map((t) => "item()"),
              a = e.params.map((t) => t.name);
            (0, s.registerCustomXPathFunction)(
              { namespaceURI: e.namespace, localName: e.name },
              o,
              e.as || "item()",
              ({ currentContext: t }, ...e) => {
                let o = new Map();
                return (
                  a.forEach((t, n) => o.set(t, e[n])),
                  J(
                    Object.assign(Object.assign({}, t), {
                      variableScopes: [o].concat(t.variableScopes),
                    }),
                    n,
                  )
                );
              },
            );
          }),
          (e.copy = function (t, n, o) {
            const a = t.contextItem;
            let r, s;
            if (a.nodeType === l) {
              r = t.outputDocument.createElementNS(
                a.namespaceURI,
                a.prefix ? `${a.prefix}:${a.localName}` : a.localName,
              );
              for (let n of a.attributes)
                if (n.namespaceURI === e.XMLNS_NSURI) {
                  const o = n.localName;
                  r.setAttributeNode(
                    t.outputDocument.importNode(
                      a.getAttributeNodeNS(e.XMLNS_NSURI, o),
                    ),
                  );
                }
            } else
              r = a.nodeType === x ? void 0 : t.outputDocument.importNode(a);
            r && (s = t.append(r)),
              o &&
                o(
                  Object.assign(Object.assign({}, t), {
                    append: s || t.append,
                  }),
                );
          }),
          (e.copyOf = function (t, e, n) {
            let o = (0, s.evaluateXPath)(
              e.select,
              t.contextItem,
              void 0,
              Y(t.variableScopes),
              s.evaluateXPath.ALL_RESULTS_TYPE,
              { currentContext: t, namespaceResolver: y(e.namespaces) },
            );
            for (let e of o) t.append(e);
          }),
          (e.valueOf = _),
          (e.message = function (t, e, n) {
            const o = B(t, e.select || n, y(e.namespaces));
            if ("yes" === e.terminate) throw new Error(o);
            console.log(o);
          }),
          (e.text = function (t, e, n) {
            t.append(B(t, n, y(e.namespaces), [""]));
          }),
          (e.variable = function (t, e) {
            k(t.variableScopes, e.name, q(t, e));
          }),
          (e.param = function (t, e) {
            k(t.variableScopes, e.name, t.stylesheetParams[e.name] || q(t, e));
          }),
          (e.extendScope = M),
          (e.setVariable = k),
          (e.mergeVariableScopes = Y),
          (e.literalText = function (t, e) {
            t.append(e);
          }),
          (e.sequence = function (t, e) {
            const n = (0, s.evaluateXPath)(
              e.select,
              t.contextItem,
              void 0,
              Y(t.variableScopes),
              s.evaluateXPath.ALL_RESULTS_TYPE,
              { currentContext: t, namespaceResolver: y(e.namespaces) },
            );
            t.append(n);
          }),
          (e.buildNode = K),
          (e.buildAttributeNode = V),
          (e.literalElement = function (t, e, n) {
            let o = K(t, { name: e.name, namespace: e.namespace });
            const a = y(e.namespaces);
            for (let n of e.attributes) {
              const e = z(t, n.value, a),
                r = V(t, { name: n.name, namespace: n.namespace, value: e });
              o.setAttributeNode(r);
            }
            const r = t.append(o);
            n(
              Object.assign(Object.assign({}, t), {
                variableScopes: M(t.variableScopes),
                append: r || t.append,
              }),
            );
          }),
          (e.attribute = function (t, e, n) {
            const o = y(e.namespaces),
              a = z(t, e.name, o),
              r = V(t, {
                name: a,
                namespace: W(a, o, z(t, e.namespace, o)),
                value: B(t, e.select || n, o, e.separator),
              });
            t.append(r);
          }),
          (e.processingInstruction = function (t, e, n) {
            const o = z(t, e.name, y(e.namespaces)),
              a = B(t, e.select || n, y(e.namespaces), [""]).trimStart();
            t.append(t.outputDocument.createProcessingInstruction(o, a));
          }),
          (e.comment = function (t, e, n) {
            const o = B(t, e.select || n, y(e.namespaces), [""]);
            t.append(t.outputDocument.createComment(o));
          }),
          (e.namespace = function (t, n, o) {
            const a = y(n.namespaces),
              r = z(t, n.name, a),
              s = B(t, n.select || o, a, [""]),
              c = V(t, {
                name: `xmlns:${r}`,
                namespace: e.XMLNS_NSURI,
                value: s,
              });
            t.append(c);
          }),
          (e.element = function (t, e, n) {
            const o = y(e.namespaces),
              a = z(t, e.name, o),
              r = z(t, e.namespace, o);
            let s = K(t, { name: a, namespace: W(a, y(e.namespaces), r) });
            const c = t.append(s);
            n(
              Object.assign(Object.assign({}, t), {
                variableScopes: M(t.variableScopes),
                append: c || t.append,
              }),
            );
          }),
          (e.ifX = function (t, e, n) {
            (0, s.evaluateXPathToBoolean)(
              e.test,
              t.contextItem,
              void 0,
              Y(t.variableScopes),
              { currentContext: t, namespaceResolver: y(e.namespaces) },
            ) && n(t);
          }),
          (e.choose = function (t, e) {
            for (let n of e) {
              if (!n.test) return n.apply(t);
              if (
                (0, s.evaluateXPathToBoolean)(
                  n.test,
                  t.contextItem,
                  void 0,
                  Y(t.variableScopes),
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
                variableScopes: M(t.variableScopes),
              }),
            );
          }),
          (e.forEach = function (t, e, n) {
            const o = y(e.namespaces),
              a = (0, s.evaluateXPath)(
                e.select,
                t.contextItem,
                void 0,
                Y(t.variableScopes),
                s.evaluateXPath.ALL_RESULTS_TYPE,
                { currentContext: t, namespaceResolver: o },
              );
            if (a && Symbol.iterator in Object(a))
              for (let r of $(t, a, e.sortKeyComponents, o))
                n(
                  Object.assign(Object.assign({}, t), {
                    contextItem: r,
                    variableScopes: M(t.variableScopes),
                  }),
                );
          }),
          (e.forEachGroup = function (t, e, n) {
            const o = y(e.namespaces),
              a = Y(t.variableScopes),
              r = (0, s.evaluateXPathToNodes)(
                e.select,
                t.contextItem,
                void 0,
                a,
                { currentContext: t, namespaceResolver: o },
              );
            if (r && Symbol.iterator in Object(r)) {
              let a = (function (t, e, n, o) {
                const a = Y(t.variableScopes);
                let r = new Map();
                for (let c of e) {
                  const e = (0, s.evaluateXPathToString)(n, c, void 0, a, {
                    currentContext: t,
                    namespaceResolver: o,
                  });
                  r.has(e) || r.set(e, []), r.set(e, r.get(e).concat(c));
                }
                return r;
              })(t, r, e.groupBy, o);
              for (let [e, o] of a)
                n(
                  Object.assign(Object.assign({}, t), {
                    contextItem: o[0],
                    currentGroupingKey: e,
                    currentGroup: o,
                    variableScopes: M(t.variableScopes),
                  }),
                );
            }
          }),
          (e.mkNodeAppender = H),
          (e.mkArrayAppender = G),
          (e.resultDocument = function (t, e, n) {
            const o = y(e.namespaces);
            function a(e) {
              return z(t, e, o);
            }
            const r = a(e.format);
            let s = (0, m.mkOutputDefinition)({
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
            let l = null;
            if (
              ((c.doctypePublic || c.doctypeSystem) &&
                (l = t.outputDocument.implementation.createDocumentType(
                  "out",
                  c.doctypePublic || "",
                  c.doctypeSystem || "",
                )),
              i)
            ) {
              const e = t.outputDocument.implementation.createDocument(
                null,
                null,
                l,
              );
              if (t.resultDocuments.has(i))
                throw new Error(`XTDE1490: ${i} is a duplicate`);
              t.resultDocuments.set(
                i,
                Object.assign(Object.assign({}, c), { document: e }),
              ),
                n(
                  Object.assign(Object.assign({}, t), {
                    outputDocument: e,
                    append: H(e),
                  }),
                );
            } else {
              if (t.outputDocument.documentElement) throw new Error("XTDE1490");
              let e = t.outputDocument;
              l &&
                ((e = t.outputDocument.implementation.createDocument(
                  null,
                  null,
                  l,
                )),
                (t.outputDocument = e),
                (t.append = H(e))),
                t.resultDocuments.set(
                  "#default",
                  Object.assign(Object.assign({}, c), { document: e }),
                ),
                n(t);
            }
          }),
          (e.stripSpace = function (t, e) {
            const n = RegExp("^[ \n\r\t]+$");
            let o = [];
            !(function t(a) {
              if (a.nodeType === p)
                n.test(a.textContent) &&
                  (function (t, e) {
                    let n = new Map();
                    for (const o of e) {
                      const e = y(o.namespaces);
                      if (I(n, o.match, null, t, [], e)) return !o.preserve;
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
          (e.evaluateAttributeValueTemplate = z),
          (e.determineNamespace = W),
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
          });
        const s = n(594),
          c = r(n(898)),
          i = n(379),
          m = n(777);
        (e.XSLT1_NSURI = "http://www.w3.org/1999/XSL/Transform"),
          (e.XMLNS_NSURI = "http://www.w3.org/2000/xmlns/"),
          (e.XPATH_NSURI = "http://www.w3.org/2005/xpath-functions");
        const l = 1,
          u = 2,
          p = 3,
          d = 7,
          f = 8,
          x = 9,
          h = 11;
        function w(t, e) {
          if ((e(t), t.childNodes)) for (let n of t.childNodes) w(n, e);
        }
        function g(t) {
          return Array.isArray(t)
            ? t.map((t) => g(t)).join("")
            : t.nodeType
              ? t.textContent
              : t.toString();
        }
        function y(t) {
          return (e) => t[e];
        }
        e.Key = class {
          constructor(t, e, n) {
            (this.match = t),
              (this.use = e),
              (this.namespaces = n),
              (this.cache = new Map());
          }
          buildDocumentCache(t, e, n) {
            let o = new Map();
            return (
              w(e, (e) => {
                if (
                  "string" == typeof this.use &&
                  I(t, this.match, void 0, e, n, y(this.namespaces))
                ) {
                  let t = (0, s.evaluateXPathToString)(this.use, e);
                  o.has(t) || o.set(t, []), o.set(t, o.get(t).concat(e));
                }
              }),
              o
            );
          }
          lookup(t, e, n, o) {
            return (
              this.cache.has(e) ||
                this.cache.set(e, this.buildDocumentCache(t, e, n)),
              this.cache.get(e).get(g(o))
            );
          }
        };
        const b = new RegExp(/^[a-z |-]+$/),
          v = new RegExp(/^@[a-z]+$/),
          S = new RegExp(/text\(\)|node\(\)/),
          T = new RegExp(/@|attribute|node/);
        function I(t, e, n, o, a, r) {
          let c = o;
          if (
            o &&
            !(function (t, e) {
              return (
                (e.nodeType === u && !T.exec(t)) ||
                (e.nodeType === p && !S.exec(t)) ||
                !(!b.exec(t) || e.nodeType === l) ||
                !(!v.exec(t) || e.nodeType === u)
              );
            })(e, o)
          ) {
            if (
              (function (t, e) {
                return "text()|@*" === t
                  ? e.nodeType === p || e.nodeType === u
                  : "processing-instruction()|comment()" === t
                    ? e.nodeType === d || e.nodeType === f
                    : "*|/" === t
                      ? e.nodeType === l || e.nodeType === x
                      : "text()" === t
                        ? e.nodeType === p
                        : "/" === t && e.nodeType === x;
              })(e, o)
            )
              return !0;
            for (; c; ) {
              const l = (0, s.evaluateXPathToString)("generate-id(.)", c);
              if (
                ((m = `${e}-${l}`),
                (h = () =>
                  n
                    ? new Set((0, s.executeJavaScriptCompiledXPath)(n, c))
                    : new Set(
                        (0, s.evaluateXPathToNodes)(e, c, void 0, Y(a), {
                          namespaceResolver: r,
                        }),
                      )),
                (i = t).has(m) || i.set(m, h()),
                i.get(m)).has(o)
              )
                return !0;
              c = c.parentNode || (c.nodeType === u && c.ownerElement);
            }
          }
          var i, m, h;
          return !1;
        }
        const N = String.raw`[^,:\(\)\*\[\]/]`,
          X = String.raw`(child::|attribute::|@)?`,
          P = String.raw`(document-node\()?`,
          E = new Map([
            [new RegExp(String.raw`^\s*/\s*$`), -0.5],
            [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${P}${X}processing-instruction`), 0],
            [new RegExp(String.raw`^\s*${P}${X}element\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${P}${X}attribute\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${P}${X}element\(${N}+\)\)?\s*$`), 0],
            [
              new RegExp(String.raw`^\s*${P}${X}element\(\*,\s*${N}+\)\)?\s*$`),
              0,
            ],
            [new RegExp(String.raw`^\s*${P}${X}attribute\(${N}+\)\)?\s*$`), 0],
            [
              new RegExp(
                String.raw`^\s*${P}${X}attribute\(\*,\s*${N}+\)\)?\s*$`,
              ),
              0,
            ],
            [
              new RegExp(
                String.raw`^\s*${P}${X}element\(${N}+,\s*${N}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${P}${X}attribute\(${N}+,\s*${N}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${P}${X}schema-element\(${N}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${P}${X}schema-attribute\(${N}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [new RegExp(String.raw`^\s*document-node\(\)\s*$`), -0.5],
            [
              new RegExp(
                String.raw`^\s*${X}(node\(\)|text\(\)|comment\(\))\s*$`,
              ),
              -0.5,
            ],
            [new RegExp(String.raw`^\s*${X}(${N}:)?\*\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${X}\*:${N}+\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${X}${N}+\s*$`), 0],
          ]);
        function R(t) {
          if (t && t.includes("|"))
            return Math.max(
              ...t
                .split("|")
                .filter((t) => "" !== t)
                .map((t) => R(t)),
            );
          for (let [e, n] of E) if (e.test(t)) return n;
          return 0.5;
        }
        function D(t, e, n) {
          let o = (function* (t, e, n, o, a, r) {
            for (let s of n)
              s.match &&
                ("#all" === s.modes[0] || s.modes.includes(a)) &&
                I(t, s.match, s.matchFunction, e, o, y(r)) &&
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
                      _(e, { select: ".", namespaces: t }, () => {});
                    },
                    allowedParams: [],
                    modes: ["#all"],
                    importPrecedence: Number.MAX_VALUE,
                  },
                  {
                    match: "*|/",
                    apply: (e) => {
                      C(e, {
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
            L(
              a.value,
              Object.assign(Object.assign({}, t), { nextMatches: o }),
              e,
            );
        }
        function O(t, e, n, o) {
          let a;
          return (
            (a =
              "number" === n.dataType && "string" == typeof n.sortKey
                ? (function (t, e, n, o) {
                    let a = [];
                    for (let r of e) {
                      let e = (0, s.evaluateXPathToNumber)(
                        `number(${n.sortKey})`,
                        r,
                        void 0,
                        Y(t.variableScopes),
                        { currentContext: t, namespaceResolver: o },
                      );
                      isNaN(e) && (e = Number.MIN_SAFE_INTEGER),
                        a.push({ key: e, item: r });
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
                      a.push({ key: B(e, n.sortKey, o), item: r });
                    }
                    const r = n.lang && z(t, n.lang, o);
                    let s = new Intl.Collator(r).compare;
                    return a.sort((t, e) => s(t.key, e.key)).map((t) => t.item);
                  })(t, e, n, o)),
            "descending" === z(t, n.order, o) && a.reverse(),
            a
          );
        }
        function $(t, e, n, o) {
          if (n) for (let a of [...n].reverse()) e = O(t, e, a, o);
          return e;
        }
        function j(t, e) {
          for (let n of e) if (n.name === t) return n;
        }
        function L(t, e, n) {
          let o = M(e.variableScopes);
          for (let a of t.allowedParams) {
            let t = j(a.name, n);
            void 0 !== t ? k(o, t.name, q(e, t)) : k(o, a.name, q(e, a));
          }
          return t.apply(
            Object.assign(Object.assign({}, e), { variableScopes: o }),
          );
        }
        function C(t, e) {
          const n = y(e.namespaces),
            o = (0, s.evaluateXPathToNodes)(
              e.select,
              t.contextItem,
              void 0,
              Y(t.variableScopes),
              { currentContext: t, namespaceResolver: n },
            );
          let a = e.mode || "#default";
          "#current" === a && (a = t.mode);
          for (let r of $(t, o, e.sortKeyComponents, n))
            D(
              Object.assign(Object.assign({}, t), {
                mode: a,
                contextItem: r,
                variableScopes: M(t.variableScopes),
              }),
              e.params,
              e.namespaces,
            );
        }
        function _(t, e, n) {
          t.append(B(t, e.select || n, y(e.namespaces), e.separator));
        }
        function M(t) {
          return t.concat([new Map()]);
        }
        const U = (0, s.createTypedValueFactory)("xs:numeric*"),
          F = (0, s.createTypedValueFactory)("xs:string*"),
          A = (0, s.createTypedValueFactory)("item()*");
        function k(t, e, n) {
          var o;
          t[t.length - 1].set(
            e,
            ((o = n),
            Array.isArray(o)
              ? "string" == typeof o[0]
                ? F(o, null)
                : "number" == typeof o[0]
                  ? U(o, null)
                  : A(o, null)
              : o),
          );
        }
        function Y(t) {
          let e = {};
          for (let n of t) for (let [t, o] of n) e[t] = o;
          return e;
        }
        function K(t, e) {
          let n;
          return (
            (n =
              void 0 !== e.namespace && null !== e.namespace
                ? t.outputDocument.createElementNS(e.namespace, e.name)
                : t.outputDocument.createElement(e.name)),
            n
          );
        }
        function V(t, e) {
          let n;
          return (
            (n = e.namespace
              ? t.outputDocument.createAttributeNS(e.namespace, e.name)
              : t.outputDocument.createAttribute(e.name)),
            (n.value = e.value),
            n
          );
        }
        function H(t) {
          const e = t.ownerDocument || t;
          return function n(o) {
            if (Array.isArray(o)) {
              let t = !0;
              const e = o.length > 0 && !o[0].nodeType;
              for (let a of o) t ? (t = !1) : e && n(" "), n(a);
            } else if ("string" == typeof o) {
              if (t.nodeType !== x)
                if (t.lastChild && t.lastChild.nodeType === p)
                  t.lastChild.appendData(o);
                else if ("" !== o) {
                  const n = e.createTextNode(o);
                  n && t.append(n);
                }
            } else if (o.nodeType === u) {
              let n = e.importNode(o, !0);
              t.setAttributeNode(n);
            } else {
              if (o.nodeType === x) {
                const t = o;
                return (o = o.documentElement) ? (n(o), H(o)) : H(t);
              }
              if (o.nodeType === h) n(o.childNodes);
              else if (o.nodeType === p) n(o.data);
              else {
                if (o.nodeType) {
                  let n = e.importNode(o, !0);
                  return t.append(n), H(n);
                }
                n(`${o}`);
              }
            }
          };
        }
        function G(t) {
          return function (e) {
            if (
              (t.push(e), e.nodeType && (e.nodeType === x || e.nodeType === l))
            )
              return H(e);
          };
        }
        function z(t, e, n) {
          if (e)
            return e
              .map((e) =>
                "string" == typeof e
                  ? e
                  : (0, s.evaluateXPathToString)(
                      e.xpath,
                      t.contextItem,
                      void 0,
                      Y(t.variableScopes),
                      { currentContext: t, namespaceResolver: n },
                    ),
              )
              .join("");
        }
        function B(t, e, n, o) {
          o || (o = "string" == typeof e ? [" "] : []);
          const a = z(t, o, n);
          return "string" == typeof e
            ? (0, s.evaluateXPath)(
                e,
                t.contextItem,
                void 0,
                Y(t.variableScopes),
                s.evaluateXPath.STRINGS_TYPE,
                { currentContext: t, namespaceResolver: n },
              ).join(a)
            : (function (t) {
                let e = [];
                return (
                  w(t, (t) => {
                    t.nodeType === p && "" !== t.data && (e = e.concat(t.data));
                  }),
                  e
                );
              })(J(t, e)).join(a);
        }
        function q(t, e) {
          return "string" == typeof e.content
            ? (0, s.evaluateXPath)(
                e.content,
                t.contextItem,
                void 0,
                Y(t.variableScopes),
                s.evaluateXPath.ANY_TYPE,
                { currentContext: t, namespaceResolver: y(e.namespaces) },
              )
            : null == e.content
              ? ""
              : e.as
                ? (function (t, e) {
                    let n = [];
                    return (
                      e(
                        Object.assign(Object.assign({}, t), {
                          append: G(n),
                          mode: "#default",
                          variableScopes: M(t.variableScopes),
                        }),
                      ),
                      1 === n.length ? n[0] : n
                    );
                  })(t, e.content)
                : J(t, e.content);
        }
        function J(t, e) {
          const n = t.outputDocument.createDocumentFragment();
          if (
            (e(
              Object.assign(Object.assign({}, t), {
                append: H(n),
                outputDocument: t.outputDocument,
                mode: "#default",
                variableScopes: M(t.variableScopes),
              }),
            ),
            1 === n.childNodes.length && 1 === n.childElementCount)
          ) {
            const e = t.outputDocument.implementation.createDocument(
              null,
              null,
              null,
            );
            return e.appendChild(n.firstChild), e;
          }
          return n;
        }
        function W(t, e, n) {
          let o = n;
          if (void 0 !== o) return o;
          let a = "";
          return t.includes(":") && (a = t.split(":")[0]), (o = e(a)), o;
        }
        (0, i.registerFunctions)();
      },
      703: (t, e, n) => {
        n(898), n(594);
        let o = n(821);
        function a(t, e) {
          e = o.setParamDefaults(t, e);
          let n = [],
            a = [],
            r = new Map();
          r.set("#default", { document: e.outputDocument });
          let s = new Map(),
            c = new Map(),
            i = {
              outputDocument: e.outputDocument,
              append: o.mkNodeAppender(e.outputNode),
              resultDocuments: r,
              contextItem: t,
              mode: e.initialMode,
              templates: n,
              variableScopes: [new Map()],
              inputURL: e.inputURL,
              keys: s,
              outputDefinitions: c,
              patternMatchCache: new Map(),
              stylesheetParams: e.stylesheetParams,
            };
          return (
            n.push({
              match: "/ | @* | node()",
              matchFunction: void 0,
              name: void 0,
              modes: ["#default"],
              allowedParams: [],
              apply: (t) => {
                o.copy(
                  t,
                  {
                    namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
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
            }),
            n.push({
              match: "xsl:variable | xsl:with-param",
              matchFunction: void 0,
              name: void 0,
              modes: ["#default"],
              allowedParams: [],
              apply: (t) => {
                o.ifX(
                  t,
                  {
                    test: "@select and (node() or text()) ",
                    namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
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
                        o.literalText(t, "XTSE0620: Variable or parameter "),
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
                          o.literalText(t, " has both @select and children.");
                      },
                    );
                  },
                ),
                  o.nextMatch(t, {
                    params: [],
                    namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  });
              },
              namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
              priority: void 0,
              importPrecedence: 1,
            }),
            n.push({
              match: "xsl:template",
              matchFunction: o.compileMatchFunction(
                '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-template");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "template" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
              ),
              name: void 0,
              modes: ["#default"],
              allowedParams: [],
              apply: (t) => {
                o.ifX(
                  t,
                  {
                    test: "not(@match) and (@mode or @priority)",
                    namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
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
                    namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  });
              },
              namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
              priority: void 0,
              importPrecedence: 1,
            }),
            n.push({
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
                    namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
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
            }),
            n.push({
              match: "xsl:template/xsl:param",
              matchFunction: o.compileMatchFunction(
                '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-template");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "template" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tfor (let contextItem2 = domFacade.getFirstChild(contextItem1, "name-param");\n\t\t\t\t\t\t\tcontextItem2;\n\t\t\t\t\t\t\tcontextItem2 = domFacade.getNextSibling(contextItem2, "name-param")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem2.nodeType\n\t\t\t\t\t\t&& contextItem2.nodeType === /*ELEMENT_NODE*/ 1 && contextItem2.localName === "param" && (contextItem2.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem2;\n\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
              ),
              name: void 0,
              modes: ["#default"],
              allowedParams: [],
              apply: (t) => {
                o.ifX(
                  t,
                  {
                    test: "preceding-sibling::*[not(self::xsl:param)]",
                    namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
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
                    namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  });
              },
              namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
              priority: void 0,
              importPrecedence: 1,
            }),
            o.sortSortable(n),
            o.sortSortable(a),
            o.stripSpace(t, a),
            o.processNode(i, [], {
              xsl: "http://www.w3.org/1999/XSL/Transform",
            }),
            r
          );
        }
        (t.exports.transform = a), (global.transform = a);
      },
      594: (t) => {
        "use strict";
        t.exports = require("fontoxpath");
      },
      898: (t) => {
        "use strict";
        t.exports = require("slimdom");
      },
      896: (t) => {
        "use strict";
        t.exports = require("fs");
      },
      16: (t) => {
        "use strict";
        t.exports = require("url");
      },
    },
    e = {},
    n = (function n(o) {
      var a = e[o];
      if (void 0 !== a) return a.exports;
      var r = (e[o] = { exports: {} });
      return t[o].call(r.exports, r, r.exports, n), r.exports;
    })(703);
  module.exports = n.transform;
})();
