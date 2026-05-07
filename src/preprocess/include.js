(() => {
  var e = {
      326(e, t, n) {
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
                  match: {
                    xpath: "xsl:include",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-include");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-include")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "include" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  name: void 0,
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (e) => {
                    (o.variable(e, {
                      name: "doc",
                      content: "doc(@href)",
                      namespaces: {
                        xsl: "http://www.w3.org/1999/XSL/Transform",
                      },
                      as: void 0,
                    }),
                      o.applyTemplates(e, {
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
                  priority: void 0,
                  importPrecedence: 1,
                },
                {
                  match: { xpath: "/ | @* | node()", compiled: void 0 },
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
              ],
              variableScopes: [new Map()],
              inputURL: t.inputURL,
              readDocument: t.readDocument,
              keys: r,
              outputDefinitions: a,
              decimalFormats: s,
              patternMatchCache: new Map(),
              stylesheetParams: t.stylesheetParams,
            };
          return (
            o.stripSpace(e, []),
            o.processNode(i, [], {
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
          (t.DEFAULT_DECIMAL_FORMAT =
            t.NodeType =
            t.DEFAULT_PRIORITIES =
            t.XJSLT_NSURI =
            t.XPATH_NSURI =
            t.XMLNS_NSURI =
            t.XSLT1_NSURI =
              void 0),
          (t.isNodeGroup = s),
          (t.isNodeGroupArray = function (e) {
            return Array.isArray(e) && (0 === e.length || s(e[0]));
          }));
        const n = String.raw`[^,:\(\)\*\[\]/]`,
          o = String.raw`(child::|attribute::|@)?`,
          r = String.raw`(document-node\()?`;
        var a;
        function s(e) {
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
          })(a || (t.NodeType = a = {})),
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
          }));
      },
      379(e, t, n) {
        "use strict";
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.functionNameResolver = T),
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
                h,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "base-uri" },
                ["node()?"],
                "xs:string?",
                h,
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
                        functionNameResolver: T,
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
          for (const e of r) a = URL.parse(e, a) || e;
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
        const x = [
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
        function T({ prefix: e, localName: t }, n) {
          return (e && "fn" !== e) || !x.includes(t)
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
            g = -1;
          for (; s < e.length && e[s] !== r; ) {
            const t = e[s];
            if (t === n) (d++, f++);
            else if (t === o) f++;
            else {
              if (t !== a) break;
              g = f;
            }
            s++;
          }
          g >= 0 && (m = f - g);
          let h = 0,
            v = 0;
          if (s < e.length && e[s] === r)
            for (s++; s < e.length; ) {
              const t = e[s];
              if (t === n) (h++, v++);
              else {
                if (t !== o) break;
                v++;
              }
              s++;
            }
          const N = l();
          if (s < e.length)
            throw new Error(
              `XTDE1310: Active characters after picture string suffix: ${e.slice(s)}`,
            );
          return {
            prefix: p,
            suffix: N,
            integerMinDigits: Math.max(d, 1),
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
          (t.computeDefaultPriority = c),
          (t.sortSortable = function (e) {
            return (
              e.reverse(),
              e.sort((e, t) => {
                var n, o;
                return (
                  (t.priority ||
                    c(
                      null === (n = t.match) || void 0 === n ? void 0 : n.xpath,
                    )) -
                  (e.priority ||
                    c(
                      null === (o = e.match) || void 0 === o ? void 0 : o.xpath,
                    ))
                );
              }),
              e.sort((e, t) => e.importPrecedence - t.importPrecedence),
              e
            );
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
        function c(e) {
          if (e && e.includes("|"))
            return Math.max(
              ...e
                .split("|")
                .filter((e) => "" !== e)
                .map((e) => c(e)),
            );
          for (let [t, n] of i) if (t.test(e)) return n;
          return 0.5;
        }
      },
      472(e, t, n) {
        "use strict";
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.urlToDom = function (e, t) {
            if (!e.readDocument) return;
            const n = e.inputURL ? (0, o.resolve)(e.inputURL.toString(), t) : t;
            return e.readDocument(n);
          }));
        const o = n(16);
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
          (t.visitNodes = d),
          (t.processNode = S),
          (t.nextMatch = function (e, t) {
            const n = e.nextMatches;
            if (n) {
              const o = n.next();
              o.done ||
                I(
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
                I(
                  o.value,
                  Object.assign(Object.assign({}, e), { nextMatches: n }),
                  t.params,
                );
            }
          }),
          (t.sort = E),
          (t.applyTemplates = C),
          (t.callTemplate = function (e, t) {
            for (let n of e.templates)
              if (void 0 !== n.name && t.name === n.name)
                return I(n, e, t.params);
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
                  Y(
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
          (t.copyOf = function (e, t, n) {
            let o = (0, i.evaluateXPath)(
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
            for (let t of o) e.append(t);
          }),
          (t.valueOf = P),
          (t.message = function (e, t, n) {
            const o = J(e, t.select || n, (0, p.mkResolver)(t.namespaces));
            if ("yes" === t.terminate) throw new Error(o);
            console.log(o);
          }),
          (t.text = function (e, t, n) {
            e.append(J(e, n, (0, p.mkResolver)(t.namespaces), [""]));
          }),
          (t.variable = function (e, t) {
            U(e.variableScopes, t.name, G(e, t));
          }),
          (t.param = function (e, t) {
            U(e.variableScopes, t.name, e.stylesheetParams[t.name] || G(e, t));
          }),
          (t.extendScope = D),
          (t.wrapValue = O),
          (t.setVariable = U),
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
          (t.buildNode = _),
          (t.buildAttributeNode = A),
          (t.literalElement = function (e, t, n) {
            let o = _(e, { name: t.name, namespace: t.namespace });
            const r = (0, p.mkResolver)(t.namespaces);
            for (let n of t.attributes) {
              const t = z(e, n.value, r),
                a = A(e, { name: n.name, namespace: n.namespace, value: t });
              o.setAttributeNode(a);
            }
            const a = e.append(o);
            n(
              Object.assign(Object.assign({}, e), {
                variableScopes: D(e.variableScopes),
                append: a || e.append,
              }),
            );
          }),
          (t.attribute = function (e, t, n) {
            const o = (0, p.mkResolver)(t.namespaces),
              r = z(e, t.name, o),
              [a, s] = (0, p.determineNamespace)(r, o, z(e, t.namespace, o)),
              i = A(e, {
                name: r,
                namespace: a,
                value: J(e, t.select || n, o, t.separator),
              });
            e.append(i);
          }),
          (t.processingInstruction = function (e, t, n) {
            const o = z(e, t.name, (0, p.mkResolver)(t.namespaces)),
              r = J(e, t.select || n, (0, p.mkResolver)(t.namespaces), [
                "",
              ]).trimStart();
            e.append(e.outputDocument.createProcessingInstruction(o, r));
          }),
          (t.comment = function (e, t, n) {
            const o = J(e, t.select || n, (0, p.mkResolver)(t.namespaces), [
              "",
            ]);
            e.append(e.outputDocument.createComment(o));
          }),
          (t.namespace = function (e, t, n) {
            const o = (0, p.mkResolver)(t.namespaces),
              r = z(e, t.name, o),
              a = J(e, t.select || n, o, [""]),
              s = A(e, {
                name: `xmlns:${r}`,
                namespace: l.XMLNS_NSURI,
                value: a,
              });
            e.append(s);
          }),
          (t.element = function (e, t, n) {
            const o = (0, p.mkResolver)(t.namespaces);
            let r = z(e, t.name, o),
              a = z(e, t.namespace, o),
              s = _(e, {
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
                variableScopes: D(e.variableScopes),
              }),
            );
          }),
          (t.performSort = function (e, t) {
            const n = (0, p.mkResolver)(t.namespaces),
              o = (0, i.evaluateXPath)(
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
            if (o && Symbol.iterator in Object(o)) {
              const r = E(e, o, t.sortKeyComponents, n);
              for (let t of r) e.append(t);
            }
          }),
          (t.forEach = function (e, t, n) {
            const o = (0, p.mkResolver)(t.namespaces);
            let r = (0, i.evaluateXPath)(
              t.select,
              e.contextItem,
              void 0,
              L(e.variableScopes),
              i.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: e,
                namespaceResolver: o,
                functionNameResolver: u.functionNameResolver,
              },
            );
            r &&
              Symbol.iterator in Object(r) &&
              ((r = E(e, r, t.sortKeyComponents, o)),
              b(r, e, (e) => {
                n(
                  Object.assign(Object.assign({}, e), {
                    variableScopes: D(e.variableScopes),
                  }),
                );
              }));
          }),
          (t.forEachGroup = function (e, t, n) {
            const o = (0, p.mkResolver)(t.namespaces),
              r = L(e.variableScopes),
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
                    const r = L(e.variableScopes);
                    let a = [];
                    return (
                      b(t, e, (e) => {
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
                      const r = L(e.variableScopes);
                      let a = [],
                        s = null,
                        c = [];
                      return (
                        b(t, e, (e) => {
                          const t = e.contextItem,
                            l = (0, i.evaluateXPathToString)(n, t, void 0, r, {
                              currentContext: e,
                              namespaceResolver: o,
                              functionNameResolver: u.functionNameResolver,
                            });
                          l !== s
                            ? (j(a, c, s), (s = l), (c = [t]))
                            : c.push(t);
                        }),
                        j(a, c, s),
                        a
                      );
                    })(e, a, t.groupAdjacent, o))
                  : t.groupEndingWith
                    ? (r = (function (e, t, n, o) {
                        let r = [],
                          a = [];
                        return (
                          b(t, e, (e) => {
                            const t = e.contextItem;
                            (a.push(t),
                              T(
                                e.patternMatchCache,
                                n,
                                t,
                                e.variableScopes,
                                o,
                              ) && (j(r, a), (a = [])));
                          }),
                          j(r, a),
                          r
                        );
                      })(e, a, t.groupEndingWith, o))
                    : t.groupStartingWith &&
                      (r = (function (e, t, n, o) {
                        let r = [],
                          a = [];
                        return (
                          b(t, e, (e) => {
                            const t = e.contextItem;
                            (T(
                              e.patternMatchCache,
                              n,
                              t,
                              e.variableScopes,
                              o,
                            ) && (j(r, a), (a = [])),
                              a.push(t));
                          }),
                          j(r, a),
                          r
                        );
                      })(e, a, t.groupStartingWith, o)),
                (r = E(e, r, t.sortKeyComponents, o)),
                y(r, e, n));
            }
          }),
          (t.number = function (e, t) {
            const n = (0, p.mkResolver)(t.namespaces),
              o = L(e.variableScopes);
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
          (t.mkNodeAppender = F),
          (t.mkArrayAppender = k),
          (t.resultDocument = function (e, t, n) {
            const o = (0, p.mkResolver)(t.namespaces);
            function r(t) {
              return z(e, t, o);
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
                    append: F(t),
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
                (e.append = F(t))),
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
                      if (T(n, o.match, e, [], t)) return !o.preserve;
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
          (t.evaluateAttributeValueTemplate = z),
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
          m = n(845);
        function d(e, t) {
          if ((t(e), e.childNodes)) for (let n of e.childNodes) d(n, t);
        }
        function f(e) {
          return Array.isArray(e)
            ? e.map((e) => f(e)).join("")
            : e.nodeType
              ? e.textContent
              : e.toString();
        }
        function g(e, t, n, o) {
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
              d(t, (t) => {
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
              this.cache.get(t).get(f(o))
            );
          }
        };
        const h = new RegExp(/^[a-z |-]+$/),
          v = new RegExp(/^@[a-z]+$/),
          N = new RegExp(/text\(\)|node\(\)/),
          x = new RegExp(/@|attribute|node/);
        function T(e, t, n, o, r) {
          return !(
            !n ||
            (function (e, t) {
              return (
                (t.nodeType === l.NodeType.ATTRIBUTE && !x.exec(e)) ||
                (t.nodeType === l.NodeType.TEXT && !N.exec(e)) ||
                !(!h.exec(e) || t.nodeType === l.NodeType.ELEMENT) ||
                !(!v.exec(e) || t.nodeType === l.NodeType.ATTRIBUTE)
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
                (function (e, t, n, o, r) {
                  let a = n;
                  for (; a; ) {
                    const s = g(e, t.xpath, a, () =>
                      t.compiled
                        ? (0, i.executeJavaScriptCompiledXPath)(t.compiled, a)
                        : (0, i.evaluateXPathToNodes)(
                            t.xpath,
                            a,
                            void 0,
                            L(o),
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
                })(e, t, n, o, r))
          );
        }
        function S(e, t, n) {
          let o = (function* (e, t, n, o, r, a) {
            for (let s of n)
              s.match &&
                ("#all" === s.modes[0] || s.modes.includes(r)) &&
                T(e, s.match, t, o, (0, p.mkResolver)(a)) &&
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
                  },
                  {
                    match: { xpath: "text()|@*" },
                    apply: (t) => {
                      P(t, { select: ".", namespaces: e }, () => {});
                    },
                    allowedParams: [],
                    modes: ["#all"],
                    importPrecedence: Number.MAX_VALUE,
                  },
                  {
                    match: { xpath: "*|/" },
                    apply: (t) => {
                      C(t, {
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
            I(
              r.value,
              Object.assign(Object.assign({}, e), { nextMatches: o }),
              t,
            );
        }
        function R(e, t, n, o) {
          let r;
          return (
            (r =
              "number" === n.dataType
                ? (function (e, t, n, o) {
                    const r = w(t, e, (e) => {
                      let t;
                      const r = J(e, n.sortKey, o);
                      return (
                        (t = Number(r)),
                        isNaN(t) && (t = Number.MIN_SAFE_INTEGER),
                        t
                      );
                    });
                    return (0, p.zip)(r, t)
                      .sort((e, t) => e[0] - t[0])
                      .map((e) => e[1]);
                  })(e, t, n, o)
                : (function (e, t, n, o) {
                    const r = w(t, e, (e) => J(e, n.sortKey, o)),
                      a = n.lang && z(e, n.lang, o);
                    let s = new Intl.Collator(a).compare;
                    return (0, p.zip)(r, t)
                      .sort((e, t) => s(e[0], t[0]))
                      .map((e) => e[1]);
                  })(e, t, n, o)),
            "descending" === z(e, n.order, o) && r.reverse(),
            r
          );
        }
        function w(e, t, n) {
          if (e.length > 0)
            return (0, l.isNodeGroupArray)(e) ? y(e, t, n) : b(e, t, n);
        }
        function b(e, t, n) {
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
        function y(e, t, n) {
          let o = 0;
          return e.map((e) => {
            o++;
            const r = Object.assign(Object.assign({}, t), {
              contextItem: e.nodes[0],
              contextList: e.nodes,
              currentGroup: e,
              position: o,
              variableScopes: D(t.variableScopes),
            });
            return n(r);
          });
        }
        function E(e, t, n, o) {
          if (n) for (let r of [...n].reverse()) t = R(e, t, r, o);
          return t;
        }
        function $(e, t) {
          for (let n of t) if (n.name === e) return n;
        }
        function I(e, t, n) {
          let o = D(t.variableScopes);
          for (let r of e.allowedParams) {
            let e = $(r.name, n);
            void 0 !== e ? U(o, e.name, G(t, e)) : U(o, r.name, G(t, r));
          }
          return e.apply(
            Object.assign(Object.assign({}, t), { variableScopes: o }),
          );
        }
        function C(e, t) {
          const n = (0, p.mkResolver)(t.namespaces),
            o = (0, i.evaluateXPathToNodes)(
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
          let r = t.mode || "#default";
          ("#current" === r && (r = e.mode),
            b(E(e, o, t.sortKeyComponents, n), e, (e) => {
              S(
                Object.assign(Object.assign({}, e), {
                  mode: r,
                  variableScopes: D(e.variableScopes),
                }),
                t.params,
                t.namespaces,
              );
            }));
        }
        function P(e, t, n) {
          e.append(
            J(e, t.select || n, (0, p.mkResolver)(t.namespaces), t.separator),
          );
        }
        function D(e) {
          return e.concat([new Map()]);
        }
        let X = new Map();
        function M(e) {
          return (
            X.has(e) || X.set(e, (0, i.createTypedValueFactory)(e)),
            X.get(e)
          );
        }
        function O(e, t) {
          if (Array.isArray(e) && 0 === e.length) return M("item()*")([], null);
          if (t)
            try {
              return M(t)(e, null);
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
            M(`${r}${a}`)(e, null)
          );
        }
        function U(e, t, n) {
          e[e.length - 1].set(t, n);
        }
        function L(e) {
          let t = {};
          for (let n of e) for (let [e, o] of n) t[e] = o;
          return t;
        }
        function _(e, t) {
          let n;
          return (
            (n =
              void 0 !== t.namespace && null !== t.namespace
                ? e.outputDocument.createElementNS(t.namespace, t.name)
                : e.outputDocument.createElement(t.name)),
            n
          );
        }
        function A(e, t) {
          let n;
          return (
            (n = t.namespace
              ? e.outputDocument.createAttributeNS(t.namespace, t.name)
              : e.outputDocument.createAttribute(t.name)),
            (n.value = t.value),
            n
          );
        }
        function j(e, t, n) {
          t.length > 0 &&
            (null === n && (n = `group-${e.length + 1}`),
            e.push({ key: n, nodes: t }));
        }
        function F(e) {
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
                return (o = o.documentElement) ? (n(o), F(o)) : F(e);
              }
              if (o.nodeType === l.NodeType.DOCUMENT_FRAGMENT) n(o.childNodes);
              else if (o.nodeType === l.NodeType.TEXT) n(o.data);
              else {
                if (o.nodeType) {
                  let n = t.importNode(o, !0);
                  return (e.append(n), F(n));
                }
                n(`${o}`);
              }
            }
          };
        }
        function k(e) {
          return function (t) {
            if (
              (e.push(t),
              t.nodeType &&
                (t.nodeType === l.NodeType.DOCUMENT ||
                  t.nodeType === l.NodeType.ELEMENT))
            )
              return F(t);
          };
        }
        function z(e, t, n) {
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
        function J(e, t, n, o) {
          o || (o = "string" == typeof t ? [" "] : []);
          const r = z(e, o, n);
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
              ).join(r)
            : (function (e) {
                let t = [];
                return (
                  d(e, (e) => {
                    e.nodeType === l.NodeType.TEXT &&
                      "" !== e.data &&
                      (t = t.concat(e.data));
                  }),
                  t
                );
              })(Y(e, t)).join(r);
        }
        function G(e, t) {
          if ("string" == typeof t.content) {
            const n = t.as && t.as.match(/[\+\*]$/);
            let o = (0, i.evaluateXPath)(
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
            return (1 !== o.length || n || (o = o[0]), O(o, t.as));
          }
          return null == t.content
            ? ""
            : t.as
              ? O(
                  (function (e, t) {
                    let n = [];
                    return (
                      t(
                        Object.assign(Object.assign({}, e), {
                          append: k(n),
                          mode: "#default",
                          variableScopes: D(e.variableScopes),
                        }),
                      ),
                      1 === n.length ? n[0] : n
                    );
                  })(e, t.content),
                  t.as,
                )
              : Y(e, t.content);
        }
        function Y(e, t) {
          return (function (e, t) {
            const n = e.outputDocument.createDocumentFragment();
            if (
              (t(F(n)), 1 === n.childNodes.length && 1 === n.childElementCount)
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
    })(326);
  module.exports = n.transform;
})();
