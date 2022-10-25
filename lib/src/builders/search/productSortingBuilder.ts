import { ProductAttributeSorting, ProductDataSorting, ProductPopularitySorting, ProductRelevanceSorting, ProductSortBySpecification, ProductVariantAttributeSorting, ProductVariantSpecificationSorting } from '../../models/data-contracts';

export class ProductSortingBuilder {
    private value:
        | ProductAttributeSorting
        | ProductDataSorting
        | ProductPopularitySorting
        | ProductRelevanceSorting
        | ProductVariantAttributeSorting
        | ProductVariantSpecificationSorting
        | null = null;

    public sortByProductData(key: string, order: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductSortingBuilder) => void, mode: 'Auto' | 'Alphabetical' | 'Numerical' = 'Auto') {
        const sort: ProductDataSorting = {
            $type: 'Relewise.Client.DataTypes.Search.Sorting.Product.ProductDataSorting, Relewise.Client',
            dataSelectionStrategy: 'Product',
            mode,
            order,
            key,
            thenBy: this.thenBy(thenBy)?.value,
        }

        this.value = sort;
    }

    public sortByProductRelevance(order: 'Ascending' | 'Descending' = 'Descending', thenBy?: (thenBy: ProductSortingBuilder) => void) {
        const sort: ProductRelevanceSorting = {
            $type: 'Relewise.Client.DataTypes.Search.Sorting.Product.ProductRelevanceSorting, Relewise.Client',
            order,
            thenBy: this.thenBy(thenBy)?.value,
        }

        this.value = sort;
    }

    public sortByProductPopularity(order: 'Ascending' | 'Descending' = 'Descending', thenBy?: (thenBy: ProductSortingBuilder) => void) {
        const sort: ProductPopularitySorting = {
            $type: 'Relewise.Client.DataTypes.Search.Sorting.Product.ProductPopularitySorting, Relewise.Client',
            order,
            thenBy: this.thenBy(thenBy)?.value,
        }

        this.value = sort;
    }

    public sortByProductAttribute(
        attribute: 'Id' | 'DisplayName' | 'BrandId' | 'BrandName' | 'ListPrice' | 'SalesPrice', 
        order: 'Ascending' | 'Descending', 
        thenBy?: (thenBy: ProductSortingBuilder) => void,
        mode: 'Auto' | 'Alphabetical' | 'Numerical' = 'Auto' ) {

        const sort: ProductAttributeSorting = {
            $type: 'Relewise.Client.DataTypes.Search.Sorting.Product.ProductAttributeSorting, Relewise.Client',
            attribute,
            mode,
            order,
            thenBy: this.thenBy(thenBy)?.value,
        }

        this.value = sort;
    }

    public sortByProductVariantAttribute(
        attribute: 'Id' | 'DisplayName' | 'ListPrice' | 'SalesPrice', 
        order: 'Ascending' | 'Descending', 
        thenBy?: (thenBy: ProductSortingBuilder) => void, 
        mode: 'Auto' | 'Alphabetical' | 'Numerical' = 'Auto') {

        const sort: ProductVariantAttributeSorting = {
            $type: 'Relewise.Client.DataTypes.Search.Sorting.Product.ProductVariantAttributeSorting, Relewise.Client',
            attribute,
            mode,
            order,
            thenBy: this.thenBy(thenBy)?.value,
        }

        this.value = sort;
    }

    public sortByProductVariantSpecification(key: string, order: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductSortingBuilder) => void, mode: 'Auto' | 'Alphabetical' | 'Numerical' = 'Auto') {
        const sort: ProductVariantSpecificationSorting = {
            $type: 'Relewise.Client.DataTypes.Search.Sorting.Product.ProductVariantSpecificationSorting, Relewise.Client',
            key,
            mode,
            order,
            thenBy: this.thenBy(thenBy)?.value,
        }

        this.value = sort;
    }

    private thenBy(thenBy: ((thenBy: ProductSortingBuilder) => void) | undefined) {
        const thenByBuilder = new ProductSortingBuilder();
        if (thenBy) {
            thenBy(thenByBuilder);
            thenByBuilder.build();
        }
        return thenByBuilder;
    }

    public build(): ProductSortBySpecification | null {
        return this.value == null 
            ? null
            : { value: this.value };
    }
}
