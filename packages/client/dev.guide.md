## Usage

The following tasks are available for `npm run`:

- `dev`: Run Rollup in watch mode to detect changes to files during development
- `gen-api`: Generate all project specific Typescript interfaces from the swagger.json definitions file (should be run before build:types)
- `build`: Run Rollup to build a production release distributable
- `build:types`: Run Microsoft API Extractor to rollup a types declaration (`d.ts`) file 
- `docs`: Run TypeDoc for TSDoc generated documentation in the "*docs/*" folder
- `clean`: Remove all build artifacts

## Development

**From the lib project**, issue the `npm link` (or `yarn link`) command:

```
npm link
```

Start Rollup in watch mode:

```
npm run dev
```

**From the app project**:

Link to the lib project using the `npm link @relewise/client` (or `yarn link @relewise/client`) command

Now, run your app via `npm start`.

## Development Cleanup

Once development completes, `unlink` both your library and test app projects.

**From the app project**, unlink the library using `npm unlink @relewise/client` (or `yarn unlink @relewise/client`) command:

**From the lib project**, issue the `npm unlink` (or `yarn unlink`) command:

```
npm unlink
```

## Release Publishing

Update your `package.json` to next version number, and remember to tag a release.

Once ready to submit your package to the NPM Registry, execute the following tasks via `npm` (or `yarn`):

- `npm run clean` &mdash; Assure a clean build
- `npm run gen-api` &mdash; Generate the typescript API interfaces
- `npm run build` &mdash; Build the package
- `npm run build:types` &mdash; Build API Extractor d.ts declaration

Assure the proper npm login:

```
npm login
```

Submit your package to the registry:

```
npm publish --access public
```

## Testing

### Integrations

Use the dedicated JavaScript SDK integration dataset (`d4abb40e-22d4-4eb7-b48e-5325b7ce2a1f`) on `https://sandbox-api.relewise.com/`. Set `DATASET_ID`, `SERVER_URL`, and a dataset API key in `API_KEY`. Set `TEST_RUN_ID` to a unique value for each run; it isolates transient users and order identifiers. Catalog fixture IDs use a stable `javascript-sdk-client-` prefix.

Run these commands in order with the same parameters:

    npm run integration-seed --DATASET_ID=... --API_KEY=... --SERVER_URL=https://sandbox-api.relewise.com/ --TEST_RUN_ID=...
    npm run integration-test --DATASET_ID=... --API_KEY=... --SERVER_URL=https://sandbox-api.relewise.com/ --TEST_RUN_ID=...
    npm run integration-cleanup --DATASET_ID=... --API_KEY=... --SERVER_URL=https://sandbox-api.relewise.com/ --TEST_RUN_ID=...

Run cleanup even if a test fails. It removes only users marked for the current run. Products, content, categories, the brand, and recommendation seed users remain available for subsequent runs. The integrations package uses a separate run-specific namespace for disposable update, enable/disable, and delete tests, so its cleanup cannot remove the client catalog.

The seed step upserts all search and facet fixtures through the public update API, including fixtures previously created inside individual tests. It restores expected properties before checking readiness; search tests then read those fixtures without changing them. Increment the fixture revision in `tests/integrationFixtures.ts` whenever expected fixture properties change. Readiness searches require both the exact IDs and the current revision in both test languages where applicable. They use normal indexing and candidate-cache propagation, poll every 500 ms for up to 120 seconds, and fail immediately on API errors. An initial seed or a fixture revision change may need a later retry if normal indexing takes longer. Recommendation tests allow empty results because model readiness depends on historical activity.

GitHub Actions supplies the API key from the `INTEGRATION_TESTS_DATASET_API_KEY` repository secret. Tests use public SDK operations and do not call internal index or cache endpoints. Workflow concurrency serializes runs against the shared dataset. Do not run local integration tests concurrently with CI or another local run using this dataset.
