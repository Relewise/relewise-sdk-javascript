import { DataValue, CompanyUpdate, Company } from '@relewise/client';

export class CompanyUpdateBuilder {
    private company: Company;
    private updateKind: 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace';
    private parentCompanies: Company[] | null | undefined;
    private replaceExistingParents: boolean;

    constructor({ id, updateKind, replaceExistingParents }: {
        id: string,
        updateKind: 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace',
        replaceExistingParents: boolean
    }) {
        this.company = { id: id };
        this.updateKind = updateKind;
        this.replaceExistingParents = replaceExistingParents;
    }

    data(data: Record<string, DataValue | null>): this {
        this.company.data = data as Record<string, DataValue>; // TODO remove dirty hack

        return this;
    }

    parents(parents: Company[]): this {
        this.parentCompanies = parents;

        return this;
    }

    build(): CompanyUpdate {
        return {
            $type: 'Relewise.Client.DataTypes.CompanyUpdate, Relewise.Client',
            company: this.company,
            kind: this.updateKind,
            replaceExistingParents: this.replaceExistingParents,
            parents: this.parentCompanies,
        };
    }
}