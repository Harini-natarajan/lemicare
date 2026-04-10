import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

const ReceptionDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios.get('/appointments').then(res => setAppointments(res.data)).catch(() => toast.error('Failed to load appointments'));
    axios.get('/bills').then(res => setBills(res.data)).catch(() => toast.error('Failed to load bills'));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Reception Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Pending Appointments</h3>
            <p className="text-3xl mt-3">{appointments.filter(a => a.status === 'scheduled').length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Open Bills</h3>
            <p className="text-3xl mt-3">{bills.filter(b => b.status !== 'paid').length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Total Records</h3>
            <p className="text-3xl mt-3">{appointments.length + bills.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionDashboard;