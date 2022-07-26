import { RelewiseClient, RelewiseClientOptions } from "./relewise.client";

export class SearchAdministrator extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        super(datasetId, apiKey, options);
    }
}