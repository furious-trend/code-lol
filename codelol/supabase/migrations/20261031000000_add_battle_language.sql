-- Migration to support language column on battles table if not already present
ALTER TABLE IF EXISTS public.battles ADD COLUMN IF NOT EXISTS language text DEFAULT 'javascript';
