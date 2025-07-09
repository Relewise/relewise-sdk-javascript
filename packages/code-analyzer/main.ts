import { ClassDeclaration, ParameterDeclaration, Project, PropertyDeclaration, Scope, SourceFile, ts, Type, TypeFormatFlags } from "ts-morph";
import * as fs from "fs";
import { Property } from "./models/property";
import { Entry, Kind } from "./models/entry";

const tsConfigFilePath = process.argv[2];
const project = new Project({ tsConfigFilePath: tsConfigFilePath });

const result: Entry[] = [];

for (const sourceFile of project.getSourceFiles()) {
    result.push(...handleClasses(sourceFile));
    result.push(...handleInterfaces(sourceFile));
}

function handleClasses(sourceFile: SourceFile): Entry[] {
  const classes: Entry[] = [];
  for (const cls of sourceFile.getClasses()) {

    if (!cls.isExported()) continue;

    classes.push(...handleMethods(cls));
    classes.push(...handleConstructors(cls));

    const properties = handleProperties(cls.getProperties());

    // TODO: Add information about parent
    classes.push({
      kind: Kind[Kind.Class],
      name: cls.getName(),
      docs: cls.getJsDocs().map(doc => doc.getComment().toString()),
      dependencies: properties.map(x => x.type),
      isAbstract: cls.isAbstract(),
      isDefault: cls.isDefaultExport(),
      properties: properties
    });
  }

  return classes;
}

function handleInterfaces(sourceFile: SourceFile): Entry[] {
  const interfaces: Entry[] = [];

  for (const i of sourceFile.getInterfaces()) {
    // TODO: Add information about parent
    interfaces.push({
      kind: Kind[Kind.Interface],
      name: i.getName(),
      docs: i.getJsDocs().map(doc => doc.getComment().toString()),
    });
  }

  return interfaces;
}

function handleMethods(cls: ClassDeclaration): Entry[] {
  const methods: Entry[] = [];

  cls.getMethods().forEach(m => {
    const scope = m.getScope(); // "public" | "protected" | "private" | undefined

    // Skip if private or protected
    if (scope === Scope.Private || scope === Scope.Protected) {
      return;
    }

    methods.push({
      kind: Kind[Kind.Method],
      name: m.getName(),
      parent: cls.getName(),
      parentKind: Kind[Kind.Class],
      docs: m.getJsDocs().map(doc => doc.getComment()?.toString()),
      dependencies: handleParameters(m.getParameters()),
    });
  });

  return methods;
}


function handleConstructors(cls: ClassDeclaration): Entry[] {
  const constructors: Entry[] = []
  cls.getConstructors().map(c => {
    const scope = c.getScope(); // "public" | "protected" | "private" | undefined

    // Skip if private or protected
    if (scope === Scope.Private || scope === Scope.Protected) {
      return;
    }

    constructors.push({
      kind: Kind[Kind.Constructor],
      name: "constructor",
      docs: c.getJsDocs().map(doc => doc.getComment().toString()),
      parent: cls.getName(),
      parentKind: Kind[Kind.Class],
      dependencies: handleParameters(c.getParameters())
    })
  });

  return constructors;
}

function handleParameters(parameters: ParameterDeclaration[]): string[] {
  const baseTypes = [
    "string", "number", "boolean", "bigint", "symbol", "object", "void", "undefined", "null", "any", "never", "unknown", "Date"
  ];

  const collectionForms = [
    (t: string) => `${t}[]`,
    (t: string) => `Array<${t}>`,
    (t: string) => `ReadonlyArray<${t}>`,
    (t: string) => `Set<${t}>`,
    (t: string) => `Map<any, ${t}>`,
    (t: string) => `Map<${t}, any>`
  ];

  const trivial = new Set<string>();

  // Generate all trivial forms
  for (const type of baseTypes) {
    trivial.add(type.toLowerCase());
    for (const form of collectionForms) {
      trivial.add(form(type).replace(/\s/g, "").toLowerCase());
    }
  }

  const seen = new Set<string>();
  const result: string[] = [];

  for (const param of parameters) {
    const scope = param.getScope(); // "public" | "protected" | "private" | undefined

    // Skip if private or protected
    if (scope === Scope.Private || scope === Scope.Protected) {
      return;
    }

    const typeNode = param.getTypeNode();
    if (!typeNode) continue;

    const raw = typeNode.getText();
    const normalized = raw.replace(/\s/g, "").toLowerCase();

    // Split on union (|) and intersection (&), and check all parts
    const parts = normalized.split(/[\|&]/).map(p => p.trim());
    const allTrivial = parts.every(p => trivial.has(p));

    if (!allTrivial && !seen.has(normalized)) {
      result.push(raw);
      seen.add(normalized);
    }
  }

  return result;
}

function handleProperties(properties: PropertyDeclaration[]): Property[] {

  return properties.flatMap(p => { 
    const scope = p.getScope(); // "public" | "protected" | "private" | undefined

    // Skip if private or protected
    if (scope === Scope.Private || scope === Scope.Protected) {
      return [];
    }

    const typeNode = p.getTypeNode();
    if (!typeNode) {
      return [];
    } 

    return {
      name: p.getName(),
      type: typeNode.getText()
    };;
  });
}

fs.writeFileSync("code-analysis.json", JSON.stringify(result, null, 2));