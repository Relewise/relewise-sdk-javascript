import { RelewiseClient, RelewiseClientOptions } from "./relewise.client";

export class Searcher extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        super(datasetId, apiKey, options);
    }
}