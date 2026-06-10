# Doxa Studios

A monorepo with a **Next.js static frontend** (Cloudflare Workers) and a **Node API backend** (Render/Railway) serving content and contact form submissions.

Each package (`frontend/`, `backend/`, `packages/shared/`) has its own `node_modules` — dependencies are not hoisted to the repository root.

**Production:** [https://doxastudios.ca](https://doxastudios.ca)

## Deploy frontend — Cloudflare Workers

Connect this repo in **Cloudflare Dashboard → Workers & Pages → Create → Worker → Connect to Git**.

### Build settings

| Setting | Value |
|---------|-------|
| Root directory | `frontend` |
| Build command | `npm ci && STATIC_EXPORT=1 npm run build` |
| Deploy command | `npx wrangler deploy` |

`STATIC_EXPORT=1` tells Next.js to produce a static export in `frontend/out`. Wrangler uploads that directory via [`frontend/wrangler.toml`](frontend/wrangler.toml).

Content is read from `backend/content/` at build time (the full repository is cloned; only the working directory is `frontend/`).

### Environment variables (Production)

| Variable | Value |
|----------|-------|
| `NODE_VERSION` | `22` |
| `STATIC_EXPORT` | `1` |
| `NEXT_PUBLIC_SITE_URL` | `https://doxastudios.ca` |

Optional: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_CALENDLY_URL`

**Do not set `CLOUDFLARE_API_TOKEN` in build variables.** Workers Builds authenticates via the Git connection. A custom API token overrides that and causes auth errors.

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
$env:STATIC_EXPORT = "1"
npm run build
# Output: frontend/out
```

## Local deploy

```powershell
cd frontend
$env:STATIC_EXPORT = "1"
npm run build
npm run deploy
```

## Backend

See [`backend/.env.example`](backend/.env.example). Content is read from the filesystem at build time; the API is only needed for live contact form submissions.
