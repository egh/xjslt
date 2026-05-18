(() => {
  var t = {
      754(t, e, n) {
        (n(898), n(594));
        let o = n(821);
        function r(t, e) {
          e = o.setParamDefaults(t, e);
          let n = new Map();
          n.set("#default", { document: e.outputDocument });
          let r = new Map(),
            s = new Map(),
            a = new Map(),
            i = {
              outputDocument: e.outputDocument,
              append: o.mkNodeAppender(e.outputNode),
              resultDocuments: n,
              contextItem: t,
              contextList: [t],
              position: 1,
              mode: e.initialMode,
              templates: [
                {
                  apply: (t) => {},
                  allowedParams: [],
                  modes: ["#all"],
                  namespaces: {
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                    xjslt: "https://www.e6h.org/xjslt",
                  },
                  importPrecedence: 17976931348623157e292,
                  declarationOrder: 5e-324,
                },
                {
                  apply: (t) => {
                    o.valueOf(t, {
                      select: ".",
                      separator: void 0,
                      namespaces: {
                        xsl: "http://www.w3.org/1999/XSL/Transform",
                        xjslt: "https://www.e6h.org/xjslt",
                      },
                    });
                  },
                  allowedParams: [],
                  modes: ["#all"],
                  namespaces: {
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                    xjslt: "https://www.e6h.org/xjslt",
                  },
                  importPrecedence: 17976931348623157e292,
                  declarationOrder: 5e-324,
                },
                {
                  apply: (t) => {
                    o.applyTemplates(t, {
                      select: "child::node()",
                      params: [],
                      mode: "#current",
                      namespaces: {
                        xsl: "http://www.w3.org/1999/XSL/Transform",
                        xjslt: "https://www.e6h.org/xjslt",
                      },
                      sortKeyComponents: [],
                    });
                  },
                  allowedParams: [],
                  modes: ["#all"],
                  namespaces: {
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                    xjslt: "https://www.e6h.org/xjslt",
                  },
                  importPrecedence: 17976931348623157e292,
                  declarationOrder: 5e-324,
                },
                {
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (t) => {
                    o.copy(
                      t,
                      {
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                          xjslt: "https://www.e6h.org/xjslt",
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
                            xjslt: "https://www.e6h.org/xjslt",
                          },
                        });
                      },
                    );
                  },
                  namespaces: {
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                    xjslt: "https://www.e6h.org/xjslt",
                  },
                  priority: -0.25,
                  declarationOrder: 1,
                  importPrecedence: 1,
                },
                {
                  modes: ["#default"],
                  allowedParams: [
                    {
                      name: "attribute-sets",
                      content: void 0,
                      namespaces: {},
                      as: void 0,
                    },
                  ],
                  apply: (t) => {
                    (o.variable(t, {
                      name: "root",
                      content: "/",
                      namespaces: {
                        xsl: "http://www.w3.org/1999/XSL/Transform",
                        xjslt: "https://www.e6h.org/xjslt",
                      },
                      as: void 0,
                    }),
                      o.forEach(
                        t,
                        {
                          select: "tokenize($attribute-sets, '\\s+')",
                          sortKeyComponents: [],
                          namespaces: {
                            xsl: "http://www.w3.org/1999/XSL/Transform",
                            xjslt: "https://www.e6h.org/xjslt",
                          },
                        },
                        (t) => {
                          (o.variable(t, {
                            name: "name",
                            content: ".",
                            namespaces: {
                              xsl: "http://www.w3.org/1999/XSL/Transform",
                              xjslt: "https://www.e6h.org/xjslt",
                            },
                            as: void 0,
                          }),
                            o.variable(t, {
                              name: "attribute-set",
                              content: "$root//xsl:attribute-set[@name=$name]",
                              namespaces: {
                                xsl: "http://www.w3.org/1999/XSL/Transform",
                                xjslt: "https://www.e6h.org/xjslt",
                              },
                              as: void 0,
                            }),
                            o.ifX(
                              t,
                              {
                                test: "not(boolean($attribute-set))",
                                namespaces: {
                                  xsl: "http://www.w3.org/1999/XSL/Transform",
                                  xjslt: "https://www.e6h.org/xjslt",
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
                                      xjslt: "https://www.e6h.org/xjslt",
                                    },
                                  },
                                  (t) => {
                                    o.literalText(
                                      t,
                                      "XTSE0710 Attribute set not found",
                                    );
                                  },
                                );
                              },
                            ),
                            o.copyOf(
                              t,
                              {
                                select:
                                  "$root//xsl:attribute-set[@name=$name]/node()",
                                namespaces: {
                                  xsl: "http://www.w3.org/1999/XSL/Transform",
                                  xjslt: "https://www.e6h.org/xjslt",
                                },
                              },
                              (t) => {},
                            ));
                        },
                      ));
                  },
                  namespaces: {
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                    xjslt: "https://www.e6h.org/xjslt",
                  },
                  priority: 0,
                  declarationOrder: 2,
                  importPrecedence: 1,
                },
                {
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (t) => {
                    o.copy(
                      t,
                      {
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                          xjslt: "https://www.e6h.org/xjslt",
                        },
                      },
                      (t) => {
                        (o.applyTemplates(t, {
                          select: "@*",
                          mode: "#default",
                          params: [],
                          sortKeyComponents: [],
                          namespaces: {
                            xsl: "http://www.w3.org/1999/XSL/Transform",
                            xjslt: "https://www.e6h.org/xjslt",
                          },
                        }),
                          o.callTemplate(t, {
                            name: "use-attribute-sets",
                            params: [
                              {
                                name: "attribute-sets",
                                content: "@use-attribute-sets",
                                namespaces: {
                                  xsl: "http://www.w3.org/1999/XSL/Transform",
                                  xjslt: "https://www.e6h.org/xjslt",
                                },
                                as: void 0,
                              },
                            ],
                          }),
                          o.applyTemplates(t, {
                            select: "node()",
                            mode: "#default",
                            params: [],
                            sortKeyComponents: [],
                            namespaces: {
                              xsl: "http://www.w3.org/1999/XSL/Transform",
                              xjslt: "https://www.e6h.org/xjslt",
                            },
                          }));
                      },
                    );
                  },
                  namespaces: {
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                    xjslt: "https://www.e6h.org/xjslt",
                  },
                  priority: 0.5,
                  declarationOrder: 3,
                  importPrecedence: 1,
                },
                {
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (t) => {
                    o.copy(
                      t,
                      {
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                          xjslt: "https://www.e6h.org/xjslt",
                        },
                      },
                      (t) => {
                        (o.applyTemplates(t, {
                          select: "@*",
                          mode: "#default",
                          params: [],
                          sortKeyComponents: [],
                          namespaces: {
                            xsl: "http://www.w3.org/1999/XSL/Transform",
                            xjslt: "https://www.e6h.org/xjslt",
                          },
                        }),
                          o.callTemplate(t, {
                            name: "use-attribute-sets",
                            params: [
                              {
                                name: "attribute-sets",
                                content: "@xsl:use-attribute-sets",
                                namespaces: {
                                  xsl: "http://www.w3.org/1999/XSL/Transform",
                                  xjslt: "https://www.e6h.org/xjslt",
                                },
                                as: void 0,
                              },
                            ],
                          }),
                          o.applyTemplates(t, {
                            select: "node()",
                            mode: "#default",
                            params: [],
                            sortKeyComponents: [],
                            namespaces: {
                              xsl: "http://www.w3.org/1999/XSL/Transform",
                              xjslt: "https://www.e6h.org/xjslt",
                            },
                          }));
                      },
                    );
                  },
                  namespaces: {
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                    xjslt: "https://www.e6h.org/xjslt",
                  },
                  priority: 0.5,
                  declarationOrder: 4,
                  importPrecedence: 1,
                },
                {
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (t) => {},
                  namespaces: {
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                    xjslt: "https://www.e6h.org/xjslt",
                  },
                  priority: 0.5,
                  declarationOrder: 5,
                  importPrecedence: 1,
                },
              ],
              nonRuleTemplateIndexes: [
                [
                  {
                    xpath: "@use-attribute-sets",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (const contextItem1 of (contextItem0 && contextItem0.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem0, "name-use-attribute-sets") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& (contextItem1.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem1.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem1.localName === "use-attribute-sets" && (contextItem1.namespaceURI || null) === ((contextItem1.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  7,
                ],
                [
                  {
                    xpath: "@xsl:use-attribute-sets",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (const contextItem1 of (contextItem0 && contextItem0.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem0, "name-use-attribute-sets") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& (contextItem1.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem1.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem1.localName === "use-attribute-sets" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  7,
                ],
                [
                  {
                    xpath:
                      "*[namespace-uri() != 'http://www.w3.org/1999/XSL/Transform' and @xsl:use-attribute-sets]",
                    compiled: void 0,
                  },
                  6,
                ],
                [
                  {
                    xpath: "xsl:copy[@use-attribute-sets]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-copy");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-copy")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "copy" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-use-attribute-sets") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "use-attribute-sets" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  5,
                ],
                [
                  {
                    xpath: "xsl:element[@use-attribute-sets]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-element");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-element")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "element" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-use-attribute-sets") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "use-attribute-sets" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  5,
                ],
                [
                  {
                    xpath: "/",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\tconst root0 = (function () {\n\t\t\t\tlet n = contextItem0;\n\t\t\t\twhile (n.nodeType !== /*DOCUMENT_NODE*/9) {\n\t\t\t\t\tn = domFacade.getParentNode(n);\n\t\t\t\t\tif (n === null) {\n\t\t\t\t\t\tthrow new Error(\'XPDY0050: the root node of the context node is not a document node.\');\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn n;\n\t\t\t})();\n\t\t\tyield root0;\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  3,
                ],
                [
                  {
                    xpath: "@*",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (const contextItem1 of (contextItem0 && contextItem0.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem0, "type-2") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& (contextItem1.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem1.nodeType === /*ATTRIBUTE_NODE*/ 2))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  3,
                ],
                [
                  {
                    xpath: "node()",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0);\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1)) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(!!contextItem1.nodeType)) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  3,
                ],
                [{ xpath: "processing-instruction()", compiled: void 0 }, 0],
                [{ xpath: "comment()", compiled: void 0 }, 0],
                [
                  {
                    xpath: "text()",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "type-3");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "type-3")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!((contextItem1.nodeType === /*TEXT_NODE*/ 3 ||\n\t\t\t\tcontextItem1.nodeType === /* CDATA_SECTION_NODE */ 4))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  1,
                ],
                [
                  {
                    xpath: "@*",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (const contextItem1 of (contextItem0 && contextItem0.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem0, "type-2") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& (contextItem1.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem1.nodeType === /*ATTRIBUTE_NODE*/ 2))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  1,
                ],
                [
                  {
                    xpath: "/",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\tconst root0 = (function () {\n\t\t\t\tlet n = contextItem0;\n\t\t\t\twhile (n.nodeType !== /*DOCUMENT_NODE*/9) {\n\t\t\t\t\tn = domFacade.getParentNode(n);\n\t\t\t\t\tif (n === null) {\n\t\t\t\t\t\tthrow new Error(\'XPDY0050: the root node of the context node is not a document node.\');\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn n;\n\t\t\t})();\n\t\t\tyield root0;\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  2,
                ],
              ],
              namedTemplates: new Map([["use-attribute-sets", 4]]),
              variableScopes: [new Map()],
              inputURL: e.inputURL,
              ruleTree: {
                feature: new o.NodeTypeFeature(o.selfNode, 1),
                results: [],
                left: { results: [2] },
              },
              keys: r,
              outputDefinitions: s,
              decimalFormats: a,
              patternMatchCache: new Map(),
              stylesheetParams: e.stylesheetParams,
            };
          return (
            o.initialize(i, {
              xsl: "http://www.w3.org/1999/XSL/Transform",
              xjslt: "https://www.e6h.org/xjslt",
            }),
            o.stripSpace(t, []),
            o.processNode(i, [], {
              xsl: "http://www.w3.org/1999/XSL/Transform",
              xjslt: "https://www.e6h.org/xjslt",
            }),
            n
          );
        }
        ((t.exports.transform = r), (global.transform = r));
      },
      712(t, e, n) {
        "use strict";
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.Feature =
            e.DEFAULT_DECIMAL_FORMAT =
            e.NodeType =
            e.DEFAULT_PRIORITIES =
            e.XJSLT_NSURI =
            e.XPATH_NSURI =
            e.XMLNS_NSURI =
            e.XSLT1_NSURI =
              void 0),
          (e.isNodeGroup = c),
          (e.isNodeGroupArray = function (t) {
            return Array.isArray(t) && (0 === t.length || c(t[0]));
          }));
        const o = n(953),
          r = String.raw`[^,:\(\)\*\[\]/]`,
          s = String.raw`(child::|attribute::|@)?`,
          a = String.raw`(document-node\()?`;
        var i;
        function c(t) {
          return (
            "object" == typeof t &&
            null !== t &&
            "string" == typeof t.key &&
            Array.isArray(t.nodes)
          );
        }
        ((e.XSLT1_NSURI = "http://www.w3.org/1999/XSL/Transform"),
          (e.XMLNS_NSURI = "http://www.w3.org/2000/xmlns/"),
          (e.XPATH_NSURI = "http://www.w3.org/2005/xpath-functions"),
          (e.XJSLT_NSURI = "https://www.e6h.org/xjslt"),
          (e.DEFAULT_PRIORITIES = new Map([
            [new RegExp(String.raw`^\s*/\s*$`), -0.5],
            [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${a}${s}processing-instruction`), 0],
            [new RegExp(String.raw`^\s*${a}${s}element\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${a}${s}attribute\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${a}${s}element\(${r}+\)\)?\s*$`), 0],
            [
              new RegExp(String.raw`^\s*${a}${s}element\(\*,\s*${r}+\)\)?\s*$`),
              0,
            ],
            [new RegExp(String.raw`^\s*${a}${s}attribute\(${r}+\)\)?\s*$`), 0],
            [
              new RegExp(
                String.raw`^\s*${a}${s}attribute\(\*,\s*${r}+\)\)?\s*$`,
              ),
              0,
            ],
            [
              new RegExp(
                String.raw`^\s*${a}${s}element\(${r}+,\s*${r}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${a}${s}attribute\(${r}+,\s*${r}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${a}${s}schema-element\(${r}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${a}${s}schema-attribute\(${r}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [new RegExp(String.raw`^\s*document-node\(\)\s*$`), -0.5],
            [
              new RegExp(
                String.raw`^\s*${s}(node\(\)|text\(\)|comment\(\))\s*$`,
              ),
              -0.5,
            ],
            [new RegExp(String.raw`^\s*${s}(${r}:)?\*\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${s}\*:${r}+\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${s}${r}+\s*$`), 0],
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
          })(i || (e.NodeType = i = {})),
          (e.DEFAULT_DECIMAL_FORMAT = {
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
          (e.Feature = class {
            constructor(t) {
              this.value = t;
            }
            serialize() {
              return (0, o.mkNew)(
                (0, o.mkMember)("xjslt", this.constructor.name),
                [(0, o.toEstree)(this.value)],
              );
            }
            equals(t) {
              return (
                this.constructor === t.constructor && this.value === t.value
              );
            }
          }));
      },
      320(t, e, n) {
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
          s =
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
          a =
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
                for (var n = o(t), a = 0; a < n.length; a++)
                  "default" !== n[a] && r(e, t, n[a]);
              return (s(e, t), e);
            });
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NodeAttributeFeature =
            e.NodeTextFeature =
            e.NodeNameFeature =
            e.NodeTypeFeature =
            e.NodeNamespaceFeature =
              void 0),
          (e.selfNode = m),
          (e.xpathToFeatures = function (t, e) {
            if (t)
              return (function (t, e) {
                const n = [];
                try {
                  return (
                    I(t, n, e, { level: 0 }),
                    [new x(m, l.Node.ELEMENT_NODE), ...n]
                  );
                } catch (t) {
                  return;
                }
              })(
                (0, u.parseScript)(
                  t,
                  { language: u.evaluateXPath.XPATH_3_1_LANGUAGE },
                  new l.Document(),
                ),
                e,
              );
          }));
        const i = n(953),
          c = n(712),
          u = n(594),
          l = a(n(898)),
          p = "http://www.w3.org/2005/XQueryX";
        function m(t) {
          return t;
        }
        class d extends c.Feature {
          constructor(t, e) {
            (super(e), (this.nodeExtractor = t));
          }
          serialize() {
            return (0, i.mkNew)(
              (0, i.mkMember)("xjslt", this.constructor.name),
              [
                (0, i.toEstree)(this.nodeExtractor),
                (0, i.toEstree)(this.value),
              ],
            );
          }
        }
        class f extends d {
          matches(t) {
            var e;
            return (
              (null === (e = this.nodeExtractor(t)) || void 0 === e
                ? void 0
                : e.nodeType) === l.Node.ELEMENT_NODE &&
              t.namespaceURI === this.value
            );
          }
        }
        e.NodeNamespaceFeature = f;
        class x extends d {
          matches(t) {
            var e;
            return (
              (null === (e = this.nodeExtractor(t)) || void 0 === e
                ? void 0
                : e.nodeType) === this.value
            );
          }
        }
        e.NodeTypeFeature = x;
        class h extends d {
          matches(t) {
            var e;
            return (
              (null === (e = this.nodeExtractor(t)) || void 0 === e
                ? void 0
                : e.nodeName) === this.value
            );
          }
        }
        e.NodeNameFeature = h;
        class g extends d {
          matches(t) {
            var e;
            return (
              (null === (e = this.nodeExtractor(t)) || void 0 === e
                ? void 0
                : e.textContent) === this.value
            );
          }
        }
        e.NodeTextFeature = g;
        class w extends d {
          matches(t) {
            const e = this.nodeExtractor(t);
            return (
              e.nodeType === l.Node.ELEMENT_NODE &&
              e.getAttribute(this.value.name) === this.value.value
            );
          }
        }
        function T(t) {
          return (
            (function (t) {
              return 1 === t.nodeType;
            })(t) && t.namespaceURI === p
          );
        }
        function y(t, e) {
          return T(t) && t.localName === e;
        }
        function N(t, e) {
          for (const n of t.childNodes) if (y(n, e)) return n;
        }
        function v(t, e, n) {
          for (const o of t.childNodes) {
            if (!T(o)) continue;
            if (y(o, e) && (!n || n(o))) return o;
            const t = v(o, e, n);
            if (t) return t;
          }
        }
        function b(t) {
          var e;
          return (
            "descendant-or-self" ===
              (null === (e = N(t, "xpathAxis")) || void 0 === e
                ? void 0
                : e.textContent) && !!N(t, "anyKindTest")
          );
        }
        e.NodeAttributeFeature = w;
        class E extends Error {}
        function I(t, e, n, o) {
          var r, s;
          if (!T(t)) return;
          const a = t.localName;
          if (
            "module" === a ||
            "mainModule" === a ||
            "predicates" === a ||
            "queryBody" === a ||
            "andOp" === a ||
            "firstOperand" === a ||
            "secondOperand" === a
          )
            for (const r of t.childNodes) I(r, e, n, o);
          else if ("pathExpr" === a) {
            const r = t.childNodes.filter((t) => y(t, "stepExpr"));
            if (0 === r.length) throw new E();
            for (const t of r.slice(0, -1)) if (!b(t)) throw new E();
            I(r[r.length - 1], e, n, o);
          } else if ("stepExpr" === a) {
            const s =
              null === (r = N(t, "xpathAxis")) || void 0 === r
                ? void 0
                : r.textContent;
            if ("child" !== s) throw new E(`unsupported axis: ${s}`);
            if (o.level > 0) throw new E("Too many child axes.");
            for (const r of t.childNodes.slice(1))
              I(
                r,
                e,
                n,
                Object.assign(Object.assign({}, o), { level: o.level + 1 }),
              );
          } else if ("nameTest" === a) {
            const o = t.textContent;
            o && e.push(new h(m, o));
            const r = t.getAttributeNS(p, "prefix");
            if (r) {
              const t = null == n ? void 0 : n(r);
              if (!t) throw new E(`unresolved ns prefix: ${t}`);
              e.push(new f(m, t));
            }
            const s = t.getAttributeNS(p, "URI");
            s && e.push(new f(m, s));
          } else if ("Wildcard" === a) {
            const o = N(t, "NCName");
            if (o) {
              const t =
                null == n
                  ? void 0
                  : n(null !== (s = o.textContent) && void 0 !== s ? s : "");
              if (!t) throw new E(`unresolved ns prefix: ${t}`);
              e.push(new f(m, t));
            }
          } else {
            if ("equalOp" !== a) throw new E();
            {
              const n = N(t, "firstOperand"),
                o = N(t, "secondOperand");
              if (!n || !o) throw new E();
              const r = S(n, o) || S(o, n);
              if (!r) throw new E();
              e.push(r);
            }
          }
        }
        function S(t, e) {
          var n, o;
          const r = v(e, "value");
          if (!r) return;
          const s = null !== (n = r.textContent) && void 0 !== n ? n : "",
            a = v(t, "stepExpr", (t) => {
              var e;
              return (
                "attribute" ===
                (null === (e = N(t, "xpathAxis")) || void 0 === e
                  ? void 0
                  : e.textContent)
              );
            });
          if (a) {
            const t =
              null === (o = N(a, "nameTest")) || void 0 === o
                ? void 0
                : o.textContent;
            if (!t) return;
            return new w(m, { name: t, value: s });
          }
          return N(t, "contextItemExpr") || v(t, "textTest")
            ? new g(m, s)
            : void 0;
        }
      },
      324(t, e) {
        "use strict";
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.buildRuleTree = function t(e) {
            if (0 === e.length) return { results: [] };
            const n = new Set();
            for (const t of e) for (const e of t.features) n.add(e);
            if (0 === n.size) return { results: e.map((t) => t.result) };
            const o = Array.from(n)[0],
              r = [],
              s = [];
            for (const t of e)
              t.features.some((t) => t.equals(o)) ? r.push(t) : s.push(t);
            let a = { feature: o, results: [] };
            if (r.length > 0) {
              const e = r.map((t) =>
                Object.assign(Object.assign({}, t), {
                  features: t.features.filter((t) => !t.equals(o)),
                }),
              );
              a.left = t(e.filter((t) => t.features.length > 0));
              const n = r.filter((t, n) => 0 === e[n].features.length);
              n.length > 0 &&
                (a.left || (a.left = { results: [] }),
                (a.left.results = n.map((t) => t.result)));
            }
            return (s.length > 0 && (a.right = t(s)), a);
          }),
          (e.findMatchingRules = function (t, e) {
            const n = [],
              o = [t];
            for (; o.length > 0; ) {
              const t = o.pop();
              t &&
                (n.push(...t.results),
                t.feature &&
                  (t.right && o.push(t.right),
                  t.feature.matches(e) && t.left && o.push(t.left)));
            }
            return n;
          }));
      },
      953(t, e) {
        "use strict";
        function n(t, e) {
          return {
            type: "ExpressionStatement",
            expression: {
              type: "CallExpression",
              callee: t,
              arguments: e,
              optional: !1,
            },
          };
        }
        function o(t) {
          return { type: "Identifier", name: t };
        }
        function r(t) {
          return { type: "Literal", value: (t = null == t ? void 0 : t) };
        }
        function s(t, e) {
          return {
            type: "MemberExpression",
            object: o(t),
            property: o(e),
            computed: !1,
            optional: !1,
          };
        }
        function a(t, e) {
          return (
            e || (e = t),
            {
              type: "VariableDeclaration",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: o(t),
                  init: {
                    type: "CallExpression",
                    callee: o("require"),
                    arguments: [r(e)],
                    optional: !1,
                  },
                },
              ],
              kind: "let",
            }
          );
        }
        function i(t) {
          return { type: "ArrayExpression", elements: t };
        }
        function c(t, e, n) {
          return {
            type: "VariableDeclaration",
            declarations: [{ type: "VariableDeclarator", id: t, init: e }],
            kind: n,
          };
        }
        function u(t, e) {
          return { type: "NewExpression", callee: t, arguments: e };
        }
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.mkArrowFun = function (t) {
            return {
              type: "ArrowFunctionExpression",
              expression: !1,
              generator: !1,
              async: !1,
              params: [o("context")],
              body: { type: "BlockStatement", body: t },
            };
          }),
          (e.mkFun = function (t, e, n) {
            return {
              type: "FunctionDeclaration",
              id: t,
              generator: !1,
              async: !1,
              params: e,
              body: n,
            };
          }),
          (e.mkCall = n),
          (e.mkCallWithContext = function (t, e) {
            return n(t, [o("context"), ...e]);
          }),
          (e.mkIdentifier = o),
          (e.mkImports = function () {
            return [
              {
                type: "ImportDeclaration",
                attributes: [],
                specifiers: [
                  { type: "ImportNamespaceSpecifier", local: o("slimdom") },
                ],
                source: r("slimdom"),
              },
              {
                type: "ImportDeclaration",
                attributes: [],
                specifiers: [
                  {
                    type: "ImportSpecifier",
                    imported: o("evaluateXPathToString"),
                    local: o("evaluateXPathToString"),
                  },
                ],
                source: r("fontoxpath"),
              },
            ];
          }),
          (e.mkImportsNode = function () {
            return [a("slimdom"), a("fontoxpath"), a("xjslt", "xjslt")];
          }),
          (e.mkLiteral = r),
          (e.mkMember = s),
          (e.mkObject = function (t) {
            let e = [];
            for (let n in t)
              e.push({
                type: "Property",
                method: !1,
                shorthand: !1,
                computed: !1,
                key: r(n),
                value: t[n],
                kind: "init",
              });
            return { type: "ObjectExpression", properties: e };
          }),
          (e.mkRequire = a),
          (e.mkArray = i),
          (e.mkReturn = function (t) {
            return { type: "ReturnStatement", argument: t };
          }),
          (e.mkBlock = function (t) {
            return { type: "BlockStatement", body: t };
          }),
          (e.mkLet = function (t, e) {
            return c(t, e, "let");
          }),
          (e.mkConst = function (t, e) {
            return c(t, e, "const");
          }),
          (e.mkVariableDeclaration = c),
          (e.mkNew = u),
          (e.toEstree = function t(e) {
            const n = typeof e;
            return null == e ||
              "string" === n ||
              "number" === n ||
              "boolean" === n
              ? r(e)
              : Array.isArray(e)
                ? i(e.map((e) => t(e)))
                : "function" == typeof e.serialize
                  ? e.serialize()
                  : "function" === n
                    ? s("xjslt", e.name)
                    : "object" === n
                      ? e instanceof Map
                        ? u(o("Map"), [t(Array.from(e.entries()))])
                        : "type" in e
                          ? e
                          : (function (e) {
                              let n = [];
                              for (let o in e)
                                n.push({
                                  type: "Property",
                                  method: !1,
                                  shorthand: !1,
                                  computed: !1,
                                  key: t(o),
                                  value: t(e[o]),
                                  kind: "init",
                                });
                              return {
                                type: "ObjectExpression",
                                properties: n,
                              };
                            })(e)
                      : void 0;
          }));
      },
      379(t, e, n) {
        "use strict";
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.functionNameResolver = y),
          (e.registerFunctions = function () {
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
                x,
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
                (t, e) =>
                  (function ({ currentContext: t }, e) {
                    const n = (0, o.evaluateXPath)(
                      e,
                      void 0,
                      void 0,
                      void 0,
                      o.evaluateXPath.ALL_RESULTS_TYPE,
                      {
                        currentContext: { currentContext: t },
                        functionNameResolver: y,
                      },
                    );
                    return 1 === n.length ? n[0] : n;
                  })(t, e),
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "normalize-unicode" },
                ["xs:string?"],
                "xs:string",
                (t, e) => g(0, e, "NFC"),
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "normalize-unicode" },
                ["xs:string?", "xs:string"],
                "xs:string",
                g,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "format-number" },
                ["xs:numeric", "xs:string"],
                "xs:string",
                w,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "format-number" },
                ["xs:numeric", "xs:string", "xs:string"],
                "xs:string",
                w,
              ));
          }));
        const o = n(594),
          r = n(712),
          s = n(845),
          a = n(472);
        function i({ currentContext: t }) {
          return t.contextItem;
        }
        function c({ currentContext: t }, e) {
          return (0, a.urlToDom)(t, e);
        }
        function u({ currentContext: t }) {
          return t.currentGroup.key;
        }
        function l({ currentContext: t }) {
          return t.currentGroup.nodes;
        }
        function p({ currentContext: t }) {
          return t.position;
        }
        function m({ currentContext: t }) {
          return t.contextList.length;
        }
        function d({ currentContext: t }) {
          for (const [e, n] of t.resultDocuments)
            if (n === t.outputDocument) return e;
          return "#default";
        }
        function f({ currentContext: t }, e, n) {
          const {
            keys: o,
            contextItem: r,
            variableScopes: s,
            patternMatchCache: a,
          } = t;
          if (!o.has(e)) throw new Error("XTDE1260");
          return o.get(e).lookup(a, r.ownerDocument, s, n) || [];
        }
        function x(t, e) {
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
        function h({ currentContext: t }, e) {
          const n = void 0 !== e ? e : t.contextItem;
          if (!n) return null;
          let o = n;
          const r = [];
          for (; o; ) {
            const t =
              1 === o.nodeType
                ? o.getAttributeNS(
                    "http://www.w3.org/XML/1998/namespace",
                    "base",
                  )
                : null;
            (t && r.unshift(t), (o = o.parentNode));
          }
          let s = t.inputURL || void 0;
          for (const t of r) s = URL.parse(t, s) || t;
          return s;
        }
        function g(t, e, n) {
          if (null == e) return "";
          const o = n.toUpperCase().replace("-", "");
          if (!["NFC", "NFD", "NFKC", "NFKD"].includes(o))
            throw new Error("FOCH0003: Normalization form not supported.");
          return e.normalize(o);
        }
        function w({ currentContext: t }, e, n, o) {
          var a, i;
          const c = o || "#default",
            u =
              null !==
                (i =
                  null === (a = t.decimalFormats) || void 0 === a
                    ? void 0
                    : a.get(c)) && void 0 !== i
                ? i
                : r.DEFAULT_DECIMAL_FORMAT;
          return (0, s.formatNumberWithPicture)(e, n, u);
        }
        const T = [
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
        function y({ prefix: t, localName: e }, n) {
          return (t && "fn" !== t) || !T.includes(e)
            ? null
            : { namespaceURI: r.XJSLT_NSURI, localName: e };
        }
      },
      845(t, e, n) {
        "use strict";
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.toAlphabeticUpper = e.toAlphabetic = void 0),
          (e.groupNumeric = a),
          (e.toNumeric = i),
          (e.mkToAlphabetic = c),
          (e.toRoman = u),
          (e.formatWithToken = l),
          (e.formatNumber = function (t, e, n, o) {
            const r = [];
            e.prefix && r.push(e.prefix);
            for (let s = 0; s < t.length; s++) {
              const a = Math.min(s, e.formats.length - 1),
                i = e.formats[a];
              if (!i) throw new Error("No number format found");
              (i.separator && 0 !== s && r.push(i.separator),
                r.push(l(t[s], i.format, n, o)));
            }
            return (e.suffix && r.push(e.suffix), r.join(""));
          }),
          (e.remapDigits = m),
          (e.formatNumberWithPicture = function (t, e, n) {
            if (isNaN(t)) return n.nan;
            if (!isFinite(t)) return (t < 0 ? n.minusSign : "") + n.infinity;
            const s = e.split(n.patternSeparator);
            let c;
            if (t < 0)
              if (s.length > 1) c = p(s[1], n);
              else {
                const t = p(s[0], n);
                c = Object.assign(Object.assign({}, t), {
                  prefix: `${n.minusSign}${t.prefix || ""}`,
                });
              }
            else c = p(s[0], n);
            return (function (t, e, n) {
              var s;
              e.isPercent ? (t *= 100) : e.isPerMille && (t *= 1e3);
              const c = (0, o.evaluateXPathToNumber)(
                "round-half-to-even($number, $precision)",
                void 0,
                void 0,
                {
                  number: (0, r.wrapValue)(t, "xs:double"),
                  precision: (0, r.wrapValue)(e.decimalMaxDigits, "xs:integer"),
                },
              );
              let u = a(
                  i(Math.trunc(c), e.integerMinDigits),
                  n.groupingSeparator,
                  e.integerGroupSize,
                ),
                l =
                  null !== (s = c.toString().split(".")[1]) && void 0 !== s
                    ? s
                    : "";
              for (; l.length < e.decimalMinDigits; ) l += "0";
              const p = l.length > 0 ? n.decimalSeparator : "",
                d = n.zeroDigit.codePointAt(0);
              return (
                48 !== d && ((u = m(u, d)), (l = m(l, d))),
                `${e.prefix}${u}${p}${l}${e.suffix}`
              );
            })(Math.abs(t), c, n);
          }));
        const o = n(594),
          r = n(821),
          s = [
            49, 1633, 1777, 2407, 2535, 2663, 2791, 2919, 3047, 3175, 3303,
            3431, 3559, 3665, 3793, 3873, 4161, 4241, 6113, 6161, 6471, 6609,
            6785, 6801, 6993, 7089, 7233, 7249, 42529, 43217, 43265, 43473,
            43505, 43601, 44017, 65297, 66721, 68913, 69735, 69873, 69943,
            70097, 70385, 70737, 70865, 71249, 71361, 71473, 71905, 72785,
            73041, 73121, 92769, 93009, 120783, 120793, 120803, 120813, 120823,
            125265,
          ];
        function a(t, e, n) {
          if (!e || !n || t.length <= n) return t;
          const o = [];
          let r = t;
          for (; r.length > n; ) (o.unshift(r.slice(-n)), (r = r.slice(0, -n)));
          return (r && o.unshift(r), o.join(e));
        }
        function i(t, e) {
          return t.toString().padStart(e, "0");
        }
        function c(t, e) {
          const n = e - t + 1,
            o = [...Array(n)].map((e, n) => String.fromCodePoint(t + n));
          return function (t) {
            if (0 === t) return "0";
            let e = "",
              r = t;
            for (; r > 0; ) (r--, (e = o[r % n] + e), (r = Math.floor(r / n)));
            return e;
          };
        }
        function u(t) {
          const e = new Map([
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
          if (0 === t) return "0";
          let n = "",
            o = t;
          for (const [t, r] of e) for (; o >= t; ) ((n += r), (o -= t));
          return n;
        }
        function l(t, n, o, r) {
          if (isNaN(t) || !isFinite(t)) return "";
          if (/0*1/.test(n)) return a(i(t, n.length), o, r);
          if ("A" === n) return (0, e.toAlphabeticUpper)(t) || "";
          if ("a" === n) return (0, e.toAlphabetic)(t) || "";
          if ("I" === n) return u(t).toUpperCase();
          if ("i" === n) return u(t);
          for (const e of s) {
            if (49 === e) continue;
            const s = e - 1;
            if (
              new RegExp(
                `${String.fromCharCode(s)}*${String.fromCharCode(e)}`,
              ).test(n)
            )
              return a(m(i(t, n.length), s), o, r);
          }
          return a(i(t, n.length), o, r);
        }
        function p(t, e) {
          const n = e.zeroDigit,
            o = e.digit,
            r = e.decimalSeparator,
            s = e.groupingSeparator;
          let a = 0,
            i = !1,
            c = !1;
          function u() {
            if (i || c)
              throw new Error(
                "XTDE1310: Multiple percent/per-mille characters.",
              );
          }
          function l() {
            let s = "";
            for (; a < t.length && t[a] !== n && t[a] !== o && t[a] !== r; )
              (t[a] === e.percent && (u(), (i = !0)),
                t[a] === e.perMille && (u(), (c = !0)),
                (s += t[a++]));
            return s;
          }
          const p = l();
          let m,
            d = 0,
            f = 0,
            x = -1;
          for (; a < t.length && t[a] !== r; ) {
            const e = t[a];
            if (e === n) (d++, f++);
            else if (e === o) f++;
            else {
              if (e !== s) break;
              x = f;
            }
            a++;
          }
          x >= 0 && (m = f - x);
          let h = 0,
            g = 0;
          if (a < t.length && t[a] === r)
            for (a++; a < t.length; ) {
              const e = t[a];
              if (e === n) (h++, g++);
              else {
                if (e !== o) break;
                g++;
              }
              a++;
            }
          const w = l();
          if (a < t.length)
            throw new Error(
              `XTDE1310: Active characters after picture string suffix: ${t.slice(a)}`,
            );
          return {
            prefix: p,
            suffix: w,
            integerMinDigits: Math.max(d, 1),
            integerGroupSize: m,
            decimalMinDigits: h,
            decimalMaxDigits: g,
            isPercent: i,
            isPerMille: c,
          };
        }
        function m(t, e) {
          return [...t]
            .map((t) => {
              const n = t.codePointAt(0);
              return n >= 48 && n <= 57 ? String.fromCodePoint(e + n - 48) : t;
            })
            .join("");
        }
        ((e.toAlphabetic = c(97, 122)), (e.toAlphabeticUpper = c(65, 90)));
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
          (e.computeDefaultPriority = function t(e) {
            if (e && e.includes("|"))
              return Math.max(
                ...e
                  .split("|")
                  .filter((t) => "" !== t)
                  .map((e) => t(e)),
              );
            for (let [t, n] of i) if (t.test(e)) return n;
            return 0.5;
          }),
          (e.compareSortable = c),
          (e.sortSortable = function (t) {
            return t.sort(c);
          }),
          (e.zip = function (t, e) {
            if (void 0 === t || void 0 === e) return [];
            const n = Math.min(t.length, e.length);
            return t.slice(0, n).map((t, n) => [t, e[n]]);
          }));
        const r = String.raw`[^,:\(\)\*\[\]/]`,
          s = String.raw`(child::|attribute::|@)?`,
          a = String.raw`(document-node\()?`,
          i = new Map([
            [new RegExp(String.raw`^\s*/\s*$`), -0.5],
            [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${a}${s}processing-instruction`), 0],
            [new RegExp(String.raw`^\s*${a}${s}element\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${a}${s}attribute\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${a}${s}element\(${r}+\)\)?\s*$`), 0],
            [
              new RegExp(String.raw`^\s*${a}${s}element\(\*,\s*${r}+\)\)?\s*$`),
              0,
            ],
            [new RegExp(String.raw`^\s*${a}${s}attribute\(${r}+\)\)?\s*$`), 0],
            [
              new RegExp(
                String.raw`^\s*${a}${s}attribute\(\*,\s*${r}+\)\)?\s*$`,
              ),
              0,
            ],
            [
              new RegExp(
                String.raw`^\s*${a}${s}element\(${r}+,\s*${r}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${a}${s}attribute\(${r}+,\s*${r}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${a}${s}schema-element\(${r}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${a}${s}schema-attribute\(${r}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [new RegExp(String.raw`^\s*document-node\(\)\s*$`), -0.5],
            [
              new RegExp(
                String.raw`^\s*${s}(node\(\)|text\(\)|comment\(\))\s*$`,
              ),
              -0.5,
            ],
            [new RegExp(String.raw`^\s*${s}(${r}:)?\*\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${s}\*:${r}+\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${s}${r}+\s*$`), 0],
          ]);
        function c(t, e) {
          const n = t.importPrecedence - e.importPrecedence;
          if (0 !== n) return n;
          {
            const n = e.priority - t.priority;
            return 0 !== n ? n : e.declarationOrder - t.declarationOrder;
          }
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
          s =
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
          a =
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
                for (var n = o(t), a = 0; a < n.length; a++)
                  "default" !== n[a] && r(e, t, n[a]);
              return (s(e, t), e);
            });
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.urlToDom = function (t, e) {
            const n = t.inputURL ? (0, i.resolve)(t.inputURL.toString(), e) : e;
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
          u = a(n(898));
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
          s =
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
          a =
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
                for (var n = o(t), a = 0; a < n.length; a++)
                  "default" !== n[a] && r(e, t, n[a]);
              return (s(e, t), e);
            });
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NodeTypeFeature =
            e.NodeTextFeature =
            e.NodeNameFeature =
            e.NodeNamespaceFeature =
            e.NodeAttributeFeature =
            e.selfNode =
            e.KeyImpl =
              void 0),
          (e.visitNodes = x),
          (e.dedupGenerator = b),
          (e.mergeTemplateGenerators = E),
          (e.processNode = I),
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
          (e.sort = D),
          (e.applyTemplates = function (t, e) {
            const n = (0, p.mkResolver)(e.namespaces),
              o = (0, i.evaluateXPathToNodes)(
                e.select,
                t.contextItem,
                void 0,
                A(t.variableScopes),
                {
                  currentContext: t,
                  namespaceResolver: n,
                  functionNameResolver: u.functionNameResolver,
                },
              );
            let r = e.mode || "#default";
            ("#current" === r && (r = t.mode),
              O(D(t, o, e.sortKeyComponents, n), t, (t) => {
                I(
                  Object.assign(Object.assign({}, t), {
                    mode: r,
                    variableScopes: C(t.variableScopes),
                  }),
                  e.params,
                  e.namespaces,
                );
              }));
          }),
          (e.callTemplate = function (t, e) {
            const n = t.namedTemplates.get(e.name);
            if (void 0 !== n) return L(t.templates[n], t, e.params);
            throw new Error(`Cannot find a template named ${e.name}`);
          }),
          (e.functionX = function (t, e) {
            const n = t.params.map((t) => "item()"),
              o = t.params.map((t) => t.name);
            (0, i.registerCustomXPathFunction)(
              { namespaceURI: t.namespace, localName: t.name },
              n,
              t.as || "item()",
              ({ currentContext: t }, ...n) => {
                let r = new Map();
                return (
                  o.forEach((t, e) => r.set(t, n[e])),
                  K(
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
            let r, s;
            if (o.nodeType === l.NodeType.ELEMENT) {
              const e = o;
              r = t.outputDocument.createElementNS(
                e.namespaceURI,
                e.prefix ? `${e.prefix}:${e.localName}` : e.localName,
              );
              for (let n of e.attributes)
                if (n.namespaceURI === l.XMLNS_NSURI) {
                  const o = n.localName;
                  r.setAttributeNode(
                    t.outputDocument.importNode(
                      e.getAttributeNodeNS(l.XMLNS_NSURI, o),
                    ),
                  );
                }
            } else
              r =
                o.nodeType === l.NodeType.DOCUMENT
                  ? void 0
                  : t.outputDocument.importNode(o);
            (r && (s = t.append(r)),
              n &&
                n(
                  Object.assign(Object.assign({}, t), {
                    append: s || t.append,
                  }),
                ));
          }),
          (e.copyOf = function (t, e, n) {
            let o = (0, i.evaluateXPath)(
              e.select,
              t.contextItem,
              void 0,
              A(t.variableScopes),
              i.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: u.functionNameResolver,
              },
            );
            for (let e of o) t.append(e);
          }),
          (e.valueOf = function (t, e, n) {
            t.append(
              G(t, e.select || n, (0, p.mkResolver)(e.namespaces), e.separator),
            );
          }),
          (e.message = function (t, e, n) {
            const o = G(t, e.select || n, (0, p.mkResolver)(e.namespaces));
            if ("yes" === e.terminate) throw new Error(o);
            console.log(o);
          }),
          (e.text = function (t, e, n) {
            t.append(G(t, n, (0, p.mkResolver)(e.namespaces), [""]));
          }),
          (e.variable = function (t, e) {
            _(t.variableScopes, e.name, J(t, e));
          }),
          (e.param = function (t, e) {
            _(t.variableScopes, e.name, t.stylesheetParams[e.name] || J(t, e));
          }),
          (e.extendScope = C),
          (e.wrapValue = $),
          (e.setVariable = _),
          (e.mergeVariableScopes = A),
          (e.literalText = function (t, e) {
            t.append(e);
          }),
          (e.sequence = function (t, e) {
            const n = (0, i.evaluateXPath)(
              e.select,
              t.contextItem,
              void 0,
              A(t.variableScopes),
              i.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: u.functionNameResolver,
              },
            );
            t.append(n);
          }),
          (e.buildNode = U),
          (e.buildAttributeNode = F),
          (e.literalElement = function (t, e, n) {
            let o = U(t, { name: e.name, namespace: e.namespace });
            const r = (0, p.mkResolver)(e.namespaces);
            for (let n of e.attributes) {
              const e = B(t, n.value, r),
                s = F(t, { name: n.name, namespace: n.namespace, value: e });
              o.setAttributeNode(s);
            }
            const s = t.append(o);
            n(
              Object.assign(Object.assign({}, t), {
                variableScopes: C(t.variableScopes),
                append: s || t.append,
              }),
            );
          }),
          (e.attribute = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              r = B(t, e.name, o),
              [s, a] = (0, p.determineNamespace)(r, o, B(t, e.namespace, o)),
              i = F(t, {
                name: r,
                namespace: s,
                value: G(t, e.select || n, o, e.separator),
              });
            t.append(i);
          }),
          (e.processingInstruction = function (t, e, n) {
            const o = B(t, e.name, (0, p.mkResolver)(e.namespaces)),
              r = G(t, e.select || n, (0, p.mkResolver)(e.namespaces), [
                "",
              ]).trimStart();
            t.append(t.outputDocument.createProcessingInstruction(o, r));
          }),
          (e.comment = function (t, e, n) {
            const o = G(t, e.select || n, (0, p.mkResolver)(e.namespaces), [
              "",
            ]);
            t.append(t.outputDocument.createComment(o));
          }),
          (e.namespace = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              r = B(t, e.name, o),
              s = G(t, e.select || n, o, [""]),
              a = F(t, {
                name: `xmlns:${r}`,
                namespace: l.XMLNS_NSURI,
                value: s,
              });
            t.append(a);
          }),
          (e.element = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces);
            let r = B(t, e.name, o),
              s = B(t, e.namespace, o),
              a = U(t, {
                name: r,
                namespace: (0, p.determineNamespace)(
                  r,
                  (0, p.mkResolver)(e.namespaces),
                  s,
                )[0],
              });
            const i = t.append(a);
            n(
              Object.assign(Object.assign({}, t), {
                variableScopes: C(t.variableScopes),
                append: i || t.append,
              }),
            );
          }),
          (e.ifX = function (t, e, n) {
            (0, i.evaluateXPathToBoolean)(
              e.test,
              t.contextItem,
              void 0,
              A(t.variableScopes),
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
                (0, i.evaluateXPathToBoolean)(
                  n.test,
                  t.contextItem,
                  void 0,
                  A(t.variableScopes),
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
                variableScopes: C(t.variableScopes),
              }),
            );
          }),
          (e.performSort = function (t, e) {
            const n = (0, p.mkResolver)(e.namespaces),
              o = (0, i.evaluateXPath)(
                e.select,
                t.contextItem,
                void 0,
                A(t.variableScopes),
                i.evaluateXPath.ALL_RESULTS_TYPE,
                {
                  currentContext: t,
                  namespaceResolver: n,
                  functionNameResolver: u.functionNameResolver,
                },
              );
            if (o && Symbol.iterator in Object(o)) {
              const r = D(t, o, e.sortKeyComponents, n);
              for (let e of r) t.append(e);
            }
          }),
          (e.forEach = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces);
            let r = (0, i.evaluateXPath)(
              e.select,
              t.contextItem,
              void 0,
              A(t.variableScopes),
              i.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: o,
                functionNameResolver: u.functionNameResolver,
              },
            );
            r &&
              Symbol.iterator in Object(r) &&
              ((r = D(t, r, e.sortKeyComponents, o)),
              O(r, t, (t) => {
                n(
                  Object.assign(Object.assign({}, t), {
                    variableScopes: C(t.variableScopes),
                  }),
                );
              }));
          }),
          (e.forEachGroup = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              r = A(t.variableScopes),
              s = (0, i.evaluateXPathToNodes)(
                e.select,
                t.contextItem,
                void 0,
                r,
                {
                  currentContext: t,
                  namespaceResolver: o,
                  functionNameResolver: u.functionNameResolver,
                },
              );
            if (s && Symbol.iterator in Object(s)) {
              let r = [];
              (e.groupBy
                ? (r = (function (t, e, n, o) {
                    const r = A(t.variableScopes);
                    let s = [];
                    return (
                      O(e, t, (t) => {
                        const e = (0, i.evaluateXPathToString)(
                          n,
                          t.contextItem,
                          void 0,
                          r,
                          {
                            currentContext: t,
                            namespaceResolver: o,
                            functionNameResolver: u.functionNameResolver,
                          },
                        );
                        let a = s.find((t) => t.key === e);
                        (a || ((a = { key: e, nodes: [] }), s.push(a)),
                          a.nodes.push(t.contextItem));
                      }),
                      s
                    );
                  })(t, s, e.groupBy, o))
                : e.groupAdjacent
                  ? (r = (function (t, e, n, o) {
                      const r = A(t.variableScopes);
                      let s = [],
                        a = null,
                        c = [];
                      return (
                        O(e, t, (t) => {
                          const e = t.contextItem,
                            l = (0, i.evaluateXPathToString)(n, e, void 0, r, {
                              currentContext: t,
                              namespaceResolver: o,
                              functionNameResolver: u.functionNameResolver,
                            });
                          l !== a
                            ? (k(s, c, a), (a = l), (c = [e]))
                            : c.push(e);
                        }),
                        k(s, c, a),
                        s
                      );
                    })(t, s, e.groupAdjacent, o))
                  : e.groupEndingWith
                    ? (r = (function (t, e, n, o) {
                        let r = [],
                          s = [];
                        return (
                          O(e, t, (t) => {
                            const e = t.contextItem;
                            (s.push(e),
                              v(
                                t.patternMatchCache,
                                n,
                                e,
                                t.variableScopes,
                                o,
                              ) && (k(r, s), (s = [])));
                          }),
                          k(r, s),
                          r
                        );
                      })(t, s, e.groupEndingWith, o))
                    : e.groupStartingWith &&
                      (r = (function (t, e, n, o) {
                        let r = [],
                          s = [];
                        return (
                          O(e, t, (t) => {
                            const e = t.contextItem;
                            (v(
                              t.patternMatchCache,
                              n,
                              e,
                              t.variableScopes,
                              o,
                            ) && (k(r, s), (s = [])),
                              s.push(e));
                          }),
                          k(r, s),
                          r
                        );
                      })(t, s, e.groupStartingWith, o)),
                (r = D(t, r, e.sortKeyComponents, o)),
                j(r, t, n));
            }
          }),
          (e.number = function (t, e) {
            const n = (0, p.mkResolver)(e.namespaces),
              o = A(t.variableScopes);
            let r;
            (e.value
              ? (r = (0, i.evaluateXPathToNumber)(
                  e.value,
                  t.contextItem,
                  void 0,
                  o,
                  {
                    currentContext: t,
                    namespaceResolver: n,
                    functionNameResolver: u.functionNameResolver,
                  },
                ))
              : "single" === e.level &&
                void 0 === e.value &&
                void 0 === e.select &&
                void 0 === e.count &&
                (r = t.position),
              t.append(
                (0, m.formatNumber)(
                  [r],
                  e.format,
                  e.groupingSeparator,
                  e.groupingSize,
                ),
              ));
          }),
          (e.mkNodeAppender = Y),
          (e.mkArrayAppender = z),
          (e.resultDocument = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces);
            function r(e) {
              return B(t, e, o);
            }
            const s = r(e.format);
            let a = (0, p.mkOutputDefinition)({
              omitXmlDeclaration: r(e.omitXmlDeclaration),
              doctypePublic: r(e.doctypePublic),
              doctypeSystem: r(e.doctypeSystem),
              standalone: r(e.standalone),
            });
            Object.keys(a).forEach((t) => {
              a[t] || delete a[t];
            });
            const i = Object.assign(
                Object.assign({}, s ? t.outputDefinitions.get(s) : {}),
                a,
              ),
              c = r(e.href);
            let u = null;
            if (
              ((i.doctypePublic || i.doctypeSystem) &&
                (u = t.outputDocument.implementation.createDocumentType(
                  "out",
                  i.doctypePublic || "",
                  i.doctypeSystem || "",
                )),
              c)
            ) {
              const e = t.outputDocument.implementation.createDocument(
                null,
                null,
                u,
              );
              if (t.resultDocuments.has(c))
                throw new Error(`XTDE1490: ${c} is a duplicate`);
              (t.resultDocuments.set(
                c,
                Object.assign(Object.assign({}, i), { document: e }),
              ),
                n(
                  Object.assign(Object.assign({}, t), {
                    outputDocument: e,
                    append: Y(e),
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
                (t.append = Y(e))),
                t.resultDocuments.set(
                  "#default",
                  Object.assign(Object.assign({}, i), { document: e }),
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
          (e.evaluateAttributeValueTemplate = B),
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
          }),
          (e.initialize = function (t, e) {}));
        const i = n(594),
          c = a(n(898)),
          u = n(379),
          l = n(712),
          p = n(777),
          m = n(845),
          d = n(324),
          f = n(320);
        function x(t, e) {
          if ((e(t), t.childNodes)) for (let n of t.childNodes) x(n, e);
        }
        function h(t) {
          return Array.isArray(t)
            ? t.map((t) => h(t)).join("")
            : t.nodeType
              ? t.textContent
              : t.toString();
        }
        function g(t, e, n, o) {
          t.has(e) || t.set(e, new Map());
          const r = t.get(e);
          return (r.has(n) || r.set(n, o()), r.get(n));
        }
        (Object.defineProperty(e, "selfNode", {
          enumerable: !0,
          get: function () {
            return f.selfNode;
          },
        }),
          Object.defineProperty(e, "NodeAttributeFeature", {
            enumerable: !0,
            get: function () {
              return f.NodeAttributeFeature;
            },
          }),
          Object.defineProperty(e, "NodeNamespaceFeature", {
            enumerable: !0,
            get: function () {
              return f.NodeNamespaceFeature;
            },
          }),
          Object.defineProperty(e, "NodeNameFeature", {
            enumerable: !0,
            get: function () {
              return f.NodeNameFeature;
            },
          }),
          Object.defineProperty(e, "NodeTextFeature", {
            enumerable: !0,
            get: function () {
              return f.NodeTextFeature;
            },
          }),
          Object.defineProperty(e, "NodeTypeFeature", {
            enumerable: !0,
            get: function () {
              return f.NodeTypeFeature;
            },
          }),
          (e.KeyImpl = class {
            constructor(t, e, n) {
              ((this.match = t),
                (this.use = e),
                (this.namespaces = n),
                (this.cache = new Map()));
            }
            buildDocumentCache(t, e, n) {
              let o = new Map();
              return (
                x(e, (e) => {
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
                    let t = (0, i.evaluateXPathToString)(this.use, e);
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
                this.cache.get(e).get(h(o))
              );
            }
          }));
        const w = new RegExp(/^[a-z |-]+$/),
          T = new RegExp(/^@[a-z]+$/),
          y = new RegExp(/text\(\)|node\(\)/),
          N = new RegExp(/@|attribute|node/);
        function v(t, e, n, o, r) {
          return !(
            !n ||
            (function (t, e) {
              return (
                (e.nodeType === l.NodeType.ATTRIBUTE && !N.exec(t)) ||
                (e.nodeType === l.NodeType.TEXT && !y.exec(t)) ||
                !(!w.exec(t) || e.nodeType === l.NodeType.ELEMENT) ||
                !(!T.exec(t) || e.nodeType === l.NodeType.ATTRIBUTE)
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
                  let s = n;
                  for (; s; ) {
                    const a = g(t, e.xpath, s, () =>
                      e.compiled
                        ? (0, i.executeJavaScriptCompiledXPath)(e.compiled, s)
                        : (0, i.evaluateXPathToNodes)(
                            e.xpath,
                            s,
                            void 0,
                            A(o),
                            {
                              namespaceResolver: r,
                              functionNameResolver: u.functionNameResolver,
                            },
                          ),
                    );
                    if (-1 !== a.indexOf(n)) return a;
                    s =
                      s.parentNode ||
                      (s.nodeType === l.NodeType.ATTRIBUTE && s.ownerElement);
                  }
                })(t, e, n, o, r))
          );
        }
        function* b(t) {
          let e = new Set(),
            n = t.next();
          for (; !n.done; )
            (e.has(n.value) || (yield n.value, e.add(n.value)), (n = t.next()));
        }
        function* E(t, e) {
          let n = [t.next(), e.next()];
          for (; !n[0].done || !n[1].done; )
            n[0].done
              ? (yield n[1].value, (n[1] = e.next()))
              : n[1].done || (0, p.compareSortable)(n[0].value, n[1].value) < 0
                ? (yield n[0].value, (n[0] = t.next()))
                : (yield n[1].value, (n[1] = e.next()));
        }
        function I(t, e, n) {
          let o = (function* (t, e, n, o) {
              const r = (0, d.findMatchingRules)(e, t).map((t) => n[t]);
              for (let t of (0, p.sortSortable)(r))
                ("#all" === t.modes[0] || t.modes.includes(o)) && (yield t);
            })(t.contextItem, t.ruleTree, t.templates, t.mode),
            r = (function* (t, e, n, o, r, s, a) {
              for (let [i, c] of n) {
                const n = o[c];
                i &&
                  ("#all" === n.modes[0] || n.modes.includes(s)) &&
                  v(t, i, e, r, (0, p.mkResolver)(a)) &&
                  (yield n);
              }
            })(
              t.patternMatchCache,
              t.contextItem,
              t.nonRuleTemplateIndexes,
              t.templates,
              t.variableScopes,
              t.mode,
              n,
            ),
            s = b(E(o, r));
          const a = s.next();
          a.done ||
            L(
              a.value,
              Object.assign(Object.assign({}, t), { nextMatches: s }),
              e,
            );
        }
        function S(t, e, n, o) {
          let r;
          return (
            (r =
              "number" === n.dataType
                ? (function (t, e, n, o) {
                    const r = R(e, t, (t) => {
                      let e;
                      const r = G(t, n.sortKey, o);
                      return (
                        (e = Number(r)),
                        isNaN(e) && (e = Number.MIN_SAFE_INTEGER),
                        e
                      );
                    });
                    return (0, p.zip)(r, e)
                      .sort((t, e) => t[0] - e[0])
                      .map((t) => t[1]);
                  })(t, e, n, o)
                : (function (t, e, n, o) {
                    const r = R(e, t, (t) => G(t, n.sortKey, o)),
                      s = n.lang && B(t, n.lang, o);
                    let a = new Intl.Collator(s).compare;
                    return (0, p.zip)(r, e)
                      .sort((t, e) => a(t[0], e[0]))
                      .map((t) => t[1]);
                  })(t, e, n, o)),
            "descending" === B(t, n.order, o) && r.reverse(),
            r
          );
        }
        function R(t, e, n) {
          if (t.length > 0)
            return (0, l.isNodeGroupArray)(t) ? j(t, e, n) : O(t, e, n);
        }
        function O(t, e, n) {
          let o = 0;
          return t.map(
            (r) => (
              o++,
              n(
                Object.assign(Object.assign({}, e), {
                  contextItem: r,
                  contextList: t,
                  position: o,
                }),
              )
            ),
          );
        }
        function j(t, e, n) {
          let o = 0;
          return t.map((t) => {
            o++;
            const r = Object.assign(Object.assign({}, e), {
              contextItem: t.nodes[0],
              contextList: t.nodes,
              currentGroup: t,
              position: o,
              variableScopes: C(e.variableScopes),
            });
            return n(r);
          });
        }
        function D(t, e, n, o) {
          if (n) for (let r of [...n].reverse()) e = S(t, e, r, o);
          return e;
        }
        function P(t, e) {
          for (let n of e) if (n.name === t) return n;
        }
        function L(t, e, n) {
          let o = C(e.variableScopes);
          for (let r of t.allowedParams) {
            let t = P(r.name, n);
            void 0 !== t ? _(o, t.name, J(e, t)) : _(o, r.name, J(e, r));
          }
          return t.apply(
            Object.assign(Object.assign({}, e), { variableScopes: o }),
          );
        }
        function C(t) {
          return t.concat([new Map()]);
        }
        let X = new Map();
        function M(t) {
          return (
            X.has(t) || X.set(t, (0, i.createTypedValueFactory)(t)),
            X.get(t)
          );
        }
        function $(t, e) {
          if (Array.isArray(t) && 0 === t.length) return M("item()*")([], null);
          if (e)
            try {
              return M(e)(t, null);
            } catch (t) {}
          const n = Array.isArray(t),
            o = n ? t[0] : t;
          let r = "item()";
          const s = n ? "*" : "";
          return (
            "string" == typeof o
              ? (r = "xs:string")
              : "number" == typeof o &&
                (r = Number.isInteger(o) ? "xs:integer" : "xs:numeric"),
            M(`${r}${s}`)(t, null)
          );
        }
        function _(t, e, n) {
          t[t.length - 1].set(e, n);
        }
        function A(t) {
          let e = {};
          for (let n of t) for (let [t, o] of n) e[t] = o;
          return e;
        }
        function U(t, e) {
          let n;
          return (
            (n =
              void 0 !== e.namespace && null !== e.namespace
                ? t.outputDocument.createElementNS(e.namespace, e.name)
                : t.outputDocument.createElement(e.name)),
            n
          );
        }
        function F(t, e) {
          let n;
          return (
            (n = e.namespace
              ? t.outputDocument.createAttributeNS(e.namespace, e.name)
              : t.outputDocument.createAttribute(e.name)),
            (n.value = e.value),
            n
          );
        }
        function k(t, e, n) {
          e.length > 0 &&
            (null === n && (n = `group-${t.length + 1}`),
            t.push({ key: n, nodes: e }));
        }
        function Y(t) {
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
                return (o = o.documentElement) ? (n(o), Y(o)) : Y(t);
              }
              if (o.nodeType === l.NodeType.DOCUMENT_FRAGMENT) n(o.childNodes);
              else if (o.nodeType === l.NodeType.TEXT) n(o.data);
              else {
                if (o.nodeType) {
                  let n = e.importNode(o, !0);
                  return (t.append(n), Y(n));
                }
                n(`${o}`);
              }
            }
          };
        }
        function z(t) {
          return function (e) {
            if (
              (t.push(e),
              e.nodeType &&
                (e.nodeType === l.NodeType.DOCUMENT ||
                  e.nodeType === l.NodeType.ELEMENT))
            )
              return Y(e);
          };
        }
        function B(t, e, n) {
          if (e)
            return e
              .map((e) =>
                "string" == typeof e
                  ? e
                  : (0, i.evaluateXPathToString)(
                      e.xpath,
                      t.contextItem,
                      void 0,
                      A(t.variableScopes),
                      {
                        currentContext: t,
                        namespaceResolver: n,
                        functionNameResolver: u.functionNameResolver,
                      },
                    ),
              )
              .join("");
        }
        function G(t, e, n, o) {
          o || (o = "string" == typeof e ? [" "] : []);
          const r = B(t, o, n);
          return "string" == typeof e
            ? (0, i.evaluateXPath)(
                e,
                t.contextItem,
                void 0,
                A(t.variableScopes),
                i.evaluateXPath.STRINGS_TYPE,
                {
                  currentContext: t,
                  namespaceResolver: n,
                  functionNameResolver: u.functionNameResolver,
                },
              ).join(r)
            : (function (t) {
                let e = [];
                return (
                  x(t, (t) => {
                    t.nodeType === l.NodeType.TEXT &&
                      "" !== t.data &&
                      (e = e.concat(t.data));
                  }),
                  e
                );
              })(K(t, e)).join(r);
        }
        function J(t, e) {
          if ("string" == typeof e.content) {
            const n = e.as && e.as.match(/[\+\*]$/);
            let o = (0, i.evaluateXPath)(
              e.content,
              t.contextItem,
              void 0,
              A(t.variableScopes),
              i.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: u.functionNameResolver,
              },
            );
            return (1 !== o.length || n || (o = o[0]), $(o, e.as));
          }
          return null == e.content
            ? ""
            : e.as
              ? $(
                  (function (t, e) {
                    let n = [];
                    return (
                      e(
                        Object.assign(Object.assign({}, t), {
                          append: z(n),
                          mode: "#default",
                          variableScopes: C(t.variableScopes),
                        }),
                      ),
                      1 === n.length ? n[0] : n
                    );
                  })(t, e.content),
                  e.as,
                )
              : K(t, e.content);
        }
        function K(t, e) {
          return (function (t, e) {
            const n = t.outputDocument.createDocumentFragment();
            if (
              (e(Y(n)), 1 === n.childNodes.length && 1 === n.childElementCount)
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
                variableScopes: C(t.variableScopes),
              }),
            );
          });
        }
        (0, u.registerFunctions)();
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
      var s = (e[o] = { exports: {} });
      return (t[o].call(s.exports, s, s.exports, n), s.exports);
    })(754);
  module.exports = n.transform;
})();
