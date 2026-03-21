# 000 — Monorepo scaffolding

**Area:** Infrastructure
**Priority:** High
**Added:** 2026-03-21
**Completed:** 2026-03-21

## Description
Set up the Turborepo + pnpm workspaces monorepo with all five workspaces: `apps/api` (NestJS), `apps/web` (React + Vite), `apps/site` (Next.js), `packages/design-system`, and `packages/sdk`. Establish shared TypeScript config, lint setup, and task graph.

## Acceptance Criteria
- [x] Turborepo configured with `build`, `dev`, `test`, `lint`, `typecheck` tasks
- [x] pnpm workspaces covering `apps/*` and `packages/*`
- [x] Shared `tsconfig.base.json` extended by all workspaces
- [x] `apps/api` — NestJS skeleton with health check and clubs CRUD + OpenAPI spec
- [x] `apps/web` — React 19 + Vite skeleton consuming design-system and SDK
- [x] `apps/site` — Next.js 15 skeleton
- [x] `packages/design-system` — tsup build, Button component
- [x] `packages/sdk` — auto-generated from OpenAPI spec via openapi-typescript

## Completion Notes
Delivered in PR #7. All workspaces boot and the SDK is generated from the committed `openapi.json`.
