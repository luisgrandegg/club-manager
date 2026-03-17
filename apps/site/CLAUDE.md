# Site — Next.js (Public / SEO)

## Why Next.js?

Next.js was chosen over plain React SPA specifically for **SEO and discoverability**:

- **SSR / SSG**: pages are rendered server-side or statically, so crawlers get fully-formed HTML.
- **Metadata API**: `generateMetadata()` per page — title, description, Open Graph, Twitter cards.
- **Image optimization**: `<Image>` component with automatic WebP conversion and lazy loading.
- **Core Web Vitals**: Next.js defaults (font optimization, script optimization) help Lighthouse scores.
- **Sitemap + robots.txt**: trivial to add via `app/sitemap.ts` and `app/robots.ts`.
- **Structured data**: easy to inject JSON-LD for rich snippets.

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript strict mode**
- **@club-manager/design-system** for UI components

## Conventions

- Use the **App Router** (`src/app/`). Do not use the Pages Router.
- Prefer **Static Generation** (`generateStaticParams`, `export const dynamic = 'force-static'`).
- Use **Server Components** by default. Only add `'use client'` when interactivity is required.
- Every page **must** export `generateMetadata()` or a static `metadata` object.
- No direct API calls from client components — use Server Actions or Route Handlers.
- Public assets in `public/`.

## SEO checklist for new pages

- [ ] `metadata.title` and `metadata.description` set
- [ ] `metadata.openGraph` with image set
- [ ] Semantic HTML (`<main>`, `<article>`, `<section>`, `<h1>` only once)
- [ ] Image `alt` text on all images
- [ ] Structured data (JSON-LD) where relevant

## Development

```bash
pnpm --filter @club-manager/site dev   # starts Next.js dev server on :3002
```
