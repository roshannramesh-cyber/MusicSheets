# MusicSheets — Login/Logout Setup

Project: musicsheets(AI piano transcription app). This task scaffolds authentication only — login, logout, and session check. No transcription/ML features yet.

## Stack

- **Backend:** FastAPI (Python)
- **Frontend:** Next.js (App Router, TypeScript, Tailwind)
- **DB:** SQLite for local dev (swap to Postgres later)
- **Auth:** JWT stored in an httpOnly cookie

## Backend — `/backend`

1. Install: `fastapi`, `uvicorn`, `sqlalchemy`, `passlib[bcrypt]`, `python-jose[cryptography]`, `python-multipart`
2. **database.py** — SQLAlchemy engine + session factory (SQLite: `sqlite:///./musicsheets.db`)
3. **models.py** — `User` table: `id`, `email` (unique), `name`, `hashed_password`, `created_at`
4. **auth.py** — password hashing/verification with passlib(bcrypt); JWT encode/decode with python-jose
5. **main.py** — routes:
   - `POST /auth/register` — create user, hash password, return user (no password)
   - `POST /auth/login` — verify credentials, set JWT as httpOnly cookie
   - `POST /auth/logout` — clear the cookie
   - `GET /auth/me` — return current user, resolved from JWT cookie via a dependency; 401 if missing/invalid
6. Enable CORS: allow the frontend origin, `allow_credentials=True`
7. Run: `uvicorn main:app --reload` (port 8000)

## Frontend — `/frontend`

1. Scaffold: `npx create-next-app@latest frontend --typescript --tailwind --app`
2. **lib/auth-context.tsx** — React context: `user`, `login()`, `logout()`, `checkSession()`, all calling the backend with `credentials: "include"`
3. **app/login/page.tsx** — email/password form, calls `POST /auth/login`, redirect to `/dashboard` on success, inline error on failure
4. **app/dashboard/page.tsx** — protected placeholder page with a "Log out" button calling `logout()`
5. **middleware.ts** — reads the auth cookie, redirects unauthenticated users hitting protected routes to `/login`
6. Env var: `NEXT_PUBLIC_API_URL=http://localhost:8000`
7. Run: `npm run dev` (port 3000)

## Cookie/session rules

- JWT cookie: `httpOnly`, `secure` in production, `sameSite="lax"`
- Frontend never reads the token directly — it only checks `/auth/me` to know if a session is active

## Acceptance criteria

- [ ] User can register with email/name/password
- [ ] User can log in and lands on `/dashboard`
- [ ] Refreshing `/dashboard` keeps the session (cookie persists)
- [ ] Logging out clears the cookie and redirects to `/login`
- [ ] Visiting `/dashboard` while logged out redirects to `/login`