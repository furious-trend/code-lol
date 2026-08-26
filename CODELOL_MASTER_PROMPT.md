# CodeLOL — Master Development Prompt

Paste this entire document into Antigravity as one instruction. Work through the sections in order (0 → 6). Each section builds on the last — don't skip ahead. Test and confirm each section works before moving to the next. Report back after each section with what changed and a live test confirmation.

---

## SECTION 0 — Critical Bug Fixes (do these first, before anything else)

1. **Problem test verification bug**: In `app/problems/[id]/page.tsx` (~line 150):
   ```javascript
   const outputLines = data.output.split('\\n');   // ❌ WRONG — splits on literal backslash-n
   ```
   Change to:
   ```javascript
   const outputLines = data.output.split('\n');    // ✅ real newline
   ```
   Reason: `lib/executor.ts` joins console output with a real newline (`logs.join('\n')`), so the old code could never correctly find the `===TEST_RESULTS===` marker, causing correct code to show as failing.

   **Test:** Submit a correct solution to "beginner-1" (Add Two Numbers) — must show "🎉 Accepted!" Submit a wrong solution — must show accurate fail count, not a raw JSON dump.

2. **GIF fetch fragility**: In `hooks/useRoast.ts`, a failed GIF fetch currently throws and blocks the entire roast from displaying. Wrap the GIF fetch in its own try/catch — on failure, set `gifUrl` to an empty string and still show the roast text/fix/mood. Update `components/RoastCard.tsx` to gracefully hide the image area when `gifUrl` is empty (no broken image icon).

3. **Gemini reliability**: In `app/api/roast/route.ts`, lower the Gemini timeout from 4000ms to 2500ms so slow/rate-limited responses fall back faster to the existing local `lib/fallbackRoasts.ts` pool — this pool is already well-built, lean on it more aggressively for reliability.

---

## SECTION 1 — Visual Identity: The "Bugsy" Mascot System

