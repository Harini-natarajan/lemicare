import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../utils/AuthContext';
import { toast } from 'react-toastify';

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '10px',
  border: '1px solid #e2e8f0',
  fontSize: '14px',
  color: '#0f172a',
  background: '#f8fafc',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border 0.15s',
};

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 600,
  color: '#64748b',
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const FieldGroup = ({ label, children }) => (
  <div>
    <label style={labelStyle}>{label}</label>
    {children}
  </div>
);

const Profile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: '', phone: '', address: '', dob: '', gender: '',
    bloodGroup: '', height: '', weight: '', allergies: '', medicalHistory: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    axios.get('patients/profile')
      .then(res => {
        const u = res.data.user || {};
        const p = res.data.patient || {};
        setForm({
          name: u.name || '',
          phone: u.phone || '',
          address: u.address || '',
          dob: u.dob ? u.dob.slice(0, 10) : '',
          gender: u.gender || '',
          bloodGroup: p.bloodGroup || '',
          height: p.height || '',
          weight: p.weight || '',
          allergies: p.allergies || '',
          medicalHistory: p.medicalHistory || '',
        });
      })
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put('patients/profile', form);
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Inter', sans-serif" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>My Profile</h1>
          <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#64748b' }}>Manage your personal and medical information.</p>
        </div>

        {/* Avatar Card */}
        <div style={{ background: 'linear-gradient(135deg, #0f766e, #0369a1)', borderRadius: '16px', padding: '28px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: 800, color: '#fff', flexShrink: 0 }}>
            {initials}
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#fff' }}>{user?.name || 'Patient'}</p>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{user?.email || ''} · Patient</p>
          </div>
        </div>

        {fetching ? (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '48px', textAlign: 'center', color: '#94a3b8' }}>Loading profile...</div>
        ) : (
          <form onSubmit={handleUpdate}>
            {/* Personal Info */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', marginBottom: '20px' }}>
              <h2 style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Personal Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <FieldGroup label="Full Name">
                  <input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
                </FieldGroup>
                <FieldGroup label="Phone Number">
                  <input style={inputStyle} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
                </FieldGroup>
                <FieldGroup label="Date of Birth">
                  <input style={inputStyle} type="date" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} />
                </FieldGroup>
                <FieldGroup label="Gender">
                  <select style={inputStyle} value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </FieldGroup>
                <FieldGroup label="Address">
                  <input style={{ ...inputStyle, gridColumn: '1 / -1' }} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Your address" />
                </FieldGroup>
              </div>
            </div>

            {/* Medical Info */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', marginBottom: '24px' }}>
              <h2 style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Medical Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '18px' }}>
                <FieldGroup label="Blood Group">
                  <select style={inputStyle} value={form.bloodGroup} onChange={e => setForm({ ...form, bloodGroup: e.target.value })}>
                    <option value="">Select</option>
                    {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </FieldGroup>
                <FieldGroup label="Height (cm)">
                  <input style={inputStyle} type="number" value={form.height} onChange={e => setForm({ ...form, height: e.target.value })} placeholder="e.g. 165" />
                </FieldGroup>
                <FieldGroup label="Weight (kg)">
                  <input style={inputStyle} type="number" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} placeholder="e.g. 60" />
                </FieldGroup>
                <div style={{ gridColumn: '1 / -1' }}>
                  <FieldGroup label="Allergies">
                    <input style={inputStyle} value={form.allergies} onChange={e => setForm({ ...form, allergies: e.target.value })} placeholder="e.g. Penicillin, Pollen..." />
                  </FieldGroup>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <FieldGroup label="Medical History">
                    <textarea style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} value={form.medicalHistory} onChange={e => setForm({ ...form, medicalHistory: e.target.value })} placeholder="Previous conditions, surgeries..." />
                  </FieldGroup>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              padding: '13px 32px', background: 'linear-gradient(135deg, #0d9488, #0369a1)',
              color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700,
              fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1, boxShadow: '0 4px 12px rgba(13,148,136,0.3)',
            }}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;