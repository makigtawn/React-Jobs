# React Jobs – Job Platform Web App

## Overview

React Jobs is a full-stack job platform built with the MERN stack. It allows employers to post and manage job listings while developers (job seekers) can browse, view, and apply for jobs. The system is designed with scalability, clean architecture, and role-based functionality in mind.

---

## Features

### For Developers (Job Seekers)

* Browse available job listings
* View detailed job descriptions
* Search and filter jobs
* Apply for jobs (if implemented)

### For Employers

* Add new job postings
* Edit existing jobs
* Delete job listings
* Manage job visibility

### General

* Responsive UI (works on desktop and mobile)
* Role-based views (Employer vs Developer)
* Clean and structured component architecture

---

## Tech Stack

### Frontend

* React
* Tailwind CSS
* React Router

### Backend

* supabase database
* postgre
---

## Project Structure

```
react-jobs/
│
├── src/             
│   └── asset/
│       ├── components/
│       ├── pages/
│       └── layouts/
|       └── assets/
|
└── README.md
```

---

## Installation & Setup

### 1. Clone the Repository

```
git clone <your-repo-link>
cd react-jobs
```

### 2. Install Dependencies

#### Client

```
cd client
npm install
```

#### Server

```
cd server
npm install
```

---

## Running the App

### Start Backend API

```
npm run dev:api
```

### Start Frontend

```
npm run dev
```

App will run on:

```
http://localhost:5173
```

The backend API runs on:

```
http://localhost:3000
```

Required environment variables are listed in `.env.example`. Apply
`supabase/migrations/202606110001_auth_ranking.sql` to your Supabase project
before using candidate ranking.

---

## Key Concepts Used

* Component-based architecture
* State management using React hooks
* RESTful API design
* CRUD operations
* Separation of concerns (frontend vs backend)
* Role-based UI rendering
* Supabase Auth session persistence
* AI-assisted resume and GitHub scoring

---

## Future Improvements

* Authorization (Role-based access)
* Job application tracking system
* Notifications system
* Offline/PWA support
* Advanced filtering and recommendations

---

## Author

Meklit Girmaw

---
