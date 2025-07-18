import { Entry } from './entry';

export type IngestionRequest = {
    packageName: string;
    entries: Entry[];
}