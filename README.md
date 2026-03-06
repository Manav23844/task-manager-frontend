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

