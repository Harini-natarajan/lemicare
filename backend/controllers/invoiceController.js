const Invoice = require('../models/Invoice');
const Bill = require('../models/Bill');

exports.generateInvoice = async (req, res) => {
  const { billId } = req.body;
  try {
    const bill = await Bill.findById(billId).populate('patient', 'name');
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    const invoice = new Invoice({
      bill: billId,
      patient: bill.patient._id,
      totalAmount: bill.grandTotal,
      paidAmount: bill.paidAmount,
      status: bill.status,
      generatedBy: req.user.id
    });
    await invoice.save();
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('bill patient', 'grandTotal name');
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};