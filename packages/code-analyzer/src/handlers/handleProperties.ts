import { PropertyDeclaration, PropertySignature, Scope, Type } from 'ts-morph';
import { Property } from '../models/property';
import { getBaseType } from './handleTypes';

export function handleProperties(properties: PropertyDeclaration[]): Property[] {
    return properties.flatMap(p => { 
        const scope = p.getScope();

        if (scope === Scope.Private || scope === Scope.Protected) {
            return [];
        }

        const typeNode = p.getTypeNode();

        // When working with enums we don't have a typeNode
        const type = typeNode ? typeNode.getText() : p.getType().getSymbol()?.getName();

        const initializer = p.getInitializer();
        const defaultValue = initializer ? initializer.getText() : null;

        return {
            name: p.getName(),
            type: type || 'unknown',
            docs: p.getJsDocs()[0]?.getText(),
            nullable: p.hasQuestionToken(),
            defaultValue: defaultValue,
            baseType: getBaseType(p.getType()),
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
            defaultValue: defaultValue,
            baseType: getBaseType(p.getType()),
        };
    });
}
