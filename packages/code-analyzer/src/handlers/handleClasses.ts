import { SourceFile } from 'ts-morph';
import { Entry } from '../models/entry';
import { Kind } from '../models/kind';
import { handleMethods } from './handleMethods';
import { handleConstructors } from './handleConstructors';
import { handleProperties } from './handleProperties';

export function handleClasses(sourceFile: SourceFile): Entry[] {
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
        dependencies: properties.map(x => x.baseType),
        isAbstract: cls.isAbstract(),
        isDefault: cls.isDefaultExport(),
        properties: properties,
        extends: ex ? [ex] : null,
    });
  }

  return classes;
}