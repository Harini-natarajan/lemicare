import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const ROLE_DASHBOARD = {
  doctor: '/doctor/dashboard',
  receptionist: '/reception/dashboard',
  pharmacist: '/pharmacy/dashboard',
  patient: '/patient/dashboard',
};

const NavItem = ({ to, icon, label, active }) => (
  <Link
    to={to}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '11px 16px',
      borderRadius: '10px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: active ? 600 : 500,
      color: active ? '#fff' : 'rgba(255,255,255,0.65)',
      background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
      transition: 'all 0.15s',
    }}
    className={!active ? 'sidebar-link' : ''}
  >
    <span style={{ opacity: active ? 1 : 0.8 }}>{icon}</span>
    {label}
  </Link>
);

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const role = user?.role || 'patient';
  const path = location.pathname;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <div style={{
      width: '240px',
      flexShrink: 0,
      background: 'linear-gradient(180deg, #0f766e 0%, #0369a1 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', paddingLeft: '4px', textDecoration: 'none' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '9px',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
          </svg>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>LemiCare</p>
          <p style={{ margin: 0, fontSize: '10px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>Portal</p>
        </div>
      </Link>

      {/* User Card */}
      <div style={{
        background: 'rgba(255,255,255,0.12)',
        borderRadius: '12px',
        padding: '14px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', fontWeight: 700, color: '#fff', flexShrink: 0,
        }}>
          {initials}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.name || 'User'}
          </p>
          <p style={{ margin: '1px 0 0', fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'capitalize' }}>
            {role}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
        <NavItem to={ROLE_DASHBOARD[role] || '/patient/dashboard'} active={path === ROLE_DASHBOARD[role]} label="Dashboard" icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        } />
        <NavItem to="/profile" active={path === '/profile'} label="Profile" icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        } />
        {(role === 'patient' || role === 'receptionist' || role === 'doctor') && (
          <NavItem to="/appointments" active={path === '/appointments'} label="Appointments" icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          } />
        )}
        {(role === 'patient' || role === 'receptionist' || role === 'pharmacist') && (
          <NavItem to="/bills" active={path === '/bills'} label="Bills" icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          } />
        )}
        {(role === 'patient' || role === 'doctor' || role === 'pharmacist') && (
          <NavItem to="/prescriptions" active={path === '/prescriptions'} label="Prescriptions" icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
          } />
        )}
        {role === 'pharmacist' && (
          <NavItem to="/pharmacy" active={path === '/pharmacy'} label="Pharmacy" icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          } />
        )}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '11px 16px', borderRadius: '10px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500,
          cursor: 'pointer', width: '100%', textAlign: 'left', marginTop: '8px',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Logout
      </button>

      <style>{`
        .sidebar-link:hover {
          background: rgba(255,255,255,0.1) !important;
          color: rgba(255,255,255,0.9) !important;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;