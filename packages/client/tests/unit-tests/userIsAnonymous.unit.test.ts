
import { UserFactory } from '../../src/factory';
import { User } from '../../src/models/data-contracts';
import { userIsAnonymous } from '../../src/user-functions';

describe('userIsAnonymous', () => {
    it('returns true for a completely empty user object', () => {
        const user: User = {};

        expect(userIsAnonymous(user)).toBe(true);
    });

    it('returns true for a user created with UserFactory.anonymous() without arguments', () => {
        const user = UserFactory.anonymous();

        expect(userIsAnonymous(user)).toBe(true);
    });

    it('returns true when only fingerprint is set (no identifying fields)', () => {
        const user = UserFactory.byFingerprint('fingerprint-123');

        // userIsAnonymous does not consider fingerprint a de-anonymizing field
        expect(userIsAnonymous(user)).toBe(true);
    });

    it('returns false when authenticatedId is set', () => {
        const user = UserFactory.byAuthenticatedId('user-123');

        expect(userIsAnonymous(user as User)).toBe(false);
    });

    it('returns false when authenticatedId is an empty string and temporaryId is set', () => {
        const user: User = {
            authenticatedId: '',
            temporaryId: 'temp-123',
        };

        expect(userIsAnonymous(user)).toBe(false);
    });

    it('returns false when temporaryId is set', () => {
        const user = UserFactory.byTemporaryId('temp-123');

        expect(userIsAnonymous(user)).toBe(false);
    });

    it('returns false when email is set', () => {
        const user = UserFactory.byEmail('test@example.com');

        expect(userIsAnonymous(user)).toBe(false);
    });

    it('returns false when identifiers has at least one key', () => {
        const user = UserFactory.byIdentifier('customerId', 'abc-123');

        expect(userIsAnonymous(user)).toBe(false);
    });

    it('returns true when identifiers is an empty object', () => {
        const user: User = {
            identifiers: {},
        };

        expect(userIsAnonymous(user)).toBe(true);
    });

    it('returns false when multiple identifying fields are set', () => {
        const user: User = {
            authenticatedId: 'user-123',
            email: 'user@example.com',
            temporaryId: 'temp-123',
            identifiers: {
                someKey: 'someValue',
            },
        };

        expect(userIsAnonymous(user)).toBe(false);
    });

    it('treats null and undefined fields as absent', () => {
        const user: User = {
            authenticatedId: undefined,
            temporaryId: null as unknown as string, // simulating bad/null data
            email: '',
            identifiers: undefined,
        };

        expect(userIsAnonymous(user)).toBe(true);
    });

    it('returns false when identifiers is defined with values, even if other fields are empty', () => {
        const user: User = {
            authenticatedId: '',
            temporaryId: '',
            email: '',
            identifiers: {
                key: 'value',
            },
        };

        expect(userIsAnonymous(user)).toBe(false);
    });
});
