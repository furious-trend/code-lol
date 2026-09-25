---
agent-notes: { ctx: "implementation tracking for auth simplification", deps: [codelol/app/login/page.tsx, codelol/app/onboarding/page.tsx, codelol/app/settings/SettingsPageClient.tsx], state: active, last: "tara@2026-09-25" }
---

# Implementation: Simplify Auth to Google-Only

**Date:** 2026-09-25
**Lead:** Tara
**Status:** Complete
**Prior Phase:** None

## Key Decisions
- Chose to completely rewrite `app/login/page.tsx` instead of incrementally editing it, because the majority of the code was password-based auth and tab-switching logic.
- Chose to remove all password validation logic and `isPasswordUser` checks from `SettingsPageClient.tsx` because Google auth makes them obsolete.
- Chose to replace the entire auth test suite rather than adapting it, as all previous tests simulated password and forgot-password flows.
- Chose to remove `/forgot-password` and `/reset-password` from Next.js middleware public routes since those pages were deleted.

## Artifacts Produced
- Updated `codelol/app/login/page.tsx` (Google-only login)
- Updated `codelol/app/onboarding/page.tsx` (2-step wizard)
- Updated `codelol/app/settings/SettingsPageClient.tsx` and `page.tsx`
- Deleted `codelol/app/forgot-password` and `codelol/app/reset-password`
- Updated test files in `codelol/__tests__`
- Updated `codelol/lib/supabase/middleware.ts`

## Open Questions
- None.

## Next Phase
- Code Review (Vik + Tara + Pierrot) or move to Done Gate.
