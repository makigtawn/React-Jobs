# Strata - AI Powered Candidate Screening Platform

## Overview

**Strata** is a full-stack recruitment platform that automates resume and candidate screening. Instead of employers manually reading through every application, Strata scores and ranks candidates against a job's requirements using an AI-powered evaluation pipeline (resume text + GitHub activity), and surfaces a ranked leaderboard per job.

## Architecture & Data Flow

The screening engine runs as part of the application-submission flow in the backend API:

```
[ Resume text ]      ──>  ( scoreResume via Gemini/OpenAI )   ──╮
[ GitHub URL ]        ──>  ( GitHub profile analysis + AI )     ──┼─> [ Final weighted score ] ──> [ applications table ]
[ Job description ]  ──>  ( fetched from Postgres )             ──╯         (Supabase)

```

1. **Inputs** — `resumeText` and `githubUrl` submitted by the candidate, matched against the target job's `description` and `minimum_score_threshold`.
2. **Processing** (`server/src/services/aiService.js`, `githubService.js`, `applicationService.js`) — scores skills/experience from the resume, analyzes the GitHub profile, and combines them into a weighted `final_score` (`skills*0.4 + experience*0.4 + github*0.2`). Applications below the job's threshold are automatically marked `Rejected` and trigger a rejection email.
3. **Output** — the scored application is written to the `applications` table; employers view rankings via the `/api/jobs/:jobId/top-candidates` and `/api/jobs/:jobId/applications` endpoints.

There's a separate, secondary AI flow for **employer/job-post legitimacy verification** (`/api/verify` → `verificationController.js` → `aiService.verifyJobPostLegitimacy`), which checks a job posting's TIN against a mock registry lookup to flag potential scam listings. This is independent of the candidate-scoring pipeline above and isn't currently wired into job creation automatically.

---

## Tech Stack

**Frontend:** React 19, React Router, Tailwind CSS v4, Vite
**Backend:** Node.js, Express 5, raw `pg` (no ORM)
**Database:** PostgreSQL via Supabase (connected directly with a Postgres connection string, not the `supabase-js` client)
**Auth:** Custom JWT (access + refresh tokens), bcrypt password hashing — not Supabase Auth
**AI:** Google Gemini (`@google/generative-ai`) and OpenAI SDK, used for resume/GitHub scoring and job-post legitimacy checks
**Cloud Infrastructure:** Render (backend), Vercel (frontend)

---

## Project Structure

```
Strata
│
├── server/
│   └── src/
│       ├── app.js              # Express app: CORS, helmet, body parsing, route mounting
│       ├── index.js            # Entry point — loads .env, starts the HTTP server
│       ├── config/env.js       # Reads/validates required env vars
│       ├── db/pool.js          # pg Pool connected to DATABASE_URL
│       ├── middleware/         # requireAuth (JWT check), errorHandler, notFound
│       ├── routes/             # authRoutes, jobRoutes, profileRoutes, applicationRoutes, verificationRoutes
│       ├── controllers/        # Request validation (zod) + response shaping per route
│       ├── services/           # DB queries and business logic (jobs, applications, AI scoring, email, GitHub)
│       └── utils/              # HttpError, asyncHandler, dbErrors helpers
│
├── src/                    # React frontend client
│   ├── assets/             # Images, icons, and static media
│   ├── components/         # Reusable UI components (JobForm, ApplicationsTable, editor, etc.)
│   ├── context/            # AuthContext (JWT session state)
│   ├── layouts/            # Page shell layouts
│   ├── pages/              # Application views (Dashboard, Jobs, Employer Profile, Auth)
│   ├── services/api.js     # Fetch wrapper — attaches Bearer token, all backend calls live here
│   ├── styles/             # Global CSS & styling configurations
│   └── utils/              # Client-side helper functions
│
├── .env                    # Local environment secrets & API keys (gitignored — see below)
├── index.html              # Frontend entry document
├── package.json            # Root project dependencies & scripts (frontend + API start scripts)
└── vite.config.js          # Vite config — includes a dev-only /api proxy to localhost:3000

```

