# GOODWORK — Technical Documentation

This document describes the architecture, implementation details, and developer guidance for the GOODWORK project (backend + frontend). It is intended for contributors, engineers onboarding to the project, and maintainers.

## Architecture Overview

- Backend: Node.js + Express REST API with MongoDB (Mongoose).
- Frontend: React SPA built with Vite.
- Communication: JSON over HTTP/HTTPS. Protected routes require a JWT in `Authorization: Bearer <token>`.

## Repository Layout

- `BACKEND/`
  - `src/app.js` — Express app setup, CORS configuration, and route registration.
  - `src/server.js` — Server entry point and port listener.
  - `src/config/db.js` — Mongoose connection.
  - `src/controllers/` — Auth and job controllers.
  - `src/middlewares/authMiddleware.js` — JWT validation middleware.
  - `src/models/` — Mongoose schemas (`User.js`, `Job.js`).
  - `src/routes/` — Route definitions for auth and jobs.
- `FRONTEND/`
  - `src/main.jsx` — React entry point.
  - `src/App.jsx` — App layout and routes.
  - `src/pages/` — Pages: `Home`, `Login`, `Register`, `PostJob`, `EditJob`.
  - `src/components/` — Reusable UI components (`Navbar`, `JobCard`).
  - `src/api/` — API helper modules (e.g., `jobs.js`).

## Tech Stack & Key Dependencies

- Backend: `express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `dotenv`, `cors`.
- Frontend: `react`, `react-dom`, `vite`, `react-router-dom`, `axios`, `tailwindcss`.
- Dev tooling: `nodemon`, ESLint.

## Data Models (Actual Schemas)

### User

Fields:
- `fullname` (String, required)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `role` (String, enum: `jobseeker`, `employer`, default `jobseeker`)
- `skills` (Array of String)
- `createdAt` (Date, default now)

### Job

Fields:
- `title` (String, required)
- `description` (String, required)
- `company` (String, required)
- `location` (String, required)
- `salary` (Number, optional)
- `type` (String, enum: `full-time`, `part-time`, `contract`, `internship`, default `full-time`)
- `registrationDeadline` (Date, required)
- `verificationLink` (String, required)
- `requirements` (Array of String)
- `benefits` (Array of String)
- `employerId` (ObjectId ref `User`, required)
- `status` (String, enum: `open`, `closed`, default `open`)
- `createdAt` (Date, default now)

Indexes and virtuals:
- Unique index on `{ title, company, employerId }` to prevent duplicates by the same employer.
- Virtual `isExpired` returns `true` when current date is past `registrationDeadline`.

## Authentication Flow

1. User registers via `POST /api/auth/register` with `fullname`, `email`, `password`, `role`.
2. Backend hashes the password with `bcryptjs` and saves the user.
3. Backend returns a signed JWT containing `{ id, role }` (expires in 1 day).
4. User logs in via `POST /api/auth/login` and receives a JWT.
5. Frontend stores the token and attaches it to protected requests.
6. `authMiddleware` verifies the token and populates `req.user`.

## API Reference (High-Level)

Auth:
- `POST /api/auth/register` — create user and return JWT + user info.
- `POST /api/auth/login` — authenticate and return JWT + user info.

Jobs:
- `GET /api/jobs` — list all jobs (public).
- `GET /api/jobs/:id` — get job detail (public).
- `POST /api/jobs` — create job (protected; employer only).
- `PUT /api/jobs/:id` — update job (protected; owner only).
- `DELETE /api/jobs/:id` — delete job (protected; owner only).

## Validation & Error Handling

- Auth:
  - Duplicate email returns `400`.
  - Invalid credentials return `400`.
- Jobs:
  - Only employers can create jobs (`403`).
  - `registrationDeadline` must be in the future (`400`).
  - `verificationLink` must match a basic URL pattern (`400`).
  - Duplicate jobs (same title + company + employer) are rejected (`400`).
  - Non-owners cannot update/delete (`403`).

## Security Notes

- JWT is required for protected routes.
- CORS is restricted to:
  - `https://goodwork-nine.vercel.app`
  - `http://localhost:3000`
  - `http://localhost:5173`
  - Any `*.vercel.app` origin is allowed for previews.

## Environment Variables

Backend (`BACKEND/.env`):
- `MONGO_URI`
- `JWT_SECRET`
- `PORT` (optional)

Frontend (`FRONTEND/.env`):
- `VITE_API_URL` (e.g., `http://localhost:5000/api`)

## Local Development

Backend:
```powershell
cd BACKEND
npm install
npm run dev
```

Frontend:
```powershell
cd FRONTEND
npm install
npm run dev
```

## Testing & Linting

- Frontend linting: `npm run lint` in `FRONTEND/`.
- Backend tests: currently not implemented (see roadmap).

## Deployment Notes

- Frontend is deployed on Vercel and the backend on Render.
- Ensure environment variables are configured on the hosting platforms.
- Backend must allow the frontend origin via CORS.

## Roadmap (V2)

- Add in-app applications so candidates can apply directly on GOODWORK.
- Add search, filters, pagination, and role-based access control.
- Add automated tests and CI gates.
