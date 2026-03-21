# Club Manager — Backlog

Pending features organized by area. Each entry links to a file in `todo/` with full description and acceptance criteria.

When a feature is shipped: check off its criteria, add `Completed: YYYY-MM-DD`, move the file to `completed/`, and remove it from this index.

---

## Infrastructure

- [011 — CI pipeline](todo/011-ci-pipeline.md) — GitHub Actions: lint, typecheck, and test on every PR

## API

- [001 — JWT authentication](todo/001-auth-jwt.md) — User registration, login, and JWT-based auth
- [002 — Clubs CRUD (persistence)](todo/002-clubs-crud.md) — Wire clubs endpoints to a real database
- [003 — Members resource](todo/003-members-resource.md) — Join/leave clubs, list members per club

## Web

- [004 — Login & register page](todo/004-login-register-page.md) — Authentication UI for members
- [005 — Dashboard: clubs list](todo/005-dashboard-clubs-list.md) — Member dashboard showing available clubs
- [006 — Club detail & membership](todo/006-club-detail-membership.md) — Club detail view and join/leave actions

## Site

- [007 — Public homepage](todo/007-public-homepage.md) — Hero section, features overview, CTA
- [008 — Public club directory](todo/008-public-club-directory.md) — SEO-friendly listing of all public clubs

## Design System

- [009 — Form components](todo/009-form-components.md) — Input, Select, Textarea, Label, FormField
- [010 — Card & Badge components](todo/010-card-badge-components.md) — Card, CardHeader, CardBody, Badge
