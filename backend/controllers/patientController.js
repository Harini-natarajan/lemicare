const User = require('../models/User');
const Patient = require('../models/Patient');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const patient = await Patient.findOne({ user: req.user.id });
    res.json({ user, patient });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender, medicalHistory, allergies, emergencyContact, bloodGroup, height, weight } = req.body;
    await User.findByIdAndUpdate(req.user.id, { name, phone, address, dob, gender });
    await Patient.findOneAndUpdate({ user: req.user.id }, { medicalHistory, allergies, emergencyContact, bloodGroup, height, weight }, { upsert: true });
    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' }).select('-password');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};