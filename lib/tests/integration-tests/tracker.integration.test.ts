import { Tracker, UserFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const tracker = new Tracker(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

test('Track Order', async() => {
    await expect(async() => await tracker.trackOrder({
        lineItems: [
            {
                lineTotal: 100,
                productId: '1',
                quantity: 1,
                variantId: 'v1',
            },
            {
                lineTotal: 100,
                productId: '2',
                quantity: 1,
                variantId: 'v1',
            }        ],
        subtotal: {
            amount: 100,
            currency: 'DKK', 
        },
        orderNumber: '',
        trackingNumber: '',
        user: UserFactory.anonymous(),
    })).not.toBeUndefined();
});

test('Track Cart', async() => {
    await expect(async() => await tracker.trackCart({
        lineItems: [
            {
                lineTotal: 100,
                productId: '1',
                quantity: 1,
                variantId: 'v1',
            },
            {
                lineTotal: 100,
                productId: '2',
                quantity: 1,
                variantId: 'v1',
            },
        ],
        subtotal: {
            amount: 100,
            currency: 'DKK', 
        },
        user: UserFactory.anonymous(),
    })).not.toBeUndefined();
});

test('Track Product View', async() => {
    await expect(async() => await tracker.trackProductView({
        productId: '1',
        user: UserFactory.anonymous(),
    })).not.toBeUndefined();
});

test('Track Product View', async() => {
    await expect(async() => await tracker.trackProductView({
        productId: '2',
        user: UserFactory.anonymous(),
    })).not.toBeUndefined();
});

test('Track Product Category View', async() => {
    await expect(async() => await tracker.trackProductCategoryView({
        idPath: ['c1'],
        user: UserFactory.anonymous(),
    })).not.toBeUndefined();
});

test('Track Content View', async() => {
    await expect(async() => await tracker.trackContentView({
        contentId: '1',
        user: UserFactory.anonymous(),
    })).not.toBeUndefined();
});

test('Track Content View', async() => {
    await expect(async() => await tracker.trackContentView({
        contentId: '2',
        user: UserFactory.anonymous(),
    })).not.toBeUndefined();
});

test('Track Content Category View', async() => {
    await expect(async() => await tracker.trackContentCategoryView({
        idPath: ['c1'],
        user: UserFactory.anonymous(),
    })).not.toBeUndefined();
});

test('Track Brand View', async() => {
    await expect(async() => await tracker.trackBrandView({
        brandId: 'b-1',
        user: UserFactory.anonymous(),
    })).not.toBeUndefined();
});

test('Track Search Term', async() => {
    await expect(async() => await tracker.trackSearchTerm({
        term: 'term',
        language: 'da-DK',
        user: UserFactory.anonymous(),
    })).not.toBeUndefined();
});