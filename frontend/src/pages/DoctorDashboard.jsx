import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('/appointments').then(res => setAppointments(res.data)).catch(() => toast.error('Failed to load appointments')); 
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Doctor Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Today's Appointments</h3>
            <p className="text-3xl mt-3">{appointments.filter(a => new Date(a.date).toDateString() === new Date().toDateString()).length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Total Patients</h3>
            <p className="text-3xl mt-3">{new Set(appointments.map(a => a.patient?._id)).size}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Upcoming Visits</h3>
            <p className="text-3xl mt-3">{appointments.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          {appointments.length ? appointments.map(app => (
            <div key={app._id} className="border-b py-3">
              <p><strong>Patient:</strong> {app.patient?.name || 'Unknown'}</p>
              <p><strong>Date:</strong> {new Date(app.date).toLocaleDateString()} {app.time}</p>
              <p><strong>Status:</strong> {app.status}</p>
            </div>
          )) : <p>No appointments found.</p>}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;