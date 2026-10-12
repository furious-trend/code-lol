---
agent-notes: { ctx: "implementation tracking for language switching fixes", deps: [codelol/lib/lessons/index.ts, codelol/app/lessons/page.tsx, codelol/app/learn/page.tsx, codelol/components/LanguageToggleBar.tsx], state: active, last: "sato@2026-10-12" }
---

# Implementation: Language Switching Fixes Across /lessons and /learn

**Date:** 2026-10-12
**Lead:** sato (Implementation) & tara (TDD)
**Status:** Complete
**Prior Phase:** `/home/shafi/.gemini/antigravity-ide/brain/ba1aa4b3-583e-4249-9b0d-25c9350330f4/multi_language_switching_plan.md`

## Key Decisions
- Chose deterministic active-language cascade: 1. `searchParams` (`?lang=`), 2. authenticated Supabase `profile.learning_language`, 3. client cookie `learning_language`, 4. `localStorage('guest_lang')`, 5. fallback `'javascript'`.
- Chose client cookie synchronization (`learning_language=<lang>`) in `LanguageToggleBar` and `LanguageSwitcher` to solve Server Component / client storage asymmetry on `/learn` without requiring flash-of-content redirects.
- Chose extracting `DefaultLessonsView` in `app/lessons/page.tsx` for clean conditional rendering against `PythonLessonsView`.
- Chose exporting `getLessonsByLanguage(lang)` in `lib/lessons/index.ts` returning `pythonCurriculum` when `lang === 'python'`.
- Chose wrapping Supabase auth checks in `try/catch/finally` so unauthenticated or offline guests never fail to resolve client preferences.

## Artifacts Produced
- `codelol/lib/lessons/index.ts`: Exported `pythonCurriculum`, `getCurriculum`, and `getLessonsByLanguage`.
- `codelol/components/LanguageToggleBar.tsx`: Instant UI pill selector (`JavaScript`, `Python`, `C`, `C++`, `Java`) updating URL query params, cookies, localStorage, Supabase profile, and triggering `router.refresh()`.
- `codelol/app/lessons/page.tsx`: Added `DefaultLessonsView`, `LanguageToggleBar`, and safe preference resolution.
- `codelol/app/learn/page.tsx`: Added cookie and searchParams inspection, mounted `LanguageToggleBar`, and cleanly rendered `LearnPagePythonClient` vs `LearnPageClient`.
- `codelol/app/learn/LearnPageClient.tsx`: Synced active language state with props and removed legacy redirect loops.
- `codelol/components/LanguageSwitcher.tsx`: Synchronized cookie and searchParams propagation.
- `codelol/components/Navbar.tsx`: Localized `/learn` and `/lessons` navigation links via active language cookie.
- `codelol/__tests__/languageRouting.test.tsx`: TDD automated test suite validating curriculum resolution, `/lessons` mounting, and `/learn` mounting.
- `codelol/__tests__/multi-language-switching.test.tsx`: Unit tests for `LanguageToggleBar` and curriculum functions.

## Test Results
- Vitest: 37/37 test files passed, 124/124 tests passed (100% pass rate).
- Content validation: Python content validated successfully across all chapters (`validate-python-content.ts`).
- Full npm test suite: `npm test` exited cleanly with code 0.
- TypeScript typecheck: `tsc --noEmit` passed with 0 errors.

## Open Questions
- None.

## Next Phase
- Complete.
