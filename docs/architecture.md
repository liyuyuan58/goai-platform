# GoAI Architecture

GoAI starts as a single Next.js App Router application optimized for MVP speed, low operational cost, and simple deployment.

The structure intentionally avoids monorepo tooling, a standalone API service, database setup, authentication, payments, and heavyweight UI frameworks in phase one. Each boundary is still named clearly so the project can grow into Supabase, a CMS, and a dedicated API later without a disruptive rewrite.
