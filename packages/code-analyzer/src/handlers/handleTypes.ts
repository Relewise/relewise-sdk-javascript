import { SourceFile, SyntaxKind, TypeNode, IntersectionTypeNode, TypeLiteralNode, PropertySignature, TypeReferenceNode, UnionTypeNode } from 'ts-morph';
import { Entry } from '../models/entry';
import { Kind } from '../models/kind';

export function handleTypes(sourceFile: SourceFile): Entry[] {
  const types: Entry[] = [];
  
  for (const typeAlias of sourceFile.getTypeAliases()) {
    if (!typeAlias.isExported()) continue;

    const name = typeAlias.getName();
    const typeNode = typeAlias.getTypeNode();
    const dependencies = extractTypeDependencies(typeNode);
    
    // Get the full text and extract just the type definition without the 'export' keyword
    const fullText = typeAlias.getText();
    const typeText = fullText.replace(/^export\s+/, '');
    
    types.push({
      kind: Kind[Kind.Type],
      name: name,
      docs: typeAlias.getJsDocs()[0]?.getText(),
      dependencies: dependencies.length > 0 ? dependencies : undefined,
      definition: typeText
    });
  }

  return types;
}

function extractTypeDependencies(typeNode: TypeNode | undefined): string[] {
  if (!typeNode) return [];

  const dependencies = new Set<string>();
  
  // Handle different type node kinds
  switch (typeNode.getKind()) {
    case SyntaxKind.TypeReference:
      const typeRef = typeNode as TypeReferenceNode;
      const typeName = typeRef.getTypeName().getText();
      
      // Skip primitive types
      const primitives = ['string', 'number', 'boolean', 'object', 'any', 'unknown', 'void', 'never', 'undefined', 'null'];
      if (!primitives.includes(typeName)) {
        dependencies.add(typeName);
      }
      
      // Handle generic type arguments
      const typeArgs = typeRef.getTypeArguments();
      typeArgs.forEach(arg => {
        extractTypeDependencies(arg).forEach(dep => dependencies.add(dep));
      });
      break;

    case SyntaxKind.UnionType:
      const unionType = typeNode as UnionTypeNode;
      unionType.getTypeNodes().forEach(unionMember => {
        extractTypeDependencies(unionMember).forEach(dep => dependencies.add(dep));
      });
      break;

    case SyntaxKind.IntersectionType:
      const intersectionType = typeNode as IntersectionTypeNode;
      intersectionType.getTypeNodes().forEach(intersectionMember => {
        extractTypeDependencies(intersectionMember).forEach(dep => dependencies.add(dep));
      });
      break;

    case SyntaxKind.ArrayType:
      const arrayType = typeNode.asKindOrThrow(SyntaxKind.ArrayType);
      extractTypeDependencies(arrayType.getElementTypeNode()).forEach(dep => dependencies.add(dep));
      break;

    case SyntaxKind.TypeLiteral:
      const typeLiteral = typeNode as TypeLiteralNode;
      typeLiteral.getProperties().forEach(prop => {
        if (prop.getKind() === SyntaxKind.PropertySignature) {
          const propSig = prop as PropertySignature;
          const propTypeNode = propSig.getTypeNode();
          if (propTypeNode) {
            extractTypeDependencies(propTypeNode).forEach(dep => dependencies.add(dep));
          }
        }
      });
      break;
  }

  return Array.from(dependencies);
}