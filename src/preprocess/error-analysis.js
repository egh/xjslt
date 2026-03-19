(() => {
  var t = {
      762(t, e, n) {
        (n(898), n(594));
        let o = n(821);
        function a(t, e) {
          e = o.setParamDefaults(t, e);
          let n = new Map();
          n.set("#default", { document: e.outputDocument });
          let a = new Map(),
            r = new Map(),
            c = new Map(),
            s = {
              outputDocument: e.outputDocument,
              append: o.mkNodeAppender(e.outputNode),
              resultDocuments: n,
              contextItem: t,
              contextList: [t],
              position: 1,
              mode: e.initialMode,
              templates: [
                {
                  match: {
                    xpath: "xsl:choose[text()[normalize-space(.)]]",
                    compiled: void 0,
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
                          "XTSE0010: xsl:choose may not contain text content.",
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
                    xpath: "xsl:apply-imports/xsl:*[not(self::xsl:with-param)]",
                    compiled: void 0,
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
                          "XTSE0010: xsl:apply-imports may only contain xsl:with-param children.",
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
                    xpath:
                      "xsl:apply-templates/xsl:*[not(self::xsl:sort) and not(self::xsl:with-param)]",
                    compiled: void 0,
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
                          "XTSE0010: xsl:apply-templates may only contain xsl:sort and xsl:with-param children.",
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
                    xpath: "xsl:call-template/xsl:*[not(self::xsl:with-param)]",
                    compiled: void 0,
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
                          "XTSE0010: xsl:call-template may only contain xsl:with-param children.",
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
                    xpath:
                      "xsl:strip-space[not(@elements)] | xsl:preserve-space[not(@elements)]",
                    compiled: void 0,
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
                          "XTSE0010: xsl:strip-space/xsl:preserve-space requires an @elements attribute.",
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
                    xpath: "xsl:attribute-set[text()[normalize-space(.)]]",
                    compiled: void 0,
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
                          "XTSE0010: xsl:attribute-set may not contain text content.",
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
                    xpath: "xsl:attribute-set/*[not(self::xsl:attribute)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-attribute-set");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-attribute-set")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "attribute-set" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tfor (let contextItem2 = domFacade.getFirstChild(contextItem1, "type-1");\n\t\t\t\t\t\t\tcontextItem2;\n\t\t\t\t\t\t\tcontextItem2 = domFacade.getNextSibling(contextItem2, "type-1")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem2.nodeType\n\t\t\t\t\t\t&& contextItem2.nodeType === /*ELEMENT_NODE*/ 1 && (function () {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\treturn !!!((contextItem2.nodeType\n\t\t\t\t\t\t&& (contextItem2.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem2.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem2.localName === "attribute" && (contextItem2.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) ? contextItem2 : null);\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem2;\n\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:attribute-set may only contain xsl:attribute elements.",
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
                    xpath: "xsl:attribute-set[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-attribute-set");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-attribute-set")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "attribute-set" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:attribute-set requires a @name attribute.",
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
                    xpath: "xsl:key[not(@match)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-key");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-key")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "key" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-match") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "match" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:key requires a @match attribute.",
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
                    xpath:
                      "xsl:param[not(parent::xsl:stylesheet or parent::xsl:transform or parent::xsl:template or parent::xsl:function)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes4 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-param");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-param")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "param" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tconst contextItem3 = domFacade.getParentNode(contextItem2, "name-stylesheet");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem3 && contextItem3.nodeType\n\t\t\t\t\t\t&& contextItem3.nodeType === /*ELEMENT_NODE*/ 1 && contextItem3.localName === "stylesheet" && (contextItem3.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t\t}\n\t\t});\nconst nodes1 = (function* (contextItem4) {\n\t\t\t\n\t\t\tconst contextItem5 = domFacade.getParentNode(contextItem4, "name-transform");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem5 && contextItem5.nodeType\n\t\t\t\t\t\t&& contextItem5.nodeType === /*ELEMENT_NODE*/ 1 && contextItem5.localName === "transform" && (contextItem5.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem5;\n\t\t\t\t\t\t}\n\t\t});\nconst nodes2 = (function* (contextItem6) {\n\t\t\t\n\t\t\tconst contextItem7 = domFacade.getParentNode(contextItem6, "name-template");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem7 && contextItem7.nodeType\n\t\t\t\t\t\t&& contextItem7.nodeType === /*ELEMENT_NODE*/ 1 && contextItem7.localName === "template" && (contextItem7.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem7;\n\t\t\t\t\t\t}\n\t\t});\nconst nodes3 = (function* (contextItem8) {\n\t\t\t\n\t\t\tconst contextItem9 = domFacade.getParentNode(contextItem8, "name-function");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem9 && contextItem9.nodeType\n\t\t\t\t\t\t&& contextItem9.nodeType === /*ELEMENT_NODE*/ 1 && contextItem9.localName === "function" && (contextItem9.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem9;\n\t\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !(((!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})() || !!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes1(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})()) || !!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes2(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})()) || !!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes3(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})());\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes4(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:param is not allowed in this context.",
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
                    xpath: "xsl:param[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-param");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-param")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "param" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:param requires a @name attribute.",
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
                    xpath:
                      "xsl:variable[not(@name)] | xsl:with-param[not(@name)]",
                    compiled: void 0,
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
                          "XTSE0010: xsl:variable/xsl:with-param requires a @name attribute.",
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
                    xpath:
                      "xsl:stylesheet[not(@version)] | xsl:transform[not(@version)]",
                    compiled: void 0,
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
                          "XTSE0010: xsl:stylesheet/xsl:transform requires a @version attribute.",
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
                    xpath:
                      "xsl:for-each/xsl:sort[preceding-sibling::*[not(self::xsl:sort)]]",
                    compiled: void 0,
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
                          "XTSE0010: xsl:sort must precede all other children of xsl:for-each.",
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
                    xpath:
                      "xsl:sort[not(parent::xsl:apply-templates or parent::xsl:for-each or parent::xsl:for-each-group or parent::xsl:perform-sort)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes4 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-sort");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-sort")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "sort" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tconst contextItem3 = domFacade.getParentNode(contextItem2, "name-apply-templates");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem3 && contextItem3.nodeType\n\t\t\t\t\t\t&& contextItem3.nodeType === /*ELEMENT_NODE*/ 1 && contextItem3.localName === "apply-templates" && (contextItem3.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t\t}\n\t\t});\nconst nodes1 = (function* (contextItem4) {\n\t\t\t\n\t\t\tconst contextItem5 = domFacade.getParentNode(contextItem4, "name-for-each");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem5 && contextItem5.nodeType\n\t\t\t\t\t\t&& contextItem5.nodeType === /*ELEMENT_NODE*/ 1 && contextItem5.localName === "for-each" && (contextItem5.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem5;\n\t\t\t\t\t\t}\n\t\t});\nconst nodes2 = (function* (contextItem6) {\n\t\t\t\n\t\t\tconst contextItem7 = domFacade.getParentNode(contextItem6, "name-for-each-group");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem7 && contextItem7.nodeType\n\t\t\t\t\t\t&& contextItem7.nodeType === /*ELEMENT_NODE*/ 1 && contextItem7.localName === "for-each-group" && (contextItem7.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem7;\n\t\t\t\t\t\t}\n\t\t});\nconst nodes3 = (function* (contextItem8) {\n\t\t\t\n\t\t\tconst contextItem9 = domFacade.getParentNode(contextItem8, "name-perform-sort");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem9 && contextItem9.nodeType\n\t\t\t\t\t\t&& contextItem9.nodeType === /*ELEMENT_NODE*/ 1 && contextItem9.localName === "perform-sort" && (contextItem9.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem9;\n\t\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !(((!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})() || !!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes1(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})()) || !!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes2(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})()) || !!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes3(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})());\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes4(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:sort is not allowed in this context.",
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
                    xpath: "xsl:function[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-function");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-function")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "function" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:function requires a @name attribute.",
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
                    xpath: "xsl:for-each-group",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-for-each-group");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-for-each-group")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "for-each-group" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  name: void 0,
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (t) => {
                    (o.ifX(
                      t,
                      {
                        test: "not(@select)",
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
                              "XTSE1290: xsl:for-each-group requires a @select attribute.",
                            );
                          },
                        );
                      },
                    ),
                      o.ifX(
                        t,
                        {
                          test: "not(@group-by) and not(@group-adjacent) and not(@group-starting-with) and not(@group-ending-with)",
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
                                "XTSE1295: xsl:for-each-group must have one of @group-by, @group-adjacent, @group-starting-with, or @group-ending-with.",
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
                    xpath:
                      "xsl:number[@level and not(@level = ('single', 'multiple', 'any'))]",
                    compiled: void 0,
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
                          'XTSE1120: The @level attribute of xsl:number must be "single", "multiple", or "any".',
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
                    xpath: "xsl:copy-of[not(@select)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-copy-of");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-copy-of")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "copy-of" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-select") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "select" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:copy-of requires a @select attribute.",
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
                    xpath: "xsl:processing-instruction[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-processing-instruction");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-processing-instruction")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "processing-instruction" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0910: xsl:processing-instruction requires a @name attribute.",
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
                    xpath: "xsl:namespace[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-namespace");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-namespace")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "namespace" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:namespace requires a @name attribute.",
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
                    xpath: "xsl:attribute[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-attribute");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-attribute")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "attribute" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:attribute requires a @name attribute.",
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
                    xpath: "xsl:element[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-element");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-element")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "element" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:element requires a @name attribute.",
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
                    xpath: "xsl:when[not(@test)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-when");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-when")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "when" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-test") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "test" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:when requires a @test attribute.",
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
                    xpath: "xsl:otherwise[not(parent::xsl:choose)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-otherwise");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-otherwise")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "otherwise" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tconst contextItem3 = domFacade.getParentNode(contextItem2, "name-choose");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem3 && contextItem3.nodeType\n\t\t\t\t\t\t&& contextItem3.nodeType === /*ELEMENT_NODE*/ 1 && contextItem3.localName === "choose" && (contextItem3.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:otherwise may only appear as a child of xsl:choose.",
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
                    xpath: "xsl:when[not(parent::xsl:choose)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-when");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-when")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "when" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tconst contextItem3 = domFacade.getParentNode(contextItem2, "name-choose");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem3 && contextItem3.nodeType\n\t\t\t\t\t\t&& contextItem3.nodeType === /*ELEMENT_NODE*/ 1 && contextItem3.localName === "choose" && (contextItem3.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:when may only appear as a child of xsl:choose.",
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
                    xpath: "xsl:choose/xsl:otherwise[following-sibling::*]",
                    compiled: void 0,
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
                          "XTSE0010: xsl:otherwise must be the last child of xsl:choose.",
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
                    xpath: "xsl:choose[not(xsl:when)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-choose");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-choose")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "choose" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (let contextItem3 = domFacade.getFirstChild(contextItem2, "name-when");\n\t\t\t\t\t\t\tcontextItem3;\n\t\t\t\t\t\t\tcontextItem3 = domFacade.getNextSibling(contextItem3, "name-when")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& contextItem3.nodeType === /*ELEMENT_NODE*/ 1 && contextItem3.localName === "when" && (contextItem3.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:choose must contain at least one xsl:when child element.",
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
                    xpath: "xsl:for-each[not(@select)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-for-each");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-for-each")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "for-each" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-select") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "select" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:for-each requires a @select attribute.",
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
                    xpath: "xsl:if[not(@test)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-if");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-if")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "if" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-test") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "test" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:if requires a @test attribute.",
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
                    xpath: "xsl:call-template[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-call-template");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-call-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "call-template" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
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
                          "XTSE0010: xsl:call-template requires a @name attribute.",
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
                    xpath:
                      "xsl:for-each//xsl:apply-imports | xsl:for-each-group//xsl:apply-imports",
                    compiled: void 0,
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
                          "XTSE0010: xsl:apply-imports may not appear inside xsl:for-each or xsl:for-each-group.",
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
                      o.ifX(
                        t,
                        {
                          test: "@priority and not(number(@priority) = number(@priority))",
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
                                "XTSE0505: The @priority attribute of xsl:template must be a number.",
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
              keys: a,
              outputDefinitions: r,
              decimalFormats: c,
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
        ((t.exports.transform = a), (global.transform = a));
      },
      712(t, e) {
        "use strict";
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.DEFAULT_DECIMAL_FORMAT =
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
        const n = String.raw`[^,:\(\)\*\[\]/]`,
          o = String.raw`(child::|attribute::|@)?`,
          a = String.raw`(document-node\()?`;
        var r;
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
            [new RegExp(String.raw`^\s*${a}${o}processing-instruction`), 0],
            [new RegExp(String.raw`^\s*${a}${o}element\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${a}${o}attribute\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${a}${o}element\(${n}+\)\)?\s*$`), 0],
            [
              new RegExp(String.raw`^\s*${a}${o}element\(\*,\s*${n}+\)\)?\s*$`),
              0,
            ],
            [new RegExp(String.raw`^\s*${a}${o}attribute\(${n}+\)\)?\s*$`), 0],
            [
              new RegExp(
                String.raw`^\s*${a}${o}attribute\(\*,\s*${n}+\)\)?\s*$`,
              ),
              0,
            ],
            [
              new RegExp(
                String.raw`^\s*${a}${o}element\(${n}+,\s*${n}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${a}${o}attribute\(${n}+,\s*${n}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${a}${o}schema-element\(${n}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${a}${o}schema-attribute\(${n}+\)\)?\s*$`,
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
          })(r || (e.NodeType = r = {})),
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
          }));
      },
      379(t, e, n) {
        "use strict";
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.functionNameResolver = g),
          (e.registerFunctions = function () {
            ((0, o.registerCustomXPathFunction)(
              { namespaceURI: a.XJSLT_NSURI, localName: "current" },
              [],
              "item()",
              s,
            ),
              (0, o.registerCustomXPathFunction)(
                {
                  namespaceURI: a.XJSLT_NSURI,
                  localName: "current-output-uri",
                },
                [],
                "xs:string",
                d,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XJSLT_NSURI, localName: "doc" },
                ["xs:string"],
                "document-node()",
                m,
              ),
              (0, o.registerCustomXPathFunction)(
                {
                  namespaceURI: a.XJSLT_NSURI,
                  localName: "current-grouping-key",
                },
                [],
                "xs:string?",
                i,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XJSLT_NSURI, localName: "current-group" },
                [],
                "item()*",
                l,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XJSLT_NSURI, localName: "positionx" },
                [],
                "xs:integer",
                p,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XJSLT_NSURI, localName: "lastx" },
                [],
                "xs:integer",
                u,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XJSLT_NSURI, localName: "key" },
                ["xs:string", "item()*"],
                "node()*",
                x,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XJSLT_NSURI, localName: "system-property" },
                ["xs:string"],
                "xs:string",
                f,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XJSLT_NSURI, localName: "base-uri" },
                [],
                "xs:string?",
                I,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XJSLT_NSURI, localName: "base-uri" },
                ["node()?"],
                "xs:string?",
                I,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XJSLT_NSURI, localName: "evaluate" },
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
                        functionNameResolver: g,
                      },
                    );
                    return 1 === n.length ? n[0] : n;
                  })(t, e),
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XJSLT_NSURI, localName: "normalize-unicode" },
                ["xs:string?"],
                "xs:string",
                (t, e) => w(0, e, "NFC"),
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XJSLT_NSURI, localName: "normalize-unicode" },
                ["xs:string?", "xs:string"],
                "xs:string",
                w,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XJSLT_NSURI, localName: "format-number" },
                ["xs:numeric", "xs:string"],
                "xs:string",
                h,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: a.XJSLT_NSURI, localName: "format-number" },
                ["xs:numeric", "xs:string", "xs:string"],
                "xs:string",
                h,
              ));
          }));
        const o = n(594),
          a = n(712),
          r = n(845),
          c = n(472);
        function s({ currentContext: t }) {
          return t.contextItem;
        }
        function m({ currentContext: t }, e) {
          return (0, c.urlToDom)(t, e);
        }
        function i({ currentContext: t }) {
          return t.currentGroup.key;
        }
        function l({ currentContext: t }) {
          return t.currentGroup.nodes;
        }
        function p({ currentContext: t }) {
          return t.position;
        }
        function u({ currentContext: t }) {
          return t.contextList.length;
        }
        function d({ currentContext: t }) {
          for (const [e, n] of t.resultDocuments)
            if (n === t.outputDocument) return e;
          return "#default";
        }
        function x({ currentContext: t }, e, n) {
          const {
            keys: o,
            contextItem: a,
            variableScopes: r,
            patternMatchCache: c,
          } = t;
          if (!o.has(e)) throw new Error("XTDE1260");
          return o.get(e).lookup(c, a.ownerDocument, r, n) || [];
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
        function I({ currentContext: t }, e) {
          const n = void 0 !== e ? e : t.contextItem;
          if (!n) return null;
          let o = n;
          const a = [];
          for (; o; ) {
            const t =
              1 === o.nodeType
                ? o.getAttributeNS(
                    "http://www.w3.org/XML/1998/namespace",
                    "base",
                  )
                : null;
            (t && a.unshift(t), (o = o.parentNode));
          }
          let r = t.inputURL || void 0;
          for (const t of a) r = URL.parse(t, r) || t;
          return r;
        }
        function w(t, e, n) {
          if (null == e) return "";
          const o = n.toUpperCase().replace("-", "");
          if (!["NFC", "NFD", "NFKC", "NFKD"].includes(o))
            throw new Error("FOCH0003: Normalization form not supported.");
          return e.normalize(o);
        }
        function h({ currentContext: t }, e, n, o) {
          var c, s;
          const m = o || "#default",
            i =
              null !==
                (s =
                  null === (c = t.decimalFormats) || void 0 === c
                    ? void 0
                    : c.get(m)) && void 0 !== s
                ? s
                : a.DEFAULT_DECIMAL_FORMAT;
          return (0, r.formatNumberWithPicture)(e, n, i);
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
        function g({ prefix: t, localName: e }, n) {
          return (t && "fn" !== t) || !T.includes(e)
            ? null
            : { namespaceURI: a.XJSLT_NSURI, localName: e };
        }
      },
      845(t, e, n) {
        "use strict";
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.toAlphabeticUpper = e.toAlphabetic = void 0),
          (e.groupNumeric = c),
          (e.toNumeric = s),
          (e.mkToAlphabetic = m),
          (e.toRoman = i),
          (e.formatWithToken = l),
          (e.formatNumber = function (t, e, n, o) {
            const a = [];
            e.prefix && a.push(e.prefix);
            for (let r = 0; r < t.length; r++) {
              const c = Math.min(r, e.formats.length - 1),
                s = e.formats[c];
              if (!s) throw new Error("No number format found");
              (s.separator && 0 !== r && a.push(s.separator),
                a.push(l(t[r], s.format, n, o)));
            }
            return (e.suffix && a.push(e.suffix), a.join(""));
          }),
          (e.remapDigits = u),
          (e.formatNumberWithPicture = function (t, e, n) {
            if (isNaN(t)) return n.nan;
            if (!isFinite(t)) return (t < 0 ? n.minusSign : "") + n.infinity;
            const r = e.split(n.patternSeparator);
            let m;
            if (t < 0)
              if (r.length > 1) m = p(r[1], n);
              else {
                const t = p(r[0], n);
                m = Object.assign(Object.assign({}, t), {
                  prefix: `${n.minusSign}${t.prefix || ""}`,
                });
              }
            else m = p(r[0], n);
            return (function (t, e, n) {
              var r;
              e.isPercent ? (t *= 100) : e.isPerMille && (t *= 1e3);
              const m = (0, o.evaluateXPathToNumber)(
                "round-half-to-even($number, $precision)",
                void 0,
                void 0,
                {
                  number: (0, a.wrapValue)(t, "xs:double"),
                  precision: (0, a.wrapValue)(e.decimalMaxDigits, "xs:integer"),
                },
              );
              let i = c(
                  s(Math.trunc(m), e.integerMinDigits),
                  n.groupingSeparator,
                  e.integerGroupSize,
                ),
                l =
                  null !== (r = m.toString().split(".")[1]) && void 0 !== r
                    ? r
                    : "";
              for (; l.length < e.decimalMinDigits; ) l += "0";
              const p = l.length > 0 ? n.decimalSeparator : "",
                d = n.zeroDigit.codePointAt(0);
              return (
                48 !== d && ((i = u(i, d)), (l = u(l, d))),
                `${e.prefix}${i}${p}${l}${e.suffix}`
              );
            })(Math.abs(t), m, n);
          }));
        const o = n(594),
          a = n(821),
          r = [
            49, 1633, 1777, 2407, 2535, 2663, 2791, 2919, 3047, 3175, 3303,
            3431, 3559, 3665, 3793, 3873, 4161, 4241, 6113, 6161, 6471, 6609,
            6785, 6801, 6993, 7089, 7233, 7249, 42529, 43217, 43265, 43473,
            43505, 43601, 44017, 65297, 66721, 68913, 69735, 69873, 69943,
            70097, 70385, 70737, 70865, 71249, 71361, 71473, 71905, 72785,
            73041, 73121, 92769, 93009, 120783, 120793, 120803, 120813, 120823,
            125265,
          ];
        function c(t, e, n) {
          if (!e || !n || t.length <= n) return t;
          const o = [];
          let a = t;
          for (; a.length > n; ) (o.unshift(a.slice(-n)), (a = a.slice(0, -n)));
          return (a && o.unshift(a), o.join(e));
        }
        function s(t, e) {
          return t.toString().padStart(e, "0");
        }
        function m(t, e) {
          const n = e - t + 1,
            o = [...Array(n)].map((e, n) => String.fromCodePoint(t + n));
          return function (t) {
            if (0 === t) return "0";
            let e = "",
              a = t;
            for (; a > 0; ) (a--, (e = o[a % n] + e), (a = Math.floor(a / n)));
            return e;
          };
        }
        function i(t) {
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
          for (const [t, a] of e) for (; o >= t; ) ((n += a), (o -= t));
          return n;
        }
        function l(t, n, o, a) {
          if (isNaN(t) || !isFinite(t)) return "";
          if (/0*1/.test(n)) return c(s(t, n.length), o, a);
          if ("A" === n) return (0, e.toAlphabeticUpper)(t) || "";
          if ("a" === n) return (0, e.toAlphabetic)(t) || "";
          if ("I" === n) return i(t).toUpperCase();
          if ("i" === n) return i(t);
          for (const e of r) {
            if (49 === e) continue;
            const r = e - 1;
            if (
              new RegExp(
                `${String.fromCharCode(r)}*${String.fromCharCode(e)}`,
              ).test(n)
            )
              return c(u(s(t, n.length), r), o, a);
          }
          return c(s(t, n.length), o, a);
        }
        function p(t, e) {
          const n = e.zeroDigit,
            o = e.digit,
            a = e.decimalSeparator,
            r = e.groupingSeparator;
          let c = 0,
            s = !1,
            m = !1;
          function i() {
            if (s || m)
              throw new Error(
                "XTDE1310: Multiple percent/per-mille characters.",
              );
          }
          function l() {
            let r = "";
            for (; c < t.length && t[c] !== n && t[c] !== o && t[c] !== a; )
              (t[c] === e.percent && (i(), (s = !0)),
                t[c] === e.perMille && (i(), (m = !0)),
                (r += t[c++]));
            return r;
          }
          const p = l();
          let u,
            d = 0,
            x = 0,
            f = -1;
          for (; c < t.length && t[c] !== a; ) {
            const e = t[c];
            if (e === n) (d++, x++);
            else if (e === o) x++;
            else {
              if (e !== r) break;
              f = x;
            }
            c++;
          }
          f >= 0 && (u = x - f);
          let I = 0,
            w = 0;
          if (c < t.length && t[c] === a)
            for (c++; c < t.length; ) {
              const e = t[c];
              if (e === n) (I++, w++);
              else {
                if (e !== o) break;
                w++;
              }
              c++;
            }
          const h = l();
          if (c < t.length)
            throw new Error(
              `XTDE1310: Active characters after picture string suffix: ${t.slice(c)}`,
            );
          return {
            prefix: p,
            suffix: h,
            integerMinDigits: Math.max(d, 1),
            integerGroupSize: u,
            decimalMinDigits: I,
            decimalMaxDigits: w,
            isPercent: s,
            isPerMille: m,
          };
        }
        function u(t, e) {
          return [...t]
            .map((t) => {
              const n = t.codePointAt(0);
              return n >= 48 && n <= 57 ? String.fromCodePoint(e + n - 48) : t;
            })
            .join("");
        }
        ((e.toAlphabetic = m(97, 122)), (e.toAlphabeticUpper = m(65, 90)));
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
            let a = "";
            return (
              t.includes(":") && ([a, t] = t.split(":")),
              (o = e(a)),
              [o, t]
            );
          }),
          (e.computeDefaultPriority = m),
          (e.sortSortable = function (t) {
            return (
              t.reverse(),
              t.sort((t, e) => {
                var n, o;
                return (
                  (e.priority ||
                    m(
                      null === (n = e.match) || void 0 === n ? void 0 : n.xpath,
                    )) -
                  (t.priority ||
                    m(
                      null === (o = t.match) || void 0 === o ? void 0 : o.xpath,
                    ))
                );
              }),
              t.sort((t, e) => t.importPrecedence - e.importPrecedence),
              t
            );
          }),
          (e.zip = function (t, e) {
            if (void 0 === t || void 0 === e) return [];
            const n = Math.min(t.length, e.length);
            return t.slice(0, n).map((t, n) => [t, e[n]]);
          }));
        const a = String.raw`[^,:\(\)\*\[\]/]`,
          r = String.raw`(child::|attribute::|@)?`,
          c = String.raw`(document-node\()?`,
          s = new Map([
            [new RegExp(String.raw`^\s*/\s*$`), -0.5],
            [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${c}${r}processing-instruction`), 0],
            [new RegExp(String.raw`^\s*${c}${r}element\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${c}${r}attribute\(\*?\)\)?\s*$`), -0.5],
            [new RegExp(String.raw`^\s*${c}${r}element\(${a}+\)\)?\s*$`), 0],
            [
              new RegExp(String.raw`^\s*${c}${r}element\(\*,\s*${a}+\)\)?\s*$`),
              0,
            ],
            [new RegExp(String.raw`^\s*${c}${r}attribute\(${a}+\)\)?\s*$`), 0],
            [
              new RegExp(
                String.raw`^\s*${c}${r}attribute\(\*,\s*${a}+\)\)?\s*$`,
              ),
              0,
            ],
            [
              new RegExp(
                String.raw`^\s*${c}${r}element\(${a}+,\s*${a}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${c}${r}attribute\(${a}+,\s*${a}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${c}${r}schema-element\(${a}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [
              new RegExp(
                String.raw`^\s*${c}${r}schema-attribute\(${a}+\)\)?\s*$`,
              ),
              0.25,
            ],
            [new RegExp(String.raw`^\s*document-node\(\)\s*$`), -0.5],
            [
              new RegExp(
                String.raw`^\s*${r}(node\(\)|text\(\)|comment\(\))\s*$`,
              ),
              -0.5,
            ],
            [new RegExp(String.raw`^\s*${r}(${a}:)?\*\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${r}\*:${a}+\s*$`), -0.25],
            [new RegExp(String.raw`^\s*${r}${a}+\s*$`), 0],
          ]);
        function m(t) {
          if (t && t.includes("|"))
            return Math.max(
              ...t
                .split("|")
                .filter((t) => "" !== t)
                .map((t) => m(t)),
            );
          for (let [e, n] of s) if (e.test(t)) return n;
          return 0.5;
        }
      },
      472(t, e, n) {
        "use strict";
        var o,
          a =
            (this && this.__createBinding) ||
            (Object.create
              ? function (t, e, n, o) {
                  void 0 === o && (o = n);
                  var a = Object.getOwnPropertyDescriptor(e, n);
                  ((a &&
                    !("get" in a
                      ? !e.__esModule
                      : a.writable || a.configurable)) ||
                    (a = {
                      enumerable: !0,
                      get: function () {
                        return e[n];
                      },
                    }),
                    Object.defineProperty(t, o, a));
                }
              : function (t, e, n, o) {
                  (void 0 === o && (o = n), (t[o] = e[n]));
                }),
          r =
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
          c =
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
                for (var n = o(t), c = 0; c < n.length; c++)
                  "default" !== n[c] && a(e, t, n[c]);
              return (r(e, t), e);
            });
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.urlToDom = function (t, e) {
            const n = t.inputURL ? (0, s.resolve)(t.inputURL.toString(), e) : e;
            return n.startsWith("file:")
              ? i.parseXmlDocument(
                  (0, m.readFileSync)(
                    (0, s.fileURLToPath)(new URL(n)),
                  ).toString(),
                )
              : void 0;
          }));
        const s = n(16),
          m = n(896),
          i = c(n(898));
      },
      821(t, e, n) {
        "use strict";
        var o,
          a =
            (this && this.__createBinding) ||
            (Object.create
              ? function (t, e, n, o) {
                  void 0 === o && (o = n);
                  var a = Object.getOwnPropertyDescriptor(e, n);
                  ((a &&
                    !("get" in a
                      ? !e.__esModule
                      : a.writable || a.configurable)) ||
                    (a = {
                      enumerable: !0,
                      get: function () {
                        return e[n];
                      },
                    }),
                    Object.defineProperty(t, o, a));
                }
              : function (t, e, n, o) {
                  (void 0 === o && (o = n), (t[o] = e[n]));
                }),
          r =
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
          c =
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
                for (var n = o(t), c = 0; c < n.length; c++)
                  "default" !== n[c] && a(e, t, n[c]);
              return (r(e, t), e);
            });
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.KeyImpl = void 0),
          (e.visitNodes = d),
          (e.processNode = y),
          (e.nextMatch = function (t, e) {
            const n = t.nextMatches;
            if (n) {
              const o = n.next();
              o.done ||
                X(
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
                X(
                  o.value,
                  Object.assign(Object.assign({}, t), { nextMatches: n }),
                  e.params,
                );
            }
          }),
          (e.sort = b),
          (e.applyTemplates = R),
          (e.callTemplate = function (t, e) {
            for (let n of t.templates)
              if (void 0 !== n.name && e.name === n.name)
                return X(n, t, e.params);
            throw new Error(`Cannot find a template named ${e.name}`);
          }),
          (e.functionX = function (t, e) {
            const n = t.params.map((t) => "item()"),
              o = t.params.map((t) => t.name);
            (0, s.registerCustomXPathFunction)(
              { namespaceURI: t.namespace, localName: t.name },
              n,
              t.as || "item()",
              ({ currentContext: t }, ...n) => {
                let a = new Map();
                return (
                  o.forEach((t, e) => a.set(t, n[e])),
                  z(
                    Object.assign(Object.assign({}, t), {
                      variableScopes: [a].concat(t.variableScopes),
                    }),
                    e,
                  )
                );
              },
            );
          }),
          (e.copy = function (t, e, n) {
            const o = t.contextItem;
            let a, r;
            if (o.nodeType === l.NodeType.ELEMENT) {
              const e = o;
              a = t.outputDocument.createElementNS(
                e.namespaceURI,
                e.prefix ? `${e.prefix}:${e.localName}` : e.localName,
              );
              for (let n of e.attributes)
                if (n.namespaceURI === l.XMLNS_NSURI) {
                  const o = n.localName;
                  a.setAttributeNode(
                    t.outputDocument.importNode(
                      e.getAttributeNodeNS(l.XMLNS_NSURI, o),
                    ),
                  );
                }
            } else
              a =
                o.nodeType === l.NodeType.DOCUMENT
                  ? void 0
                  : t.outputDocument.importNode(o);
            (a && (r = t.append(a)),
              n &&
                n(
                  Object.assign(Object.assign({}, t), {
                    append: r || t.append,
                  }),
                ));
          }),
          (e.copyOf = function (t, e, n) {
            let o = (0, s.evaluateXPath)(
              e.select,
              t.contextItem,
              void 0,
              _(t.variableScopes),
              s.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: i.functionNameResolver,
              },
            );
            for (let e of o) t.append(e);
          }),
          (e.valueOf = D),
          (e.message = function (t, e, n) {
            const o = B(t, e.select || n, (0, p.mkResolver)(e.namespaces));
            if ("yes" === e.terminate) throw new Error(o);
            console.log(o);
          }),
          (e.text = function (t, e, n) {
            t.append(B(t, n, (0, p.mkResolver)(e.namespaces), [""]));
          }),
          (e.variable = function (t, e) {
            C(t.variableScopes, e.name, q(t, e));
          }),
          (e.param = function (t, e) {
            C(t.variableScopes, e.name, t.stylesheetParams[e.name] || q(t, e));
          }),
          (e.extendScope = P),
          (e.wrapValue = F),
          (e.setVariable = C),
          (e.mergeVariableScopes = _),
          (e.literalText = function (t, e) {
            t.append(e);
          }),
          (e.sequence = function (t, e) {
            const n = (0, s.evaluateXPath)(
              e.select,
              t.contextItem,
              void 0,
              _(t.variableScopes),
              s.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: i.functionNameResolver,
              },
            );
            t.append(n);
          }),
          (e.buildNode = U),
          (e.buildAttributeNode = A),
          (e.literalElement = function (t, e, n) {
            let o = U(t, { name: e.name, namespace: e.namespace });
            const a = (0, p.mkResolver)(e.namespaces);
            for (let n of e.attributes) {
              const e = k(t, n.value, a),
                r = A(t, { name: n.name, namespace: n.namespace, value: e });
              o.setAttributeNode(r);
            }
            const r = t.append(o);
            n(
              Object.assign(Object.assign({}, t), {
                variableScopes: P(t.variableScopes),
                append: r || t.append,
              }),
            );
          }),
          (e.attribute = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              a = k(t, e.name, o),
              [r, c] = (0, p.determineNamespace)(a, o, k(t, e.namespace, o)),
              s = A(t, {
                name: a,
                namespace: r,
                value: B(t, e.select || n, o, e.separator),
              });
            t.append(s);
          }),
          (e.processingInstruction = function (t, e, n) {
            const o = k(t, e.name, (0, p.mkResolver)(e.namespaces)),
              a = B(t, e.select || n, (0, p.mkResolver)(e.namespaces), [
                "",
              ]).trimStart();
            t.append(t.outputDocument.createProcessingInstruction(o, a));
          }),
          (e.comment = function (t, e, n) {
            const o = B(t, e.select || n, (0, p.mkResolver)(e.namespaces), [
              "",
            ]);
            t.append(t.outputDocument.createComment(o));
          }),
          (e.namespace = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              a = k(t, e.name, o),
              r = B(t, e.select || n, o, [""]),
              c = A(t, {
                name: `xmlns:${a}`,
                namespace: l.XMLNS_NSURI,
                value: r,
              });
            t.append(c);
          }),
          (e.element = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces);
            let a = k(t, e.name, o),
              r = k(t, e.namespace, o),
              c = U(t, {
                name: a,
                namespace: (0, p.determineNamespace)(
                  a,
                  (0, p.mkResolver)(e.namespaces),
                  r,
                )[0],
              });
            const s = t.append(c);
            n(
              Object.assign(Object.assign({}, t), {
                variableScopes: P(t.variableScopes),
                append: s || t.append,
              }),
            );
          }),
          (e.ifX = function (t, e, n) {
            (0, s.evaluateXPathToBoolean)(
              e.test,
              t.contextItem,
              void 0,
              _(t.variableScopes),
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: i.functionNameResolver,
              },
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
                  _(t.variableScopes),
                  {
                    currentContext: t,
                    functionNameResolver: i.functionNameResolver,
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
              a = t.append(o);
            n(
              Object.assign(Object.assign({}, t), {
                outputDocument: o,
                append: a,
                mode: "#default",
                variableScopes: P(t.variableScopes),
              }),
            );
          }),
          (e.performSort = function (t, e) {
            const n = (0, p.mkResolver)(e.namespaces),
              o = (0, s.evaluateXPath)(
                e.select,
                t.contextItem,
                void 0,
                _(t.variableScopes),
                s.evaluateXPath.ALL_RESULTS_TYPE,
                {
                  currentContext: t,
                  namespaceResolver: n,
                  functionNameResolver: i.functionNameResolver,
                },
              );
            if (o && Symbol.iterator in Object(o)) {
              const a = b(t, o, e.sortKeyComponents, n);
              for (let e of a) t.append(e);
            }
          }),
          (e.forEach = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces);
            let a = (0, s.evaluateXPath)(
              e.select,
              t.contextItem,
              void 0,
              _(t.variableScopes),
              s.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: o,
                functionNameResolver: i.functionNameResolver,
              },
            );
            a &&
              Symbol.iterator in Object(a) &&
              ((a = b(t, a, e.sortKeyComponents, o)),
              v(a, t, (t) => {
                n(
                  Object.assign(Object.assign({}, t), {
                    variableScopes: P(t.variableScopes),
                  }),
                );
              }));
          }),
          (e.forEachGroup = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              a = _(t.variableScopes),
              r = (0, s.evaluateXPathToNodes)(
                e.select,
                t.contextItem,
                void 0,
                a,
                {
                  currentContext: t,
                  namespaceResolver: o,
                  functionNameResolver: i.functionNameResolver,
                },
              );
            if (r && Symbol.iterator in Object(r)) {
              let a = [];
              (e.groupBy
                ? (a = (function (t, e, n, o) {
                    const a = _(t.variableScopes);
                    let r = [];
                    return (
                      v(e, t, (t) => {
                        const e = (0, s.evaluateXPathToString)(
                          n,
                          t.contextItem,
                          void 0,
                          a,
                          {
                            currentContext: t,
                            namespaceResolver: o,
                            functionNameResolver: i.functionNameResolver,
                          },
                        );
                        let c = r.find((t) => t.key === e);
                        (c || ((c = { key: e, nodes: [] }), r.push(c)),
                          c.nodes.push(t.contextItem));
                      }),
                      r
                    );
                  })(t, r, e.groupBy, o))
                : e.groupAdjacent
                  ? (a = (function (t, e, n, o) {
                      const a = _(t.variableScopes);
                      let r = [],
                        c = null,
                        m = [];
                      return (
                        v(e, t, (t) => {
                          const e = t.contextItem,
                            l = (0, s.evaluateXPathToString)(n, e, void 0, a, {
                              currentContext: t,
                              namespaceResolver: o,
                              functionNameResolver: i.functionNameResolver,
                            });
                          l !== c
                            ? ($(r, m, c), (c = l), (m = [e]))
                            : m.push(e);
                        }),
                        $(r, m, c),
                        r
                      );
                    })(t, r, e.groupAdjacent, o))
                  : e.groupEndingWith
                    ? (a = (function (t, e, n, o) {
                        let a = [],
                          r = [];
                        return (
                          v(e, t, (t) => {
                            const e = t.contextItem;
                            (r.push(e),
                              g(
                                t.patternMatchCache,
                                n,
                                e,
                                t.variableScopes,
                                o,
                              ) && ($(a, r), (r = [])));
                          }),
                          $(a, r),
                          a
                        );
                      })(t, r, e.groupEndingWith, o))
                    : e.groupStartingWith &&
                      (a = (function (t, e, n, o) {
                        let a = [],
                          r = [];
                        return (
                          v(e, t, (t) => {
                            const e = t.contextItem;
                            (g(
                              t.patternMatchCache,
                              n,
                              e,
                              t.variableScopes,
                              o,
                            ) && ($(a, r), (r = [])),
                              r.push(e));
                          }),
                          $(a, r),
                          a
                        );
                      })(t, r, e.groupStartingWith, o)),
                (a = b(t, a, e.sortKeyComponents, o)),
                S(a, t, n));
            }
          }),
          (e.number = function (t, e) {
            const n = (0, p.mkResolver)(e.namespaces),
              o = _(t.variableScopes);
            let a;
            (e.value
              ? (a = (0, s.evaluateXPathToNumber)(
                  e.value,
                  t.contextItem,
                  void 0,
                  o,
                  {
                    currentContext: t,
                    namespaceResolver: n,
                    functionNameResolver: i.functionNameResolver,
                  },
                ))
              : "single" === e.level &&
                void 0 === e.value &&
                void 0 === e.select &&
                void 0 === e.count &&
                (a = t.position),
              t.append(
                (0, u.formatNumber)(
                  [a],
                  e.format,
                  e.groupingSeparator,
                  e.groupingSize,
                ),
              ));
          }),
          (e.mkNodeAppender = j),
          (e.mkArrayAppender = Y),
          (e.resultDocument = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces);
            function a(e) {
              return k(t, e, o);
            }
            const r = a(e.format);
            let c = (0, p.mkOutputDefinition)({
              omitXmlDeclaration: a(e.omitXmlDeclaration),
              doctypePublic: a(e.doctypePublic),
              doctypeSystem: a(e.doctypeSystem),
              standalone: a(e.standalone),
            });
            Object.keys(c).forEach((t) => {
              c[t] || delete c[t];
            });
            const s = Object.assign(
                Object.assign({}, r ? t.outputDefinitions.get(r) : {}),
                c,
              ),
              m = a(e.href);
            let i = null;
            if (
              ((s.doctypePublic || s.doctypeSystem) &&
                (i = t.outputDocument.implementation.createDocumentType(
                  "out",
                  s.doctypePublic || "",
                  s.doctypeSystem || "",
                )),
              m)
            ) {
              const e = t.outputDocument.implementation.createDocument(
                null,
                null,
                i,
              );
              if (t.resultDocuments.has(m))
                throw new Error(`XTDE1490: ${m} is a duplicate`);
              (t.resultDocuments.set(
                m,
                Object.assign(Object.assign({}, s), { document: e }),
              ),
                n(
                  Object.assign(Object.assign({}, t), {
                    outputDocument: e,
                    append: j(e),
                  }),
                ));
            } else {
              if (t.outputDocument.documentElement) throw new Error("XTDE1490");
              let e = t.outputDocument;
              (i &&
                ((e = t.outputDocument.implementation.createDocument(
                  null,
                  null,
                  i,
                )),
                (t.outputDocument = e),
                (t.append = j(e))),
                t.resultDocuments.set(
                  "#default",
                  Object.assign(Object.assign({}, s), { document: e }),
                ),
                n(t));
            }
          }),
          (e.stripSpace = function (t, e) {
            const n = RegExp("^[ \n\r\t]+$");
            let o = [];
            !(function t(a) {
              if (a.nodeType === l.NodeType.TEXT)
                n.test(a.textContent) &&
                  (function (t, e) {
                    let n = new Map();
                    for (const o of e) {
                      const e = (0, p.mkResolver)(o.namespaces);
                      if (g(n, o.match, t, [], e)) return !o.preserve;
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
          (e.evaluateAttributeValueTemplate = k),
          (e.serialize = function (t) {
            const e = new m.XMLSerializer();
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
        const s = n(594),
          m = c(n(898)),
          i = n(379),
          l = n(712),
          p = n(777),
          u = n(845);
        function d(t, e) {
          if ((e(t), t.childNodes)) for (let n of t.childNodes) d(n, e);
        }
        function x(t) {
          return Array.isArray(t)
            ? t.map((t) => x(t)).join("")
            : t.nodeType
              ? t.textContent
              : t.toString();
        }
        function f(t, e, n, o) {
          t.has(e) || t.set(e, new Map());
          const a = t.get(e);
          return (a.has(n) || a.set(n, o()), a.get(n));
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
              d(e, (e) => {
                if (
                  "string" == typeof this.use &&
                  g(
                    t,
                    { xpath: this.match },
                    e,
                    n,
                    (0, p.mkResolver)(this.namespaces),
                  )
                ) {
                  let t = (0, s.evaluateXPathToString)(this.use, e);
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
              this.cache.get(e).get(x(o))
            );
          }
        };
        const I = new RegExp(/^[a-z |-]+$/),
          w = new RegExp(/^@[a-z]+$/),
          h = new RegExp(/text\(\)|node\(\)/),
          T = new RegExp(/@|attribute|node/);
        function g(t, e, n, o, a) {
          return !(
            !n ||
            (function (t, e) {
              return (
                (e.nodeType === l.NodeType.ATTRIBUTE && !T.exec(t)) ||
                (e.nodeType === l.NodeType.TEXT && !h.exec(t)) ||
                !(!I.exec(t) || e.nodeType === l.NodeType.ELEMENT) ||
                !(!w.exec(t) || e.nodeType === l.NodeType.ATTRIBUTE)
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
                (function (t, e, n, o, a) {
                  let r = n;
                  for (; r; ) {
                    const c = f(t, e.xpath, r, () =>
                      e.compiled
                        ? (0, s.executeJavaScriptCompiledXPath)(e.compiled, r)
                        : (0, s.evaluateXPathToNodes)(
                            e.xpath,
                            r,
                            void 0,
                            _(o),
                            {
                              namespaceResolver: a,
                              functionNameResolver: i.functionNameResolver,
                            },
                          ),
                    );
                    if (-1 !== c.indexOf(n)) return c;
                    r =
                      r.parentNode ||
                      (r.nodeType === l.NodeType.ATTRIBUTE && r.ownerElement);
                  }
                })(t, e, n, o, a))
          );
        }
        function y(t, e, n) {
          let o = (function* (t, e, n, o, a, r) {
            for (let c of n)
              c.match &&
                ("#all" === c.modes[0] || c.modes.includes(a)) &&
                g(t, c.match, e, o, (0, p.mkResolver)(r)) &&
                (yield c);
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
                      D(e, { select: ".", namespaces: t }, () => {});
                    },
                    allowedParams: [],
                    modes: ["#all"],
                    importPrecedence: Number.MAX_VALUE,
                  },
                  {
                    match: { xpath: "*|/" },
                    apply: (e) => {
                      R(e, {
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
            X(
              a.value,
              Object.assign(Object.assign({}, t), { nextMatches: o }),
              e,
            );
        }
        function E(t, e, n, o) {
          let a;
          return (
            (a =
              "number" === n.dataType
                ? (function (t, e, n, o) {
                    const a = N(e, t, (t) => {
                      let e;
                      const a = B(t, n.sortKey, o);
                      return (
                        (e = Number(a)),
                        isNaN(e) && (e = Number.MIN_SAFE_INTEGER),
                        e
                      );
                    });
                    return (0, p.zip)(a, e)
                      .sort((t, e) => t[0] - e[0])
                      .map((t) => t[1]);
                  })(t, e, n, o)
                : (function (t, e, n, o) {
                    const a = N(e, t, (t) => B(t, n.sortKey, o)),
                      r = n.lang && k(t, n.lang, o);
                    let c = new Intl.Collator(r).compare;
                    return (0, p.zip)(a, e)
                      .sort((t, e) => c(t[0], e[0]))
                      .map((t) => t[1]);
                  })(t, e, n, o)),
            "descending" === k(t, n.order, o) && a.reverse(),
            a
          );
        }
        function N(t, e, n) {
          if (t.length > 0)
            return (0, l.isNodeGroupArray)(t) ? S(t, e, n) : v(t, e, n);
        }
        function v(t, e, n) {
          let o = 0;
          return t.map(
            (a) => (
              o++,
              n(
                Object.assign(Object.assign({}, e), {
                  contextItem: a,
                  contextList: t,
                  position: o,
                }),
              )
            ),
          );
        }
        function S(t, e, n) {
          let o = 0;
          return t.map((t) => {
            o++;
            const a = Object.assign(Object.assign({}, e), {
              contextItem: t.nodes[0],
              contextList: t.nodes,
              currentGroup: t,
              position: o,
              variableScopes: P(e.variableScopes),
            });
            return n(a);
          });
        }
        function b(t, e, n, o) {
          if (n) for (let a of [...n].reverse()) e = E(t, e, a, o);
          return e;
        }
        function L(t, e) {
          for (let n of e) if (n.name === t) return n;
        }
        function X(t, e, n) {
          let o = P(e.variableScopes);
          for (let a of t.allowedParams) {
            let t = L(a.name, n);
            void 0 !== t ? C(o, t.name, q(e, t)) : C(o, a.name, q(e, a));
          }
          return t.apply(
            Object.assign(Object.assign({}, e), { variableScopes: o }),
          );
        }
        function R(t, e) {
          const n = (0, p.mkResolver)(e.namespaces),
            o = (0, s.evaluateXPathToNodes)(
              e.select,
              t.contextItem,
              void 0,
              _(t.variableScopes),
              {
                currentContext: t,
                namespaceResolver: n,
                functionNameResolver: i.functionNameResolver,
              },
            );
          let a = e.mode || "#default";
          ("#current" === a && (a = t.mode),
            v(b(t, o, e.sortKeyComponents, n), t, (t) => {
              y(
                Object.assign(Object.assign({}, t), {
                  mode: a,
                  variableScopes: P(t.variableScopes),
                }),
                e.params,
                e.namespaces,
              );
            }));
        }
        function D(t, e, n) {
          t.append(
            B(t, e.select || n, (0, p.mkResolver)(e.namespaces), e.separator),
          );
        }
        function P(t) {
          return t.concat([new Map()]);
        }
        let M = new Map();
        function O(t) {
          return (
            M.has(t) || M.set(t, (0, s.createTypedValueFactory)(t)),
            M.get(t)
          );
        }
        function F(t, e) {
          if (Array.isArray(t) && 0 === t.length) return O("item()*")([], null);
          if (e)
            try {
              return O(e)(t, null);
            } catch (t) {}
          const n = Array.isArray(t),
            o = n ? t[0] : t;
          let a = "item()";
          const r = n ? "*" : "";
          return (
            "string" == typeof o
              ? (a = "xs:string")
              : "number" == typeof o &&
                (a = Number.isInteger(o) ? "xs:integer" : "xs:numeric"),
            O(`${a}${r}`)(t, null)
          );
        }
        function C(t, e, n) {
          t[t.length - 1].set(e, n);
        }
        function _(t) {
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
        function A(t, e) {
          let n;
          return (
            (n = e.namespace
              ? t.outputDocument.createAttributeNS(e.namespace, e.name)
              : t.outputDocument.createAttribute(e.name)),
            (n.value = e.value),
            n
          );
        }
        function $(t, e, n) {
          e.length > 0 &&
            (null === n && (n = `group-${t.length + 1}`),
            t.push({ key: n, nodes: e }));
        }
        function j(t) {
          const e = t.ownerDocument || t;
          return function n(o) {
            if (o.length && o.values) {
              let t = !0;
              const e = o.length > 0 && !o[0].nodeType;
              for (let a of o) (t ? (t = !1) : e && n(" "), n(a));
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
                return (o = o.documentElement) ? (n(o), j(o)) : j(t);
              }
              if (o.nodeType === l.NodeType.DOCUMENT_FRAGMENT) n(o.childNodes);
              else if (o.nodeType === l.NodeType.TEXT) n(o.data);
              else {
                if (o.nodeType) {
                  let n = e.importNode(o, !0);
                  return (t.append(n), j(n));
                }
                n(`${o}`);
              }
            }
          };
        }
        function Y(t) {
          return function (e) {
            if (
              (t.push(e),
              e.nodeType &&
                (e.nodeType === l.NodeType.DOCUMENT ||
                  e.nodeType === l.NodeType.ELEMENT))
            )
              return j(e);
          };
        }
        function k(t, e, n) {
          if (e)
            return e
              .map((e) =>
                "string" == typeof e
                  ? e
                  : (0, s.evaluateXPathToString)(
                      e.xpath,
                      t.contextItem,
                      void 0,
                      _(t.variableScopes),
                      {
                        currentContext: t,
                        namespaceResolver: n,
                        functionNameResolver: i.functionNameResolver,
                      },
                    ),
              )
              .join("");
        }
        function B(t, e, n, o) {
          o || (o = "string" == typeof e ? [" "] : []);
          const a = k(t, o, n);
          return "string" == typeof e
            ? (0, s.evaluateXPath)(
                e,
                t.contextItem,
                void 0,
                _(t.variableScopes),
                s.evaluateXPath.STRINGS_TYPE,
                {
                  currentContext: t,
                  namespaceResolver: n,
                  functionNameResolver: i.functionNameResolver,
                },
              ).join(a)
            : (function (t) {
                let e = [];
                return (
                  d(t, (t) => {
                    t.nodeType === l.NodeType.TEXT &&
                      "" !== t.data &&
                      (e = e.concat(t.data));
                  }),
                  e
                );
              })(z(t, e)).join(a);
        }
        function q(t, e) {
          if ("string" == typeof e.content) {
            const n = e.as && e.as.match(/[\+\*]$/);
            let o = (0, s.evaluateXPath)(
              e.content,
              t.contextItem,
              void 0,
              _(t.variableScopes),
              s.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: i.functionNameResolver,
              },
            );
            return (1 !== o.length || n || (o = o[0]), F(o, e.as));
          }
          return null == e.content
            ? ""
            : e.as
              ? F(
                  (function (t, e) {
                    let n = [];
                    return (
                      e(
                        Object.assign(Object.assign({}, t), {
                          append: Y(n),
                          mode: "#default",
                          variableScopes: P(t.variableScopes),
                        }),
                      ),
                      1 === n.length ? n[0] : n
                    );
                  })(t, e.content),
                  e.as,
                )
              : z(t, e.content);
        }
        function z(t, e) {
          return (function (t, e) {
            const n = t.outputDocument.createDocumentFragment();
            if (
              (e(j(n)), 1 === n.childNodes.length && 1 === n.childElementCount)
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
                variableScopes: P(t.variableScopes),
              }),
            );
          });
        }
        (0, i.registerFunctions)();
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
      var a = e[o];
      if (void 0 !== a) return a.exports;
      var r = (e[o] = { exports: {} });
      return (t[o].call(r.exports, r, r.exports, n), r.exports);
    })(762);
  module.exports = n.transform;
})();
