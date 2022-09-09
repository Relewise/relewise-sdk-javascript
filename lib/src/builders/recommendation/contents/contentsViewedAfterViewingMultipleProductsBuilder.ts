import { Settings } from '@/builders/settings';
import { ContentsViewedAfterViewingMultipleProductsRequest, ProductAndVariantId } from '@/models/data-contracts';
import { ProductsRecommendationBuilder } from '../products';
import { ContentSettingsRecommendationBuilder } from './contentSettingsRecommendationBuilder';

export class ContentsViewedAfterViewingMultipleProductsBuilder extends ContentSettingsRecommendationBuilder implements ProductsRecommendationBuilder<ContentsViewedAfterViewingMultipleProductsRequest> {
    private products: ProductAndVariantId[] = [];

    constructor(
        settings: Settings) {
        super(settings);
    }

    public addProduct(product: { productId: string; variantId?: string; }): this {
        this.products.push(product);

        return this;
    }

    public addProducts(products: { productId: string; variantId?: string; }[]): this {
        products.forEach(x => this.products.push(x));

        return this;
    }

    public build() {
        const request: ContentsViewedAfterViewingMultipleProductsRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            productAndVariantIds: this.products,
        };

        return { request, name: 'ContentsViewedAfterViewingMultipleProductsRequest' };
    }
}
