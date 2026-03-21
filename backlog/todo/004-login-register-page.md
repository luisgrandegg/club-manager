# 004 — Login & register page

**Area:** Web
**Priority:** High
**Added:** 2026-03-21

## Description
Build the authentication UI in the React SPA. Members can register a new account or log in with an existing one. On success, the JWT is stored and the user is redirected to the dashboard.

## Acceptance Criteria
- [ ] `/login` route — email + password form, calls `POST /api/auth/login`
- [ ] `/register` route — email + password + confirm form, calls `POST /api/auth/register`
- [ ] JWT stored in memory (access token) and `httpOnly` cookie or `localStorage` (refresh token)
- [ ] Auth context / store provides `currentUser` and `logout` action throughout the app
- [ ] Protected routes redirect unauthenticated users to `/login`
- [ ] Form validation with inline error messages
- [ ] Loading and error states handled

## Notes
Use the SDK (`@club-manager/sdk`) for all API calls. Form components from `@club-manager/design-system` once feature 009 is done; otherwise use plain HTML inputs.
