# Club Manager — Monorepo

## Architecture

> For visual diagrams (workspace graph, API routes, ER diagram, request flow) see **[docs/architecture.md](docs/architecture.md)**.

Turborepo monorepo managed with **pnpm workspaces**.

```
apps/
  api/          — NestJS REST API (OpenAPI / Swagger)
  web/          — React SPA (Vite) — members-facing dashboard
  site/         — Next.js public site (SSR/SSG) — SEO & marketing
packages/
  design-system/ — Shared React component library (tsup)
  sdk/           — Auto-generated API client (openapi-typescript + openapi-fetch)
```

## Key conventions

- **Package manager**: pnpm. Never use npm or yarn.
- **Run tasks from the root** using Turborepo: `pnpm build`, `pnpm dev`, `pnpm lint`, `pnpm test`.
- **Internal packages** are referenced as `workspace:*` in package.json.
- **TypeScript** everywhere. The shared `tsconfig.base.json` at the root is extended by every workspace.
- **Never commit directly to `master`/`main`**. Use feature branches and PRs.
- **Conventional Commits** for all commit messages (`feat:`, `fix:`, `chore:`, `docs:`, etc.).

## SDK is auto-generated — do not edit manually

The `packages/sdk/src/schema.ts` file is generated from `apps/api/openapi.json`.

To regenerate:
```bash
# 1. Generate the OpenAPI spec from the API
pnpm --filter @club-manager/api build:openapi

# 2. Regenerate the SDK types
pnpm --filter @club-manager/sdk generate
```

## Adding a new workspace

1. Create the directory under `apps/` or `packages/`.
2. Add a `package.json` with `"name": "@club-manager/<name>"`.
3. Add a `CLAUDE.md` with workspace-specific rules.
4. pnpm workspaces picks it up automatically.

## Environment variables

- Each app has a `.env.example` — copy to `.env.local` (never commit `.env`).
- Prefix public env vars for Vite with `VITE_`, for Next.js with `NEXT_PUBLIC_`.

## Tooling versions

- Node ≥ 20
- pnpm ≥ 9
- TypeScript ~5.7
