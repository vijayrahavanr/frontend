# AI-Powered Smart Attendance & Performance Analytics System

An enterprise frontend for institution-wide attendance tracking (QR + face
recognition), leave management, timetabling, and AI-assisted performance
analytics — with a full System Management console (roles, permissions,
audit logs, backups, configuration, and support) for administrators.

Built with React 19, Vite, Redux Toolkit, Tailwind CSS, and MUI.

## Quick start

```bash
npm install
cp .env.example .env      # then set VITE_API_BASE_URL
npm run dev
```

The app runs at `http://localhost:5173` and expects a backend API at the
URL configured in `.env` (see [Environment variables](#environment-variables)).

## Documentation

| Guide | What it covers |
|---|---|
| [docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md) | Architecture, conventions, how to add a module |
| [docs/FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md) | What lives where and why |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Docker, Nginx, Vercel, Netlify, GitHub Pages |
| [docs/PRODUCTION_CHECKLIST.md](docs/PRODUCTION_CHECKLIST.md) | Pre-launch verification |
| [docs/RELEASE_CHECKLIST.md](docs/RELEASE_CHECKLIST.md) | Steps for every release |

## Tech stack

- **React 19** + **Vite** — build tooling, lazy-loaded routes
- **Redux Toolkit** + **React Redux** — state, organized as one slice per
  domain (auth, students, faculty, admin, attendance, reports, system, etc.)
- **React Router v6** — routing with role- and permission-based guards
- **Tailwind CSS** + **MUI** — styling and complex interactive components
- **Chart.js** via `react-chartjs-2` — all analytics charts
- **React Hook Form** + **Yup** — form state and validation
- **Axios** — HTTP client with JWT refresh, retry-with-backoff, and
  centralized error handling

## Environment variables

See [.env.example](.env.example) for the full list with explanations.
The two that matter for most deployments:

| Variable | Purpose | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API origin | `http://localhost:8000/api/v1` |
| `VITE_BASE_PATH` | Subpath deploys only (GitHub Pages) | `/` |

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build to `dist/` |
| `npm run build:staging` | Build using `.env.staging` (`--mode staging`) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` / `lint:fix` | ESLint (fails on any warning in CI) |
| `npm run format` / `format:check` | Prettier |
| `npm run clean` | Remove `dist/` |

## Installation guide

**Requirements:** Node.js ≥ 18.18, npm ≥ 9 (see `engines` in `package.json`).

```bash
git clone <repo-url>
cd frontend
npm install
cp .env.example .env
# edit .env: set VITE_API_BASE_URL to your backend
npm run dev
```

To verify a production build locally before deploying:

```bash
npm run build
npm run preview
```

## Deployment

Deployment configs are included and ready to use out of the box for:

- **Docker + Nginx** — `Dockerfile`, `nginx.conf`, `docker-compose.yml`
- **Vercel** — `vercel.json`
- **Netlify** — `netlify.toml`, `public/_redirects`
- **GitHub Pages** — `.github/workflows/deploy.yml`, `public/404.html`

Full instructions for each target: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## License

Proprietary — internal project. Add a license here if this is ever open-sourced.
"# frontend" 
