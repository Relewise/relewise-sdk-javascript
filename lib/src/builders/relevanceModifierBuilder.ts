import { RelevanceModifier, RelevanceModifierCollection } from "@/models/data-contracts";

export class RelevanceModifierBuilder {
    private modifiers: RelevanceModifier[] = [];

    public reset(): this {
        this.modifiers = [];

        return this;
    }

    public build(): RelevanceModifierCollection | null {
        return this.modifiers.length === 0
            ? null
            : { items: this.modifiers }
    }
}