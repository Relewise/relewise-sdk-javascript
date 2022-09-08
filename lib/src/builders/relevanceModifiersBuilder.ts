import { BrandIdRelevanceModifier, ConditionBuilder, FilterBuilder, ProductAssortmentRelevanceModifier, ProductCategoryIdRelevanceModifier, ProductDataRelevanceModifier, ProductIdRelevanceModifier, ProductListPriceRelevanceModifier, ProductRecentlyPurchasedByUserRelevanceModifier, ProductRecentlyViewedByUserRelevanceModifier, ProductSalesPriceRelevanceModifier, RelevanceModifierCollection, UserFavoriteProductRelevanceModifier, VariantAssortmentRelevanceModifier, VariantDataRelevanceModifier, VariantListPriceRelevanceModifier, VariantSalesPriceRelevanceModifier, VariantSpecificationsInCommonRelevanceModifier, VariantSpecificationValueRelevanceModifier } from '..';

export class RelevanceModifiersBuilder {
    private modifiers: (
        | BrandIdRelevanceModifier
        | ProductAssortmentRelevanceModifier
        | ProductCategoryIdRelevanceModifier
        | ProductDataRelevanceModifier
        | ProductIdRelevanceModifier
        | ProductListPriceRelevanceModifier
        | ProductRecentlyPurchasedByUserRelevanceModifier
        | ProductRecentlyViewedByUserRelevanceModifier
        | ProductSalesPriceRelevanceModifier
        | UserFavoriteProductRelevanceModifier
        | VariantAssortmentRelevanceModifier
        | VariantDataRelevanceModifier
        | VariantListPriceRelevanceModifier
        | VariantSalesPriceRelevanceModifier
        | VariantSpecificationsInCommonRelevanceModifier
        | VariantSpecificationValueRelevanceModifier
    )[] = [];

    public addBrandIdRelevanceModifier(
        brandId: string,
        ifProductIsBrandMultiplyWeightBy: number = 1,
        ifProductIsNotBrandMultiplyWeightBy: number = 1,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: BrandIdRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.BrandIdRelevanceModifier, Relewise.Client',
            ifProductIsBrandMultiplyWeightBy: ifProductIsBrandMultiplyWeightBy,
            ifProductIsNotBrandMultiplyWeightBy: ifProductIsNotBrandMultiplyWeightBy,
            brandId: brandId,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductAssortmentRelevanceModifier(
        assortments: number[],
        multiplyWeightBy: number = 1,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductAssortmentRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductAssortmentRelevanceModifier, Relewise.Client',
            assortments: assortments,
            multiplyWeightBy: multiplyWeightBy,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductCategoryIdRelevanceModifier(
        categoryId: string,
        evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor',
        multiplyWeightBy: number = 1,
        negated: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductCategoryIdRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductCategoryIdRelevanceModifier, Relewise.Client',
            categoryId: categoryId,
            evaluationScope: evaluationScope,
            negated: negated,
            multiplyWeightBy: multiplyWeightBy,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductDataRelevanceModifier(
        key: string,
        conditions: (builder: ConditionBuilder) => void,
        multiplierSelector: number = 1,
        mustMatchAllConditions: boolean = true,
        considerAsMatchIfKeyIsNotFound: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const conditionBuilder = new ConditionBuilder();
        conditions(conditionBuilder);

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductDataRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductDataRelevanceModifier, Relewise.Client',
            key: key,
            considerAsMatchIfKeyIsNotFound: considerAsMatchIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: conditionBuilder.build()?.items,
            multiplierSelector: multiplierSelector,
            multiplyWeightBy: 0,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductIdRelevanceModifier(
        productIds: string[],
        multiplyWeightBy: number = 1,
        negated: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductIdRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductIdRelevanceModifier, Relewise.Client',
            productIds: productIds,
            negated: negated,
            multiplyWeightBy: multiplyWeightBy,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductListPriceRelevanceModifier(
        currency: string,
        lowerBound: number | null | undefined,
        upperBound: number | null | undefined,
        multiplyWeightBy: number = 1,
        negated: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductListPriceRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductListPriceRelevanceModifier, Relewise.Client',
            range: { lowerBoundInclusive: lowerBound, upperBoundInclusive: upperBound },
            currency: { value: currency },
            negated: negated,
            multiplyWeightBy: multiplyWeightBy,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public build(): RelevanceModifierCollection | null {

        return this.modifiers.length === 0
            ? null
            : { items: this.modifiers };
    }
}
