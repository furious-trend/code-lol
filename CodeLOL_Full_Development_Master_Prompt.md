# CodeLOL — Full Development Master Prompt

Paste this entire document into Antigravity as one instruction. Work through sections in order, 0 through 7. Do not skip ahead — each section depends on the one before it being genuinely correct, not just reported as done. After each section, show real proof (test output, actual file contents, a described real click-through) before moving to the next. This is a large build — take the time needed to do it properly rather than rushing.

---

## SECTION 0 — Fix confirmed real bugs first (verified by direct testing, not assumptions)

1. **JavaScript routing bug**: `app/api/run/route.ts`'s `COMPILER_MAP` still includes `'javascript': 'typescript-deno'`, sending JavaScript to the external OnlineCompiler.io API instead of the fast in-browser executor. Remove `'javascript'` from this map entirely. The route should return a 400 with a clear message if javascript is ever requested through it. Confirm the frontend calls `executeCodeInBrowser` directly for JS, never this route.

2. **Missing middleware.ts**: This file does not exist (confirmed via `ls middleware.ts` returning "No such file or directory"). Build it now: redirect unauthenticated users to `/login` for all protected routes, redirect non-onboarded users to `/onboarding`, redirect fully-authenticated users away from `/login`. After building, run `ls middleware.ts` yourself and show the real output.

3. **Fix all currently failing tests**: Run `npx vitest run`, fix every failure one at a time — `fallbackRoasts.test.ts` ("4 distinct arrays"), `complexityAnalyzer.test.ts` (fallback case), `projectVerifier.test.ts` (3 requirement-check failures), `learn.test.tsx`/`lessonExplanationPage.test.tsx` (DeepConcept/dual humor rendering), and the `app/api/run/route.test.ts` URL mismatch (`run-code` vs `run-code-sync` — confirm which is actually correct per OnlineCompiler.io and fix accordingly). For each, determine whether the test or the implementation is wrong — don't weaken assertions just to force green.

4. Re-run the full suite and show the real final count: 0 failing, out of however many total tests exist.

**Do not proceed to Section 1 until Section 0 is genuinely verified — real test output, real file existence checks.**

---

## SECTION 1 — Full 5-language support, consistently, everywhere

The app should treat javascript, python, c, cpp, and java as equally first-class across every mode: Playground, Learn, Library, Quiz Zone, Problems, and Battle Mode. Audit each of these and fix any that only partially support the full language set:

