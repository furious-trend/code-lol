---
agent-notes: { ctx: "ADR for Supabase Realtime design for friends and chat", deps: [], state: active, last: "archie@2026-08-26" }
---

# ADR 0003: Supabase Realtime Design for Friends & Chat

## Status
Accepted

## Context
We need to support real-time user discovery, friend requests, and 1v1 chat messages. We are using Supabase. 
The system needs to notify users when a friend request is sent/accepted, and instantly deliver messages when `friendships.status === 'accepted'`.

## Decision
- **Database Schema**: Implement `profiles`, `friendships`, `direct_messages`, and `notifications` tables.
- **Row Level Security (RLS)**:
  - `profiles`: readable by authenticated, editable by owner.
  - `friendships`: readable/insertable by involved parties.
  - `direct_messages`: readable/insertable by `sender_id` or `receiver_id` if there is an accepted friendship.
- **Realtime Channels**: 
  - Each user subscribes to `notifications` where `user_id = eq(their_uuid)`.
  - For chat, users subscribe to `direct_messages` filtering by `receiver_id=eq(their_uuid)`.

## Consequences
- Requires strict RLS to prevent unauthorized access.
- Realtime subscriptions must be managed correctly in React using `useEffect` or Supabase hooks to prevent memory leaks.
