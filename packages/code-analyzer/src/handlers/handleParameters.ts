import { ParameterDeclaration, Scope } from 'ts-morph';
import { Parameter } from '../models/parameter';
import { findTypeDependencies } from './handleTypes';

export function handleParameters(parameters: ParameterDeclaration[]): Parameter[] {
    const results: Parameter[] = [];

    for (const param of parameters) {
        const name = param.getName();
        const typeNode = param.getTypeNode();
        const typeText = typeNode ? typeNode.getText().trim() : 'any';

        const nullable = param.hasQuestionToken();

        const initializer = param.getInitializer();
        const defaultValue = initializer ? initializer.getText() : null;

        results.push({
            name,
            type: typeText,
            nullable: nullable,
            defaultValue: defaultValue,
            isReadonly: param.isReadonly(),
            scope: param.getScope(),
        });
    }

    return results;
}

export function findParameterDependencies(parameters: ParameterDeclaration[]): string[] {
    const baseTypes = [
        'string', 'number', 'boolean', 'bigint', 'symbol', 'object', 'void', 'undefined', 'null', 'any', 'never', 'unknown', 'Date',
    ];

    const collectionForms = [
        (t: string) => `${t}[]`,
        (t: string) => `Array<${t}>`,
        (t: string) => `ReadonlyArray<${t}>`,
        (t: string) => `Set<${t}>`,
        (t: string) => `Map<any, ${t}>`,
        (t: string) => `Map<${t}, any>`,
    ];

    const trivial = new Set<string>();

    // Generate all trivial forms
    for (const type of baseTypes) {
        trivial.add(type.toLowerCase());
        for (const form of collectionForms) {
            trivial.add(form(type).replace(/\s/g, '').toLowerCase());
        }
    }

    const result: string[] = [];

    for (const param of parameters) {
        const scope = param.getScope();

        if (scope === Scope.Private || scope === Scope.Protected) {
            return;
        }

        const typeNode = param.getTypeNode();
        if (!typeNode) continue;

        // Split on union (|) and intersection (&), and check all parts
        const normalized = typeNode.getText().replace(/\s/g, '');
        const parts = normalized.split(/[\|&]/).map(p => p.trim());

        // Check if all parts of the param in trivial
        if (parts.every(p => trivial.has(p))) continue;

        const type = typeNode.getType();

        // Check if parameter is an object literal
        if (type.isObject() && !type.isInterface()) {

            // Find the dependencies for that object
            result.push(...findTypeDependencies(typeNode));
        } else {
            result.push(normalized);
        }
    }

    return [...new Set(result)];
}
