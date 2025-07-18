import { ClassDeclaration, Scope } from 'ts-morph';
import { Entry } from '../models/entry';
import { Kind } from '../models/kind';
import { findParameterDependencies, handleParameters } from './handleParameters';

export function handleConstructors(cls: ClassDeclaration): Entry[] {
    const constructors: Entry[] = [];
    cls.getConstructors().map(c => {
        const scope = c.getScope();

        if (scope === Scope.Private || scope === Scope.Protected) {
            return;
        }

        constructors.push({
            kind: Kind[Kind.Constructor],
            name: 'constructor',
            docs: c.getJsDocs()[0]?.getText(),
            parent: cls.getName(),
            parentKind: Kind[Kind.Class],
            dependencies: findParameterDependencies(c.getParameters()),
            parameters: handleParameters(c.getParameters()),
        });
    });

    return constructors;
}