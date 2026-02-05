# GOODWORK

>A simple job board application (backend + frontend) to post, edit and manage job listings.

## Project Overview

GOODWORK is a full-stack job board application with a Node.js/Express backend and a React + Vite frontend. It provides user authentication and CRUD operations for job postings. The repository contains two main folders:

- `BACKEND/` - Express API, controllers, models, and middleware.
- `FRONTEND/` - React (Vite) single-page application.

## Key Features

- User registration and login (JWT-based authentication).
- Create, read, update, and delete job postings.
- Protected routes for job management.
- Separation of concerns: controllers, routes, models, and middleware.

## Deployment

- Frontend (deployed from a different repo): https://goodwork-teal.vercel.app/
- Backend (deployed from a different repo): https://goodwork.onrender.com/api
- Source repo for deployment: https://github.com/ArcTyXiaN/GOODWORK.git

## Tech Stack

- Backend: Node.js, Express, Mongoose (MongoDB), JWT
- Frontend: React, Vite, Axios (for API calls)
- Dev tools: nodemon (backend dev), Vite dev server (frontend)

## Repository Structure (top-level)

- `BACKEND/`
  - `src/` - source files
    - `app.js`, `server.js` - app/server entry points
    - `config/db.js` - database connection
    - `controllers/` - `authController.js`, `jobController.js`
    - `middlewares/` - `authMiddleware.js`
    - `models/` - `User.js`, `Job.js`
    - `routes/` - `authRoutes.js`
    - `routes/` - `jobRoutes.js`
- `FRONTEND/`
  - `src/` - React app
    - `App.jsx`, `main.jsx`
    - `pages/` - `Home.jsx`, `Login.jsx`, `Register.jsx`, `PostJob.jsx`, `EditJob.jsx`
    - `components/` - `Navbar.jsx`, `JobCard.jsx`
    - `api/` - `jobs.js` (API helpers)

## Environment Variables

Do not commit real secrets. Use local `.env` files and commit only `.env.example`.

- Backend (`BACKEND/.env`)
  - `MONGO_URI` - MongoDB connection string
  - `JWT_SECRET` - secret for signing JWTs
  - `PORT` - backend server port (optional)

- Frontend (`FRONTEND/.env`)
  - `VITE_API_URL` - base URL for the backend API (e.g., `http://localhost:5000/api`)

## Setup & Run (Windows PowerShell)

1. Backend

```powershell
cd c:\Users\Administrator\Documents\Boomerange\GOODWORK\BACKEND
npm install
# For development (if the project has nodemon):
npm run dev
# Or start directly:
node src/server.js
```

2. Frontend

```powershell
cd c:\Users\Administrator\Documents\Boomerange\GOODWORK\FRONTEND
npm install
npm run dev
```

Open the frontend dev server URL (usually `http://localhost:5173` or shown by Vite) and ensure the `VITE_API_URL` points to the backend API.

## API Endpoints (examples)

These are typical endpoints based on project routes - confirm exact paths in `BACKEND/src/routes/`:

- Auth
  - `POST /api/auth/register` - create a new user
  - `POST /api/auth/login` - authenticate and receive a JWT
- Jobs
  - `GET /api/jobs` - list jobs
  - `POST /api/jobs` - create a job (protected)
  - `GET /api/jobs/:id` - get job details
  - `PUT /api/jobs/:id` - update a job (protected)
  - `DELETE /api/jobs/:id` - delete a job (protected)

Use an `Authorization: Bearer <token>` header for protected routes.

## Documentation

- `DOCS/PURPOSE.md` - project purpose, goals, target audience, and roadmap.
- Full project documentation (HackMD): https://hackmd.io/@I5OyzHQDSGWGWqeLjg1tSg/S1dUmq2eZe
- Demo video: `DOCS/goodwork.mp4`
- Presentation: `DOCS/GOODWORK_ Find Your Perfect Role.html`

## Roadmap (V2)

- Allow candidates to apply directly within GOODWORK (in-app applications).
