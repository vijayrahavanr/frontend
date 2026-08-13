# Mock API Server

A small local stand-in for the real backend, so you can run and click
through the frontend without one. Not a real backend — no database, no
real auth, no validation beyond "did you send an email and password".

## Run it

```bash
cd mock-server
npm install
npm start
```

Runs at `http://localhost:8000/api/v1` — the frontend's default
`VITE_API_BASE_URL`, so if your `.env` is unset/default you don't need to
change anything.

Run it in its own terminal, alongside `npm run dev` in `frontend/` (two
separate processes).

## Logging in

Any password works. The **email** decides which role you get:

| Email contains | Role logged in as |
|---|---|
| `admin` | Admin |
| `faculty` / `teacher` / `prof` | Faculty |
| anything else | Student |

Example: `admin@test.com` / `anything` logs you in as an admin with full
system-management access; `jane@test.com` / `anything` logs you in as a
student.

## What's mocked vs. what's generic

A handful of high-traffic endpoints return realistic, populated data:
login/logout/refresh/profile, `/system/dashboard`, `/roles`,
`/permissions`, `/students`, `/faculty`, `/notifications`.

Every other endpoint (there are ~150+ across the real app) falls through
to a generic catch-all: GETs return an empty-but-correctly-shaped list
(`{ items: [], total: 0, ... }`) so pages render their empty states
instead of erroring, and writes (POST/PUT/PATCH/DELETE) echo your
request back with a fake id so create/edit forms "succeed" and show
their success toasts.

This is enough to verify the whole app renders, routes, and functions
correctly end-to-end — it's not enough to see real, persistent data.
Nothing you create is saved anywhere; restarting the server resets
everything (including who's "logged in", since sessions live in memory).

## Adding a real fixture

If a specific page feels too empty and you want to see it populated,
add a route for it above the catch-all in `index.js`, following the
same pattern as the existing curated ones (e.g. `/students`). Check the
relevant `src/services/*.js` file in the frontend to confirm the exact
path and response shape a page expects.
