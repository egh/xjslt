import { NamespaceResolver } from "fontoxpath";
import { OutputDefinition, Sortable } from "./definitions";

export function parseYesNo(input: string): boolean {
  return input === "yes";
}

export function parseYesNoOmit(input: string): boolean | undefined {
  if (input === "omit") {
    return undefined;
  } else {
    return input === "yes";
  }
}

/* Make an output definition from strings. */
export function mkOutputDefinition(data: {
  omitXmlDeclaration?: string;
  doctypePublic?: string;
  doctypeSystem?: string;
  standalone?: string;
}): OutputDefinition {
  return {
    omitXmlDeclaration: parseYesNo(data.omitXmlDeclaration),
    standalone: parseYesNoOmit(data.standalone),
    doctypeSystem: data.doctypeSystem,
    doctypePublic: data.doctypePublic,
  };
}

export function mkResolver(namespaces: object) {
  return (prefix: string): string | null => {
    // For empty prefix, check xpath-default-namespace first
    if (prefix === "" && "#xpath-default" in namespaces) {
      return (namespaces["#xpath-default"] as string) || null;
    }
    return namespaces[prefix] as string | null;
  };
}

/* Implement algorithm to determine a namespace for a name. Takes a
   qname and resolver and an optional namespace and returns a
   namespace, or undefined if it's unqualified. */
export function determineNamespace(
  name: string,
  nsResolver: NamespaceResolver,
  passedNamespace?: string,
): [string | undefined, string] {
  let namespace: string | undefined = passedNamespace;
  if (namespace !== undefined) {
    return [namespace, name];
  }
  let prefix: string = "";
  if (name.includes(":")) {
    [prefix, name] = name.split(":");
  }
  namespace = nsResolver(prefix);
  return [namespace, name];
}

const NC = String.raw`[^,:\(\)\*\[\]/]`; // Pretty much anything is a NCName
const PATTERN_AXIS = String.raw`(child::|attribute::|@)?`;
const DOC_NODE_OPT = String.raw`(document-node\()?`;

const DEFAULT_PRIORITIES = new Map<RegExp, number>([
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

export function computeDefaultPriority(match: string): number {
  /* https://www.w3.org/TR/xslt20/#conflict */
  if (match && match.includes("|")) {
    return Math.max(
      ...match
        .split("|")
        .filter((s) => s !== "")
        .map((s) => computeDefaultPriority(s)),
    );
  }
  for (let [regexp, priority] of DEFAULT_PRIORITIES) {
    if (regexp.test(match)) {
      return priority;
    }
  }
  return 0.5;
}

export function sortSortable(templates: Array<Sortable>): Array<Sortable> {
  /* https://www.w3.org/TR/xslt20/#conflict */
  // Last declared is first priority.
  templates.reverse();
  // Higher priority comes first
  templates.sort(
    (a, b) =>
      (b.priority || computeDefaultPriority(b.match)) -
      (a.priority || computeDefaultPriority(a.match)),
  );
  // "Higher" (lower number) import precedence comes first
  templates.sort((a, b) => a.importPrecedence - b.importPrecedence);
  return templates;
}
