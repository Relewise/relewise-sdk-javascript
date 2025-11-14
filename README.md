# relewise-sdk-javascript [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) [![npm version](https://badge.fury.io/js/@relewise%2Fclient.svg)](https://badge.fury.io/js/@relewise%2Fclient) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Relewise/relewise-sdk-javascript/pulls)

## Packages

| Package | Version | Description |
| --- | --- | --- |
| [`@relewise/client`](packages/client) | [![npm version](https://img.shields.io/npm/v/@relewise%2Fclient.svg)](https://badge.fury.io/js/@relewise%2Fclient) | The official Relewise JS SDK |
| [`@relewise/integrations`](packages/integrations) | [![npm version](https://img.shields.io/npm/v/@relewise%2Fintegrations.svg)](https://badge.fury.io/js/@relewise%2Fintegrations) | Helper package for managing entities |

## Installation 

Install via NPM or you preferred package manager: 

```
npm install @relewise/client
```

## Usage examples

### Bootstrapping

Whether you need to track, search or recommend, you need to start by bootstrapping either the `Tracker`, `Searcher` or `Recommender`.

```ts
const tracker = new Tracker(RELEWISE_DATASET_ID, RELEWISE_API_KEY, {
    serverUrl: RELEWISE_SERVER_URL,
});

const searcher = new Searcher(RELEWISE_DATASET_ID, RELEWISE_API_KEY, {
    serverUrl: RELEWISE_SERVER_URL,
});
        
const recommender = new Recommender(RELEWISE_DATASET_ID, RELEWISE_API_KEY, {
    serverUrl: RELEWISE_SERVER_URL,
});
```

Replace the `RELEWISE_DATASET_ID`, `RELEWISE_API_KEY` and `RELEWISE_SERVER_URL` parameters with your dataset & api key found at [My.Relewise](https://my.relewise.com/developer-settings). 

After which you have access to various methods depending on the client you've bootstrapped.

***Note: serverUrl is not required and will default to https://api.relewise.com/*** 

#### Cache mode
By default, clients use `cache: 'no-cache'` to ensure responses are always fresh — this prevents stale results that could break personalization.
However, some service workers (often used in integrations) do not support the `no-cache` mode.

```ts
const integrator = new Integrator(RELEWISE_DATASET_ID, RELEWISE_API_KEY, {
    serverUrl: RELEWISE_SERVER_URL,
    cache: 'default'
});
```

### Tracking

If you need to track e.g. Product-, Category or Content Views, track Cart Updates or Completed Orders in your solution, you need to use the `Tracker` 

Here is an example of how to track a product view:
```ts
await tracker.trackProductView({
        productId: 'p-1',
        user: UserFactory.anonymous()
});
```
Replace `p-1` with the productId of the product a customer has viewed.

You can also track the following types:
- ProductCategoryView
- ContentView
- ContentCategoryView
- Order
- Cart
- BrandView
- SearchTerm (When not using Relewise for searching, but still want to provide metrics to enhance recommendations)

When tracking a user behaviour to Relewise, it is important to provide the correct type of `User` to Relewise.

Types of users in Relewise:
- Anonymous – users who did not consent to be tracked (GDPR).
- Temporary – users who have not logged in and are using a temporary ID, e.g. cookie based.
- Authenticated – users who have logged in and where we have a persistent ID, e.g. ID from database.

#### A temporary user is a profile, where the ID might change if the end-user decides to clear browser data or change device.
```ts
UserFactory.byTemporaryId('<Unique Id from localstorage>')
```
Best practice:
 - Use an ID that is “long-living” and classified as 1st party, e.g. cookie or localStorage.
 - Use same ID as the shop uses to recognize the user.
 - Make sure the ID does not change, when the user completes an order.

#### An authenticated user is defined by a logged-in user:
```ts
UserFactory.byAuthenticatedId('authenticatedId')
```
Best practice:
 - If possible, use an ID that is semantic and constant.
 - For a user journey that “starts” as a Temporary User, make sure
to map the Temporary ID on the first request to Relewise.
– this can also be done through a UserUpdate-request.
```ts
UserFactory.byAuthenticatedId('authenticatedId', 'temporaryId')
```

#### If the user is not logged in and has not accepted cookies, then use the Anonymous user type.
```ts
UserFactory.anonymous()
```

#### Checking if a user is anonymous at runtime

When you are working with `User` objects that may come from different sources, you can use the helper `userIsAnonymous(user)` to
verify whether a given user should be treated as anonymous. The helper returns `true` only when the user has no
`authenticatedId`, `temporaryId`, `email`, or custom `identifiers` set — matching the rules that Relewise applies when
processing users.

```ts
import { userIsAnonymous, UserFactory } from '@relewise/client';

const user = UserFactory.anonymous();

if (userIsAnonymous(user)) {
    // render consent prompt or do alternate rendering for anonymous users
}
```

### Search

To use our fully-fledged search engine, start by bootstrapping the `Searcher`-class - see section above on how to bootstrap the `Searcher`.

Here is a basic usage example for selecting product properties, paging, facets and filters.

```ts
const searcher = new Searcher(RELEWISE_DATASET_ID, RELEWISE_API_KEY, {
    serverUrl: RELEWISE_SERVER_URL,
});

const settings = {
    language: 'da-DK',
    currency: 'DKK',
    displayedAtLocation: 'search page',
    user: UserFactory.anonymous()
};

const builder = new ProductSearchBuilder(settings)
    .setSelectedProductProperties({
        displayName: true,
        pricing: true,
        dataKeys: ['Url', 'ShortDescription', 'ImageUrls', 'DK_*']
    })
    .setTerm('shoe')
    .pagination(p => p
        .setPageSize(30)
        .setPage(1))
    .facets(f => f
        .addBrandFacet(['HP', 'Lenovo'])
        .addSalesPriceRangeFacet('Product', 100, 500)
        .addVariantSpecificationFacet('Size', ['XL'])
    )
    .filters(f => f
        .addProductAssortmentFilter(1)
        .addVariantAssortmentFilter(1)
    );

searcher.searchProducts(builder.build());
```

You can use the `*` in `dataKeys` to extract properties by conventions - if you store data that is unique for a store or have many `dataKeys` with the same prefix or postfix.

### Category pages

You can also use the `Searcher` for category pages without specifying the `term`:

```ts
const searcher = new Searcher(RELEWISE_DATASET_ID, RELEWISE_API_KEY, {
    serverUrl: RELEWISE_SERVER_URL,
});

const settings = {
    language: 'da-DK',
    currency: 'DKK',
    displayedAtLocation: 'search page',
    user: UserFactory.anonymous()
};

const builder = new ProductSearchBuilder(settings)
    .setSelectedProductProperties({
        displayName: true,
        pricing: true,
        dataKeys: ['Url', 'ShortDescription', 'ImageUrls', 'DK_*']
    })
    .pagination(p => p
        .setPageSize(30)
        .setPage(1))
    .facets(f => f
        .addBrandFacet(['HP', 'Lenovo'])
        .addSalesPriceRangeFacet('Product', 100, 500)
        .addVariantSpecificationFacet('Size', ['XL'])
    )
    .filters(f => f
        .addProductAssortmentFilter(1)
        .addVariantAssortmentFilter(1)
        .addProductCategoryIdFilter('ImmediateParent', ["category_id"])
    )
    .sorting(s => s
        .sortByProductData('InStock', 'Descending', (n) => n
            .sortByProductRelevance()));

searcher.searchProducts(builder.build());
```

When using sorting, it is important to also sort by relevance after sorting by stock, new products, etc., so that you still get the benefit of personalized results.

### Batching of requests

You can also batch requests in one HTTP requests to reduce latency.

```ts
const searcher = new Searcher(RELEWISE_DATASET_ID, RELEWISE_API_KEY, {
    serverUrl: RELEWISE_SERVER_URL,
});

const searchCollectionBuilder = new SearchCollectionBuilder(settings)
    .addRequest(productSearchBuilder.build())
    .addRequest(contentSearchBuilder.build())
    .addRequest(searchTermPredictionBuilder.build());

searcher.batch(searchCollectionBuilder.build());
```
    
## Using the SDK via CDN.

For more information about how to use the SDK via CDN - go to our [docs site](https://docs.relewise.com/docs/developer/getting-started.html#_2-choose-your-technology).

## Running integration tests

You can read about running the integration tests [here](/packages/client/dev.guide.md#testing).

## Contributing

Pull requests are always welcome.  
Please fork this repository and make a PR when you are ready with your contribution.  

Otherwise you are welcome to open an Issue in our [issue tracker](https://github.com/Relewise/relewise-sdk-javascript/issues).

## License

relewise-sdk-javascript is licensed under the [MIT license](./LICENSE)
