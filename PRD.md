# Employee Pulse Application - Product Requirements Document

## Problem Statement
Organizations lack an efficient way to gather regular feedback from employees about their work experience, engagement, and satisfaction. Traditional annual surveys are too infrequent to capture real-time sentiment and address issues promptly. The Employee Pulse Application provides a solution by enabling daily check-ins and continuous feedback collection.

## Target Users

### 1. Employees
- Regular staff members who provide daily feedback
- All departments and levels within the organization
- Users seeking a simple, efficient way to share thoughts and concerns

### 2. Administrators
- HR personnel who manage survey questions and review responses
- Team managers who need insights into team sentiment
- Organization leaders who make decisions based on feedback data

## Key Features

### Employee Portal
1. **Authentication System**
   - Secure email-based registration and login
   - JWT-based authentication for protected routes
   - Role-based access control (employee vs admin)

2. **Survey Response System**
   - View and answer daily survey questions
   - Submit detailed text-based responses
   - Access personal survey submission history
   - Simple, intuitive user interface

### Admin Portal
1. **Authentication and User Management**
   - Secure admin login with protected routes
   - Role-based access control with admin-only features
   - Add and remove administrator accounts

2. **Survey Management**
   - Create and set daily questions for all employees
   - View all employee survey responses
   - Export responses to CSV format for further analysis
   - Filter and sort response data

## Technical Requirements

### Frontend
- React with TypeScript for type safety
- React Router for navigation between pages
- React Query for efficient data fetching and caching
- Context API for global state management (auth)
- Responsive design with Tailwind CSS
- Component-based architecture

### Backend
- NestJS framework with TypeScript
- MongoDB database for data storage
- JWT for secure authentication
- Mongoose for database schema modeling
- RESTful API endpoints
- Input validation using class-validator

### API Endpoints

#### Authentication
- `POST /auth/login` - User/Admin login
- `POST /auth/register` - Register new employee

#### Survey Management (Employee)
- `GET /surveys` - Fetch today's survey question
- `POST /surveys/response` - Submit survey response
- `GET /surveys/history` - Get user's survey history

#### Admin Operations
- `POST /admin/question` - Set today's question
- `GET /surveys/admin/responses` - Get all survey responses
- `GET /admin/users` - Get all admin users
- `POST /admin/users` - Create an admin user
- `DELETE /admin/users/:id` - Remove an admin user

### Data Models

#### User
- id: unique identifier
- name: user's full name
- email: user's email address
- password: hashed password
- role: user role (admin or employee)

#### Survey Response
- id: unique identifier
- user: reference to user who submitted
- question: the survey question text
- response: user's response text
- submittedAt: timestamp of submission

#### Daily Question
- id: unique identifier
- question: the daily question text
- createdAt: timestamp when question was created
- active: boolean indicating if question is active

## Non-Functional Requirements

1. **Security**
   - Secure authentication with JWT
   - Password hashing
   - Protected API endpoints
   - Input validation

2. **Performance**
   - Quick page load times
   - Efficient API responses
   - Optimized data fetching with React Query

3. **Scalability**
   - Container-based deployment with Docker
   - Horizontal scaling capabilities
   - Efficient database queries

4. **Usability**
   - Intuitive UI/UX design
   - Responsive layout for all devices
   - Clear feedback for user actions
   - Accessible design patterns

## Implementation Phases

### Phase 1: Core Functionality
- User authentication (login/register)
- Basic employee survey question display
- Survey response submission
- Admin question creation

### Phase 2: Enhanced Features
- Survey history for employees
- Admin dashboard with response management
- Admin user management
- Data export functionality

### Phase 3: Advanced Features (Future)
- Analytics dashboard with visualizations
- Team-based survey responses
- Survey templates and scheduling
- Notification system for new questions

## Success Metrics
- Employee participation rate (>80% target)
- Response quality and length
- Admin satisfaction with insights
- System performance and reliability
- User experience feedback