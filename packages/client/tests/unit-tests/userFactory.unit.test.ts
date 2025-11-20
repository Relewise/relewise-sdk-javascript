import { test, expect, jest } from '@jest/globals'
import { UserFactory } from '../../src/factory';

test('Anonymous', () => {
    const user = UserFactory.anonymous();
    expect(Object.keys(user)).toHaveLength(0);
});

test('byAuthenticatedId', () => {
    const user = UserFactory.byAuthenticatedId('1234');
    expect(Object.keys(user)).toHaveLength(1);
    expect(user.temporaryId).toBeUndefined();
    expect(user.authenticatedId).toBe('1234');
});

test('byAuthenticatedId + TemporaryId', () => {
    const user = UserFactory.byAuthenticatedId('1234', '5678');
    expect(Object.keys(user)).toHaveLength(2);
    expect(user.authenticatedId).toBe('1234');
    expect(user.temporaryId).toBe('5678');
});

test('byTemporaryId', () => {
    const user = UserFactory.byTemporaryId('1234');
    expect(Object.keys(user)).toHaveLength(1);
    expect(user.temporaryId).toBe('1234');
});

test('byTemporaryId rejects non-string input', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const user = UserFactory.byTemporaryId(123 as unknown as string);
    expect(user).toEqual({});
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain('byTemporaryId');
    consoleSpy.mockRestore();
});

test('byTemporaryId rejects promise input and returns anonymous', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const promise = Promise.resolve('789');
    const user = UserFactory.byTemporaryId(promise as unknown as string);
    expect(user).toEqual({});
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain('byTemporaryId');
    consoleSpy.mockRestore();
    await promise; // ensure no unhandled rejections
});

test('byAuthenticatedId rejects non-string authenticatedId', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const user = UserFactory.byAuthenticatedId(123 as unknown as string);
    expect(user).toEqual({});
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain('byAuthenticatedId');
    consoleSpy.mockRestore();
});

test('byAuthenticatedId rejects non-string temporaryId', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const user = UserFactory.byAuthenticatedId('authId', 987 as unknown as string);
    expect(user).toEqual({});
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain('byAuthenticatedId');
    consoleSpy.mockRestore();
});

test('byIdentifier', () => {
    const user = UserFactory.byIdentifier('foo', 'bar');
    expect(Object.keys(user)).toHaveLength(1);
    expect(user.identifiers).toBeDefined();
    expect(user.identifiers!['foo']).toBe('bar');
});

test('byIdentifier rejects non-string key', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const user = UserFactory.byIdentifier(123 as unknown as string, 'bar');
    expect(user).toEqual({});
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain('byIdentifier');
    consoleSpy.mockRestore();
});

test('byIdentifier rejects non-string value', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const user = UserFactory.byIdentifier('foo', 123 as unknown as string);
    expect(user).toEqual({});
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain('byIdentifier');
    consoleSpy.mockRestore();
});

test('byIdentifiers rejects non-string values', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const user = UserFactory.byIdentifiers({ foo: 123 as unknown as string });
    expect(user).toEqual({});
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain('byIdentifiers');
    consoleSpy.mockRestore();
});

test('byIdentifiers', () => {
    const user = UserFactory.byIdentifiers({ foo: 'bar' });
    expect(Object.keys(user)).toHaveLength(1);
    expect(user.identifiers).toBeDefined();
    expect(user.identifiers!['foo']).toBe('bar');
});

test('byIdentifiers rejects non-object input', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const user = UserFactory.byIdentifiers(null as unknown as Record<string, string>);
    expect(user).toEqual({});
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain('byIdentifiers');
    consoleSpy.mockRestore();
});

test('byIdentifiers rejects array input', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const user = UserFactory.byIdentifiers([] as unknown as Record<string, string>);
    expect(user).toEqual({});
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain('byIdentifiers');
    consoleSpy.mockRestore();
});

test('byEmail', () => {
    const user = UserFactory.byEmail('foo@bar.com');
    expect(Object.keys(user)).toHaveLength(1);
    expect(user.email).toBeDefined();
});

test('byEmail rejects non-string email', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const user = UserFactory.byEmail(123 as unknown as string);
    expect(user).toEqual({});
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain('byEmail');
    consoleSpy.mockRestore();
});

test('byFingerprint', () => {
    const user = UserFactory.byFingerprint('fingerprint');
    expect(Object.keys(user)).toHaveLength(1);
    expect(user.fingerprint).toBeDefined();
});

test('byFingerprint rejects non-string fingerprint', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const user = UserFactory.byFingerprint(123 as unknown as string);
    expect(user).toEqual({});
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain('byFingerprint');
    consoleSpy.mockRestore();
});
