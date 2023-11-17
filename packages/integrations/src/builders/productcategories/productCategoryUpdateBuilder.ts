import { DataValue, ProductCategoryUpdate, ProductCategory } from '@relewise/client';
import { CategoryPathBuilder } from '../categoryPathBuilder';

export class ProductCategoryUpdateBuilder {
    private productCategory: ProductCategory;
    private kind: 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace';

    constructor({ id, kind }: {
        id: string,
        kind: 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace'
    }) {
        this.productCategory = { 
            $type: 'Relewise.Client.DataTypes.ProductCategory, Relewise.Client',
            id: id,
        };
        this.kind = kind;
    }

    displayName(values: {
        value: string;
        language: string;
    }[]): this {
        this.productCategory.displayName = {
            values: values.map(x => ({ text: x.value, language: { value: x.language } })),
        };

        return this;
    }

    data(data: Record<string, DataValue | null>): this {
        this.productCategory.data = data as Record<string, DataValue>; // TODO remove dirty hack

        return this;
    }

    /**
     * Add multiple category paths to a product category. Start from the root to the lowest child. Example: Tools -> Outdoor -> Shovel
     * @param paths 
     * @returns 
     */
    categoryPaths(builder: (b: CategoryPathBuilder) => void): this {
        const b = new CategoryPathBuilder();
        builder(b);
        this.productCategory.categoryPaths = b.build();
        
        return this;
    }

    assortments(assortments: number[]): this {
        this.productCategory.assortments = assortments;

        return this;
    }

    build(): ProductCategoryUpdate {
        return {
            $type: 'Relewise.Client.DataTypes.ProductCategoryUpdate, Relewise.Client',
            category: this.productCategory,
            kind: this.kind,
        };
    }
}