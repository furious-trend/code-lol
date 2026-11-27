---
agent-notes: { ctx: "ADR for client-side wllama AI roast inference", deps: [docs/adrs/template.md, docs/tracking/2026-11-26-wllama-ai-inference-debate.md, codelol/hooks/useRoast.ts, codelol/next.config.ts, codelol/vercel.json], state: accepted, last: "archie@2026-11-26" }
---

# ADR-0007: Opt-In In-Browser AI Code Feedback and Roast Inference via `@wllama/wllama`

## Status

Accepted *(Human approved on 2026-11-26: public HF repo `shafiqahmed0075/codelol`, file `codelol.gguf`, self-hosted `.wasm` in `codelol/public/wasm/` with `WasmFromCDN` fallback, route-scoped COOP/COEP, synced `ta-Latn`/`en` toggle across coding workspaces.)*

## Context

CodeLOL currently generates code feedback and roasts through `codelol/hooks/useRoast.ts`, which dispatches `POST /api/roast` (`codelol/app/api/roast/route.ts`) and receives static, language-bucketed template lines from `codelol/lib/fallbackRoasts.ts` (rendered alongside Bugsy and Supabase Storage reaction GIFs in `codelol/components/RoastCard.tsx`). While instant and zero-cost, template roasts cannot inspect the learner's actual code, compiler error, or expected-vs-actual output mismatch.

We want to add contextual, AI-generated code feedback and dual-language roasts (`Tanglish (ta-Latn)` and `English (en)`) across CodeLOL's four interactive coding surfaces:
- `codelol/app/problems/[id]/page.tsx`
- `codelol/app/playground/page.tsx`
- `codelol/app/learn/LearnPageClient.tsx`
- `codelol/components/library/InteractiveCompiler.tsx`

Key architectural constraints verified in `codelol/`:
1. **Zero ongoing inference or weight-egress budget:** CodeLOL is a free platform (`README.md`) with no paid external LLM subscriptions and deploys to Vercel (`codelol/next.config.ts`, `codelol/vercel.json`) using Next.js `16.2.12`.
2. **Client privacy & zero embedded credentials:** User code should not need to leave the browser for AI commentary, and no AWS/S3 or private model-registry secrets may exist in `NEXT_PUBLIC_*` client bundles.
3. **Cold-load discipline:** The landing page (`codelol/app/page.tsx`, `/`) and non-coding routes must remain fast and lightweight — a ~521 MB GGUF model download must never trigger automatically on `/` or before explicit user opt-in.
4. **Auth & third-party asset compatibility:** `codelol/app/login/page.tsx` uses Google OAuth (`supabase.auth.signInWithOAuth`) and `codelol/app/auth/callback/route.ts` completes OAuth redirects; `codelol/lib/localGifs.ts` serves GIFs from public Supabase Storage (`https://*.supabase.co/storage/v1/object/public/gifs/...`); `codelol/lib/executor.ts` executes JavaScript inside `<iframe sandbox="allow-scripts">` (`srcdoc`, no `allow-same-origin`). Multi-threaded WebAssembly (`SharedArrayBuffer`) requires `crossOriginIsolated === true` via COOP/COEP headers, which cannot be applied blindly across OAuth routes or break third-party images.

## Options Considered & Trade-Off Analysis

### Option 1: Opt-In Client-Side Wasm Inference via `@wllama/wllama` v4.0.0 + Public Hugging Face Repo (Recommended)
Run a ~521 MB quantized Qwen3.5-0.8B GGUF (`codelol.gguf`) directly inside the browser using `@wllama/wllama` v4.0.0 (`Wllama`, `WasmFromCDN`), loaded lazily on opt-in from a configurable public Hugging Face Model Repository, cached across sessions via Wllama's built-in OPFS `CacheManager`, with scoped `COOP: same-origin` / `COEP: credentialless` headers on coding workspace routes and instant fallback to `POST /api/roast`.

### Option 2: Server-Side / Hosted Cloud LLM API behind `POST /api/roast`
Proxy `{ lang, prog, expected, actual, error, code }` from `app/api/roast/route.ts` to an external inference provider (e.g., Groq, OpenAI, or HF Inference Endpoints).
- **Pros:** Zero 521 MB browser download, works on low-RAM mobile devices, predictable server latency, no COOP/COEP headers needed.
- **Cons:** Violates CodeLOL's zero-paid-AI-subscription constraint, incurs per-token billing or strict free-tier rate limits across shared users, adds Vercel function timeout/egress pressure, and requires managing secret keys and outbound PII/code policies.

