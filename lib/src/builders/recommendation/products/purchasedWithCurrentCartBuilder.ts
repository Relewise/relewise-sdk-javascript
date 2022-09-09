import { Settings } from '@/builders/settings';
import { PurchasedWithCurrentCartRequest } from '@/models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';

export class PurchasedWithCurrentCartBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<PurchasedWithCurrentCartRequest> {
    constructor(
        settings: Settings) {
        super(settings);
    }

    public build() {
        const request: PurchasedWithCurrentCartRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
        };

        return { request, name: 'PurchasedWithCurrentCartRequest' };
    }
}
