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

To run integrations tests, run the following command with parameters.

DATASET_ID - This is the Relewise Dataset Id

API_KEY - This is the Relewise API Key

SERVER_URL - This is an optional parameter for changing the API url. e.g. https://localhost:5000 for development


    npm run integration-test --DATASET_ID=... --API_KEY=... --SERVER_URL=https://api.relewise.com

Some tests are dependent on data therefore one must run the integration tests in the integrations package first.

Those tests will create all data needed for these tests to pass.
