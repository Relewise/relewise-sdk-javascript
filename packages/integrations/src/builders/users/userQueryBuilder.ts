import { Currency, Language, UserQuery, UserQueryCriteria } from "@relewise/client";
import { CriteriaBuilder } from "./criteriaBuilder";

export class UserQueryBuilder {

    private userQuery: UserQuery;

    constructor() {
        this.userQuery = {
            $type: "Relewise.Client.Requests.Queries.UserQuery, Relewise.Client",
            criteria: []
        }
    }

    public criteria(criteria: (criteria: CriteriaBuilder) => void): this {

        const localCriteriaBuilder = new CriteriaBuilder();

        criteria(localCriteriaBuilder);

        this.userQuery.criteria.push(localCriteriaBuilder.build());

        return this;
    }

    public language(language: Language): this {
        this.userQuery.language = language;

        return this;
    }

    public currency(currency: Currency): this {
        this.userQuery.currency = currency;

        return this;
    }

    build(): UserQuery {
        return this.userQuery;
    }
}