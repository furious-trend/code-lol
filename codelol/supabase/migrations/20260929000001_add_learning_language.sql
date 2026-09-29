-- Add learning_language to public.profiles

ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS learning_language text DEFAULT 'javascript' CHECK (learning_language IN ('javascript', 'python'));
