# Employee Pulse Application

A modern employee feedback collection system built with NestJS, React, and MongoDB.

## Features

- Employee authentication and registration
- Pulse survey submission
- Admin dashboard for survey management
- Data export functionality
- Responsive UI design

## Tech Stack

- **Frontend**: React.js, TypeScript, Material-UI
- **Backend**: NestJS, TypeScript
- **Database**: MongoDB
- **Authentication**: JWT

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Project Structure

```
employee-app/
├── backend/           # NestJS backend
├── frontend/          # React frontend
├── docker/            # Docker configuration
├── README.md         # Project documentation
└── PRD.md           # Product Requirements Document
```

## Setup Instructions

### Backend Setup

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
   PORT=3000
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

### Frontend Setup

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
   REACT_APP_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Running with Docker

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## API Documentation

### Authentication Endpoints

- `POST /register` - Register new employee
- `POST /login` - Employee/Admin login

### Survey Endpoints

- `GET /survey` - Fetch survey questions
- `POST /survey/response` - Submit survey response
- `GET /surveys/history` - Get user's survey history

### Admin Endpoints

- `GET /admin/responses` - Get all survey responses
- `GET /admin/export` - Export survey data

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 