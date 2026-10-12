<!-- agent-notes: { ctx: "Tracking artifact for universal OnlineCompiler API execution migration", deps: [codelol/app/api/run/route.ts, codelol/lib/executor.ts], state: active, last: "sato@2026-10-12" } -->

# Implementation Record: Universal OnlineCompiler.io Execution Migration

**Date:** 2026-10-12  
**Lead:** Sato (Implementation) & Tara (TDD)  
**Status:** Completed  

## Overview
Migrated code execution from client-side execution to the unified OnlineCompiler.io API across all supported languages (Python, C, C++, Java, and JavaScript/TypeScript via `typescript-deno`).

## Changes
1. **API Route (`codelol/app/api/run/route.ts`)**:
   - Expanded `COMPILER_MAP` to include:
     - `javascript`, `js`, `typescript`, `ts` → `typescript-deno`
     - `python`, `py`, `python-3.14` → `python-3.14`
     - `c`, `gcc-15` → `gcc-15`
     - `cpp`, `c++`, `g++-15` → `g++-15`
     - `java`, `openjdk-25` → `openjdk-25`
     - Additional supported targets: C#, PHP, Ruby, Go, Rust.
   - Removed the 400 block restricting JavaScript to client-side.
   - Added assertion injection and extraction support for Deno (`typescript-deno`) and Python (`python-3.14`).

2. **Client Executor (`codelol/lib/executor.ts`)**:
   - Updated `executeCode()` to route all code executions via `/api/run` to OnlineCompiler.io.
   - Included resilient offline / test environment fallback for JavaScript when `/api/run` is unreachable.

3. **Curriculum & Types**:
   - Extended `WorkoutStep` in `codelol/lib/lessons/types.ts` with optional `stepNumber`, `explanation`, `proudGeneral`, `proudTamil`, and `practicePrompt`.
   - Exported `getLessonCategories`, `getAllLessons`, `getCurriculum`, and types from `codelol/lib/lessons/index.ts`.
   - Fixed `LessonCard` in `codelol/app/lessons/page.tsx` with default `learningLanguage = 'javascript'`.

4. **Testing & Verification**:
   - Updated `codelol/app/api/run/route.test.ts` to test `javascript` compilation mapping to `typescript-deno`.
   - Updated `codelol/lib/executor.test.ts` to verify `javascript` calls `/api/run`.
   - 37 / 37 test suites passing (124 tests).
   - TypeScript check (`npx tsc --noEmit`) passes with 0 errors.
   - Next.js production build (`npm run build`) succeeded with exit code 0.
