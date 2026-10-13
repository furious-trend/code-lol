---
agent-notes: { ctx: "implementation plan for unifying learn and library into w3schools tutorial hub", deps: [codelol/app/learn/page.tsx, codelol/app/lessons/page.tsx, codelol/lib/lessons/index.ts], state: active, last: "pat@2026-10-13" }
---

# Plan: Unified W3Schools-Style Learning & Library Hub

## Goal
Unify CodeLOL's separate `/learn` and `/lessons` pages into a single, cohesive, modern W3Schools-inspired documentation, tutorial, and interactive programming platform covering **Python, JavaScript, C, C++, and Java**.

## Constraints
- Must maintain 100% backward compatibility with existing tests and routing (`searchParams.lang`).
- Keep CodeLOL's unique comedic mascot features (Bugsy roasts, Tamil/English humor toggle) integrated seamlessly into the clean W3Schools layout.
- High performance: Monaco editor dynamically loaded, instantaneous sidebar search filtering.

## Architecture Gate Items
- None required. Consolidation of client views using existing data sources and executor APIs.

## Approach (TDD)
1. **Red**: Author tests in `__tests__/unifiedTutorial.test.tsx` verifying normalized topic resolution, sidebar filtering, and example runner behavior.
2. **Green**:
   - Create `lib/lessons/unifiedTopics.ts` mapping all lessons across 5 languages into standard W3 topics with chapters and examples.
   - Build W3Schools components: `TutorialSidebar`, `ExampleCard`, `TryItYourselfEditor`, `ExerciseBox`.
   - Implement `UnifiedTutorialClient` and connect into `app/learn/page.tsx` and `app/lessons/page.tsx`.
   - Update `components/Navbar.tsx` to streamline navigation.
3. **Refactor & Polish**:
   - Ensure responsive mobile drawer for index sidebar.
   - Validate full test suite (`npm test -- --run`).
   - Run multi-lens code review (`/code-review`).

## Personas Involved
- **Pat**: Scope & product alignment.
- **Tara**: TDD test specification.
- **Sato**: Implementation.
- **Vik + Pierrot**: Code review (maintainability, performance, security).

## Open Questions
- None. Requirements directly specify W3Schools layout, example programs, index sidebar, and 5 languages.

## Acceptance Criteria
- All 5 languages (Python, JS, C, C++, Java) have searchable W3Schools index sidebar.
- Each topic features concept explanation, example code box with "Try it Yourself »", live Monaco runner, and mini-exercise.
- Switching languages or topics updates the URL seamlessly.
- All existing and new automated tests pass cleanly.
