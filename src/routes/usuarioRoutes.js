const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/login', usuarioController.mostrarTelaLogin);
router.post('/login', usuarioController.processarLogin);
router.get('/cadastro', usuarioController.mostrarTelaCadastro);
router.post('/cadastro', usuarioController.criarUsuario);
router.get('/logout', usuarioController.logout);

module.exports = router;