Create a recurring mascot to give the app a consistent, ownable personality (currently missing — generic dark-mode-with-gradients doesn't stand out).

1. **Design `components/Bugsy.tsx`** — a lightweight, reusable SVG mascot:
   - A cartoon bug/glitch character: rounded body, small legs/antennae, a big grinning, slightly mischievous face — it should look proud of causing chaos, not scary or ugly.
   - Support mood props: `<Bugsy mood="happy" />`, `<Bugsy mood="laughing" />`, `<Bugsy mood="dizzy" />`, `<Bugsy mood="thinking" />` — achieve this via simple eye/mouth shape swaps, not fully separate drawings.
   - Use flat shapes and minimal paths so it renders crisply from 24px (navbar icon) to 120px (celebration moment).
   - Color it using a NEW warm accent color (amber/orange) — introduced specifically as the app's "fun moments" color, distinct from the existing blue/purple "serious UI" gradient (editor, navigation, structural chrome).

2. **Place Bugsy contextually throughout the app:**
   - Navbar: small static Bugsy next to the "CodeLOL" wordmark
   - Roast Card: Bugsy (`mood="laughing"`) appears alongside the roast text, as the character "delivering" the joke
   - Loading states: Bugsy (`mood="dizzy"`, gently spinning/bouncing) replaces plain "Roasting..." text and generic spinners everywhere in the app
   - Empty states (e.g. "Run your code to see results"): Bugsy (`mood="thinking"`) sitting idle
   - 404 / error pages: Bugsy (`mood="dizzy"`) with a funny on-brand error message
   - Level-up celebrations: Bugsy (`mood="happy"`) appears alongside the confetti burst

3. **Supporting visual changes:**
   - Add a subtle background texture to the `zinc-950` base (faint dot-grid or code-symbol pattern) so large empty areas don't feel flat
   - Give `RoastCard` a more distinctive shape — a slight tilt, comic-style border, or speech-bubble tail pointing toward Bugsy — so it reads as "a character speaking," not a generic alert box

---

## SECTION 2 — Animation & Micro-Interactions

Install `framer-motion` if not already present. Add motion to everyday moments, not just big celebrations:

- **Buttons**: satisfying press animation (slight scale-down + shadow shift) on all primary actions (Run Code, Submit & Roast, Next Level)
- **Console output**: animate in (slide/fade) when results appear, instead of an instant text swap
- **Loading states**: Bugsy-based animated loading (see Section 1) instead of static text
- **Level transitions**: smooth fade/slide between Learn Mode levels — no jarring reload feeling
- **Quiz feedback**: small shake animation on wrong answers, bounce/pop on correct answers, layered on top of the existing color-change feedback
- **Navbar links**: subtle hover animation (underline slide-in or smooth color transition)
- **GIF/image loads**: fade-in when a GIF finishes loading, rather than popping in abruptly

---

## SECTION 3 — Humor as a Persistent Personality (not just a feature)

Humor currently only appears in roasts and lesson jokes. Extend it everywhere so the app feels funny to just exist inside, not just when triggered:

1. **Loading/empty state copy**: replace generic text ("Loading your progress...", "Run your code to see results") with 5-8 rotating funny variations per state, e.g.: "Untangling your semicolons...", "Asking the code gods for mercy...", "Reticulating splines (we don't know what that means either)...", "Bribing the compiler with snacks..."

2. **404 / error pages**: create `app/not-found.tsx` and `app/error.tsx` (if missing) with on-brand funny messaging + Bugsy, instead of default Next.js/browser error screens

3. **Ambient humor**: add a small rotating joke/tip element (footer or subtle badge) pulling from `lib/jokes.ts`, refreshing per page load

4. **Consistent button microcopy**: apply the punchy style already used in Problems ("Submit & Roast 🚀🔥") consistently across Learn and Playground buttons too

5. **Celebration variety**: rotate between 5-6 different level-up/success phrases instead of always showing the same "Nailed it! 🎉" — repeat users should see fresh reactions

6. **Roast prompt quality** (in `app/api/roast/route.ts`): keep the existing punchline rules (one sentence, under 20 words, specific to the actual bug, no obscure references) — this is already well-tuned, don't loosen it.

---

## SECTION 4 — Retention & Engagement (make people want to stay)

This is about designing the loop that keeps someone in the app past their first 5 minutes:

1. **Visible progress everywhere**: add a persistent small progress indicator (e.g. XP bar or level badge) in the navbar, visible on every page, not just inside Learn Mode — so progress feels like an always-present game state.

2. **Daily streak visibility**: surface the streak counter prominently on the Landing/Home page for logged-in users, with a small flame/Bugsy animation that grows more excited at higher streaks (e.g. Bugsy wearing sunglasses at a 7+ day streak).

3. **Session-end hook**: when a user finishes a level or problem, in addition to "Next Level," show a soft, funny nudge for a natural next action — e.g. "One more? Bugsy dares you 😏" — framed as playful, never guilt-driven or manipulative.

4. **Variety in mini-quiz phrasing and GIF reactions**: confirm the existing mixed Tamil/general GIF sourcing and quiz question variety continue to feel fresh across repeated sessions — avoid the same 2-3 GIFs/phrases repeating constantly for the same mood/keyword.

5. **Visible milestones**: add simple milestone moments at every 10 levels and every tier completion (25/50/75/100) — a bigger celebration screen with Bugsy, confetti, and a short "you're now Tier X" message, giving users something to look forward to beyond the next single level.

---

## SECTION 5 — Reliability & Polish Pass

- Global error boundary (`app/error.tsx`) with on-brand funny fallback UI instead of a raw crash screen
- Audit all loading/empty states across Learn, Problems, Playground, Quiz for blank white flashes before content loads
- Confirm mobile responsiveness across all new animations/components — nothing should break or overflow on small screens
- Confirm Bugsy renders correctly and lightweight (no layout shift) across every placement listed in Section 1

---

## SECTION 6 — Final Review

Do a full click-through and report back:
1. Landing page (check streak/progress visibility, Bugsy presence)
2. Sign up / login
3. Learn Mode Level 1: explanation → run code → roast+GIF → quiz → level-up celebration
4. Problems page: submit correct AND incorrect solutions, confirm accurate pass/fail
5. Playground: run code, see roast
6. Visit a broken/nonexistent URL to confirm the 404 page

Summarize what was built in each section, flag anything that needs my direct input (color choices, copy tone, Bugsy's exact expression), and confirm the full experience feels cohesive — one connected app with a consistent, funny personality throughout, not a collection of separate features.