# Production Checklist

Run through this before promoting a build to production.

## Environment & configuration

- [ ] `VITE_API_BASE_URL` set to the real production API origin (HTTPS)
- [ ] `VITE_BASE_PATH` set correctly if deploying under a subpath
- [ ] No `.env*` files committed to the repo (`.gitignore` already excludes
      them — verify `git status` is clean before tagging a release)
- [ ] Backend CORS allows the production frontend origin

## Build

- [ ] `npm run lint` passes with zero warnings
- [ ] `npm run build` completes without errors
- [ ] `npm run preview` checked manually — app loads, login works, at
      least one page per role renders correctly
- [ ] Bundle size reviewed (`dist/assets/*.js` — the manualChunks split in
      `vite.config.js` keeps vendor code cacheable separately from app code)
- [ ] Sourcemaps: on by default outside `production` mode, off for the
      public production build (see `vite.config.js`) — confirm this matches
      your error-reporting setup (re-enable if you upload sourcemaps to a
      service like Sentry)

## Security

- [ ] `robots.txt` disallows indexing (already set — this is an
      authenticated internal app, not a public site)
- [ ] Security headers present in the deployed response
      (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` — set
      in `nginx.conf`/`vercel.json`/`netlify.toml`, verify whichever one
      you're actually using)
- [ ] JWT access token attached via the axios request interceptor only;
      never logged, never put in a URL
- [ ] Refresh-token flow tested: expire an access token and confirm silent
      refresh works, and that a truly dead session redirects to `/login`
      with `SessionExpiredDialog` shown
- [ ] `Permissions-Policy` camera scope in `nginx.conf` matches whether
      QR/face-recognition features are enabled for this deployment

## Routing & auth

- [ ] Deep-linking to a protected route while logged out redirects to
      `/login` and returns to the original page after sign-in
- [ ] Role guards tested for all four roles (student/faculty/admin/
      unauthenticated) — each role only sees its own routes,
      `/system/*` and role-restricted pages correctly redirect to
      `/unauthorized` for the wrong role
- [ ] Refreshing the browser on a deep client-side route does NOT 404
      (this is what the SPA fallback config in each deployment target
      exists for — test it on the actual host, not just `vite preview`)

## Accessibility

- [ ] Keyboard-only pass: can open/close modals, submit forms, and
      navigate every page without a mouse
- [ ] Screen reader spot-check on at least the login flow and one data
      table (DataTable's `aria-sort`/`aria-busy`, Modal's focus trap)
- [ ] Color contrast checked in both light and dark mode for primary text

## Resilience

- [ ] Offline banner appears/disappears correctly when toggling network
      in devtools
- [ ] A failed API call shows `ErrorState` with a working retry, not a
      blank section
- [ ] Throwing an error inside a page component is caught by
      `ErrorBoundary` and shows the recovery screen, not a blank app

## Post-deploy smoke test

- [ ] Login with each role
- [ ] One CRUD action per major module (students, faculty, roles, etc.)
- [ ] One chart-heavy page (Analytics Dashboard or Reports)
- [ ] Dark mode toggle persists across reload
