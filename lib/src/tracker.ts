import { RelewiseClient } from "./relewise.client";
import { TrackOrderRequest } from "./models/data-contracts";

export class Tracker extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, serverUrl?: string) {
        super(datasetId, apiKey, serverUrl);
    }

    public async trackOrder(request: TrackOrderRequest): Promise<void | undefined> {
        return this.request<TrackOrderRequest, void>('TrackOrderRequest', request);
    }
}
