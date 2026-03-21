# Package: design-system

## Purpose

Shared React component library used by both `apps/web` (React SPA) and `apps/site` (Next.js). Contains **only** presentational, reusable UI components — zero business logic, zero API calls.

## Stack

- **React 19** (peer dependency)
- **TypeScript strict mode**
- **tsup** for building (ESM + CJS + `.d.ts`)

## Adding a new component

1. Create `src/components/<ComponentName>/` directory.
2. Add `<ComponentName>.tsx` with the component and its prop types.
3. Add `index.ts` re-exporting the component.
4. Export from `src/index.ts`.

Example:
```
src/components/
  Button/
    Button.tsx     ← component + prop types
    index.ts       ← re-export
  index.ts         ← barrel: export * from './Button'
src/index.ts       ← barrel: export * from './components'
```

## Component rules

- **Every prop must be typed** — no `any`.
- **Accessibility first**: use semantic HTML, ARIA attributes where needed.
- **No hard-coded colours**: use CSS custom properties (`var(--color-primary)`) or accept `className`/`style` overrides.
- **Variants via union types**, not string enums.
- Expose a `className` prop on every component to allow style overrides.
- Do **not** import from `apps/*` or other `packages/*` (no internal deps).

## Building

```bash
pnpm --filter @club-manager/design-system build   # produces dist/
pnpm --filter @club-manager/design-system dev     # watch mode
```

Consumers (`apps/web`, `apps/site`) must run a build first, or run the design-system in watch mode during development.
