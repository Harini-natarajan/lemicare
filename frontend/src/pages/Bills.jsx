import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const statusColor = {
  paid:    { bg: '#d1fae5', color: '#059669' },
  unpaid:  { bg: '#fee2e2', color: '#dc2626' },
  pending: { bg: '#fef3c7', color: '#d97706' },
};

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('bills')
      .then(res => setBills(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalDue = bills
    .filter(b => b.status !== 'paid')
    .reduce((sum, b) => sum + (b.grandTotal || b.total || 0), 0);
  const totalPaid = bills
    .filter(b => b.status === 'paid')
    .reduce((sum, b) => sum + (b.grandTotal || b.total || 0), 0);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Inter', sans-serif" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>Bills & Payments</h1>
          <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#64748b' }}>{bills.length} total records</p>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
          <div style={{ flex: 1, background: 'linear-gradient(135deg, #0f766e, #0369a1)', borderRadius: '16px', padding: '24px' }}>
            <p style={{ margin: '0 0 6px', fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Due</p>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: 800, color: '#fff' }}>₹{totalDue.toLocaleString()}</p>
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Paid</p>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: 800, color: '#059669' }}>₹{totalPaid.toLocaleString()}</p>
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Bills</p>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: 800, color: '#0f172a' }}>{bills.length}</p>
          </div>
        </div>

        {/* Bills Table */}
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr', padding: '14px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            {['Bill ID', 'Date', 'Amount', 'Status', 'Due Date'].map(h => (
              <span key={h} style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</span>
            ))}
          </div>

          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>Loading bills...</div>
          ) : bills.length ? (
            bills.map((bill, i) => {
              const status = bill.status || 'unpaid';
              const sc = statusColor[status] || statusColor.unpaid;
              return (
                <div key={bill._id} style={{
                  display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
                  padding: '18px 24px', alignItems: 'center',
                  borderBottom: i < bills.length - 1 ? '1px solid #f1f5f9' : 'none',
                  transition: 'background 0.15s',
                }} className="bill-row">
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', fontFamily: 'monospace' }}>
                    #{bill._id?.slice(-8).toUpperCase()}
                  </span>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>
                    {bill.createdAt ? new Date(bill.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                    ₹{(bill.grandTotal || bill.total || 0).toLocaleString()}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <span style={{ padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, background: sc.bg, color: sc.color }}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </span>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>
                    {bill.dueDate ? new Date(bill.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                  </span>
                </div>
              );
            })
          ) : (
            <div style={{ padding: '60px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '10px', opacity: 0.4 }}>🧾</div>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>No billing records found</p>
            </div>
          )}
        </div>

        <style>{`.bill-row:hover { background: #f8fafc; }`}</style>
      </div>
    </div>
  );
};

export default Bills;