## Usage

The following tasks are available for `npm run`:

- `dev`: Run Rollup in watch mode to detect changes to files during development
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

Link to the lib project using the `npm link @relewise/integrations` (or `yarn link @relewise/integrations`) command

Now, run your app via `npm start`.

## Development Cleanup

Once development completes, `unlink` both your library and test app projects.

**From the app project**, unlink the library using `npm unlink @relewise/integrations` (or `yarn unlink @relewise/integrations`) command:

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

Use the dedicated JavaScript SDK integration dataset (`d4abb40e-22d4-4eb7-b48e-5325b7ce2a1f`) on `https://sandbox-api.relewise.com/`. Set `DATASET_ID`, `SERVER_URL`, and a dataset API key in `API_KEY`. Set `TEST_RUN_ID` to a unique value for each run; it prefixes fixture IDs and marks users for cleanup.

Run these commands in order with the same parameters:

    npm run integration-seed --DATASET_ID=... --API_KEY=... --SERVER_URL=https://sandbox-api.relewise.com/ --TEST_RUN_ID=...
    npm run integration-test --DATASET_ID=... --API_KEY=... --SERVER_URL=https://sandbox-api.relewise.com/ --TEST_RUN_ID=...
    npm run integration-cleanup --DATASET_ID=... --API_KEY=... --SERVER_URL=https://sandbox-api.relewise.com/ --TEST_RUN_ID=...

Run cleanup even if a test fails. This write-focused suite uses disposable run-specific entities for update, enable/disable, and delete tests. It creates its own category and brand fixtures and deletes its products, content, companies, categories, brands, and tracked users. Its IDs are separate from the persistent catalog owned by the client search suite; cleanup must never delete that catalog. GitHub Actions supplies the API key from the `INTEGRATION_TESTS_DATASET_API_KEY` repository secret.
