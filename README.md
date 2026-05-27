# BookLeaf Support Portal

## Project Overview

BookLeaf Support Portal is a dual-role support and publishing management platform designed for authors and administrators.

- Authors can create and manage support tickets, track ticket status, and view book information.
- Admins can monitor author support workflows, triage tickets, manage books, and review analytics.

This platform supports role-based experiences, secure access control, and a modern SaaS-style interface for both admin and author users.

## Features

- **Authentication**
  - Secure email/password login for authorized users.
  - JWT-based authentication with token persistence.

- **Role-based routing**
  - Author and Admin portals are separated by role.
  - Protected routes prevent unauthorized access.

- **Admin portal**
  - Dashboard analytics and recent ticket feed.
  - Ticket management and ticket detail views.
  - Book management, author management, and workflow controls.

- **Author portal**
  - Ticket listing and ticket creation.
  - Author-specific dashboard and profile management.
  - Access to book information and support conversation threads.

- **Ticket management**
  - Create and view support tickets.
  - Filter tickets by status, priority, and category.

- **Ticket details**
  - Rich ticket detail view with conversation history.
  - Author reply and admin response visibility.

- **Dashboard analytics**
  - Overview metrics for ticket volume, priorities, and ticket status.
  - Recent ticket previews and quick action links.

- **Books management**
  - Book list and author book controls.
  - Book status tracking for published, draft, and review states.

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js
- Express
- MongoDB
- JWT Authentication

## Installation Steps

### Frontend setup

```bash
cd client
npm install
```

### Backend setup

```bash
cd server
npm install
```

### Environment variables

Create environment variable files for both frontend and backend.

#### Backend `.env`

```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=8000
```

#### Frontend `.env` (optional)

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### Running locally

Start the backend server:

```bash
cd server
npm run dev
```

Start the frontend app:

```bash
cd client
npm run dev
```

Open the application in your browser at the URL provided by Vite.

## Available Routes

### Admin routes

- `/admin`
- `/admin/tickets`
- `/admin/tickets/:id`
- `/admin/books`
- `/admin/authors`

### Author routes

- `/author`
- `/author/tickets`
- `/author/tickets/:ticketId`
- `/author/create-ticket`
- `/author/books`
- `/author/profile`

### Auth routes

- `/login`
- `/`

## Demo Credentials

Use these credentials to explore the application locally.

```text
Admin user:
Email: admin2@gmail.com
Password: admin123

Author user:
Email: ishan@gmail.com
Password: 123456
```

> Update these values with seeded or actual test credentials used in your environment.

## Future Improvements

- Add complete ticket reply submission for authors.
- Implement admin ticket assignment and status updates.
- Add author registration and user management flows.
- Improve book management with create/edit/delete flows.
- Add automated tests for frontend and backend.
- Support file attachments and ticket priority rules.
- Add pagination and search across ticket and book lists.
