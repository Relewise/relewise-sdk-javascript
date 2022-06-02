import { RelewiseClient } from "./relewise.client";

export class SearchAdministrator extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, serverUrl?: string) {
        super(datasetId, apiKey, serverUrl);
    }
}