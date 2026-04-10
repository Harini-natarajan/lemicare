const Bill = require('../models/Bill');
const Invoice = require('../models/Invoice');

exports.getRevenueReport = async (req, res) => {
  const { startDate, endDate, type = 'daily' } = req.query;
  try {
    const match = { status: 'paid' };
    if (startDate && endDate) {
      match.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    let groupBy;
    if (type === 'monthly') {
      groupBy = { $dateToString: { format: '%Y-%m', date: '$createdAt' } };
    } else {
      groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
    }

    const revenue = await Bill.aggregate([
      { $match: match },
      { $group: { _id: groupBy, total: { $sum: '$grandTotal' } } },
      { $sort: { '_id': 1 } }
    ]);

    res.json(revenue);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDoctorWiseBilling = async (req, res) => {
  try {
    const doctorBilling = await Bill.aggregate([
      { $lookup: { from: 'users', localField: 'createdBy', foreignField: '_id', as: 'doctor' } },
      { $unwind: '$doctor' },
      { $match: { 'doctor.role': 'doctor' } },
      { $group: { _id: '$doctor.name', total: { $sum: '$grandTotal' } } },
      { $sort: { total: -1 } }
    ]);

    res.json(doctorBilling);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPharmacySales = async (req, res) => {
  try {
    const pharmacySales = await Bill.aggregate([
      { $unwind: '$items' },
      { $match: { 'items.category': 'medicine', status: 'paid' } },
      { $group: { _id: '$items.description', total: { $sum: '$items.total' } } },
      { $sort: { total: -1 } }
    ]);

    res.json(pharmacySales);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};