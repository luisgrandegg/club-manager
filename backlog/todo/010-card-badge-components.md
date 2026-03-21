# 010 — Card & Badge components

**Area:** Design System
**Priority:** Medium
**Added:** 2026-03-21

## Description
Card and Badge primitives used in club listings, member views, and the public site.

## Acceptance Criteria
- [ ] `Card` — container with border, shadow, and padding; composable with sub-components
- [ ] `CardHeader` — optional top section with title and optional action slot
- [ ] `CardBody` — main content area
- [ ] `CardFooter` — optional bottom section
- [ ] `Badge` — inline label with variants: `default`, `success`, `warning`, `danger`
- [ ] All components exported from `@club-manager/design-system`
- [ ] Full TypeScript types exported

## Notes
Keep markup minimal. Styling via CSS Modules or the existing styling approach in the design-system package.
