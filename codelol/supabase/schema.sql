-- agent-notes: { ctx: "Master database schema and security configuration for CodeLOL", deps: [], state: "active", last: "sato@2026-10-31" }

-- ==============================================================================
-- CODELOL COMPLETE DATABASE SCHEMA & SECURITY SETUP
-- Compatible with Next.js 16, Supabase Auth, Realtime, Battles, and Multi-language
-- ==============================================================================

-- ==========================================
-- 0. EXTENSIONS SETUP
-- ==========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- 1. TABLE CREATIONS & COLUMN ENSURANCE
-- ==========================================

-- 1.1 Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
  username text UNIQUE,
  display_name text,
  avatar_url text,
  email text,
  humor_preference text DEFAULT 'general' CHECK (humor_preference IN ('general', 'tamil')),
  learning_language text DEFAULT 'javascript' CHECK (learning_language IN ('javascript', 'python', 'c', 'cpp', 'java')),
  streak_count int DEFAULT 0,
  current_streak int DEFAULT 0,
  last_activity_date date,
  levels_completed int DEFAULT 0,
  current_level int DEFAULT 1,
  current_tier text DEFAULT 'Beginner',
  rank_points int DEFAULT 0,
  onboarding_complete boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Ensure all columns exist on existing profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS display_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS humor_preference text DEFAULT 'general';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS learning_language text DEFAULT 'javascript';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS streak_count int DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS current_streak int DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_activity_date date;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS levels_completed int DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS current_level int DEFAULT 1;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS current_tier text DEFAULT 'Beginner';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS rank_points int DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_complete boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Case-insensitive unique index for display_name
CREATE UNIQUE INDEX IF NOT EXISTS profiles_display_name_unique_idx 
  ON public.profiles (lower(display_name));

-- 1.2 Friendships Table
CREATE TABLE IF NOT EXISTS public.friendships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  friend_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status text CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, friend_id)
);

-- 1.3 Direct Messages Table
CREATE TABLE IF NOT EXISTS public.direct_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 1.4 Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type text CHECK (type IN ('match_invite', 'platform_update', 'streak_milestone', 'friend_request')) NOT NULL,
  title text NOT NULL,
  payload jsonb DEFAULT '{}'::jsonb,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 1.5 Problem Completions Table
CREATE TABLE IF NOT EXISTS public.problem_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  problem_id text NOT NULL,
  solve_time_ms int DEFAULT 0,
  points_awarded int DEFAULT 0,
  time_complexity text,
  space_complexity text,
  completed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, problem_id)
);

-- Ensure all columns exist on existing problem_completions table
ALTER TABLE public.problem_completions ADD COLUMN IF NOT EXISTS solve_time_ms int DEFAULT 0;
ALTER TABLE public.problem_completions ADD COLUMN IF NOT EXISTS points_awarded int DEFAULT 0;
ALTER TABLE public.problem_completions ADD COLUMN IF NOT EXISTS time_complexity text;
ALTER TABLE public.problem_completions ADD COLUMN IF NOT EXISTS space_complexity text;

-- Re-link foreign key to public.profiles so PostgREST resolves the 'profiles' join relationship
ALTER TABLE public.problem_completions 
  DROP CONSTRAINT IF EXISTS problem_completions_user_id_profiles_fkey,
  DROP CONSTRAINT IF EXISTS problem_completions_user_id_fkey;

ALTER TABLE public.problem_completions
  ADD CONSTRAINT problem_completions_user_id_profiles_fkey
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- 1.6 Library Progress Table
CREATE TABLE IF NOT EXISTS public.library_progress (
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  language text NOT NULL,
  item_id text NOT NULL,
  learned boolean DEFAULT false,
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, language, item_id)
);

-- 1.7 Coding Battles Table (Multiplayer Arena)
CREATE TABLE IF NOT EXISTS public.battles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  problem_id text NOT NULL,
  status text CHECK (status IN ('waiting', 'active', 'finished')) DEFAULT 'waiting',
  max_players int DEFAULT 2,
  time_limit_seconds int DEFAULT 300,
  started_at timestamptz,
  room_code text UNIQUE NOT NULL,
  language text DEFAULT 'javascript',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.battles ADD COLUMN IF NOT EXISTS language text DEFAULT 'javascript';

-- 1.8 Battle Participants Table
CREATE TABLE IF NOT EXISTS public.battle_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  battle_id uuid REFERENCES public.battles(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at timestamptz DEFAULT now(),
  solved_at timestamptz,
  passed_tests int DEFAULT 0,
  total_tests int,
  submission_code text,
  finished boolean DEFAULT false,
  UNIQUE(battle_id, user_id)
);

