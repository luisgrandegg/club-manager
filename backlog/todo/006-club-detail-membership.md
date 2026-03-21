# 006 — Club detail & membership management

**Area:** Web
**Priority:** Medium
**Added:** 2026-03-21

## Description
Dedicated page for a single club showing full details, the member list, and management actions for the club owner.

## Acceptance Criteria
- [ ] `/clubs/:id` route — shows club name, description, city, owner, and member list
- [ ] Join / Leave button for non-owners
- [ ] Club owner sees Edit and Delete actions
- [ ] Edit opens an inline form (or modal) to update name/description/city
- [ ] Delete prompts confirmation, then calls `DELETE /api/clubs/:id` and redirects to dashboard
- [ ] 404 page if club not found

## Notes
Depends on feature 003 (members resource) for the member list.
