# Employee Pulse Application - Product Requirements Document (Enhanced)

## Problem Statement
Organizations lack an efficient method for gathering frequent and actionable feedback from employees. Annual surveys do not capture real-time sentiments effectively, hindering timely interventions. The Employee Pulse Application addresses this by enabling continuous daily feedback.

## Target Users

### Employees
- Regular staff across all departments
- Users looking for a simple way to communicate their daily experiences and concerns

### Administrators
- HR professionals managing surveys
- Managers and organizational leaders requiring employee insights

## Key Features (with Priority)

### Employee Portal
- **Authentication System (Must-Have)**
  - Secure email-based registration/login
  - JWT authentication for protected routes
  - Role-based access control (Employee/Admin)

- **Survey Response System (Must-Have)**
  - Daily survey question display
  - Submit text-based responses
  - Intuitive user interface

- **Survey History (Nice-to-Have)**
  - View past survey responses

### Admin Portal
- **Authentication and Access Management (Must-Have)**
  - Secure admin login
  - Role-based access to admin-only features

- **Survey Management (Must-Have)**
  - Create/set daily survey questions
  - View employee survey responses
  - Export responses (CSV/JSON)
  - View history of previous daily questions

- **Admin User Management (Nice-to-Have)**
  - Add or remove administrator accounts

## Technical Requirements

### Frontend
- React with TypeScript
- React Router, React Query
- Context API for global auth state
- Responsive design using Tailwind CSS
- Component-based architecture

### Backend
- NestJS (TypeScript)
- MongoDB with Mongoose
- JWT for secure authentication
- RESTful APIs
- Class-validator for input validation

### API Endpoints

#### Authentication
- `POST /auth/login` – Login for User/Admin
- `POST /auth/register` – Register Employee

#### Survey Management (Employee)
- `GET /surveys` – Today's survey question
- `POST /surveys/response` – Submit response
- `GET /surveys/history` – Employee's survey history

#### Admin Operations
- `POST /admin/question` – Set daily question
- `GET /admin/responses` – View all responses
- `GET /admin/users` – View all admin users
- `POST /admin/users` – Create new admin
- `DELETE /admin/users/:id` – Delete admin
- `GET /admin/questions` – View history of daily questions

## Data Models (Explicit)

#### User
- `email` (string, required, unique)
- `password` (string, hashed, required)
- `role` (string, required, default: 'employee')
- `name` (string, required)
- `createdAt` (Date, default: current timestamp)

#### Survey Response
- `userId` (ObjectId, reference to User, required)
- `response` (string, required)
- `submittedAt` (Date, default: current timestamp)
- `question` (string, required)

#### Daily Question
- `question` (string, required)
- `createdAt` (Date, default: current timestamp)
- `isActive` (boolean, default: true)

## Non-Functional Requirements

### Security
- JWT authentication
- Secure password hashing (bcrypt)
- Protected endpoints
- Comprehensive input validation

### Performance
- API response time under 300ms
- Efficient querying and caching
- Optimized frontend data fetching

### Scalability
- Docker containerization
- Horizontal scaling support
- Database query optimization

### Usability
- Clear and intuitive UI
- Responsive across devices
- Accessible UX patterns

## Deployment Details
- Docker-based container deployment
- Cloud-hosted solution (AWS/Azure/GCP)
- Continuous Integration and Deployment (CI/CD) pipeline

## Assumptions & Constraints
- Initially supporting up to 500 daily active users
- Minimal budget constraints
- Initial focus on core functionality (Phase 1)

## Implementation Phases (Clearly Defined)

### Phase 1: Core Functionality
- Authentication (Login/Register)
- Daily survey question display
- Response submission
- Basic Admin question management

### Phase 2: Enhanced Features
- Survey response history
- Admin dashboard enhancements
- Admin user management
- Export functionalities
- Daily questions history view

## Success Metrics (Explicit KPIs)
- Employee participation rate (>80%, tracked via analytics)
- Response length and detail (average text length)
- Admin satisfaction (interviews)
- System uptime (99.9% availability)

## UI Mockups/Wireframes (Optional)
- Recommended but not mandatory for initial phase
- Basic mockups encouraged for clarity in future phases

