import { UserQuery } from "@relewise/client";
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

    public language(language: string): this {
        this.userQuery.language = { value: language };

        return this;
    }

    public currency(currency: string): this {
        this.userQuery.currency = { value: currency };

        return this;
    }

    build(): UserQuery {
        return this.userQuery;
    }
}