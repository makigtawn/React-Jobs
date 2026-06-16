# Strata - AI Powered Candidate Screening Platform

## Overview

**Strata** is a next-generation, full-stack recruitment platform designed to eliminate the manual effort of resume screening. Instead of forcing employers to read through hundreds of applications, Strata features an **AI-powered candidate screening and filtering engine**.

The core processing engine extracts information from candidate profiles, analyzes technical depth via GitHub activity, and automatically scores and ranks applicants against specific job descriptions. This ensures employers hire faster, cheaper, and with a much higher talent signal.


## Architecture & Data Flow

The screening engine functions as a specialized processing pipeline within the backend API:

```
[ PDF Resume ]       ──>  ( Text Extraction )    ──╮
[ GitHub Account ]   ──>  ( GitHub API Fetch )   ──┼─> [ AI Screening Engine ] ──> [ Ranked Lead Table ]
[ Job Post Data ]    ──>  ( Supabase DB )        ──╯         (Gemini/OpenAI)          (Saved to Supabase)

```

1. **The Inputs:** 
* `resumeText`: Extracted raw text from candidate-uploaded documents (PDF/Word).
* `githubSummary`: Aggregated developer metrics (repos, languages, commit history) pulled directly via the GitHub API.
* `jobDescription`: Target requirements retrieved straight from your Supabase database.


2. **The Processing:** Authenticated securely via environment variables (`.env`), the engine leverages advanced AI models to score, validate, and write tailored breakdown analysis back to the system.

3. **The Output:** Highly organized candidate rankings stored directly in **Supabase** for immediate employer review.

---

## Tech Stack

**Frontend:** React, Tailwind CSS, Vite
**Backend:** Node.js, Express
**Database & Auth:** Supabase (PostgreSQL)
**Cloud Infrastructure:** Render (Backend), Vercel (Frontend)

---

## Project Structure

```
Strata
│
├── server/                 # Express Backend API & AI Processing Engine
│
├── src/                    # React Frontend Client
│   ├── assets/             # Images, icons, and static media
│   ├── components/         # Reusable UI components
│   ├── context/            # React state context providers
│   ├── layouts/            # Page shell layouts
│   ├── pages/              # Application views (Dashboard, Jobs, Profile)
│   ├── services/           # API clients and backend integration
│   ├── styles/             # Global CSS & styling configurations
│   └── utils/              # Client-side helper functions
│
├── .env                    # Local environment secrets & API keys
├── index.html              # Frontend entry document
├── package.json            # Root project dependencies & scripts
└── vite.config.js          # Vite build configuration

```

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/makigtawn/strata.git
cd strata

```

### 2. Configure Environment Variables

Create a `.env` file in the root directory and populate it with your API keys and configuration:

```env
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_google_gemini_api_key
OPENAI_API_KEY=your_openai_api_key

```

### 3. Database Initialization

Before launching the app, apply the required structural schema to your Supabase instance by running the migration script found in your migrations path:

```bash
# Apply migration to set up the authentication rules and ranking engine schema
supabase db push

```

*(Alternatively, copy and run the contents of `supabase/migrations/202606110001_auth_ranking.sql` directly into the Supabase SQL Editor).*

### 4. Install Dependencies & Run

Install all project modules from the root:

```bash
npm install or npm install --legacy-peer-deps

```

To start the backend API server:

```bash
npm run dev:api

```

To start the frontend developer environment:

```bash
npm run dev

```

* **Frontend Client:** `http://localhost:5173`
* **Backend API:** `http://localhost:3000`

---

## Author/Developer

**Meklit Girmaw**
