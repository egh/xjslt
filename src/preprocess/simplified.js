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
              r,
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
                u,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XPATH_NSURI, localName: "current-group" },
                [],
                "item()*",
                i,
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
          s = n(472);
        function r({ currentContext: e }) {
          return e.contextItem;
        }
        function c({ currentContext: e }, t) {
          return (0, s.urlToDom)(e, t);
        }
        function u({ currentContext: e }) {
          return e.currentGroupingKey;
        }
        function i({ currentContext: e }) {
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
            variableScopes: s,
            patternMatchCache: r,
          } = e;
          if (!o.has(t)) throw new Error("XTDE1260");
          return (
            o
              .get(t)
              .lookup(
                r,
                a.ownerDocument,
                s,
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
      472: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.urlToDom = function (e, t) {
            const n = e.inputURL ? (0, o.resolve)(e.inputURL.toString(), t) : t;
            return n.startsWith("file:")
              ? s.parseXmlDocument(
                  (0, a.readFileSync)(
                    (0, o.fileURLToPath)(new URL(n)),
                  ).toString(),
                )
              : void 0;
          });
        const o = n(16),
          a = n(896),
          s = n(898);
      },
      821: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.Key = t.XPATH_NSURI = t.XMLNS_NSURI = t.XSLT1_NSURI = void 0),
          (t.visitNodes = d),
          (t.mkResolver = f),
          (t.computeDefaultPriority = T),
          (t.sortSortable = function (e) {
            e.reverse(),
              e.sort(
                (e, t) =>
                  (t.priority || T(t.match)) - (e.priority || T(e.match)),
              ),
              e.sort((e, t) => e.importPrecedence - t.importPrecedence);
          }),
          (t.processNode = P),
          (t.nextMatch = function (e, t) {
            const n = e.nextMatches;
            if (n) {
              const o = n.next();
              o.done ||
                D(
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
                D(
                  o.value,
                  Object.assign(Object.assign({}, e), { nextMatches: n }),
                  t.params,
                );
            }
          }),
          (t.sortNodes = X),
          (t.applyTemplates = E),
          (t.callTemplate = function (e, t) {
            for (let n of e.templates)
              if (void 0 !== n.name && t.name === n.name)
                return D(n, e, t.params);
            throw new Error(`Cannot find a template named ${t.name}`);
          }),
          (t.functionX = function (e, t, n) {
            const a = t.params.map((e) => "item()"),
              s = t.params.map((e) => e.name);
            (0, o.registerCustomXPathFunction)(
              { namespaceURI: t.namespace, localName: t.name },
              a,
              t.as || "item()",
              ({ currentContext: e }, ...t) => {
                let o = new Map();
                return (
                  s.forEach((e, n) => o.set(e, t[n])),
                  G(
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
            let s;
            if (a.nodeType === c) {
              s = e.outputDocument.createElementNS(
                a.namespaceURI,
                a.prefix ? `${a.prefix}:${a.localName}` : a.localName,
              );
              for (let n of a.attributes)
                if (n.namespaceURI === t.XMLNS_NSURI) {
                  const o = n.localName;
                  s.setAttributeNode(
                    e.outputDocument.importNode(
                      a.getAttributeNodeNS(t.XMLNS_NSURI, o),
                    ),
                  );
                }
            } else
              s = a.nodeType === m ? void 0 : e.outputDocument.importNode(a);
            s &&
              (s.nodeType === u
                ? e.outputNode.setAttributeNode(s)
                : e.outputNode.append(s)),
              o &&
                o(
                  Object.assign(Object.assign({}, e), {
                    outputNode: s || e.outputNode,
                  }),
                );
          }),
          (t.copyOf = function (e, t, n) {
            let a = (0, o.evaluateXPath)(
              t.select,
              e.contextItem,
              void 0,
              L(e.variableScopes),
              o.evaluateXPath.ALL_RESULTS_TYPE,
              { currentContext: e, namespaceResolver: f(t.namespaces) },
            );
            for (let t of a) A(t, e);
          }),
          (t.valueOf = I),
          (t.message = function (e, t, n) {
            console.log(H(e, t.select || n, f(t.namespaces))),
              "yes" === t.terminate && process.exit();
          }),
          (t.text = function (e, t, n) {
            A(H(e, n, f(t.namespaces), [""]), e);
          }),
          (t.variable = function (e, t) {
            U(e.variableScopes, t.name, V(e, t));
          }),
          (t.param = function (e, t) {
            U(e.variableScopes, t.name, e.stylesheetParams[t.name] || V(e, t));
          }),
          (t.extendScope = C),
          (t.setVariable = U),
          (t.mergeVariableScopes = L),
          (t.literalText = function (e, t) {
            _(e, t);
          }),
          (t.sequence = function (e, t) {
            F(
              (0, o.evaluateXPath)(
                t.select,
                e.contextItem,
                void 0,
                L(e.variableScopes),
                o.evaluateXPath.ALL_RESULTS_TYPE,
                { currentContext: e, namespaceResolver: f(t.namespaces) },
              ),
              e,
            );
          }),
          (t.buildNode = k),
          (t.buildAttributeNode = K),
          (t.literalElement = function (e, t, n) {
            let o = k(e, { name: t.name, namespace: t.namespace });
            const a = f(t.namespaces);
            for (let n of t.attributes) {
              const t = Y(e, n.value, a),
                s = K(e, { name: n.name, namespace: n.namespace, value: t });
              o.setAttributeNode(s);
            }
            e.outputNode.append(o),
              n(
                Object.assign(Object.assign({}, e), {
                  outputNode: o,
                  variableScopes: C(e.variableScopes),
                }),
              );
          }),
          (t.attribute = function (e, t, n) {
            const o = f(t.namespaces),
              a = Y(e, t.name, o),
              s = K(e, {
                name: a,
                namespace: z(a, o, Y(e, t.namespace, o)),
                value: H(e, t.select || n, o, t.separator),
              });
            e.outputNode.setAttributeNode(s);
          }),
          (t.processingInstruction = function (e, t, n) {
            const o = Y(e, t.name, f(t.namespaces)),
              a = H(e, t.select || n, f(t.namespaces), [""]).trimStart();
            e.outputNode.append(
              e.outputDocument.createProcessingInstruction(o, a),
            );
          }),
          (t.comment = function (e, t, n) {
            const o = H(e, t.select || n, f(t.namespaces), [""]);
            e.outputNode.append(e.outputDocument.createComment(o));
          }),
          (t.namespace = function (e, n, o) {
            const a = f(n.namespaces),
              s = Y(e, n.name, a),
              r = H(e, n.select || o, a, [""]),
              c = K(e, {
                name: `xmlns:${s}`,
                namespace: t.XMLNS_NSURI,
                value: r,
              });
            e.outputNode.setAttributeNode(c);
          }),
          (t.element = function (e, t, n) {
            const o = f(t.namespaces),
              a = Y(e, t.name, o),
              s = Y(e, t.namespace, o);
            let r = k(e, { name: a, namespace: z(a, f(t.namespaces), s) });
            e.outputNode.append(r),
              n(
                Object.assign(Object.assign({}, e), {
                  outputNode: r,
                  variableScopes: C(e.variableScopes),
                }),
              );
          }),
          (t.ifX = function (e, t, n) {
            (0, o.evaluateXPathToBoolean)(
              t.test,
              e.contextItem,
              void 0,
              L(e.variableScopes),
              { currentContext: e, namespaceResolver: f(t.namespaces) },
            ) && n(e);
          }),
          (t.choose = function (e, t) {
            for (let n of t) {
              if (!n.test) return n.apply(e);
              if (
                (0, o.evaluateXPathToBoolean)(
                  n.test,
                  e.contextItem,
                  void 0,
                  L(e.variableScopes),
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
                outputNode: o,
                mode: "#default",
                variableScopes: C(e.variableScopes),
              }),
            );
          }),
          (t.forEach = function (e, t, n) {
            const a = f(t.namespaces),
              s = (0, o.evaluateXPath)(
                t.select,
                e.contextItem,
                void 0,
                L(e.variableScopes),
                o.evaluateXPath.ALL_RESULTS_TYPE,
                { currentContext: e, namespaceResolver: a },
              );
            if (s && Symbol.iterator in Object(s))
              for (let o of X(e, s, t.sortKeyComponents, a))
                n(
                  Object.assign(Object.assign({}, e), {
                    contextItem: o,
                    variableScopes: C(e.variableScopes),
                  }),
                );
          }),
          (t.forEachGroup = function (e, t, n) {
            const a = f(t.namespaces),
              s = L(e.variableScopes),
              r = (0, o.evaluateXPathToNodes)(
                t.select,
                e.contextItem,
                void 0,
                s,
                { currentContext: e, namespaceResolver: a },
              );
            if (r && Symbol.iterator in Object(r)) {
              let s = (function (e, t, n, a) {
                const s = L(e.variableScopes);
                let r = new Map();
                for (let c of t) {
                  const t = (0, o.evaluateXPathToString)(n, c, void 0, s, {
                    currentContext: e,
                    namespaceResolver: a,
                  });
                  r.has(t) || r.set(t, []), r.set(t, r.get(t).concat(c));
                }
                return r;
              })(e, r, t.groupBy, a);
              for (let [t, o] of s)
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
          (t.resultDocument = function (e, t, n) {
            const o = f(t.namespaces);
            function a(t) {
              return Y(e, t, o);
            }
            const s = a(t.format);
            let c = (0, r.mkOutputDefinition)({
              omitXmlDeclaration: a(t.omitXmlDeclaration),
              doctypePublic: a(t.doctypePublic),
              doctypeSystem: a(t.doctypeSystem),
              standalone: a(t.standalone),
            });
            Object.keys(c).forEach((e) => {
              c[e] || delete c[e];
            });
            const u = Object.assign(
                Object.assign({}, s ? e.outputDefinitions.get(s) : {}),
                c,
              ),
              i = a(t.href);
            let l = null;
            if (
              ((u.doctypePublic || u.doctypeSystem) &&
                (l = e.outputDocument.implementation.createDocumentType(
                  "out",
                  u.doctypePublic || "",
                  u.doctypeSystem || "",
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
                Object.assign(Object.assign({}, u), { document: t }),
              ),
                n(
                  Object.assign(Object.assign({}, e), {
                    outputDocument: t,
                    outputNode: t,
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
                (e.outputNode = t)),
                e.resultDocuments.set(
                  "#default",
                  Object.assign(Object.assign({}, u), { document: t }),
                ),
                n(e);
            }
          }),
          (t.stripSpace = function (e, t) {
            const n = RegExp("^[ \n\r\t]+$");
            let o = [];
            !(function e(a) {
              if (a.nodeType === i)
                n.test(a.textContent) &&
                  (function (e, t) {
                    let n = new Map();
                    for (const o of t) {
                      const t = f(o.namespaces);
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
          (t.evaluateAttributeValueTemplate = Y),
          (t.determineNamespace = z),
          (t.serialize = function (e) {
            const t = new a.XMLSerializer();
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
        const o = n(594),
          a = n(898),
          s = n(379),
          r = n(777);
        (t.XSLT1_NSURI = "http://www.w3.org/1999/XSL/Transform"),
          (t.XMLNS_NSURI = "http://www.w3.org/2000/xmlns/"),
          (t.XPATH_NSURI = "http://www.w3.org/2005/xpath-functions");
        const c = 1,
          u = 2,
          i = 3,
          l = 7,
          p = 8,
          m = 9;
        function d(e, t) {
          for (let n of e.childNodes) d(n, t);
          t(e);
        }
        function f(e) {
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
              d(t, (t) => {
                if (
                  "string" == typeof this.use &&
                  w(e, this.match, void 0, t, n, f(this.namespaces))
                ) {
                  let e = (0, o.evaluateXPathToString)(this.use, t);
                  a.has(e) || a.set(e, []), a.set(e, a.get(e).concat(t));
                }
              }),
              a
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
        const g = new RegExp(/^[a-z |-]+$/),
          h = new RegExp(/^@[a-z]+$/),
          x = new RegExp(/text\(\)|node\(\)/),
          v = new RegExp(/@|attribute|node/);
        function w(e, t, n, a, s, r) {
          let d = a;
          if (
            a &&
            !(function (e, t) {
              return (
                (t.nodeType === u && !v.exec(e)) ||
                (t.nodeType === i && !x.exec(e)) ||
                !(!g.exec(e) || t.nodeType === c) ||
                !(!h.exec(e) || t.nodeType === u)
              );
            })(t, a)
          ) {
            if (
              (function (e, t) {
                return "text()|@*" === e
                  ? t.nodeType === i || t.nodeType === u
                  : "processing-instruction()|comment()" === e
                    ? t.nodeType === l || t.nodeType === p
                    : "*|/" === e
                      ? t.nodeType === c || t.nodeType === m
                      : "text()" === e
                        ? t.nodeType === i
                        : "/" === e && t.nodeType === m;
              })(t, a)
            )
              return !0;
            for (; d; ) {
              const c = (0, o.evaluateXPathToString)("generate-id(.)", d);
              if (
                ((w = `${t}-${c}`),
                (b = () =>
                  n
                    ? new Set((0, o.executeJavaScriptCompiledXPath)(n, d))
                    : new Set(
                        (0, o.evaluateXPathToNodes)(t, d, void 0, L(s), {
                          namespaceResolver: r,
                        }),
                      )),
                (f = e).has(w) || f.set(w, b()),
                f.get(w)).has(a)
              )
                return !0;
              d = d.parentNode || (d.nodeType === u && d.ownerElement);
            }
          }
          var f, w, b;
          return !1;
        }
        const b = String.raw`[^,:\(\)\*\[\]/]`,
          y = String.raw`(child::|attribute::|@)?`,
          S = String.raw`(document-node\()?`,
          N = new Map([
            [new RegExp(String.raw`^\s*/\s*$`), -0.5],
            [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${S}${y}processing-instruction`), 0],
            [new RegExp(String.raw`^\s*${S}${y}element\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${S}${y}attribute\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${S}${y}element\(${b}+\)\)?\s*$`), 0],
            [
              new RegExp(String.raw`^\s*${S}${y}element\(\*,\s*${b}+\)\)?\s*$`),
              0,
            ],
            [new RegExp(String.raw`^\s*${S}${y}attribute\(${b}+\)\)?\s*$`), 0],
            [
              new RegExp(
                String.raw`^\s*${S}${y}attribute\(\*,\s*${b}+\)\)?\s*$`,
              ),
              0,
            ],
            [
              new RegExp(
                String.raw`^\s*${S}${y}element\(${b}+,\s*${b}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${S}${y}attribute\(${b}+,\s*${b}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${S}${y}schema-element\(${b}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${S}${y}schema-attribute\(${b}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [new RegExp(String.raw`^\s*document-node\(\)\s*$`), -0.5],
            [
              new RegExp(
                String.raw`^\s*${y}(node\(\)|text\(\)|comment\(\))\s*$`,
              ),
              -0.5,
            ],
            [new RegExp(String.raw`^\s*${y}(${b}:)?\*\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${y}\*:${b}+\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${y}${b}+\s*$`), 0],
          ]);
        function T(e) {
          if (e && e.includes("|"))
            return Math.max(
              ...e
                .split("|")
                .filter((e) => "" !== e)
                .map((e) => T(e)),
            );
          for (let [t, n] of N) if (t.test(e)) return n;
          return 0.5;
        }
        function P(e, t, n) {
          let o = (function* (e, t, n, o, a, s) {
            for (let r of n)
              r.match &&
                ("#all" === r.modes[0] || r.modes.includes(a)) &&
                w(e, r.match, r.matchFunction, t, o, f(s)) &&
                (yield r);
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
            D(
              a.value,
              Object.assign(Object.assign({}, e), { nextMatches: o }),
              t,
            );
        }
        function R(e, t, n, a) {
          let s;
          return (
            (s =
              "number" === n.dataType && "string" == typeof n.sortKey
                ? (function (e, t, n, a) {
                    let s = [];
                    for (let r of t) {
                      let t = (0, o.evaluateXPathToNumber)(
                        `number(${n.sortKey})`,
                        r,
                        void 0,
                        L(e.variableScopes),
                        { currentContext: e, namespaceResolver: a },
                      );
                      isNaN(t) && (t = Number.MIN_SAFE_INTEGER),
                        s.push({ key: t, item: r });
                    }
                    return (
                      s.sort((e, t) => e.key - t.key),
                      s.sort((e, t) => e.key - t.key).map((e) => e.item)
                    );
                  })(e, t, n, a)
                : (function (e, t, n, o) {
                    let a = [];
                    for (let s of t) {
                      const t = Object.assign(Object.assign({}, e), {
                        contextItem: s,
                      });
                      a.push({ key: H(t, n.sortKey, o), item: s });
                    }
                    const s = n.lang && Y(e, n.lang, o);
                    let r = new Intl.Collator(s).compare;
                    return a.sort((e, t) => r(e.key, t.key)).map((e) => e.item);
                  })(e, t, n, a)),
            "descending" === Y(e, n.order, a) && s.reverse(),
            s
          );
        }
        function X(e, t, n, o) {
          if (n) for (let a of [...n].reverse()) t = R(e, t, a, o);
          return t;
        }
        function $(e, t) {
          for (let n of t) if (n.name === e) return n;
        }
        function D(e, t, n) {
          let o = C(t.variableScopes);
          for (let a of e.allowedParams) {
            let e = $(a.name, n);
            void 0 !== e ? U(o, e.name, V(t, e)) : U(o, a.name, V(t, a));
          }
          return e.apply(
            Object.assign(Object.assign({}, t), { variableScopes: o }),
          );
        }
        function E(e, t) {
          const n = f(t.namespaces),
            a = (0, o.evaluateXPathToNodes)(
              t.select,
              e.contextItem,
              void 0,
              L(e.variableScopes),
              { currentContext: e, namespaceResolver: n },
            );
          let s = t.mode || "#default";
          "#current" === s && (s = e.mode);
          for (let o of X(e, a, t.sortKeyComponents, n))
            P(
              Object.assign(Object.assign({}, e), {
                mode: s,
                contextItem: o,
                variableScopes: C(e.variableScopes),
              }),
              t.params,
              t.namespaces,
            );
        }
        function I(e, t, n) {
          A(H(e, t.select || n, f(t.namespaces), t.separator), e);
        }
        function C(e) {
          return e.concat([new Map()]);
        }
        const j = (0, o.createTypedValueFactory)("xs:numeric*"),
          O = (0, o.createTypedValueFactory)("xs:string*"),
          M = (0, o.createTypedValueFactory)("item()*");
        function U(e, t, n) {
          var o;
          e[e.length - 1].set(
            t,
            ((o = n),
            Array.isArray(o)
              ? "string" == typeof o[0]
                ? O(o, null)
                : "number" == typeof o[0]
                  ? j(o, null)
                  : M(o, null)
              : o),
          );
        }
        function L(e) {
          let t = {};
          for (let n of e) for (let [e, o] of n) t[e] = o;
          return t;
        }
        function _(e, t) {
          if (e.outputNode.nodeType !== m)
            if (e.outputNode.lastChild && e.outputNode.lastChild.nodeType === i)
              e.outputNode.lastChild.appendData(t);
            else {
              const n = e.outputDocument.createTextNode(t);
              n && e.outputNode.append(n);
            }
        }
        function A(e, t) {
          if (e.nodeType === u) {
            let n = t.outputDocument.importNode(e, !0);
            t.outputNode.setAttributeNode(n);
          } else if (e.nodeType === m)
            "xsl:document" === (e = e.documentElement).localName
              ? F(e.childNodes, t)
              : A(e, t);
          else if (e.nodeType === i) _(t, e.data);
          else if (e.nodeType) {
            let n = t.outputDocument.importNode(e, !0);
            t.outputNode.append(n);
          } else {
            let n = `${e}`;
            if ("" !== n) return _(t, n), !0;
          }
          return !1;
        }
        function F(e, t) {
          let n = !1;
          for (let o of e) n && _(t, " "), (n = A(o, t));
        }
        function k(e, t) {
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
        function Y(e, t, n) {
          if (t)
            return t
              .map((t) =>
                "string" == typeof t
                  ? t
                  : (0, o.evaluateXPathToString)(
                      t.xpath,
                      e.contextItem,
                      void 0,
                      L(e.variableScopes),
                      { currentContext: e, namespaceResolver: n },
                    ),
              )
              .join("");
        }
        function H(e, t, n, a) {
          a || (a = "string" == typeof t ? [" "] : []);
          const s = Y(e, a, n);
          return "string" == typeof t
            ? (0, o.evaluateXPath)(
                t,
                e.contextItem,
                void 0,
                L(e.variableScopes),
                o.evaluateXPath.STRINGS_TYPE,
                { currentContext: e, namespaceResolver: n },
              ).join(s)
            : (function (e) {
                let t = [];
                return (
                  (function e(n) {
                    if (
                      (n.nodeType === i &&
                        "" !== n.data &&
                        (t = t.concat(n.data)),
                      n.childNodes)
                    )
                      for (let t of n.childNodes) e(t);
                  })(e),
                  t
                );
              })(G(e, t)).join(s);
        }
        function V(e, t) {
          return "string" == typeof t.content
            ? (0, o.evaluateXPath)(
                t.content,
                e.contextItem,
                void 0,
                L(e.variableScopes),
                o.evaluateXPath.ANY_TYPE,
                { currentContext: e, namespaceResolver: f(t.namespaces) },
              )
            : null == t.content
              ? ""
              : G(e, t.content);
        }
        function G(e, t) {
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
                outputNode: n.documentElement,
                mode: "#default",
                variableScopes: C(e.variableScopes),
              }),
            ),
            n
          );
        }
        function z(e, t, n) {
          let o = n;
          if (void 0 !== o) return o;
          let a = "";
          return e.includes(":") && (a = e.split(":")[0]), (o = t(a)), o;
        }
        (0, s.registerFunctions)();
      },
      424: (e, t, n) => {
        n(898), n(594);
        let o = n(821);
        function a(e, t) {
          t = o.setParamDefaults(e, t);
          let n = [],
            a = [],
            s = new Map();
          s.set("#default", { document: t.outputDocument });
          let r = new Map(),
            c = new Map(),
            u = {
              outputDocument: t.outputDocument,
              outputNode: t.outputNode,
              resultDocuments: s,
              contextItem: e,
              mode: t.initialMode,
              templates: n,
              variableScopes: [new Map()],
              inputURL: t.inputURL,
              keys: r,
              outputDefinitions: c,
              patternMatchCache: new Map(),
              stylesheetParams: t.stylesheetParams,
            };
          return (
            n.push({
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
                    namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  },
                  (e) => {
                    o.attribute(
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
                          o.attribute(
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
                            );
                        },
                      );
                  },
                );
              },
              namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
              priority: void 0,
              importPrecedence: 1,
            }),
            n.push({
              match: "@* | node()",
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
            o.sortSortable(n),
            o.sortSortable(a),
            o.stripSpace(e, a),
            o.processNode(u, [], {
              xsl: "http://www.w3.org/1999/XSL/Transform",
            }),
            s
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
      var s = (t[o] = { exports: {} });
      return e[o](s, s.exports, n), s.exports;
    })(424);
  module.exports = n.transform;
})();
