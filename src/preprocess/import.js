let slimdom = require("slimdom");
let fontoxpath = require("fontoxpath");
let xjslt = require("./../xjslt");
function transform(
  document,
  outputDocument,
  outputNode,
  inputURL,
  initialMode,
) {
  let templates = [];
  let resultDocuments = new Map();
  resultDocuments.set("#default", {
    document: outputDocument,
  });
  let keys = new Map();
  let outputDefinitions = new Map();
  if (!initialMode) {
    initialMode = "#default";
  }
  let context = {
    outputDocument: outputDocument,
    outputNode: outputNode || outputDocument,
    resultDocuments: resultDocuments,
    contextItem: document,
    mode: initialMode,
    templates: templates,
    variableScopes: [new Map()],
    inputURL: inputURL,
    keys: keys,
    outputDefinitions: outputDefinitions,
    nameTestCache: new Map(),
  };
  templates.push({
    match: "/ | @* | node()",
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
  templates.push({
    match: "xsl:import",
    matchFunction: new Function(
      '\n\treturn (contextItem, domFacade, runtimeLib, options) => {\n\t\tconst {\n\t\t\terrXPDY0002,\n\t\t} = runtimeLib;\n\t\tif (!contextItem) {\n\t\t\tthrow errXPDY0002("Context is needed to evaluate the given path expression.");\n\t\t}\n\n\t\tif (!contextItem.nodeType) {\n\t\t\tthrow new Error("Context item must be subtype of node().");\n\t\t}\n\t\t\n\t\tconst nodes0 = (function* (contextItem0) {\n\t\t\t\n\t\t\tfor (let contextItem1 = domFacade.getFirstChild(contextItem0, "name-import");\n\t\t\t\t\t\t\tcontextItem1;\n\t\t\t\t\t\t\tcontextItem1 = domFacade.getNextSibling(contextItem1, "name-import")) {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif (!(contextItem1.nodeType\n\t\t\t\t\t\t&& contextItem1.nodeType === /*ELEMENT_NODE*/ 1 && contextItem1.localName === "import" && (contextItem1.namespaceURI || null) === (("http://www.w3.org/1999/XSL/Transform") || null))) {\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tyield contextItem1;\n\t\t\t\t\t}\n\t\t});\n\t\treturn Array.from(nodes0(contextItem));}\n//# sourceURL=generated.js',
    ),
    name: undefined,
    modes: ["#default"],
    allowedParams: [],
    apply: (context) => {
      xjslt.variable(context, {
        name: "doc",
        content: "doc(@href)",
        namespaces: {
          xsl: "http://www.w3.org/1999/XSL/Transform",
        },
      });
      xjslt.applyTemplates(context, {
        select: "$doc/xsl:stylesheet/* | $doc/xsl:transform/*",
        mode: "#default",
        params: [],
        sortKeyComponents: [],
        namespaces: {
          xsl: "http://www.w3.org/1999/XSL/Transform",
        },
      });
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
