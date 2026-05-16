import { ArrowFunctionExpression } from "estree";
import { CompiledXPathFunction } from "fontoxpath";
import * as slimdom from "slimdom";
import {
  mkArray,
  mkIdentifier,
  mkLiteral,
  mkNew,
  toEstree,
  mkMember,
} from "./estree-util";

const NC = String.raw`[^,:\(\)\*\[\]/]`; // Pretty much anything is a NCName
const PATTERN_AXIS = String.raw`(child::|attribute::|@)?`;
const DOC_NODE_OPT = String.raw`(document-node\()?`;
export const XSLT1_NSURI = "http://www.w3.org/1999/XSL/Transform";
export const XMLNS_NSURI = "http://www.w3.org/2000/xmlns/";
export const XPATH_NSURI = "http://www.w3.org/2005/xpath-functions";
export const XJSLT_NSURI = "https://www.e6h.org/xjslt";

export type TemplateIndex = number;

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

export interface NumberFormat {
  prefix?: string;
  suffix?: string;
  formats: Array<{ format: string; separator?: string }>;
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
  importPrecedence: number;
  priority?: number;
  [propName: string]: unknown;
  declarationOrder: number;
}

interface GenericTemplate extends Sortable {
  modes: string[];
  match?: Xpath;
  allowedParams: Array<VariableLike>;
}

export interface Template extends GenericTemplate {
  apply: SequenceConstructor;
}

export interface TemplateForCompilation extends GenericTemplate {
  apply: ArrowFunctionExpression;
}

export type SequenceConstructorWithReturn<T> = (context: DynamicContext) => T;

export type SequenceConstructor = SequenceConstructorWithReturn<void>;

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
  match?: Xpath;
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
  mode: string;
  templates: Array<Template>;
  variableScopes: Array<VariableScope>;
  nextMatches?: Generator<Template>;
  inputURL: URL;
  currentGroup?: NodeGroup;
  keys: Map<String, Key>;
  patternMatchCache: PatternMatchCache;
  ruleTree: RuleTreeNode<slimdom.Node, TemplateIndex>;
  nonRuleTemplateIndexes: Array<TemplateIndex>;
  nonRuleTemplates: Array<Template>;
  namedTemplates: Map<string, TemplateIndex>;
  outputDefinitions: Map<string, OutputDefinition>;
  decimalFormats: Map<string, DecimalFormat>;
  stylesheetParams?: object;
  // The actual context
  contextItem: slimdom.Node;
  contextList: slimdom.Node[];
  position: number;
}

export interface CompileContext {
  declarationCounter: number;
  namedTemplates: Map<string, Array<TemplateIndex>>;
  nonRuleTemplates: Array<TemplateIndex>;
  rules: Array<Rule<slimdom.Node, TemplateIndex>>;
  templates: Array<TemplateForCompilation>;
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

export type PatternMatchCache = Map<string, Map<slimdom.Node, slimdom.Node[]>>;

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

export interface NodeGroup {
  key: string;
  nodes: slimdom.Node[];
}

export function isNodeGroup(value: any): value is NodeGroup {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.key === "string" &&
    Array.isArray(value.nodes)
  );
}

export function isNodeGroupArray(value: any): value is NodeGroup[] {
  return Array.isArray(value) && (value.length === 0 || isNodeGroup(value[0]));
}

export interface Xpath {
  xpath: string;
  compiled?: CompiledXPathFunction;
}

export interface DecimalFormat {
  decimalSeparator: string;
  digit: string;
  groupingSeparator: string;
  infinity: string;
  minusSign: string;
  nan: string;
  patternSeparator: string;
  percent: string;
  perMille: string;
  zeroDigit: string;
}

export const DEFAULT_DECIMAL_FORMAT: DecimalFormat = {
  decimalSeparator: ".",
  digit: "#",
  groupingSeparator: ",",
  infinity: "Infinity",
  minusSign: "-",
  nan: "NaN",
  patternSeparator: ";",
  percent: "%",
  perMille: "\u2030",
  zeroDigit: "0",
};

export interface ParsedSubpicture {
  prefix: string;
  suffix: string;
  integerMinDigits: number;
  integerGroupSize?: number;
  decimalMinDigits: number;
  decimalMaxDigits: number;
  isPercent: boolean;
  isPerMille: boolean;
}

/*
 * Defines a "Feature" that can be found on a type of Thing, which can
   have a value of type ValueType. For instance, a Feature<Card,
   SuitValue>.
 */
export abstract class Feature<ThingType, ValueType> {
  value: ValueType;
  constructor(value: ValueType) {
    this.value = value;
  }
  abstract matches(thing: ThingType): boolean;
  serialize() {
    return mkNew(mkMember("xjslt", this.constructor.name), [
      toEstree(this.value),
    ]);
  }
  equals(other: Feature<any, any>): boolean {
    if (this.constructor !== other.constructor) {
      return false;
    }
    if (this.value !== other.value) {
      return false;
    }
    return true;
  }
}

/*
  * Defines a Rule that maps a set of Features to a result. The result
    can be used to store anything.
 */
export interface Rule<T, U> {
  features: Feature<T, any>[];
  result: U;
}

export interface RuleTreeNode<T, U> {
  feature?: Feature<T, any>;
  rules: Rule<T, U>[];
  left?: RuleTreeNode<T, U>;
  right?: RuleTreeNode<T, U>;
}
