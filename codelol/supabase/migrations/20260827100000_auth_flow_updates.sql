-- Migration: Add onboarding_complete, email, and unique display_name constraint
-- Date: 2026-08-27

-- 1. Add onboarding_complete and email columns to profiles if they don't exist
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS onboarding_complete boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS email text;

-- 2. Create a case-insensitive unique index for display_name
CREATE UNIQUE INDEX IF NOT EXISTS profiles_display_name_unique_idx 
  ON public.profiles (lower(display_name));

-- 3. Update existing profiles that already have humor_preference to be marked as onboarding_complete
UPDATE public.profiles 
SET onboarding_complete = true 
WHERE humor_preference IS NOT NULL AND onboarding_complete IS NOT TRUE;

-- 4. Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
