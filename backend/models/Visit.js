const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  visitDate: { type: Date, default: Date.now },
  symptoms: { type: String },
  diagnosis: { type: String },
  treatment: { type: String },
  notes: { type: String },
  status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' }
});

module.exports = mongoose.model('Visit', visitSchema);