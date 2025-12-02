const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const { verificarAutenticacao, verificarAdmin } = require('../middleware/auth');

router.get('/', cursoController.listarTodos);

router.get(
  '/novo',
  verificarAutenticacao,
  verificarAdmin,
  cursoController.novoFormulario
);

router.post(
  '/novo',
  verificarAutenticacao,
  verificarAdmin,
  cursoController.salvar
);

router.get(
  '/:id/editar',
  verificarAutenticacao,
  verificarAdmin,
  cursoController.editarFormulario
);

router.post(
  '/:id/editar',
  verificarAutenticacao,
  verificarAdmin,
  cursoController.atualizar
);

router.get(
  '/:id/excluir',
  verificarAutenticacao,
  verificarAdmin,
  cursoController.excluir
);

module.exports = router;
