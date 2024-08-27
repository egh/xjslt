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
    patternMatchCache: new Map(),
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
    match: "text()[matches(., '^[\\s\\t\\n\\r]+$')]",
    matchFunction: undefined,
    name: undefined,
    modes: ["#default"],
    allowedParams: [],
    apply: (context) => {
      xjslt.variable(context, {
        name: "parent-name",
        content: "local-name(..)",
        namespaces: {
          xsl: "http://www.w3.org/1999/XSL/Transform",
        },
      });
      xjslt.variable(context, {
        name: "ns-correct",
        content: "namespace-uri(..) = 'http://www.w3.org/1999/XSL/Transform'",
        namespaces: {
          xsl: "http://www.w3.org/1999/XSL/Transform",
        },
      });
      xjslt.variable(context, {
        name: "nearest-preserve",
        content: "./ancestor::*[@xml:space = 'preserve']",
        namespaces: {
          xsl: "http://www.w3.org/1999/XSL/Transform",
        },
      });
      xjslt.variable(context, {
        name: "nearest-default",
        content: "./ancestor::*[@xml:space = 'default']",
        namespaces: {
          xsl: "http://www.w3.org/1999/XSL/Transform",
        },
      });
      xjslt.choose(context, [
        {
          test: "$ns-correct and $parent-name = 'text'",
          apply: (context) => {
            xjslt.copy(
              context,
              {
                namespaces: {
                  xsl: "http://www.w3.org/1999/XSL/Transform",
                },
              },
              (context) => {},
            );
          },
        },
        {
          test: "$parent-name = ('analyze-string', 'apply-imports', 'apply-templates', 'attribute-set', 'call-template', 'character-map', 'choose', 'next-match', 'stylesheet', 'transform')",
          apply: (context) => {},
        },
        {
          test: "$nearest-preserve and not($nearest-default)",
          apply: (context) => {
            xjslt.copy(
              context,
              {
                namespaces: {
                  xsl: "http://www.w3.org/1999/XSL/Transform",
                },
              },
              (context) => {},
            );
          },
        },
        {
          test: "$nearest-preserve and $nearest-default and not($nearest-default = $nearest-preserve//*)",
          apply: (context) => {
            xjslt.copy(
              context,
              {
                namespaces: {
                  xsl: "http://www.w3.org/1999/XSL/Transform",
                },
              },
              (context) => {},
            );
          },
        },
        {
          apply: (context) => {},
        },
      ]);
    },
    namespaces: {
      xsl: "http://www.w3.org/1999/XSL/Transform",
    },
    priority: "1",
    importPrecedence: 1,
  });
  xjslt.sortSortable(templates);
  xjslt.processNode(context, [], {
    xsl: "http://www.w3.org/1999/XSL/Transform",
  });
  return resultDocuments;
}
module.exports.transform = transform;
global.transform = transform;
