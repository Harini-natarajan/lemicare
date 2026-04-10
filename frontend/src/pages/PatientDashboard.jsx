import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../utils/AuthContext';
import { Link } from 'react-router-dom';

const StatCard = ({ icon, label, value, color, bg }) => (
  <div style={{
    background: '#fff',
    borderRadius: '16px',
    padding: '28px 24px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flex: 1,
    minWidth: 0,
  }}>
    <div style={{
      width: '52px', height: '52px', borderRadius: '14px',
      background: bg, display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexShrink: 0,
    }}>
      {icon}
    </div>
    <div>
      <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>{label}</p>
      <p style={{ margin: '4px 0 0', fontSize: '32px', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>{value}</p>
    </div>
  </div>
);

const EmptyState = ({ icon, message, linkTo, linkLabel }) => (
  <div style={{ textAlign: 'center', padding: '48px 24px', color: '#94a3b8' }}>
    <div style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.5 }}>{icon}</div>
    <p style={{ margin: '0 0 16px', fontSize: '14px' }}>{message}</p>
    {linkTo && (
      <Link to={linkTo} style={{
        display: 'inline-block', padding: '8px 20px', borderRadius: '999px',
        background: 'linear-gradient(135deg, #0d9488, #0369a1)',
        color: '#fff', fontSize: '13px', fontWeight: 600, textDecoration: 'none',
      }}>
        {linkLabel}
      </Link>
    )}
  </div>
);

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [apptRes, billRes, presRes] = await Promise.allSettled([
          axios.get('appointments'),
          axios.get('bills'),
          axios.get('prescriptions'),
        ]);
        if (apptRes.status === 'fulfilled') setAppointments(apptRes.value.data);
        if (billRes.status === 'fulfilled') setBills(billRes.value.data);
        if (presRes.status === 'fulfilled') setPrescriptions(presRes.value.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const upcoming = appointments.filter(a => new Date(a.date) >= new Date());

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Inter', sans-serif" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px' }}>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>{today}</p>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>
              Welcome back, <span style={{ background: 'linear-gradient(135deg, #0d9488, #0369a1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{user?.name?.split(' ')[0] || 'Patient'}</span> 👋
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#64748b' }}>Here's a summary of your health activity.</p>
          </div>
          <Link to="/appointments" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, #0d9488, #0369a1)',
            color: '#fff', padding: '12px 24px', borderRadius: '12px',
            textDecoration: 'none', fontSize: '14px', fontWeight: 600,
            boxShadow: '0 4px 12px rgba(13,148,136,0.3)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Book Appointment
          </Link>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <StatCard
            label="Upcoming Appointments"
            value={loading ? '—' : upcoming.length}
            bg="linear-gradient(135deg, #d1fae5, #a7f3d0)"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
          />
          <StatCard
            label="Total Bills"
            value={loading ? '—' : bills.length}
            bg="linear-gradient(135deg, #dbeafe, #bfdbfe)"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>}
          />
          <StatCard
            label="Active Prescriptions"
            value={loading ? '—' : prescriptions.length}
            bg="linear-gradient(135deg, #ede9fe, #ddd6fe)"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>}
          />
        </div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Upcoming Appointments */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Upcoming Appointments</h2>
              <Link to="/appointments" style={{ fontSize: '13px', color: '#0d9488', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
            </div>
            {loading ? (
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>Loading...</p>
            ) : upcoming.length ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {upcoming.slice(0, 3).map((appt) => (
                  <div key={appt._id} style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '16px', borderRadius: '12px', background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                  }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '10px',
                      background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>Dr. {appt.doctor?.name || 'TBD'}</p>
                      <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>{new Date(appt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {appt.time || '—'}</p>
                    </div>
                    <span style={{
                      padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 600,
                      background: appt.status === 'confirmed' ? '#d1fae5' : '#fef3c7',
                      color: appt.status === 'confirmed' ? '#059669' : '#d97706',
                    }}>
                      {appt.status || 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon="📅" message="No upcoming appointments" linkTo="/appointments" linkLabel="Book Now" />
            )}
          </div>

          {/* Recent Bills */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Recent Bills</h2>
              <Link to="/bills" style={{ fontSize: '13px', color: '#0d9488', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
            </div>
            {loading ? (
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>Loading...</p>
            ) : bills.length ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {bills.slice(0, 4).map(bill => (
                  <div key={bill._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Bill #{bill._id?.slice(-5)}</p>
                      <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#94a3b8' }}>{bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : 'No due date'}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>₹{bill.grandTotal || bill.total || 0}</p>
                      <span style={{
                        fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px',
                        background: bill.status === 'paid' ? '#d1fae5' : '#fee2e2',
                        color: bill.status === 'paid' ? '#059669' : '#dc2626',
                      }}>{bill.status || 'Unpaid'}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon="🧾" message="No billing records found" />
            )}
          </div>

          {/* Active Prescriptions */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Active Prescriptions</h2>
              <Link to="/prescriptions" style={{ fontSize: '13px', color: '#0d9488', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
            </div>
            {loading ? (
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>Loading...</p>
            ) : prescriptions.length ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {prescriptions.slice(0, 4).map(pres => (
                  <div key={pres._id} style={{ padding: '14px 16px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Dr. {pres.doctor?.name || 'Staff'}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>
                      {pres.medicines?.slice(0, 2).map(m => m.name).join(', ') || 'No medicines listed'}
                    </p>
                    {pres.notes && <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>{pres.notes}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon="💊" message="No prescriptions available" />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;