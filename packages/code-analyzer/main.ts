import { ClassDeclaration, ParameterDeclaration, Project, PropertyDeclaration, PropertySignature, Scope, SourceFile } from "ts-morph";
import * as fs from "fs";
import { Property } from "./models/property";
import { Entry } from "./models/entry";
import { Parameter } from "./models/parameter";
import { Kind } from "./models/kind";
import { IngestionRequest } from "./models/ingestionRequest";

const tsConfigFilePath = process.argv[2];
const project = new Project({ tsConfigFilePath: tsConfigFilePath });

const result: Entry[] = [];

for (const sourceFile of project.getSourceFiles()) {
    result.push(...handleClasses(sourceFile));
    result.push(...handleInterfaces(sourceFile));
    result.push(...handleFunctions(sourceFile));
    // TODO: handle types
}

function handleClasses(sourceFile: SourceFile): Entry[] {
  const classes: Entry[] = [];
  for (const cls of sourceFile.getClasses()) {

    if (!cls.isExported()) continue;

    classes.push(...handleMethods(cls));
    classes.push(...handleConstructors(cls));

    const properties = handleProperties(cls.getProperties());

    const ex = cls.getExtends()?.getText();

    classes.push({
      kind: Kind[Kind.Class],
      name: cls.getName(),
      docs: cls.getJsDocs()[0]?.getText(),
      dependencies: properties.map(x => x.type),
      isAbstract: cls.isAbstract(),
      isDefault: cls.isDefaultExport(),
      properties: properties,
      extends: ex ? [ex] : null
    });
  }

  return classes;
}

function handleInterfaces(sourceFile: SourceFile): Entry[] {
  const interfaces: Entry[] = [];
  
  for (const i of sourceFile.getInterfaces()) {
    const ex = i.getExtends()?.map(x => x.getText()) ?? null;

    const properties = handlePropertySignatures(i.getProperties());

    interfaces.push({
      kind: Kind[Kind.Interface],
      name: i.getName(),
      docs: i.getJsDocs()[0]?.getText(),
      extends: ex,
      properties: properties
    });
  }

  return interfaces;
}

function handleMethods(cls: ClassDeclaration): Entry[] {
  const methods: Entry[] = [];

  cls.getMethods().forEach(m => {
    const scope = m.getScope();

    if (scope === Scope.Private || scope === Scope.Protected) {
      return;
    }

    methods.push({
      kind: Kind[Kind.Method],
      name: m.getName(),
      parent: cls.getName(),
      parentKind: Kind[Kind.Class],
      docs: m.getJsDocs()[0]?.getText(),
      dependencies: findNonTrivialParameters(m.getParameters()),
      parameters: handleParameters(m.getParameters()),
      returnType: m.getReturnTypeNode()?.getText(),
      isAsync: m.isAsync()
    });
  });

  return methods;
}

function handleFunctions(sourceFile: SourceFile): Entry[] {
  const functions: Entry[] = [];

  sourceFile.getFunctions().forEach(m => {
    functions.push({
      kind: Kind[Kind.Method],
      name: m.getName(),
      docs: m.getJsDocs()[0]?.getText(),
      dependencies: findNonTrivialParameters(m.getParameters()),
      parameters: handleParameters(m.getParameters()),
      returnType: m.getReturnTypeNode()?.getText()
    });
  });

  return functions;
}


function handleConstructors(cls: ClassDeclaration): Entry[] {
  const constructors: Entry[] = []
  cls.getConstructors().map(c => {
    const scope = c.getScope();

    if (scope === Scope.Private || scope === Scope.Protected) {
      return;
    }

    constructors.push({
      kind: Kind[Kind.Constructor],
      name: "constructor",
      docs: c.getJsDocs()[0]?.getText(),
      parent: cls.getName(),
      parentKind: Kind[Kind.Class],
      dependencies: findNonTrivialParameters(c.getParameters()),
      parameters: handleParameters(c.getParameters())
    })
  });

  return constructors;
}

function findNonTrivialParameters(parameters: ParameterDeclaration[]): string[] {
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
    const scope = param.getScope();

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

function handleParameters(parameters: ParameterDeclaration[]): Parameter[] {
  const results: Parameter[] = [];

  for (const param of parameters) {
    const name = param.getName();
    const typeNode = param.getTypeNode();
    const typeText = typeNode ? typeNode.getText().trim() : "any";

    const nullable = param.hasQuestionToken();

    const initializer = param.getInitializer();
    const defaultValue = initializer ? initializer.getText() : null;

    results.push({
      name,
      type: typeText,
      nullable: nullable,
      defaultValue: defaultValue,
      isReadonly: param.isReadonly(),
      scope: param.getScope()
    });
  }

  return results;
}

function handleProperties(properties: PropertyDeclaration[]): Property[] {

  return properties.flatMap(p => { 
    const scope = p.getScope();

    if (scope === Scope.Private || scope === Scope.Protected) {
      return [];
    }

    const typeNode = p.getTypeNode();
    if (!typeNode) {
      return [];
    } 

    const initializer = p.getInitializer();
    const defaultValue = initializer ? initializer.getText() : null;

    return {
      name: p.getName(),
      type: typeNode.getText(),
      docs: p.getJsDocs()[0]?.getText(),
      nullable: p.hasQuestionToken(),
      defaultValue: defaultValue
    };
  });
}

function handlePropertySignatures(properties: PropertySignature[]): Property[] {
  return properties.flatMap(p => { 
    const typeNode = p.getTypeNode();
    if (!typeNode) {
      return [];
    } 
    
    const initializer = p.getInitializer();
    const defaultValue = initializer ? initializer.getText() : null;

    return {
      name: p.getName(),
      type: typeNode.getText(),
      docs: p.getJsDocs()[0]?.getText(),
      nullable: p.hasQuestionToken(),
      defaultValue: defaultValue
    };
  });
}

const ingestionRequest: IngestionRequest = {
  entries: result
};

fs.writeFileSync("ingestion-request.json", JSON.stringify(ingestionRequest, null, 2));