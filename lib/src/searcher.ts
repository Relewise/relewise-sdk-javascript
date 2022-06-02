import { RelewiseClient } from "./relewise.client";

export class Searcher extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, serverUrl?: string) {
        super(datasetId, apiKey, serverUrl);
    }
}