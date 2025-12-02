const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/login', usuarioController.formLogin);
router.post('/login', usuarioController.login);
router.get('/cadastro', usuarioController.formCadastro);
router.post('/cadastro', usuarioController.cadastrar);
router.get('/logout', usuarioController.logout);

module.exports = router;
