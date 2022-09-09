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
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            productAndVariantId: this.productAndVariantId,
            $type: 'Relewise.Client.Requests.Recommendations.ProductsViewedAfterViewingProductRequest, Relewise.Client',
        };

        return { request, name: 'ProductsViewedAfterViewingProductRequest' };
    }
}
