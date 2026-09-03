---
type: tracking-artifact
phase: architecture
topic: codelol
date: 2026-08-20
prior_phase: discovery
---

# CodeLOL Architecture Assessment

## Chosen Architecture
The platform will continue to use a Next.js App Router front-end, with Supabase serving as the Single Source of Truth (SSOT) for all user state and progress. Code execution will remain entirely client-side to minimize server costs and latency, but must be properly sandboxed.

## Key Decisions (ADRs)
1. **Supabase for All Progress**: Move away from `localStorage` for the problems section. We will introduce a new `problem_completions` table (or similar schema) and a unified `lib/progress.ts` utility to ensure `/learn`, `/quiz`, and `/problems` all persist reliably to the backend.
2. **Client-Side Sandbox**: `lib/executor.ts` will rely on an iframe with `sandbox="allow-scripts"` to safely execute arbitrary user JavaScript without exposing `parent.window` or Supabase session tokens.
3. **Deprecate Remote Execution**: The Judge0/Piston integration will be fully removed in favor of local JS execution to ensure zero latency and zero infra overhead.

## Threat Surface
- **Malicious User Code**: Mitigated by sandboxing the execution iframe.
- **API Abuse**: Endpoints calling paid services (Gemini API for roasts, Giphy) must be protected by rate-limiting to prevent billing exhaustion attacks.

## Debate Results
- *Challenge*: Is an iframe sandbox sufficient for code execution? 
  *Resolution*: Yes, provided `allow-same-origin` is omitted, it effectively neuters the script's ability to access the DOM or cookies of the parent Next.js app. While infinite loops can still lock the iframe thread, this is an acceptable tradeoff for a zero-infra V1.
