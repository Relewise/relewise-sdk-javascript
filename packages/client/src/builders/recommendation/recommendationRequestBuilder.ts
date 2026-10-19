import { RecommendationRequest } from '../../models/data-contracts';
import { FilterBuilder } from '../filterBuilder';
import { RelevanceModifierBuilder } from '../relevanceModifierBuilder';
import { Settings } from '../settings';

export abstract class RecommendationRequestBuilder {
    private readonly filterBuilder: FilterBuilder = new FilterBuilder();
    private readonly relevanceModifiersBuilder: RelevanceModifierBuilder = new RelevanceModifierBuilder();
    private configuredContextValues: Record<string, string> | null = null;

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

    public relevanceModifiers(relevanceModifiersBuilder: (builder: RelevanceModifierBuilder) => void): this {
        relevanceModifiersBuilder(this.relevanceModifiersBuilder);

        return this;
    }

    /**
     * Context values used to determine which merchandising rules apply to this request,
     * such as DeviceType=Mobile or SplitTestVariant=A.
     * Keys and values are case-sensitive.
     * On a recommendation request collection, these values provide defaults for its requests.
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

    protected baseBuild(): Omit<RecommendationRequest, '$type'> {
        return {
            currency: { value: this.settings.currency },
            user: this.settings.user,
            contextValues: this.configuredContextValues ?? undefined,
            language: { value: this.settings.language },
            displayedAtLocationType: this.settings.displayedAtLocation,
            filters: this.filterBuilder.build() ?? {},
            relevanceModifiers: this.relevanceModifiersBuilder.build() ?? {},
        };
    }
}
