-- Add unique constraint to profiles.display_name
ALTER TABLE public.profiles ADD CONSTRAINT unique_display_name UNIQUE (display_name);
