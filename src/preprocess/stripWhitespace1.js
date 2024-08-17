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
    stylesheetParams: params.stylesheetParams,
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
    match: "comment() | processing-instruction()",
    matchFunction: undefined,
    name: undefined,
    modes: ["#default"],
    allowedParams: [],
    apply: (context) => {},
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
