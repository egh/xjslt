import { NamespaceResolver } from "fontoxpath";
import { OutputDefinition } from "./definitions";

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
    return namespaces[prefix];
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
