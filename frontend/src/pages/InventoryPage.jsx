import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

const InventoryPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    brand: '',
    batchNumber: '',
    expiryDate: '',
    price: 0,
    stock: 0,
    minStockLevel: 10,
    category: '',
    description: ''
  });

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = () => {
    axios.get('/pharmacy/medicines')
      .then(res => setMedicines(res.data.medicines))
      .catch(err => toast.error('Failed to load medicines'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/pharmacy/medicines', form);
      toast.success('Medicine added');
      setShowModal(false);
      setForm({
        name: '',
        brand: '',
        batchNumber: '',
        expiryDate: '',
        price: 0,
        stock: 0,
        minStockLevel: 10,
        category: '',
        description: ''
      });
      loadMedicines();
    } catch (err) {
      toast.error('Failed to add medicine');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`/pharmacy/medicines/${id}`);
        toast.success('Medicine deleted');
        loadMedicines();
      } catch (err) {
        toast.error('Failed to delete medicine');
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded">Add Medicine</button>
        </div>

        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Min Level</th>
              <th className="p-2">Price</th>
              <th className="p-2">Expiry</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map(med => (
              <tr key={med._id}>
                <td className="p-2">{med.name}</td>
                <td className="p-2">{med.stock}</td>
                <td className="p-2">{med.minStockLevel}</td>
                <td className="p-2">${med.price}</td>
                <td className="p-2">{med.expiryDate ? new Date(med.expiryDate).toLocaleDateString() : 'N/A'}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded ${med.stock <= med.minStockLevel ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                    {med.stock <= med.minStockLevel ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
                <td className="p-2">
                  <button onClick={() => handleDelete(med._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow w-96 max-h-96 overflow-y-auto">
              <h2 className="text-xl mb-4">Add Medicine</h2>
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
                  type="text"
                  placeholder="Brand"
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  className="w-full p-2 mb-4 border rounded"
                />
                <input
                  type="text"
                  placeholder="Batch Number"
                  value={form.batchNumber}
                  onChange={(e) => setForm({ ...form, batchNumber: e.target.value })}
                  className="w-full p-2 mb-4 border rounded"
                />
                <input
                  type="date"
                  placeholder="Expiry Date"
                  value={form.expiryDate}
                  onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                  className="w-full p-2 mb-4 border rounded"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
                  className="w-full p-2 mb-4 border rounded"
                  step="0.01"
                  required
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Min Stock Level"
                  value={form.minStockLevel}
                  onChange={(e) => setForm({ ...form, minStockLevel: parseInt(e.target.value) })}
                  className="w-full p-2 mb-4 border rounded"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full p-2 mb-4 border rounded"
                />
                <textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-2 mb-4 border rounded"
                  rows="3"
                ></textarea>
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Add</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryPage;