# Employee Pulse Application

A modern employee feedback collection system built with React, NestJS, and MongoDB. The application allows organizations to gather daily feedback from employees and provides administrators with tools to manage and analyze responses.

## Features

- **Employee Features**
  - Secure authentication (login/register)
  - Answer daily survey questions
  - View personal survey history
  - Simple, intuitive user interface

- **Admin Features**
  - Role-based access control
  - Create and manage daily survey questions
  - View all employee responses
  - Export responses to CSV format
  - Add and remove admin users

## Tech Stack

### Frontend
- React 19 with TypeScript
- React Router for navigation
- React Query for data fetching
- Context API for state management
- Tailwind CSS for styling

### Backend
- NestJS with TypeScript
- MongoDB with Mongoose
- JWT authentication
- Class-validator for input validation

### DevOps
- Docker and Docker Compose for containerization
- Environment-based configuration

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)
- MongoDB (v6 or higher, only if running without Docker)

## Project Structure

```
employee-app/
├── backend/           # NestJS backend application
│   ├── src/           # Source code
│   ├── Dockerfile     # Backend container definition
│   └── ...
├── frontend/          # React frontend application
│   ├── src/           # Source code
│   ├── Dockerfile     # Frontend container definition
│   └── ...
├── docker-compose.yml # Docker compose configuration
├── README.md          # Project documentation
└── PRD.md             # Product Requirements Document
```

## Setup Instructions

### Running with Docker (Recommended)

The easiest way to run the application is using Docker Compose:

1. Clone the repository
2. Start the application:
   ```bash
   docker-compose up
   ```
3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

### Manual Setup

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   MONGODB_URI=mongodb://localhost:27017/employee-pulse
   JWT_SECRET=your-secret-key
   PORT=3001
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   VITE_API_URL=http://localhost:3001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /auth/login` - User/admin login
- `POST /auth/register` - Register new employee

### Survey Management (Employee)
- `GET /surveys` - Fetch today's survey question
- `POST /surveys/response` - Submit survey response
- `GET /surveys/history` - Get user's survey history

### Admin Operations
- `POST /admin/question` - Set today's question
- `GET /admin/responses` - Get all survey responses
- `GET /admin/users` - Get all admin users
- `POST /admin/users` - Create an admin user
- `DELETE /admin/users/:id` - Remove an admin user

## Development Commands

### Backend

```bash
# Run development server
npm run start:dev

# Build for production
npm run build

# Run production build
npm run start:prod

# Run linting
npm run lint

# Run tests
npm run test
```

### Frontend

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Default Admin Account

A default admin account is automatically created during the first run of the application if no admin users exist in the database:

- **Email**: admin@admin.com
- **Password**: admin@1234

For security reasons, it is highly recommended to create a new user and delete the default admin account after the first login.
