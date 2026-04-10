import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [alerts, setAlerts] = useState({});

  useEffect(() => {
    axios.get('/admin/dashboard')
      .then(res => setStats(res.data))
      .catch(err => toast.error('Failed to load stats'));

    axios.get('/admin/alerts')
      .then(res => setAlerts(res.data))
      .catch(err => toast.error('Failed to load alerts'));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Total Patients</h3>
            <p className="text-2xl">{stats.totalPatients}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-2xl">${stats.totalRevenue}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Pending Payments</h3>
            <p className="text-2xl text-red-600">{stats.pendingPayments}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Low Stock Items</h3>
            <p className="text-2xl text-orange-600">{stats.lowStockMedicines}</p>
          </div>
        </div>

        {/* Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Low Stock Alerts</h3>
            {alerts.lowStock?.map(item => (
              <p key={item._id} className="text-sm text-orange-600">{item.name}: {item.stock} left</p>
            ))}
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Expiring Medicines</h3>
            {alerts.expiringSoon?.map(item => (
              <p key={item._id} className="text-sm text-red-600">{item.name}: {new Date(item.expiryDate).toLocaleDateString()}</p>
            ))}
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Pending Bills</h3>
            {alerts.pendingBills?.map(bill => (
              <p key={bill._id} className="text-sm text-red-600">{bill.patient.name}: ${bill.grandTotal}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;