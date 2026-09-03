---
type: tracking-artifact
phase: discovery
topic: codelol
date: 2026-08-20
prior_phase: None
---

# CodeLOL Discovery

## Vision
CodeLOL is a comedy-themed "learn to code" app combining interactive lessons, LeetCode-style problems, and quizzes, heavily featuring AI roasts and reaction GIFs to keep engagement high.

## Goals
- Unify the disjointed learning surfaces (`/learn`, `/lessons`, `/problems`, `/quiz`, `/playground`).
- Consolidate progress tracking so it securely persists in Supabase instead of volatile `localStorage` or siloed database paths.
- Harden the core platform (security, rate-limiting, fixing broken endpoints).
- Deliver a robust, bug-free core loop ready for user onboarding.

## Constraints
- Minimal/no reliance on complex third-party code execution runtimes; stick to client-side sandboxed JS to avoid VPS costs and latency.
- No heavy infrastructure for now. Use Next.js, Supabase, and local client logic.

## Key Insights
- The app's core feature—browser code execution—has a hidden bug in test verification and runs unsandboxed. This is the highest priority fix.
- UI elements mask underlying architectural debt (e.g. 5 disparate routing paradigms for essentially similar content).
