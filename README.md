# Doxa Studios

Independent **frontend** (Next.js static export on Cloudflare Workers) and **backend** (Node API on Render/Railway) projects.

**Production:** [https://doxastudios.ca](https://doxastudios.ca)

Each project (`frontend/`, `backend/`) is fully self-contained with its own dependencies, content, and build pipeline. Neither project requires the other to build or deploy.

## Frontend — Cloudflare Workers

Connect the repository in **Cloudflare Dashboard → Workers & Pages → Create → Worker → Connect to Git**.

### Build settings

| Setting | Value |
|---------|-------|
| Root directory | `frontend` |
| Build command | `npm ci --include=optional && npm run build` |
| Deploy command | `npx wrangler deploy` |

The build produces a static export in `frontend/out`. Wrangler uploads that directory via [`frontend/wrangler.toml`](frontend/wrangler.toml).

Content lives in [`frontend/content/`](frontend/content/) and is read at build time. No backend files are required.

### Environment variables (Production)

| Variable | Value |
|----------|-------|
| `NODE_VERSION` | `22` |
| `NEXT_PUBLIC_SITE_URL` | `https://doxastudios.ca` |

Optional: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_CALENDLY_URL`

**Do not set `CLOUDFLARE_API_TOKEN` in build variables.** Workers Builds authenticates via the Git connection.

### Custom domain

Add **doxastudios.ca** under **Custom domains** and enable HTTPS.

### Edit site content

Update files in [`frontend/content/`](frontend/content/) — e.g. [`frontend/content/site.json`](frontend/content/site.json) for contact info. Push to Git to redeploy.

### Local frontend

```powershell
cd frontend
npm install
npm run dev
```

### Local build and deploy

```powershell
cd frontend
npm install
npm run build
npm run deploy
```

## Backend — Render / Railway

See [`backend/.env.example`](backend/.env.example). Content for API routes lives in [`backend/content/`](backend/content/).

```powershell
cd backend
npm install
npm run dev
```

Deploy via Render using [`backend/render.yaml`](backend/render.yaml), or connect the `backend/` directory to Railway.
