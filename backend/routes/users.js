const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

router.get('/', auth, roleAuth(['admin']), userController.getUsers);
router.post('/', auth, roleAuth(['admin']), userController.createUser);
router.put('/:id', auth, roleAuth(['admin']), userController.updateUser);
router.delete('/:id', auth, roleAuth(['admin']), userController.deleteUser);

module.exports = router;