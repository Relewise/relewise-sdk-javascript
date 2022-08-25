# relewise-sdk-javascript [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) [![npm version](https://badge.fury.io/js/@relewise%2Fclient.svg)](https://badge.fury.io/js/@relewise%2Fclient) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://https://github.com/Relewise/relewise-sdk-csharp-extensions/pulls)

## Installation 

Install via NPM or you preferred package manager: 

```
npm install @relewise/client
```

## Usage examples

### Bootstrapping

Whether you need to track or search, you need to start by bootstrapping either the `Tracker` or `Searcher`.

```ts
const tracker = new Tracker(RELEWISE_DATASET_ID, RELEWISE_API_KEY);
const searcher = new Searher(RELEWISE_DATASET_ID, RELEWISE_API_KEY);
```

Replace the `RELEWISE_DATASET_ID` and `RELEWISE_API_KEY` parameters with your dataset & api key found at [My.Relewise](https://my.relewise.com/developer-settings). 

After which you have access to various methods depending on the client you bootstrapped.

### Tracking

If you need to tracking orders, cart changes, or different views on your store, you need to use the `Tracker` 

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

### Search

When you need to use the Relewise fully-fledged search engine, then bootstrap the `Searcher`.

Here is a basic usage example for selecting product properties, paging, facets and filters.

```ts
const searcher = new Searcher(RELEWISE_DATASET_ID, RELEWISE_API_KEY);

const settings = {
    language: 'da-DK',
    currency: 'DKK',
    displayedAtLocation: 'search page',
    user: UserFactory.anonymous()
};

const builder = new ProductSearchBuilder(settings)
    .setProductProperties({
        displayName: true,
        pricing: true,
        dataKeys: ['Url', 'ShortDescription', 'ImageUrls', '[dataFieldConventionName]*']
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
    );

searcher.searchProducts(builder.build());
```

## Using the SDK via CDN.

For more information about how to use the SDK via CDN - go to our [docs site](https://docs.relewise.com/docs/developer/libraries.html).

## Running integration tests

You can read about running the integration tests [here](/lib/dev.guide.md#testing).

## Contributing

Pull requests are always welcome.  
Please fork this repository and make a PR when you are ready with your contribution.  

Otherwise you are welcome to open an Issue in our [issue tracker](https://github.com/Relewise/relewise-sdk-javascript/issues).

## License

relewise-sdk-javascript is licensed under the [MIT license](./LICENSE)
