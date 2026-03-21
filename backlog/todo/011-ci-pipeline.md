# 011 — CI pipeline

**Area:** Infrastructure
**Priority:** High
**Added:** 2026-03-21

## Description
Automated checks on every pull request and push to `main`. Ensures code quality and prevents regressions.

## Acceptance Criteria
- [ ] GitHub Actions workflow runs on `push` to `main` and on all PRs
- [ ] Jobs: `lint`, `typecheck`, `test` — each using `pnpm` and Turborepo
- [ ] Cache `node_modules` and Turborepo build cache between runs
- [ ] Fail fast: PR cannot be merged if any job fails
- [ ] Branch protection rules on `main` require passing CI
- [ ] Total CI time under 5 minutes on a cold cache

## Notes
Use `pnpm/action-setup` and `actions/setup-node` with Node 20. Leverage `turbo run --filter` for affected-package-only runs if Turborepo remote cache is configured.
