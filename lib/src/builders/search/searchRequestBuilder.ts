import { SearchRequest } from "@/models/data-contracts";
import { FilterBuilder, RelevanceModifierBuilder } from "../filterBuilder";
import { Settings } from "../settings";

export abstract class SearchRequestBuilder {
    private readonly filterBuilder: FilterBuilder = new FilterBuilder();
    private readonly postFilterBuilder: FilterBuilder = new FilterBuilder();
    private readonly relevanceModifierBuilder: RelevanceModifierBuilder = new RelevanceModifierBuilder();
    private indexId: string | null | undefined;

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

    public relevanceModifiers(relevanceModifierBuilder: (builder: RelevanceModifierBuilder) => void): this {
        relevanceModifierBuilder(this.relevanceModifierBuilder);

        return this;
    }

    /**
     * Only needed when needing to specific an index different from the 'default'-index
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
            relevanceModifiers: this.relevanceModifierBuilder.build(),
            ...(this.indexId && { indexSelector: { id: this.indexId } })
        };
    }
}