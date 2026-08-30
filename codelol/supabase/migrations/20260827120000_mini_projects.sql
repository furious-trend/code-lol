-- Create mini_projects table
create table public.mini_projects (
  id text primary key,
  title text not null,
  description text not null,
  difficulty text not null check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  starter_code text not null,
  requirements jsonb not null default '[]'::jsonb
);

-- Create project_completions table
create table public.project_completions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  project_id text references public.mini_projects on delete cascade not null,
  requirements_passed jsonb not null default '[]'::jsonb,
  all_passed boolean not null default false,
  submission_code text,
  completed_at timestamp with time zone,
  unique (user_id, project_id)
);

-- Enable RLS
alter table public.mini_projects enable row level security;
alter table public.project_completions enable row level security;

-- Policies for mini_projects (publicly readable)
create policy "Mini projects are viewable by everyone" on public.mini_projects
  for select using (true);

-- Policies for project_completions
create policy "Users can view their own project completions" on public.project_completions
  for select using (auth.uid() = user_id);

create policy "Users can insert their own project completions" on public.project_completions
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own project completions" on public.project_completions
  for update using (auth.uid() = user_id);

-- Enable realtime for project_completions
alter publication supabase_realtime add table public.project_completions;

-- Seed Data
insert into public.mini_projects (id, title, description, difficulty, starter_code, requirements) values
(
  'excuse-generator',
  'The Elite Excuse Generator 🗣️',
  'Need to get out of a meeting? Build an app that generates random, highly specific, and questionable excuses on demand.',
  'Beginner',
  'function generateExcuse() {\n  // Your code here\n  return "My dog ate my WiFi router.";\n}\n\nconsole.log(generateExcuse());',
  '[
    {"id": "req-1", "description": "Define a function named generateExcuse", "check_type": "function_exists", "check_code": "typeof generateExcuse === ''function''"},
    {"id": "req-2", "description": "Return a string longer than 10 characters", "check_type": "custom_assertion", "check_code": "typeof generateExcuse === ''function'' && typeof generateExcuse() === ''string'' && generateExcuse().length > 10"}
  ]'::jsonb
),
(
  'fashion-critic',
  'Brutal Fashion Critic 👗',
  'A website that asks what you are wearing today and responds with randomized, passive-aggressive judgments about your choices.',
  'Beginner',
  'function judgeOutfit(clothingItem) {\n  // Write logic to judge the outfit\n  return "That " + clothingItem + " is... a choice.";\n}\n\nconsole.log(judgeOutfit("neon green sweater"));',
  '[
    {"id": "req-1", "description": "Define a function named judgeOutfit", "check_type": "function_exists", "check_code": "typeof judgeOutfit === ''function''"},
    {"id": "req-2", "description": "Function must return a string", "check_type": "custom_assertion", "check_code": "typeof judgeOutfit === ''function'' && typeof judgeOutfit(''hat'') === ''string''"}
  ]'::jsonb
),
(
  'passive-aggressive-todo',
  'Passive-Aggressive To-Do List 📝',
  'A to-do list that slowly turns red and starts insulting you the longer a task stays uncompleted.',
  'Intermediate',
  'function getTodoMessage(daysOverdue) {\n  // Return a message based on daysOverdue\n  if (daysOverdue > 5) return "Are you ever going to do this?";\n  return "Just a friendly reminder.";\n}',
  '[
    {"id": "req-1", "description": "Define getTodoMessage function", "check_type": "function_exists", "check_code": "typeof getTodoMessage === ''function''"},
    {"id": "req-2", "description": "Return an aggressive message for > 5 days", "check_type": "custom_assertion", "check_code": "typeof getTodoMessage === ''function'' && getTodoMessage(6).length > 0"}
  ]'::jsonb
),
(
  'virtual-pet-rock',
  'Virtual Pet Rock 🪨',
  'It doesn''t move. It doesn''t eat. You just click a button to log that you "looked" at it. Ultimate low maintenance.',
  'Beginner',
  'let looks = 0;\nfunction lookAtRock() {\n  looks += 1;\n  console.log("You looked at the rock. It did nothing.");\n}',
  '[
    {"id": "req-1", "description": "Define lookAtRock function", "check_type": "function_exists", "check_code": "typeof lookAtRock === ''function''"},
    {"id": "req-2", "description": "Prints to console", "check_type": "output_contains", "check_code": "looked at the rock"}
  ]'::jsonb
),
(
  'pet-conspiracy',
  'Is My Cat Plotting Against Me? 🐈',
  'A quiz app that takes yes/no inputs about your cat''s recent behavior and definitively proves they are evil.',
  'Intermediate',
  'function calculateEvilScore(staresAtyou, knocksThingsOver) {\n  let score = 0;\n  if (staresAtyou) score += 50;\n  if (knocksThingsOver) score += 50;\n  return score;\n}',
  '[
    {"id": "req-1", "description": "Define calculateEvilScore function", "check_type": "function_exists", "check_code": "typeof calculateEvilScore === ''function''"},
    {"id": "req-2", "description": "Correctly calculates score", "check_type": "custom_assertion", "check_code": "typeof calculateEvilScore === ''function'' && calculateEvilScore(true, true) === 100"}
  ]'::jsonb
);
