# MusicSheets 🎵
> AI-Based Music Transcription and Notation Conversion System

MusicSheets is a full-stack web application designed to simplify music learning by
seamlessly converting between audio recordings, MIDI files, traditional sheet music,
and interactive Synthesia-style visualizations using AI.

---

## 👥 Team Information (Team 12)

| Name | Roll Number | Role |
|---|---|---|
| Aswath | 23MIS1086 | Product Owner |
| Meghana | 23MIS1104 | Scrum Master & DevOps Engineer |
| Roshan | 23MIS1097 | Developer & QA Engineer |

**Course:** ISWE406P – Agile Development Process and DevOps Lab  
**Institution:** Vellore Institute of Technology (VIT), Chennai

---

## 🚀 Key Features

- **AI Audio-to-MIDI Transcription** — Upload MP3/WAV recordings to extract accurate pitch, velocity, and timing data into MIDI.
- **MIDI-to-Sheet Music Engine** — Render and export traditional sheet music notations directly to PDF.
- **Optical Music Recognition (OMR)** — Upload sheet music images/scans to convert them back into playable digital MIDI data.
- **Synthesia Learning Mode** — Practice interactively with falling notes synchronized against a virtual keyboard.
- **User Authentication & Dashboard** — Secure JWT-based login to track and manage personal conversion histories.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16 (App Router), TypeScript, Tailwind CSS |
| **Backend** | FastAPI (Python 3.12), SQLAlchemy ORM |
| **Auth** | JWT tokens via `python-jose`, bcrypt hashing via `passlib` — stored in `httpOnly` cookies |
| **Database** | SQLite (development) — swappable for PostgreSQL in production via `DATABASE_URL` env var |
| **Dev Server** | Uvicorn (backend :8000) + Next.js Turbopack (frontend :3000) |

---

## 📁 Repository Structure

```
MusicApp/
├── backend/
│   ├── main.py              # FastAPI app — all auth routes (register, login, logout, me)
│   ├── auth.py              # Password hashing (bcrypt) + JWT encode/decode helpers
│   ├── models.py            # SQLAlchemy User model
│   ├── database.py          # DB engine, session factory, Base
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── app/
│   │   ├── login/
│   │   │   └── page.tsx     # Login / Register page
│   │   ├── dashboard/
│   │   │   └── page.tsx     # Protected dashboard page
│   │   ├── layout.tsx       # Root layout — AuthProvider + Inter font
│   │   ├── globals.css      # Design system — CSS tokens, glass card, buttons
│   │   └── page.tsx         # Root redirect → /login
│   ├── lib/
│   │   └── auth-context.tsx # React auth context (user, login, logout, checkSession)
│   ├── proxy.ts             # Next.js request proxy — cookie-based route protection
│   ├── next.config.ts
│   └── package.json
├── .gitignore
├── gemini.md                # Project spec / agent instructions
└── README.md
```

> **Note:** `backend/venv/` (or `.venv/`), `backend/*.db`, `frontend/node_modules/`, `frontend/.next/`, and `frontend/.env.local` are all git-ignored.

---

## ⚙️ Getting Started

### Prerequisites

- **Python** 3.12+
- **Node.js** 18+ and **npm** 9+
- **Git**

### 1 — Clone the repository

```bash
git clone <your-repo-url>
cd MusicApp
```

### 2 — Backend setup

```bash
cd backend
```

**Create and activate a virtual environment:**

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python -m venv venv
source venv/bin/activate
```

**Install dependencies:**

```bash
pip install -r requirements.txt
```

**Run the development server:**

```bash
python -m uvicorn main:app --reload
# API available at http://localhost:8000
# Interactive docs at http://localhost:8000/docs
```

The SQLite database (`musicsheets.db`) is created automatically on first startup.

### 3 — Frontend setup

Open a **second terminal** (keep the backend running):

```bash
cd frontend
npm install
```

**Create the environment file:**

```bash
# Windows PowerShell
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# macOS / Linux
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

**Run the development server:**

```bash
npm run dev
# App available at http://localhost:3000
```

> ⚠️ Both servers must run simultaneously. Backend on `:8000`, frontend on `:3000`.

---

## 🔐 Environment Variables

### Backend (`backend/`)

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | `sqlite:///./musicsheets.db` | SQLAlchemy DB URL — set to Postgres URL in production |
| `SECRET_KEY` | `change-me-in-production-...` | JWT signing secret — **always override in production** |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `60` | JWT token lifetime in minutes |

Set these in a `backend/.env` file (git-ignored) or as system environment variables.

### Frontend (`frontend/`)

| Variable | Example Value | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Base URL for all backend API calls |

Set in `frontend/.env.local` (git-ignored).

---

## 🌿 Git Workflow

We follow a **feature-branch workflow**. Direct commits to `main` are not allowed.

### Branch naming

```
<name>/<feature-description>
```

Examples:
```
meghana/dashboard-ui
roshan/omr-upload-endpoint
aswath/synthesia-player
```

### Standard flow

```bash
# 1. Always start from an up-to-date main
git checkout main
git pull origin main

# 2. Create your feature branch
git checkout -b yourname/your-feature

# 3. Make commits (see commit conventions below)
git add .
git commit -m "feat: add audio upload endpoint"

# 4. Push and open a Pull Request
git push origin yourname/your-feature
```

### Pull Request rules

- PRs require **at least 1 review/approval** before merging into `main`
- Keep PRs **small and scoped** to a single feature or fix
- Always **pull latest `main`** before starting new work to avoid conflicts
- Delete the branch after merging

---

## 🤝 Contributing

### Commit message conventions

We use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | When to use |
|---|---|
| `feat:` | New feature or user-facing functionality |
| `fix:` | Bug fix |
| `docs:` | Documentation only changes |
| `refactor:` | Code restructuring with no behaviour change |
| `style:` | Formatting, whitespace, missing semicolons |
| `test:` | Adding or updating tests |
| `chore:` | Tooling, config, dependency updates |

**Examples:**
```
feat: add MIDI-to-PDF export endpoint
fix: correct JWT expiry calculation for timezone-aware datetimes
docs: update setup instructions for Windows venv activation
refactor: extract auth cookie logic into shared helper
```

### Code review expectations

- Review within **24 hours** of a PR being opened
- Leave constructive, specific comments — suggest alternatives where possible
- Approve only when you've read the diff and the feature works as described
- The PR author resolves all comments before merging

### Reporting issues

Open a GitHub Issue with:
1. What you expected to happen
2. What actually happened
3. Steps to reproduce
4. Environment (OS, Python version, Node version)

---

## 📜 License & Course Disclaimer

This project is developed as an academic submission for:

> **ISWE406P — Agile Development Process and DevOps Lab**  
> Vellore Institute of Technology (VIT), Chennai  
> Team 12 — Aswath, Meghana, Roshan

The codebase is intended for educational purposes only. It is not licensed for commercial use or redistribution without explicit permission from the team members.
