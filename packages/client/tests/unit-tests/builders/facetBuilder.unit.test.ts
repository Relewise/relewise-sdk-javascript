import { test, expect } from '@jest/globals'
import { FacetBuilder } from '../../../src/builders/search';
import { BrandFacet, CategoryFacet, ProductFacetQuery } from '../../../src/models/data-contracts';

function baseBuilder() {
    return new FacetBuilder();
};

test('empty', () => {
    const subject: ProductFacetQuery | null = baseBuilder()
        .build();

    expect(subject).toBe(null);
});

test('brand', () => {
    const subject: ProductFacetQuery | null = baseBuilder()
        .addBrandFacet()
        .build();

    expect(subject?.items).toHaveLength(1);
});

test('brand has selected value', () => {
    const subject: ProductFacetQuery | null = baseBuilder()
        .addBrandFacet(['HP'])
        .build();

    expect(subject?.items).toHaveLength(1);
    const brandFacet = subject!.items![0] as BrandFacet;
    expect(brandFacet.selected).toEqual(['HP'])
});

test('brand to be added as facet and to have its value set', () => {
    const builder: FacetBuilder = baseBuilder();
    builder.addBrandFacet();
    builder.addBrandFacet(['HP']);

    const subject: ProductFacetQuery | null = builder.build();

    expect(subject?.items).toHaveLength(2);
    const brandFacet = subject!.items![0] as BrandFacet;
    expect(brandFacet.selected).toBe(null);
});

test('clear', () => {
    const builder: FacetBuilder = baseBuilder();
    builder.addBrandFacet(['HP']);

    builder.clear();

    const subject: ProductFacetQuery | null = builder.build();

    expect(subject).toBe(null);
});

test('brand includes property settings alongside facet settings', () => {
    const properties = { displayName: true, dataKeys: ['Logo'] };
    const subject = baseBuilder()
        .addBrandFacet(['HP'], settings => settings.take(5).sortByHits(), properties)
        .build();

    const facet = subject!.items![0] as BrandFacet;
    expect(facet.selected).toEqual(['HP']);
    expect(facet.selectedPropertiesSettings).toEqual(properties);
    expect(facet.settings?.take).toBe(5);
    expect(facet.settings?.sorting?.$type).toBe('Relewise.Client.DataTypes.Search.Facets.Sorting.ByHitsFacetSorting, Relewise.Client');
});

test('brand still accepts facet settings objects without property settings', () => {
    const settings = { alwaysIncludeSelectedInAvailable: true, includeZeroHitsInAvailable: false };
    const subject = baseBuilder().addBrandFacet(['HP'], settings).build();
    const facet = subject!.items![0] as BrandFacet;

    expect(facet.settings).toEqual(settings);
    expect(facet.selectedPropertiesSettings).toBeUndefined();
});

test.each(['Product', 'Content'] as const)('%s category populates its property settings discriminator internally', entity => {
    const properties = { displayName: true, dataKeys: ['Image'] };
    const builder = baseBuilder();
    if (entity === 'Product') {
        builder.addProductCategoryFacet('Descendants', ['category-1'], properties, settings => settings.take(3));
    } else {
        builder.addContentCategoryFacet('Descendants', ['category-1'], properties, settings => settings.take(3));
    }

    const facet = builder.build()!.items![0] as CategoryFacet;
    expect(facet).toMatchObject({
        $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.CategoryFacet, Relewise.Client',
        field: 'Category',
        categorySelectionStrategy: 'Descendants',
        selected: ['category-1'],
        settings: { take: 3 },
        selectedPropertiesSettings: {
            $type: `Relewise.Client.Requests.Shared.Selected${entity}CategoryPropertiesSettings, Relewise.Client`,
            ...properties,
        },
    });
    expect(properties).toEqual({ displayName: true, dataKeys: ['Image'] });
});

test.each(['Product', 'Content'] as const)('%s category accepts property settings without facet settings', entity => {
    const properties = { allData: true };
    const builder = baseBuilder();
    if (entity === 'Product') {
        builder.addProductCategoryFacet('Ancestors', null, properties);
    } else {
        builder.addContentCategoryFacet('Ancestors', null, properties);
    }
    const facet = builder.build()!.items![0] as CategoryFacet;

    expect(facet.selected).toBeNull();
    expect(facet.settings).toBeUndefined();
    expect(facet.selectedPropertiesSettings).toEqual({
        ...properties,
        $type: `Relewise.Client.Requests.Shared.Selected${entity}CategoryPropertiesSettings, Relewise.Client`,
    });
});

test.each(['Product', 'Content'] as const)('%s category omits unrequested property settings', entity => {
    const settings = { alwaysIncludeSelectedInAvailable: false, includeZeroHitsInAvailable: true };
    const builder = baseBuilder();
    if (entity === 'Product') {
        builder.addProductCategoryFacet('Ancestors', null, undefined, settings);
    } else {
        builder.addContentCategoryFacet('Ancestors', null, undefined, settings);
    }
    const facet = builder.build()!.items![0] as CategoryFacet;

    expect(facet.selectedPropertiesSettings).toBeUndefined();
    expect(facet.settings).toEqual(settings);
});

test('category still accepts facet settings objects without property settings', () => {
    const settings = { alwaysIncludeSelectedInAvailable: false, includeZeroHitsInAvailable: true };
    const subject = baseBuilder().addCategoryFacet('Ancestors', null, settings).build();
    const facet = subject!.items![0] as CategoryFacet;

    expect(facet.selected).toBeNull();
    expect(facet.selectedPropertiesSettings).toBeUndefined();
    expect(facet.settings).toEqual(settings);
});

test('category preserves its facet settings callback argument', () => {
    const subject = baseBuilder()
        .addCategoryFacet('ImmediateParent', ['category-1'], settings => settings.take(2))
        .build();
    const facet = subject!.items![0] as CategoryFacet;

    expect(facet.selected).toEqual(['category-1']);
    expect(facet.settings?.take).toBe(2);
    expect(facet.selectedPropertiesSettings).toBeUndefined();
});