---

## API Endpoints

All routes are mounted under `/api` in `server/src/app.js`.

| Path | Purpose |
|---|---|
| `GET /api/health` | Liveness check |
| `POST /api/auth/register`, `/login`, `/refresh`, `/logout`, `GET /me` | Auth (JWT access + refresh token flow) |
| `GET /api/jobs`, `GET /api/jobs/:id` | Public job listing/detail |
| `POST /api/jobs`, `PUT /api/jobs/:id`, `DELETE /api/jobs/:id` | Job management (requires auth) |
| `GET /api/jobs/mine` | Employer's own jobs (requires auth) |
| `GET /api/jobs/:jobId/applications`, `/top-candidates` | Applicant dashboard data (requires auth) |
| `POST /api/applications`, `PATCH /api/applications/:id/status` | Candidate application submission + status changes (requires auth) |
| `GET /api/company`, `POST`, `PUT`, `DELETE` | Employer company profile CRUD (requires auth) |
| `POST /api/verify` | AI job-post legitimacy check |

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/makigtawn/strata.git
cd strata
```

### 2. Configure Environment Variables

Create a `.env` file in the project root. These are the variables the code actually reads (`server/src/config/env.js`, `db/pool.js`, `middleware/auth.js`, `src/services/api.js`):

```env
PORT=3000

# Postgres connection string for your Supabase project (Connection Pooling URL recommended)
DATABASE_URL=postgresql://user:password@host:5432/postgres

# Used to sign/verify JWTs — generate distinct random values for each, e.g.:
#   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Allowed frontend origin for CORS (local dev default shown)
CLIENT_ORIGIN=http://localhost:5173

# AI providers used for resume/GitHub scoring and job-post verification
GEMINI_API_KEY=
OPENAI_API_KEY=

# Read by the frontend at build time (Vite) — must point at wherever the
# Express API is actually reachable. For local dev this is the Express
# server above; for a deployed frontend this MUST be your deployed backend's
# public URL (e.g. https://your-backend.onrender.com), never a localhost value.
VITE_API_BASE_URL=http://localhost:3000
```

**Note:** there is no `SUPABASE_URL`/`SUPABASE_ANON_KEY` — the app talks to Postgres directly via `pg`, not the Supabase client SDK, so only a standard connection string is needed.

**Deploying `VITE_API_BASE_URL`:** this is baked into the frontend bundle at build time. Setting/changing it on Vercel requires a new deployment to take effect — updating the env var alone does not update an already-built bundle.

### 3. Database Setup

There is currently no committed migrations folder — the schema lives directly in your Supabase project. Apply/update your schema by running SQL directly in the Supabase SQL Editor. Required tables: `users`, `refresh_tokens`, `jobs`, `applications`, `employer_profiles`. See the column lists each service/controller queries (`server/src/services/*.js`, `server/src/controllers/*.js`) as the source of truth for what each table needs.

### 4. Install Dependencies & Run

Install all project modules from the root:

```bash
npm install
```

Start the backend API server:

```bash
npm run dev:api
```

Start the frontend dev server (in a separate terminal):

```bash
npm run dev
```

* **Frontend Client:** `http://localhost:5173`
* **Backend API:** `http://localhost:3000` (proxied from the frontend at `/api` via `vite.config.js` during local dev)

### 5. Deployed Environments

The backend (Render) and frontend (Vercel) are deployed separately and need their **own** environment variables set in each platform's dashboard — values in your local `.env` are not shared automatically:

- **Render (backend):** `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `CLIENT_ORIGIN` (your deployed frontend's `https://` URL), `GEMINI_API_KEY`, `OPENAI_API_KEY`.
- **Vercel (frontend):** `VITE_API_BASE_URL` set to your deployed backend's `https://` URL — redeploy after changing it.

---

## Author/Developer

**Meklit Girmaw**
