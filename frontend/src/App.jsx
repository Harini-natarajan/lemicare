import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider }       from './utils/AuthContext';
import Login                  from './pages/Login';
import Register               from './pages/Register';
import RoleRedirect           from './pages/RoleRedirect';
import Landing              from './pages/Landing';
import About                from './pages/About';
import Departments          from './pages/Departments';
import FindDoctor           from './pages/FindDoctor';
import Hospitals            from './pages/Hospitals';
import International        from './pages/International';
import Contact              from './pages/Contact';

import AccessDenied           from './pages/AccessDenied';
import PatientDashboard       from './pages/PatientDashboard';
import DoctorDashboard        from './pages/DoctorDashboard';
import ReceptionDashboard     from './pages/ReceptionDashboard';
import PharmacyDashboard      from './pages/PharmacyDashboard';
import Profile                from './pages/Profile';
import Appointments           from './pages/Appointments';
import Bills                  from './pages/Bills';
import Prescriptions          from './pages/Prescriptions';
import Pharmacy               from './pages/Pharmacy';
import ProtectedRoute         from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* Public facing Pages */}
            <Route path="/"             element={<Landing />} />
            <Route path="/about"        element={<About />} />
            <Route path="/departments"  element={<Departments />} />
            <Route path="/find-doctor"  element={<FindDoctor />} />
            <Route path="/contact"      element={<Contact />} />

            {/* Auth */}
            <Route path="/login"        element={<Login />} />
            <Route path="/register"     element={<Register />} />
            <Route path="/auth-callback" element={<RoleRedirect />} />

            {/* Role dashboards */}
            <Route path="/patient/dashboard"   element={<ProtectedRoute roles={['patient']}><PatientDashboard /></ProtectedRoute>} />
            <Route path="/doctor/dashboard"    element={<ProtectedRoute roles={['doctor']}><DoctorDashboard /></ProtectedRoute>} />
            <Route path="/reception/dashboard" element={<ProtectedRoute roles={['receptionist']}><ReceptionDashboard /></ProtectedRoute>} />
            <Route path="/pharmacy/dashboard"  element={<ProtectedRoute roles={['pharmacist']}><PharmacyDashboard /></ProtectedRoute>} />

            {/* Shared pages */}
            <Route path="/profile"       element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/appointments"  element={<ProtectedRoute roles={['patient','doctor','receptionist']}><Appointments /></ProtectedRoute>} />
            <Route path="/bills"         element={<ProtectedRoute roles={['patient','receptionist','pharmacist']}><Bills /></ProtectedRoute>} />
            <Route path="/prescriptions" element={<ProtectedRoute roles={['patient','doctor','pharmacist']}><Prescriptions /></ProtectedRoute>} />
            <Route path="/pharmacy"      element={<ProtectedRoute roles={['pharmacist']}><Pharmacy /></ProtectedRoute>} />

            <Route path="/access-denied" element={<AccessDenied />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;