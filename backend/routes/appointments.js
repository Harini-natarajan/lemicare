const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

router.post('/', auth, roleAuth(['patient', 'receptionist']), appointmentController.bookAppointment);
router.get('/', auth, appointmentController.getAppointments);
router.put('/:id', auth, roleAuth(['doctor', 'receptionist']), appointmentController.updateAppointment);

module.exports = router;