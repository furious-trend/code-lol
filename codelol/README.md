<!-- agent-notes: { ctx: "Developer setup, local environment, and testing guide for CodeLOL app", deps: [], state: active, last: "diego@2026-10-29" } -->
# CodeLOL — Application Developer Guide

This directory contains the Next.js application powering **CodeLOL**.

## Getting Started

### 1. Prerequisites
- **Node.js:** v20+ recommended
- **Package Manager:** `npm` (or `pnpm` / `yarn`)
- **Supabase Account:** PostgreSQL database with Auth and Storage configured

### 2. Environment Configuration
Create a `.env.local` file inside `codelol/`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Database Connection (for migration and setup scripts)
DATABASE_URL="postgresql://postgres:your-db-password@aws-0-region.pooler.supabase.com:6543/postgres"

# OnlineCompiler.io Execution API (for Python, C, C++, Java)
ONLINECOMPILER_API_KEY="your-onlinecompiler-api-key"
```

### 3. Install Dependencies & Run Locally

```bash
# Install dependencies
npm install

# Start development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view CodeLOL.

---

## Testing & Quality Gates

CodeLOL enforces strict quality gates across testing, type safety, and linting:

```bash
# Run full Vitest test suite (41 files, 187 tests)
npx vitest run

# Run TypeScript type verification
npx tsc --noEmit

# Run ESLint checks
npx eslint app/problems/ProblemsDashboardClient.tsx app/problems/[id]/page.tsx
```

---

## Architecture Quick Reference

- **`proxy.ts`:** Next.js edge middleware handling authentication redirects and onboarding enforcement.
- **`lib/executor.ts`:** Client-side sandboxed iframe (`sandbox="allow-scripts"`, strictly no `allow-same-origin`) for in-browser JavaScript evaluation.
- **`app/api/run/route.ts`:** Authenticated proxy endpoint for Python, C, C++, and Java execution via OnlineCompiler.io. JavaScript requests receive HTTP 400.
- **`lib/python/curriculum.ts`:** 15 chapters and 45 modular lessons with General and Tamil humor lines.
- **`components/Navbar.tsx`:** Sticky navigation bar with desktop and mobile drawer views for Library, Learn, Problems, Leaderboard, Battle, Friends, Quiz, and Playground.

---

## Production Deployment (Vercel)

- **Root Directory:** Set to `codelol/`
- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Environment Variables:** Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `ONLINECOMPILER_API_KEY` in Vercel Project Settings.
