import { CategoryNameAndId, CategoryPath } from '@relewise/client';

export type ProductCategoryPath = {
    path: PathNode[]
};

export type PathNode = {
    id: string;
    displayName: {
        value: string;
        language: string;
    }[]
}

export class CategoryPathBuilder {
    private paths: CategoryPath[] = [];

    path(builder: (builder: PathBuilder) => void): this {
        const b = new PathBuilder();
        builder(b);
        this.paths.push({ breadcrumbPathStartingFromRoot: b.build() });

        return this;    
    }

    build(): CategoryPath[] {
        return this.paths;
    }
}

export class PathBuilder {
    private path: PathNode[] = [];

    category(categoryIdAndName: {
        id: string;
        displayName: {
            value: string;
            language: string;
        }[]
    }): this {

        this.path.push(categoryIdAndName);
        
        return this;    
    }

    build(): CategoryNameAndId[] {
        return this.path.map(x=> ({
            id: x.id, 
            displayName: { values: x.displayName.map(d => ({ text: d.value, language: { value: d.language } })) },
        }));
    }
}