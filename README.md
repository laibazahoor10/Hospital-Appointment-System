# Hospital Appointment Management System

A full-stack web application for managing hospital appointments with 
role-based access control for Admin and Staff users.

## Features
- **Role-Based Auth** — Separate Admin and Staff roles with JWT-protected routes
- **Admin Dashboard** — Live statistics showing total, confirmed, pending, and cancelled appointments
- **User Management** — Admin can add and manage staff/admin accounts
- **Appointment Tracking** — Staff can create appointments and view full history
- **Secure Auth** — JWT authentication with bcrypt.js password hashing

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router, Material UI (MUI) |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose ODM |
| Auth | JWT, bcrypt.js |

## Project Structure
Hospital_System/

├── frontend/    # React.js client

└── backend/     # Node.js + Express API

## Getting Started

**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```
