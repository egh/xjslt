let slimdom = require("slimdom");
let fontoxpath = require("fontoxpath");
let xjslt = require("./xjslt");
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
  };
  templates.push({
    match: "/ | @* | node()",
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
    match: "xsl:include",
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
  xjslt.processNode(context, [], {
    xsl: "http://www.w3.org/1999/XSL/Transform",
  });
  return context.outputDocument;
}
module.exports.transform = transform;
