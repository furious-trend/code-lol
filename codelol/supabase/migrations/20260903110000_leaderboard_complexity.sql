-- Add new leaderboard tracking columns to problem_completions
ALTER TABLE public.problem_completions 
ADD COLUMN IF NOT EXISTS solve_time_ms INTEGER,
ADD COLUMN IF NOT EXISTS time_complexity TEXT,
ADD COLUMN IF NOT EXISTS space_complexity TEXT,
ADD COLUMN IF NOT EXISTS points_awarded INTEGER DEFAULT 0;

-- Function to recalculate rank points when a problem is completed
CREATE OR REPLACE FUNCTION public.recalculate_rank_points()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the user's rank_points in the profiles table
    -- by summing all points_awarded from their problem_completions
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

-- Trigger to call the recalculation function after insert or update
DROP TRIGGER IF EXISTS update_rank_points_on_completion ON public.problem_completions;
CREATE TRIGGER update_rank_points_on_completion
AFTER INSERT OR UPDATE OF points_awarded ON public.problem_completions
FOR EACH ROW
EXECUTE FUNCTION public.recalculate_rank_points();

-- Enable realtime for both tables if not already enabled
DO $$ 
BEGIN
    -- Note: Suppress errors if publication already contains tables
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.problem_completions;
    EXCEPTION WHEN duplicate_object THEN
        NULL;
    END;
    
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
    EXCEPTION WHEN duplicate_object THEN
        NULL;
    END;
END $$;
