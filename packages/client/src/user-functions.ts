import { User } from './models/data-contracts';

export function userIsAnonymous(user: User): boolean {
    const hasAuthId = !!user.authenticatedId;
    const hasTempId = !!user.temporaryId;
    const hasEmail = !!user.email;
    const hasIdentifiers = !!user.identifiers && Object.keys(user.identifiers).length > 0;

    return !(hasAuthId || hasTempId || hasEmail || hasIdentifiers);
}