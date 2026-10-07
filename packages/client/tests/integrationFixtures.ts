import { DataValueFactory } from '../src';

// Increment when fixture properties change so readiness also checks updated data.
export const fixtureRevisionKey = 'JavascriptSdkFixtureRevision';
export const fixtureRevision = DataValueFactory.string('persistent-v1');
export const fixtureData = { [fixtureRevisionKey]: fixtureRevision };

export const productFixtureNames = [
    '1', '2', '3', 'Object facet evaluation mode test product',
    'GetProductFacet test product', 'Cat Product #1', 'Cat Product #2', 'Cat Product #3',
];
export const contentFixtureNames = ['1', '2', '3', 'GetContentFacet test content'];
export const productCategoryFixtureNames = ['1', '2', '3', '4', 'GetProductCategoryFacet test category'];
