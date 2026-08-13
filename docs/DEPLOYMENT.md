# Deployment Guide

This is a static single-page app after `npm run build` — the output in
`dist/` can be served by any static host, as long as the host rewrites
unknown paths back to `index.html` (required for React Router's
client-side routing). Every target below is already configured for that.

All targets need `VITE_API_BASE_URL` set at **build time** (Vite inlines
`import.meta.env.*` into the bundle — it cannot be changed at runtime
without rebuilding).

---

## Docker + Nginx

```bash
docker build --build-arg VITE_API_BASE_URL=https://api.example.com -t attendance-frontend .
docker run -p 8080:80 attendance-frontend
```

Or with Compose (reads `VITE_API_BASE_URL`/`VITE_BASE_PATH` from your shell
or a `.env` file next to `docker-compose.yml`):

```bash
VITE_API_BASE_URL=https://api.example.com docker-compose up --build
```

The image is a two-stage build: `node:20-alpine` compiles the app, then
`nginx:1.27-alpine` serves the static output. `nginx.conf` handles the SPA
fallback, immutable long-term caching for hashed assets, no-cache for
`index.html` (so deploys don't get stuck behind a stale cached shell), gzip,
and baseline security headers.

## Vercel

Push the repo and import it in the Vercel dashboard, or:

```bash
npm i -g vercel
vercel --prod
```

`vercel.json` sets the SPA rewrite, asset caching, and security headers.
Set `VITE_API_BASE_URL` under Project Settings → Environment Variables.

## Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

`netlify.toml` sets the build command, SPA redirect, and headers;
`public/_redirects` is a second copy of the SPA fallback rule (Netlify
honors either, having both is just belt-and-suspenders). Set
`VITE_API_BASE_URL` under Site Settings → Environment Variables.

## GitHub Pages

Handled by `.github/workflows/deploy.yml` — pushes to `main` build and
publish automatically via GitHub's official Pages actions. One-time setup:

1. Repo Settings → Pages → Source → "GitHub Actions".
2. Repo Settings → Secrets and variables → Actions → Variables → add
   `VITE_API_BASE_URL`.
3. Push to `main`.

GitHub Pages has no server-side rewrites, so deep-link routes (e.g.
refreshing on `/system/dashboard`) are handled by the `public/404.html` +
`index.html` redirect-decode pair (the
[spa-github-pages](https://github.com/rafgraph/spa-github-pages) technique).
This is already wired up — no action needed unless you're deploying under
a nested subpath, in which case bump `segmentCount` in `public/404.html`.

## Any other static host

```bash
npm run build
```

Upload the contents of `dist/` and configure the host to serve
`index.html` for any path that isn't a real file. That's the only hard
requirement.

---

## Staging builds

`npm run build:staging` runs `vite build --mode staging`, which loads
`.env.staging` instead of `.env.production` if that file exists. Useful for
a pre-prod environment pointed at a staging API.

## Verifying a build before deploying

```bash
npm run build
npm run preview
```

`preview` serves the actual `dist/` output (not source) on port 4173 —
this is the closest local approximation to production and worth checking
before every release (see [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md)).
