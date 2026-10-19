import { SearchRequest } from '../../models/data-contracts';
import { FilterBuilder } from '../filterBuilder';
import { RelevanceModifierBuilder } from '../relevanceModifierBuilder';
import { Settings } from '../settings';

export abstract class SearchRequestBuilder {
    private readonly filterBuilder: FilterBuilder = new FilterBuilder();
    private readonly postFilterBuilder: FilterBuilder = new FilterBuilder();
    private readonly relevanceModifiersBuilder: RelevanceModifierBuilder = new RelevanceModifierBuilder();
    private indexId: string | null | undefined;
    private configuredContextValues: Record<string, string> | null = null;

    constructor(
        private readonly settings?: Settings) {
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

    public relevanceModifiers(relevanceModifiersBuilder: (builder: RelevanceModifierBuilder) => void): this {
        relevanceModifiersBuilder(this.relevanceModifiersBuilder);

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

    /**
 * Context values used to determine which merchandising rules apply to this request,
 * such as DeviceType=Mobile or SplitTestVariant=A.
 * Keys and values are case-sensitive.
 * On a search request collection, these values provide defaults for its requests.
 * In a batch, request values override matching batch keys; other batch values are inherited.
 * A null or empty dictionary leaves any batch values unchanged.
 * Values are visible in LiveView and are not stored on the user. Do not include sensitive information.
 * @param contextValues 
 * @returns 
 */
    public contextValues(contextValues: Record<string, string> | null): this {
        this.configuredContextValues = contextValues === null ? null : { ...contextValues };

        return this;
    }

    /**
     * Adds or replaces a single context value.
     * @param key
     * @param value
     * @returns
     */
    public addContextValue(key: string, value: string): this {
        this.configuredContextValues = {
            ...(this.configuredContextValues ?? {}),
            [key]: value,
        };

        return this;
    }

    protected baseBuild(): Omit<SearchRequest, '$type' | 'currency' | 'language' | 'displayedAtLocation'> {
        return {
            ...(this.settings && {
                currency: { value: this.settings.currency },
                language: { value: this.settings.language },
                displayedAtLocation: this.settings.displayedAtLocation,
                user: this.settings.user,
            }),
            contextValues: this.configuredContextValues ?? undefined,
            filters: this.filterBuilder.build(),
            postFilters: this.postFilterBuilder.build(),
            relevanceModifiers: this.relevanceModifiersBuilder.build(),
            ...(this.indexId && { indexSelector: { id: this.indexId } }),
        };
    }
}
