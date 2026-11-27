---
agent-notes: { ctx: "ADR debate tracking for in-browser wllama Qwen3.5 AI roasts", deps: [docs/adrs/0007-in-browser-wllama-ai-inference.md, docs/process/team-governance.md], state: active, last: "coordinator@2026-11-26" }
---

# Debate: Opt-In In-Browser AI Roasts via `@wllama/wllama`

**ADR:** [docs/adrs/0007-in-browser-wllama-ai-inference.md](../adrs/0007-in-browser-wllama-ai-inference.md)  
**Date:** 2026-11-26  
**Participants:** Archie (author) vs Wei (challenger)

---

## Round 1 — Wei's Challenges

1. **SPA Soft-Navigation & Header Drift + Safari `credentialless`:** Next.js `<Link>` client navigation from `/` leaves `window.crossOriginIsolated === false`; Safari/iOS ignores `COEP: credentialless`; duplicating COOP/COEP headers across `next.config.ts` and `vercel.json` causes drift; Monaco CDN and `RoastCard.tsx` (hardcoded JS Monaco) risk breakage.
2. **HF Xet CAS Redirect CORS, `WasmFromCDN` SPOF & OPFS Eviction:** `cas-bridge.xethub.hf.co` redirects can hit CORS/Range issues; `WasmFromCDN` (`cdn.jsdelivr.net`) creates a runtime external SPOF even when weights are cached offline; Safari Private Browsing throws `QuotaExceededError` on 521 MB OPFS writes.
3. **Mobile OOM, `loadModelFromHF` Params, & Synchronous Run Freeze:** `n_ctx: 1024, jinja: true` belong on `loadModelFromHF` (`LoadModelParams`), not `createChatCompletion`; ~900 MB–1.2 GB tab footprint threatens mobile OOM kills; awaiting slow WASM inference synchronously inside `Run`/`Submit` handlers locks up the UI button.
4. **`expected` Unknown in Playground/Tests, `max_tokens: 70` JSON Truncation, & `RoastCard` Language:** Free-form Playground has no `expected` value and `problems/[id]` uses `===TEST_RESULTS===` booleans rather than exact stdout equality; 0.8B output at `max_tokens: 70` risks mid-JSON truncation; `RoastCard` hardcodes JavaScript highlighting.
5. **De-Risking Benchmark & Public HF Repo Blocker:** Missing public `NEXT_PUBLIC_HF_MODEL_REPO` slug (only placeholder + S3 credentials provided) and unverified latency/20-sample prompt eval risk shipping an unusable download.

---

## Round 2 — Archie's Responses

1. **Headers & SPA Reload:** Use `codelol/next.config.ts` as single source of truth (or enforce automated Vitest parity if `vercel.json` also lists headers). On explicit `"Enable AI Roast Mode"` click, if `!window.crossOriginIsolated` on non-Safari browsers, persist draft code + opt-in flag and perform a guarded one-time reload (`sessionStorage` loop guard); stay on single-thread fallback on Safari/iOS. Pass `language` into `RoastCard.tsx` instead of hardcoding `javascript`.
2. **Wasm Assets & OPFS Guards:** Prefer self-hosting `.wasm` binaries in `codelol/public/wasm/` with `WasmFromCDN` documented as fallback (flagged for human sign-off against explicit `WasmFromCDN` request). Require a strictly public un-gated HF repo (`NEXT_PUBLIC_HF_MODEL_REPO`); run `navigator.storage?.estimate()` before downloading; catch `QuotaExceededError` cleanly to disable AI mode with fallback message; provide `"Clear Cached AI Model"` via `CacheManager`.
3. **Memory, Params, & Async Decoupling:** Place `n_ctx: 1024, jinja: true, useCache: true, progressCallback` on `loadModelFromHF` (`@wllama/wllama@4.0.0`). Gate opt-in behind `navigator.deviceMemory >= 4` (graceful message when lower). Implement `disposeAiModel()` calling `wllama.exit()`. Decouple `executeCode` + `playMemeSound` + Run-button re-enabling from LLM inference (instant `/api/roast` fallback or non-blocking async upgrade with `15s` timeout and monotonic `runId` stale-result discard).
4. **Input Normalization & JSON Fallback:** Define explicit caller mapping table across all 4 workspaces (`expectedOutput`, `"ALL_TESTS_PASSED"`, `"ALL_CHECKS_PASSED"`, `"N/A"` for free-form Playground with `expected === "N/A"` handling in truth override). Strip `<think>` + markdown fences, extract JSON, validate required fields, and fall back to `/api/roast` on truncation.
5. **Pre-Acceptance Blocker & Eval Gate:** Mark `NEXT_PUBLIC_HF_MODEL_REPO` as a pre-implementation blocker, forbid client S3 secrets, and require `< 5s` warm load / `<= 5s` desktop MT inference target / browser smoke matrix / 20-sample JSON & truth eval before transitioning ADR-0007 to `Accepted`.

---

## Resolution

- **Resolved:**
  - `loadModelFromHF` vs `createChatCompletion` option placement in `@wllama/wllama` v4.0.0.
  - Non-blocking async roast orchestration + Run-button responsiveness + monotonic `runId`.
  - Per-workspace `expected`/`actual`/`error` normalization & `RoastCard` multi-language highlighting.
  - Device RAM (`deviceMemory < 4`), storage quota (`estimate()` + `QuotaExceededError`), `dispose()`, and truncated JSON -> `/api/roast` fallback safety nets.
- **Acknowledged Risks Requiring Pre-Acceptance Verification & Human Decision:**
  - Exact public Hugging Face repository slug (`NEXT_PUBLIC_HF_MODEL_REPO`) still needed from the user (cannot use pasted S3 secret keys in client JS).
  - Preference between local self-hosted `codelol/public/wasm/` vs CDN `WasmFromCDN`, and strict single-source `next.config.ts` vs mirrored `vercel.json` headers with parity tests.
  - Live browser check of Hugging Face `cas-bridge.xethub.hf.co` CORS/Range + Monaco + `executor.ts` `<iframe sandbox>` + Supabase Storage GIFs under `COOP: same-origin` + `COEP: credentialless`.
- **ADR Changes Applied:** Updated `docs/adrs/0007-in-browser-wllama-ai-inference.md` with Round 2 resolutions while keeping status `Proposed` pending human sign-off and public HF repo confirmation.
