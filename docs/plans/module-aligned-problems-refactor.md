---
agent-notes: { ctx: "implementation plan for module-aligned multi-language problems refactor", deps: [codelol/app/problems/, codelol/lib/problems/, docs/adrs/0006-module-aligned-problem-hierarchy.md], state: active, last: "pat@2026-10-28" }
---

# Plan: Module-Aligned Multi-Language Problems Refactor

## Goal
Refactor the Problems page (`/problems` and `/problems/[id]`) to mirror the multi-language separation of the Library page (`/lessons`), group challenges by the exact module/chapter hierarchy found in the curriculum, and tie module completion to both reading the lesson and solving the corresponding module coding challenge.

## Constraints
- Support 5 languages: Python, JavaScript, C, C++, Java.
- Maintain backward compatibility for `/battle` and `/leaderboard` which query `problems`.
- Adhere to the `ModuleProblem` schema with hidden assertions outputting `===TEST_RESULTS===`.
- Support bilingual hints (English and Tamil comedic roast).

## Architecture Gate Items
- ADR-0006 accepted for modular `lib/problems/` package structure and dual-source module completion.

## Approach (TDD)
1. **Red**: Author tests in `__tests__/moduleProblems.test.ts` for schema compliance, language filtering, chapter grouping, and dual-gate completion.
2. **Green**:
   - Create `codelol/lib/problems/types.ts`
   - Create `codelol/lib/problems/python.ts`, `javascript.ts`, `c.ts`, `cpp.ts`, `java.ts`
   - Create `codelol/lib/problems/index.ts`
   - Update `codelol/lib/progress.ts`
   - Update `codelol/app/problems/page.tsx` & `ProblemsDashboardClient.tsx`
   - Update `codelol/app/problems/[id]/page.tsx`
3. **Refactor & Verify**:
   - Run vitest test suite
   - Validate UI interactions

## Acceptance Criteria
- Language selector bar on `/problems` updates query param and state without page reloads.
- Problem list grouped by chapter/module hierarchy matching `/lessons`.
- Dual-gate completion tracked and displayed accurately.
- `/problems/[id]` displays hints and executes test harness with `===TEST_RESULTS===`.
