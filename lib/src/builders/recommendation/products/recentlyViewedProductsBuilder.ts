import { RecentlyViewedProductsRequest } from '../../../models/data-contracts';
import { ProductSettingsRecommendationBuilder, ProductsRecommendationBuilder, Settings } from '../..';

export class RecentlyViewedProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<RecentlyViewedProductsRequest> {
    constructor(
        settings: Settings) {
        super(settings);
    }

    public build() {
        const request: RecentlyViewedProductsRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.RecentlyViewedProductsRequest, Relewise.Client',
            ...this.baseBuild(),
            settings: this.recommendationSettings,
        };

        return request;
    }
}
