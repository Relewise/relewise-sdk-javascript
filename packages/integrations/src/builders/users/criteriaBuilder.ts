import { Currency, Language, UserQueryCriteria } from "@relewise/client";

export class CriteriaBuilder {
    
    private userQueryCriteria: UserQueryCriteria;

    constructor() {
        this.userQueryCriteria = {};
    }

    public byAuthenticatedId(authenticatedId: string): this {
        this.userQueryCriteria.authenticatedId = authenticatedId;

        return this;
    }

    public beTemporaryId(temporaryId: string): this {
        this.userQueryCriteria.temporaryId = temporaryId;

        return this;
    }

    public byEmail(email: string): this {
        this.userQueryCriteria.email = email;

        return this;
    }

    public language(language: string): this {
        this.userQueryCriteria.language = { value: language };

        return this;
    }

    public currency(currency: string): this {
        this.userQueryCriteria.currency = { value: currency };

        return this;
    }

    public byIdentifier(key: string, value: string): this {
        if (!this.userQueryCriteria.identifiers)
            this.userQueryCriteria.identifiers = {};

        this.userQueryCriteria.identifiers[key] = value;

        return this;
    }

    public byIdentifiers(identifiers: Record<string, string>): this {
        this.userQueryCriteria.identifiers = identifiers;

        return this;
    }

    build(): UserQueryCriteria {
        return this.userQueryCriteria;
    }
}