import { SearchRequest } from "@/models/data-contracts";
import { FilterBuilder } from "../filterBuilder";
import { Settings } from "../settings";

export abstract class SearchRequestBuilder {
    private readonly filterBuilder: FilterBuilder = new FilterBuilder();
    private readonly postFilterBuilder: FilterBuilder = new FilterBuilder();
    private indexId: string | null | undefined;
    private customFields: Record<string, string | null> = {};

    constructor(
        private readonly settings: Settings) {
    }

    public filters(filterBuilder: (builder: FilterBuilder) => void): this {
        filterBuilder(this.filterBuilder);

        return this;
    }

    public postFilters(filterBuilder: (builder: FilterBuilder) => void): this {
        filterBuilder(this.postFilterBuilder);

        return this;
    }

    public setIndex(id?: string | null): this {
        this.indexId = id;

        return this;
    }

    public addCustom(key: string, value: string | null): this {
        this.customFields.key = value;

        return this;
    }

    public removeCustom(key: string): this {
        delete this.customFields.key;

        return this;
    }

    protected baseBuild(): SearchRequest {
        return {
            currency: { value: this.settings.currency },
            user: this.settings.user,
            language: { value: this.settings.language },
            displayedAtLocation: this.settings.displayedAtLocation,
            filters: { items: this.filterBuilder.filters },
            postFilters: { items: this.postFilterBuilder.filters },

            relevanceModifiers: null,
            ...(this.indexId && { indexSelector: { id: this.indexId } }),
            custom: this.customFields,
        };
    }
}