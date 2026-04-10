import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const Contact = () => {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", width: '100vw', overflowX: 'hidden', background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PublicNavbar />
      <section style={{ padding: '80px', flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '800px', background: '#fff', borderRadius: '24px', padding: '60px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', fontFamily: "'Georgia', serif", color: '#1e293b', marginBottom: '16px' }}>Contact & Support</h2>
            <p style={{ color: '#64748b', fontSize: '16px' }}>We are always here to listen and help you. Send us a message below.</p>
          </div>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <input type="text" placeholder="First Name" style={{ flex: 1, padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
              <input type="text" placeholder="Last Name" style={{ flex: 1, padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
            </div>
            <input type="email" placeholder="Email Address" style={{ padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
            <textarea placeholder="How can we help you?" style={{ padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', minHeight: '150px', resize: 'vertical' }}></textarea>
            <button type="button" className="hover:bg-blue-700 transition-colors" style={{ padding: '16px', background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}>
              Send Message
            </button>
          </form>
        </div>
      </section>
      
      <PublicFooter />
    </div>
  );
};

export default Contact;
