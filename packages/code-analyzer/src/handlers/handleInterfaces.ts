import { SourceFile } from 'ts-morph';
import { Entry } from '../models/entry';
import { Kind } from '../models/kind';
import { handlePropertySignatures } from './handleProperties';

export function handleInterfaces(sourceFile: SourceFile): Entry[] {
    const interfaces: Entry[] = [];
  
    for (const i of sourceFile.getInterfaces()) {
        const ex = i.getExtends()?.map(x => x.getText()) ?? null;

        const properties = handlePropertySignatures(i.getProperties());

        interfaces.push({
            kind: Kind[Kind.Interface],
            name: i.getName(),
            docs: i.getJsDocs()[0]?.getText(),
            extends: ex,
            properties: properties,
        });
    }

    return interfaces;
}