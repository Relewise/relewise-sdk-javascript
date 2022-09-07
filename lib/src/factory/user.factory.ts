import { User } from '../models/data-contracts';

export class UserFactory {
    static anonymous(): User {
        return { };
    }
    
    static byAuthenticatedId(authenticatedId: string, temporaryId?: string): User {
        return { authenticatedId, ...(temporaryId && { temporaryId }) };
    }
    
    static byTemporaryId(temporaryId: string): User {
        return { temporaryId };
    }
    
    static byIdentifier(key: string, value: string): User {
        return { identifiers: { [key]: value } };
    }
    
    static byIdentifiers(identifiers: Record<string, string>): User {
        return { identifiers };
    }
    
    static byEmail(email: string): User {
        return { email };
    }
}