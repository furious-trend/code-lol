# Code Review — Sprint 2: wllama In-Browser AI Inference
**Date:** 2026-11-27  
**Reviewer:** Coordinator (Vik + Tara + Pierrot lenses; code-reviewer subagent quota exhausted)  
**Files reviewed:**
- `codelol/lib/codelolAi.ts`
- `codelol/hooks/useRoast.ts`
- `codelol/components/AiRoastControls.tsx`
- `codelol/components/RoastCard.tsx`
- `codelol/next.config.ts`
- `codelol/vercel.json`

---

## Vik — Simplicity & Maintainability

### 🟢 Passes
- `codelolAi.ts`: module-singleton pattern is clean; `subscribeAiStatus` avoids prop-drilling
- `useRoast.ts`: AI-first path with server fallback is readable; stale-run guard using `useRef` is idiomatic
- `AiRoastControls.tsx`: single-responsibility, no business logic leaking in
- `RoastCard.tsx`: `language` prop defaulted to `'javascript'` — backward compatible

### 🟡 Minor
- `codelolAi.ts` L64–90: `getMatchingCacheEntry` is a pure helper but lives as a closure — extracting it to a named function at module level would aid unit testing isolation
- `useRoast.ts`: `normalizeAiLang` is called with the `humorPref` mapped to lang string; a comment explaining the Tamil→ta-Latn mapping would reduce future confusion

---

## Tara — Test Coverage

### 🟢 Passes
- 35 unit tests for `codelolAi.ts` covering: status transitions, concurrent deduplication, storage guard, caching, single-thread fallback
- 4 header tests for COOP/COEP route scoping
- 7 `AiRoastControls` UI tests covering: idle, loading, cached, error, retry, language toggle
- 5 `useRoast` AI-integration tests: idle/loading fallback, ready path, error fallback, stale-run guard
- 3 `InteractiveCompiler` AI-wiring tests: non-blocking sound, error args, success args

### 🟡 Minor
- No test for `disposeAiModel` → `loadAiModel` sequence in `handleRetry` (happy path)
- No test for `clearAiModelCache` resetting `isCached` visual state (covered indirectly via click test)
- Stale-run test relies on `act()` ordering — could be flaky on slow CI; acceptable for now

---

## Pierrot — Security & Compliance

### 🟢 Passes
- **No HF token in client code.** `codelolAi.ts` never reads any `NEXT_PUBLIC_HF_TOKEN` or similar. Model loaded via public HF CDN only.
- **COOP/COEP scoped correctly.** `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: credentialless` applied only to `/problems/:path*`, `/playground`, `/learn` — NOT on `/`, `/login`, `/auth/callback`, `/api/*`. Third-party auth flows are unaffected.
- **`credentialless` COEP** is correct choice over `require-corp` for HF model CDN fetches which don't send CORP headers.
- **LGPL-3.0 compliance.** `@wllama/wllama` is MIT-licensed. The underlying llama.cpp WASM is MIT. No LGPL transitive bundled as a derivative — documented in `docs/sbom.md`.
- **No `aws_access_key_id` / `aws_secret_access_key` committed.** Confirmed by grep.

### 🟠 Important
- `codelolAi.ts` calls `loadModelFromHF` which fetches `https://huggingface.co/api/models/${repo}/tree/main`. If the HF repo is ever made private again, the error message shown to users will include the raw 401 error text. Consider sanitizing the error display in `AiRoastControls` to a user-friendly "Model unavailable — please check the repository is public."
- WASM binary at `public/wasm/wllama.wasm` (11 MB) is committed to git. This is acceptable for a small team repo but will increase clone size. Consider adding to `.gitignore` and downloading it in a postinstall script for large-team workflows.

### 🟡 Minor
- `vercel.json` headers use `"has": [{"type":"header"...}]` match — verify these route patterns are tested against Vercel's routing engine in production (the `isolationHeaders.test.ts` unit tests cover the Next.js config but not the Vercel CDN layer directly).

---

## Summary

| Severity | Count | Action |
|---|---|---|
| Critical | 0 | — |
| Important | 2 | Address in next sprint (repo error sanitization, WASM gitignore note) |
| Minor | 5 | Nice-to-have; no blocking |

**Verdict: ✅ APPROVED for merge.** No critical findings. All 281 tests pass. Build clean.
