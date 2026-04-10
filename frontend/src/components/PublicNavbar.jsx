import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const PublicNavbar = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  return (
    <>
      {/* Top Header Bar */}
      <header className="px-4 md:px-10 lg:px-[60px] py-3 flex justify-between items-center bg-white relative z-50 border-b border-gray-200">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          {/* Icon badge */}
          <div style={{
            background: 'linear-gradient(135deg, #0d9488, #0f766e)',
            width: '40px', height: '40px', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(13,148,136,0.35)',
            flexShrink: 0,
          }} className="md:w-[44px] md:h-[44px]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="md:w-[22px] md:h-[22px]">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
            </svg>
          </div>
          {/* Text */}
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{
              fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #0d9488, #0369a1)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }} className="md:text-[22px]">
              Lemi<span style={{ fontWeight: 400 }}>Care</span>
            </span>
            <span style={{ fontSize: '9px', color: '#64748b', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '2px' }} className="md:text-[10px]">
              Good Health
            </span>
          </div>
        </Link>
        
        <div className="flex items-center gap-4 md:gap-6">
          <Link to={user ? `/${user.role || 'patient'}/dashboard` : "/login"} className="hover:text-blue-500 transition-colors hidden sm:flex items-center gap-2 font-bold text-slate-800" style={{ textDecoration: 'none', fontSize: '15.5px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="hidden md:inline">{user ? user.name : "Patient Login"}</span>
            <span className="md:hidden">Login</span>
          </Link>
          
          <Link to="/contact" className="hidden lg:block border border-gray-700 px-6 py-2.5 rounded-full text-gray-800 font-semibold hover:bg-gray-100 transition-all no-underline">
            Booking Assistance
          </Link>

          {/* Hamburger Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-teal-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </header>
      
      {/* Main Navigation - Sticky desktop, Mobile dropdown */}
      <nav className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex absolute lg:sticky top-[65px] lg:top-0 left-0 w-full lg:w-auto flex-col lg:flex-row z-40 bg-white px-6 lg:px-[60px] py-6 lg:py-0 items-start lg:items-center lg:h-[60px] gap-6 lg:gap-10 text-[15px] text-gray-800 border-b border-slate-100 shadow-lg lg:shadow-sm`}>
        <Link to="/" className="hover:text-blue-600 transition-colors font-semibold no-underline text-gray-700">Home</Link>
        <Link to="/about" className="hover:text-blue-600 transition-colors font-semibold no-underline text-gray-700">About Us</Link>
        <Link to="/find-doctor" className="hover:text-blue-600 transition-colors font-semibold no-underline text-gray-700">Find a Doctor</Link>
        <Link to="/departments" className="hover:text-blue-600 transition-colors font-semibold no-underline text-gray-700">Our Departments</Link>
        <Link to="/contact" className="hover:text-blue-600 transition-colors font-semibold no-underline text-gray-700">Contact Us</Link>
        
        <div className="lg:hidden w-full pt-4 border-t border-gray-100 mt-2">
           <Link to={user ? `/${user.role || 'patient'}/dashboard` : "/login"} className="block py-2 text-teal-600 font-bold no-underline">
              {user ? `Dashboard (${user.name})` : "Patient Login"}
           </Link>
        </div>

        <div style={{ marginLeft: 'auto', cursor: 'pointer' }} className="hidden lg:block hover:bg-gray-100 p-2 rounded-full transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </div>
      </nav>
    </>
  );
};

export default PublicNavbar;