-- 1.9 API Rate Limits Table (Protection for code compiler calls)
CREATE TABLE IF NOT EXISTS public.api_rate_limits (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
  request_count int DEFAULT 1,
  window_start timestamptz DEFAULT now()
);

-- ==========================================
-- 2. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.direct_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.library_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battle_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_rate_limits ENABLE ROW LEVEL SECURITY;

-- 2.1 Profiles Policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2.2 Friendships Policies
DROP POLICY IF EXISTS "Users can view their friendships" ON public.friendships;
CREATE POLICY "Users can view their friendships" ON public.friendships FOR SELECT USING (auth.uid() = user_id OR auth.uid() = friend_id);

DROP POLICY IF EXISTS "Users can send friend requests" ON public.friendships;
CREATE POLICY "Users can send friend requests" ON public.friendships FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can accept or reject friend requests" ON public.friendships;
CREATE POLICY "Users can accept or reject friend requests" ON public.friendships FOR UPDATE USING (auth.uid() = friend_id);

DROP POLICY IF EXISTS "Users can delete their friendships" ON public.friendships;
CREATE POLICY "Users can delete their friendships" ON public.friendships FOR DELETE USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- 2.3 Direct Messages Policies
DROP POLICY IF EXISTS "Users can view their messages" ON public.direct_messages;
CREATE POLICY "Users can view their messages" ON public.direct_messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

DROP POLICY IF EXISTS "Users can send messages" ON public.direct_messages;
CREATE POLICY "Users can send messages" ON public.direct_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- 2.4 Notifications Policies
DROP POLICY IF EXISTS "Users can view their notifications" ON public.notifications;
CREATE POLICY "Users can view their notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their notifications" ON public.notifications;
CREATE POLICY "Users can update their notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert notifications for themselves" ON public.notifications;
CREATE POLICY "Users can insert notifications for themselves" ON public.notifications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 2.5 Problem Completions Policies
-- Leaderboard allows public read of problem completions
DROP POLICY IF EXISTS "Users can view their own problem completions" ON public.problem_completions;
DROP POLICY IF EXISTS "Anyone can view problem completions for leaderboard" ON public.problem_completions;
CREATE POLICY "Anyone can view problem completions for leaderboard" 
  ON public.problem_completions FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own problem completions" ON public.problem_completions;
CREATE POLICY "Users can insert their own problem completions" 
  ON public.problem_completions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own problem completions" ON public.problem_completions;
CREATE POLICY "Users can update their own problem completions" 
  ON public.problem_completions FOR UPDATE 
  USING (auth.uid() = user_id);

-- 2.6 Library Progress Policies
DROP POLICY IF EXISTS "Users can read own library progress" ON public.library_progress;
CREATE POLICY "Users can read own library progress" ON public.library_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own library progress" ON public.library_progress;
CREATE POLICY "Users can insert own library progress" ON public.library_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own library progress" ON public.library_progress;
CREATE POLICY "Users can update own library progress" ON public.library_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own library progress" ON public.library_progress;
CREATE POLICY "Users can delete own library progress" ON public.library_progress FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 2.7 Battles Policies
DROP POLICY IF EXISTS "Battles are viewable by authenticated users" ON public.battles;
CREATE POLICY "Battles are viewable by authenticated users" ON public.battles FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can create battles" ON public.battles;
CREATE POLICY "Authenticated users can create battles" ON public.battles FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "Host can update battle state" ON public.battles;
CREATE POLICY "Host can update battle state" ON public.battles FOR UPDATE TO authenticated USING (auth.uid() = created_by);

-- 2.8 Battle Participants Policies
DROP POLICY IF EXISTS "Participants viewable by authenticated users" ON public.battle_participants;
CREATE POLICY "Participants viewable by authenticated users" ON public.battle_participants FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Users can join battles" ON public.battle_participants;
CREATE POLICY "Users can join battles" ON public.battle_participants FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own battle progress" ON public.battle_participants;
CREATE POLICY "Users can update own battle progress" ON public.battle_participants FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- 2.9 API Rate Limits Policies
DROP POLICY IF EXISTS "Users can manage own rate limit" ON public.api_rate_limits;
CREATE POLICY "Users can manage own rate limit" ON public.api_rate_limits FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- 3. AUTOMATIC PROFILE CREATION TRIGGER
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1) || '_' || substr(NEW.id::text, 1, 4)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- 4. DB TRIGGERS (Automated Notifications & Rank Points)
-- ==========================================

