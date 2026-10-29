---
agent-notes:
  ctx: "Codebase structural overview, architecture diagrams, module index, and test inventory"
  deps: ["codelol/"]
  state: active
  last: "diego@2026-10-29"
  key: ["UPDATE when adding packages, modules, or changing public APIs"]
---
# Code Map: CodeLOL

Structural overview of the CodeLOL codebase. Use this to orient yourself before diving into code.

---

## Architecture at a Glance

```
User Request (Browser)
   │
   ├── [Edge Middleware: proxy.ts] ── Auth Session Refresh & Route Protection
   │      │
   │      ├── /login ──────── Google OAuth / Direct Email OTP (6-8 digits)
   │      ├── /onboarding ─── Initial profile, handle, humor mode (General vs Tamil)
   │      └── Protected Routes (/, /learn, /problems, /battle, /leaderboard, /settings)
   │
   ├── [Code Execution Flow]
   │      │
   │      ├── JavaScript / JS:
   │      │     └── lib/executor.ts ── Isolated <iframe> sandbox="allow-scripts"
   │      │           ├── Strictly NO allow-same-origin (null origin, zero parent access)
   │      │           ├── postMessage IPC + 5000ms timeout
   │      │           └── Free in-browser execution (0 API quota)
   │      │
   │      └── Python / C / C++ / Java:
   │            └── app/api/run/route.ts ── Supabase Auth Verification + Rate Limiting
   │                  └── OnlineCompiler.io API Proxy (Python 3.14, GCC 15, G++ 15, OpenJDK 25)
   │
   └── [Feedback & Roast Pipeline]
          ├── Execution Output / Error
          ├── lib/fallbackRoasts.ts ── General or Tamil roast/celebration line
          └── lib/gifManifest.json ── Supabase Storage GIF reaction
```

---

## Dependency Graph

```
components/
  ├── Navbar.tsx ─────────── (navLinks: Learn, Library, Problems, Leaderboard, Battle, Friends, Quiz, Playground)
  ├── UserProgress.tsx ───── (XP, streak tracking, rank tier)
  ├── Bugsy.tsx ──────────── (Mascot mood states: idle, happy, laughing, thinking, dizzy)
  └── LanguageSwitcher.tsx ─ (Active curriculum language selection)

app/
  ├── layout.tsx ─────────── (Geist fonts, ConditionalLayout, AmbientJoke, scanline overlay)
  ├── proxy.ts ───────────── (Edge auth & onboarding gate)
  ├── api/
  │     ├── run/route.ts ─── (OnlineCompiler.io proxy for compiled languages; rejects JS)
  │     └── roast/route.ts ─ (AI & fallback roasts)
  └── problems/
        ├── ProblemsDashboardClient.tsx (Multi-language selector, chapter hierarchy, 3-step completion)
        └── [id]/page.tsx   (Problem arena, Monaco editor, sandboxed runner, test assertions)

lib/
  ├── executor.ts ────────── (Sandboxed iframe JS runner + compiled language dispatcher)
  ├── problems/ ──────────── (Multi-language challenge repositories: python, js, c, cpp, java)
  ├── progress.ts ────────── (Module completion status: not_started, lesson_read, challenge_solved, completed)
  ├── python/curriculum.ts ─ (15 chapters, 45 modular python lessons with dual-humor)
  └── supabase/ ──────────── (Server, client, and edge middleware clients)
```

---

## Package / Module Summaries

### `codelol/lib/executor.ts` — Sandboxed Code Execution
**Purpose:** Universal client-side execution routing.
- **JavaScript:** Runs exclusively inside an in-browser iframe with `sandbox="allow-scripts"` (strictly NO `allow-same-origin`) via `window.postMessage` with an execution timeout (5000ms).
- **Python, C, C++, Java:** Dispatched via authenticated POST to `/api/run`.

### `codelol/app/api/run/route.ts` — Server-Side Compilation Proxy
**Purpose:** Authenticated, rate-limited gateway for non-JS languages to OnlineCompiler.io.
- Enforces Supabase server authentication (`auth.getUser()`).
- Database-backed rate limiting per user.
- Rejects `javascript` and `js` with HTTP 400 Bad Request to guarantee free client-side execution.

