import { FilterBuilder } from '../../filterBuilder';
import { FeedComposition, Int32Range } from '../../../models/data-contracts';
import { RelevanceModifierBuilder } from '../../relevanceModifierBuilder';

export type FeedCompositionOptions = {
    type: 'Product' | 'Content';
    count: Int32Range;
    name?: string;
};

export class FeedCompositionBuilder {
    private composition: FeedComposition;

    constructor({ type, count, name }: FeedCompositionOptions) {
        this.composition = {
            includeEmptyResults: false,
            skipEntirelyIfUnableToMeetCount: false,
            rotationLimitPerRequest: null,
            type,
            count,
            name
        };
    }

    public includeEmptyResults(allow: boolean = true): this {
        this.composition.includeEmptyResults = allow;

        return this;
    }

    public rotationLimit(limit: number | null): this {
        this.composition.rotationLimit = limit;

        return this;
    }

    public name(name: string | null): this {
        this.composition.name = name;

        return this;
    }

    public count(count: Int32Range): this {
        this.composition.count = count;

        return this;
    }

    public rotationLimitPerRequest(limit: number | null): this {
        this.composition.rotationLimitPerRequest = limit;

        return this;
    }

    public skipEntirelyIfUnableToMeetCount(skip: boolean = true): this {
        this.composition.skipEntirelyIfUnableToMeetCount = skip;

        return this;
    }

    public fill(options: FeedCompositionOptions, fill: (fillBuilder: FeedCompositionBuilder) => void): this {
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
