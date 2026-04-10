# Clinic Management System

A complete MERN stack application for clinic management with role-based access.

## Features

- User authentication with JWT
- Role-based access (Patient, Receptionist, Pharmacist, Doctor)
- Appointment booking and management
- Billing and payments
- Pharmacy management
- Prescriptions
- Responsive UI with Tailwind CSS

## Tech Stack

- Frontend: React.js, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create .env file with:
   ```
   MONGO_URI=mongodb://localhost:27017/clinic
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. Start MongoDB service

5. Run the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Patients
- GET /api/patients/profile
- PUT /api/patients/profile
- GET /api/patients (staff only)

### Appointments
- POST /api/appointments
- GET /api/appointments
- PUT /api/appointments/:id

### Prescriptions
- POST /api/prescriptions
- GET /api/prescriptions

### Bills
- POST /api/bills
- GET /api/bills
- PUT /api/bills/:id

### Pharmacy
- GET /api/pharmacy/medicines
- POST /api/pharmacy/bill

## Folder Structure

```
clinic-management/
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
    ├── public/
    └── package.json
```

## Usage

1. Register as a patient or staff member
2. Login with credentials
3. Access features based on role
4. Book appointments, view bills, etc.

## Notes

- This is a basic implementation. Add more validation and error handling as needed.
- For production, use environment variables for secrets and configure CORS properly.
- Add more features like email notifications, payment gateways, etc.