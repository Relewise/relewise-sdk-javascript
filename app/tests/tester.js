var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Test {
    constructor(name, test) {
        this.name = name;
        this.test = test;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.test();
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
        });
    }
}
export class ProductRecommendationTest extends Test {
    constructor(name, test) {
        super(name, test);
    }
    validateResult(response) {
        var _a;
        if (!response.recommendations) {
            return 'No recommendations array found in response';
        }
        if (((_a = response.recommendations) === null || _a === void 0 ? void 0 : _a.length) == 0) {
            return 'Found 0 recommendations in request';
        }
    }
}
class Tester {
    constructor() {
        this.tests = [];
    }
    addTests(tests) {
        this.tests.push(...tests);
    }
    test() {
        this.tests.forEach((x) => __awaiter(this, void 0, void 0, function* () { return yield x.run(); }));
    }
}
export default new Tester();
