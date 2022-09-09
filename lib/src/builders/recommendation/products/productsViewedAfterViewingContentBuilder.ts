import { Settings } from '@/builders/settings';
import { ProductsViewedAfterViewingContentRequest } from '@/models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';

export class ProductsViewedAfterViewingContentBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<ProductsViewedAfterViewingContentRequest> {
    private id: string = '';

    constructor(
        settings: Settings) {
        super(settings);
    }

    setContentId(contentId: string): this {
        this.id = contentId;

        return this;
    }

    public build() {
        const request: ProductsViewedAfterViewingContentRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            contentId: this.id,
        };

        return { request, name: 'ProductsViewedAfterViewingContentRequest' };
    }
}
