const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const invoiceSchema = new mongoose.Schema({
  invoiceId: { type: String, unique: true, default: () => uuidv4() },
  bill: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  status: { type: String, enum: ['paid', 'pending', 'partial'], default: 'pending' },
  generatedAt: { type: Date, default: Date.now },
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Invoice', invoiceSchema);