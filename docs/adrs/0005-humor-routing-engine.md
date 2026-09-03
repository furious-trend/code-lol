---
agent-notes: { ctx: "ADR for Humor routing engine", deps: [], state: active, last: "archie@2026-08-26" }
---

# ADR 0005: Humor Routing Engine

## Status
Accepted

## Context
CodeLOL features a dynamic humor engine based on `humor_preference` ('general' or 'tamil'). Memes and sounds need to be served for Success (Right) or Failure (Wrong) conditions.

## Decision
- **File Structure**: 
  - `public/gifs/general/right/` and `wrong/`
  - `public/gifs/tamil/right/` and `wrong/`
- **Routing API**: 
  - `/api/gif/route.ts` will take `?mood=right|wrong&preference=general|tamil`.
  - It will read the server directory, randomly pick a GIF/sound, and return its public URL.
- **Client Cache**: The frontend will prefetch a few GIFs to ensure instant meme delivery upon test pass/fail.

## Consequences
- Requires a build step (or server runtime) to list directory contents because Next.js API routes cannot easily read local file system at runtime in some serverless environments without static analysis.
- *Mitigation*: We will use `predev`/`prebuild` to generate a `gifsManifest.json` that the API route imports.
