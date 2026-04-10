import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const Departments = () => {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", width: '100vw', overflowX: 'hidden', background: '#f8fafc', minHeight: '100vh' }}>
      <PublicNavbar />
      <section style={{ padding: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', fontFamily: "'Georgia', serif", color: '#1e293b', marginBottom: '16px' }}>Centers of Excellence</h2>
          <p style={{ color: '#64748b', fontSize: '16px' }}>Explore our specialized medical departments.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {[
            { name: 'Cardiology', icon: '❤️' },
            { name: 'Neurology', icon: '🧠' },
            { name: 'Orthopedics', icon: '🦴' },
            { name: 'Pediatrics', icon: '👶' },
            { name: 'Oncology', icon: '🧬' },
            { name: 'General Surgery', icon: '⚕️' },
            { name: 'Dermatology', icon: '🧴' },
            { name: 'Radiology', icon: '🩻' },
          ].map(dept => (
            <div key={dept.name} className="hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer" style={{ background: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{dept.icon}</div>
              <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: 0 }}>{dept.name}</h4>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '8px' }}>World class treatments</p>
            </div>
          ))}
        </div>
      </section>
      <PublicFooter />
    </div>
  );
};

export default Departments;
