import { FilterBuilder } from 'src/builders/filterBuilder';
import { FeedComposition, Int32Range } from '../../../models/data-contracts';
import { RelevanceModifierBuilder } from 'src/builders/relevanceModifierBuilder';

export class FeedCompositionBuilder {
    private composition: FeedComposition;

    constructor({ type, count }: { type: 'Product' | 'Content', count: Int32Range }) {
        this.composition = {
            includeEmptyResults: false,
            type,
            count,
        };
    }

    public includeEmptyResults(allow: boolean = true): this {
        this.composition.includeEmptyResults = allow;

        return this;
    }

    public rotationLimit(limit: number): this {
        this.composition.rotationLimit = limit;

        return this;
    }

    public fill(options: { type: 'Product' | 'Content', count: Int32Range }, fill: (fillBuilder: FeedCompositionBuilder) => void): this {
        const builder = new FeedCompositionBuilder(options);
        fill(builder);
        this.composition.fill = builder.build();

        return this;
    }

    public filters(filterBuilder: (builder: FilterBuilder) => void): this {
        const builder = new FilterBuilder();
        filterBuilder(builder);

        this.composition.filters = builder.build();

        return this;
    }

    public relevanceModifiers(relevanceModifiersBuilder: (builder: RelevanceModifierBuilder) => void): this {
        const builder = new RelevanceModifierBuilder();
        relevanceModifiersBuilder(builder);

        this.composition.relevanceModifiers = builder.build();

        return this;
    }

    public build() {
        return this.composition;
    }
}
