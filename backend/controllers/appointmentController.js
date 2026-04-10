const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
  const { doctor, date, time } = req.body;
  try {
    const appointment = new Appointment({ patient: req.user.id, doctor, date, time });
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'patient') query.patient = req.user.id;
    if (req.user.role === 'doctor') query.doctor = req.user.id;
    const appointments = await Appointment.find(query).populate('patient doctor', 'name');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  try {
    const appointment = await Appointment.findByIdAndUpdate(id, { status, notes }, { new: true });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};