# 001 — JWT authentication

**Area:** API
**Priority:** High
**Added:** 2026-03-21

## Description
Implement user registration and login endpoints secured with JWT. Protect all existing resource endpoints with a JWT guard. Provide a refresh-token flow so sessions can be renewed without re-login.

## Acceptance Criteria
- [ ] `POST /api/auth/register` — create a new user (email + password, bcrypt hashed)
- [ ] `POST /api/auth/login` — returns `access_token` (short-lived) and `refresh_token` (long-lived)
- [ ] `POST /api/auth/refresh` — exchanges a valid refresh token for a new access token
- [ ] JWT guard applied globally; public routes decorated with `@Public()`
- [ ] User entity persisted in database with `id`, `email`, `passwordHash`, `createdAt`
- [ ] Auth endpoints documented in OpenAPI spec
- [ ] SDK regenerated after spec update

## Notes
Use `@nestjs/jwt` and `passport-jwt`. Store refresh tokens in the DB (or Redis) to allow revocation.
