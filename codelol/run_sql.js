/* eslint-disable @typescript-eslint/no-require-imports */
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:shafiqmaadheshadhi@db.brxautcammfkxupmweyc.supabase.co:5432/postgres',
});

const sql = `
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  current_level integer default 1,
  levels_completed integer default 0,
  current_streak integer default 0,
  current_tier text default 'Beginner'
);

alter table public.profiles enable row level security;

-- Drop policies if they exist so we can recreate them
do $$
begin
  drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
  drop policy if exists "Users can insert their own profile." on public.profiles;
  drop policy if exists "Users can update own profile." on public.profiles;
end $$;

create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

create or replace function public.handle_new_user() returns trigger as $$ 
begin 
  insert into public.profiles (id) values (new.id); 
  return new; 
end; 
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS current_level integer DEFAULT 1, ADD COLUMN IF NOT EXISTS current_tier text DEFAULT 'Beginner';
UPDATE public.profiles SET current_level = COALESCE(levels_completed, 0) + 1 WHERE current_level IS NULL OR current_level = 1;
UPDATE public.profiles SET current_tier = CASE WHEN current_level <= 25 THEN 'Beginner' WHEN current_level <= 50 THEN 'Intermediate' ELSE 'Expert' END;

create table if not exists public.problem_completions (
  user_id uuid references auth.users on delete cascade not null,
  problem_id text not null,
  completed_at timestamp with time zone default now(),
  primary key (user_id, problem_id)
);

alter table public.problem_completions enable row level security;

do $$
begin
  drop policy if exists "Users can view their own problem completions." on public.problem_completions;
  drop policy if exists "Users can insert their own problem completions." on public.problem_completions;
  drop policy if exists "Users can update their own problem completions." on public.problem_completions;
end $$;

create policy "Users can view their own problem completions." on public.problem_completions for select using (auth.uid() = user_id);
create policy "Users can insert their own problem completions." on public.problem_completions for insert with check (auth.uid() = user_id);
create policy "Users can update their own problem completions." on public.problem_completions for update using (auth.uid() = user_id);
`;

async function run() {
  try {
    await client.connect();
    console.log("Connected to Supabase.");
    await client.query(sql);
    console.log("SQL executed successfully!");
  } catch (err) {
    console.error("Error executing SQL:", err);
  } finally {
    await client.end();
  }
}

run();
