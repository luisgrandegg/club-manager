# 005 — Dashboard: clubs list

**Area:** Web
**Priority:** High
**Added:** 2026-03-21
**Completed:** 2026-03-21

## Description
The main authenticated view. Shows all available clubs with the ability to join them. Highlights the clubs the current user is already a member of.

## Acceptance Criteria
- [x] `/dashboard` route (protected) — fetches and displays paginated list of clubs
- [x] Each club shows name, city, and description
- [x] "Join" button for clubs the user hasn't joined; "Joined" badge for ones they have
- [x] Joining a club calls `POST /api/clubs/:id/members/join` and updates UI optimistically
- [x] Search / filter by club name
- [x] Empty state when no clubs exist
- [x] Loading skeleton while fetching
