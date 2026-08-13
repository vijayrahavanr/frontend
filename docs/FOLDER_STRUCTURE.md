# Folder Structure Guide

```
frontend/
├── public/              Static files copied as-is (favicon, manifest, robots.txt,
│                         _redirects, 404.html)
├── src/
│   ├── assets/           Images, fonts, static media imported by components
│   ├── components/       Reusable UI, grouped by domain
│   │   ├── common/         Cross-app primitives: Button, Modal, DataTable,
│   │   │                   ErrorBoundary, ErrorState, Skeleton, etc.
│   │   ├── charts/          Chart.js wrappers (LineChart, BarChart, ChartWrapper...)
│   │   ├── auth/, student/, faculty/, admin/, attendance/,
│   │   │   analytics/, system/     Domain-specific presentational components
│   ├── constants/        Route paths, API endpoint paths, role/permission
│   │                     enums — the single source of truth other files import from
│   ├── features/         Reserved for feature-flagged/experimental modules
│   ├── hooks/             One hook per domain (useAuth, useStudents, useSystem...),
│   │                     each wrapping a slice's dispatch + selectors behind a
│   │                     single ergonomic API. Pages call hooks, never the store directly.
│   ├── layout/            App chrome: Header, Sidebar, PageWrapper, Section
│   ├── pages/             Route-level components, grouped by role/domain
│   │                     (student/, faculty/, admin/, attendance/, analytics/, system/)
│   ├── redux/
│   │   ├── slices/          One slice per domain — state, thunks, and selectors
│   │   │                    co-located in a single file
│   │   ├── rootReducer.js   Combines every slice; the reducer key MUST match
│   │   │                    the slice's `name` field
│   │   └── store.js         configureStore + redux-persist wiring
│   ├── routes/            AppRoutes.jsx (route table) + guards: ProtectedRoute,
│   │                     AdminRoute, FacultyRoute, StudentRoute, PermissionGuard
│   ├── services/           Pure HTTP layer — one file per domain, each function
│   │                     is a thin axios call and nothing else. Slices call
│   │                     services; components never call services directly.
│   ├── styles/             Global CSS, Tailwind entry point
│   ├── utils/              Framework-agnostic helpers (formatting, validation,
│   │                     permission checks, chart config, token storage)
│   ├── App.jsx             Root component: ErrorBoundary, OfflineBanner,
│   │                     Toaster, AppRoutes composition
│   └── main.jsx            Entry point: Redux Provider, PersistGate,
│                          BrowserRouter, top-level ErrorBoundary
├── docs/                 This guide and its siblings
├── .github/workflows/    CI/CD (GitHub Pages deploy)
├── Dockerfile, nginx.conf, docker-compose.yml
├── vercel.json, netlify.toml
└── vite.config.js, eslint.config.js, tailwind.config.js
```

## Layering rule

```
pages/  →  hooks/  →  redux/slices/  →  services/  →  api.js (axios)
                              ↑
                        components/ (dumb, receive data via props)
```

- **Pages** compose components and call hooks for data — no direct
  `dispatch`/`useSelector`, no direct service calls.
- **Hooks** are the only thing pages talk to for state. Each hook wraps one
  slice's actions and selectors.
- **Slices** own state shape and async thunks. Thunks call **services**,
  never `axios`/`api` directly.
- **Services** are pure HTTP — no state, no side effects beyond the
  request itself.
- **Components** are presentational: props in, JSX out. They don't know
  about Redux or services.

## Adding a new domain module

1. `constants/<domain>Endpoints.js` — endpoint paths
2. `services/<domain>Service.js` — HTTP calls
3. `redux/slices/<domain>Slice.js` — state + thunks + selectors; register
   in `redux/rootReducer.js`
4. `hooks/use<Domain>.js` — wraps the slice
5. `components/<domain>/` — presentational pieces
6. `pages/<domain>/` — route-level pages, wired to the hook
7. `routes/AppRoutes.jsx` — lazy import + `<Route>` entries under the
   right guard
8. `constants/routes.constants.js` — route path constants
