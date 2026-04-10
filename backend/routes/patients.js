const express = require('express');
const patientController = require('../controllers/patientController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

router.get('/profile', auth, patientController.getProfile);
router.put('/profile', auth, patientController.updateProfile);
router.get('/', auth, roleAuth(['receptionist', 'doctor']), patientController.getAllPatients);

module.exports = router;