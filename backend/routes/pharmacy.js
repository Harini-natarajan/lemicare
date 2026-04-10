const express = require('express');
const pharmacyController = require('../controllers/pharmacyController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

router.get('/medicines', auth, roleAuth(['pharmacist', 'patient', 'admin']), pharmacyController.getMedicines);
router.post('/medicines', auth, roleAuth(['admin', 'pharmacist']), pharmacyController.createMedicine);
router.put('/medicines/:id', auth, roleAuth(['admin', 'pharmacist']), pharmacyController.updateMedicine);
router.delete('/medicines/:id', auth, roleAuth(['admin']), pharmacyController.deleteMedicine);
router.post('/bill', auth, roleAuth(['pharmacist']), pharmacyController.createPharmacyBill);

module.exports = router;