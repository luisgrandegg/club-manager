# 008 — Public club directory

**Area:** Site
**Priority:** Low
**Added:** 2026-03-21
**Completed:** 2026-03-21

## Description
An SEO-friendly, server-rendered page listing all public clubs. Allows people to discover clubs before signing up.

## Acceptance Criteria
- [x] `/clubs` route on the site — server-side fetches club list from API (revalidates every 60s)
- [x] Each club displayed as a card: name, city, short description
- [x] Pagination support
- [x] Individual club pages at `/clubs/[id]` with full details (ISR revalidate every hour)
- [x] Structured data (JSON-LD) for club pages
- [x] `<head>` metadata per page: title, description, canonical URL, Open Graph
