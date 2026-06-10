# Doxa Studios

A monorepo with a **Next.js static frontend** (Cloudflare Pages) and a **Node API backend** (Render/Railway) serving content and contact form submissions.

**Production:** [https://doxastudios.ca](https://doxastudios.ca)

## Deploy frontend — Cloudflare Pages (GitHub)

Connect this repo in **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**.

### Build settings

| Setting | Value |
|---------|-------|
| Framework preset | **None** |
| Root directory | `/` |
| Build command | `npm run build` |
| Build output directory | `frontend/out` |
| **Deploy command** | **Leave empty** |

> **Important:** Do not set `npx wrangler deploy` as the deploy command. This is a static site — Cloudflare publishes `frontend/out` automatically after the build. `wrangler deploy` is for Workers and will fail in this monorepo.

### Environment variables (Production)

| Variable | Value |
|----------|-------|
| `NODE_VERSION` | `20` |
| `NEXT_PUBLIC_SITE_URL` | `https://doxastudios.ca` |

Optional: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_CALENDLY_URL`

Cloudflare sets `CF_PAGES=1` during builds automatically, which enables static export via [`scripts/build.mjs`](scripts/build.mjs).

### Custom domain

Add **doxastudios.ca** under **Custom domains** and enable HTTPS.

### Edit contact info

Update [`backend/content/site.json`](backend/content/site.json) — email, phone, address, social. Empty fields are hidden. Push to Git to redeploy.

## Local build (matches Cloudflare)

```powershell
$env:CF_PAGES = "1"
npm run build
# Output: frontend/out
```

## Backend

See [`backend/.env.example`](backend/.env.example). Content is read from the filesystem at build time; the API is only needed for live contact form submissions.
