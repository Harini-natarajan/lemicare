import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

const ReportsPage = () => {
  const [revenueReport, setRevenueReport] = useState([]);
  const [doctorReport, setDoctorReport] = useState([]);
  const [pharmacyReport, setPharmacyReport] = useState([]);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', type: 'daily' });

  useEffect(() => {
    loadReports();
  }, [filters]);

  const loadReports = () => {
    const params = new URLSearchParams(filters);
    axios.get(`/reports/revenue?${params}`)
      .then(res => setRevenueReport(res.data))
      .catch(err => toast.error('Failed to load revenue report'));

    axios.get('/reports/doctor-billing')
      .then(res => setDoctorReport(res.data))
      .catch(err => toast.error('Failed to load doctor report'));

    axios.get('/reports/pharmacy-sales')
      .then(res => setPharmacyReport(res.data))
      .catch(err => toast.error('Failed to load pharmacy report'));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>

        {/* Filters */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="date"
              placeholder="Start Date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="date"
              placeholder="End Date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              className="p-2 border rounded"
            />
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="p-2 border rounded"
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
            </select>
            <button onClick={loadReports} className="bg-indigo-600 text-white px-4 py-2 rounded">Apply Filters</button>
          </div>
        </div>

        {/* Revenue Report */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Report</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Date</th>
                <th className="p-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {revenueReport.map(item => (
                <tr key={item._id}>
                  <td className="p-2">{item._id}</td>
                  <td className="p-2">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Doctor-wise Billing */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Doctor-wise Billing</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Doctor</th>
                <th className="p-2">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {doctorReport.map(item => (
                <tr key={item._id}>
                  <td className="p-2">{item._id}</td>
                  <td className="p-2">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pharmacy Sales */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Pharmacy Sales</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Medicine</th>
                <th className="p-2">Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {pharmacyReport.map(item => (
                <tr key={item._id}>
                  <td className="p-2">{item._id}</td>
                  <td className="p-2">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;