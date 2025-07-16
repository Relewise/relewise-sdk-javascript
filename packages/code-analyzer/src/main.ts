import { Project } from 'ts-morph';
import * as fs from 'fs';
import { Entry } from './models/entry';
import { IngestionRequest } from './models/ingestionRequest';
import { handleClasses } from './handlers/handleClasses';
import { handleInterfaces } from './handlers/handleInterfaces';
import { handleFunctions } from './handlers/handleFunctions';
import { handleTypes } from './handlers/handleTypes';

const tsConfigFilePath = process.argv[2];
const project = new Project({ tsConfigFilePath: tsConfigFilePath });

const result: Entry[] = [];

for (const sourceFile of project.getSourceFiles()) {
    result.push(...handleClasses(sourceFile));
    result.push(...handleInterfaces(sourceFile));
    result.push(...handleFunctions(sourceFile));
    result.push(...handleTypes(sourceFile));
}

const ingestionRequest: IngestionRequest = {
    entries: result,
};

fs.writeFileSync('ingestion-request.json', JSON.stringify(ingestionRequest, null, 2));