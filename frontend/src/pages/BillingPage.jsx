import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

const BillingPage = () => {
  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({
    patient: '',
    items: [{ description: '', category: 'consultation', quantity: 1, rate: 0, discount: 0, tax: 0 }]
  });
  const [calculations, setCalculations] = useState({ subtotal: 0, totalDiscount: 0, totalTax: 0, grandTotal: 0 });

  useEffect(() => {
    axios.get('/patients')
      .then(res => setPatients(res.data))
      .catch(err => toast.error('Failed to load patients'));

    axios.get('/pharmacy/medicines')
      .then(res => setMedicines(res.data.medicines))
      .catch(err => toast.error('Failed to load medicines'));
  }, []);

  const calculateTotals = (items) => {
    let subtotal = 0;
    let totalDiscount = 0;
    let totalTax = 0;

    items.forEach(item => {
      const itemTotal = item.quantity * item.rate;
      subtotal += itemTotal;
      totalDiscount += (itemTotal * item.discount) / 100;
      totalTax += (itemTotal * item.tax) / 100;
    });

    const grandTotal = subtotal - totalDiscount + totalTax;
    setCalculations({ subtotal, totalDiscount, totalTax, grandTotal });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...form.items];
    newItems[index][field] = value;
    setForm({ ...form, items: newItems });
    calculateTotals(newItems);
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { description: '', category: 'consultation', quantity: 1, rate: 0, discount: 0, tax: 0 }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/bills', {
        ...form,
        ...calculations
      });
      toast.success('Bill created successfully');
      setForm({
        patient: '',
        items: [{ description: '', category: 'consultation', quantity: 1, rate: 0, discount: 0, tax: 0 }]
      });
      setCalculations({ subtotal: 0, totalDiscount: 0, totalTax: 0, grandTotal: 0 });
    } catch (err) {
      toast.error('Failed to create bill');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">OPD Billing</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
          <div className="mb-4">
            <label className="block mb-2">Patient</label>
            <select
              value={form.patient}
              onChange={(e) => setForm({ ...form, patient: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Patient</option>
              {patients.map(patient => (
                <option key={patient._id} value={patient._id}>{patient.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Items</h3>
            {form.items.map((item, index) => (
              <div key={index} className="grid grid-cols-7 gap-2 mb-2">
                <select
                  value={item.category}
                  onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="consultation">Consultation</option>
                  <option value="procedure">Procedure</option>
                  <option value="lab_test">Lab Test</option>
                  <option value="medicine">Medicine</option>
                  <option value="misc">Misc</option>
                </select>
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                  className="p-2 border rounded"
                  min="1"
                />
                <input
                  type="number"
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value))}
                  className="p-2 border rounded"
                  step="0.01"
                />
                <input
                  type="number"
                  placeholder="Discount %"
                  value={item.discount}
                  onChange={(e) => handleItemChange(index, 'discount', parseFloat(e.target.value))}
                  className="p-2 border rounded"
                  step="0.01"
                />
                <input
                  type="number"
                  placeholder="Tax %"
                  value={item.tax}
                  onChange={(e) => handleItemChange(index, 'tax', parseFloat(e.target.value))}
                  className="p-2 border rounded"
                  step="0.01"
                />
                <span className="p-2">${(item.quantity * item.rate).toFixed(2)}</span>
              </div>
            ))}
            <button type="button" onClick={addItem} className="bg-green-600 text-white px-4 py-2 rounded">Add Item</button>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block">Subtotal</label>
              <span className="text-lg font-semibold">${calculations.subtotal.toFixed(2)}</span>
            </div>
            <div>
              <label className="block">Discount</label>
              <span className="text-lg font-semibold text-red-600">${calculations.totalDiscount.toFixed(2)}</span>
            </div>
            <div>
              <label className="block">Tax</label>
              <span className="text-lg font-semibold text-blue-600">${calculations.totalTax.toFixed(2)}</span>
            </div>
            <div>
              <label className="block">Grand Total</label>
              <span className="text-lg font-semibold text-green-600">${calculations.grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded">Create Bill</button>
        </form>
      </div>
    </div>
  );
};

export default BillingPage;