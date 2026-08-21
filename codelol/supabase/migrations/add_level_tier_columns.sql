-- Migration to add current_level and current_tier to profiles

-- Make sure the profiles table exists. Assuming it does, we add the new columns.
-- If they already exist, this will fail safely or we can use DO block, but standard ALTER TABLE is fine for Supabase dashboard.

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS current_level integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS current_tier text DEFAULT 'Beginner';

-- Optional: Update existing profiles to start at level 1 if they have no levels_completed
-- or map levels_completed to current_level (levels_completed + 1)
UPDATE public.profiles
SET current_level = COALESCE(levels_completed, 0) + 1
WHERE current_level IS NULL OR current_level = 1;

-- Set tier based on current_level
UPDATE public.profiles
SET current_tier = CASE 
  WHEN current_level <= 25 THEN 'Beginner'
  WHEN current_level <= 50 THEN 'Intermediate'
  ELSE 'Expert'
END;
