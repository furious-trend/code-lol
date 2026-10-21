-- Migration for API rate limits table
create table if not exists public.api_rate_limits (
  user_id uuid references auth.users on delete cascade not null primary key,
  request_count integer default 1,
  window_start timestamp with time zone default now()
);

alter table public.api_rate_limits enable row level security;

do $$
begin
  drop policy if exists "Users can manage own rate limit" on public.api_rate_limits;
end $$;

create policy "Users can manage own rate limit" on public.api_rate_limits
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
