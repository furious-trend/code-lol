---
type: tracking-artifact
phase: plan
topic: codelol
date: 2026-08-20
prior_phase: architecture
---

# CodeLOL Sprint 1 Plan

## Goals
Execute the 10-point Master Prompt checklist to secure and stabilize the CodeLOL platform.

## Scope (Sprint 1)
- **Correctness**: Fix `problems/[id]` newline parsing, enforce iframe sandboxing, and implement API rate limiting.
- **Architecture**: Create Supabase migration for problem completions, build unified `progress.ts`, and wire the Global Navbar.
- **Cleanup**: Purge all Judge0/Piston code, delete `piston-server/`, swap to `react-markdown`, and drop scratch test files.

## Test Strategy
- Local validation via dev server.
- Console injection testing (attempting to read `parent.localStorage` from the code executor).
- API stress testing (spamming `/api/roast` to verify 429 Too Many Requests response).

## Open Risks
- Supabase migrations might require manual application if local CLI is not initialized; will write SQL manually and apply via Supabase dashboard or local `psql` if needed.
