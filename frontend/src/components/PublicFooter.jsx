import React from 'react';
import { Link } from 'react-router-dom';

const PublicFooter = () => {
  return (
    <footer className="px-6 md:px-20 py-16 md:py-24 bg-[#0f172a] text-slate-300 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 max-w-[1200px] mx-auto mb-16">
        <div>
          <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>LemiCare Hospital</h4>
          <p style={{ margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '12px' }}><span>📍</span> Medical College Road, Kochin</p>
          <p style={{ margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '12px' }}><span>📞</span> +91 98765 43210</p>
          <p style={{ margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '12px' }}><span>✉️</span> info@lemicare.com</p>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link to="/about" style={{ color: '#cbd5e1', textDecoration: 'none' }} className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/departments" style={{ color: '#cbd5e1', textDecoration: 'none' }} className="hover:text-white transition-colors">Departments</Link></li>
            <li><Link to="/find-doctor" style={{ color: '#cbd5e1', textDecoration: 'none' }} className="hover:text-white transition-colors">Find a Doctor</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Emergency</h4>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '20px', borderRadius: '12px' }}>
            <p style={{ color: '#fca5a5', margin: '0 0 8px 0', fontWeight: 600 }}>24/7 Emergency Ward</p>
            <h2 style={{ color: '#fff', margin: 0, fontSize: '28px' }}>1055</h2>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', textAlign: 'center', fontSize: '14px', color: '#cbd5e1' }}>
        &copy; {new Date().getFullYear()} LemiCare Hospital. All rights reserved.
      </div>
    </footer>
  );
};

export default PublicFooter;