-- 4.1 Friend Request Notifications
CREATE OR REPLACE FUNCTION public.handle_friend_request_notification()
RETURNS TRIGGER AS $$
DECLARE
  sender_name text;
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'pending' THEN
    SELECT display_name INTO sender_name FROM public.profiles WHERE id = NEW.user_id;
    INSERT INTO public.notifications (user_id, type, title, payload)
    VALUES (
      NEW.friend_id,
      'friend_request',
      COALESCE('Friend request from ' || sender_name, 'New Friend Request'),
      jsonb_build_object(
        'friend_id', NEW.user_id,
        'sender_id', NEW.user_id,
        'sender_name', sender_name,
        'display_name', sender_name
      )
    );
  ELSIF TG_OP = 'UPDATE' AND OLD.status = 'pending' AND NEW.status = 'accepted' THEN
    SELECT display_name INTO sender_name FROM public.profiles WHERE id = NEW.friend_id;
    INSERT INTO public.notifications (user_id, type, title, payload)
    VALUES (
      NEW.user_id,
      'platform_update',
      COALESCE(sender_name || ' accepted your friend request', 'Friend Request Accepted'),
      jsonb_build_object(
        'friend_id', NEW.friend_id,
        'sender_id', NEW.friend_id,
        'sender_name', sender_name,
        'display_name', sender_name
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 

DROP TRIGGER IF EXISTS on_friend_request ON public.friendships;
CREATE TRIGGER on_friend_request
  AFTER INSERT OR UPDATE ON public.friendships
  FOR EACH ROW EXECUTE FUNCTION public.handle_friend_request_notification();

-- 4.2 Problem Completion Milestone Notifications
CREATE OR REPLACE FUNCTION public.handle_milestone_notification()
RETURNS TRIGGER AS $$
DECLARE
  completed_count INT;
BEGIN
  SELECT COUNT(*) INTO completed_count FROM public.problem_completions WHERE user_id = NEW.user_id;
  IF completed_count = 5 THEN
    INSERT INTO public.notifications (user_id, type, title, payload)
    VALUES (NEW.user_id, 'streak_milestone', '5 Problems Completed!', jsonb_build_object('count', 5));
  ELSIF completed_count = 10 THEN
    INSERT INTO public.notifications (user_id, type, title, payload)
    VALUES (NEW.user_id, 'streak_milestone', '10 Problems Completed!', jsonb_build_object('count', 10));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_problem_completion ON public.problem_completions;
CREATE TRIGGER on_problem_completion
  AFTER INSERT ON public.problem_completions
  FOR EACH ROW EXECUTE FUNCTION public.handle_milestone_notification();

-- 4.3 Recalculate Leaderboard Rank Points Trigger
CREATE OR REPLACE FUNCTION public.recalculate_rank_points()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET rank_points = (
    SELECT COALESCE(SUM(points_awarded), 0)
    FROM public.problem_completions
    WHERE user_id = NEW.user_id
  )
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_problem_completion_recalc ON public.problem_completions;
CREATE TRIGGER on_problem_completion_recalc
  AFTER INSERT OR UPDATE ON public.problem_completions
  FOR EACH ROW EXECUTE FUNCTION public.recalculate_rank_points();

-- ==========================================
-- 5. REALTIME PUBLICATION & REPLICA IDENTITY
-- ==========================================
-- Configure Replica Identity so Realtime payloads carry full row updates
ALTER TABLE public.battles REPLICA IDENTITY FULL;
ALTER TABLE public.battle_participants REPLICA IDENTITY FULL;
ALTER TABLE public.notifications REPLICA IDENTITY FULL;
ALTER TABLE public.direct_messages REPLICA IDENTITY FULL;
ALTER TABLE public.problem_completions REPLICA IDENTITY FULL;
ALTER TABLE public.profiles REPLICA IDENTITY FULL;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'notifications') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'direct_messages') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.direct_messages;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'battles') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.battles;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'battle_participants') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.battle_participants;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'problem_completions') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.problem_completions;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'profiles') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
  END IF;
END
$$;

-- ==========================================
-- 6. MULTI-LANGUAGE CONSTRAINTS CLEANUP
-- ==========================================
ALTER TABLE public.profiles 
  DROP CONSTRAINT IF EXISTS profiles_learning_language_check;

ALTER TABLE public.profiles 
  ADD CONSTRAINT profiles_learning_language_check 
  CHECK (learning_language IN ('javascript', 'python', 'c', 'cpp', 'java'));

-- ==========================================
-- 7. NOTIFY POSTGREST TO RELOAD SCHEMA CACHE
-- ==========================================
NOTIFY pgrst, 'reload schema';

