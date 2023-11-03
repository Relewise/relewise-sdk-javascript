import { UserFactory } from '../../../../src/factory';
import { ProductSearchBuilder } from '../../../../src/builders/search';
import { test, expect } from '@jest/globals'
import { ProductSearchRequest } from '../../../../src/models/data-contracts';

function baseBuilder() {
    return new ProductSearchBuilder({
        language: 'da-DK',
        currency: 'DKK',
        displayedAtLocation: 'search page',
        user: UserFactory.anonymous(),
    });
};

test('setTerm', () => {
    const expectedTerm = 'shoe';

    const subject: ProductSearchRequest = baseBuilder()
        .setTerm(expectedTerm)
        .build();

    expect(subject.term).toBe(expectedTerm);
});

test('reset Term', () => {
    const expectedTerm = null;

    const subject: ProductSearchRequest = baseBuilder()
        .setTerm('test')
        .setTerm(expectedTerm)
        .build();

    expect(subject.term).toBe(expectedTerm);
});

test('explodedVariants', () => {
    const subject: ProductSearchRequest = baseBuilder()
        .setExplodedVariants(1)
        .build();

    expect(subject.settings?.explodedVariants).toBe(1);
});

test('productProperties', () => {
    const subject: ProductSearchRequest = baseBuilder()
        .setSelectedProductProperties({
            displayName: true,
            categoryPaths: true,
            assortments: true,
            pricing: true,
            allData: true,
            viewedByUserInfo: true,
            purchasedByUserInfo: true,
            brand: true,
            allVariants: true,
        })
        .build();

    expect(subject.settings?.selectedProductProperties?.allData).toBe(true);
});

test('variantProperties', () => {
    const subject: ProductSearchRequest = baseBuilder()
        .setSelectedVariantProperties({
            displayName: true,
            assortments: true,
            pricing: true,
            allData: true,
            allSpecifications: true,
        })
        .build();

    expect(subject.settings?.selectedVariantProperties?.allSpecifications).toBe(true);
});

test('brandProperties', () => {
    const subject: ProductSearchRequest = baseBuilder()
        .setSelectedBrandProperties({
            displayName: true,
            assortments: true,
            allData: true,
            viewedByUserInfo: true,
        })
        .build();

    expect(subject.settings?.selectedBrandProperties?.displayName).toBe(true);
});

test('variantSearchSettings', () => {
    const subject: ProductSearchRequest = baseBuilder()
        .setVariantSearchSettings({
            excludeResultsWithoutVariant: true,
        })
        .build();

    expect(subject.settings?.variantSettings?.excludeResultsWithoutVariant).toBe(true);
});