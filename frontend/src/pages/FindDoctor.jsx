import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const FindDoctor = () => {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", width: '100vw', overflowX: 'hidden', background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PublicNavbar />
      <section style={{ padding: '80px', display: 'flex', justifyContent: 'center', flex: 1 }}>
        <div style={{ width: '100%', maxWidth: '800px', padding: '40px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#fff', borderRadius: '24px', boxShadow: '0 20px 40px rgba(15,23,42,0.2)', height: 'fit-content' }}>
          <h3 style={{ fontSize: '32px', fontFamily: "'Georgia', serif", marginBottom: '20px', textAlign: 'center' }}>Find a Specialist</h3>
          <p style={{ color: '#94a3b8', marginBottom: '40px', lineHeight: 1.6, textAlign: 'center' }}>Our directory helps you quickly locate the right medical professional for your specific health needs.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <input type="text" placeholder="Search by name or specialty..." style={{ flex: 1, padding: '16px 24px', borderRadius: '8px', border: 'none', outline: 'none', fontSize: '16px' }} />
            <button className="hover:bg-blue-600 transition-colors" style={{ padding: '0 32px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '16px' }}>Search</button>
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
};

export default FindDoctor;
