# 004 — Login & register page

**Area:** Web
**Priority:** High
**Added:** 2026-03-21
**Completed:** 2026-03-21

## Description
Build the authentication UI in the React SPA. Members can register a new account or log in with an existing one. On success, the JWT is stored and the user is redirected to the dashboard.

## Acceptance Criteria
- [x] `/login` route — email + password form, calls `POST /api/auth/login`
- [x] `/register` route — email + password + confirm form, calls `POST /api/auth/register`
- [x] JWT stored in memory (access token) and `localStorage` (refresh token)
- [x] Auth context / store provides `currentUser` and `logout` action throughout the app
- [x] Protected routes redirect unauthenticated users to `/login`
- [x] Form validation with inline error messages
- [x] Loading and error states handled
