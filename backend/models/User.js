const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['patient', 'receptionist', 'pharmacist', 'doctor', 'admin'], required: true, default: 'patient' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  phone: { type: String },
  address: { type: String },
  dob: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);