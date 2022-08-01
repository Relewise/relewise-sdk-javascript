import { UserFactory } from "@relewise/relewise-client";

test('Anonymous', () => {
    const user = UserFactory.Anonymous();
    expect(Object.keys(user).length === 0).toBe(true);
});

test('ByAuthenticatedId', () => {
    const user = UserFactory.ByAuthenticatedId("1234");
    expect(user.authenticatedId).toBeDefined();
});

test('ByTemporaryId', () => {
    const user = UserFactory.ByTemporaryId("1234");
    expect(user.temporaryId).toBeDefined();
});

test('ByIdentifier', () => {
    const user = UserFactory.ByIdentifier("foo", "bar");
    expect(user.identifiers).toBeDefined();
    expect(user.identifiers!['foo']).toBe("bar");
});

test('ByIdentifiers', () => {
    const user = UserFactory.ByIdentifiers({ foo: 'bar' });
    expect(user.identifiers).toBeDefined();
    expect(user.identifiers!['foo']).toBe("bar");
});

test('ByEmail', () => {
    const user = UserFactory.ByEmail("foo@bar.com");
    expect(user.email).toBeDefined();
});