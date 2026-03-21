# 009 — Form components

**Area:** Design System
**Priority:** High
**Added:** 2026-03-21

## Description
Foundational form primitives used across both `apps/web` and `apps/site`. Accessible, styled consistently, and compatible with React Hook Form.

## Acceptance Criteria
- [x] `Input` — text input with label, placeholder, error state, disabled state
- [x] `Textarea` — multi-line input with same states as Input
- [x] `Select` — single-select dropdown
- [x] `Label` — accessible label element, supports required indicator
- [x] `FormField` — wrapper composing Label + control + error message
- [x] All components forward refs
- [x] Exported from `@club-manager/design-system` package entrypoint
- [x] Storybook stories (or equivalent) for each component
- [x] Full TypeScript types exported

## Notes
Base on native HTML elements for maximum accessibility. Avoid heavy headless UI libraries unless needed.

**Completed:** 2026-03-21
