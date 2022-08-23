import { ContentSearchRequest, ProductSearchRequest, SearchRequestCollection, SearchTermPredictionRequest } from "@/models/data-contracts";
import { Settings } from "../settings";
import { SearchBuilder } from "./searchBuilder";
import { SearchRequestBuilder } from "./searchRequestBuilder";

export class SearchCollectionBuilder extends SearchRequestBuilder {
    private readonly requests: (ProductSearchRequest | ContentSearchRequest | SearchTermPredictionRequest)[] = [];

    constructor(settings: Settings) {
        super(settings)
    }

    public addRequest(request: ProductSearchRequest | ContentSearchRequest | SearchTermPredictionRequest): this {
        this.requests.push(request);

        return this;
    }

    public addBuilder(builder: SearchBuilder): this {
        this.addRequest(builder.build());

        return this;
    }

    public build(): SearchRequestCollection {
        return {
            ...this.baseBuild(),
            requests: this.requests,
        };
    }
}