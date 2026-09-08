# Sprint 009 - GoAI Growth Copilot V1

This patch is based on the current GitHub `main` structure reviewed in ChatGPT.

## New files
- `app/[locale]/growth/page.tsx`
- `components/growth/growth-copilot.tsx`
- `lib/growth-plan.ts`

## Replaced file
- `components/sections/hero-section.tsx`

## What this delivers
- Homepage repositioned around AI Global Growth Copilot.
- New `/[locale]/growth` route.
- 8-field company / market context form.
- Competition demo prefill: Foshan furniture company -> UAE.
- Structured 10-module Global Growth Plan report.
- Responsive consulting-report style UI instead of a chat UI.
- No external AI API required yet; uses deterministic demo data.
- Existing login, pricing, PayPal, tools, regions, playbooks and content routes are untouched.

## Next step
Sprint 009.1 should add Supabase persistence and `My Growth Plans` in Workspace. Sprint 009.2 should replace the demo plan generator with the model-agnostic AI Router.

## Important
This patch has not been run through `pnpm build` in this environment because the full repository cannot be cloned from GitHub here. After overlaying these files on the local repository, run:

```bash
pnpm typecheck
pnpm build
```

Fix any project-specific type or lint issue before production deploy.
