import { ContentSearchRequest, ProductSearchRequest, SearchRequestCollection, SearchTermPredictionRequest } from "@/models/data-contracts";
import { Settings } from "../settings";
import { Builder } from "./builder";
import { SearchRequestBuilder } from "./searchRequestBuilder";

export class SearchCollectionBuilder extends SearchRequestBuilder {
    private readonly requests: (ProductSearchRequest | ContentSearchRequest | SearchTermPredictionRequest)[] = [];

    constructor(settings: Settings) {
        super(settings)
    }

    public addRequest(request: ProductSearchRequest | ContentSearchRequest | SearchTermPredictionRequest) {
        this.requests.push(request);

        return this;
    }

    public addBuilder(builder: Builder) {
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