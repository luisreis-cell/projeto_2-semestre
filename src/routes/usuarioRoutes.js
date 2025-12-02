const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verificarAutenticacao, verificarAdmin } = require('../middleware/auth');

router.get('/login', usuarioController.mostrarLogin);
router.post('/login', usuarioController.autenticar);
router.get('/cadastro', usuarioController.mostrarCadastro);
router.post('/cadastro', usuarioController.registrar);
router.get('/logout', verificarAutenticacao, usuarioController.logout);
router.get('/gerenciar', verificarAutenticacao, verificarAdmin, usuarioController.listarTodos);
router.get('/:id/editar', verificarAutenticacao, verificarAdmin, usuarioController.editarFormulario);
router.post('/:id/editar', verificarAutenticacao, verificarAdmin, usuarioController.atualizar);

module.exports = router;
