import { SourceFile } from 'ts-morph';
import { Entry } from '../models/entry';
import { Kind } from '../models/kind';

export function handleEnums(sourceFile: SourceFile): Entry[] {
  const enums: Entry[] = [];

  for (const enumDecl of sourceFile.getEnums()) {
    if (!enumDecl.isExported()) continue;

    const name = enumDecl.getName();
    const members = enumDecl.getMembers().map(member => member.getName());

    enums.push({
      kind: Kind[Kind.Enum],
      name: name,
      docs: enumDecl.getJsDocs()[0]?.getText(),
      definition: `enum ${name} { ${members.join(', ')} }`
    });
  }

  return enums;
}