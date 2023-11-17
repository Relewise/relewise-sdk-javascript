import { DataValue,Content, ContentUpdate } from '@relewise/client';
import { CategoryPathBuilder } from '../categoryPathBuilder';

export class ContentUpdateBuilder {
    private content: Content;
    private updateKind: 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace';

    constructor({ id, updateKind }: {
        id: string,
        updateKind: 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace',
    }) {
        this.content = { id: id };
        this.updateKind = updateKind;
    }

    displayName(values: {
        value: string;
        language: string;
    }[]): this {
        this.content.displayName = {
            values: values.map(x => ({ text: x.value, language: { value: x.language } })),
        };

        return this;
    }

    data(data: Record<string, DataValue | null>): this {
        this.content.data = data as Record<string, DataValue>; // TODO remove dirty hack

        return this;
    }

    /**
     * Add multiple category paths to a content. Start from the root to the lowest child. Example: Tools -> Outdoor -> Shovel
     * @param paths 
     * @returns 
     */
    categoryPaths(builder: (b: CategoryPathBuilder) => void): this {
        const b = new CategoryPathBuilder();
        builder(b);
        this.content.categoryPaths = b.build();
        
        return this;
    }

    assortments(assortments: number[]): this {
        this.content.assortments = assortments;

        return this;
    }


    build(): ContentUpdate {
        return {
            $type: 'Relewise.Client.DataTypes.ContentUpdate, Relewise.Client',
            content: this.content,
            kind: this.updateKind,
        };
    }
}