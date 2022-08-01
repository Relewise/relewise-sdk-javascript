# relewise-sdk-javascript [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) [![npm version](https://badge.fury.io/js/@relewise%2Frelewise-client.svg)](https://badge.fury.io/js/@relewise%2Frelewise-client) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://https://github.com/Relewise/relewise-sdk-csharp-extensions/pulls)

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

Tracking a product view
```ts
await tracker.tractProductView({
        productId: 'p-1',
        user: UserFactory.anonymous()
});
```

## Contributing

Pull requests are always welcome.  
Please fork this repository and make a PR when you are ready with your contribution.  

Otherwise you are welcome to open an Issue in our [issue tracker](https://github.com/Relewise/relewise-sdk-javascript/issues).

## License

relewise-sdk-javascript is licensed under the [MIT license](./LICENSE)
