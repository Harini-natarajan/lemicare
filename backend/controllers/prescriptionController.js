const Prescription = require('../models/Prescription');

exports.createPrescription = async (req, res) => {
  const { appointment, patient, medicines, notes } = req.body;
  try {
    const prescription = new Prescription({ appointment, patient, doctor: req.user.id, medicines, notes });
    await prescription.save();
    res.json(prescription);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPrescriptions = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'patient') query.patient = req.user.id;
    const prescriptions = await Prescription.find(query).populate('appointment doctor', 'date notes name');
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};