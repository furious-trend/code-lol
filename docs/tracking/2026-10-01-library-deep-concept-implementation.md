---
agent-notes: { ctx: "implementation tracking for library-deep-concept", deps: ["@/lib/lessons/types.ts", "@/app/lessons/[id]/page.tsx"], state: active, last: "sato@2026-10-01" }
---

# Implementation: Library Deep Concept Overhaul

**Date:** 2026-10-01
**Lead:** Tara (via Sato)
**Status:** Complete
**Prior Phase:** None

## Key Decisions
- Chose to make `deepConcept`, `humor`, and `workoutSteps` optional in `lib/lessons/types.ts` because a massive 400+ lesson migration in one go is unfeasible without breaking the app.
- Chose to use Regex `.toMatch(/.../)` in vitest for `LessonExplanationPage` because React's text rendering inserts HTML entities / quotes into `getByText()` matches for dynamic strings.
- Chose to inject `triggerShake()` with `framer-motion` `animate={{ x: [-8,8,-6,6,-3,3,0] }}` in `LearnPageClient.tsx` because it's lightweight and directly matches the user's cyber-arcade physics spec.

## Artifacts Produced
- `lib/lessons/types.ts`
- `app/lessons/[id]/page.tsx`
- `app/learn/LearnPageClient.tsx`
- `__tests__/lessonExplanationPage.test.tsx`

## Open Questions
- When will we migrate all the 400+ lessons to the new deep concept schema?
- Are there further cyber-arcade UI updates needed beyond the screen shake?

## Next Phase
- The user also requested "Social Battles". We need to plan and implement this next.
