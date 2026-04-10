import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    axios.get('prescriptions')
      .then(res => setPrescriptions(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Inter', sans-serif" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>Prescriptions</h1>
          <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#64748b' }}>{prescriptions.length} prescription{prescriptions.length !== 1 ? 's' : ''} on record</p>
        </div>

        {loading ? (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '48px', textAlign: 'center', color: '#94a3b8', border: '1px solid #e2e8f0' }}>
            Loading prescriptions...
          </div>
        ) : prescriptions.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {prescriptions.map((pres, i) => {
              const isOpen = expanded === pres._id;
              return (
                <div key={pres._id} style={{
                  background: '#fff', borderRadius: '16px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                  border: isOpen ? '1px solid #0d9488' : '1px solid #e2e8f0',
                  overflow: 'hidden', transition: 'border 0.2s',
                }}>
                  {/* Card Header */}
                  <div
                    onClick={() => setExpanded(isOpen ? null : pres._id)}
                    style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '18px', cursor: 'pointer' }}
                  >
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                      background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>
                        Dr. {pres.doctor?.name || 'Staff'}
                      </p>
                      <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#64748b' }}>
                        {pres.createdAt
                          ? new Date(pres.createdAt).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
                          : 'Date unknown'}
                        {pres.medicines?.length ? ` · ${pres.medicines.length} medicine${pres.medicines.length > 1 ? 's' : ''}` : ''}
                      </p>
                    </div>
                    <svg
                      width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="#94a3b8" strokeWidth="2"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}
                    >
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>

                  {/* Expanded Content */}
                  {isOpen && (
                    <div style={{ borderTop: '1px solid #f1f5f9', padding: '24px' }}>
                      {/* Medicines */}
                      {pres.medicines?.length > 0 && (
                        <div style={{ marginBottom: '20px' }}>
                          <p style={{ margin: '0 0 12px', fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Medicines</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {pres.medicines.map((med, idx) => (
                              <div key={idx} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '14px 18px', borderRadius: '10px', background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                              }}>
                                <div>
                                  <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>{med.name || 'Unnamed'}</p>
                                  {med.dosage && <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Dosage: {med.dosage}</p>}
                                </div>
                                {med.duration && (
                                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#7c3aed', background: '#ede9fe', padding: '4px 12px', borderRadius: '999px' }}>
                                    {med.duration}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Notes */}
                      {pres.notes && (
                        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '16px' }}>
                          <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: 700, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Doctor's Notes</p>
                          <p style={{ margin: 0, fontSize: '13px', color: '#78350f', lineHeight: 1.6 }}>{pres.notes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '60px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.4 }}>💊</div>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>No prescriptions on record</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prescriptions;