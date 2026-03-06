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

##ScreenShorts 
Register Page
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4c5d8e2b-8803-4d44-b025-89e6ed4ffe88" />
Login Page
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/78601ad2-0428-4b98-b5f9-14ce2aae49de" />
Dashboard
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b901cb7b-031e-4825-9d4d-2af9464e892b" />
Create task
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2fd36b5a-3471-48ca-b019-0743a23f8a88" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d6ba52d2-2283-461e-8422-036f5961b44c" />
Proper FullPage with Dashboard
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ed4299be-a9f9-45a3-9215-f9c441150404" />






