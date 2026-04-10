import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const About = () => {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", width: '100vw', overflowX: 'hidden', background: '#fff', minHeight: '100vh' }}>
      <PublicNavbar />
      <section style={{ padding: '80px', display: 'flex', gap: '60px', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '36px', fontFamily: "'Georgia', serif", color: '#1e293b', marginBottom: '20px' }}>About LemiCare</h2>
          <div style={{ width: '60px', height: '4px', background: '#f97316', marginBottom: '30px' }}></div>
          <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.8, marginBottom: '20px' }}>
            At LemiCare, we are dedicated to providing world-class healthcare with a compassionate and patient-centric approach. Equipped with the latest medical technology and a highly skilled team of specialists, we strive to deliver excellence in every aspect of medical care.
          </p>
          <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.8 }}>
            Whether you need routine check-ups, advanced surgical procedures, or critical emergency care, our hospital stands ready to support you on your journey to better health.
          </p>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', height: '350px', background: 'linear-gradient(135deg, #e0e7ff, #ede9fe)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}>
            <span style={{ fontSize: '64px' }}>🏥</span>
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
};

export default About;
