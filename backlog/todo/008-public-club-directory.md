# 008 — Public club directory

**Area:** Site
**Priority:** Low
**Added:** 2026-03-21

## Description
An SEO-friendly, server-rendered page listing all public clubs. Allows people to discover clubs before signing up.

## Acceptance Criteria
- [ ] `/clubs` route on the site — server-side fetches club list from API at build or request time
- [ ] Each club displayed as a card: name, city, member count, short description
- [ ] Pagination or infinite scroll
- [ ] Individual club pages at `/clubs/[id]` with full details (SSG with ISR)
- [ ] Structured data (JSON-LD) for club pages
- [ ] `<head>` metadata per page: title, description, canonical URL

## Notes
Use `fetch` with Next.js caching. Revalidate club pages every hour (ISR).
