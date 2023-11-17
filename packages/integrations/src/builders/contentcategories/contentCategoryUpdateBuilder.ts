import { DataValue, ContentCategoryUpdate, ContentCategory } from '@relewise/client';
import { CategoryPathBuilder } from '../categoryPathBuilder';

export class ContentCategoryUpdateBuilder {
    private contentCategory: ContentCategory;
    private kind: 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace';

    constructor({ id, kind }: {
        id: string,
        kind: 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace'
    }) {
        this.contentCategory = { 
            $type: 'Relewise.Client.DataTypes.ContentCategory, Relewise.Client',
            id: id,
        };
        this.kind = kind;
    }

    displayName(values: {
        value: string;
        language: string;
    }[]): this {
        this.contentCategory.displayName = {
            values: values.map(x => ({ text: x.value, language: { value: x.language } })),
        };

        return this;
    }

    data(data: Record<string, DataValue | null>): this {
        this.contentCategory.data = data as Record<string, DataValue>; // TODO remove dirty hack

        return this;
    }

    /**
     * Add multiple category paths to a content category. Start from the root to the lowest child. Example: Tools -> Outdoor -> Shovel
     * @param paths 
     * @returns 
     */
    categoryPaths(builder: (b: CategoryPathBuilder) => void): this {
        const b = new CategoryPathBuilder();
        builder(b);
        this.contentCategory.categoryPaths = b.build();
        
        return this;
    }

    assortments(assortments: number[]): this {
        this.contentCategory.assortments = assortments;

        return this;
    }

    build(): ContentCategoryUpdate {
        return {
            $type: 'Relewise.Client.DataTypes.ContentCategoryUpdate, Relewise.Client',
            category: this.contentCategory,
            kind: this.kind,
        };
    }
}