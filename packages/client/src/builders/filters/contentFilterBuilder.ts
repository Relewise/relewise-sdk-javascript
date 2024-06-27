import { ContentAssortmentFilter, ContentCategoryAssortmentFilter, ContentCategoryHasAncestorFilter, ContentCategoryHasChildFilter, ContentCategoryHasContentsFilter, ContentCategoryHasParentFilter, ContentCategoryIdFilter, ContentCategoryLevelFilter, ContentCategoryDataFilter, ContentDataFilter, ContentIdFilter } from 'src/models/data-contracts';
import { ConditionBuilder } from '../conditionBuilder';
import { EntityDataFilterOptions, FilterOptions } from './filters.types.shared';
import { FilterSettingsBuilder } from '../filterSettingsBuilder';
import { FilterBuilderBase } from './filterBuilderBase';

export class ContentFilterBuilder extends FilterBuilderBase<ContentFilterBuilder> {
    constructor() { super(ContentFilterBuilder); }

    /**
     * Adds a content assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addContentAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        const assortments: number[] = Array.isArray(assortmentIds)
            ? assortmentIds
            : [assortmentIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentAssortmentFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentAssortmentFilter, Relewise.Client',
            assortments: assortments,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content category assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addContentCategoryAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        const assortments: number[] = Array.isArray(assortmentIds)
            ? assortmentIds
            : [assortmentIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryAssortmentFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryAssortmentFilter, Relewise.Client',
            assortments: assortments,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return contents within the specificed categories
     * @param evaluationScope 
     * @param categoryIds 
     * @param negated 
     */
    public addContentCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated: boolean = false, options?: FilterOptions): this {
        const ids: string[] = Array.isArray(categoryIds)
            ? categoryIds
            : [categoryIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryIdFilter, Relewise.Client',
            evaluationScope: evaluationScope,
            categoryIds: ids,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return the specificied contents
     * @param contentIds 
     * @param negated 
     */
    public addContentIdFilter(contentIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const ids: string[] = Array.isArray(contentIds)
            ? contentIds
            : [contentIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentIdFilter, Relewise.Client',
            contentIds: ids,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
    * Adds a content category level filter to the request
    * @param levels 
    * @param negated 
    */
    public addContentCategoryLevelFilter(levels: number | number[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryLevelFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryLevelFilter, Relewise.Client',
            levels: Array.isArray(levels) ? levels : [levels],
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
    * Adds a content category has parent filter to the request
    * @param categoryIds 
    * @param negated 
    */
    public addContentCategoryHasParentFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryHasParentFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryHasParentFilter, Relewise.Client',
            categoryIds: categoryIds ? (Array.isArray(categoryIds) ? categoryIds : [categoryIds]) : undefined,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
    * Adds a content category has child filter to the request
    * @param categoryIds 
    * @param negated 
    */
    public addContentCategoryHasChildFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryHasChildFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryHasChildFilter, Relewise.Client',
            categoryIds: categoryIds ? (Array.isArray(categoryIds) ? categoryIds : [categoryIds]) : undefined,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
    * Adds a content category has ancestor filter to the request
    * @param categoryIds 
    * @param negated 
    */
    public addContentCategoryHasAncestorFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryHasAncestorFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryHasAncestorFilter, Relewise.Client',
            categoryIds: categoryIds ? (Array.isArray(categoryIds) ? categoryIds : [categoryIds]) : undefined,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
    * Adds a content category has contents filter to the request ensuring that only categories with content in them are returned
    * @param categoryIds 
    * @param negated 
    */
    public addContentCategoryHasContentsFilter(negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryHasContentsFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryHasContentsFilter, Relewise.Client',
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a cart data filter to the request
     * @param key 
     * @param conditionBuilder 
     * @param mustMatchAllConditions 
     * @param filterOutIfKeyIsNotFound 
     * @param negated 
     */
    public addContentCategoryDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
            objectPath: options?.objectPath,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content data filter to the request
     * @param key 
     * @param conditionBuilder 
     * @param mustMatchAllConditions 
     * @param filterOutIfKeyIsNotFound 
     * @param negated 
     */
    public addContentDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
            objectPath: options?.objectPath,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }
}
