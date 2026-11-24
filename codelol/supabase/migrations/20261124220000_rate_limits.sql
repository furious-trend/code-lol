-- Migration: Create rate_limits table and check_rate_limit security definer function

create table if not exists public.rate_limits (
  user_id uuid references auth.users(id) on delete cascade not null,
  route text not null,
  window_start timestamptz not null,
  count int not null default 1,
  primary key (user_id, route, window_start)
);

-- Enable Row Level Security (RLS) with no public policies
alter table public.rate_limits enable row level security;

-- Function: check_rate_limit
create or replace function public.check_rate_limit(
  p_route text,
  p_max int,
  p_window_seconds int
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_window_start timestamptz;
  v_count int;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    return false;
  end if;

  if p_window_seconds <= 0 then
    p_window_seconds := 60;
  end if;

  -- Window bucket start time truncated to window interval
  v_window_start := to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);

  insert into public.rate_limits (user_id, route, window_start, count)
  values (v_user_id, p_route, v_window_start, 1)
  on conflict (user_id, route, window_start)
  do update set count = public.rate_limits.count + 1
  returning count into v_count;

  return v_count <= p_max;
end;
$$;
