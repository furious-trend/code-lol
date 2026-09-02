---
agent-notes: { ctx: "Vercel service landscape for cloud specialists", deps: [.agents/agents/cloud-architect.md, .agents/agents/cloud-costguard.md, .agents/agents/cloud-netdiag.md], state: active, last: "cloud-architect@2026-09-02" }
---

# Vercel Service Landscape

> **Last updated:** 2026-09-02
> **Updated by:** Antigravity Agent
>
> Run `/cloud-update vercel` to refresh this file with current information.

This file is read by the cloud specialist agents (`cloud-architect`, `cloud-costguard`, `cloud-netdiag`) to supplement their built-in knowledge when operating in Vercel mode. It captures the current state of Vercel services, pricing, and gotchas that may change over time.

## Compute Options

| Service | Best for | Key limits/gotchas |
|---------|----------|-------------------|
| Serverless Functions | Next.js API routes, heavy SSR, backend logic | Up to 5GB Dockerfiles allowed now. Subject to 10s timeout on Hobby, longer on Pro. |
| Edge Functions | Middleware, lightweight geo-routed logic | Very limited Node.js API support, fast boot time. |
| Vercel Services | Multi-language backends (Go, Python, Rails) | Docker-based service-to-service internal networking. |
| Vercel Connect | Agentic workflows needing secure 3rd-party access | Provides short-lived scoped tokens instead of long-lived secrets. |
| Run SDK | Safe execution of AI agent code | Allows TypeScript execution with human-in-the-loop approvals. |

## Storage & Database Options

| Service | Best for | Key limits/gotchas |
|---------|----------|-------------------|
| Vercel Postgres | Relational data, Neon-backed | Connection pooling required for serverless environments. |
| Vercel KV | Redis caching, rate limiting | Global replication can have slight consistency delays. |
| Vercel Blob | Large file storage, uploads | Not meant to be a full CDN origin replacing S3 for complex apps, but great for user uploads. |
| Edge Config | Global fast-read config | Read-heavy, write-light. Sub-millisecond reads globally. |

## Pricing & Cost Traps

| Item | Cost | Mitigation |
|------|------|------------|
| Pro Plan Base | $20/seat/month | Includes $20 of usage credit applied flexibly across resources. |
| Resource Overages | On-demand billing | Monitor credit consumption closely, especially for AI or heavy SSR workloads. |
| Fast Data Transfer | Free up to 1 TB | Heavy media apps might exceed this; use Vercel Blob or external CDN for large static assets. |
| Edge Requests | Free up to 10 Million | Good for middleware, but chatty APIs can eat into this limit. |
| Add-ons | SAML SSO ($300/mo), HIPAA BAA ($350/mo) | Consider these enterprise costs if compliance is required. |

## Recent Changes and New Services

<!-- Update this section when running /cloud-update vercel -->
<!-- Include: new service launches, significant pricing changes, deprecated services, new regions -->

- **2026 Shift to Credit-Based Pricing:** The Pro tier now costs $20/seat/mo, which acts as $20 in flexible monthly usage credits across all metered services rather than rigid resource buckets.
- **2026 Vercel Services:** Launched support for running multiple frameworks (like Go, FastAPI) in a single deployment using Docker.
- **2026 Vercel Connect & Run SDK:** Major push into the "Agent Stack" enabling secure third-party token generation and secure human-in-the-loop code execution for AI agents.
- **2026 Function Size Increase:** Serverless functions now support up to 5GB Dockerfiles.

## Known Enterprise Patterns

- **Multi-framework Monorepos:** Using Vercel Services to deploy Next.js frontends alongside Python/Go microservices in the same project.
- **AI Agent Scaffolding:** Utilizing Vercel Connect and Run SDK to deploy AI agents that safely act on user behalf.
- **Granular Cost Monitoring:** Due to the 2026 shift to flexible credit billing, teams must audit specific resource spikes (like Fast Data Transfer vs Active CPU) using Vercel's observability dashboard.
