-- Create a table for problem completions
create table public.problem_completions (
  user_id uuid references auth.users on delete cascade not null,
  problem_id text not null,
  completed_at timestamp with time zone default now(),
  primary key (user_id, problem_id)
);

-- Set up Row Level Security (RLS)
alter table public.problem_completions enable row level security;

create policy "Users can view their own problem completions." on public.problem_completions
  for select using (auth.uid() = user_id);

create policy "Users can insert their own problem completions." on public.problem_completions
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own problem completions." on public.problem_completions
  for update using (auth.uid() = user_id);
