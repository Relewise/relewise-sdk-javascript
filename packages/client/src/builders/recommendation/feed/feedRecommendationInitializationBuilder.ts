import { Settings } from '../../../builders/settings';
import { Feed, FeedComposition, FeedRecommendationInitializationRequest, FeedSeed, SelectedContentPropertiesSettings, SelectedProductPropertiesSettings, SelectedVariantPropertiesSettings } from '../../../models/data-contracts';
import { RecommendationRequestBuilder } from '../recommendationRequestBuilder';
import { FeedCompositionBuilder, FeedCompositionOptions } from './feedCompositionBuilder';

export class FeedRecommendationInitializationBuilder extends RecommendationRequestBuilder {
    private feed: Feed;

    constructor(settings: Settings, { minimumPageSize }: { minimumPageSize: number }) {
        super(settings);

        this.feed = {
            minimumPageSize: minimumPageSize,
            compositions: [],
            allowProductsCurrentlyInCart: false,
            recommendVariant: false
        };
    }

    /**
     * Useful, for example, when you want to show a feed based on specific product(s) or content, such as a PDP/CDP, a shopping cart, or an order.
     * @param seed 
     */
    public seed(seed: FeedSeed): this {
        this.feed.seed = seed;

        return this;
    }

    /**
     * Adds a composition to the feed. Defines how the feed will be composed, which types of entities to include, how many of each type, and any filters or relevance modifiers that should apply to each type, etc.
     * @param options 
     * @param builderFn 
     */
    public addCompostion({ options, settingsBuilder }: { options: FeedCompositionOptions, settingsBuilder?: (feedBuilder: FeedCompositionBuilder) => void }): this {
        this.feed.compositions ??= [];

        const builder = new FeedCompositionBuilder(options);
        if (settingsBuilder) {
            settingsBuilder(builder);
        }

        this.feed.compositions.push(builder.build());

        return this;
    }

    /**
     * Select the properties of the product to be returned, by default only the product id is returned.
     * @param productProperties  
     */
    public setSelectedProductProperties(productProperties: Partial<SelectedProductPropertiesSettings> | null): this {
        this.feed.selectedProductProperties = productProperties as SelectedProductPropertiesSettings | null;

        return this;
    }

    /**
    * Select the properties of the variant to be returned, by default only the variant id is returned.  
    * @param variantProperties  
    */
    public setSelectedVariantProperties(variantProperties: Partial<SelectedVariantPropertiesSettings> | null): this {
        this.feed.selectedVariantProperties = variantProperties as SelectedVariantPropertiesSettings | null;

        return this;
    }

    /**
     * Select the properties of the content to be returned, by default only the content id is returned.
     * @param contentProperties  
     */
    public setSelectedContentProperties(contentProperties: Partial<SelectedContentPropertiesSettings> | null): this {
        this.feed.selectedContentProperties = contentProperties as SelectedContentPropertiesSettings | null;

        return this;
    }

    /**
     * Defines if variants should be included for returned products
     * @param recommend 
     */
    public recommendVariant(recommend: boolean = true): this {
        this.feed.recommendVariant = recommend;

        return this;
    }

    /**
     * The minimum number of items to return initially and per every FeedRecommendationNextItemsRequest.
     * A higher number of results may be returned if composition configurations dictate so.
     * @param size 
     */
    public minimumPageSize(size: number): this {
        this.feed.minimumPageSize = size;

        return this;
    }

    /**
     * Defines if products should be excluded if they are currently present in the users Cart
     * @param allow 
     */
    public allowProductsCurrentlyInCart(allow: boolean = true): this {
        this.feed.allowProductsCurrentlyInCart = allow;

        return this;
    }

    public build() {
        const request: FeedRecommendationInitializationRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.Feed.FeedRecommendationInitializationRequest, Relewise.Client',
            ...this.baseBuild(),
            feed: this.feed,
        };

        return request;
    }
}
