import { ProductRecommendationResponse } from '@relewise/relewise-client';
interface ITest {
    run(): Promise<void>;
}

abstract class Test<T> implements ITest {
    constructor(
        public readonly name: string,
        private test: () => Promise<T | undefined>) { }

    protected abstract validateResult(response: T): string | undefined;

    public async run() {
        const response = await this.test();
        if (!response) {
            console.log(`ERROR: ${this.name} test failed: ${response}`);
            return;
        }

        const error = this.validateResult(response);
        if (error) {
            console.log(`ERROR: ${this.name} test failed\nError: ${error}\nResponse: ${JSON.stringify(response)}`);
            return;
        }

        console.log(`✅ SUCCESS: ${this.name}`);
    }
}

export class ProductRecommendationTest extends Test<ProductRecommendationResponse> {
    constructor(name: string, test: () => Promise<ProductRecommendationResponse | undefined>) {
        super(name, test);
    }

    protected override validateResult(response: ProductRecommendationResponse): string | undefined {
        if (!response.recommendations) {
            return 'No recommendations array found in response';
        }
        if (response.recommendations?.length == 0) {
            return 'Found 0 recommendations in request';
        }
    }
}

class Tester {
    private tests: ITest[] = [];

    public addTests<T>(tests: Test<T>[]) {
        this.tests.push(...tests);
    }

    public test() {
        this.tests.forEach(async x => await x.run());
    }
}

export default new Tester();