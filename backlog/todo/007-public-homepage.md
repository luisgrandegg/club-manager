# 007 — Public homepage

**Area:** Site
**Priority:** Medium
**Added:** 2026-03-21

## Description
The marketing homepage at the root of `apps/site` (Next.js). Server-rendered for SEO. Communicates the product value, features, and drives sign-up.

## Acceptance Criteria
- [ ] Hero section — headline, sub-headline, primary CTA ("Get started") linking to the web app
- [ ] Features section — 3–4 key benefits with icons
- [ ] How it works section — simple numbered steps
- [ ] Footer — links to directory, GitHub, and contact
- [ ] Fully server-rendered (no client components except interactive elements)
- [ ] Passes Lighthouse score ≥ 90 on performance and SEO
- [ ] `<head>` metadata: title, description, Open Graph tags

## Notes
Design tokens and components from `@club-manager/design-system`. Keep client JS minimal.
