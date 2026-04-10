import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const International = () => {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", width: '100vw', overflowX: 'hidden', background: '#eff6ff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PublicNavbar />
      <section style={{ padding: '120px 80px', textAlign: 'center', flex: 1 }}>
        <span style={{ fontSize: '64px', display: 'block', marginBottom: '24px' }}>🌍</span>
        <h2 style={{ fontSize: '40px', fontFamily: "'Georgia', serif", color: '#1e293b', marginBottom: '24px' }}>International Patients</h2>
        <p style={{ maxWidth: '800px', margin: '0 auto 40px', color: '#475569', lineHeight: 1.8, fontSize: '18px' }}>
          We provide dedicated comprehensive services for our overseas patients. From visa assistance to language interpreters and airport transfers, we ensure a seamless and comfortable medical journey. Our dedicated international desk is available 24/7 to assist you.
        </p>
        <button className="hover:bg-blue-700 transition-colors" style={{ padding: '16px 40px', background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '18px' }}>
          View International Services
        </button>
      </section>
      <PublicFooter />
    </div>
  );
};

export default International;
