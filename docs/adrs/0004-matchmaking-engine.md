---
agent-notes: { ctx: "ADR for Matchmaking engine for 1v1 battles", deps: [], state: active, last: "archie@2026-08-26" }
---

# ADR 0004: Matchmaking & Battle Engine

## Status
Accepted

## Context
Users can challenge their friends to 1v1 coding battles. Once accepted, they both need to be routed to `/app/battle/[room_code]` where they will see a synchronized split code editor.

## Decision
- **Match Initiation**: Sender creates a notification `type: 'match_invite'` with `payload: { room_code: uuid }`.
- **Match Acceptance**: Receiver clicks 'Accept' which triggers navigation to `/app/battle/[room_code]`.
- **Synchronization**: Use Supabase Presence and Broadcast features within a specific channel `room:[room_code]`.
- **State**: The code editor and test runner state will be synced via Supabase Broadcast (since persisting every keystroke to DB is expensive and unnecessary).

## Consequences
- Ephemeral state (typing) is handled by Supabase Broadcast.
- Reduces DB load, but requires clients to handle connection drops gracefully.
