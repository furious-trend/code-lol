---
agent-notes: { ctx: "sprint 2 planning for in-browser Qwen3.5 AI roasts", deps: [docs/sprints/sprint-1-plan.md, docs/code-map.md, docs/process/team-governance.md, docs/process/done-gate.md], state: active, last: "pat@2026-11-26" }
---

# Sprint 2 Plan — In-Browser Qwen3.5-0.8B AI Roasts (`@wllama/wllama`)

**Goal:** Deliver opt-in, privacy-preserving, zero-server-cost AI code roasts and praise in the browser using Qwen3.5-0.8B GGUF via `@wllama/wllama` (`v4.0.0+`), with instant `/api/roast` fallback so coding feedback is never blocked by model downloads, device limits, or header constraints.

**Product Value Rationale:** Every user coding run in `/problems/[id]`, `/playground`, and `/learn` currently receives static/rule-matched lines from `/api/roast`. Local WebAssembly inference delivers personalized, context-aware roasts and praise in both **English (`en`)** and **Tanglish (`ta-Latn`)** at zero marginal inference cost, while opt-in lazy loading protects first-load performance.

---

## Tracking & Pre-Conditions

- **Board Status:** GitHub Projects tracking is not configured in `AGENTS.md` (same as `docs/sprints/sprint-1-plan.md`). Track item transitions (`Backlog -> Ready -> In Progress -> In Review -> Done`) in this plan and the IDE `task.md` artifact.
- **Process Baseline:** `docs/product-context.md` is not yet created; conservative quality/safety defaults apply (lazy opt-in only, non-blocking fallback, strict truth override, full Done Gate).
- **Architecture Decision Gate Scan:**
  - **Requires Architecture Gate:** Epic 1 (`S2-001`, `@wllama/wllama` v4 + Qwen3.5-0.8B GGUF + OPFS caching + WASM asset delivery) and Epic 2 (`S2-001`, scoped COOP/COEP cross-origin isolation headers + single-thread fallback).
  - Neither Epic 1 nor Epic 2 implementation may enter Phase 3 TDD until Archie authors the ADR in `docs/adrs/`, Wei challenges it as a standalone agent (`docs/tracking/2026-11-26-wllama-in-browser-ai-debate.md`), and the human approves.

---

## Epics & Stories Overview

| Epic | Story IDs | Business Objective | Priority |
|------|-----------|-------------------|----------|
| **Epic 1: `@wllama/wllama` v4 AI Service (`codelolAi.ts`)** | `S2-003`, `S2-004` | Reliable, cached, truth-enforced local Qwen3.5-0.8B inference with clean teardown & fallback | **P0** |
| **Epic 2: Scoped Cross-Origin Isolation & Compatibility** | `S2-005` | Unlock multi-threaded WASM (`SharedArrayBuffer`) in coding workspaces without breaking OAuth, GIFs, Monaco, or JS sandbox | **P0** |
| **Epic 3: Coding Workspace UI & Runner Integration** | `S2-006`, `S2-007`, `S2-008` | Seamless lazy opt-in, download progress, Tanglish/English sync, instant `/api/roast` fallback, and clean badges across all 3 coding routes | **P0** |
| **Epic 4: Verification, Accessibility, Review & Browser E2E** | `S2-009`, `S2-010`, `S2-011`, `S2-012` | High-confidence ship quality via Tara TDD, Dani UX/a11y, 4-lens code review, prod build, and local Chromium verification | **P0** |

---

## Waves & Execution Sequence

### Wave 0: Architecture Gate & Enabler Contract (Pre-Implementation)
*Must complete before Wave 1 implementation starts.*

