import { PropertyDeclaration, PropertySignature, Scope } from "ts-morph";
import { Property } from "../models/property";

export function handleProperties(properties: PropertyDeclaration[]): Property[] {
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

export function handlePropertySignatures(properties: PropertySignature[]): Property[] {
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