import { Parameter } from "./parameter";
import { Property } from "./property";

export type Entry = {
    kind: string;
    name: string;
    docs: string;
    dependencies?: string[];
    isAbstract?: boolean;
    isDefault?: boolean;
    properties?: Property[];
    parent?: string;
    parentKind?: string;
    extends?: string[];
    parameters?: Parameter[];
    returnType?: string;
    isAsync?: boolean;
}