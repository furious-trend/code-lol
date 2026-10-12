---
agent-notes: { ctx: "code review document for multi-language switching architecture", deps: [codelol/components/LanguageToggleBar.tsx, codelol/lib/lessons/index.ts, codelol/app/lessons/page.tsx, codelol/app/learn/page.tsx], state: active, last: "vik@2026-10-12" }
---

# Code Review: Multi-Language Switching Architecture Across /lessons and /learn

**Date:** 2026-10-12  
**Reviewers:** Vik (Simplicity & Systems), Tara (Testing & Behaviors), Pierrot (Security & State)  
**Status:** Approved (Passes Done Gate)

## Summary of Changes
Addresses language stickiness and routing divergence where `/lessons` and `/learn` defaulted to JavaScript instead of switching to Python. Implemented a deterministic resolution cascade, an instant track toggle bar (`LanguageToggleBar`), cookie-assisted Server Component hydration, and unified curriculum exports.

---

## Lens 1: Vik (Simplicity, Maintainability & Performance)
- **Architecture**: The resolution hierarchy (`searchParams` -> `profile` -> `cookie` -> `localStorage` -> `'javascript'`) removes ambiguous state branching and race conditions.
- **Server Component Performance**: Using the `learning_language` cookie allows `app/learn/page.tsx` to render the correct track on the very first SSR response, avoiding client-side redirect loops and layout shift.
- **Complexity**: Clean separation between `PythonLessonsView` and `DefaultLessonsView` in `app/lessons/page.tsx` makes the page structure legible and easy to maintain.
- **Findings**: Clean bill of health. No unnecessary abstractions.

## Lens 2: Tara (Test Quality & Coverage)
- **TDD Adherence**: Followed strict Red-Green cycle. Red phase verified `getLessonsByLanguage` failure prior to implementation.
- **Coverage**: Added [`__tests__/languageRouting.test.tsx`](file:///home/shafi/projects/code%20lol/codelol/__tests__/languageRouting.test.tsx) and [`__tests__/multi-language-switching.test.tsx`](file:///home/shafi/projects/code%20lol/codelol/__tests__/multi-language-switching.test.tsx), covering curriculum routing, toggle bar mutations, URL pushing, and component mounting.
- **Full Suite**: 37/37 test files passed, 124/124 tests passed (100% pass rate).
- **Findings**: Clean bill of health.

## Lens 3: Pierrot (Security Surface)
- **Input Sanitization**: Query parameter inputs are strictly validated against an allowlist of supported languages (`['python', 'javascript', 'c', 'cpp', 'java']`) before assignment, preventing prototype pollution or injection.
- **Cookie Security**: `learning_language` cookie uses `SameSite=Lax` and is purely an interface preference with no sensitive authentication data.
- **Auth Guarding**: Supabase profile updates only run when `user && user.id !== 'local-guest'`.
- **Findings**: Clean bill of health.

---

## Lessons & Takeaways
1. **Bridging SSR & Client Storage**: Async Server Components cannot read `localStorage`. In hybrid Next.js architectures, persisting user UI preferences into lightweight cookies provides immediate SSR awareness without client-side redirect flashes.
2. **Deterministic Cascades**: Multi-source preference resolution (query param, database, cookie, local storage) must always have an explicit priority order and safe fallback.