### Option 3: Client-Side WebGPU Inference (`@mlc-ai/web-llm` or `transformers.js` WebGPU)
Download WebGPU-compiled shards (e.g., MLC/ONNX) and execute on the client GPU.
- **Pros:** Higher tokens/sec on modern desktop GPUs when WebGPU is enabled.
- **Cons:** Fragmented WebGPU support across student laptops, Chromebooks, Linux browsers, and older Safari releases forces a CPU Wasm fallback path anyway, increasing bundle complexity and cache fragmentation compared to `@wllama/wllama` CPU Wasm + built-in single-thread fallback.

### Sub-Decision: Model Weight Hosting (Public Hugging Face Hub vs. Self-Hosted S3 / R2 / Vercel Blob)
- **Public Hugging Face Model Repo (Selected):** Configured via `NEXT_PUBLIC_HF_MODEL_REPO` and `NEXT_PUBLIC_HF_MODEL_FILE`. Zero bandwidth/egress charges on Vercel, zero AWS/S3 secrets in client JS, and native support in `@wllama/wllama`'s `loadModelFromHF`.
- **Self-Hosted S3 / Vercel Blob (Rejected):** Requires either public bucket egress billing or signed-URL API routes and AWS credential management.

### Evaluation Matrix

| Criterion | Option 1: `@wllama/wllama` v4.0.0 (Selected) | Option 2: Hosted Cloud LLM API | Option 3: Browser WebGPU |
|---|---|---|---|
| **Inference & Egress Cost** | **$0** (client CPU + public HF Hub) | Ongoing $/token or quota walls | $0 (client GPU + HF Hub) |
| **Device / Browser Reach** | High (Wasm everywhere; MT w/ COOP/COEP, ST fallback) | Universal | Medium (WebGPU unavailable on many student devices) |
| **Cold-Start / Download UX** | Heavy (~521 MB opt-in, OPFS cached thereafter) | Instant | Heavy (similar weight download) |
| **Client Memory Footprint** | ~700 MB–1.2 GB tab RAM during active session | Minimal | High (VRAM + JS heap) |
| **Operational Complexity** | Low–Medium (scoped COOP/COEP + CDN Wasm assets) | Medium (secrets, rate limits, billing alerts) | High (WebGPU shader/driver quirks) |
| **Privacy / Code Locality** | Code stays in browser for AI evaluation | Code sent to third-party LLM vendor | Code stays in browser |
| **Lock-In / Exit Cost** | Low (encapsulated behind `lib/codelolAi.ts`) | Low–Medium (provider SDK/prompts) | Medium (MLC/ONNX model formats) |

## Decision

### 1. Client Inference Service Module (`codelol/lib/codelolAi.ts`)

Create a client-only module `codelol/lib/codelolAi.ts` encapsulating all `@wllama/wllama` v4.0.0 interactions:
- **WASM Assets:** Prefer bundling/copying `@wllama/wllama@4.0.0`'s `.wasm` runtime assets into `codelol/public/wasm/` (`{ default: '/wasm/wllama.wasm' }`) to eliminate jsDelivr CDN SPOF after weights are cached offline, with `WasmFromCDN` (`@wllama/wllama/esm/wasm-from-cdn.js`) as the explicit fallback/configurable path.
- **Guards & Lifecycle:**
  - Single in-flight initialization promise + module singleton; explicit `disposeAiModel()` (`await wllama.exit()`) on toggle-off/unmount.
  - Check `navigator.deviceMemory`: disallow cold load below `4 GB` with clear UX guidance; check `navigator.storage?.estimate()` before downloading (~700 MB headroom check) and catch `QuotaExceededError` (Safari Private Browsing) cleanly.
  - Expose `"Clear Cached AI Model"` via Wllama `CacheManager`.
