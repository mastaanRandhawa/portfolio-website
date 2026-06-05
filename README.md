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

### GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy-github-pages.yml`) that builds a static export and deploys to GitHub Pages on every push to `master` or `main`.

**One-time setup:**

1. Open the repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Push to `master`/`main` — the workflow runs automatically

**Live URL:** [https://mastaanrandhawa.github.io/portfolio-website/](https://mastaanrandhawa.github.io/portfolio-website/)

**Note:** GitHub Pages serves a static export. The contact form API (`/api/contact`) is excluded from this build, so form submissions require a server host (e.g. Vercel) or an external form service.

**Local static preview:**

```bash
# PowerShell
$env:GITHUB_PAGES="true"; npm run build
# Output is in ./out — serve with any static file server
```

### Vercel

Deploy to [Vercel](https://vercel.com) for full Next.js features (API routes, contact form email). Set environment variables in the Vercel dashboard.

## Integrations

| Service | Env Variable | Required |
|---------|-------------|----------|
| Resend (email) | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | No |
| Calendly | `NEXT_PUBLIC_CALENDLY_URL` | No |
| Google Analytics | `NEXT_PUBLIC_GA_ID` | No |
| Microsoft Clarity | `NEXT_PUBLIC_CLARITY_ID` | No |
