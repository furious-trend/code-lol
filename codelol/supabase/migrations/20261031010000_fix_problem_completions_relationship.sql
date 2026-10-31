-- agent-notes: { ctx: "Migration to fix problem_completions profiles relationship and add solve_time_ms", deps: [], state: "active", last: "sato@2026-10-31" }

-- 1. Ensure solve_time_ms and complexity tracking columns exist on problem_completions
ALTER TABLE public.problem_completions 
  ADD COLUMN IF NOT EXISTS solve_time_ms integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS time_complexity text,
  ADD COLUMN IF NOT EXISTS space_complexity text,
  ADD COLUMN IF NOT EXISTS points_awarded integer DEFAULT 0;

-- 2. Ensure rank_points exists on profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS rank_points integer DEFAULT 0;

-- 3. Link problem_completions(user_id) to public.profiles(id)
-- PostgREST requires a direct foreign key between public tables to discover the relationship
ALTER TABLE public.problem_completions 
  DROP CONSTRAINT IF EXISTS problem_completions_user_id_profiles_fkey,
  DROP CONSTRAINT IF EXISTS problem_completions_user_id_fkey;

ALTER TABLE public.problem_completions
  ADD CONSTRAINT problem_completions_user_id_profiles_fkey
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- 4. Ensure RLS policies allow public read access for leaderboard
ALTER TABLE public.problem_completions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view problem completions for leaderboard" ON public.problem_completions;
CREATE POLICY "Anyone can view problem completions for leaderboard" 
  ON public.problem_completions FOR SELECT 
  USING (true);

-- 5. Force PostgREST to reload its schema cache
NOTIFY pgrst, 'reload schema';

