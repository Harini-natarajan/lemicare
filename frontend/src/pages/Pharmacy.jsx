import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

const Pharmacy = () => {
  const [medicines, setMedicines] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    axios.get('/pharmacy/medicines')
      .then(res => setMedicines(res.data))
      .catch(err => toast.error('Failed to load medicines'));
  }, []);

  const handlePurchase = async () => {
    try {
      await axios.post('/pharmacy/bill', {
        patient: 'some_patient_id', // Mock
        items: selected.map(m => ({ description: m.name, amount: m.price }))
      });
      toast.success('Purchase successful');
    } catch (err) {
      toast.error('Purchase failed');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Pharmacy</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicines.map(med => (
            <div key={med._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{med.name}</h3>
              <p>Price: ${med.price}</p>
              <p>Stock: {med.stock}</p>
              <button
                onClick={() => setSelected([...selected, med])}
                className="bg-green-600 text-white p-2 rounded mt-2"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <button onClick={handlePurchase} className="bg-indigo-600 text-white p-2 rounded mt-6">Purchase</button>
      </div>
    </div>
  );
};

export default Pharmacy;