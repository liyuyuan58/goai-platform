# Sprint009.2 — My Growth Plans

Adds the persistent Growth Plan workspace loop.

## User flow

Generate → Save → Leave → Sign in again → Workspace → My Growth Plans → Open Plan

## Files

- `app/api/growth-plans/route.ts` — richer saved-plan list
- `app/api/growth-plans/[id]/route.ts` — secure single-plan retrieval
- `components/workspace/my-growth-plans.tsx`
- `components/workspace/growth-plans-page.tsx`
- `app/[locale]/workspace/growth-plans/page.tsx`
- `components/growth/saved-growth-plan.tsx`
- `app/[locale]/growth-plans/[id]/page.tsx`
- `components/auth/authenticated-layout.tsx` — adds My Growth Plans navigation

## Supabase

No new table is required.

Existing `service_role` SELECT permission is required and was already granted during Sprint009.1.

## Commit

`Sprint009.2 My Growth Plans`
