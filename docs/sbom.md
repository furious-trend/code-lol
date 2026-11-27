---
agent-notes:
  ctx: "software bill of materials, all dependencies"
  deps: [codelol/package.json, codelol/package-lock.json]
  state: active
  last: "pierrot@2026-11-26"
---
# Software Bill of Materials (SBOM)

<!-- This file is maintained by Pierrot. Update it whenever dependencies change. -->
<!-- Sato must notify Pierrot after adding, removing, or upgrading any dependency. -->

**Project:** codelol
**Last updated:** 2026-11-26
**Package manager:** npm
**Lock file:** `codelol/package-lock.json`

## Direct Dependencies

| Package | Version | License | Purpose |
|---------|---------|---------|---------|
| `@monaco-editor/react` | 4.7.0 | MIT | React Monaco code editor wrapper |
| `@supabase/ssr` | 0.12.4 | MIT | Next.js SSR cookie/session helpers for Supabase |
| `@supabase/supabase-js` | 2.111.0 | MIT | Supabase auth, database, and realtime client |
| `@wllama/wllama` | 4.0.0 | MIT | In-browser WebAssembly `llama.cpp` inference runtime & OPFS cache manager |
| `canvas-confetti` | 1.9.4 | ISC | Celebration confetti canvas effects |
| `framer-motion` | 13.1.1 | MIT | UI motion animations |
| `lodash.debounce` | 4.0.8 | MIT | Debounced draft/editor handlers |
| `lucide-react` | 1.39.0 | ISC | Vector icon library |
| `monaco-editor` | 0.57.0 | MIT | Browser code editor engine |
| `next` | 16.2.12 | MIT | React full-stack web framework |
| `react` | 19.2.4 | MIT | UI component runtime |
| `react-confetti` | 6.4.0 | MIT | React wrapper for celebration confetti |
| `react-dom` | 19.2.4 | MIT | DOM renderer for React |
| `react-markdown` | 10.1.0 | MIT | Markdown lesson and explanation renderer |

## Client-Side AI Model Artifact

| Model Artifact | Source | License | Integrity / Transport |
|----------------|--------|---------|----------------------|
| `codelol.gguf` (fine-tuned Qwen3.5-0.8B) | Public Hugging Face repo (`NEXT_PUBLIC_HF_MODEL_REPO`, default `shafiqahmed0075/codelol`) | Apache-2.0 (Qwen3.5 base weights) | Downloaded lazily in-browser via HTTPS & cached in OPFS; zero HF tokens shipped client-side |

## Dev Dependencies

| Package | Version | License | Purpose |
|---------|---------|---------|---------|
| `@tailwindcss/postcss` | 4.3.3 | MIT | Tailwind CSS v4 PostCSS plugin |
| `@testing-library/react` | 16.3.2 | MIT | React component testing utilities |
| `@types/canvas-confetti` | 1.9.0 | MIT | TypeScript definitions for canvas-confetti |
| `@types/lodash.debounce` | 4.0.9 | MIT | TypeScript definitions for lodash.debounce |
| `@types/node` | 20.19.43 | MIT | TypeScript definitions for Node.js |
| `@types/react` | 19.2.18 | MIT | TypeScript definitions for React |
| `@types/react-dom` | 19.2.4 | MIT | TypeScript definitions for React DOM |
| `@vitejs/plugin-react` | 6.1.0 | MIT | Vite React plugin for Vitest |
| `dotenv` | 17.4.2 | BSD-2-Clause | Local environment variable loader |
| `eslint` | 9.39.5 | MIT | JavaScript/TypeScript linter |
| `eslint-config-next` | 16.2.12 | MIT | Next.js ESLint ruleset |
| `jsdom` | 29.1.1 | MIT | DOM test environment for Vitest |
| `pg` | 8.23.0 | MIT | PostgreSQL client for migration/admin scripts |
| `tailwindcss` | 4.3.3 | MIT | Utility CSS framework |
| `ts-morph` | 28.0.0 | MIT | TypeScript AST inspection for content verification scripts |
| `typescript` | 5.9.3 | Apache-2.0 | TypeScript compiler |
| `vitest` | 4.1.11 | MIT | Unit and UI test runner |

## Transitive Dependencies

**Total dependency count:** 14 direct + 17 devDependencies + transitive packages = **672** locked packages in `codelol/package-lock.json`.

## License Summary

| License | Count | Notes |
|---------|-------|-------|
| MIT | 550 | Core framework, UI, Supabase, `@wllama/wllama` |
| Apache-2.0 | 34 | TypeScript & tooling |
| MPL-2.0 | 25 | Weak copyleft transitive deps |
| ISC | 24 | Lucide, confetti, CLI helpers |
| LGPL-3.0-or-later | 10 | Transitive packages in tree (`@img/sharp` / media libs); not bundled as proprietary derivatives |
| BSD-2-Clause / BSD-3-Clause / BSD | 14 | 10 BSD-2-Clause + 3 BSD-3-Clause + 1 BSD |
| Other | 15 | MIT-0 (2), CC0-1.0 (2), 0BSD (1), CC-BY-4.0 (1), BlueOak-1.0.0 (3), Python-2.0 (1), combined SPDX expressions (5) |

## Known Vulnerabilities

Summary from `cd codelol && npm audit --json` on 2026-11-26: 21 total advisories (0 info, 2 low, 10 moderate, 8 high, 1 critical). Note `@wllama/wllama@4.0.0` introduced **0** new security advisories.

| Package | Severity | Direct? | Status | Notes |
|---------|----------|---------|--------|-------|
| `next` (`16.2.12`, advisory range `<=16.4.4`) | Critical | Yes | Tracked | Pre-existing framework advisory in sprint backlog; upgrade separately |
| `brace-expansion`, `js-yaml`, `postcss`, `sharp`, `source-map-js`, `undici`, `vite`, `zod` | High | No (transitive) | Tracked | Dev/build toolchain transitive advisories; none introduced by `@wllama/wllama` |