- **Model Config & Loading (`LoadModelParams`):**
  - Read public `NEXT_PUBLIC_HF_MODEL_REPO` and `NEXT_PUBLIC_HF_MODEL_FILE` (zero AWS/S3 or HF secret keys allowed in client bundles).
  - Pass `{ n_ctx: 1024, jinja: true, useCache: true, progressCallback }` to `wllama.loadModelFromHF({ repo, file }, params)` (**not** on `createChatCompletion`).
- **Async Non-Blocking Inference (`getCodeFeedback`) & Truth Override:**
  - Invoke `wllama.createChatCompletion` with system message `"CODELOL_VERIFIER_V2"`, user message `"lang:${lang} | prog:${prog} | expected:${expected} | actual:${actual} | error:${error} | code:${code}"`, `max_tokens: 70`, `temperature: 0.7`, `top_p: 0.8`, `top_k: 20`, `response_format: { type: 'json_object' }`, and `chat_template_kwargs: { enable_thinking: false }`.
  - Wrap with a `15_000` ms inference timeout and monotonic `runId` stale-result discard inside `hooks/useRoast.ts` so code execution output, sound (`playMemeSound`), and the Run/Submit button remain **100% non-blocking**.
  - Strip `<think>...</think>` blocks and markdown code fences, extract JSON, validate schema (`roast`, `fix`, `mood`), and fall back immediately to `POST /api/roast` on truncation or parse errors.
  - Enforce deterministic truth override:
    - Script / normalized test check: `condition_satisfied = (error === "None" && (expected === "N/A" ? true : actual.trim() === expected.trim()))`.
  - **Workspace Context Mapping Table:**
    - `problems/[id]` (`expectedOutput != null`): `expected = String(expectedOutput)`, `actual = stdout`, `error = err || "None"`.
    - `problems/[id]` (`===TEST_RESULTS===`): `expected = "ALL_TESTS_PASSED"`, `actual = (passed === total && !err) ? "ALL_TESTS_PASSED" : "${passed}/${total} tests failed"`, `error = err || "None"`.
    - `learn` (`LearnPageClient`): `expected = "ALL_CHECKS_PASSED"`, `actual = allPassed ? "ALL_CHECKS_PASSED" : summary`, `error = err || "None"`.
    - `playground` & ungraded `InteractiveCompiler`: `expected = "N/A"`, `actual = stdout`, `error = err || "None"`.
  - Pass active `language` prop into `RoastCard.tsx` (`SEE THE FIX` Monaco viewer) instead of hardcoding `"javascript"`.

### 2. Scoped Cross-Origin Isolation (`codelol/next.config.ts` & `codelol/vercel.json`)

- Apply `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: credentialless` strictly to `/problems/:path*`, `/playground`, and `/learn` (excluding `/login`, `/auth/callback`, `/`, and `/api/*`). Maintain single-source headers in `codelol/next.config.ts` (and enforce automated Vitest parity if mirrored in `codelol/vercel.json`).
- **SPA Soft-Navigation Handling:** When the learner clicks **Enable AI Roast Mode** on a non-Safari browser while `!window.crossOriginIsolated`, persist code draft + opt-in state and execute a `sessionStorage`-guarded one-time reload to establish isolation; keep single-thread WASM automatic fallback on Safari/iOS or whenever `!crossOriginIsolated`.

### 3. Pre-Acceptance Blockers & Verification Gates

Before transitioning ADR-0007 from `Proposed` to `Accepted` and entering Wave 1:
1. Human confirms public `NEXT_PUBLIC_HF_MODEL_REPO` (`<username>/<repo>`) and approves the updated ADR.
2. Live browser verification confirms Hugging Face `cas-bridge.xethub.hf.co` CORS/Range fetches, Monaco CDN, `<iframe sandbox="allow-scripts">`, Supabase GIFs, and `/login` Google OAuth under scoped headers, alongside a 20-sample JSON/truth-override evaluation (`<= 5s` desktop MT inference target).

## Consequences

### Positive
- Zero recurring AI compute cost; user code remains local for AI evaluation; instant fallback via `/api/roast`.

### Negative
- ~521 MB cold download, ~700 MB–1.2 GB active RAM footprint, Safari single-thread fallback, SPA soft-navigation COOP/COEP limitation, and small-model JSON risk.

### Neutral
- Execution sandbox (`lib/executor.ts`) and `/api/run` remain unchanged.
