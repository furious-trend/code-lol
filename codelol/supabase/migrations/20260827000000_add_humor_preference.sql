-- Add humor_preference and display_name to public.profiles
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS humor_preference text DEFAULT 'general',
  ADD COLUMN IF NOT EXISTS display_name text;

-- Notify PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema';
