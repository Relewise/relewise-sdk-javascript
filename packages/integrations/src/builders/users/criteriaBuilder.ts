import { Currency, Language, UserQueryCriteria } from "@relewise/client";

export class CriteriaBuilder {
    
    private userQueryCriteria: UserQueryCriteria;

    constructor() {
        this.userQueryCriteria = {};
    }

    public authenticatedId(authenticatedId: string): this {
        this.userQueryCriteria.authenticatedId = authenticatedId;

        return this;
    }

    public temporaryId(temporaryId: string): this {
        this.userQueryCriteria.temporaryId = temporaryId;

        return this;
    }

    public email(email: string): this {
        this.userQueryCriteria.email = email;

        return this;
    }

    public language(language: Language): this {
        this.userQueryCriteria.language = language;

        return this;
    }

    public currency(currency: Currency): this {
        this.userQueryCriteria.currency = currency;

        return this;
    }

    public identifier(key: string, value: string): this {
        if (!this.userQueryCriteria.identifiers)
            this.userQueryCriteria.identifiers = {};

        this.userQueryCriteria.identifiers[key] = value;

        return this;
    }

    build(): UserQueryCriteria {
        return this.userQueryCriteria;
    }
}