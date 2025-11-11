const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.listUsers);
router.get('/:id', userController.getUserById);
router.post('/register', userController.createUser);
router.get('/:id/delete', userController.deleteUser);

module.exports = router;
