# 003 — Members resource

**Area:** API
**Priority:** Medium
**Added:** 2026-03-21

## Description
Allow authenticated users to join and leave clubs. Expose endpoints to list members of a club and list clubs a user belongs to.

## Acceptance Criteria
- [x] `POST /api/clubs/:id/members` — authenticated user joins the club
- [x] `DELETE /api/clubs/:id/members/me` — authenticated user leaves the club
- [x] `GET /api/clubs/:id/members` — list all members of a club
- [x] `GET /api/users/me/clubs` — list clubs the current user has joined
- [x] Prevent duplicate memberships (409 if already a member)
- [x] Club owner cannot leave their own club (must transfer or delete)
- [x] OpenAPI spec and SDK regenerated

## Notes
Membership is a join table: `ClubMember { clubId, userId, joinedAt }`.

**Completed:** 2026-03-21
