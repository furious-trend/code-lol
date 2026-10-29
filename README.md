<!-- agent-notes: { ctx: "Complete project documentation for CodeLOL", deps: ["codelol/"], state: active, last: "diego@2026-10-29" } -->
# CodeLOL: Complete Project Documentation

**Updated:** October 29, 2026 (Reflecting Commits `985b348` & `c1172b7` Post-Audit Architecture)  
**Repository:** `https://github.com/furious-trend/code-lol.git`  
**Subfolder:** `codelol/` (Next.js Application Root)  
**Production URL:** `https://code-lol-three.vercel.app`  

---

## 1. Project Overview & Core Identity

CodeLOL is a free, gamified coding platform that teaches programming through humor. An automated roast engine reacts to user code with quick jokes and GIFs. Every joke has two distinct styles chosen at onboarding:
- **General Humor:** Universal developer/tech struggles, internet memes, and daily life.
- **Tamil Humor:** Kollywood movie quotes (Vadivelu, Santhanam, Leo), Tamil meme culture, ration shop analogies, and college fees roasts.

### Builder & Philosophy
- **Creator:** Shafiq, final-year CSE student.
- **Architecture:** Zero paywall, no paid external AI subscriptions, minimal external dependencies.
- **Agent Framework:** vteam-hybrid agent framework (`.agents/`, `AGENTS.md`) with Tara subagent for test-driven feature development.

---

## 2. Technical Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.2 (App Router, Turbopack) |
| **UI Library** | React 19.2, Tailwind CSS v4, Framer Motion 13 |
| **Code Editor** | Monaco Editor |
| **Database & Auth** | Supabase (PostgreSQL, Auth with Google + Email OTP, Realtime, Storage) |
| **Execution Engines** | **JavaScript:** Client-side sandboxed iframe (`lib/executor.ts`)<br>**Python, C, C++, Java:** Server-side via `app/api/run/route.ts` (OnlineCompiler.io) |
| **Testing** | Vitest + Testing Library (jsdom), 41 test suites, 187 unit tests |
| **Hosting** | Vercel (Root set to `codelol/`, `buildCommand: next build`, `outputDirectory: .next`) |

---

## 3. Architecture & Routing

### Auth & Protection Gate (`proxy.ts`)
- In Next.js 16, `middleware.ts` is named `proxy.ts`.
- Manages Supabase session refreshes.
- Enforces redirection to `/login` for unauthenticated requests.
- Directs users with incomplete profiles (`onboarding_complete === false`) to `/onboarding`.
- Public paths: `/api/`, `/auth/callback`, `/login`.

### API Security & Rate Limiting
- `app/api/run/route.ts`: Authenticated via Supabase Server Client (`supabase.auth.getUser()`). Returns 401 for anonymous calls.
- Enforces a 20,000-character payload limit.
- Rate limits execution calls per user to prevent abuse of the OnlineCompiler quota.
- In-memory rate limiting replaced with database-backed checks.
- JavaScript is rejected at the API route with HTTP 400 Bad Request to guarantee client-side execution in the browser.

### Code Execution Flow
1. **User clicks "Run Code"**.
2. **If JavaScript:** Dispatched to `lib/executor.ts`, which runs the code inside an isolated `<iframe sandbox="allow-scripts">` using `postMessage` with a 5000ms timeout.
3. **If Python / C / C++ / Java:** Dispatched via authenticated POST to `/api/run`, which proxies to OnlineCompiler.io.
4. **Display Pipeline:** Raw output/errors render first $\rightarrow$ Roast or Proud line renders second $\rightarrow$ Associated GIF renders third.

---

## 4. Route Directory

| Route | Purpose | State / Client Component |
|---|---|---|
| `/` | Dashboard, streak tracking, XP summary, daily joke | Server Component |
| `/login` | Google OAuth & direct Email OTP login (6–8 digit support) | Client Component |
| `/onboarding` | Handle selection, username setup, humor mode choice | Client Component |
| `/learn` | Sequential lessons (`LearnPageClient` for JS, `LearnPagePythonClient` for Python) | Server + Client |
| `/lessons` | Library / Read-only curriculum reference (`PythonLessonsView` for Python) | Server + Client |
| `/problems` | Coding challenges aligned to curriculum chapters | `ProblemsDashboardClient` |
| `/problems/[id]` | Problem-solving arena with output & test assertions | Dynamic Client Route |
| `/battle` | 1v1 Realtime coding matches using Supabase Realtime | `useBattle` hook |
| `/leaderboard` | Global XP and solve-speed rankings | Client Component |
| `/settings` | Profile preferences (humor toggle, language selection) | Server + Client |

---

## 5. Content Inventory

- **Python Curriculum (`lib/python/curriculum.ts`):** 15 core chapters, 45 complete lessons with baby-step beginner tracks, dual-language humor, and test checks.
- **JavaScript Curriculum:** 64 lessons (31 Beginner, 18 Intermediate, 9 Expert, 6 Interview).
- **C / C++ / Java:** 12 placeholder lessons per language.
- **Joke Pools (`lib/fallbackRoasts.ts`):** 31 General Roasts, 30 General Proud lines, 31 Tamil Roasts, 30 Tamil Celebration lines.
- **GIFs:** Stored in public Supabase Storage bucket `gifs`, indexed via `lib/gifManifest.json`.

---

## 6. Critical Operational Manual Checklist

After running the Antigravity prompt, the following manual steps **must** be executed in your dashboards:

1. **Rotate Credentials:**
   - Change the password of any test account previously committed in `codelol/scratch/`.
   - Regenerate your **OnlineCompiler.io API Key** in their dashboard and update it under Vercel Project Settings $\rightarrow$ Environment Variables $\rightarrow$ `ONLINECOMPILER_API_KEY`.
2. **Purge Git History (Optional but Recommended):**
   - Run `git filter-repo` or BFG Repo-Cleaner to permanently scrub the deleted scratch files containing passwords from past commit trees.
3. **Supabase Auth Config:**
   - Go to Supabase Dashboard $\rightarrow$ Authentication $\rightarrow$ Providers $\rightarrow$ Email.
   - Confirm OTP length is set to your preferred length (6 or 8 digits) to match the frontend input limit.
4. **Vercel Deployment Verification:**
   - Trigger a fresh deploy from `main` and check the build logs to ensure the Google Fonts and Next.js build step passes with zero errors.
