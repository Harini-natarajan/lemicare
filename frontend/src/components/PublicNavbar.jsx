import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const PublicNavbar = () => {
  const { user } = useAuth();
  
  return (
    <>
      {/* Top Header Bar */}
      <header style={{ borderBottom: '1px solid #e5e7eb', padding: '12px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', position: 'relative', zIndex: 50 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          {/* Icon badge */}
          <div style={{
            background: 'linear-gradient(135deg, #0d9488, #0f766e)',
            width: '44px', height: '44px', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(13,148,136,0.35)',
            flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
            </svg>
          </div>
          {/* Text */}
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{
              fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #0d9488, #0369a1)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Lemi<span style={{ fontWeight: 400 }}>Care</span>
            </span>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '2px' }}>
              Good Health
            </span>
          </div>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px', fontWeight: 600 }}>
          <Link to={user ? `/${user.role || 'patient'}/dashboard` : "/login"} className="hover:text-blue-500 transition-colors" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#003a6c', textDecoration: 'none', fontWeight: 700, fontSize: '15.5px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            {user ? user.name : "Patient Login"}
          </Link>
          
          <Link to="/contact" style={{ border: '1px solid #374151', padding: '10px 24px', borderRadius: '999px', color: '#1f2937', textDecoration: 'none', transition: 'all 0.2s' }} className="hover:bg-gray-100 hover:text-black">
            Booking Assistance
          </Link>
        </div>
      </header>
      
      {/* Main Navigation - Sticky */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 40, background: '#fff', padding: '0 60px', display: 'flex', alignItems: 'center', height: '60px', gap: '40px', fontSize: '15px', color: '#1f2937', borderBottom: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <Link to="/" className="hover:text-blue-600 transition-colors" style={{ textDecoration: 'none', color: '#374151', fontWeight: 600 }}>Home</Link>
        <Link to="/about" className="hover:text-blue-600 transition-colors" style={{ textDecoration: 'none', color: '#374151' }}>About Us</Link>
        <Link to="/find-doctor" className="hover:text-blue-600 transition-colors" style={{ textDecoration: 'none', color: '#374151' }}>Find a Doctor</Link>
        <Link to="/departments" className="hover:text-blue-600 transition-colors" style={{ textDecoration: 'none', color: '#374151' }}>Our Departments</Link>
        <Link to="/contact" className="hover:text-blue-600 transition-colors" style={{ textDecoration: 'none', color: '#374151' }}>Contact Us</Link>
        <Link to="/contact" className="hover:text-blue-600 transition-colors" style={{ textDecoration: 'none', color: '#374151' }}>Call Us</Link>
        
        <div style={{ marginLeft: 'auto', cursor: 'pointer' }} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </div>
      </nav>
    </>
  );
};

export default PublicNavbar;
