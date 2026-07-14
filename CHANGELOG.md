# Changelog

## Sprint 005 - Authentication

- Added Auth.js / NextAuth Google Login with JWT sessions.
- Added a GoAI-styled login modal for Login and Sign Up actions.
- Added authenticated Header state with avatar menu, My Account, Subscription, Settings and Logout.
- Added protected routes for Dashboard, Workspace, Account and Settings.
- Added middleware redirects for unauthenticated access to protected routes.
- Added local user store fields for Google users: id, email, name, avatar, provider, role, plan, created_at and updated_at.
- Added authentication environment variables for Google OAuth and Auth.js.

## Sprint 004 - Google Analytics 4

- Added GA4 measurement ID `G-N41JNP1RTP` through `@next/third-parties/google`.
- Loaded Google Analytics on public pages only.
- Excluded `/admin`, `/en/admin`, `/zh/admin` and `/api/admin` paths from analytics.
- Added client-side `page_view` events for App Router page transitions.
- Added `NEXT_PUBLIC_GA_MEASUREMENT_ID` to the environment example.

## Sprint 003 - SEO Domain Hotfix

- Updated the production SEO domain to `https://goaihub.xyz`.
- Centralized the public site URL through `lib/site-config.ts`.
- Updated metadata, Open Graph, Twitter Card, canonical and JSON-LD URL generation to use the production domain.
- Updated `robots.txt` output to reference the production sitemap and disallow admin/API admin paths.
- Updated sitemap generation to include the root domain and published localized public routes only.
- Removed public canonical metadata from the Admin CMS page and kept it `noindex`.
- Updated environment example and public contact email to the GoAI Hub domain.

## Sprint 002 - Platform Admin CMS

- Upgraded Admin CMS to a dashboard layout with left navigation and right-side module content.
- Added Dashboard overview with content totals, published/draft/hidden signals, today's updates and quick actions.
- Added Analytics dashboard structure with visitors, top pages, top keywords, countries, devices, CTR and impressions placeholders.
- Added SEO Center structure for sitemap, robots, canonical, schema, Google index, Bing index, broken links and meta management.
- Added Blog CMS, Resource CMS and Playbook CMS with create, edit, delete, draft, publish, hidden state, tags, category, cover, schedule publish and SEO fields.
- Expanded AI Tool CMS fields with company, country, founded, founder, screenshots, gallery, tags, use cases, FAQ, integrations, keywords, Open Graph and Twitter Card.
- Expanded Category CMS with icon, color, description and SEO fields.
- Added first-party analytics pageview tracking endpoint and client tracker.

## Sprint 001 - GoAI Admin CMS

- Added `/[locale]/admin` Admin CMS for first-stage tool content management.
- Added Tool Management for creating, editing, deleting, hiding and publishing tools.
- Added full Tool fields for category, sub category, logo, website, pricing, free trial, overview, features, pros, cons, best for, platform, languages, API, alternatives, rating, homepage flags, SEO and last updated.
- Added browser-side logo cropping and scaling to 64 x 64 PNG before upload.
- Added CMS API routes for reading and publishing CMS content.
- Added local JSON CMS store with fallback to the existing tool catalog.
- Connected homepage Featured Tools, Tool List, Tool Detail and Sitemap to published CMS data.
- Added Category Management for creating, editing, deleting and sorting categories.
- Added homepage controls through Featured, Trending, Newest, Editor's Pick and Popular flags.

## v0.3 - AI Tools Visual & Detail Polish

- Replaced generated placeholder tool logos with official website brand icon assets stored under `public/brand/tools`.
- Added official logo rendering through the reusable `ToolLogo` component.
- Expanded AI Tools data model with overview, best fit, platform, languages, API, official website and last updated fields.
- Added Gemini, Grok, Midjourney, Lovable, Bolt and Windsurf to the AI Tools directory.
- Updated Tool Cards to use one consistent layout: logo, name, category, one-line description, pricing, rating and Visit Website.
- Rebuilt Tool Detail pages around Overview, Key Features, Pros, Cons, Best For, Pricing, Platform, Languages, API, Official Website, Alternatives and Last Updated.
- Improved Tool Detail metadata with canonical URL, Open Graph image, Twitter image and Schema.org fields.
- Updated homepage Featured AI Tools to use the same official logo component and tool data source.

## Beta v0.2 - GOAI Sprint 1 DEV PACKAGE 001

### Homepage Official Version

- Updated homepage hero messaging to official GoAI Sprint 1 branding.
- Replaced demo-style AI tool previews with real AI tool names and production-oriented descriptions.
- Updated newsletter copy to reflect GoAI's AI tools, global markets, playbooks and growth resources.
- Updated footer legal link label to Terms of Service.
- Updated About page contact ordering and Terms of Service anchor.

### AI Tools Module

- Added `/[locale]/tools` AI Tools directory page.
- Added keyword search UI prepared for future fuzzy search.
- Added horizontally scrollable AI tool categories.
- Added responsive AI tool card grid: 4 columns desktop, 2 columns tablet, 1 column mobile.
- Added dynamic `/[locale]/tools/[slug]` detail pages.
- Added reusable AI tool logo, card and directory components.
- Added scalable local TypeScript data structure for AI tool metadata.
- Added SEO metadata, Open Graph metadata and structured data for AI Tools pages.
- Added AI Tool detail routes to sitemap output.

### Validation

- `pnpm typecheck` passed.
- `pnpm build` passed.
- Local route checks passed for `/`, `/en`, `/en/tools` and `/en/tools/chatgpt`.
