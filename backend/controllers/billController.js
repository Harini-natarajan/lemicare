const Bill = require('../models/Bill');

const Medicine = require('../models/Medicine');

exports.createBill = async (req, res) => {
  const { patient, items, subtotal, totalDiscount, totalTax, grandTotal, dueDate } = req.body;
  try {
    const bill = new Bill({
      patient,
      items,
      subtotal,
      totalDiscount,
      totalTax,
      grandTotal,
      dueDate,
      createdBy: req.user.id
    });
    
    // Reduce stock for any medicine items
    if (items && items.length > 0) {
      for (let item of items) {
        if (item.category === 'medicine' && item.itemId) {
          await Medicine.findByIdAndUpdate(item.itemId, {
            $inc: { stock: -item.quantity }
          });
        } else if (item.category === 'medicine' && !item.itemId) {
          // Fallback if frontend forgot itemId but we have exact name
          await Medicine.findOneAndUpdate({ name: item.description }, {
            $inc: { stock: -item.quantity }
          });
        }
      }
    }

    await bill.save();
    res.json(bill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBills = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'patient') query.patient = req.user.id;
    const bills = await Bill.find(query).populate('patient', 'name');
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBillStatus = async (req, res) => {
  const { id } = req.params;
  const { status, paidAmount } = req.body;
  try {
    const bill = await Bill.findByIdAndUpdate(id, { status, paidAmount }, { new: true });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};