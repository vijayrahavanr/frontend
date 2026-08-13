# Release Checklist

Steps for every release, in order.

## 1. Before merging to `main`

- [ ] `npm run lint` clean
- [ ] `npm run format:check` clean
- [ ] Manual smoke test on the feature branch (`npm run dev`)
- [ ] `npm run build` succeeds locally

## 2. Version & changelog

- [ ] Bump `version` in `package.json` (semver: patch for fixes, minor for
      new modules/features, major for breaking changes)
- [ ] Update a CHANGELOG entry (if the project keeps one) summarizing
      what shipped

## 3. Merge & tag

- [ ] Merge to `main`
- [ ] Tag the release: `git tag vX.Y.Z && git push --tags`

## 4. Deploy

Follow [DEPLOYMENT.md](DEPLOYMENT.md) for the target(s) in use:

- [ ] GitHub Pages: merging to `main` auto-deploys via
      `.github/workflows/deploy.yml` — confirm the Actions run went green
- [ ] Vercel/Netlify: confirm the auto-deploy triggered and finished, or
      trigger manually
- [ ] Docker: build and push the new image tag, roll it out
      (`docker-compose up --build` / your orchestrator's deploy step)

## 5. Verify in production

Run through [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)'s
"Post-deploy smoke test" section against the live URL, not a local preview.

## 6. Rollback plan

- **Docker**: redeploy the previous image tag
- **Vercel/Netlify**: use the dashboard's "Redeploy" on the last known-good
  deployment (both keep prior deploys instantly promotable)
- **GitHub Pages**: revert the merge commit on `main` and push — the
  workflow redeploys the reverted state

Keep this reversible for at least one release cycle: don't delete the
previous Docker image tag or force-push over the last Pages deploy until
the new release has been stable for a few days.
