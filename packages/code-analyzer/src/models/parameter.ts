export type Parameter = {
    name: string;
    type: string;
    nullable: boolean;
    defaultValue?: string;
    isReadonly?: boolean;
    scope?: string;
}