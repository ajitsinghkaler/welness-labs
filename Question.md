Employee Pulse Application - Technical Assessment
Objective
The goal of this assignment is to evaluate your ability to define a Product Requirement
Document (PRD) and build a simple but functional Employee Pulse Application
with TypeScript, MongoDB, and Node/NestJS.

Assignment Tasks
1. Write a Simple PRD
• Research basic features of employee pulse survey applications.
• Create a one-page PRD that includes:
• Problem Statement
• Target Users
• Key Features (Employee & Admin Portals)
• Basic API Endpoints
• Tech Stack
2. Build the Application
Develop a simple Employee Pulse Application with the following features: (NOTE,
Please use AI tools to develop a high quality UI and Code as per the standards)
Employee Portal (Basic App)
• Login/Register (no need for OAuth, simple email authentication is
fine).
• Take a Pulse Survey (Submit responses as text message).
• View past surveys (optional).
Admin Portal (Basic Admin Dashboard)
• Login as Admin.

• View all survey responses.
• Export survey data (CSV or JSON).
3. Backend Requirements
• Use NestJS (TypeScript) for the backend.
• Use MongoDB for storing survey responses.
• Basic API Endpoints:
• POST /register → Register Employee
• POST /login → Employee/Admin Login
• GET /survey → Fetch survey questions
• POST /survey/response → Submit employee response
• GET /admin/responses → Admin view of all responses
4. Deliverables
• PRD Document (One-page PDF/Markdown).
• GitHub Repository with:
• Backend code (Node/NestJS, MongoDB, TypeScript).
• Minimal UI (Optional, simple React or HTML).
• README with setup instructions.