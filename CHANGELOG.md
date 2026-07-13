# Changelog

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
