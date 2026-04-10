const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clerkId: { type: String, index: true },
  medicalHistory: [{ type: String }],
  allergies: [{ type: String }],
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  bloodGroup: { type: String },
  height: { type: Number },
  weight: { type: Number }
});

module.exports = mongoose.model('Patient', patientSchema);