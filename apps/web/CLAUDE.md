# Web — React SPA

## Stack

- **React 19** + **Vite 6** (bundler)
- **TypeScript strict mode**
- **@club-manager/design-system** for all UI components
- **@club-manager/sdk** for all API calls — never `fetch` directly

## Conventions

- **Client-side only** — no SSR. This app is a logged-in dashboard, not public-facing.
- Components in `src/components/`. Pages (route-level) in `src/pages/`.
- Co-locate styles: use CSS Modules (`*.module.css`) or Tailwind if added later.
- Global state: React Context or Zustand (if added). No Redux.
- Use the SDK client from `@club-manager/sdk` — never construct fetch calls manually.
- Prefix all Vite env vars with `VITE_`. Access via `import.meta.env.VITE_*`.

## SEO note

This SPA is **not** server-rendered — it has no SEO. Public/marketing pages live in `apps/site` (Next.js). Do not add SSR to this app.

## Development

```bash
pnpm --filter @club-manager/web dev   # starts Vite dev server on :3000
```

The API runs on `:3001`. Vite proxy is configured to forward `/api/*` to the API.
