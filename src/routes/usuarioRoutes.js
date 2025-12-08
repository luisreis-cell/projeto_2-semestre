const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middleware/auth');

router.get('/login', usuarioController.formLogin);
router.post('/login', usuarioController.login);

router.get('/cadastro', usuarioController.formCadastro);
router.post('/cadastro', usuarioController.cadastrar);

router.get('/logout', usuarioController.logout);

router.get('/', auth.ensureRole('admin'), usuarioController.listar);
router.get('/perfil', auth.ensureAuthenticated, usuarioController.perfil);
router.get('/:id/editar', auth.ensureRole('admin'), usuarioController.formEditar);
router.post('/:id/editar', auth.ensureRole('admin'), usuarioController.editar);
router.get('/:id/deletar', auth.ensureRole('admin'), usuarioController.deletar);

module.exports = router;
