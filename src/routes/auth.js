// src/routes/auth.js
const express = require('express');
const router = express.Router();

// A ÚNICA LINHA QUE MUDA: Tentar corrigir o caminho.
// Se o seu authController.js está em '../controllers/authController.js'
const authController = require('../controllers/authController');

// As rotas agora usam o controller de autenticação
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;