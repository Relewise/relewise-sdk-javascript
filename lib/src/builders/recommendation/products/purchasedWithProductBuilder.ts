import { Settings } from '@/builders/settings';
import { PurchasedWithProductRequest } from '@/models/data-contracts';
import { ProductRecommendationBuilder } from './productRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';

export class PurchasedWithProductBuilder extends ProductRecommendationBuilder implements ProductsRecommendationBuilder<PurchasedWithProductRequest> {
    constructor(
        settings: Settings) {
        super(settings);
    }

    public build() {
        if (this.productAndVariantId === null) {
            throw new Error('Must specificy a product');
        }

        const request: PurchasedWithProductRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            productAndVariantId: this.productAndVariantId!,
            $type: 'Relewise.Client.Requests.Recommendations.PurchasedWithProductRequest, Relewise.Client',
        };

        return { request, name: 'PurchasedWithProductRequest' };
    }
}
