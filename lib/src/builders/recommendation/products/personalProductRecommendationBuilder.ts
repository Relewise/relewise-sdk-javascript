import { Settings } from '@/builders/settings';
import { PersonalProductRecommendationRequest } from '@/models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';

export class PersonalProductRecommendationBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<PersonalProductRecommendationRequest> {
    constructor(
        settings: Settings) {
        super(settings);
    }

    public build() {
        const request: PersonalProductRecommendationRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
        };

        return { request, name: 'PersonalProductRecommendationRequest' };
    }
}
