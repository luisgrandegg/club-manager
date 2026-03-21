# 006 — Club detail & membership management

**Area:** Web
**Priority:** Medium
**Added:** 2026-03-21
**Completed:** 2026-03-21

## Description
Dedicated page for a single club showing full details, the member list, and management actions for the club owner.

## Acceptance Criteria
- [x] `/clubs/:id` route — shows club name, description, city, owner, and member list
- [x] Join / Leave button for non-owners
- [x] Club owner sees Edit and Delete actions
- [x] Edit opens an inline form to update name/description/city
- [x] Delete prompts confirmation, then calls `DELETE /api/clubs/:id` and redirects to dashboard
- [x] 404 page if club not found