- **`S2-001` [P0] Architecture Gate — In-Browser `@wllama/wllama` v4 & Cross-Origin Isolation ADR**
  - **Requires Architecture Gate:** ADR in `docs/adrs/` + standalone **Wei** adversarial debate (`docs/tracking/2026-11-26-wllama-in-browser-ai-debate.md`) + human approval.
  - **Scope:** Decide WASM asset hosting strategy for Next.js `16.2.12` / Turbopack (`public/wasm/` self-hosted vs CORS-safe CDN for `@wllama/wllama` v4 single-file/multi-thread WASM), GGUF quantization/source defaults (`NEXT_PUBLIC_HF_MODEL_REPO`, `NEXT_PUBLIC_HF_MODEL_FILE`), OPFS cache behavior, memory/unload budget (`dispose()`), and header scoping (`COOP: same-origin`, `COEP: credentialless` on workspaces only).
  - **Owners:** Archie (Lead), Wei (Challenger), Pierrot (Security constraint), Ines (Ops constraint).
  - **Acceptance Criteria:**
    - [ ] Accepted ADR exists in `docs/adrs/` covering `@wllama/wllama` v4, OPFS, WASM asset loading, and scoped COOP/COEP.
    - [ ] Multi-round debate artifact exists at `docs/tracking/2026-11-26-wllama-in-browser-ai-debate.md`.
    - [ ] Human explicitly approves architecture before any Wave 1 source file is written.

- **`S2-002` [P0] Dual-Duty Enabler — Shared AI Feedback & Diagnostic Contract**
  - **Scope:** Define the typed response and state contract shared by `codelol/lib/codelolAi.ts`, `codelol/hooks/useRoast.ts`, and `codelol/components/RoastCard.tsx` (`source: 'local-ai' | 'api-fallback'`, `verdict: 'praise' | 'roast'`, `language: 'en' | 'ta-Latn'`, `isolationMode: 'multi-thread' | 'single-thread'`, `modelState`).
  - **Why Dual-Duty:** Powers both user-facing roast/praise badges and deterministic automated assertions in Tara's Vitest suite and the Wave 3 Chromium E2E test.
  - **Owners:** Pat, Archie, Tara.
  - **Acceptance Criteria:**
    - [ ] Contract documented in the ADR / module types before Wave 1 TDD red phase.
    - [ ] Contract preserves 100% backward compatibility with existing `/api/roast` JSON shape (`roast`, `fix`, `mood`, `gifKeyword`) and existing `useRoast` tests (`codelol/__tests__/useRoast.test.ts`).

---

### Wave 1: Core AI Engine & Cross-Origin Isolation (Parallel Streams)
*Can run in parallel after Wave 0 gate passes.*