### `codelol/lib/problems/` — Curriculum-Aligned Problems
**Purpose:** Provides coding challenges partitioned by language and mapped to curriculum modules.

| Module | Key Exports | Notes |
|---|---|---|
| `types.ts` | `ModuleProblem`, `ChapterProblemGroup`, `SupportedProblemLanguage`, `ProblemTier` | Core interfaces & schemas |
| `index.ts` | `getModuleProblems()`, `getModuleProblem()`, `getProblemsByChapter()`, `resolveActiveLanguage()`, `problems` | Primary API aggregator & legacy exports |
| `python.ts` | `pythonModuleProblems` | Python challenges with hidden test harnesses |
| `javascript.ts` | `javascriptModuleProblems` | JavaScript challenges with runner wrappers |
| `c.ts`, `cpp.ts`, `java.ts` | `cModuleProblems`, `cppModuleProblems`, `javaModuleProblems` | Compiled language challenge definitions |
| `legacy.ts` | `problems` | Backwards compatibility for battle & leaderboard |

### `codelol/lib/progress.ts` — Dual-Gate Progress & Module Completion
**Purpose:** Evaluates module and problem completion states for authenticated and guest users.
- 3-step completion tracking: `not_started` $\rightarrow$ `lesson_read` / `challenge_solved` $\rightarrow$ `completed` (100%).

---

## Complete Test Inventory (41 Suites, 187 Passing Tests)

| Subsystem | Test Files | Focus |
|---|---|---|
| **Auth & Routing** | `__tests__/login.test.tsx`<br>`__tests__/auth.test.tsx`<br>`__tests__/auth-callback.test.ts`<br>`__tests__/languageRouting.test.tsx` | Direct Email OTP (6–8 digits), Google OAuth, session refresh, language cookies |
| **Code Execution** | `lib/executor.test.ts`<br>`app/api/run/route.test.ts`<br>`__tests__/run.route.test.ts`<br>`__tests__/projectVerifier.test.ts` | Sandboxed iframe isolation, JS rejection at API, OnlineCompiler proxy, assertions |
| **Curriculum & Lessons**| `__tests__/python-curriculum.test.ts`<br>`__tests__/curriculum.test.ts`<br>`__tests__/lessonExplanationPage.test.tsx`<br>`__tests__/learn.test.tsx` | Chapter structure, baby-step lessons, dual-language humor rendering |
| **Problems & Dashboard**| `__tests__/moduleProblems.test.tsx`<br>`__tests__/problemsDashboard.test.tsx`<br>`__tests__/problems.ui.test.tsx`<br>`__tests__/multi-language-switching.test.tsx` | Language switching, chapter grouping, dual-gate completion, hints |
| **Social & Battles** | `__tests__/battles.test.ts`<br>`__tests__/useBattle.test.tsx`<br>`__tests__/friends.test.ts`<br>`__tests__/friends.ui.test.tsx`<br>`__tests__/friendbell.ui.test.tsx`<br>`__tests__/messages.test.ts`<br>`__tests__/messages.ui.test.tsx` | Realtime 1v1 match lifecycle, friend requests, notifications, direct chat |
| **Humor & Sounds** | `__tests__/roast.route.test.ts`<br>`__tests__/fallbackRoasts.test.ts`<br>`__tests__/useRoast.test.ts`<br>`__tests__/useMemeSound.test.ts`<br>`__tests__/useMicroCelebration.test.ts`<br>`__tests__/localGifs.test.ts` | General vs. Tamil fallback humor, audio trigger pipelines, GIF lookups |
| **Leaderboard & Profile**| `__tests__/leaderboard.test.tsx`<br>`__tests__/leaderboard-realtime.test.tsx`<br>`__tests__/settings.test.tsx`<br>`__tests__/onboarding.test.tsx`<br>`__tests__/progress.test.ts`<br>`__tests__/SkillTreeView.test.tsx` | XP scoring, speed rankings, avatar & humor preference updates |
| **Layout & Tutorials** | `__tests__/page.test.tsx`<br>`__tests__/layout.test.tsx`<br>`__tests__/unifiedTutorial.test.tsx`<br>`__tests__/complexityAnalyzer.test.ts`<br>`__tests__/quizzes.test.ts`<br>`__tests__/notifications.ui.test.tsx` | Shell navigation, scanline overlay, interactive tutorials, complexity estimation |
