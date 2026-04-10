import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const Hospitals = () => {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", width: '100vw', overflowX: 'hidden', background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PublicNavbar />
      <section style={{ padding: '80px', display: 'flex', justifyContent: 'center', flex: 1 }}>
        <div style={{ width: '100%', maxWidth: '800px', padding: '60px', background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', height: 'fit-content' }}>
          <h3 style={{ fontSize: '32px', fontFamily: "'Georgia', serif", marginBottom: '30px', textAlign: 'center' }}>Our Network Hospitals</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '18px', color: '#333', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <span style={{ fontSize: '24px' }}>📍</span> LemiCare Main Hospital, Kochi
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '18px', color: '#333', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <span style={{ fontSize: '24px' }}>📍</span> LemiCare City Center, Trivandrum
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '18px', color: '#333', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <span style={{ fontSize: '24px' }}>📍</span> LemiCare Specialty Clinic, Calicut
            </li>
          </ul>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
};

export default Hospitals;
