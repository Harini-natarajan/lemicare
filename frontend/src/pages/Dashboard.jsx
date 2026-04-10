import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../utils/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});

  useEffect(() => {
    // Mock stats
    setStats({
      appointments: 5,
      bills: 2,
      prescriptions: 3
    });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p>Welcome, {user?.name} ({user?.role})</p>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Appointments</h3>
            <p className="text-2xl">{stats.appointments}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Bills</h3>
            <p className="text-2xl">{stats.bills}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Prescriptions</h3>
            <p className="text-2xl">{stats.prescriptions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;