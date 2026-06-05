# Doxa Studios — Portfolio Website

A monorepo with a **Next.js static frontend** (GitHub Pages) and a **Node API backend** (Render/Railway) serving content and contact form submissions.

## Repository Structure

```
portfolio-website/
├── frontend/          # Next.js 16 static site (GitHub Pages)
├── backend/           # Hono API server (content + contact)
├── packages/shared/   # Shared TypeScript types
└── package.json       # npm workspaces root
```

## Tech Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui
- **Backend:** Hono, Node 20, Prisma, PostgreSQL, Zod, Resend (optional)
- **Content:** JSON + Markdown files in `backend/content/`
- **Database:** Contact submissions and rate limits via Prisma (PostgreSQL)
- **Deployment:** GitHub Pages (frontend) + Render/Railway (backend)

## Getting Started

### Prerequisites

- Node.js 20+
- npm 9+

### Install

```bash
npm install
```

### Environment Variables

**Backend** — copy `backend/.env.example` to `backend/.env`:

```env
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/portfolio?schema=public
CORS_ORIGINS=http://localhost:3000,https://mastaanrandhawa.github.io
RESEND_API_KEY=          # optional — logs to console if unset
RESEND_FROM_EMAIL=
```

**Database setup (local):**

Use a PostgreSQL database — e.g. [Neon](https://neon.tech), [Supabase](https://supabase.com), or Render Postgres. Set `DATABASE_URL` in `backend/.env`, then run migrations:

```bash
npm run db:migrate -w backend
```

**Frontend** — copy `frontend/.env.example` to `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_CALENDLY_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_CLARITY_ID=
```

### Local Development

Start both servers:

```bash
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:4000](http://localhost:4000)

Or run individually:

```bash
npm run dev -w backend
npm run dev -w frontend
```

### Verify Backend

```bash
curl http://localhost:4000/health
curl http://localhost:4000/api/site
```

## Editing Content

Content lives in `backend/content/` and is served via REST API. Update files without touching frontend code.

| File / Folder | Purpose |
|---------------|---------|
| `backend/content/site.json` | Site name, hero, contact, social |
| `backend/content/services.json` | Service listings |
| `backend/content/testimonials.json` | Client reviews |
| `backend/content/process.json` | Process steps |
| `backend/content/about.json` | About page |
| `backend/content/projects/*.md` | Portfolio projects (YAML frontmatter + Markdown) |

After editing content locally, restart is not required — the backend reads files on each request. Redeploy or rebuild the frontend only if you need updated static pages on GitHub Pages.

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/health` | Liveness check |
| GET | `/api/site` | Site configuration |
| GET | `/api/services` | All services |
| GET | `/api/testimonials` | All testimonials |
| GET | `/api/about` | About content |
| GET | `/api/process` | Process steps |
| GET | `/api/projects` | All projects (`?featured=true` for featured only) |
| GET | `/api/projects/:slug` | Single project |
| POST | `/api/contact` | Contact form submission (saved to database) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend + frontend concurrently |
| `npm run build` | Build backend and frontend |
| `npm run lint` | Lint both workspaces |
| `npm run db:migrate -w backend` | Run Prisma migrations (local) |
| `npm run db:studio -w backend` | Open Prisma Studio |

## Deployment

### Backend (Render)

1. Create a **Web Service** on [Render](https://render.com)
2. Connect this repo; set **Root Directory** to repo root (or use `backend/render.yaml` Blueprint)
3. **Runtime:** Node — build: `npm ci && npm run build -w backend`, start: `npm run start -w backend`
4. Add a **PostgreSQL** database (Render Postgres or external provider)
5. Set environment variables:
   - `DATABASE_URL` (from your Postgres instance)
   - `RESEND_API_KEY`, `RESEND_FROM_EMAIL`
   - `CORS_ORIGINS=https://mastaanrandhawa.github.io,http://localhost:3000`
6. Health check path: `/health`
7. Note the service URL (e.g. `https://doxa-api.onrender.com`)

### Backend (Railway)

1. Create a new project from this repo (monorepo root)
2. **Build command:** `npm ci && npm run build -w backend`
3. **Start command:** `npm run start -w backend`
4. Add PostgreSQL and the same env vars as Render
5. Railway sets `PORT` automatically — the backend reads it from the environment

### Frontend (GitHub Pages)

1. Deploy the backend first and confirm `/health` returns `200`
2. In GitHub repo **Settings → Secrets → Actions**, add:
   - `API_URL` = your production backend URL (no trailing slash)
3. **Settings → Pages → Source:** GitHub Actions
4. Push to `master`/`main` — workflow builds `frontend/` with `NEXT_PUBLIC_API_URL`

**Live URL:** [https://mastaanrandhawa.github.io/portfolio-website/](https://mastaanrandhawa.github.io/portfolio-website/)

### Local Static Preview

```powershell
# Terminal 1 — backend
npm run dev -w backend

# Terminal 2 — static export
$env:GITHUB_PAGES="true"
$env:NEXT_PUBLIC_API_URL="http://localhost:4000"
npm run build -w frontend
# Output: frontend/out
```

## Production Checklist

- [ ] Backend deployed and `/health` returns OK
- [ ] `API_URL` GitHub secret set to production backend URL
- [ ] `CORS_ORIGINS` includes `https://mastaanrandhawa.github.io`
- [ ] `DATABASE_URL` set on backend (PostgreSQL)
- [ ] Prisma migrations applied (`prestart` runs `prisma migrate deploy` on deploy)
- [ ] `RESEND_API_KEY` set on backend for contact emails
- [ ] GitHub Pages workflow succeeds
- [ ] Contact form submits from live site

## Integrations

| Service | Where | Env Variable |
|---------|-------|--------------|
| Resend (email) | Backend | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` |
| Calendly | Frontend | `NEXT_PUBLIC_CALENDLY_URL` |
| Google Analytics | Frontend | `NEXT_PUBLIC_GA_ID` |
| Microsoft Clarity | Frontend | `NEXT_PUBLIC_CLARITY_ID` |
