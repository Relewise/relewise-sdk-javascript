import { User } from "./models/data-contracts";

export class Utils {
    static User = class {
        static Anonymous(): User {
            return { };
        }
    
        static ByAuthenticatedId(authenticatedId: string, temporaryId?: string): User {
            return { authenticatedId, temporaryId };
        }
    
        static ByTemporaryId(temporaryId: string): User {
            return { temporaryId };
        }
    
        static ByIdentifier(key: string, value: string): User {
            return { identifiers: { [key]: value } };
        }
    
        static ByIdentifiers(identifiers: Record<string, string>): User {
            return { identifiers };
        }
    
        static ByEmail(email: string): User {
            return { email };
        }
    }
}