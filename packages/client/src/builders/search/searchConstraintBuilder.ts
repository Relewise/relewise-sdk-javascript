import { ProductSearchResultConstraint } from '../../models/data-contracts';

export class SearchConstraintBuilder {
    private resultConstraint: ProductSearchResultConstraint | null = null;

    public setResultMustHaveVariantConstraint(constaint: { exceptWhenProductHasNoVariants: boolean }): this {
        const constraint: ProductSearchResultConstraint = {
            $type: 'Relewise.Client.Requests.Search.Settings.ResultMustHaveVariantConstraint, Relewise.Client',
            ...constaint,
        };

        this.resultConstraint = constraint;
        return this;
    }

    build(): ProductSearchResultConstraint | null {
        return this.resultConstraint;
    }
}
