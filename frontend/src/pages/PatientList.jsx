import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get('/patients')
      .then(res => setPatients(res.data))
      .catch(err => toast.error('Failed to load patients'));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Patient List</h1>

        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Age</th>
              <th className="p-2">Gender</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient._id}>
                <td className="p-2">{patient.name}</td>
                <td className="p-2">{patient.age}</td>
                <td className="p-2">{patient.gender}</td>
                <td className="p-2">{patient.phone}</td>
                <td className="p-2">
                  <button className="bg-blue-600 text-white px-2 py-1 rounded">View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;