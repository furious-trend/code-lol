# codelol - Project Summary

## Overview
**codelol** is a full-stack, gamified learning platform designed to help users learn programming languages like JavaScript and Python in a fun, interactive way. Built on modern web technologies, it features in-browser code editing, AI-assisted feedback (code roasting/verification), and a robust set of social features.

## Tech Stack
- **Frontend Framework:** Next.js (v16.2.12) with React 19
- **Language:** TypeScript
- **Styling & Animation:** Tailwind CSS (v4), Framer Motion
- **Backend & Database:** Supabase (Auth, Postgres DB, Realtime subscriptions)
- **Code Editor:** Monaco Editor (`@monaco-editor/react`)
- **AI Integrations:** Google Generative AI (Gemini), Groq SDK
- **Code Execution:** Piston (Docker-based execution engine)
- **Testing:** Vitest & React Testing Library

## Core Features
1. **Interactive Learning & Coding**
   - **Lessons:** Structured lessons for different languages (Python, JavaScript).
   - **In-Browser Editor:** Users can write and test code directly in the browser via Monaco.
   - **Code Execution:** Code runs against a Piston backend for secure, isolated execution.
   - **Verification:** Automatically evaluates the execution results against expected strings/RegExp.

2. **AI Assistance & "Roasting"**
   - Integrates with Gemini and Groq to provide AI-driven feedback or humorous "roasts" on the user's submitted code.

3. **Gamification & Progression**
   - Users earn experience, levels, and rank tiers (e.g., Beginner, Intermediate, Expert) based on problem completions.
   - Streak tracking to encourage daily learning.

4. **Social & Community**
   - **Friend System:** Users can search for others, send friend requests, and view their friends list.
   - **Messaging:** Direct messaging between friends using Supabase Realtime for instant delivery.
   - **Notifications:** In-app notifications for friend requests and streak milestones.
   - **Leaderboards:** Competitive rankings based on levels and completions.

## Architecture Highlights
- Uses a **Hybrid Team/Agent Methodology** (outlined in `AGENTS.md` and `docs/methodology/`) prioritizing test-driven development (TDD), Architectural Decision Records (ADRs), and strict phase boundaries.
- **Client & Server Component Separation:** Heavy use of Next.js App Router patterns, utilizing server components for data fetching and passing data to specialized `*PageClient.tsx` components.
- **Robust Database Security:** Extensive use of PostgreSQL Row-Level Security (RLS) policies on Supabase to ensure users can only access their own data, messages, and notifications.
