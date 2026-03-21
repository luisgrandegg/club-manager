# 009 — Form components

**Area:** Design System
**Priority:** High
**Added:** 2026-03-21

## Description
Foundational form primitives used across both `apps/web` and `apps/site`. Accessible, styled consistently, and compatible with React Hook Form.

## Acceptance Criteria
- [ ] `Input` — text input with label, placeholder, error state, disabled state
- [ ] `Textarea` — multi-line input with same states as Input
- [ ] `Select` — single-select dropdown
- [ ] `Label` — accessible label element, supports required indicator
- [ ] `FormField` — wrapper composing Label + control + error message
- [ ] All components forward refs
- [ ] Exported from `@club-manager/design-system` package entrypoint
- [ ] Storybook stories (or equivalent) for each component
- [ ] Full TypeScript types exported

## Notes
Base on native HTML elements for maximum accessibility. Avoid heavy headless UI libraries unless needed.
