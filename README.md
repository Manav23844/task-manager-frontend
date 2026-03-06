# Task Manager – Frontend Hiring Assignment (React + Vite)

A simple **Task Manager** frontend that integrates with a **User Management + Task Tracker API** using **JWT authentication**. Includes protected routes, responsive UI, validation, error handling, and tests.

## Tech Stack

- **Frontend**: React + Vite, React Router, Axios
- **Styling**: CSS (`src/styles/main.css`)
- **Testing**: Jest + React Testing Library
- **Backend (local dev)**: Express API (included under `backend/`)

## Features Implemented

- **Authentication**: Register + Login
- **JWT auth**: token stored in `localStorage`, automatically attached to API requests
- **Protected routes**: redirects unauthenticated users to login
- **Dashboard**:
  - shows logged-in user info (name/email/role)
  - shows list of tasks (empty state + loading + errors)
- **Task CRUD**: create / edit / delete tasks, status pending/completed
- **Role rules**:
  - normal users see only their tasks
  - admins can access an admin dashboard to view all users and all tasks
- **Quality**: responsive UI + consistent spacing/colors + error handling
- **No hardcoded API URL**: uses `VITE_API_URL`
- **Tests**: minimum 2 component tests + 1 API/integration test

## Project Structure

```
src/
  components/
  pages/
  services/
  styles/
  tests/
tests/
.env.example
README.md
```

## Environment Variables

### Frontend (project root)

Create `./.env` (or copy from `.env.example`):

```env
VITE_API_URL=http://localhost:5001/api
```

### Backend (optional, for local dev)

Create `./backend/.env` (or copy from `backend/.env.example`):

```env
PORT=5001
JWT_SECRET=change-me-in-production
CORS_ORIGIN=http://localhost:5173
ADMIN_EMAILS=admin@example.com
```

- **ADMIN_EMAILS**: comma-separated list of admin emails. If a user registers/logs in with an email listed here, their JWT role is `admin`.

## Setup

Prerequisites:
- **Node.js**: recommended **20.19+** or **22.12+**

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies (only if using the included backend):

```bash
cd backend
npm install
```

## Run the App (Local)

### 1) Start backend API (Terminal 1)

```bash
cd backend
npm run dev
```

API endpoints:
- `GET /api/health`
- `POST /api/register`
- `POST /api/login`
- `GET /api/me` (protected)
- `GET/POST /api/tasks` (protected)
- `GET/PUT/DELETE /api/tasks/:id` (protected)
- `GET /api/admin/users` (admin-only)
- `GET /api/admin/tasks` (admin-only)

### 2) Start frontend (Terminal 2)

```bash
cd ..
npm run dev
```

Open the **Local** URL Vite prints (example: `http://localhost:5173/`).

## Run Tests

```bash
npm test
```

Tests are located in:
- `src/tests/TaskCard.test.jsx` (component test)
- `src/tests/ProtectedRoute.test.jsx` (component test)
- `src/tests/api.test.js` (API/integration test)

## Run Lint

```bash
npm run lint
```

## Screenshots (Submission)

Add screenshots to your submission showing:
- Register page
- Login page
- Dashboard (logged-in user info + task list)
- Create task page
- Edit task page
- Admin dashboard (all users + all tasks)

## Notes

- If you see `EADDRINUSE`, a port is already being used. Stop the existing process (Ctrl+C) or change:
  - `backend/.env` → `PORT=...`
  - root `.env` → `VITE_API_URL=http://localhost:<PORT>/api`
