# Doxa Studios

Independent **frontend** (Next.js static export on Cloudflare Workers) and **backend** (Node API on Render/Railway) projects.

**Production:** [https://doxastudios.ca](https://doxastudios.ca)

Each project (`frontend/`, `backend/`) is fully self-contained with its own dependencies, content, and build pipeline.

## Frontend — Cloudflare Workers

Connect the repository in **Cloudflare Dashboard → Workers & Pages → Create → Worker → Connect to Git**.

### Build settings

| Setting | Value |
|---------|-------|
| Root directory | `frontend` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

Content lives in [`frontend/content/`](frontend/content/) and is read at build time.

### Environment variables (Production)

| Variable | Value |
|----------|-------|
| `NODE_VERSION` | `22` |
| `NEXT_PUBLIC_SITE_URL` | `https://doxastudios.ca` |

Optional: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_CALENDLY_URL`

**Do not set `CLOUDFLARE_API_TOKEN` in build variables.**

### Custom domain

Add **doxastudios.ca** under **Custom domains** and enable HTTPS.

For **www → apex**, use **Cloudflare Dashboard → Rules → Redirect Rules**:

| Field | Value |
|-------|-------|
| When | Hostname equals `www.doxastudios.ca` |
| Then | Static redirect to `https://doxastudios.ca/${uri.path}` (301) |

### Edit site content

Update files in [`frontend/content/`](frontend/content/). Push to Git to redeploy.

### Local frontend

```powershell
cd frontend
npm install
npm run dev
```

## Backend — Render / Railway

Minimal API for health checks and contact form submissions (`POST /api/contact`). The live site contact form currently uses `mailto:`.

See [`backend/.env.example`](backend/.env.example). Contact email routing reads [`backend/content/site.json`](backend/content/site.json).

```powershell
cd backend
npm install
npm run dev
```

Deploy via [`backend/render.yaml`](backend/render.yaml) or Railway.
