import { Settings } from '@/builders/settings';
import { SimilarProductsRequest, SimilarProductsEvaluationSettings, Product, ProductRecommendationRequestSettings } from '@/models/data-contracts';
import { ProductRecommendationBuilder } from './productRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';

export class SimilarProductsProductBuilder extends ProductRecommendationBuilder implements ProductsRecommendationBuilder<SimilarProductsRequest> {
    private evaluationSettings: SimilarProductsEvaluationSettings | null = null;
    private considerAlreadyKnownInformationAboutProduct: boolean = false;
    private productData: Product | null = null;

    constructor(
        settings: Settings) {
        super(settings);
    }

    public setSimilarProductsEvaluationSettings(settings: SimilarProductsEvaluationSettings): this {
        this.evaluationSettings = settings;

        return this;
    }

    public build() {
        const request: SimilarProductsRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            existingProductId: this.productAndVariantId,
            considerAlreadyKnownInformationAboutProduct: this.considerAlreadyKnownInformationAboutProduct,
            productData: this.productData,
            evaluationSettings: this.evaluationSettings,
        };

        return { request, name: 'SimilarProductsRequest' };
    }
}
