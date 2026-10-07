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

Use the dedicated JavaScript SDK sandbox dataset configured in `.github/workflows/unit-testing.yml`. Run these commands from `packages/client` with the same dataset and key:

    npm run integration-seed --DATASET_ID=... --API_KEY=... --SERVER_URL=https://sandbox-api.relewise.com/
    npm run integration-test --DATASET_ID=... --API_KEY=... --SERVER_URL=https://sandbox-api.relewise.com/

Seeding creates missing base fixtures and updates existing ones through the public API. Keep fixtures and tracked behavior between runs; there is no teardown. Individual facet tests also update their existing fixed-ID fixtures. Public search checks wait up to five minutes for initial indexing. Recommendation assertions remain unchanged; a newly populated dataset may need time for recommendation models to become available.

The integrations package uses separate fixed IDs so its administrative actions cannot disable this catalog. CI serializes runs against the shared dataset. Avoid overlapping local and CI runs.

RecentlyPurchasedFacet is not enabled on this dataset, so its test is explicitly skipped. Pass `--TEST_RECENTLY_PURCHASED_FACET=true` to run it on an enabled dataset.
