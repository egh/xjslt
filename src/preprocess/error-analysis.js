(() => {
  var t = {
      313(t, e, n) {
        (n(898), n(594));
        let o = n(821);
        function r(t, e) {
          e = o.setParamDefaults(t, e);
          let n = new Map();
          n.set("#default", { document: e.outputDocument });
          let r = new Map(),
            a = new Map(),
            s = new Map(),
            c = {
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
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
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
                      },
                    });
                  },
                  allowedParams: [],
                  modes: ["#all"],
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
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
                      },
                      sortKeyComponents: [],
                    });
                  },
                  allowedParams: [],
                  modes: ["#all"],
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
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
                  priority: -0.25,
                  declarationOrder: 1,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 2,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 3,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 4,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 5,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 6,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 7,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 8,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 9,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 10,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 11,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 12,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 13,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 14,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 15,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 16,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 17,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 18,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 19,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 20,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 21,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 22,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 23,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 24,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 25,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 26,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 27,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 28,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 29,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 30,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 31,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 32,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 33,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 34,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 35,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 36,
                  importPrecedence: 1,
                },
                {
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
                  priority: 0.5,
                  declarationOrder: 37,
                  importPrecedence: 1,
                },
                {
                  modes: ["#default"],
                  allowedParams: [],
                  apply: (t) => {
                    (o.variable(t, {
                      name: "parent",
                      content: "local-name(..)",
                      namespaces: {
                        xsl: "http://www.w3.org/1999/XSL/Transform",
                      },
                      as: void 0,
                    }),
                      o.variable(t, {
                        name: "attr",
                        content: "local-name()",
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                        as: void 0,
                      }),
                      o.variable(t, {
                        name: "ns",
                        content: "namespace-uri()",
                        namespaces: {
                          xsl: "http://www.w3.org/1999/XSL/Transform",
                        },
                        as: void 0,
                      }),
                      o.ifX(
                        t,
                        {
                          test: "$ns = 'http://www.w3.org/1999/XSL/Transform'",
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
                              (o.literalText(t, "XTSE0090: xsl:"),
                                o.valueOf(
                                  t,
                                  {
                                    select: "$attr",
                                    separator: void 0,
                                    namespaces: {
                                      xsl: "http://www.w3.org/1999/XSL/Transform",
                                    },
                                  },
                                  (t) => {},
                                ),
                                o.literalText(
                                  t,
                                  " is not a valid attribute of xsl:",
                                ),
                                o.valueOf(
                                  t,
                                  {
                                    select: "$parent",
                                    separator: void 0,
                                    namespaces: {
                                      xsl: "http://www.w3.org/1999/XSL/Transform",
                                    },
                                  },
                                  (t) => {},
                                ),
                                o.literalText(t, "."));
                            },
                          );
                        },
                      ),
                      o.ifX(
                        t,
                        {
                          test: "not($ns) and not($attr = ('version', 'exclude-result-prefixes', 'extension-element-prefixes', 'xpath-default-namespace', 'default-collation', 'use-when'))",
                          namespaces: {
                            xsl: "http://www.w3.org/1999/XSL/Transform",
                          },
                        },
                        (t) => {
                          (o.variable(t, {
                            name: "allowed",
                            content: (t) => {
                              o.choose(t, [
                                {
                                  test: "$parent = ('stylesheet', 'transform')",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "id version extension-element-prefixes exclude-result-prefixes xpath-default-namespace default-validation default-collation input-type-annotations",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'analyze-string'",
                                  apply: (t) => {
                                    o.literalText(t, "select regex flags");
                                  },
                                },
                                {
                                  test: "$parent = 'apply-imports'",
                                  apply: (t) => {},
                                },
                                {
                                  test: "$parent = 'apply-templates'",
                                  apply: (t) => {
                                    o.literalText(t, "select mode");
                                  },
                                },
                                {
                                  test: "$parent = 'attribute'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "name namespace select separator type validation",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'attribute-set'",
                                  apply: (t) => {
                                    o.literalText(t, "name use-attribute-sets");
                                  },
                                },
                                {
                                  test: "$parent = 'call-template'",
                                  apply: (t) => {
                                    o.literalText(t, "name");
                                  },
                                },
                                {
                                  test: "$parent = 'character-map'",
                                  apply: (t) => {
                                    o.literalText(t, "name use-character-maps");
                                  },
                                },
                                {
                                  test: "$parent = 'choose'",
                                  apply: (t) => {},
                                },
                                {
                                  test: "$parent = 'comment'",
                                  apply: (t) => {
                                    o.literalText(t, "select");
                                  },
                                },
                                {
                                  test: "$parent = 'copy'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "copy-namespaces inherit-namespaces use-attribute-sets type validation select",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'copy-of'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "select copy-namespaces type validation",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'decimal-format'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "name decimal-separator grouping-separator infinity minus-sign NaN percent per-mille zero-digit digit pattern-separator exponent-separator",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'document'",
                                  apply: (t) => {
                                    o.literalText(t, "validation type");
                                  },
                                },
                                {
                                  test: "$parent = 'element'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "name namespace inherit-namespaces use-attribute-sets type validation",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'fallback'",
                                  apply: (t) => {},
                                },
                                {
                                  test: "$parent = 'for-each'",
                                  apply: (t) => {
                                    o.literalText(t, "select");
                                  },
                                },
                                {
                                  test: "$parent = 'for-each-group'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "select group-by group-adjacent group-starting-with group-ending-with collation",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'function'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "name as override visibility",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'if'",
                                  apply: (t) => {
                                    o.literalText(t, "test");
                                  },
                                },
                                {
                                  test: "$parent = 'import'",
                                  apply: (t) => {
                                    o.literalText(t, "href");
                                  },
                                },
                                {
                                  test: "$parent = 'import-schema'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "namespace schema-location",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'include'",
                                  apply: (t) => {
                                    o.literalText(t, "href");
                                  },
                                },
                                {
                                  test: "$parent = 'key'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "name match use collation as",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'matching-substring'",
                                  apply: (t) => {},
                                },
                                {
                                  test: "$parent = 'message'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "select terminate error-code",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'namespace'",
                                  apply: (t) => {
                                    o.literalText(t, "name select");
                                  },
                                },
                                {
                                  test: "$parent = 'namespace-alias'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "stylesheet-prefix result-prefix",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'next-match'",
                                  apply: (t) => {},
                                },
                                {
                                  test: "$parent = 'non-matching-substring'",
                                  apply: (t) => {},
                                },
                                {
                                  test: "$parent = 'number'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "value count from level format lang letter-value ordinal grouping-separator grouping-size select as",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'otherwise'",
                                  apply: (t) => {},
                                },
                                {
                                  test: "$parent = 'output'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "name method byte-order-mark cdata-section-elements doctype-public doctype-system encoding escape-uri-attributes include-content-type indent media-type normalization-form omit-xml-declaration standalone undeclare-prefixes use-character-maps version",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'output-character'",
                                  apply: (t) => {
                                    o.literalText(t, "character string");
                                  },
                                },
                                {
                                  test: "$parent = 'param'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "name select as required tunnel static",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'perform-sort'",
                                  apply: (t) => {
                                    o.literalText(t, "select");
                                  },
                                },
                                {
                                  test: "$parent = 'preserve-space'",
                                  apply: (t) => {
                                    o.literalText(t, "elements");
                                  },
                                },
                                {
                                  test: "$parent = 'processing-instruction'",
                                  apply: (t) => {
                                    o.literalText(t, "name select");
                                  },
                                },
                                {
                                  test: "$parent = 'result-document'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "format href validation type method byte-order-mark cdata-section-elements doctype-public doctype-system encoding escape-uri-attributes include-content-type indent media-type normalization-form omit-xml-declaration output-version standalone undeclare-prefixes use-character-maps parameter-document",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'sequence'",
                                  apply: (t) => {
                                    o.literalText(t, "select as");
                                  },
                                },
                                {
                                  test: "$parent = 'sort'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "select lang data-type order case-order collation stable as",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'strip-space'",
                                  apply: (t) => {
                                    o.literalText(t, "elements");
                                  },
                                },
                                {
                                  test: "$parent = 'template'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "match name priority mode as import-",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'text'",
                                  apply: (t) => {
                                    o.literalText(t, "disable-output-escaping");
                                  },
                                },
                                {
                                  test: "$parent = 'value-of'",
                                  apply: (t) => {
                                    o.literalText(
                                      t,
                                      "select separator disable-output-escaping",
                                    );
                                  },
                                },
                                {
                                  test: "$parent = 'variable'",
                                  apply: (t) => {
                                    o.literalText(t, "name select as");
                                  },
                                },
                                {
                                  test: "$parent = 'when'",
                                  apply: (t) => {
                                    o.literalText(t, "test");
                                  },
                                },
                                {
                                  test: "$parent = 'with-param'",
                                  apply: (t) => {
                                    o.literalText(t, "name select as tunnel");
                                  },
                                },
                                {
                                  apply: (t) => {
                                    o.literalText(t, "unknown");
                                  },
                                },
                              ]);
                            },
                            namespaces: {
                              xsl: "http://www.w3.org/1999/XSL/Transform",
                            },
                            as: void 0,
                          }),
                            o.ifX(
                              t,
                              {
                                test: "/*[@version='2.0'] and $allowed != 'unknown' and not(tokenize(normalize-space($allowed), ' ') = $attr)",
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
                                    (o.literalText(t, "XTSE0090: "),
                                      o.valueOf(
                                        t,
                                        {
                                          select: "$attr",
                                          separator: void 0,
                                          namespaces: {
                                            xsl: "http://www.w3.org/1999/XSL/Transform",
                                          },
                                        },
                                        (t) => {},
                                      ),
                                      o.literalText(
                                        t,
                                        " is not a valid attribute of xsl:",
                                      ),
                                      o.valueOf(
                                        t,
                                        {
                                          select: "$parent",
                                          separator: void 0,
                                          namespaces: {
                                            xsl: "http://www.w3.org/1999/XSL/Transform",
                                          },
                                        },
                                        (t) => {},
                                      ),
                                      o.literalText(t, "."));
                                  },
                                );
                              },
                            ));
                        },
                      ),
                      o.copy(
                        t,
                        {
                          namespaces: {
                            xsl: "http://www.w3.org/1999/XSL/Transform",
                          },
                        },
                        (t) => {},
                      ));
                  },
                  namespaces: { xsl: "http://www.w3.org/1999/XSL/Transform" },
                  priority: 0.5,
                  declarationOrder: 38,
                  importPrecedence: 1,
                },
              ],
              nonRuleTemplateIndexes: [
                [
                  {
                    xpath:
                      "xsl:*/@*[not(namespace-uri()) or namespace-uri() = 'http://www.w3.org/1999/XSL/Transform']",
                    compiled: void 0,
                  },
                  40,
                ],
                [
                  {
                    xpath: "xsl:choose[text()[normalize-space(.)]]",
                    compiled: void 0,
                  },
                  39,
                ],
                [
                  {
                    xpath: "xsl:apply-imports/xsl:*[not(self::xsl:with-param)]",
                    compiled: void 0,
                  },
                  38,
                ],
                [
                  {
                    xpath:
                      "xsl:apply-templates/xsl:*[not(self::xsl:sort) and not(self::xsl:with-param)]",
                    compiled: void 0,
                  },
                  37,
                ],
                [
                  {
                    xpath: "xsl:call-template/xsl:*[not(self::xsl:with-param)]",
                    compiled: void 0,
                  },
                  36,
                ],
                [
                  {
                    xpath: "xsl:strip-space[not(@elements)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-strip-space");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-strip-space")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "strip-space" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-elements") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "elements" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  35,
                ],
                [
                  {
                    xpath: "xsl:preserve-space[not(@elements)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-preserve-space");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-preserve-space")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "preserve-space" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-elements") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "elements" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  35,
                ],
                [
                  {
                    xpath: "xsl:attribute-set[text()[normalize-space(.)]]",
                    compiled: void 0,
                  },
                  34,
                ],
                [
                  {
                    xpath: "xsl:attribute-set/*[not(self::xsl:attribute)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-attribute-set");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-attribute-set")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "attribute-set" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tfor (let contextItem2 = domFacade.getFirstChild(contextItem1, "type-1");\n\t\t\t\t\t\t\tcontextItem2;\n\t\t\t\t\t\t\tcontextItem2 = domFacade.getNextSibling(contextItem2, "type-1")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem2.nodeType\n\t\t\t\t\t\t&& contextItem2.nodeType === /*ELEMENT_NODE*/ 1 && (function () {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\treturn !!!((contextItem2.nodeType\n\t\t\t\t\t\t&& (contextItem2.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem2.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem2.localName === "attribute" && (contextItem2.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) ? contextItem2 : null);\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem2;\n\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  33,
                ],
                [
                  {
                    xpath: "xsl:attribute-set[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-attribute-set");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-attribute-set")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "attribute-set" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  32,
                ],
                [
                  {
                    xpath: "xsl:key[not(@match)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-key");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-key")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "key" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-match") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "match" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  31,
                ],
                [
                  {
                    xpath:
                      "xsl:param[not(parent::xsl:stylesheet or parent::xsl:transform or parent::xsl:template or parent::xsl:function)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes4 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-param");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-param")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "param" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tconst contextItem3 = domFacade.getParentNode(contextItem2, "name-stylesheet");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem3 && contextItem3.nodeType\n\t\t\t\t\t\t&& contextItem3.nodeType === /*ELEMENT_NODE*/ 1 && contextItem3.localName === "stylesheet" && (contextItem3.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t\t}\n\t\t});\nconst nodes1 = (function* (contextItem4) {\n\t\t\t\n\t\t\tconst contextItem5 = domFacade.getParentNode(contextItem4, "name-transform");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem5 && contextItem5.nodeType\n\t\t\t\t\t\t&& contextItem5.nodeType === /*ELEMENT_NODE*/ 1 && contextItem5.localName === "transform" && (contextItem5.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem5;\n\t\t\t\t\t\t}\n\t\t});\nconst nodes2 = (function* (contextItem6) {\n\t\t\t\n\t\t\tconst contextItem7 = domFacade.getParentNode(contextItem6, "name-template");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem7 && contextItem7.nodeType\n\t\t\t\t\t\t&& contextItem7.nodeType === /*ELEMENT_NODE*/ 1 && contextItem7.localName === "template" && (contextItem7.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem7;\n\t\t\t\t\t\t}\n\t\t});\nconst nodes3 = (function* (contextItem8) {\n\t\t\t\n\t\t\tconst contextItem9 = domFacade.getParentNode(contextItem8, "name-function");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem9 && contextItem9.nodeType\n\t\t\t\t\t\t&& contextItem9.nodeType === /*ELEMENT_NODE*/ 1 && contextItem9.localName === "function" && (contextItem9.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem9;\n\t\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !(((!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})() || !!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes1(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})()) || !!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes2(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})()) || !!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes3(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})());\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes4(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  30,
                ],
                [
                  {
                    xpath: "xsl:param[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-param");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-param")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "param" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  29,
                ],
                [
                  {
                    xpath: "xsl:variable[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-variable");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-variable")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "variable" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  28,
                ],
                [
                  {
                    xpath: "xsl:with-param[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-with-param");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-with-param")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "with-param" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  28,
                ],
                [
                  {
                    xpath: "xsl:stylesheet[not(@version)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-stylesheet");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-stylesheet")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "stylesheet" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-version") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "version" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  27,
                ],
                [
                  {
                    xpath: "xsl:transform[not(@version)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-transform");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-transform")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "transform" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-version") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "version" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  27,
                ],
                [
                  {
                    xpath:
                      "xsl:for-each/xsl:sort[preceding-sibling::*[not(self::xsl:sort)]]",
                    compiled: void 0,
                  },
                  26,
                ],
                [
                  {
                    xpath:
                      "xsl:sort[not(parent::xsl:apply-templates or parent::xsl:for-each or parent::xsl:for-each-group or parent::xsl:perform-sort)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes4 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-sort");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-sort")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "sort" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tconst contextItem3 = domFacade.getParentNode(contextItem2, "name-apply-templates");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem3 && contextItem3.nodeType\n\t\t\t\t\t\t&& contextItem3.nodeType === /*ELEMENT_NODE*/ 1 && contextItem3.localName === "apply-templates" && (contextItem3.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t\t}\n\t\t});\nconst nodes1 = (function* (contextItem4) {\n\t\t\t\n\t\t\tconst contextItem5 = domFacade.getParentNode(contextItem4, "name-for-each");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem5 && contextItem5.nodeType\n\t\t\t\t\t\t&& contextItem5.nodeType === /*ELEMENT_NODE*/ 1 && contextItem5.localName === "for-each" && (contextItem5.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem5;\n\t\t\t\t\t\t}\n\t\t});\nconst nodes2 = (function* (contextItem6) {\n\t\t\t\n\t\t\tconst contextItem7 = domFacade.getParentNode(contextItem6, "name-for-each-group");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem7 && contextItem7.nodeType\n\t\t\t\t\t\t&& contextItem7.nodeType === /*ELEMENT_NODE*/ 1 && contextItem7.localName === "for-each-group" && (contextItem7.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem7;\n\t\t\t\t\t\t}\n\t\t});\nconst nodes3 = (function* (contextItem8) {\n\t\t\t\n\t\t\tconst contextItem9 = domFacade.getParentNode(contextItem8, "name-perform-sort");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem9 && contextItem9.nodeType\n\t\t\t\t\t\t&& contextItem9.nodeType === /*ELEMENT_NODE*/ 1 && contextItem9.localName === "perform-sort" && (contextItem9.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem9;\n\t\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !(((!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})() || !!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes1(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})()) || !!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes2(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})()) || !!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes3(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})());\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes4(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  25,
                ],
                [
                  {
                    xpath: "xsl:function[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-function");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-function")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "function" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  24,
                ],
                [
                  {
                    xpath: "xsl:for-each-group",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-for-each-group");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-for-each-group")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "for-each-group" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  23,
                ],
                [
                  {
                    xpath:
                      "xsl:number[@level and not(@level = ('single', 'multiple', 'any'))]",
                    compiled: void 0,
                  },
                  22,
                ],
                [
                  {
                    xpath: "xsl:copy-of[not(@select)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-copy-of");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-copy-of")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "copy-of" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-select") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "select" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  21,
                ],
                [
                  {
                    xpath: "xsl:processing-instruction[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-processing-instruction");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-processing-instruction")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "processing-instruction" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  20,
                ],
                [
                  {
                    xpath: "xsl:namespace[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-namespace");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-namespace")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "namespace" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  19,
                ],
                [
                  {
                    xpath: "xsl:attribute[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-attribute");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-attribute")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "attribute" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  18,
                ],
                [
                  {
                    xpath: "xsl:element[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-element");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-element")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "element" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  17,
                ],
                [
                  {
                    xpath: "xsl:when[not(@test)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-when");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-when")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "when" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-test") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "test" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  16,
                ],
                [
                  {
                    xpath: "xsl:otherwise[not(parent::xsl:choose)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-otherwise");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-otherwise")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "otherwise" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tconst contextItem3 = domFacade.getParentNode(contextItem2, "name-choose");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem3 && contextItem3.nodeType\n\t\t\t\t\t\t&& contextItem3.nodeType === /*ELEMENT_NODE*/ 1 && contextItem3.localName === "choose" && (contextItem3.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  15,
                ],
                [
                  {
                    xpath: "xsl:when[not(parent::xsl:choose)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-when");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-when")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "when" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tconst contextItem3 = domFacade.getParentNode(contextItem2, "name-choose");\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (contextItem3 && contextItem3.nodeType\n\t\t\t\t\t\t&& contextItem3.nodeType === /*ELEMENT_NODE*/ 1 && contextItem3.localName === "choose" && (contextItem3.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null)) {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  14,
                ],
                [
                  {
                    xpath: "xsl:choose/xsl:otherwise[following-sibling::*]",
                    compiled: void 0,
                  },
                  13,
                ],
                [
                  {
                    xpath: "xsl:choose[not(xsl:when)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-choose");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-choose")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "choose" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (let contextItem3 = domFacade.getFirstChild(contextItem2, "name-when");\n\t\t\t\t\t\t\tcontextItem3;\n\t\t\t\t\t\t\tcontextItem3 = domFacade.getNextSibling(contextItem3, "name-when")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& contextItem3.nodeType === /*ELEMENT_NODE*/ 1 && contextItem3.localName === "when" && (contextItem3.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  12,
                ],
                [
                  {
                    xpath: "xsl:for-each[not(@select)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-for-each");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-for-each")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "for-each" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-select") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "select" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  11,
                ],
                [
                  {
                    xpath: "xsl:if[not(@test)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-if");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-if")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "if" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-test") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "test" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  10,
                ],
                [
                  {
                    xpath: "xsl:call-template[not(@name)]",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes1 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-call-template");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-call-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "call-template" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null) && (function () {\n\t\t\t\t\t\t\tconst nodes0 = (function* (contextItem2) {\n\t\t\t\n\t\t\tfor (const contextItem3 of (contextItem2 && contextItem2.nodeType === /*ELEMENT_NODE*/ 1 ? domFacade.getAllAttributes(contextItem2, "name-name") : [])) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem3.nodeType\n\t\t\t\t\t\t&& (contextItem3.nodeType === /*ELEMENT_NODE*/ 1\n\t\t\t\t\t\t|| contextItem3.nodeType === /*ATTRIBUTE_NODE*/ 2) && contextItem3.localName === "name" && (contextItem3.namespaceURI || null) === ((contextItem3.nodeType === /*ELEMENT_NODE*/ 1 ? null : null) || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem3;\n\t\t\t\t\t}\n\t\t});\n\t\t\t\t\t\t\treturn !!!(function () {\n\t\t\t\t\t\t\tconst { done, value } = nodes0(contextItem1).next();\n\t\t\t\t\t\t\treturn done ? null : value;\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t})())) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes1(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  9,
                ],
                [
                  {
                    xpath: "xsl:for-each//xsl:apply-imports",
                    compiled: void 0,
                  },
                  8,
                ],
                [
                  {
                    xpath: "xsl:for-each-group//xsl:apply-imports",
                    compiled: void 0,
                  },
                  8,
                ],
                [
                  {
                    xpath: "xsl:template/xsl:param",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-template");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "template" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tfor (let contextItem2 = domFacade.getFirstChild(contextItem1, "name-param");\n\t\t\t\t\t\t\tcontextItem2;\n\t\t\t\t\t\t\tcontextItem2 = domFacade.getNextSibling(contextItem2, "name-param")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem2.nodeType\n\t\t\t\t\t\t&& contextItem2.nodeType === /*ELEMENT_NODE*/ 1 && contextItem2.localName === "param" && (contextItem2.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem2;\n\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  7,
                ],
                [
                  {
                    xpath: "xsl:template/xsl:template",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-template");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "template" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tfor (let contextItem2 = domFacade.getFirstChild(contextItem1, "name-template");\n\t\t\t\t\t\t\tcontextItem2;\n\t\t\t\t\t\t\tcontextItem2 = domFacade.getNextSibling(contextItem2, "name-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem2.nodeType\n\t\t\t\t\t\t&& contextItem2.nodeType === /*ELEMENT_NODE*/ 1 && contextItem2.localName === "template" && (contextItem2.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem2;\n\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  6,
                ],
                [
                  {
                    xpath: "xsl:template",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-template");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-template")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "template" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  5,
                ],
                [
                  {
                    xpath: "xsl:variable",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-variable");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-variable")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "variable" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  4,
                ],
                [
                  {
                    xpath: "xsl:with-param",
                    compiled: o.compileMatchFunction(
                      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-with-param");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-with-param")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "with-param" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
                    ),
                  },
                  4,
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
              ],
              namedTemplates: new Map([]),
              variableScopes: [new Map()],
              inputURL: e.inputURL,
              ruleTree: {
                feature: new o.NodeTypeFeature(o.selfNode, 7),
                results: [],
                left: { results: [0] },
                right: {
                  feature: new o.NodeTypeFeature(o.selfNode, 8),
                  results: [],
                  left: { results: [0] },
                  right: {
                    feature: new o.NodeTypeFeature(o.selfNode, 3),
                    results: [],
                    left: { results: [1] },
                    right: {
                      feature: new o.NodeTypeFeature(o.selfNode, 2),
                      results: [],
                      left: { results: [1, 3] },
                      right: {
                        feature: new o.NodeTypeFeature(o.selfNode, 1),
                        results: [],
                        left: { results: [2] },
                        right: {
                          feature: new o.NodeTypeFeature(o.selfNode, 9),
                          results: [],
                          left: { results: [2, 3] },
                        },
                      },
                    },
                  },
                },
              },
              keys: r,
              outputDefinitions: a,
              decimalFormats: s,
              patternMatchCache: new Map(),
              stylesheetParams: e.stylesheetParams,
            };
          return (
            o.initialize(c, { xsl: "http://www.w3.org/1999/XSL/Transform" }),
            o.stripSpace(t, []),
            o.processNode(c, [], {
              xsl: "http://www.w3.org/1999/XSL/Transform",
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
          (e.isNodeGroup = i),
          (e.isNodeGroupArray = function (t) {
            return Array.isArray(t) && (0 === t.length || i(t[0]));
          }));
        const o = n(953),
          r = String.raw`[^,:\(\)\*\[\]/]`,
          a = String.raw`(child::|attribute::|@)?`,
          s = String.raw`(document-node\()?`;
        var c;
        function i(t) {
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
          })(c || (e.NodeType = c = {})),
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
          s =
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
                for (var n = o(t), s = 0; s < n.length; s++)
                  "default" !== n[s] && r(e, t, n[s]);
              return (a(e, t), e);
            });
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NodeAttributeFeature =
            e.NodeTextFeature =
            e.NodeNameFeature =
            e.NodeTypeFeature =
            e.NodeNamespaceFeature =
              void 0),
          (e.selfNode = u),
          (e.parentNode = d),
          (e.grandParentNode = x),
          (e.greatGrandParentNode = f),
          (e.xpathToFeatures = function (t, e) {
            if (t)
              return (function (t, e) {
                const n = [];
                try {
                  return (L(t, n, e), n);
                } catch (t) {
                  return;
                }
              })(
                (0, m.parseScript)(
                  t,
                  { language: m.evaluateXPath.XPATH_3_1_LANGUAGE },
                  new l.Document(),
                ),
                e,
              );
          }));
        const c = n(953),
          i = n(712),
          m = n(594),
          l = s(n(898)),
          p = "http://www.w3.org/2005/XQueryX";
        function u(t) {
          return t;
        }
        function d(t) {
          return t.parentNode || void 0;
        }
        function x(t) {
          var e;
          return (
            (null === (e = t.parentNode) || void 0 === e
              ? void 0
              : e.parentNode) || void 0
          );
        }
        function f(t) {
          var e, n;
          return (
            (null ===
              (n =
                null === (e = t.parentNode) || void 0 === e
                  ? void 0
                  : e.parentNode) || void 0 === n
              ? void 0
              : n.parentNode) || void 0
          );
        }
        class I extends i.Feature {
          constructor(t, e) {
            (super(e), (this.nodeExtractor = t));
          }
          serialize() {
            return (0, c.mkNew)(
              (0, c.mkMember)("xjslt", this.constructor.name),
              [
                (0, c.toEstree)(this.nodeExtractor),
                (0, c.toEstree)(this.value),
              ],
            );
          }
          equals(t) {
            return this.nodeExtractor === t.nodeExtractor && super.equals(t);
          }
        }
        class w extends I {
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
        e.NodeNamespaceFeature = w;
        class h extends I {
          matches(t) {
            var e;
            return (
              (null === (e = this.nodeExtractor(t)) || void 0 === e
                ? void 0
                : e.nodeType) === this.value
            );
          }
        }
        e.NodeTypeFeature = h;
        class T extends I {
          matches(t) {
            var e;
            return (
              (null === (e = this.nodeExtractor(t)) || void 0 === e
                ? void 0
                : e.nodeName) === this.value
            );
          }
        }
        e.NodeNameFeature = T;
        class y extends I {
          matches(t) {
            var e;
            return (
              (null === (e = this.nodeExtractor(t)) || void 0 === e
                ? void 0
                : e.textContent) === this.value
            );
          }
        }
        e.NodeTextFeature = y;
        class g extends I {
          matches(t) {
            const e = this.nodeExtractor(t);
            return (
              e.nodeType === l.Node.ELEMENT_NODE &&
              e.getAttribute(this.value.name) === this.value.value
            );
          }
        }
        function E(t) {
          return (
            (function (t) {
              return 1 === t.nodeType;
            })(t) && t.namespaceURI === p
          );
        }
        function N(t, e) {
          return E(t) && t.localName === e;
        }
        function v(t, e) {
          for (const n of t.childNodes) if (N(n, e)) return n;
        }
        function b(t, e, n) {
          for (const o of t.childNodes) {
            if (!E(o)) continue;
            if (N(o, e) && (!n || n(o))) return o;
            const t = b(o, e, n);
            if (t) return t;
          }
        }
        e.NodeAttributeFeature = g;
        class S extends Error {}
        function L(t, e, n) {
          if (!E(t)) return;
          const o = t.localName;
          if ("module" === o || "mainModule" === o || "queryBody" === o)
            for (const o of t.childNodes) L(o, e, n);
          else {
            if ("pathExpr" !== o) throw new S();
            {
              const o = t.childNodes.filter((t) => N(t, "stepExpr"));
              if (N(t.firstChild, "rootExpr")) {
                if (0 === o.length)
                  return void e.push(new h(u, l.Node.DOCUMENT_NODE));
                if (
                  "descendant-or-self" !==
                    (null === (a = v((r = o[0]), "xpathAxis")) || void 0 === a
                      ? void 0
                      : a.textContent) ||
                  !v(r, "anyKindTest")
                )
                  throw new S();
                o.shift();
              }
              if (0 === o.length) throw new S();
              const s = o.reverse();
              if (0 == s.length || s.length > 4) throw new S();
              (R(u, s[0], e, n),
                s[1] && R(d, s[1], e, n),
                s[2] && R(x, s[2], e, n),
                s[3] && R(f, s[3], e, n));
            }
          }
          var r, a;
        }
        function X(t, e, n) {
          "attribute" === e
            ? n.push(new h(t, l.Node.ATTRIBUTE_NODE))
            : n.push(new h(t, l.Node.ELEMENT_NODE));
        }
        function R(t, e, n, o) {
          var r, a;
          const s =
            null === (r = v(e, "xpathAxis")) || void 0 === r
              ? void 0
              : r.textContent;
          if ("child" !== s && "attribute" !== s)
            throw new S(`unsupported axis: ${s}`);
          for (const r of e.childNodes.slice(1)) {
            if (!E(r)) continue;
            const c = r.localName;
            if ("nameTest" === c) (O(t, e, n, o), X(t, s, n));
            else if ("Wildcard" === c) {
              const e = v(r, "NCName");
              if (e) {
                const r =
                  null == o
                    ? void 0
                    : o(null !== (a = e.textContent) && void 0 !== a ? a : "");
                if (!r) throw new S(`unresolved ns prefix: ${r}`);
                n.push(new w(t, r));
              }
              X(t, s, n);
            } else if ("piTest" === c) {
              n.push(new h(t, l.Node.PROCESSING_INSTRUCTION_NODE));
              const e = v(r, "piTarget");
              (null == e ? void 0 : e.textContent) &&
                n.push(new T(t, e.textContent));
            } else if ("commentTest" === c)
              n.push(new h(t, l.Node.COMMENT_NODE));
            else if ("textTest" === c) n.push(new h(t, l.Node.TEXT_NODE));
            else {
              if ("predicates" !== c) throw new S();
              D(t, r, n, o);
            }
          }
        }
        function O(t, e, n, o) {
          const r = v(e, "nameTest");
          if (!r) throw new S();
          const a = r.textContent;
          a && n.push(new T(t, a));
          const s = r.getAttributeNS(p, "prefix");
          if (s) {
            const e = null == o ? void 0 : o(s);
            if (!e) throw new S(`unresolved ns prefix: ${e}`);
            n.push(new w(t, e));
          }
          const c = r.getAttributeNS(p, "URI");
          c && n.push(new w(t, c));
        }
        function D(t, e, n, o) {
          for (const r of e.childNodes) {
            if (!E(r)) throw new S();
            const e = r.localName;
            if ("equalOp" === e) {
              const e = v(r, "firstOperand"),
                o = v(r, "secondOperand");
              if (!e || !o) throw new S();
              const a = P(t, e, o) || P(t, o, e);
              if (!a) throw new S();
              n.push(a);
            } else {
              if ("andOp" !== e) throw new S();
              (D(t, v(r, "firstOperand"), n, o),
                D(t, v(r, "secondOperand"), n, o));
            }
          }
        }
        function P(t, e, n) {
          var o, r;
          const a = b(n, "value");
          if (!a) return;
          const s = null !== (o = a.textContent) && void 0 !== o ? o : "",
            c = b(e, "stepExpr", (t) => {
              var e;
              return (
                "attribute" ===
                (null === (e = v(t, "xpathAxis")) || void 0 === e
                  ? void 0
                  : e.textContent)
              );
            });
          if (c) {
            const e =
              null === (r = v(c, "nameTest")) || void 0 === r
                ? void 0
                : r.textContent;
            if (!e) return;
            return new g(t, { name: e, value: s });
          }
          return v(e, "contextItemExpr") || b(e, "textTest")
            ? new y(t, s)
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
              a = [];
            for (const t of e)
              t.features.some((t) => t.equals(o)) ? r.push(t) : a.push(t);
            let s = { feature: o, results: [] };
            if (r.length > 0) {
              const e = r.map((t) =>
                Object.assign(Object.assign({}, t), {
                  features: t.features.filter((t) => !t.equals(o)),
                }),
              );
              s.left = t(e.filter((t) => t.features.length > 0));
              const n = r.filter((t, n) => 0 === e[n].features.length);
              n.length > 0 &&
                (s.left || (s.left = { results: [] }),
                (s.left.results = n.map((t) => t.result)));
            }
            return (a.length > 0 && (s.right = t(a)), s);
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
          return { type: "Literal", value: (t = t ?? void 0) };
        }
        function a(t, e) {
          return {
            type: "MemberExpression",
            object: o(t),
            property: o(e),
            computed: !1,
            optional: !1,
          };
        }
        function s(t, e) {
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
        function c(t) {
          return { type: "ArrayExpression", elements: t };
        }
        function i(t, e, n) {
          return {
            type: "VariableDeclaration",
            declarations: [{ type: "VariableDeclarator", id: t, init: e }],
            kind: n,
          };
        }
        function m(t, e) {
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
            return [s("slimdom"), s("fontoxpath"), s("xjslt", "xjslt")];
          }),
          (e.mkLiteral = r),
          (e.mkMember = a),
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
          (e.mkRequire = s),
          (e.mkArray = c),
          (e.mkReturn = function (t) {
            return { type: "ReturnStatement", argument: t };
          }),
          (e.mkBlock = function (t) {
            return { type: "BlockStatement", body: t };
          }),
          (e.mkLet = function (t, e) {
            return i(t, e, "let");
          }),
          (e.mkConst = function (t, e) {
            return i(t, e, "const");
          }),
          (e.mkVariableDeclaration = i),
          (e.mkNew = m),
          (e.toEstree = function t(e) {
            const n = typeof e;
            return null == e ||
              "string" === n ||
              "number" === n ||
              "boolean" === n
              ? r(e)
              : Array.isArray(e)
                ? c(e.map((e) => t(e)))
                : "function" == typeof e.serialize
                  ? e.serialize()
                  : "function" === n
                    ? a("xjslt", e.name)
                    : "object" === n
                      ? e instanceof Map
                        ? m(o("Map"), [t(Array.from(e.entries()))])
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
          (e.functionNameResolver = E),
          (e.registerFunctions = function () {
            ((0, o.registerCustomXPathFunction)(
              { namespaceURI: r.XJSLT_NSURI, localName: "current" },
              [],
              "item()",
              c,
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
                i,
              ),
              (0, o.registerCustomXPathFunction)(
                {
                  namespaceURI: r.XJSLT_NSURI,
                  localName: "current-grouping-key",
                },
                [],
                "xs:string?",
                m,
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
                u,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "key" },
                ["xs:string", "item()*"],
                "node()*",
                x,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "system-property" },
                ["xs:string"],
                "xs:string",
                w,
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
                        functionNameResolver: E,
                      },
                    );
                    return 1 === n.length ? n[0] : n;
                  })(t, e),
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "normalize-unicode" },
                ["xs:string?"],
                "xs:string",
                (t, e) => T(0, e, "NFC"),
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "normalize-unicode" },
                ["xs:string?", "xs:string"],
                "xs:string",
                T,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "element-available" },
                ["xs:string"],
                "xs:boolean",
                I,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "format-number" },
                ["xs:numeric", "xs:string"],
                "xs:string",
                y,
              ),
              (0, o.registerCustomXPathFunction)(
                { namespaceURI: r.XJSLT_NSURI, localName: "format-number" },
                ["xs:numeric", "xs:string", "xs:string"],
                "xs:string",
                y,
              ));
          }));
        const o = n(594),
          r = n(712),
          a = n(845),
          s = n(472);
        function c({ currentContext: t }) {
          return t.contextItem;
        }
        function i({ currentContext: t }, e) {
          return (0, s.urlToDom)(t, e);
        }
        function m({ currentContext: t }) {
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
            contextItem: r,
            variableScopes: a,
            patternMatchCache: s,
          } = t;
          if (!o.has(e)) throw new Error("XTDE1260");
          return o.get(e).lookup(s, r.ownerDocument, a, n) || [];
        }
        const f = new Set([
          "apply-imports",
          "apply-templates",
          "attribute",
          "call-template",
          "choose",
          "comment",
          "copy",
          "copy-of",
          "document",
          "element",
          "for-each",
          "for-each-group",
          "if",
          "message",
          "namespace",
          "next-match",
          "number",
          "perform-sort",
          "processing-instruction",
          "result-document",
          "sequence",
          "sort",
          "text",
          "value-of",
          "variable",
        ]);
        function I(t, e) {
          const [n, o] = e.split(":");
          return !(!n || !o) && f.has(o);
        }
        function w(t, e) {
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
          let a = t.inputURL || void 0;
          for (const t of r) a = new URL(t, a) || t;
          return a;
        }
        function T(t, e, n) {
          if (null == e) return "";
          const o = n.toUpperCase().replace("-", "");
          if (!["NFC", "NFD", "NFKC", "NFKD"].includes(o))
            throw new Error("FOCH0003: Normalization form not supported.");
          return e.normalize(o);
        }
        function y({ currentContext: t }, e, n, o) {
          var s, c;
          const i = o || "#default",
            m =
              null !==
                (c =
                  null === (s = t.decimalFormats) || void 0 === s
                    ? void 0
                    : s.get(i)) && void 0 !== c
                ? c
                : r.DEFAULT_DECIMAL_FORMAT;
          return (0, a.formatNumberWithPicture)(e, n, m);
        }
        const g = [
          "base-uri",
          "current",
          "current-group",
          "current-grouping-key",
          "current-output-uri",
          "doc",
          "element-available",
          "format-number",
          "key",
          "lastx",
          "normalize-unicode",
          "positionx",
          "system-property",
        ];
        function E({ prefix: t, localName: e }, n) {
          return (t && "fn" !== t) || !g.includes(e)
            ? null
            : { namespaceURI: r.XJSLT_NSURI, localName: e };
        }
      },
      845(t, e, n) {
        "use strict";
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.toAlphabeticUpper = e.toAlphabetic = void 0),
          (e.groupNumeric = s),
          (e.toNumeric = c),
          (e.mkToAlphabetic = i),
          (e.toRoman = m),
          (e.formatWithToken = l),
          (e.formatNumber = function (t, e, n, o) {
            const r = [];
            e.prefix && r.push(e.prefix);
            for (let a = 0; a < t.length; a++) {
              const s = Math.min(a, e.formats.length - 1),
                c = e.formats[s];
              if (!c) throw new Error("No number format found");
              (c.separator && 0 !== a && r.push(c.separator),
                r.push(l(t[a], c.format, n, o)));
            }
            return (e.suffix && r.push(e.suffix), r.join(""));
          }),
          (e.remapDigits = u),
          (e.formatNumberWithPicture = function (t, e, n) {
            if (isNaN(t)) return n.nan;
            if (!isFinite(t)) return (t < 0 ? n.minusSign : "") + n.infinity;
            const a = e.split(n.patternSeparator);
            let i;
            if (t < 0)
              if (a.length > 1) i = p(a[1], n);
              else {
                const t = p(a[0], n);
                i = Object.assign(Object.assign({}, t), {
                  prefix: `${n.minusSign}${t.prefix || ""}`,
                });
              }
            else i = p(a[0], n);
            return (function (t, e, n) {
              var a;
              e.isPercent ? (t *= 100) : e.isPerMille && (t *= 1e3);
              const i = (0, o.evaluateXPathToNumber)(
                "round-half-to-even($number, $precision)",
                void 0,
                void 0,
                {
                  number: (0, r.wrapValue)(t, "xs:double"),
                  precision: (0, r.wrapValue)(e.decimalMaxDigits, "xs:integer"),
                },
              );
              let m = s(
                  c(Math.trunc(i), e.integerMinDigits),
                  n.groupingSeparator,
                  e.integerGroupSize,
                ),
                l =
                  null !== (a = i.toString().split(".")[1]) && void 0 !== a
                    ? a
                    : "";
              for (; l.length < e.decimalMinDigits; ) l += "0";
              const p = l.length > 0 ? n.decimalSeparator : "",
                d = n.zeroDigit.codePointAt(0);
              return (
                48 !== d && ((m = u(m, d)), (l = u(l, d))),
                `${e.prefix}${m}${p}${l}${e.suffix}`
              );
            })(Math.abs(t), i, n);
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
        function s(t, e, n) {
          if (!e || !n || t.length <= n) return t;
          const o = [];
          let r = t;
          for (; r.length > n; ) (o.unshift(r.slice(-n)), (r = r.slice(0, -n)));
          return (r && o.unshift(r), o.join(e));
        }
        function c(t, e) {
          return t.toString().padStart(e, "0");
        }
        function i(t, e) {
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
        function m(t) {
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
          if (/0*1/.test(n)) return s(c(t, n.length), o, r);
          if ("A" === n) return (0, e.toAlphabeticUpper)(t) || "";
          if ("a" === n) return (0, e.toAlphabetic)(t) || "";
          if ("I" === n) return m(t).toUpperCase();
          if ("i" === n) return m(t);
          for (const e of a) {
            if (49 === e) continue;
            const a = e - 1;
            if (
              new RegExp(
                `${String.fromCharCode(a)}*${String.fromCharCode(e)}`,
              ).test(n)
            )
              return s(u(c(t, n.length), a), o, r);
          }
          return s(c(t, n.length), o, r);
        }
        function p(t, e) {
          const n = e.zeroDigit,
            o = e.digit,
            r = e.decimalSeparator,
            a = e.groupingSeparator;
          let s = 0,
            c = !1,
            i = !1;
          function m() {
            if (c || i)
              throw new Error(
                "XTDE1310: Multiple percent/per-mille characters.",
              );
          }
          function l() {
            let a = "";
            for (; s < t.length && t[s] !== n && t[s] !== o && t[s] !== r; )
              (t[s] === e.percent && (m(), (c = !0)),
                t[s] === e.perMille && (m(), (i = !0)),
                (a += t[s++]));
            return a;
          }
          const p = l();
          let u,
            d = 0,
            x = 0,
            f = -1;
          for (; s < t.length && t[s] !== r; ) {
            const e = t[s];
            if (e === n) (d++, x++);
            else if (e === o) x++;
            else {
              if (e !== a) break;
              f = x;
            }
            s++;
          }
          f >= 0 && (u = x - f);
          let I = 0,
            w = 0;
          if (s < t.length && t[s] === r)
            for (s++; s < t.length; ) {
              const e = t[s];
              if (e === n) (I++, w++);
              else {
                if (e !== o) break;
                w++;
              }
              s++;
            }
          const h = l();
          if (s < t.length)
            throw new Error(
              `XTDE1310: Active characters after picture string suffix: ${t.slice(s)}`,
            );
          return {
            prefix: p,
            suffix: h,
            integerMinDigits: Math.max(d, 1),
            integerGroupSize: u,
            decimalMinDigits: I,
            decimalMaxDigits: w,
            isPercent: c,
            isPerMille: i,
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
        ((e.toAlphabetic = i(97, 122)), (e.toAlphabeticUpper = i(65, 90)));
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
            for (let [t, n] of c) if (t.test(e)) return n;
            return 0.5;
          }),
          (e.compareSortable = i),
          (e.sortSortable = function (t) {
            return t.sort(i);
          }),
          (e.zip = function (t, e) {
            if (void 0 === t || void 0 === e) return [];
            const n = Math.min(t.length, e.length);
            return t.slice(0, n).map((t, n) => [t, e[n]]);
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
        function i(t, e) {
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
          s =
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
                for (var n = o(t), s = 0; s < n.length; s++)
                  "default" !== n[s] && r(e, t, n[s]);
              return (a(e, t), e);
            });
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.urlToDom = function (t, e) {
            const n = t.inputURL ? (0, c.resolve)(t.inputURL.toString(), e) : e;
            return n.startsWith("file:")
              ? m.parseXmlDocument(
                  (0, i.readFileSync)(
                    (0, c.fileURLToPath)(new URL(n)),
                  ).toString(),
                )
              : void 0;
          }));
        const c = n(16),
          i = n(896),
          m = s(n(898));
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
          s =
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
                for (var n = o(t), s = 0; s < n.length; s++)
                  "default" !== n[s] && r(e, t, n[s]);
              return (a(e, t), e);
            });
        (Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NodeTypeFeature =
            e.NodeTextFeature =
            e.NodeNameFeature =
            e.NodeNamespaceFeature =
            e.NodeAttributeFeature =
            e.selfNode =
            e.greatGrandParentNode =
            e.grandParentNode =
            e.parentNode =
            e.KeyImpl =
              void 0),
          (e.visitNodes = f),
          (e.dedupGenerator = E),
          (e.mergeTemplateGenerators = N),
          (e.processNode = v),
          (e.nextMatch = function (t, e) {
            const n = t.nextMatches;
            if (n) {
              const o = n.next();
              o.done ||
                D(
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
                D(
                  o.value,
                  Object.assign(Object.assign({}, t), { nextMatches: n }),
                  e.params,
                );
            }
          }),
          (e.sort = R),
          (e.applyTemplates = function (t, e) {
            const n = (0, p.mkResolver)(e.namespaces),
              o = (0, c.evaluateXPathToNodes)(
                e.select,
                t.contextItem,
                void 0,
                U(t.variableScopes),
                {
                  currentContext: t,
                  namespaceResolver: n,
                  functionNameResolver: m.functionNameResolver,
                },
              );
            let r = e.mode || "#default";
            ("#current" === r && (r = t.mode),
              L(R(t, o, e.sortKeyComponents, n), t, (t) => {
                v(
                  Object.assign(Object.assign({}, t), {
                    mode: r,
                    variableScopes: P(t.variableScopes),
                  }),
                  e.params,
                  e.namespaces,
                );
              }));
          }),
          (e.callTemplate = function (t, e) {
            const n = t.namedTemplates.get(e.name);
            if (void 0 !== n) return D(t.templates[n], t, e.params);
            throw new Error(`Cannot find a template named ${e.name}`);
          }),
          (e.functionX = function (t, e) {
            const n = t.params.map((t) => "item()"),
              o = t.params.map((t) => t.name);
            (0, c.registerCustomXPathFunction)(
              { namespaceURI: t.namespace, localName: t.name },
              n,
              t.as || "item()",
              ({ currentContext: t }, ...n) => {
                let r = new Map();
                return (
                  o.forEach((t, e) => r.set(t, n[e])),
                  G(
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
            let r, a;
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
            (r && (a = t.append(r)),
              n &&
                n(
                  Object.assign(Object.assign({}, t), {
                    append: a || t.append,
                  }),
                ));
          }),
          (e.copyOf = function (t, e) {
            let n = (0, c.evaluateXPath)(
              e.select,
              t.contextItem,
              void 0,
              U(t.variableScopes),
              c.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: m.functionNameResolver,
              },
            );
            for (let e of n) t.append(e);
          }),
          (e.valueOf = function (t, e, n) {
            t.append(
              z(t, e.select || n, (0, p.mkResolver)(e.namespaces), e.separator),
            );
          }),
          (e.message = function (t, e, n) {
            const o = z(t, e.select || n, (0, p.mkResolver)(e.namespaces));
            if ("yes" === e.terminate) throw new Error(o);
            console.log(o);
          }),
          (e.text = function (t, e, n) {
            t.append(z(t, n, (0, p.mkResolver)(e.namespaces), [""]));
          }),
          (e.variable = function (t, e) {
            C(t.variableScopes, e.name, q(t, e));
          }),
          (e.param = function (t, e) {
            C(t.variableScopes, e.name, t.stylesheetParams[e.name] || q(t, e));
          }),
          (e.extendScope = P),
          (e.wrapValue = _),
          (e.setVariable = C),
          (e.mergeVariableScopes = U),
          (e.literalText = function (t, e) {
            t.append(e);
          }),
          (e.sequence = function (t, e) {
            const n = (0, c.evaluateXPath)(
              e.select,
              t.contextItem,
              void 0,
              U(t.variableScopes),
              c.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: m.functionNameResolver,
              },
            );
            t.append(n);
          }),
          (e.buildNode = $),
          (e.buildAttributeNode = A),
          (e.literalElement = function (t, e, n) {
            let o = $(t, { name: e.name, namespace: e.namespace });
            const r = (0, p.mkResolver)(e.namespaces);
            for (let n of e.attributes) {
              const e = B(t, n.value, r),
                a = A(t, { name: n.name, namespace: n.namespace, value: e });
              o.setAttributeNode(a);
            }
            const a = t.append(o);
            n(
              Object.assign(Object.assign({}, t), {
                variableScopes: P(t.variableScopes),
                append: a || t.append,
              }),
            );
          }),
          (e.attribute = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              r = B(t, e.name, o),
              [a, s] = (0, p.determineNamespace)(r, o, B(t, e.namespace, o)),
              c = A(t, {
                name: r,
                namespace: a,
                value: z(t, e.select || n, o, e.separator),
              });
            t.append(c);
          }),
          (e.processingInstruction = function (t, e, n) {
            const o = B(t, e.name, (0, p.mkResolver)(e.namespaces)),
              r = z(t, e.select || n, (0, p.mkResolver)(e.namespaces), [
                "",
              ]).trimStart();
            t.append(t.outputDocument.createProcessingInstruction(o, r));
          }),
          (e.comment = function (t, e, n) {
            const o = z(t, e.select || n, (0, p.mkResolver)(e.namespaces), [
              "",
            ]);
            t.append(t.outputDocument.createComment(o));
          }),
          (e.namespace = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              r = B(t, e.name, o),
              a = z(t, e.select || n, o, [""]),
              s = A(t, {
                name: `xmlns:${r}`,
                namespace: l.XMLNS_NSURI,
                value: a,
              });
            t.append(s);
          }),
          (e.element = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces);
            let r = B(t, e.name, o),
              a = B(t, e.namespace, o),
              s = $(t, {
                name: r,
                namespace: (0, p.determineNamespace)(
                  r,
                  (0, p.mkResolver)(e.namespaces),
                  a,
                )[0],
              });
            const c = t.append(s);
            n(
              Object.assign(Object.assign({}, t), {
                variableScopes: P(t.variableScopes),
                append: c || t.append,
              }),
            );
          }),
          (e.ifX = function (t, e, n) {
            (0, c.evaluateXPathToBoolean)(
              e.test,
              t.contextItem,
              void 0,
              U(t.variableScopes),
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: m.functionNameResolver,
              },
            ) && n(t);
          }),
          (e.choose = function (t, e) {
            for (let n of e) {
              if (!n.test) return n.apply(t);
              if (
                (0, c.evaluateXPathToBoolean)(
                  n.test,
                  t.contextItem,
                  void 0,
                  U(t.variableScopes),
                  {
                    currentContext: t,
                    functionNameResolver: m.functionNameResolver,
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
                variableScopes: P(t.variableScopes),
              }),
            );
          }),
          (e.performSort = function (t, e) {
            const n = (0, p.mkResolver)(e.namespaces),
              o = (0, c.evaluateXPath)(
                e.select,
                t.contextItem,
                void 0,
                U(t.variableScopes),
                c.evaluateXPath.ALL_RESULTS_TYPE,
                {
                  currentContext: t,
                  namespaceResolver: n,
                  functionNameResolver: m.functionNameResolver,
                },
              );
            if (o && Symbol.iterator in Object(o)) {
              const r = R(t, o, e.sortKeyComponents, n);
              for (let e of r) t.append(e);
            }
          }),
          (e.forEach = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces);
            let r = (0, c.evaluateXPath)(
              e.select,
              t.contextItem,
              void 0,
              U(t.variableScopes),
              c.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: o,
                functionNameResolver: m.functionNameResolver,
              },
            );
            r &&
              Symbol.iterator in Object(r) &&
              ((r = R(t, r, e.sortKeyComponents, o)),
              L(r, t, (t) => {
                n(
                  Object.assign(Object.assign({}, t), {
                    variableScopes: P(t.variableScopes),
                  }),
                );
              }));
          }),
          (e.forEachGroup = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces),
              r = U(t.variableScopes),
              a = (0, c.evaluateXPathToNodes)(
                e.select,
                t.contextItem,
                void 0,
                r,
                {
                  currentContext: t,
                  namespaceResolver: o,
                  functionNameResolver: m.functionNameResolver,
                },
              );
            if (a && Symbol.iterator in Object(a)) {
              let r = [];
              (e.groupBy
                ? (r = (function (t, e, n, o) {
                    const r = U(t.variableScopes);
                    let a = [];
                    return (
                      L(e, t, (t) => {
                        const e = (0, c.evaluateXPathToString)(
                          n,
                          t.contextItem,
                          void 0,
                          r,
                          {
                            currentContext: t,
                            namespaceResolver: o,
                            functionNameResolver: m.functionNameResolver,
                          },
                        );
                        let s = a.find((t) => t.key === e);
                        (s || ((s = { key: e, nodes: [] }), a.push(s)),
                          s.nodes.push(t.contextItem));
                      }),
                      a
                    );
                  })(t, a, e.groupBy, o))
                : e.groupAdjacent
                  ? (r = (function (t, e, n, o) {
                      const r = U(t.variableScopes);
                      let a = [],
                        s = null,
                        i = [];
                      return (
                        L(e, t, (t) => {
                          const e = t.contextItem,
                            l = (0, c.evaluateXPathToString)(n, e, void 0, r, {
                              currentContext: t,
                              namespaceResolver: o,
                              functionNameResolver: m.functionNameResolver,
                            });
                          l !== s
                            ? (j(a, i, s), (s = l), (i = [e]))
                            : i.push(e);
                        }),
                        j(a, i, s),
                        a
                      );
                    })(t, a, e.groupAdjacent, o))
                  : e.groupEndingWith
                    ? (r = (function (t, e, n, o) {
                        let r = [],
                          a = [];
                        return (
                          L(e, t, (t) => {
                            const e = t.contextItem;
                            (a.push(e),
                              g(
                                t.patternMatchCache,
                                n,
                                e,
                                t.variableScopes,
                                o,
                              ) && (j(r, a), (a = [])));
                          }),
                          j(r, a),
                          r
                        );
                      })(t, a, e.groupEndingWith, o))
                    : e.groupStartingWith &&
                      (r = (function (t, e, n, o) {
                        let r = [],
                          a = [];
                        return (
                          L(e, t, (t) => {
                            const e = t.contextItem;
                            (g(
                              t.patternMatchCache,
                              n,
                              e,
                              t.variableScopes,
                              o,
                            ) && (j(r, a), (a = [])),
                              a.push(e));
                          }),
                          j(r, a),
                          r
                        );
                      })(t, a, e.groupStartingWith, o)),
                (r = R(t, r, e.sortKeyComponents, o)),
                X(r, t, n));
            }
          }),
          (e.number = function (t, e) {
            const n = (0, p.mkResolver)(e.namespaces),
              o = U(t.variableScopes);
            let r;
            (e.value
              ? (r = (0, c.evaluateXPathToNumber)(
                  e.value,
                  t.contextItem,
                  void 0,
                  o,
                  {
                    currentContext: t,
                    namespaceResolver: n,
                    functionNameResolver: m.functionNameResolver,
                  },
                ))
              : "single" === e.level &&
                void 0 === e.value &&
                void 0 === e.select &&
                void 0 === e.count &&
                (r = t.position),
              t.append(
                (0, u.formatNumber)(
                  [r],
                  e.format,
                  e.groupingSeparator,
                  e.groupingSize,
                ),
              ));
          }),
          (e.mkNodeAppender = k),
          (e.mkArrayAppender = Y),
          (e.resultDocument = function (t, e, n) {
            const o = (0, p.mkResolver)(e.namespaces);
            function r(e) {
              return B(t, e, o);
            }
            const a = r(e.format);
            let s = (0, p.mkOutputDefinition)({
              omitXmlDeclaration: r(e.omitXmlDeclaration),
              doctypePublic: r(e.doctypePublic),
              doctypeSystem: r(e.doctypeSystem),
              standalone: r(e.standalone),
            });
            Object.keys(s).forEach((t) => {
              s[t] || delete s[t];
            });
            const c = Object.assign(
                Object.assign({}, a ? t.outputDefinitions.get(a) : {}),
                s,
              ),
              i = r(e.href);
            let m = null;
            if (
              ((c.doctypePublic || c.doctypeSystem) &&
                (m = t.outputDocument.implementation.createDocumentType(
                  "out",
                  c.doctypePublic || "",
                  c.doctypeSystem || "",
                )),
              i)
            ) {
              const e = t.outputDocument.implementation.createDocument(
                null,
                null,
                m,
              );
              if (t.resultDocuments.has(i))
                throw new Error(`XTDE1490: ${i} is a duplicate`);
              (t.resultDocuments.set(
                i,
                Object.assign(Object.assign({}, c), { document: e }),
              ),
                n(
                  Object.assign(Object.assign({}, t), {
                    outputDocument: e,
                    append: k(e),
                  }),
                ));
            } else {
              if (t.outputDocument.documentElement) throw new Error("XTDE1490");
              let e = t.outputDocument;
              (m &&
                ((e = t.outputDocument.implementation.createDocument(
                  null,
                  null,
                  m,
                )),
                (t.outputDocument = e),
                (t.append = k(e))),
                t.resultDocuments.set(
                  "#default",
                  Object.assign(Object.assign({}, c), { document: e }),
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
                      if (g(n, o.match, t, [], e)) return !o.preserve;
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
            const e = new i.XMLSerializer();
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
        const c = n(594),
          i = s(n(898)),
          m = n(379),
          l = n(712),
          p = n(777),
          u = n(845),
          d = n(324),
          x = n(320);
        function f(t, e) {
          if ((e(t), t.childNodes)) for (let n of t.childNodes) f(n, e);
        }
        function I(t) {
          return Array.isArray(t)
            ? t.map((t) => I(t)).join("")
            : t.nodeType
              ? t.textContent
              : t.toString();
        }
        (Object.defineProperty(e, "greatGrandParentNode", {
          enumerable: !0,
          get: function () {
            return x.greatGrandParentNode;
          },
        }),
          Object.defineProperty(e, "grandParentNode", {
            enumerable: !0,
            get: function () {
              return x.grandParentNode;
            },
          }),
          Object.defineProperty(e, "parentNode", {
            enumerable: !0,
            get: function () {
              return x.parentNode;
            },
          }),
          Object.defineProperty(e, "selfNode", {
            enumerable: !0,
            get: function () {
              return x.selfNode;
            },
          }),
          Object.defineProperty(e, "NodeAttributeFeature", {
            enumerable: !0,
            get: function () {
              return x.NodeAttributeFeature;
            },
          }),
          Object.defineProperty(e, "NodeNamespaceFeature", {
            enumerable: !0,
            get: function () {
              return x.NodeNamespaceFeature;
            },
          }),
          Object.defineProperty(e, "NodeNameFeature", {
            enumerable: !0,
            get: function () {
              return x.NodeNameFeature;
            },
          }),
          Object.defineProperty(e, "NodeTextFeature", {
            enumerable: !0,
            get: function () {
              return x.NodeTextFeature;
            },
          }),
          Object.defineProperty(e, "NodeTypeFeature", {
            enumerable: !0,
            get: function () {
              return x.NodeTypeFeature;
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
                f(e, (e) => {
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
                    let t = (0, c.evaluateXPathToString)(this.use, e);
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
                this.cache.get(e).get(I(o))
              );
            }
          }));
        const w = new RegExp(/^[a-z |-]+$/),
          h = new RegExp(/^@[a-z]+$/),
          T = new RegExp(/text\(\)|node\(\)/),
          y = new RegExp(/@|attribute|node/);
        function g(t, e, n, o, r) {
          return !(
            (n &&
              (function (t, e) {
                return (
                  (e.nodeType === l.NodeType.ATTRIBUTE && !y.exec(t)) ||
                  (e.nodeType === l.NodeType.TEXT && !T.exec(t)) ||
                  !(!w.exec(t) || e.nodeType === l.NodeType.ELEMENT) ||
                  !(!h.exec(t) || e.nodeType === l.NodeType.ATTRIBUTE)
                );
              })(e.xpath, n)) ||
            void 0 ===
              (function (t, e, n, o, r) {
                let a = t.get(e.xpath);
                a || ((a = new Map()), t.set(e.xpath, a));
                let s = n;
                const i = U(o);
                for (; s; ) {
                  let t = a.get(s);
                  if (
                    (void 0 === t &&
                      ((t = e.compiled
                        ? (0, c.executeJavaScriptCompiledXPath)(e.compiled, s)
                        : (0, c.evaluateXPathToNodes)(e.xpath, s, void 0, i, {
                            namespaceResolver: r,
                            functionNameResolver: m.functionNameResolver,
                          })),
                      a.set(s, t)),
                    -1 !== t.indexOf(n))
                  )
                    return t;
                  s =
                    s.parentNode ||
                    (s.nodeType === l.NodeType.ATTRIBUTE && s.ownerElement);
                }
              })(t, e, n, o, r)
          );
        }
        function* E(t) {
          let e = new Set(),
            n = t.next();
          for (; !n.done; )
            (e.has(n.value) || (yield n.value, e.add(n.value)), (n = t.next()));
        }
        function* N(t, e) {
          let n = [t.next(), e.next()];
          for (; !n[0].done || !n[1].done; )
            n[0].done
              ? (yield n[1].value, (n[1] = e.next()))
              : n[1].done || (0, p.compareSortable)(n[0].value, n[1].value) < 0
                ? (yield n[0].value, (n[0] = t.next()))
                : (yield n[1].value, (n[1] = e.next()));
        }
        function v(t, e, n) {
          let o = (function* (t, e, n, o) {
              const r = (0, d.findMatchingRules)(e, t).map((t) => n[t]);
              for (let t of (0, p.sortSortable)(r))
                ("#all" === t.modes[0] || t.modes.includes(o)) && (yield t);
            })(t.contextItem, t.ruleTree, t.templates, t.mode),
            r = (function* (t, e, n, o, r, a, s) {
              for (let [c, i] of n) {
                const n = o[i];
                c &&
                  ("#all" === n.modes[0] || n.modes.includes(a)) &&
                  g(t, c, e, r, (0, p.mkResolver)(s)) &&
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
            a = E(N(o, r));
          const s = a.next();
          s.done ||
            D(
              s.value,
              Object.assign(Object.assign({}, t), { nextMatches: a }),
              e,
            );
        }
        function b(t, e, n, o) {
          const r = "descending" === B(t, n.order, o);
          return "number" === n.dataType
            ? (function (t, e, n, o, r) {
                const a = S(e, t, (t) => {
                  let e;
                  const r = z(t, n.sortKey, o);
                  return (
                    (e = Number(r)),
                    isNaN(e) && (e = Number.MIN_SAFE_INTEGER),
                    e
                  );
                });
                return (0, p.zip)(a, e)
                  .sort(r ? (t, e) => e[0] - t[0] : (t, e) => t[0] - e[0])
                  .map((t) => t[1]);
              })(t, e, n, o, r)
            : (function (t, e, n, o, r) {
                const a = S(e, t, (t) => z(t, n.sortKey, o)),
                  s = n.lang && B(t, n.lang, o);
                let c = new Intl.Collator(s).compare;
                return (0, p.zip)(a, e)
                  .sort(r ? (t, e) => c(e[0], t[0]) : (t, e) => c(t[0], e[0]))
                  .map((t) => t[1]);
              })(t, e, n, o, r);
        }
        function S(t, e, n) {
          if (t.length > 0)
            return (0, l.isNodeGroupArray)(t) ? X(t, e, n) : L(t, e, n);
        }
        function L(t, e, n) {
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
        function X(t, e, n) {
          let o = 0;
          return t.map((t) => {
            o++;
            const r = Object.assign(Object.assign({}, e), {
              contextItem: t.nodes[0],
              contextList: t.nodes,
              currentGroup: t,
              position: o,
              variableScopes: P(e.variableScopes),
            });
            return n(r);
          });
        }
        function R(t, e, n, o) {
          if (n) for (let r of [...n].reverse()) e = b(t, e, r, o);
          return e;
        }
        function O(t, e) {
          for (let n of e) if (n.name === t) return n;
        }
        function D(t, e, n) {
          let o = P(e.variableScopes);
          for (let r of t.allowedParams) {
            let t = O(r.name, n);
            void 0 !== t ? C(o, t.name, q(e, t)) : C(o, r.name, q(e, r));
          }
          return t.apply(
            Object.assign(Object.assign({}, e), { variableScopes: o }),
          );
        }
        function P(t) {
          return t.concat([new Map()]);
        }
        new RegExp(/(^\/$|document-node\(|node\()/);
        let F = new Map();
        function M(t) {
          return (
            F.has(t) || F.set(t, (0, c.createTypedValueFactory)(t)),
            F.get(t)
          );
        }
        function _(t, e) {
          if (Array.isArray(t) && 0 === t.length) return M("item()*")([], null);
          if (e)
            try {
              return M(e)(t, null);
            } catch (t) {}
          const n = Array.isArray(t),
            o = n ? t[0] : t;
          let r = "item()";
          const a = n ? "*" : "";
          return (
            "string" == typeof o
              ? (r = "xs:string")
              : "number" == typeof o &&
                (r = Number.isInteger(o) ? "xs:integer" : "xs:numeric"),
            M(`${r}${a}`)(t, null)
          );
        }
        function C(t, e, n) {
          t[t.length - 1].set(e, n);
        }
        function U(t) {
          let e = {};
          for (let n of t) for (let [t, o] of n) e[t] = o;
          return e;
        }
        function $(t, e) {
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
        function j(t, e, n) {
          e.length > 0 &&
            (null === n && (n = `group-${t.length + 1}`),
            t.push({ key: n, nodes: e }));
        }
        function k(t) {
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
                return (o = o.documentElement) ? (n(o), k(o)) : k(t);
              }
              if (o.nodeType === l.NodeType.DOCUMENT_FRAGMENT) n(o.childNodes);
              else if (o.nodeType === l.NodeType.TEXT) n(o.data);
              else {
                if (o.nodeType) {
                  let n = e.importNode(o, !0);
                  return (t.append(n), k(n));
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
              return k(e);
          };
        }
        function B(t, e, n) {
          if (!e) return;
          const o = U(t.variableScopes);
          return e
            .map((e) =>
              "string" == typeof e
                ? e
                : (0, c.evaluateXPathToString)(
                    e.xpath,
                    t.contextItem,
                    void 0,
                    o,
                    {
                      currentContext: t,
                      namespaceResolver: n,
                      functionNameResolver: m.functionNameResolver,
                    },
                  ),
            )
            .join("");
        }
        function z(t, e, n, o) {
          o || (o = "string" == typeof e ? [" "] : []);
          const r = B(t, o, n);
          if ("string" == typeof e) {
            const o = U(t.variableScopes);
            return (0, c.evaluateXPath)(
              e,
              t.contextItem,
              void 0,
              o,
              c.evaluateXPath.STRINGS_TYPE,
              {
                currentContext: t,
                namespaceResolver: n,
                functionNameResolver: m.functionNameResolver,
              },
            ).join(r);
          }
          return (function (t) {
            let e = [];
            return (
              f(t, (t) => {
                t.nodeType === l.NodeType.TEXT &&
                  "" !== t.data &&
                  (e = e.concat(t.data));
              }),
              e
            );
          })(G(t, e)).join(r);
        }
        function q(t, e) {
          if ("string" == typeof e.content) {
            const n = e.as && e.as.match(/[\+\*]$/);
            let o = (0, c.evaluateXPath)(
              e.content,
              t.contextItem,
              void 0,
              U(t.variableScopes),
              c.evaluateXPath.ALL_RESULTS_TYPE,
              {
                currentContext: t,
                namespaceResolver: (0, p.mkResolver)(e.namespaces),
                functionNameResolver: m.functionNameResolver,
              },
            );
            return (1 !== o.length || n || (o = o[0]), _(o, e.as));
          }
          return null == e.content
            ? ""
            : e.as
              ? _(
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
              : G(t, e.content);
        }
        function G(t, e) {
          return (function (t, e) {
            const n = t.outputDocument.createDocumentFragment();
            if (
              (e(k(n)), 1 === n.childNodes.length && 1 === n.childElementCount)
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
        (0, m.registerFunctions)();
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
      var a = (e[o] = { exports: {} });
      return (t[o].call(a.exports, a, a.exports, n), a.exports);
    })(313);
  module.exports = n.transform;
})();
