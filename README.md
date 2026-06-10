# Doxa Studios

A monorepo with a **Next.js static frontend** (Cloudflare Pages) and a **Node API backend** (Render/Railway) serving content and contact form submissions.

Each package (`frontend/`, `backend/`, `packages/shared/`) has its own `node_modules` — dependencies are not hoisted to the repository root.

**Production:** [https://doxastudios.ca](https://doxastudios.ca)

## Deploy frontend — Cloudflare Pages

Connect this repo in **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**.

### Build settings

| Setting | Value |
|---------|-------|
| Framework preset | **None** |
| Root directory | `frontend` |
| Build command | `npm ci && npm run build` |
| Build output directory | `out` |
| Deploy command | `npx wrangler deploy` |
| Version command | `npx wrangler versions upload` |

Cloudflare sets `CF_PAGES=1` during builds, so Next.js produces a static export in `frontend/out`. Wrangler runs from `frontend/` using [`frontend/wrangler.toml`](frontend/wrangler.toml).

Content is read from `backend/content/` at build time (the full repository is cloned; only the working directory is `frontend/`).

### Environment variables (Production)

| Variable | Value |
|----------|-------|
| `NODE_VERSION` | `22` |
| `NEXT_PUBLIC_SITE_URL` | `https://doxastudios.ca` |

Optional: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_CALENDLY_URL`

### Custom domain

Add **doxastudios.ca** under **Custom domains** and enable HTTPS.

### Edit contact info

Update [`backend/content/site.json`](backend/content/site.json) — email, phone, address, social. Empty fields are hidden. Push to Git to redeploy.

## Local setup

```powershell
npm install
npm run setup
```

## Local build (matches Cloudflare)

```powershell
cd frontend
$env:CF_PAGES = "1"
npm run build
# Output: frontend/out
```

## Local deploy

```powershell
cd frontend
$env:CF_PAGES = "1"
npm run build
npm run deploy
```

## Backend

See [`backend/.env.example`](backend/.env.example). Content is read from the filesystem at build time; the API is only needed for live contact form submissions.