1. **Execution routing** (confirm, don't rebuild if Section 0 already fixed it): javascript → in-browser executor; python, c, cpp, java → OnlineCompiler.io. No language should silently fall back to another or produce mocked output.

2. **Settings page**: confirm all 5 languages are selectable as the user's `learning_language` preference.

3. **Playground**: confirm the language dropdown includes all 5, each switch updates the starter code shown, updates a visible language badge, and routes to the correct execution engine. Test switching through all 5 in sequence, in both directions.

4. **Problems page**: confirm problems have starter code and hidden test harnesses for all 5 languages where feasible (some problems may reasonably stay JS/Python-only if the concept doesn't translate well to C/C++/Java — use judgment, but don't leave gaps silently; if a language genuinely can't support a given problem, say so explicitly rather than leaving it broken).

5. **Battle Mode**: confirm language selection at battle creation supports all 5, and the test harness used during a battle works correctly for whichever language was chosen.

---

## SECTION 2 — Learning, Library, and Quiz Zone: fully built per-language content, with correct language filtering

This is the largest content section. Build it in stages, pausing for review between each.

1. **Learn Mode** (`app/learn`): confirm every lesson across all 4 tiers has content for javascript and python already (per earlier work); extend concept coverage to c, cpp, and java using the language-specific concept sets already defined (C: pointers/memory management/structs; C++: classes/STL/operator overloading; Java: interfaces/access modifiers/exception handling, etc.) — build Beginner tier for C, C++, and Java first, show 3 sample lessons per language, then continue to remaining tiers once approved.

2. **Library** (`app/lessons` — the browse-all-content reference view, separate from the sequential Learn flow): confirm this is READ-ONLY reference content, not a practice/execution area. Add a checkbox or "Mark as Learned" indicator on every entry. Clicking an entry should navigate into a detail view; if the user wants to practice (run code), route them to the Learn page for that same concept, not provide code execution inside Library itself.

3. **Quiz Zone**: confirm quiz topics and questions exist across the full tier structure already built; when a user selects a language (javascript/python/c/cpp/java), Quiz Zone should show ONLY questions relevant to that language's actual syntax/concepts, not generic questions that happen to apply to all languages — build language-specific question variants where a concept's quiz question depends on syntax (e.g. a "what does this loop do" question needs different code per language), reusing the same concept/difficulty structure across languages.

4. **CRITICAL language-filtering rule across Learn, Library, and Quiz Zone**: when a user has a language selected, every page should show ONLY that language's content — lessons, library entries, and quiz questions should never mix languages or show C content while Python is selected. Audit all three systems for this and fix any cross-contamination (this exact bug was found and fixed once before for Learn Mode's JS/Python arrays — check Library and Quiz Zone haven't inherited a similar mistake).

5. **Previous levels remain accessible**: confirm a user can navigate back to and re-view/re-practice any previously completed level, not just the current one — progression should be one-directional for UNLOCKING new content, but never lock away what's already been completed.

---

## SECTION 3 — Dual humor (General/Tamil), fully wired across all languages and all modules

1. Confirm `humor_preference` ('general' | 'tamil') correctly drives joke/roast selection from the local fallback pools (`lib/fallbackRoasts.ts`) regardless of which of the 5 languages the code being roasted was written in — humor content is language-agnostic, only the code/error being joked about differs.

2. Confirm lesson jokes (`funnyExplanation` vs `funnyExplanationTamil`) are present and correctly selected based on `humor_preference` for ALL languages' lesson content built in Section 2, not just the original JS/Python lessons.

3. Confirm GIF selection (local `/public/gifs/happy`, `/roasting`, `/tamil` folders) correctly respects `humor_preference`, independent of language.

---

## SECTION 4 — UI layout: execution output above, GIF + jokes below

Across Playground, Problems, Learn Mode, and Battle Mode — wherever code execution results are shown, enforce this consistent layout order, top to bottom:
1. Execution output/console (the real compiled/run result — stdout, stderr, pass/fail for tests)
2. Roast/joke text
3. GIF (happy or roasting, matching pass/fail and humor_preference)

Audit every page currently showing these three elements and fix the ordering to match this consistently — some pages may currently show GIF/joke before output, or interleaved inconsistently. Make it uniform everywhere.

---

## SECTION 5 — Notifications: show the requester's username

1. Confirm the Notifications component (`components/Notifications.tsx`) correctly fetches and displays the actual username/display_name of the person who sent a friend request — not just a generic "You have a new friend request" message, and not a raw user ID.

2. Apply the same standard to battle invite notifications (show who invited you by name) and any other notification type involving another user.

3. Test: Account A sends Account B a friend request — confirm Account B's notification clearly shows Account A's actual username, live via Realtime, without needing a refresh.

---

## SECTION 6 — Full regression test

After all sections above: run the full test suite again (`npx vitest run`) and confirm 0 failures. Then do a real click-through, reporting actual observed behavior for each:

1. Sign up (Google) → onboarding (username, humor pick) → home
2. Try accessing a protected page while logged out → confirm redirect to /login works (tests Section 0's middleware)
3. Settings → switch through all 5 languages → confirm each persists correctly
4. Playground → cycle through all 5 languages → confirm starter code, badge, and correct execution engine each time, with output-then-joke-then-gif layout order
5. Learn Mode → pick a non-JS/Python language (e.g. Java) → confirm lessons are genuinely Java-specific, not leftover JS/Python content
6. Library → confirm it's read-only with "mark as learned" checkboxes, and "practice" correctly routes to Learn
7. Quiz Zone → switch language → confirm questions shown are language-appropriate
8. Problems → submit correct and incorrect solutions in at least 2 different languages → confirm accurate pass/fail, correct output-then-roast-then-gif order, correct humor style
9. Battle Mode → create and join a battle in a non-default language → confirm it works end to end
10. Friends → send a request from a second test account → confirm the notification shows the real username live

## SECTION 7 — Final report

Give me an honest, itemized status for every section above — PASS or FAIL with specifics for each, not a summary claiming "everything works." If anything is incomplete, say so clearly rather than reporting it as done.
