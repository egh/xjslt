import { ArrowFunctionExpression } from "estree";
import { CompiledXPathFunction } from "fontoxpath";
import * as slimdom from "slimdom";
import { buildDecisionTree, DecisionTreeNode, Rule, XMLFeature } from "./dt";

const NC = String.raw`[^,:\(\)\*\[\]/]`; // Pretty much anything is a NCName
const PATTERN_AXIS = String.raw`(child::|attribute::|@)?`;
const DOC_NODE_OPT = String.raw`(document-node\()?`;
export const XSLT1_NSURI = "http://www.w3.org/1999/XSL/Transform";
export const XMLNS_NSURI = "http://www.w3.org/2000/xmlns/";
export const XPATH_NSURI = "http://www.w3.org/2005/xpath-functions";

export const DEFAULT_PRIORITIES = new Map<RegExp, number>([
  [new RegExp(String.raw`^\s*/\s*$`), -0.5],
  [new RegExp(String.raw`^\s*\*\s*$`), -0.5],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}processing-instruction`,
    ),
    0,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}element\(\*?\)\)?\s*$`,
    ),
    -0.5,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}attribute\(\*?\)\)?\s*$`,
    ),
    -0.5,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}element\(${NC}+\)\)?\s*$`,
    ),
    0,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}element\(\*,\s*${NC}+\)\)?\s*$`,
    ),
    0,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}attribute\(${NC}+\)\)?\s*$`,
    ),
    0,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}attribute\(\*,\s*${NC}+\)\)?\s*$`,
    ),
    0,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}element\(${NC}+,\s*${NC}+\)\)?\s*$`,
    ),
    0.25,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}attribute\(${NC}+,\s*${NC}+\)\)?\s*$`,
    ),
    0.25,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}schema-element\(${NC}+\)\)?\s*$`,
    ),
    0.25,
  ],
  [
    new RegExp(
      String.raw`^\s*${DOC_NODE_OPT}${PATTERN_AXIS}schema-attribute\(${NC}+\)\)?\s*$`,
    ),
    0.25,
  ],
  [new RegExp(String.raw`^\s*document-node\(\)\s*$`), -0.5],
  [
    new RegExp(
      String.raw`^\s*${PATTERN_AXIS}(node\(\)|text\(\)|comment\(\))\s*$`,
    ),
    -0.5,
  ],
  [new RegExp(String.raw`^\s*${PATTERN_AXIS}(${NC}:)?\*\s*$`), -0.25],
  [new RegExp(String.raw`^\s*${PATTERN_AXIS}\*:${NC}+\s*$`), -0.25],
  [new RegExp(String.raw`^\s*${PATTERN_AXIS}${NC}+\s*$`), 0],
]);

export interface OutputDefinition {
  omitXmlDeclaration: boolean;
  doctypeSystem?: string;
  doctypePublic?: string;
  standalone?: boolean | undefined;
}

export enum NodeType {
  ELEMENT = 1,
  ATTRIBUTE,
  TEXT,
  CDATA_SECTION,
  ENTITY_REFERENCE,
  ENTITY,
  PROCESSING_INSTRUCTION,
  COMMENT,
  DOCUMENT,
  DOCUMENT_TYPE,
  DOCUMENT_FRAGMENT,
  NOTATION,
}

export interface VariableLike {
  name: string;
  content: undefined | Constructor;
  namespaces: object;
  as?: string;
}

export interface Sortable {
  match?: string;
  importPrecedence: number;
  priority?: number;
  [propName: string]: unknown;
}

interface GenericTemplate extends Sortable {
  matchFunction?: CompiledXPathFunction;
  name?: string;
  modes: string[];
  allowedParams: Array<VariableLike>;
}

export interface Template extends GenericTemplate {
  apply: SequenceConstructor;
}

export interface TemplateForCompilation extends GenericTemplate {
  apply: ArrowFunctionExpression;
}

export class TemplateRule extends Rule<XMLFeature, TemplateForCompilation> {}

export class TemplateDecisionTree extends DecisionTreeNode<
  XMLFeature,
  Template
> {}

export type SequenceConstructor = (context: DynamicContext) => void;

export type VariableScope = Map<string, any>;

export interface TransformParams {
  outputDocument?: slimdom.Document;
  outputNode?: slimdom.Node;
  inputURL?: string;
  initialMode?: string;
  stylesheetParams?: object;
}

export interface AttributeOutputData {
  name: string;
  value: AttributeValueTemplate;
  namespace?: string;
}

export interface ChooseAlternative {
  test?: string;
  apply: SequenceConstructor;
}

export interface WhitespaceDeclaration extends Sortable {
  preserve: boolean;
  namespaces: {};
}

export type OutputResult = OutputDefinition & {
  document: slimdom.Document;
};

export type Appender = (content: any) => Appender | undefined;

export interface DynamicContext {
  outputDocument: slimdom.Document;
  resultDocuments: Map<string, OutputResult>;
  append: Appender;
  contextItem: any;
  mode: string;
  templates: Array<Template>;
  templateTree: TemplateDecisionTree;
  variableScopes: Array<VariableScope>;
  nextMatches?: Generator<Template>;
  inputURL: URL;
  currentGroup?: any[];
  currentGroupingKey?: string;
  keys: Map<String, Key>;
  patternMatchCache: PatternMatchCache;
  outputDefinitions: Map<string, OutputDefinition>;
  stylesheetParams?: object;
}

export interface CompileContext {
  templates: Array<TemplateForCompilation>;
  dtTemplates: Array<TemplateRule>;
  whitespaceDeclarations: Array<Sortable>;
}

export type Constructor = string | SequenceConstructor;

export interface SortKeyComponent {
  sortKey: Constructor;
  order?: AttributeValueTemplate;
  lang?: AttributeValueTemplate;
  dataType?: string;
}

export interface xpathstring {
  xpath: string;
}

export type AttributeValueTemplate = Array<string | xpathstring>;

export type PatternMatchCache = Map<
  string,
  Map<slimdom.Node, Set<slimdom.Node>>
>;

export interface Key {
  match: string;
  use: string | SequenceConstructor;
  namespaces: object;
  cache: Map<slimdom.Document, Map<any, any>>;
  buildDocumentCache: (
    patternMatchCache: PatternMatchCache,
    document: slimdom.Document,
    variableScopes: VariableScope[],
  ) => Map<any, any>;
  lookup: (
    patternMatchCache: PatternMatchCache,
    document: slimdom.Document,
    variableScopes: VariableScope[],
    value: any,
  ) => any;
}
