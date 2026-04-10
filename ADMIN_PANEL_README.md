# Clinic Admin Panel

Complete admin panel extension for the Clinic Management System.

## Features Added

### Backend Extensions
- **User Model**: Added 'admin' role
- **Bill Model**: Enhanced with detailed items, discounts, taxes
- **Medicine Model**: Added brand, batch, expiry, min stock level
- **New Models**: Visit, Invoice
- **Controllers**: Admin, User, Invoice, Report
- **Routes**: Admin dashboard, user management, reports
- **Middleware**: Role-based access for admin functions

### Frontend Extensions
- **Admin Routes**: Protected admin panel routes
- **Pages**: AdminDashboard, UserManagement, PatientList, BillingPage, InventoryPage, ReportsPage
- **Sidebar**: Admin navigation menu
- **Components**: Enhanced with admin features

## API Endpoints Added

### Admin
- `GET /api/admin/dashboard` - Dashboard stats and alerts
- `GET /api/admin/alerts` - System alerts

### Users
- `GET /api/users` - List all users (admin only)
- `POST /api/users` - Create user (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Invoices
- `POST /api/invoices/generate` - Generate invoice from bill
- `GET /api/invoices` - List invoices

### Reports
- `GET /api/reports/revenue` - Revenue reports
- `GET /api/reports/doctor-billing` - Doctor-wise billing
- `GET /api/reports/pharmacy-sales` - Pharmacy sales

### Enhanced Pharmacy
- `POST /api/pharmacy/medicines` - Add medicine
- `PUT /api/pharmacy/medicines/:id` - Update medicine
- `DELETE /api/pharmacy/medicines/:id` - Delete medicine

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

2. **Seed Admin User**:
   ```bash
   cd backend
   node seed.js
   ```

3. **Start Servers**:
   ```bash
   # Backend
   npm run dev
   
   # Frontend
   npm run dev
   ```

4. **Access Admin Panel**:
   - Login as admin@example.com / password123
   - Navigate to admin panel via sidebar

## Admin Features

### Dashboard
- Total patients, revenue, pending payments, low stock alerts
- Charts for daily revenue and pharmacy sales
- Alerts for low stock, expiring medicines, pending bills

### User Management
- View all users with roles
- Add new users with role assignment
- Edit user details and roles
- Delete users

### Patient Management
- View all patients
- Search and filter patients
- Patient profile with visit history

### OPD Billing
- Create detailed bills with multiple items
- Apply discounts and taxes per item
- Calculate totals automatically
- Generate invoices

### Inventory Management
- CRUD operations for medicines
- Stock level monitoring
- Low stock alerts
- Batch and expiry tracking

### Reports & Analytics
- Revenue reports (daily/monthly)
- Doctor-wise billing analysis
- Pharmacy sales reports
- Date range filtering

## Security

- JWT authentication required
- Role-based route protection
- Admin-only access to sensitive operations
- Input validation and sanitization

## UI/UX

- Responsive admin panel design
- Color-coded status indicators
- Modal forms for add/edit operations
- Toast notifications for feedback
- Clean, professional interface

## Integration Notes

- Reuses existing auth context and API setup
- Maintains existing user roles and permissions
- Compatible with existing patient and medicine data
- No breaking changes to existing functionality