# 001 — JWT authentication

**Area:** API
**Priority:** High
**Added:** 2026-03-21

## Description
Implement user registration and login endpoints secured with JWT. Protect all existing resource endpoints with a JWT guard. Provide a refresh-token flow so sessions can be renewed without re-login.

## Acceptance Criteria
- [x] `POST /api/auth/register` — create a new user (email + password, bcrypt hashed)
- [x] `POST /api/auth/login` — returns `access_token` (short-lived) and `refresh_token` (long-lived)
- [x] `POST /api/auth/refresh` — exchanges a valid refresh token for a new access token
- [x] JWT guard applied globally; public routes decorated with `@Public()`
- [x] User entity persisted in database with `id`, `email`, `passwordHash`, `createdAt`
- [x] Auth endpoints documented in OpenAPI spec
- [x] SDK regenerated after spec update

## Notes
Use `@nestjs/jwt` and `passport-jwt`. Store refresh tokens in the DB (or Redis) to allow revocation.

**Completed:** 2026-03-21
