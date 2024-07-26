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
