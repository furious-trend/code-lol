-- Create problem_completions table to track solved problems
CREATE TABLE IF NOT EXISTS public.problem_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    problem_id TEXT NOT NULL,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, problem_id)
);

-- Enable RLS
ALTER TABLE public.problem_completions ENABLE ROW LEVEL SECURITY;

-- Create policies for problem_completions
CREATE POLICY "Users can view their own problem completions"
    ON public.problem_completions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own problem completions"
    ON public.problem_completions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own problem completions"y
    ON public.problem_completions FOR UPDATE
    USING (auth.uid() = user_id);
