# relewise-sdk-javascript [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) [![npm version](https://badge.fury.io/js/@relewise%2Fclient.svg)](https://badge.fury.io/js/@relewise%2Fclient) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://https://github.com/Relewise/relewise-sdk-csharp-extensions/pulls)

## Installation 

Install via NPM or you preferred package manager: 

```
npm install @relewise/client
```

## Usage examples

Start by bootstrapping the client:

```ts
const tracker = new Tracker(RELEWISE_DATASET_ID, RELEWISE_API_KEY);
```

Replace the `RELEWISE_DATASET_ID` and `RELEWISE_API_KEY` parameters with your dataset & api key found at [My.Relewise](https://my.relewise.com/developer-settings). 

After which you have access to various methods depending on the client, in this case the tracker:

Tracking a product view:
```ts
await tracker.tractProductView({
        productId: 'p-1',
        user: UserFactory.anonymous()
});
```

When sending a tracking event to Relewise it is important to sent the correct User-information to Relewise to get the best personalization.
The SDK supports all the possible ways to sent a User to the API.

When the user is logged into the website, then use this method on the `UserFactory`.
```ts
UserFactory.byAuthenticatedId('<Your User Id>')
```

When the user has accepted cookies, then use this method on the `UserFactory`. Most 3rd party cookiebanners creates a unique identifier for each user. We recommend that you use this identifier, when tracking the users behavior on the website.
```ts
UserFactory.byTemporaryId('<Unique Id from localstorage>')
```

If the user is not logged in and has not accepted cookies then use the anonymous().
```ts
UserFactory.anonymous()
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
