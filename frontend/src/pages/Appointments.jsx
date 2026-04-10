import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';
import { useAuth } from '../utils/AuthContext';

const statusColor = {
  confirmed: { bg: '#d1fae5', color: '#059669' },
  pending: { bg: '#fef3c7', color: '#d97706' },
  cancelled: { bg: '#fee2e2', color: '#dc2626' },
  completed: { bg: '#e0f2fe', color: '#0369a1' },
};

const inputStyle = {
  width: '100%', padding: '11px 14px', borderRadius: '10px',
  border: '1px solid #e2e8f0', fontSize: '14px', color: '#0f172a',
  background: '#f8fafc', outline: 'none', boxSizing: 'border-box',
};

const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ doctor: '', date: '', time: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchAppointments = () => {
    setLoading(true);
    axios.get('appointments')
      .then(res => setAppointments(res.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleBook = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('appointments', form);
      toast.success('Appointment booked!');
      setForm({ doctor: '', date: '', time: '' });
      setShowForm(false);
      fetchAppointments();
    } catch {
      toast.error('Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const upcoming = appointments.filter(a => new Date(a.date) >= new Date());
  const past = appointments.filter(a => new Date(a.date) < new Date());

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="dashboard-content">

        {/* Mobile Header */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-white rounded-lg shadow-sm border border-slate-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-teal-600 flex items-center justify-center text-white font-bold text-xs">L</div>
            <span className="font-bold text-slate-800">LemiCare</span>
          </div>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }} className="flex-col sm:flex-row gap-4">
          <div>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>Appointments</h1>
            <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#64748b' }}>
              {upcoming.length} upcoming · {past.length} past
            </p>
          </div>
          {user?.role === 'patient' && (
            <button onClick={() => setShowForm(!showForm)} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #0d9488, #0369a1)',
              color: '#fff', padding: '12px 24px', borderRadius: '12px',
              border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(13,148,136,0.3)',
            }} className="w-full sm:w-auto justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
              {showForm ? 'Cancel' : 'Book Appointment'}
            </button>
          )}
        </div>

        {/* Book Form */}
        {showForm && (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', marginBottom: '28px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>New Appointment</h2>
            <form onSubmit={handleBook} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Doctor ID</label>
                <input style={inputStyle} value={form.doctor} onChange={e => setForm({ ...form, doctor: e.target.value })} placeholder="Enter doctor ID" required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</label>
                <input style={inputStyle} type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required min={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Time</label>
                <input style={inputStyle} type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required />
              </div>
              <div className="md:col-span-3">
                <button type="submit" disabled={submitting} style={{
                  padding: '12px 28px', background: 'linear-gradient(135deg, #0d9488, #0369a1)',
                  color: '#fff', border: 'none', borderRadius: '10px',
                  fontWeight: 700, fontSize: '14px', cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.7 : 1,
                }} className="w-full sm:w-auto">
                  {submitting ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Upcoming */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Upcoming</h2>
          {loading ? (
            <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Loading...</div>
          ) : upcoming.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {upcoming.map(appt => <AppointmentCard key={appt._id} appt={appt} />)}
            </div>
          ) : (
            <EmptyCard icon="📅" text="No upcoming appointments" />
          )}
        </div>

        {/* Past */}
        {past.length > 0 && (
          <div>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Past</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {past.map(appt => <AppointmentCard key={appt._id} appt={appt} muted />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AppointmentCard = ({ appt, muted }) => {
  const status = appt.status || 'pending';
  const sc = statusColor[status] || statusColor.pending;
  return (
    <div style={{
      background: '#fff', borderRadius: '14px', padding: '20px 24px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      opacity: muted ? 0.65 : 1,
      border: '1px solid #e2e8f0',
    }} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
      <div style={{
        width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
        background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
      </div>
      <div style={{ flex: 1 }} className="text-center sm:text-left">
        <p style={{ margin: 0, fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>
          Dr. {appt.doctor?.name || 'TBD'}
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
          {new Date(appt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} · {appt.time || '—'}
        </p>
        {appt.notes && <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>{appt.notes}</p>}
      </div>
      <span style={{ padding: '5px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, background: sc.bg, color: sc.color, flexShrink: 0 }}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
};

const EmptyCard = ({ icon, text }) => (
  <div style={{ background: '#fff', borderRadius: '14px', padding: '48px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
    <div style={{ fontSize: '36px', marginBottom: '10px', opacity: 0.4 }}>{icon}</div>
    <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>{text}</p>
  </div>
);

export default Appointments;