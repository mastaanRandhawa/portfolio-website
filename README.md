# Doxa Studios — Portfolio Website

A modern, premium portfolio and lead-generation website built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animation:** framer-motion (hero background)
- **Content:** Markdown + JSON files
- **Forms:** react-hook-form + Zod
- **Email:** Resend (optional)
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Copy `.env.example` to `.env.local` and fill in values as needed. All integrations are optional — the site works without them.

## Editing Content

Content lives in the `content/` directory and can be updated without touching code.

### Site-wide settings

Edit `content/site.json` for company name, hero copy, trust stats, contact info, and social links.

### Projects

Add or edit Markdown files in `content/projects/`. Each file uses YAML frontmatter:

```yaml
---
slug: my-project
title: My Project
industry: Healthcare
projectType: Business Website
technologies: [React, Next.js, TypeScript, Tailwind]
featured: true
liveUrl: https://example.com
thumbnail: https://images.unsplash.com/photo-...
shortDescription: Brief description
gallery:
  desktop: [...]
  tablet: [...]
  mobile: [...]
results:
  - label: Lead increase
    value: 40%
---
```

The Markdown body should include `## Overview`, `## Challenge`, and `## Solution` sections.

### Services, Testimonials, Process, About

- `content/services.json` — service listings
- `content/testimonials.json` — client reviews
- `content/process.json` — process steps
- `content/about.json` — about page content

## Project Structure

```
content/           # Markdown + JSON content
src/
  app/             # Next.js pages and API routes
  components/
    layout/        # Header, Footer, PageHeader
    sections/      # Page section components
    ui/            # shadcn/ui + etheral-shadow
  lib/             # Content parsers, SEO, schema, utilities
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

Deploy to [Vercel](https://vercel.com) with zero configuration. Set environment variables in the Vercel dashboard.

## Integrations

| Service | Env Variable | Required |
|---------|-------------|----------|
| Resend (email) | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | No |
| Calendly | `NEXT_PUBLIC_CALENDLY_URL` | No |
| Google Analytics | `NEXT_PUBLIC_GA_ID` | No |
| Microsoft Clarity | `NEXT_PUBLIC_CLARITY_ID` | No |
