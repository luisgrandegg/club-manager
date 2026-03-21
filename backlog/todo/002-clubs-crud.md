# 002 — Clubs CRUD (persistence)

**Area:** API
**Priority:** High
**Added:** 2026-03-21

## Description
The clubs endpoints already exist as a skeleton returning mock data. Wire them to a real database using TypeORM (or Prisma). Add proper validation, error handling, and owner-based authorization so only the club creator can update or delete their club.

## Acceptance Criteria
- [ ] Database connection configured (TypeORM or Prisma)
- [ ] `Club` entity persisted with `id`, `name`, `description`, `city`, `ownerId`, `createdAt`
- [ ] `GET /api/clubs` — paginated list
- [ ] `GET /api/clubs/:id` — single club or 404
- [ ] `POST /api/clubs` — creates club, sets `ownerId` from JWT subject
- [ ] `PATCH /api/clubs/:id` — updates club; 403 if requester is not owner
- [ ] `DELETE /api/clubs/:id` — deletes club; 403 if requester is not owner
- [ ] Input validated with `class-validator` DTOs
- [ ] OpenAPI spec and SDK regenerated

## Notes
Database choice (Postgres recommended). Use Docker Compose for local dev DB.
