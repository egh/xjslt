/*
 * Copyright (C) 2021-2024 Erik Hetzner
 *
 * This file is part of XJSLT.
 *
 * XJSLT is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * XJSLT is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with XJSLT. If not, see
 * <https://www.gnu.org/licenses/>.
 */

let slimdom = require("slimdom");
let fontoxpath = require("fontoxpath");
let xjslt = require("../xjslt");
function transform(document, inputURL, initialMode) {
  const doc = new slimdom.Document();
  let templates = [];
  let keys = new Map();
  if (!initialMode) {
    initialMode = "#default";
  }
  let context = {
    outputDocument: doc,
    outputNode: doc,
    contextItem: document,
    mode: initialMode,
    templates: templates,
    variableScopes: [new Map()],
    inputURL: inputURL,
    keys: keys,
    nameTestCache: new Map(),
  };
  templates.push({
    match: "/",
    name: undefined,
    modes: ["#default"],
    allowedParams: [],
    apply: (context) => {
      xjslt.element(
        context,
        {
          name: ["xsl:stylesheet"],
          namespace: undefined,
          namespaces: {
            xsl: "http://www.w3.org/1999/XSL/Transform",
          },
        },
        (context) => {
          xjslt.attribute(
            context,
            {
              name: ["version"],
              separator: undefined,
              select: "@xsl:version",
              namespace: undefined,
              namespaces: {
                xsl: "http://www.w3.org/1999/XSL/Transform",
              },
            },
            (context) => {},
          );
          xjslt.element(
            context,
            {
              name: ["xsl:template"],
              namespace: undefined,
              namespaces: {
                xsl: "http://www.w3.org/1999/XSL/Transform",
              },
            },
            (context) => {
              xjslt.attribute(
                context,
                {
                  name: ["match"],
                  separator: undefined,
                  select: undefined,
                  namespace: undefined,
                  namespaces: {
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                  },
                },
                (context) => {
                  xjslt.literalText(context, "/");
                },
              );
              xjslt.copyOf(
                context,
                {
                  select: ".",
                  namespaces: {
                    xsl: "http://www.w3.org/1999/XSL/Transform",
                  },
                },
                (context) => {},
              );
            },
          );
        },
      );
    },
    namespaces: {
      xsl: "http://www.w3.org/1999/XSL/Transform",
    },
    priority: undefined,
    importPrecedence: 1,
  });
  templates.push({
    match: "@* | node()",
    name: undefined,
    modes: ["#default"],
    allowedParams: [],
    apply: (context) => {
      xjslt.copy(
        context,
        {
          namespaces: {
            xsl: "http://www.w3.org/1999/XSL/Transform",
          },
        },
        (context) => {
          xjslt.applyTemplates(context, {
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
    namespaces: {
      xsl: "http://www.w3.org/1999/XSL/Transform",
    },
    priority: undefined,
    importPrecedence: 1,
  });
  xjslt.sortTemplates(templates);
  xjslt.processNode(context, [], {
    xsl: "http://www.w3.org/1999/XSL/Transform",
  });
  return context.outputDocument;
}
module.exports.transform = transform;
