import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'receptionist' });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    axios.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => toast.error('Failed to load users'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/users', form);
      toast.success('User created');
      setShowModal(false);
      setForm({ name: '', email: '', password: '', role: 'receptionist' });
      loadUsers();
    } catch (err) {
      toast.error('Failed to create user');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`/users/${id}`);
        toast.success('User deleted');
        loadUsers();
      } catch (err) {
        toast.error('Failed to delete user');
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded">Add User</button>
        </div>

        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">
                  <button onClick={() => handleDelete(user._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow w-96">
              <h2 className="text-xl mb-4">Add User</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full p-2 mb-4 border rounded"
                >
                  <option value="receptionist">Receptionist</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Create</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;