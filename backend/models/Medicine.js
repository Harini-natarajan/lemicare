const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  brand: { type: String },
  batchNumber: { type: String },
  expiryDate: { type: Date },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  minStockLevel: { type: Number, default: 10 },
  category: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Medicine', medicineSchema);