const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Clerk handles registration and login
// router.post('/register', [
//   body('name').notEmpty(),
//   body('email').isEmail(),
//   body('password').isLength({ min: 6 }),
//   body('role').isIn(['patient', 'receptionist', 'pharmacist', 'doctor', 'admin'])
// ], authController.register);

// router.post('/login', authController.login);

router.get('/me', auth, (req, res) => res.json({ user: req.user }));

module.exports = router;