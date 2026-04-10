import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const Contact = () => {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", width: '100vw', overflowX: 'hidden', background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PublicNavbar />
      <section className="px-6 md:px-10 py-16 md:py-24 flex-1 flex justify-center items-start">
        <div className="w-full max-w-[800px] bg-white rounded-3xl p-8 md:p-14 shadow-xl shadow-slate-200/50">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', fontFamily: "'Georgia', serif", color: '#1e293b', marginBottom: '16px' }}>Contact & Support</h2>
            <p style={{ color: '#64748b', fontSize: '16px' }}>We are always here to listen and help you. Send us a message below.</p>
          </div>
          
          <form className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-5">
              <input type="text" placeholder="First Name" className="flex-1 p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-colors" />
              <input type="text" placeholder="Last Name" className="flex-1 p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-colors" />
            </div>
            <input type="email" placeholder="Email Address" className="p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-colors" />
            <textarea placeholder="How can we help you?" className="p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-colors min-h-[150px] resize-vertical"></textarea>
            <button type="button" className="hover:bg-blue-700 transition-colors p-4 bg-blue-600 text-white border-none rounded-xl font-semibold cursor-pointer text-base mt-2 shadow-lg shadow-blue-200">
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
