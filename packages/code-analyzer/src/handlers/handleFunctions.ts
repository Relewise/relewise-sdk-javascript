import { SourceFile } from 'ts-morph';
import { Entry } from '../models/entry';
import { Kind } from '../models/kind';
import { findParameterDependencies, handleParameters } from './handleParameters';

export function handleFunctions(sourceFile: SourceFile): Entry[] {
    const functions: Entry[] = [];

    sourceFile.getFunctions().forEach(m => {
        functions.push({
            kind: Kind[Kind.Method],
            name: m.getName(),
            docs: m.getJsDocs()[0]?.getText(),
            dependencies: findParameterDependencies(m.getParameters()),
            parameters: handleParameters(m.getParameters()),
            returnType: m.getReturnTypeNode()?.getText(),
        });
    });

    return functions;
}