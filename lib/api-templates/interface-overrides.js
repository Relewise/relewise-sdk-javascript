module.exports = {
    User: function(contract) {
        return `
            class ${contract.name} {
                ${contract.content}

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
            }`;
    },
    Product: function(contract) {
        return `
            interface ${contract.name} {
                id: string;
            }
        `;
    },
    Content: function(contract) {
        return `
            interface ${contract.name} {
                id: string;
            }
        `;
    },
    Brand: function(contract) {
        return `
            interface ${contract.name} {
                id: string;
            }
        `;
    }
}