---
agent-notes:
  ctx: "codebase structural overview for humans and agents"
  deps: []
  state: stub
  last: "coordinator@2026-02-15"
  key: ["UPDATE when adding packages, modules, or changing public APIs"]
---
# Code Map

Structural overview of the codebase. Use this to orient yourself before diving into code. **Keep this up to date** — when you add a package, module, or significantly change a public API, update this file.

Read this file at the start of every session instead of exploring the codebase from scratch.

## Architecture at a Glance

<!-- Add an ASCII diagram showing data flow and high-level component relationships -->
<!-- Example:
```
Input → Processing → Output
  │         │          │
  └── storage ─────────┘
```
-->

## Dependency Graph

<!-- Show which packages/modules depend on which -->
<!-- Example:
```
core ────── (no deps — foundational types)
  ├── api ─── (HTTP layer)
  ├── db ──── (data access)
  └── cli ─── (depends on all packages)
```
-->

## Package / Module Summaries

### `codelol/lib/problems/` — Multi-Language Curriculum-Aligned Problems

**Purpose:** Provides coding challenges partitioned by programming language (JavaScript, Python, C, C++, Java) and mapped to curriculum modules.

| Module | Key Exports | Notes |
|--------|------------|-------|
| `lib/problems/types.ts` | `ModuleProblem`, `ChapterProblemGroup`, `SupportedProblemLanguage`, `ProblemTier` | Core interfaces & schemas |
| `lib/problems/index.ts` | `getModuleProblems()`, `getModuleProblem()`, `getProblemsByChapter()`, `resolveActiveLanguage()`, `problems` | Primary API aggregator & legacy export |
| `lib/problems/python.ts` | `pythonModuleProblems` | Python curriculum module challenges with test harnesses |
| `lib/problems/javascript.ts` | `javascriptModuleProblems` | JavaScript challenges with runner wrappers |
| `lib/problems/c.ts`, `cpp.ts`, `java.ts` | `cModuleProblems`, `cppModuleProblems`, `javaModuleProblems` | C, C++, Java challenges with hidden harnesses |
| `lib/problems/legacy.ts` | `problems` | Backwards compatibility for battle & leaderboard |

### `codelol/lib/progress.ts` — Dual-Gate Progress & Module Completion

**Purpose:** Evaluates module and problem completion states for authenticated and guest users.

| Module | Key Exports | Notes |
|--------|------------|-------|
| `lib/progress.ts` | `isModuleComplete()`, `getModuleCompletionStatus()`, `saveProblemCompletion()` | 3-step completion logic (Not Started, In Progress, 100% Completed) |

## Test Inventory

| Package | Test Files | Tests | Focus |
|---------|-----------|-------|-------|
| problems | `__tests__/moduleProblems.test.tsx` | 19 | Language filtering, schema validation, chapter grouping, 3-step completion |
| problems-ui | `__tests__/problemsDashboard.test.tsx`, `__tests__/problems.ui.test.tsx` | 3 | Dashboard filter toggles, execution feedback animations |

## Key Type Flow

<!-- Document how data flows through the system's type hierarchy -->
<!-- Example: RawInput → ValidatedInput → ProcessedResult → OutputFormat -->

## Config Structure

<!-- Document config files, environment variables, and their relationships -->
