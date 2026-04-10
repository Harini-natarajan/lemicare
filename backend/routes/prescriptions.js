const express = require('express');
const prescriptionController = require('../controllers/prescriptionController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

router.post('/', auth, roleAuth(['doctor']), prescriptionController.createPrescription);
router.get('/', auth, prescriptionController.getPrescriptions);

module.exports = router;