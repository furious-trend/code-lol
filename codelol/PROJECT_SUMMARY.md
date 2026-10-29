<!-- agent-notes: { ctx: "Architecture and technical summary for CodeLOL application", deps: ["codelol/"], state: active, last: "diego@2026-10-29" } -->
# CodeLOL — Project Summary & Architecture

## Overview
**CodeLOL** is a free, full-stack gamified learning platform that teaches programming through humor. An automated roast engine reacts to user code with quick jokes and GIFs. Built on modern web technologies, it features in-browser code editing, dual-language humor (General & Tamil), sandboxed client-side execution for JavaScript, external compiler proxying for compiled languages, and realtime social competitions.

## Tech Stack
- **Frontend Framework:** Next.js 16.2 (App Router with Turbopack) & React 19.2
- **Language:** TypeScript
- **Styling & Animation:** Tailwind CSS v4, Framer Motion 13, Lucide React
- **Code Editor:** Monaco Editor (`@monaco-editor/react`)
- **Backend & Database:** Supabase (PostgreSQL, Auth with Google OAuth + Email OTP, Realtime channels, Storage buckets)
- **Code Execution Engines:**
  - **JavaScript:** Client-side isolated iframe (`sandbox="allow-scripts"`, strictly NO `allow-same-origin`, 5000ms timeout) via `lib/executor.ts`
  - **Python, C, C++, Java:** Server-side proxy via `app/api/run/route.ts` to OnlineCompiler.io
- **Testing:** Vitest 4.1 + React Testing Library (jsdom), 41 test suites, 187 unit tests
- **Deployment & Hosting:** Vercel

## Core Features & Subsystems

1. **Dual-Humor Learning Engine**
   - **General Humor:** Developer struggles, tech memes, stack overflow jokes.
   - **Tamil Humor:** Vadivelu, Santhanam, Rajini, Vijay, and Kollywood pop-culture references.
   - 45 Python curriculum lessons across 15 chapters, 64 JavaScript lessons, and introductory C/C++/Java tracks.

2. **Secure Code Execution Architecture**
   - **JavaScript:** Runs locally in the user's browser inside an iframe with `sandbox="allow-scripts"`. Because `allow-same-origin` is omitted, user code cannot access `window.parent.localStorage`, parent cookies, or DOM.
   - **Compiled Languages:** Proxied through `app/api/run/route.ts` requiring authenticated Supabase sessions, DB-backed rate limiting, and a 20KB body limit.
   - **Zero Waste:** JavaScript requests to `/api/run` are rejected with HTTP 400 Bad Request to conserve API quota and preserve the "JS runs free in-browser" principle.

3. **Authentication & Session Security**
   - Authentication via Google OAuth and direct Email OTP (supporting 6 to 8 digit codes).
   - Zero client-side user email enumeration: client-side `.from('profiles').select('email, id')` queries have been purged.
   - Session routing enforced at the edge by `proxy.ts`.

4. **Gamification & Social Systems**
   - **Realtime Battles:** 1v1 multiplayer coding matches orchestrated via Supabase Realtime channels.
   - **Friend & Direct Messaging:** Realtime notifications, friend requests, and direct messaging.
   - **Leaderboard:** Dynamic rankings sorted by XP, levels completed, and solve times.

5. **Operational Integrity & Audit Status**
   - Scratch files with test credentials purged.
   - PostgreSQL connections strictly consume `process.env.DATABASE_URL`.
   - 100% green test suite: 41 of 41 test files passing, 187 of 187 tests passing.
