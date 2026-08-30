-- Add last_activity_date to profiles table to track daily streaks properly
alter table public.profiles
add column last_activity_date date;
