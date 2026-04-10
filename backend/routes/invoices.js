const express = require('express');
const invoiceController = require('../controllers/invoiceController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

router.post('/generate', auth, roleAuth(['admin', 'receptionist']), invoiceController.generateInvoice);
router.get('/', auth, roleAuth(['admin', 'receptionist']), invoiceController.getInvoices);

module.exports = router;