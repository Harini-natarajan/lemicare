const express = require('express');
const reportController = require('../controllers/reportController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

router.get('/revenue', auth, roleAuth(['admin']), reportController.getRevenueReport);
router.get('/doctor-billing', auth, roleAuth(['admin']), reportController.getDoctorWiseBilling);
router.get('/pharmacy-sales', auth, roleAuth(['admin']), reportController.getPharmacySales);

module.exports = router;