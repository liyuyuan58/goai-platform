# Sprint 009.1 - Supabase Growth Plan Persistence

Adds authenticated saving of Growth Plans through a server-only Next.js API route.

## Files
- `app/api/growth-plans/route.ts`
- `lib/supabase-server.ts`
- `components/growth/growth-copilot.tsx` (replace Sprint009 version)
- `supabase/001_growth_copilot.sql`

## Setup
1. In Supabase SQL Editor run `supabase/001_growth_copilot.sql`.
2. In Vercel add Production + Preview variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Redeploy after adding environment variables.

`SUPABASE_SERVICE_ROLE_KEY` is server-only. Never prefix it with NEXT_PUBLIC and never expose it in screenshots or GitHub.

The browser never receives the service role key. The Next.js API verifies the existing Auth.js session before saving or listing plans.
