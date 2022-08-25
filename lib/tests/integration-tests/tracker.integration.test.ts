import { Tracker, UserFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { API_KEY, DATASET_ID, SERVER_URL } = process.env;

const tracker = new Tracker(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

test('Track Order', async() => {
    await expect(async() => await tracker.trackOrder({
        lineItems: [
            {
                lineTotal: 100,
                productId: 'p-1',
                quantity: 1,
                variantId: 'v1',
            },
        ],
        subtotal: {
            amount: 100,
            currency: 'DKK', 
        },
        trackingNumber: '',
        user: UserFactory.anonymous(),
    })).not.toThrow();
});

test('Track Cart', async() => {
    await expect(async() => await tracker.trackCart({
        lineItems: [
            {
                lineTotal: 100,
                productId: 'p-1',
                quantity: 1,
                variantId: 'v1',
            },
        ],
        subtotal: {
            amount: 100,
            currency: 'DKK', 
        },
        user: UserFactory.anonymous(),
    })).not.toThrow();
});

test('Track Product View', async() => {
    await expect(async() => await tracker.trackProductView({
        productId: 'p-1',
        user: UserFactory.anonymous(),
    })).not.toThrow();
});

test('Track Product Category View', async() => {
    await expect(async() => await tracker.trackProductCategoryView({
        idPath: ['c1'],
        user: UserFactory.anonymous(),
    })).not.toThrow();
});

test('Track Content View', async() => {
    await expect(async() => await tracker.trackContentView({
        contentId: 'p-1',
        user: UserFactory.anonymous(),
    })).not.toThrow();
});

test('Track Content Category View', async() => {
    await expect(async() => await tracker.trackContentCategoryView({
        idPath: ['c1'],
        user: UserFactory.anonymous(),
    })).not.toThrow();
});

test('Track Brand View', async() => {
    await expect(async() => await tracker.trackBrandView({
        brandId: 'b-1',
        user: UserFactory.anonymous(),
    })).not.toThrow();
});

test('Track Search Term', async() => {
    await expect(async() => await tracker.trackSearchTerm({
        term: 'term',
        language: 'da-DK',
        user: UserFactory.anonymous(),
    })).not.toThrow();
});