import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

const PharmacyDashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios.get('/pharmacy/medicines').then(res => setMedicines(res.data)).catch(() => toast.error('Failed to load inventory'));
    axios.get('/bills').then(res => setBills(res.data)).catch(() => toast.error('Failed to load bills'));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Pharmacy Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Medicines in Stock</h3>
            <p className="text-3xl mt-3">{medicines.length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Open Pharmacy Bills</h3>
            <p className="text-3xl mt-3">{bills.filter(b => b.status !== 'paid').length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <p className="text-3xl mt-3">{bills.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;