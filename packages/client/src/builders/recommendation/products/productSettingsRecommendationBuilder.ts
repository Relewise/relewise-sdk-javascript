import { Settings } from '../../../builders/settings';
import { ProductRecommendationRequestSettings, SelectedProductPropertiesSettings, SelectedVariantPropertiesSettings, SelectedBrandPropertiesSettings } from '../../../models/data-contracts';
import { RecommendationRequestBuilder } from '../recommendationRequestBuilder';

export class ProductSettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: ProductRecommendationRequestSettings = {
        allowFillIfNecessaryToReachNumberOfRecommendations: true,
        allowReplacingOfRecentlyShownRecommendations: true,
        recommendVariant: true,
        numberOfRecommendations: 10,
        prioritizeDiversityBetweenRequests: false,
    };

    constructor(
        settings: Settings) {
        super(settings);
    }

    public setSelectedProductProperties(productProperties: Partial<SelectedProductPropertiesSettings>): this {
        this.recommendationSettings.selectedProductProperties = productProperties as SelectedProductPropertiesSettings;

        return this;
    }

    public setSelectedVariantProperties(variantProperties: Partial<SelectedVariantPropertiesSettings>): this {
        this.recommendationSettings.selectedVariantProperties = variantProperties as SelectedVariantPropertiesSettings;

        return this;
    }

    public setSelectedBrandProperties(brandProperties: Partial<SelectedBrandPropertiesSettings>): this {
        this.recommendationSettings.selectedBrandProperties = brandProperties as SelectedBrandPropertiesSettings;

        return this;
    }

    public setNumberOfRecommendations(count: number): this {
        this.recommendationSettings.numberOfRecommendations = count;

        return this;
    }

    public allowFillIfNecessaryToReachNumberOfRecommendations(allowed: boolean = true): this {
        this.recommendationSettings.allowFillIfNecessaryToReachNumberOfRecommendations = allowed;

        return this;
    }

    public allowReplacingOfRecentlyShownRecommendations(allowed: boolean = true): this {
        this.recommendationSettings.allowReplacingOfRecentlyShownRecommendations = allowed;

        return this;
    }

    public allowProductsCurrentlyInCart(allowed: boolean = true): this {
        this.recommendationSettings.allowProductsCurrentlyInCart = allowed;

        return this;
    }

    public prioritizeDiversityBetweenRequests(prioritize: boolean = true): this {
        this.recommendationSettings.prioritizeDiversityBetweenRequests = prioritize;

        return this;
    }

    public recommendVariant(recommend: boolean = true): this {
        this.recommendationSettings.recommendVariant = recommend;

        return this;
    }
}