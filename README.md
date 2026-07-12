# GoAI

GoAI is a global AI discovery and enablement platform. The first MVP focuses on validating audience demand and revenue opportunities through a fast, content-led website covering AI tools, playbooks, solutions, regions, and blog content.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local TypeScript/MDX-ready content structure
- Locale-based routing with English as the default language and Chinese reserved

## Current Scope

Phase one is intentionally small and low-cost. It does not include a standalone API service, database, authentication, payments, Turborepo, monorepo packages, or a heavyweight component library.

## Directory Guide

```txt
GoAI/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx
│   │   ├── solutions/
│   │   ├── regions/
│   │   ├── tools/
│   │   ├── playbooks/
│   │   ├── blog/
│   │   └── layout.tsx
│   ├── api/
│   └── layout.tsx
├── components/
│   ├── layout/
│   ├── sections/
│   ├── cards/
│   └── ui/
├── content/
│   ├── en/
│   └── zh/
├── data/
├── lib/
├── public/
├── styles/
├── docs/
├── tests/
├── .env.example
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

### `app/`

Holds the Next.js App Router entry points. The `[locale]` segment keeps all public routes ready for internationalization from the beginning.

### `components/`

Holds reusable interface pieces. Layout, section, card, and low-level UI folders keep components organized without introducing a large design system too early.

### `content/`

Holds local content by language. English is the default content source, and Chinese is reserved for localized content.

### `data/`

Holds structured local data such as tool metadata, categories, regions, industries, redirects, or navigation entries.

### `lib/`

Holds shared application logic such as locale helpers, content loaders, SEO helpers, and future integration clients.

### `public/`

Holds static assets.

### `styles/`

Holds global styles and Tailwind entry points.

### `docs/`

Holds project decisions, architecture notes, SEO strategy, content model notes, and future integration plans.

### `tests/`

Reserved for future unit, integration, and end-to-end tests.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Run a production build:

```bash
pnpm build
```

Run TypeScript checks:

```bash
pnpm typecheck
```

## Growth Path

The MVP structure is designed to scale without committing to heavy infrastructure too early:

- Supabase can be added later under `lib/` and any future server routes.
- A CMS can replace or sync with `content/` while preserving page routes.
- A standalone API can be introduced later if Next.js route handlers become too limited.
- Authentication and payments can be added after the product model is validated.
