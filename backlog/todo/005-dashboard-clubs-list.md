# 005 — Dashboard: clubs list

**Area:** Web
**Priority:** High
**Added:** 2026-03-21

## Description
The main authenticated view. Shows all available clubs with the ability to join them. Highlights the clubs the current user is already a member of.

## Acceptance Criteria
- [ ] `/dashboard` route (protected) — fetches and displays paginated list of clubs
- [ ] Each club shows name, city, and member count
- [ ] "Join" button for clubs the user hasn't joined; "Joined" badge for ones they have
- [ ] Joining a club calls `POST /api/clubs/:id/members` and updates UI optimistically
- [ ] Search / filter by club name
- [ ] Empty state when no clubs exist
- [ ] Loading skeleton while fetching

## Notes
Use `@club-manager/sdk` for data fetching. Card component from design-system (feature 010) once available.
