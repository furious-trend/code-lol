---
agent-notes: { ctx: "ADR for module-aligned multi-language problem hierarchy and dual-source completion", deps: [codelol/lib/problems/, codelol/lib/lessons/, AGENTS.md], state: active, last: "archie@2026-10-28" }
---

# ADR-0006: Module-Aligned Multi-Language Problem Hierarchy & Dual-Source Completion

## Status

Accepted

## Context

CodeLOL's Problems page (`/problems`) was previously structured as a single 65-level numerical progression decoupled from the rest of the learning platform. Meanwhile, the Library page (`/lessons`) evolved into a rich, multi-language tutorial hub supporting JavaScript, Python, C, C++, and Java with detailed chapter and module breakdowns.

Users faced two main friction points:
1. No multi-language separation on `/problems`: challenges did not match the user's active language or track.
2. Disconnected progression: reading a lesson on `/lessons` and solving a problem on `/problems` had no unified sense of mastery.

We need a clean architecture that:
- Decomposes problem definitions by language into structured modules mapping directly to curriculum chapters and lessons (`moduleId`, `chapterId`).
- Defines a strict `ModuleProblem` schema including starter code, hidden assertions appending `===TEST_RESULTS===`, and bilingual hints (English + Tamil roast).
- Pairs reading completion (`library_progress`) and challenge completion (`problem_completions`) into a unified **Module Complete** status.

## Decision

1. **Reorganize Problem Definitions**:
   Replace the monolithic `lib/problems.ts` file with a modular directory `lib/problems/`:
   - `types.ts`: Defines `ModuleProblem`, `Problem`, `Difficulty`, `TestCase`.
   - `python.ts`, `javascript.ts`, `c.ts`, `cpp.ts`, `java.ts`: Language-specific module problem collections mapped to curriculum chapters.
   - `index.ts`: Unified export providing `getModuleProblems(lang)`, `getModuleProblem(id, lang?)`, `getProblemsByChapter(lang)`, and a backward-compatible `problems: Problem[]` export.

2. **Universal Test Results Contract**:
   All 5 languages will utilize a test harness that outputs a standardized machine-readable marker:
   `===TEST_RESULTS===` followed by a JSON payload `{"passed": number, "total": number, "log": string[]}`.

3. **Dual-Gate Module Completion**:
   A module is officially completed (`isModuleComplete === true`) if and only if:
   - The lesson has been marked as read in `library_progress` (or `learned_topics_${lang}` for guests).
   - The corresponding module coding challenge is passed in `problem_completions` (or `completedProblems_${lang}` for guests).

4. **Preserve Backward Compatibility**:
   `lib/problems/index.ts` continues to export the legacy `problems` array to keep battle and leaderboard routes fully functional.

## Consequences

### Positive
- Direct alignment between tutorial reading and interactive coding challenges.
- First-class support for Python, JavaScript, C, C++, and Java challenges.
- Clear visual 3-state progression (Lesson 📖, Challenge 💻, Complete 🏆) boosts learning engagement.
- Clean separation of concern with per-language problem definitions.

### Negative
- Requires maintaining test harnesses across 5 execution runtimes.
- Higher data loading complexity on `/problems` (queries both `problem_completions` and `library_progress`).

### Neutral
- Legacy `Problem` type is maintained alongside `ModuleProblem` via an adapter layer.
