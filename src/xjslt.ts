import { evaluateXPathToString, evaluateXPathToNodes } from "fontoxpath";

export const XSLT1_NSURI = "http://www.w3.org/1999/XSL/Transform";

export const enum NodeType {
  ELEMENT_NODE = 1,
  ATTRIBUTE_NODE = 2,
  TEXT_NODE = 3,
  CDATA_SECTION_NODE = 4,
  ENTITY_REFERENCE_NODE = 5, // historical
  ENTITY_NODE = 6, // historical
  PROCESSING_INSTRUCTION_NODE = 7,
  COMMENT_NODE = 8,
  DOCUMENT_NODE = 9,
  DOCUMENT_TYPE_NODE = 10,
  DOCUMENT_FRAGMENT_NODE = 11,
  NOTATION_NODE = 12, // historical
}

interface CompiledTemplate {
  attributes: TemplateAttributes;
  apply: (context: ProcessingContext) => void;
}

interface ApplyTemplateAttributes {
  select?: string;
  mode?: string;
}

interface AttributeOutputData {
  name: string;
  value: string;
}

interface NodeOutputData {
  ns?: string;
  name: string;
  attributes: Array<AttributeOutputData>;
}

interface ProcessingContext {
  outputDocument: any;
  outputNode: any;
  currentNode: any;
  currentNodeList: Array<any>;
  mode?: string;
  templates: Array<CompiledTemplate>;
  serializer: (doc: any) => string;
}

interface TemplateAttributes {
  match?: string;
  name?: string;
  mode?: string;
  priority?: number;
}

interface ValueOfAttributes {
  select: string;
  disableOutputEscaping?: boolean;
}

/* Implementation of https://www.w3.org/TR/xslt11/#patterns */
function nameTest(
  name: string,
  node: any,
  nsResolver?: (prefix: string) => string
) {
  let checkContext = node;
  let options = {};
  if (nsResolver) {
    options["namespaceResolver"] = nsResolver;
  }
  /* Using ancestors as the potential contexts */
  while (checkContext) {
    const matches = evaluateXPathToNodes(
      name,
      checkContext,
      null,
      null,
      options
    );
    /* It counts as a match if the node we were testing against is in the resulting node set. */
    if (matches.includes(node)) {
      return true;
    } else {
      checkContext = checkContext.parentNode;
    }
  }
  return false;
}

/**
 * Find the template that should be used to process a node.
 *
 * @returns The template, or undefined if none can be found to match this node.
 */
function getTemplate(
  node: any,
  templates: Array<CompiledTemplate>
): CompiledTemplate {
  for (let template of templates) {
    if (nameTest(template.attributes.match, node)) {
      return template;
    }
  }
  return undefined;
}

function processNode(context: ProcessingContext) {
  const template = getTemplate(context.currentNode, context.templates);
  if (template) {
    template.apply(context);
  }
}

function applyTemplatesInternal(
  context: ProcessingContext,
  attributes: ApplyTemplateAttributes
) {
  /* The nodes we want to apply templates on.*/
  let select: string;
  if (attributes.select) {
    select = attributes.select;
  } else {
    select = "node()";
  }
  const nodes = evaluateXPathToNodes(select, context.currentNode);
  for (let node of nodes) {
    /* for each node */
    processNode({ ...context, currentNode: node, currentNodeList: nodes });
  }
}

function valueOfInternal(
  context: ProcessingContext,
  attributes: ValueOfAttributes
) {
  const newNode = context.outputDocument.createTextNode(
    evaluateXPathToString(attributes.select, context.currentNode)
  );
  context.outputNode.appendChild(newNode);
}

function literalTextInternal(context: ProcessingContext, text: string) {
  context.outputNode.appendChild(context.outputDocument.createTextNode(text));
}

function literalXmlInternal(
  context: ProcessingContext,
  node: NodeOutputData,
  func: (context: ProcessingContext) => void
) {
  let newNode: any;
  if (node.ns) {
    newNode = context.outputDocument.createElementNS(node.ns, node.name);
  } else {
    newNode = context.outputDocument.createElement(node.name);
  }
  for (let attr in node.attributes) {
    newNode.setAttribute(attr, node.attributes[attr]);
  }
  context.outputNode.appendChild(newNode);
  func({ ...context, outputNode: newNode });
}

function findAttrValue(attrs: Array<any>, name: string) {
  const attr = attrs.find((attr) => attr.name === name);
  if (attr) {
    return attr.value;
  } else {
    return undefined;
  }
}

function makeTemplateAttributes(node: any): TemplateAttributes {
  const attrs = node.attributes;
  return {
    match: findAttrValue(attrs, "match"),
    priority: findAttrValue(attrs, "priority"),
    name: findAttrValue(attrs, "name"),
    mode: findAttrValue(attrs, "mode"),
  };
}

function preserveSpace(
  node: any,
  preserve: Array<string>,
  nsResolver: (prefix: string) => string
) {
  for (let name of preserve) {
    if (nameTest(name, node, nsResolver)) {
      return true;
    }
  }
  return false;
}

/* https://www.w3.org/TR/xslt11/#strip */
function stripSpace(
  doc: any,
  preserve: Array<string>,
  nsResolver: (prefix: string) => string
) {
  const ONLY_WHITESPACE = RegExp("^[ \n\r\t]+$");
  let toRemove = [];
  function walkTree(node: any) {
    if (node.nodeType === NodeType.TEXT_NODE) {
      if (
        ONLY_WHITESPACE.test(node.textContent) &&
        !preserveSpace(node.parentNode, preserve, nsResolver)
      ) {
        toRemove.push(node);
      }
    } else {
      if (node.hasChildNodes()) {
        for (let child of node.childNodes) {
          walkTree(child);
        }
      }
    }
  }
  walkTree(doc);
  for (let node of toRemove) {
    node.remove();
  }
  return doc;
}

/* Strip space for an XSLT stylesheet. */
function stripSpaceStylesheet(doc: any) {
  const nsResolver = (prefix: string): string => {
    if (prefix === "xsl") {
      return XSLT1_NSURI;
    }
  };
  return stripSpace(doc, ["xsl:text"], nsResolver);
}

export {
  applyTemplatesInternal,
  literalTextInternal,
  literalXmlInternal,
  makeTemplateAttributes,
  processNode,
  stripSpace,
  stripSpaceStylesheet,
  valueOfInternal,
};
