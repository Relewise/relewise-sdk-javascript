import { Project } from 'ts-morph';
import * as fs from 'fs';
import { Entry } from './models/entry';
import { IngestionRequest } from './models/ingestionRequest';
import { handleClasses } from './handlers/handleClasses';
import { handleInterfaces } from './handlers/handleInterfaces';
import { handleFunctions } from './handlers/handleFunctions';
import { handleTypes } from './handlers/handleTypes';
import { handleEnums } from './handlers/handleEnums';

const tsConfigFilePath = process.argv[2];
const packageName = process.argv[3];

const project = new Project({ tsConfigFilePath: tsConfigFilePath });

const result: Entry[] = [];

for (const sourceFile of project.getSourceFiles()) {
    result.push(...handleClasses(sourceFile));
    result.push(...handleInterfaces(sourceFile));
    result.push(...handleFunctions(sourceFile));
    result.push(...handleTypes(sourceFile));
    result.push(...handleEnums(sourceFile));
}

const ingestionRequest: IngestionRequest = {
    packageName: packageName,
    entries: result,
};

fs.writeFileSync('ingestion-request.json', JSON.stringify(ingestionRequest, null, 2));