- **`S2-003` [P0] Dependency Setup, Env Config & SBOM Update (Epic 1)**
  - **Files:** `codelol/package.json`, `codelol/package-lock.json`, `codelol/.env.example`, `docs/sbom.md` (promote from `docs/scaffolds/sbom.md` if not yet initialized).
  - **Owners:** Sato (install/env), Pierrot (SBOM & license/CVE check), Ines (config UX).
  - **Acceptance Criteria:**
    - [ ] `@wllama/wllama` (`>=4.0.0`) installed in `codelol/package.json` with exact pinned version/lockfile entry.
    - [ ] `codelol/.env.example` documents `NEXT_PUBLIC_HF_MODEL_REPO` and `NEXT_PUBLIC_HF_MODEL_FILE` with clear public Hugging Face Qwen3.5-0.8B GGUF defaults and comments.
    - [ ] Pierrot updates `docs/sbom.md` with `@wllama/wllama` version, license, and transitive audit (Done Gate #13).
    - [ ] Existing test suite (`npm run test`) and `npx tsc --noEmit` remain green.

- **`S2-004` [P0] TDD Implement In-Browser AI Service — `codelol/lib/codelolAi.ts` (Epic 1)**
  - **Files:** `codelol/lib/codelolAi.ts`, `codelol/__tests__/codelolAi.test.ts`.
  - **Owners:** Tara (Red/Verify), Sato (Green/Refactor).
  - **Acceptance Criteria:**
    - [ ] **Client-only safety:** Module never accesses `window`, `navigator`, or WASM at module top-level import time (safe for Next.js SSR and Node test imports).
    - [ ] **Public HF env config:** Reads `process.env.NEXT_PUBLIC_HF_MODEL_REPO` and `process.env.NEXT_PUBLIC_HF_MODEL_FILE` with safe documented public defaults; validates non-empty repo/file before loading.
    - [ ] **OPFS caching & progress:** Loads GGUF via `@wllama/wllama` OPFS cache manager; forwards `{ loaded, total, percentage }` progress updates to caller; degrades gracefully if OPFS (`navigator.storage`) is unavailable or throws.
    - [ ] **Single-flight init & `dispose()`:** Concurrent `init()`/`load()` calls share a single in-flight promise; `dispose()` cleanly unloads the model/workers, resets state to idle, and is safe to call repeatedly.
    - [ ] **`getCodeFeedback()` strict JSON + `<think>` stripping:** Strips `<think>...</think>` blocks (including unclosed trailing `<think>` blocks on token truncation) and markdown code fences (` ```json ... ``` `) before strict JSON parsing & schema validation (`roast`, `fix`, `mood`, `verdict`).
    - [ ] **Truth override:** Deterministic verdict enforcement: when `error === "None" && actual.trim() === expected.trim()`, the returned result is forced to passing/praise (`verdict: 'praise'`) even if the model output claims an error/failure; when `error !== "None"` or `actual.trim() !== expected.trim()`, the result is forced to failing/roast (`verdict: 'roast'`).
    - [ ] **Language support:** Supports `'en'` (English) and `'ta-Latn'` (Tanglish) prompt instructions mapped cleanly from `humorPref` (`'general' | 'tamil'`).
    - [ ] **Graceful fallback:** Any initialization error, WASM load error, inference timeout, malformed/non-JSON output, or missing browser APIs returns a structured fallback indicator instead of throwing an unhandled rejection.

- **`S2-005` [P0] Scoped COOP/COEP Headers & Single-Thread Fallback (Epic 2)**
  - **Files:** `codelol/next.config.ts`, `codelol/vercel.json`, `codelol/lib/codelolAi.ts` (isolation detection), `codelol/__tests__/isolationHeaders.test.ts`.
  - **Owners:** Ines (headers/ops), Sato (implementation), Tara (tests), Pierrot (security check).
  - **Acceptance Criteria:**
    - [ ] Both `codelol/next.config.ts` (`async headers()`) and `codelol/vercel.json` (`headers`) emit `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: credentialless` scoped **only** to coding workspaces: `/problems/:path*`, `/playground`, and `/learn` (plus `/learn/:path*` if applicable).
    - [ ] `/login`, `/auth/callback`, and non-workspace routes do **not** receive `COOP: same-origin` / `COEP: credentialless`.
    - [ ] `codelolAi.ts` checks `typeof crossOriginIsolated !== 'undefined' && crossOriginIsolated` (and `SharedArrayBuffer` availability); when `false`, automatically selects single-thread WASM execution (`n_threads: 1`) without errors and reports `isolationMode: 'single-thread'`.
    - [ ] Compatibility verified with:
      1. Monaco Editor (`@monaco-editor/react` / `monaco-editor`)
      2. Cross-origin Supabase Storage GIFs (`codelol/lib/localGifs.ts`) under `COEP: credentialless`
      3. Sandboxed JS execution iframe (`codelol/lib/executor.ts`, `sandbox="allow-scripts"` without `allow-same-origin`, `postMessage` IPC)
      4. `/login` Google OAuth & `/auth/callback` route navigation.

---

### Wave 2: Coding Workspace UI & Runner Integration (Epic 3)
*Depends on Wave 1 (`S2-004`, `S2-005`).*

- **`S2-006` [P0] Shared AI Roast Orchestration (`useRoast.ts`) & UI Controls (`RoastCard.tsx`)**
  - **Files:** `codelol/hooks/useRoast.ts`, `codelol/components/RoastCard.tsx`, new shared AI bar/toggle component (e.g., `codelol/components/AiRoastControls.tsx`), `codelol/__tests__/useRoast.test.ts`, `codelol/__tests__/roastCard.ui.test.tsx`.
  - **Owners:** Tara (Red/Verify), Sato (Green/Refactor), Dani (UI/a11y design review).
  - **Acceptance Criteria:**
    - [ ] **Lazy trigger:** Page load triggers zero GGUF network fetches; model load begins **only** when the user explicitly clicks `"Enable AI Roast Mode"` (and can be disabled/disposed cleanly).
    - [ ] **Download progress bar:** While downloading/loading into OPFS, displays a visible, accessible progress bar (`role="progressbar"`, `aria-valuenow`, `aria-valuemin={0}`, `aria-valuemax={100}`, textual status showing `%` and `"Cached"` / `"Loading"` state).
    - [ ] **Instant `/api/roast` fallback:** When a user runs/submits code while AI Roast Mode is disabled, still downloading, initializing, or failed, `handleRoast` immediately calls `/api/roast` without waiting for the GGUF download.
    - [ ] **`Tanglish (ta-Latn)` / `English (en)` toggle synced with `humorPref`:** Toggling updates both AI prompt language (`ta-Latn` ↔ `en`) and `humorPref` (`tamil` ↔ `general`), persisting to `localStorage` (`guest_humor`) and Supabase `profiles.humor_preference` when authenticated.
    - [ ] **Roast / Praise & Source Badges:** `RoastCard.tsx` cleanly displays distinct accessible badges (icon + text label, never color-only) for verdict (**Praise** vs **Roast**) and source (**Local Qwen3.5 AI** vs **Instant Fallback**, plus language tag `English` / `Tanglish`).

- **`S2-007` [P0] Integrate AI Roast Mode into `/problems/[id]` and `/playground`**
  - **Files:** `codelol/app/problems/[id]/page.tsx`, `codelol/app/playground/page.tsx`, `codelol/__tests__/problems.ui.test.tsx`, `codelol/__tests__/playgroundAi.ui.test.tsx`.
  - **Owners:** Tara (Red/Verify), Sato (Green/Refactor), Dani (UI/a11y).
  - **Acceptance Criteria:**
    - [ ] Both `/problems/[id]` and `/playground` render `"Enable AI Roast Mode"`, the download progress bar when active, and the synced `Tanglish (ta-Latn)` / `English (en)` toggle (note: `/problems/[id]` currently lacks an inline `humorPref` toggle and gains this synced control).
    - [ ] `/problems/[id]` passes ground-truth test results (`error`: `"None"` or error message, `actual` output, `expected` output / test pass ratio) into `handleRoast` so truth override prevents false praise on failed test cases or false roasts on passed challenges.
    - [ ] `/playground` passes execution output and error state (`error: "None"` when `data.error` is absent) cleanly to `handleRoast` and preserves existing Monaco, draft autosave, beginner tips, and meme sound timing.
    - [ ] Existing tests in `codelol/__tests__/problems.ui.test.tsx` remain 100% green.

- **`S2-008` [P0] Integrate AI Roast Mode into `/learn` (`InteractiveCompiler` & `LearnPageClient`)**
  - **Files:** `codelol/components/library/InteractiveCompiler.tsx`, `codelol/components/library/InteractiveLibraryClient.tsx`, `codelol/components/library/LibraryHeader.tsx`, `codelol/app/learn/LearnPageClient.tsx`, `codelol/__tests__/learn.test.tsx`, `codelol/__tests__/interactiveCompilerAi.ui.test.tsx`.
  - **Owners:** Tara (Red/Verify), Sato (Green/Refactor), Dani (UI/a11y).
  - **Acceptance Criteria:**
    - [ ] **Both `/learn` execution paths covered:** `InteractiveCompiler.tsx` (used in Tutorial / `InteractiveLibraryClient` & Python track) AND `LessonView` in `LearnPageClient.tsx` (Challenge mode) support `"Enable AI Roast Mode"`, progress bar, instant `/api/roast` fallback during download, and clean roast/praise badges.
    - [ ] `LibraryHeader.tsx` (`English` / `Tamil 🌶️`) and workspace `English (en)` / `Tanglish (ta-Latn)` toggle stay strictly synchronized with `humorPref` (`'general'` ↔ `'tamil'`) with zero state drift across tab/mode switches (`Tutorial` / `Challenge` / `Map`).
    - [ ] `InteractiveCompiler.tsx` passes `expectedOutput` and actual stdout/error accurately to `handleRoast` so truth override matches the `"Output matches expected!"` check.
    - [ ] Existing tests in `codelol/__tests__/learn.test.tsx` remain 100% green.

---

### Wave 3: Verification, Accessibility, 4-Lens Review & Browser E2E (Epic 4)
*Depends on Waves 1 & 2.*

- **`S2-009` [P0] Full TDD Suite, Typecheck & Content Validation (`Tara`)**
  - **Owners:** Tara.
  - **Acceptance Criteria:**
    - [ ] `npm run test` (Vitest + `npx tsx scripts/validate-python-content.ts`) passes 100% with zero skipped/relaxed assertions.
    - [ ] `npx tsc --noEmit` passes with zero errors (Done Gate #2).
    - [ ] All edge cases explicitly tested: `<think>` stripping (closed & unclosed), malformed JSON fallback, truth override (`error === "None" && actual.trim() === expected.trim()`), missing OPFS, single-thread fallback when `crossOriginIsolated === false`, lazy opt-in, `/api/roast` fallback during download, and `dispose()`.

- **`S2-010` [P0] UI Accessibility & Responsive Review (`Dani`)**
  - **Owners:** Dani (invoked as standalone agent per Done Gate #8).
  - **Acceptance Criteria:**
    - [ ] Standalone Dani review executed across `RoastCard.tsx`, AI toggle/progress controls, `/problems/[id]`, `/playground`, and `/learn` (`InteractiveCompiler` + `LearnPageClient`).
    - [ ] Keyboard navigation, focus rings, `aria-live` / `role="progressbar"` attributes, mobile tabs (`< lg`), and WCAG contrast verified; roast/praise and AI/fallback badges do not rely on color alone.
    - [ ] All Critical/Important accessibility findings resolved.

- **`S2-011` [P0] 4-Lens Code Review & Operational/Docs Sync (`code-reviewer`, Ines, Diego)**
  - **Owners:** `code-reviewer` (Vik + Tara + Pierrot + Archie), Ines (operational baseline), Diego (`docs/code-map.md`, README/env docs).
  - **Acceptance Criteria:**
    - [ ] Standalone `code-reviewer` invocation completes and review artifact is verified persisted in `docs/code-reviews/` (`docs/process/gotchas.md` check).
    - [ ] All Critical and Important findings resolved.
    - [ ] Ines verifies `docs/process/operational-baseline.md` concerns (logging, error UX, `.env.example`, graceful degradation).
    - [ ] Diego updates `docs/code-map.md` with `lib/codelolAi.ts`, scoped COOP/COEP headers, and updated test inventory.

- **`S2-012` [P0] Next.js Production Build & Local Chromium Browser Verification (`browser` subagent)**
  - **Owners:** Sato / Ines (build), `browser` subagent (Chromium E2E + Done Gate #8b visual proof).
  - **Acceptance Criteria:**
    - [ ] `npm run lint` passes with zero warnings and `npm run build` (`next build`) succeeds cleanly.
    - [ ] `browser` subagent launches local Chromium against the production build (`next start`) and verifies:
      1. **Header & Isolation Matrix:** `window.crossOriginIsolated === true` on `/problems/[id]`, `/playground`, and `/learn`; `false` on `/login`.
      2. **Compatibility Matrix:** Monaco editor renders and accepts input; Supabase Storage GIFs load (`naturalWidth > 0`, zero COEP console errors); sandboxed JS iframe (`executeSandboxedJs`) returns output; `/login` renders and OAuth trigger is unblocked.
      3. **Lazy Opt-In & Instant Fallback:** Initial load makes zero GGUF requests; running code before model readiness serves `/api/roast` fallback immediately with fallback badge.
      4. **Passing English Snippet:** Run a passing snippet in `English (en)` mode and verify truth-overridden praise badge + clean UI rendering.
      5. **Failing Tanglish Snippet:** Switch toggle to `Tanglish (ta-Latn)` (verify synced `humorPref`), run a failing snippet, and verify roast badge + fix guidance with zero uncaught console/page errors.
      6. **Visual Evidence:** Screenshots captured for Done Gate #8b.

---

## Out of Scope (Explicitly Deferred)

- Multi-model selector UI or models larger than Qwen3.5-0.8B (keep bundle/download lean for learners).
- Server-side GPU LLM proxy (zero server inference cost is a core business constraint).
- Replacing `/api/roast` or removing `fallbackRoasts.ts` (needed permanently for instant fallback and unsupported devices).
- Integrating AI roasts into `/battle` multiplayer arena (focus Sprint 2 strictly on `/problems/[id]`, `/playground`, and `/learn`; evaluate `/battle` in Sprint 3 if latency/memory telemetry looks good).

---

## Sprint 2 Done Definition

Sprint 2 is **Done** only when:
1. All `S2-001` through `S2-012` items pass the 15-item Done Gate (`docs/process/done-gate.md`).
2. `npm run test`, `npx tsc --noEmit`, `npm run lint`, and `npm run build` all pass cleanly.
3. Local Chromium E2E (`S2-012`) confirms COOP/COEP compatibility, lazy loading, `/api/roast` fallback, passing English praise, and failing Tanglish roast with zero console errors.
4. `/sprint-boundary` completes with a clean git tree.
