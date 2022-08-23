import { SearchRequest } from "@/models/data-contracts";
import { FilterBuilder } from "../filterBuilder";
import { Settings } from "../settings";

export abstract class SearchRequestBuilder {
    private readonly filterBuilder: FilterBuilder = new FilterBuilder();
    private readonly postFilterBuilder: FilterBuilder = new FilterBuilder();
    private indexId: string | null | undefined;

    constructor(
        private readonly settings: Settings) {
    }

    /**
     * Adds filters to the request
     * @param filterBuilder 
     * @returns 
     */
    public filters(filterBuilder: (builder: FilterBuilder) => void): this {
        filterBuilder(this.filterBuilder);

        return this;
    }

    /**
     * Adds post filters to the request
     * @param filterBuilder 
     * @returns 
     */
    public postFilters(filterBuilder: (builder: FilterBuilder) => void): this {
        filterBuilder(this.postFilterBuilder);

        return this;
    }

    /**
     * Use only when a specific index different from the 'default'-index is needed
     * @param id 
     * @returns 
     */
    public setIndex(id?: string | null): this {
        this.indexId = id;

        return this;
    }

    protected baseBuild(): SearchRequest {
        return {
            currency: { value: this.settings.currency },
            user: this.settings.user,
            language: { value: this.settings.language },
            displayedAtLocation: this.settings.displayedAtLocation,
            filters: this.filterBuilder.build(),
            postFilters: this.postFilterBuilder.build() ,
            relevanceModifiers: null,
            ...(this.indexId && { indexSelector: { id: this.indexId } })
        };
    }
}