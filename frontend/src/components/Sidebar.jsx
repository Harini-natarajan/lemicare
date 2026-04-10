import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', path: `/${user?.role || 'patient'}/dashboard` },
    { name: 'Appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z', path: '/appointments' },
    { name: 'Prescriptions', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z', path: '/prescriptions' },
    { name: 'Invoices', icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2', path: '/bills' },
    { name: 'Profile Settings', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', path: '/profile' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[60] lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside 
        className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-100 z-[70] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-6">
          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-200">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight m-0 leading-tight">LemiCare</h1>
              <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest m-0 leading-tight mt-0.5">Patient Portal</p>
            </div>
            
            {/* Mobile Close Button */}
            <button 
              onClick={onClose}
              className="ml-auto lg:hidden p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-1.5">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300
                  ${isActive 
                    ? 'bg-teal-50 text-teal-700 shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }
                `}
              >
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                  className="transition-colors"
                >
                  <path d={item.icon} />
                </svg>
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Profile Section */}
          <div className="mt-auto pt-6 border-t border-slate-50">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border-2 border-white shadow-sm">
                {user?.name?.[0] || 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate m-0">{user?.name || 'Patient'}</p>
                <p className="text-[11px] text-slate-400 font-medium truncate m-0">{user?.email || 'patient@email.com'}</p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
