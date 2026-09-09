create extension if not exists pgcrypto;

create table if not exists public.growth_plans (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  user_name text,
  company_name text not null,
  current_country text not null,
  target_country text not null,
  title text not null,
  opportunity_score numeric(3,1),
  plan_data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists growth_plans_user_email_idx on public.growth_plans (user_email);
create index if not exists growth_plans_created_at_idx on public.growth_plans (created_at desc);

alter table public.growth_plans enable row level security;
revoke all on public.growth_plans from anon, authenticated;

comment on table public.growth_plans is 'Server-managed GoAI Growth Copilot plans. Access is through authenticated Next.js API routes using the service role key.';
