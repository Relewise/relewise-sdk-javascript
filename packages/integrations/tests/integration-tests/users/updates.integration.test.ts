import { expect, test } from '@jest/globals';
import { DataAccessor, UserQueryBuilder } from '../../../src';
import { DataValueFactory, MultiCurrency, Multilingual, MultilingualDataValue, Tracker, UserFactory } from '@relewise/client';
import { randomUUID } from 'crypto';
const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const dataAccessor = new DataAccessor(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });
const tracker = new Tracker(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

test('Query Users when no user found', async() => {
    const randomId = randomUUID();

    const query = new UserQueryBuilder()
        .criteria(c => c.byAuthenticatedId(randomId))
        .build();
    
    const result = await dataAccessor.queryUsers(query);

    expect(result?.results).toBeDefined();
    expect(result?.results).toHaveLength(1);
    expect(result?.results![0]).toHaveLength(0);
});

test('Query Users when user found by authenticated id', async() => {
    const authenticatedId = "some authenticated id";

    await tracker.trackProductView({ productId: "SomeProduct", user: UserFactory.byAuthenticatedId(authenticatedId)});

    const query = new UserQueryBuilder()
        .criteria(c => c.byAuthenticatedId(authenticatedId))
        .build();
    
    const result = await dataAccessor.queryUsers(query);

    expect(result?.results).toBeDefined();
    expect(result?.results).toHaveLength(1);
    expect(result?.results![0]).toHaveLength(1);
    expect(result?.results![0][0].authenticatedId).toBe(authenticatedId);
});

test('Query Users when user found by temporary id', async() => {
    const temporaryId = "some temporary id";

    await tracker.trackProductView({ productId: "SomeProduct", user: UserFactory.byTemporaryId(temporaryId)});

    const query = new UserQueryBuilder()
        .criteria(c => c.beTemporaryId(temporaryId))
        .build();
    
    const result = await dataAccessor.queryUsers(query);

    expect(result?.results).toBeDefined();
    expect(result?.results).toHaveLength(1);
    expect(result?.results![0]).toHaveLength(1);
    expect(result?.results![0][0].temporaryId).toBe(temporaryId);
});

test('Query Users when user found by email', async() => {
    const email = "some@email.com";

    await tracker.trackProductView({ productId: "SomeProduct", user: UserFactory.byEmail(email)});

    const query = new UserQueryBuilder()
        .criteria(c => c.byEmail(email))
        .build();
    
    const result = await dataAccessor.queryUsers(query);

    expect(result?.results).toBeDefined();
    expect(result?.results).toHaveLength(1);
    expect(result?.results![0]).toHaveLength(1);
    expect(result?.results![0][0].email).toBe(email);
});

test('Query Users when user found by identifier', async() => {
    const key = "SomeKey";
    const value = "SomeValue";

    await tracker.trackProductView({ productId: "SomeProduct", user: UserFactory.byIdentifier(key, value)});

    const query = new UserQueryBuilder()
        .criteria(c => c.byIdentifier(key, value))
        .build();
    
    const result = await dataAccessor.queryUsers(query);

    expect(result?.results).toBeDefined();
    expect(result?.results).toHaveLength(1);
    expect(result?.results![0]).toHaveLength(1);
    expect(result?.results![0][0].identifiers).toBeDefined();
    
    // The API always to lower cases indentifer keys
    expect(result?.results![0][0].identifiers![key.toLowerCase()]).toBe(value);
});

test('Query Users when user found by identifier', async() => {
    const key = "SomeKey";
    const value = "SomeValue";

    const key2 = "SomeKey2";
    const value2 = "SomeValue2";

    await tracker.trackProductView({ productId: "SomeProduct", user: UserFactory.byIdentifiers({ [key]: value, [key2]: value2 })});

    const query = new UserQueryBuilder()
        .criteria(c => c.byIdentifiers({ [key]: value, [key2]: value2 }))
        .build();
    
    const result = await dataAccessor.queryUsers(query);

    expect(result?.results).toBeDefined();
    expect(result?.results).toHaveLength(1);
    expect(result?.results![0]).toHaveLength(1);
    expect(result?.results![0][0].identifiers).toBeDefined();
    
    // The API always to lower cases indentifer keys
    expect(result?.results![0][0].identifiers![key.toLowerCase()]).toBe(value);
    expect(result?.results![0][0].identifiers![key2.toLowerCase()]).toBe(value2);
});

test('Query Users when user found by authenticated id', async() => {
    const authenticatedId = "some authenticated id";
    const temporaryId = "some temporary id";

    await tracker.trackProductView({ productId: "SomeProduct", user: UserFactory.byAuthenticatedId(authenticatedId)});
    await tracker.trackProductView({ productId: "SomeProduct", user: UserFactory.byTemporaryId(temporaryId)});

    const query = new UserQueryBuilder()
        .criteria(c => c.byAuthenticatedId(authenticatedId))
        .criteria(c => c.beTemporaryId(temporaryId))
        .build();
    
    const result = await dataAccessor.queryUsers(query);

    expect(result?.results).toBeDefined();
    expect(result?.results).toHaveLength(2);
    expect(result?.results![0]).toHaveLength(1);
    expect(result?.results![0][0].authenticatedId).toBe(authenticatedId);
    expect(result?.results![1]).toHaveLength(1);
    expect(result?.results![1][0].temporaryId).toBe(temporaryId);
});

test('Query Users when no language or currency provided', async() => {
    const authenticatedId = "some authenticated id";

    const user = UserFactory.byAuthenticatedId(authenticatedId);

    const multilingualKey = "multilingual";
    const multiCurrencyKey = "multiCurrency";

    user.data = {};
    user.data[multilingualKey] = DataValueFactory.multilingual([{ language: "da", value: "123" }, { language: "en", value: "456" }]);
    user.data[multiCurrencyKey] = DataValueFactory.multiCurrency([{ currency: "DKK", amount: 123 }, { currency: "EUR", amount: 123 }]);

    await tracker.trackProductView({ productId: "SomeProduct", user: user});

    const query = new UserQueryBuilder()
        .criteria(c => c.byAuthenticatedId(authenticatedId))
        .build();
    
    const result = await dataAccessor.queryUsers(query);

    expect(result?.results).toBeDefined();
    expect(result?.results).toHaveLength(1);
    expect(result?.results![0]).toHaveLength(1);
    expect((result?.results![0][0].data![multilingualKey].value as Multilingual).values).toHaveLength(2)
    expect((result?.results![0][0].data![multiCurrencyKey].value as MultiCurrency).values).toHaveLength(2)
});

test('Query Users when a language is provided', async() => {
    const authenticatedId = "some authenticated id";

    const user = UserFactory.byAuthenticatedId(authenticatedId);

    const multilingualKey = "multilingual";

    const da = "da";
    const en = "en";

    user.data = {};
    user.data[multilingualKey] = DataValueFactory.multilingual([{ language: da, value: "123" }, { language: en, value: "456" }]);

    await tracker.trackProductView({ productId: "SomeProduct", user: user});

    const query = new UserQueryBuilder()
        .criteria(c => c.byAuthenticatedId(authenticatedId))
        .language(da)
        .build();
    
    const result = await dataAccessor.queryUsers(query);

    expect(result?.results).toBeDefined();
    expect(result?.results).toHaveLength(1);
    expect(result?.results![0]).toHaveLength(1);
    expect((result?.results![0][0].data![multilingualKey].value as Multilingual).values).toHaveLength(1)
    expect((result?.results![0][0].data![multilingualKey].value as Multilingual).values![0].language.value).toBe(da)
});