import { User } from '../models/data-contracts';

export type PartialUser<TKeys extends string> = Omit<User, TKeys>;

export class UserFactory {

    static anonymous(user?: PartialUser<'temporaryId' | 'fingerprint' | 'authenticatedId'>): User {
        return { ...user };
    }

    static byAuthenticatedId(authenticatedId: string, temporaryId?: string, user?: PartialUser<'temporaryId' | 'authenticatedId'>): User {
        if (typeof authenticatedId !== 'string') {
            return this.logAndReturnAnonymous('byAuthenticatedId', 'authenticatedId must be a string', authenticatedId);
        }

        if (temporaryId !== undefined && typeof temporaryId !== 'string') {
            return this.logAndReturnAnonymous('byAuthenticatedId', 'temporaryId must be a string when provided', temporaryId);
        }

        return { authenticatedId, ...(temporaryId && { temporaryId }), ...user };
    }

    static byTemporaryId(temporaryId: string, user?: PartialUser<'temporaryId'>): User {
        if (typeof temporaryId !== 'string') {
            return this.logAndReturnAnonymous('byTemporaryId', 'temporaryId must be a string', temporaryId);
        }

        return { ...user, temporaryId };
    }

    static byIdentifier(key: string, value: string, user?: PartialUser<'identifiers'>): User {
        if (typeof key !== 'string') {
            return this.logAndReturnAnonymous('byIdentifier', 'key must be a string', key);
        }

        if (typeof value !== 'string') {
            return this.logAndReturnAnonymous('byIdentifier', 'value must be a string', value);
        }

        return { ...user, identifiers: { [key]: value } };
    }

    static byIdentifiers(identifiers: Record<string, string>, user?: PartialUser<'identifiers'>): User {
        if (identifiers === null || typeof identifiers !== 'object' || Array.isArray(identifiers)) {
            return this.logAndReturnAnonymous('byIdentifiers', 'identifiers must be a record of string keys to string values', identifiers);
        }

        for (const [key, value] of Object.entries(identifiers)) {
            if (typeof key !== 'string' || typeof value !== 'string') {
                return this.logAndReturnAnonymous('byIdentifiers', 'identifiers must be a record of string keys to string values', identifiers);
            }
        }

        return { identifiers, ...user };
    }

    static byEmail(email: string, user?: PartialUser<'email'>): User {
        if (typeof email !== 'string') {
            return this.logAndReturnAnonymous('byEmail', 'email must be a string', email);
        }

        return { email, ...user };
    }

    static byFingerprint(fingerprint: string, user?: PartialUser<'fingerprint'>): User {
        if (typeof fingerprint !== 'string') {
            return this.logAndReturnAnonymous('byFingerprint', 'fingerprint must be a string', fingerprint);
        }

        return { fingerprint, ...user };
    }

    private static logAndReturnAnonymous(method: string, issue: string, received: unknown): User {
        console.error(`[UserFactory.${method}] ${issue}`, received);
        return this.anonymous();
    }
}
