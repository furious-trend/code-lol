<!-- agent-notes: { ctx: "session handoff for universal onlinecompiler execution", deps: [AGENTS.md, docs/code-map.md, docs/tracking/2026-10-12-onlinecompiler-universal-execution.md], state: active, last: "sato@2026-10-12" } -->

# Session Handoff

**Created:** 2026-10-12  
**Lead:** sato (Implementation) & tara (TDD)  
**Session summary:** Migrated universal compilation across all language tracks to OnlineCompiler.io via `/api/run`, mapping JavaScript/TypeScript to `typescript-deno`, Python to `python-3.14`, C to `gcc-15`, C++ to `g++-15`, and Java to `openjdk-25`.

## What Was Done
- **API Proxy Route (`app/api/run/route.ts`)**: Expanded `COMPILER_MAP` for all tracks and aliases (including `javascript`, `js`, `typescript`, `ts` -> `typescript-deno`, and direct compiler identifiers). Supported assertion verification pipelines for both Deno and Python.
- **Client Executor (`lib/executor.ts`)**: Deprecated isolated client-side execution; all execution requests route through `/api/run` to the OnlineCompiler API.
- **Curriculum & Types**: Fixed `WorkoutStep` in `lib/lessons/types.ts`, exported `getLessonCategories` in `lib/lessons/index.ts`, and resolved `LessonCard` parameter defaults in `app/lessons/page.tsx`.
- **Automated Tests**: Updated `app/api/run/route.test.ts` and `lib/executor.test.ts` to test `javascript` compilation through OnlineCompiler. All 37 test suites (124 tests) passing.
- **Build Verification**: Clean `tsc --noEmit` and clean `npm run build` with Turbopack.

## Current State
- **Branch:** main
- **Tests:** 124 passing tests across 37 test suites.
- **Typecheck:** 0 errors.
- **Production Build:** `npm run build` succeeds cleanly with exit code 0.

