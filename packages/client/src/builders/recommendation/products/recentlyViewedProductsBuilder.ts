import { Settings } from '../../../builders/settings';
import { RecentlyViewedProductsRequest } from '../../../models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';

export class RecentlyViewedProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<RecentlyViewedProductsRequest> {
    constructor(
        settings: Settings) {
        super(settings);
    }

    public build(): RecentlyViewedProductsRequest {
        const request: RecentlyViewedProductsRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.RecentlyViewedProductsRequest, Relewise.Client',
            ...this.baseBuild(),
            settings: this.recommendationSettings,
        };

        return request;
    }
}
