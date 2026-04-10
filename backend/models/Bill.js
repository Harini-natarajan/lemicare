const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    description: { type: String, required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, refPath: 'items.itemModel' },
    itemModel: { type: String, enum: ['Medicine', 'Service'] },
    category: { type: String, enum: ['consultation', 'procedure', 'lab_test', 'medicine', 'misc'], required: true },
    quantity: { type: Number, required: true },
    rate: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true }
  }],
  subtotal: { type: Number, required: true },
  totalDiscount: { type: Number, default: 0 },
  totalTax: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  status: { type: String, enum: ['paid', 'pending', 'partial'], default: 'pending' },
  paidAmount: { type: Number, default: 0 },
  dueDate: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bill', billSchema);