import { ClassDeclaration, Scope } from "ts-morph";
import { Entry } from "../models/entry";
import { Kind } from "../models/kind";
import { findNonTrivialParameters, handleParameters } from "./handleParameters";

export function handleMethods(cls: ClassDeclaration): Entry[] {
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
