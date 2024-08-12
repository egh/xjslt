let slimdom = require("slimdom");
let fontoxpath = require("fontoxpath");
let xjslt = require("xjslt");
function transform(document, params) {
  params = xjslt.setParamDefaults(document, params);
  let templates = [];
  let resultDocuments = new Map();
  resultDocuments.set("#default", {
    document: params.outputDocument,
  });
  let keys = new Map();
  let outputDefinitions = new Map();
  let context = {
    outputDocument: params.outputDocument,
    outputNode: params.outputNode,
    resultDocuments: resultDocuments,
    contextItem: document,
    mode: params.initialMode,
    templates: templates,
    variableScopes: [new Map()],
    inputURL: params.inputURL,
    keys: keys,
    outputDefinitions: outputDefinitions,
    nameTestCache: new Map(),
  };
  templates.push({
    match: "/",
    matchFunction: xjslt.compileMatchFunction(
      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\tconst root0 = (function () {\n\t\t\t\tlet n = contextItem0;\n\t\t\t\twhile (n.nodeType !== /*DOCUMENT_NODE*/9) {\n\t\t\t\t\tn = domFacade.getParentNode(n);\n\t\t\t\t\tif (n === null) {\n\t\t\t\t\t\tthrow new Error(\'XPDY0050: the root node of the context node is not a document node.\');\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn n;\n\t\t\t})();\n\t\t\tyield root0;\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
    ),
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
    matchFunction: undefined,
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
  return resultDocuments;
}
module.exports.transform = transform;
global.transform = transform;
