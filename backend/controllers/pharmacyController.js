const Medicine = require('../models/Medicine');
const Bill = require('../models/Bill');

exports.getMedicines = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    const medicines = await Medicine.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await Medicine.countDocuments(query);
    res.json({ medicines, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createMedicine = async (req, res) => {
  const { name, brand, batchNumber, expiryDate, price, stock, minStockLevel, category, description } = req.body;
  try {
    const medicine = new Medicine({ name, brand, batchNumber, expiryDate, price, stock, minStockLevel, category, description });
    await medicine.save();
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateMedicine = async (req, res) => {
  const { id } = req.params;
  try {
    const medicine = await Medicine.findByIdAndUpdate(id, req.body, { new: true });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteMedicine = async (req, res) => {
  const { id } = req.params;
  try {
    await Medicine.findByIdAndDelete(id);
    res.json({ message: 'Medicine deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPharmacyBill = async (req, res) => {
  const { patient, items, subtotal, totalDiscount, totalTax, grandTotal } = req.body;
  try {
    const bill = new Bill({
      patient,
      items,
      subtotal,
      totalDiscount,
      totalTax,
      grandTotal,
      createdBy: req.user.id
    });
    await bill.save();
    // Update stock
    for (let item of items) {
      await Medicine.findOneAndUpdate({ name: item.description }, { $inc: { stock: -item.quantity } });
    }
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};