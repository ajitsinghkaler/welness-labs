# Employee Pulse Application - Product Requirements Document

## Problem Statement
Organizations lack an efficient way to gather regular feedback from employees about their work experience, engagement, and satisfaction. Traditional annual surveys are too infrequent to capture real-time sentiment and address issues promptly.

## Target Users
1. **Employees**
   - Regular staff members who will provide feedback
   - All departments and levels within the organization

2. **Administrators**
   - HR personnel
   - Team managers
   - Organization leaders

## Key Features

### Employee Portal
1. Authentication
   - Email-based registration
   - Secure login system
   - Password recovery (optional)

2. Survey Management
   - View and complete pulse surveys
   - Submit text-based responses
   - View historical survey submissions (optional)

### Admin Portal
1. Authentication
   - Secure admin login
   - Role-based access control

2. Response Management
   - View all survey responses
   - Export responses in CSV/JSON format
   - Basic analytics dashboard

## API Endpoints

### Authentication
- POST /register - Register new employee
- POST /login - Employee/Admin login

### Survey Management
- GET /survey - Fetch survey questions
- POST /survey/response - Submit survey response
- GET /surveys/history - Get user's survey history

### Admin Operations
- GET /admin/responses - Get all survey responses
- GET /admin/export - Export survey data (CSV/JSON)

## Tech Stack

### Frontend
- React.js with TypeScript
- Material-UI for components
- Axios for API calls
- React Router for navigation

### Backend
- NestJS (TypeScript)
- MongoDB for data storage
- JWT for authentication
- Class-validator for input validation

### Development Tools
- Git for version control
- ESLint/Prettier for code formatting
- Jest for testing
- Docker for containerization 