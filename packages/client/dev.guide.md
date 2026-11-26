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

To verify OAuth client credentials locally, use an OAuth API key with product-view tracking permission:

    npm run integration-test:oauth --DATASET_ID=... --OAUTH_CLIENT_ID=... --OAUTH_CLIENT_SECRET=... --SERVER_URL=https://sandbox-api.relewise.com/

The OAuth test deliberately replaces the first API request's bearer token with an invalid token. It verifies that the client acquires a replacement, retries the complete request once, preserves the request body, and reuses the replacement for a second product-view event. It is skipped by the regular integration suite when the OAuth variables are not configured.

Seeding creates missing base fixtures and updates existing ones through the public API. Keep fixtures and tracked behavior between runs; there is no teardown. Individual facet tests also update their existing fixed-ID fixtures. The seed step waits up to five minutes for initial indexing; individual tests search directly. Recommendation assertions remain unchanged; a newly populated dataset may need time for recommendation models to become available.

The integrations package uses separate fixed IDs so its administrative actions cannot disable this catalog. CI serializes runs against the shared dataset. Avoid overlapping local and CI runs.

## Automated API contract updates

Run **Generate API Version** in GitHub Actions with a `trello-card-url`. The workflow checks out `main`, runs the client's `gen-api` script against `https://api.relewise.com/public/swagger.json`, and opens a PR only when generated models change. It increments the client minor version (for example, `2.29.0` to `2.30.0`) in both package files, builds the SDK and declarations, and runs unit tests before pushing. The Trello link is the first line of the PR description; reviewers match the Java SDK workflow. Merging the PR does not publish a release.

Unlike the Java generator's exact NuGet package input, this workflow uses the currently published Swagger contracts. It cannot select a historical API version.

Repository configuration:

- Set `SDK_UPDATE_TOKEN` to a token with contents and pull request write access to `Relewise/relewise-sdk-javascript`. Without it, the workflow uses `GITHUB_TOKEN`; repository settings must allow Actions to create pull requests. Use `SDK_UPDATE_TOKEN` when generated PRs must trigger the normal CI workflows automatically.
- Set `INTEGRATION_TESTS_DATASET_API_KEY` for the dedicated JavaScript SDK sandbox dataset. The dataset ID and server URL are hardcoded in the workflow to match `unit-testing.yml`; no dataset repository variable is required. The workflow shares CI's concurrency group and seeds persistent fixtures before integration tests. Without the key, integration tests are explicitly reported as not run.

The workflow also supports `workflow_call` for release orchestration. Pass `trello-card-url`, grant `contents: write` and `pull-requests: write`, and pass the optional secrets explicitly or use `secrets: inherit`. Cross-repository callers need `SDK_UPDATE_TOKEN` with access to the target JavaScript repository. GitHub concurrency groups are scoped to the caller repository, so cross-repository orchestration should dispatch this workflow in the JavaScript repository to share its CI dataset lock.
