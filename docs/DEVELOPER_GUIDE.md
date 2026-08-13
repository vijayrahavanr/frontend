# Developer Guide

## Architecture at a glance

See [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) for the full layering rule.
In short: **pages → hooks → redux slices → services → axios**, with
presentational components fed entirely by props.

## State management conventions

- One slice per domain, named to match its `rootReducer.js` key exactly
  (e.g. `name: 'system'` ↔ `system: systemReducer`). A mismatch here is a
  silent bug — `useSelector` calls quietly return `undefined`.
- Every async thunk follows the same shape:
  ```js
  export const getThing = createAsyncThunk('domain/getThing', async (params, { rejectWithValue }) => {
    try {
      const { data } = await thingService.getThing(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  });
  ```
- `pending` sets `loading: true` and clears `error`; `fulfilled` writes the
  payload and clears `loading`; `rejected` writes `error` from
  `action.payload`. Mutations (create/update/delete) also set a `success`
  message on `fulfilled` for toast feedback.
- Selectors are plain field accessors (`(state) => state.domain.thing`).
  None of the current selectors do expensive derivation, so `reselect`/
  `createSelector` isn't needed yet — reach for it if a selector starts
  filtering/sorting/aggregating, so that work is cached instead of
  re-running on every render.

## Data fetching in components

Standard pattern for a page:

```jsx
const { thing, loading, error, fetchThing } = useThing();

useEffect(() => {
  fetchThing();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

if (error) return <ErrorState description={error} onRetry={fetchThing} />;
if (loading && !thing) return <Skeleton className="h-96 rounded-2xl" />;
```

The `exhaustive-deps` suppression is deliberate: `fetchThing` is a stable
`useCallback` from the hook, and re-running the effect on every render
(which is what including it "correctly" would do without that stability)
isn't the goal — the goal is fetch-on-mount, plus whatever explicit
dependencies (filters, search query, page) are listed.

## Cancelling in-flight requests

`services/api.js` exports `createAbortController()`. Use it in effects
that fetch on a dependency that can change quickly (search-as-you-type,
tab switches) to avoid a slow earlier response clobbering a newer one:

```js
useEffect(() => {
  const { signal, abort } = createAbortController();
  api.get('/students', { signal, params: { query } }).then(...);
  return abort;
}, [query]);
```

## Retry behavior

`api.js`'s response interceptor automatically retries idempotent `GET`
requests (up to twice, exponential backoff) on network failure or a
502/503/504 response. Opt a specific call out with `{ retry: false }` in
the request config if retrying would be wrong for that endpoint.

## Error boundaries

`App.jsx` wraps `<AppRoutes />` in `<ErrorBoundary>`, and `main.jsx` wraps
the whole tree in a second one (catches crashes in the auth/session layer
itself). Wrap any individually risky section (a complex chart, a
third-party widget) in its own `<ErrorBoundary fallbackTitle="...">` if a
failure there shouldn't take down the whole page.

## Adding a protected route

Pick the right guard for who should see the page:

| Guard | Use for |
|---|---|
| `ProtectedRoute` | Any authenticated user, any role |
| `StudentRoute` / `FacultyRoute` / `AdminRoute` | Role-specific pages |
| `PermissionGuard permissions={[...]}` | Fine-grained capability check, nested inside a role guard when a page needs more than "is this role" (e.g. Role Management needs `manage_roles`) |

## Accessibility conventions

- Every interactive element needs a visible label or `aria-label`.
- Modals trap focus, restore it to the trigger on close, and close on ESC
  (see `components/common/Modal.jsx`) — reuse it rather than building a
  one-off dialog.
- Sortable table headers set `aria-sort`; loading tables set
  `aria-busy` on the `<table>`.
- Status/error regions use `role="alert"` or `role="status"` +
  `aria-live="polite"` so screen readers announce them without user action.

## Performance conventions

- `ChartWrapper` and `DataTable` are wrapped in `React.memo` — they're the
  most expensive leaves (canvas repaint, large row sets) and are often
  re-rendered by a parent's unrelated state change.
- Prefer `useMemo`/`useCallback` for values passed to memoized children or
  used as effect dependencies, not reflexively on every function.
- Charts and tables are lazy-loaded at the route level already (every
  page is a `lazy()` import in `AppRoutes.jsx`) — no need to also lazy
  the components inside a page.

## Linting & formatting

```bash
npm run lint       # fails the build on any warning — this is what CI runs
npm run lint:fix    # auto-fix what's fixable
npm run format       # Prettier, writes changes
npm run format:check # Prettier, check only (CI-friendly)
```

ESLint includes `eslint-plugin-jsx-a11y` — accessibility issues (missing
alt text, invalid ARIA, non-interactive elements with click handlers) are
caught the same way as any other lint error.
