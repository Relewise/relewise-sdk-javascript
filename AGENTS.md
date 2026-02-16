# AGENTS.md

## Purpose
This file is the operating guide for contributors and coding agents working in `relewise-sdk-javascript`.

The repository is a multi-package TypeScript SDK. Follow this guide to keep changes scoped, verifiable, and aligned with CI.

## Repository Map
- `packages/client`: `@relewise/client` public SDK (search/recommendation/tracking clients, builders, models, factories).
- `packages/integrations`: `@relewise/integrations` package for entity update/integration flows.
- `packages/code-analyzer`: internal TypeScript analyzer used for MCP ingestion payload generation.
- `.github/workflows`: CI, publishing, dependabot auto-merge, and MCP ingestion workflows.
- `.github/dependabot.yml`: monthly grouped dependency updates for `client`, `integrations`, and GitHub Actions.

## Repository Skills
- `upgrade-dependencies`:
  - Location: `.agents/skills/upgrade-dependencies/SKILL.md`
  - Use when asked to refresh npm package versions or prepare dependency-upgrade PRs for this repository.
  - This skill enforces clean-main preflight checks, monthly chore branch creation, direct dependency upgrades, script-compatibility smoke checks (`packages/client` `gen-api` when relevant), per-package validation, and Trello-first PR descriptions.
- `update-sdk`:
  - Location: `.agents/skills/update-sdk/SKILL.md`
  - Use when asked to regenerate `@relewise/client` models/types from Swagger.
  - This skill enforces main-URL Swagger generation (`https://api.relewise.com/public/swagger.json`), expected-file checks, client validation commands, and Trello-first PR descriptions.

## Core Working Conventions
- Run commands from package directories; there is no root workspace `package.json`.
- Keep changes minimal and package-local.
- Do not commit secrets (dataset IDs, API keys, private URLs, credentials).
- Treat generated files as generated. In particular:
  - `packages/client/src/models/data-contracts.ts` is generated from Swagger.
  - Use `npm run gen-api` in `packages/client` when API contract regeneration is required.
- Avoid manual edits that conflict with generation/build outputs unless the change is intentionally part of that pipeline.

## Runbook

### `packages/client`
```powershell
cd packages/client
npm ci
npm run gen-api
npm run build
npm run build:types
npm test
# Conditional (requires secrets):
npm run integration-test --DATASET_ID=... --API_KEY=... --SERVER_URL=https://api.relewise.com
```

### `packages/integrations`
```powershell
cd packages/integrations
npm ci
npm run build
npm run build:types
npm test
# Conditional (requires secrets):
npm run integration-test --DATASET_ID=... --API_KEY=... --SERVER_URL=https://api.relewise.com
```

### `packages/code-analyzer`
```powershell
cd packages/code-analyzer
npm ci
npm run codeAnalyzer -- '..\client\tsconfig.json' '@relewise/client'
npm run codeAnalyzer -- '..\integrations\tsconfig.json' '@relewise/integrations'
```

## Validation Policy (CI-Aligned, Pragmatic)
- Required for normal code changes:
  - Build and unit tests for each touched package.
- Integration tests:
  - Required when behavior/API contract changes are involved and credentials are available.
  - If credentials are unavailable, explicitly report integration tests as not run.
- For dependency/tooling changes:
  - Re-run build + unit tests in all impacted packages.

## Dependency Upgrade Guidance
For dependency upgrade tasks, prefer using the `upgrade-dependencies` skill:

```text
$upgrade-dependencies
```

Core expectations from the skill:

1. Start from a clean working tree.
2. Ensure `origin` exists, fetch, switch to `main`, and fast-forward (`git pull --ff-only`).
3. Create a monthly branch (example: `chore/upgrade-dependencies-YYYYMM`).
4. Upgrade direct `dependencies` and `devDependencies` in each target package.
5. Keep each package lockfile updated.
6. Resolve manageable compatibility fallout (types, build, test failures).
7. Run script compatibility smoke checks before first commit (for `packages/client` tooling/script changes, run `npm --prefix .\packages\client run gen-api`).
8. Run required validation (build + unit; integration tests conditional).
9. Push and open PR to `main`.
10. Put the Trello card URL on the first line of the PR description.

Notes:
- Dependabot already opens monthly grouped updates for `packages/client` and `packages/integrations`.
- Minor/patch Dependabot PRs may auto-merge via workflow. Manual chore upgrades should coexist without breaking that flow.

## SDK Update Guidance
For Swagger-driven client SDK regeneration, prefer using the `update-sdk` skill:

```text
$update-sdk
```

Use `update-sdk` when the goal is updating generated client contracts/types from the main Swagger source URL, not general npm dependency upgrades.

## PR Expectations
Each PR should include:
- Scope: which package(s) changed and why.
- Risk notes: behavior surface potentially impacted.
- Validation results by command (build/tests, and integration-test status).
- API generation note when relevant (`gen-api` run/not run and reason).

## Known Pitfalls
- There is no root npm workspace command surface.
- `packages/client/src/models/data-contracts.ts` is generated; avoid manual drift.
- `swagger-typescript-api` major changes can break `npm run gen-api`; dependency upgrades touching client codegen tooling must run `npm --prefix .\packages\client run gen-api` before first push.
- `client` and `integrations` are versioned separately and keep separate lockfiles.
- Some `client` integration tests depend on data prepared by `integrations` integration tests.
