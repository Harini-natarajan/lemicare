const express = require('express');
const billController = require('../controllers/billController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

router.post('/', auth, roleAuth(['receptionist', 'pharmacist']), billController.createBill);
router.get('/', auth, billController.getBills);
router.put('/:id', auth, roleAuth(['receptionist']), billController.updateBillStatus);

module.exports = router;