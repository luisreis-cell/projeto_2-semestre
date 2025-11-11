//users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/register', userController.showRegister);
router.post('/register', userController.register);
router.get('/', userController.listUsers);
router.get('/:id/edit', userController.editForm);
router.post('/update', userController.update);
router.get('/profile', userController.profile);
router.get('/:id/delete', userController.remove);

module.exports = router;
