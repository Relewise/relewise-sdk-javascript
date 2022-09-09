import { Settings } from '@/builders/settings';
import { ProductsViewedAfterViewingProductRequest } from '@/models/data-contracts';
import { ProductRecommendationBuilder } from './productRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';

export class ProductsViewedAfterViewingProductBuilder extends ProductRecommendationBuilder implements ProductsRecommendationBuilder<ProductsViewedAfterViewingProductRequest> {
    constructor(
        settings: Settings) {
        super(settings);
    }

    public build() {
        if (this.productAndVariantId === null) {
            throw new Error('Must specificy a product');
        }

        const request: ProductsViewedAfterViewingProductRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.ProductsViewedAfterViewingProductRequest, Relewise.Client',
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            productAndVariantId: this.productAndVariantId,
        };

        return { request, name: 'ProductsViewedAfterViewingProductRequest' };
    }
}
