const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const { verificarAutenticacao } = require('../middleware/auth');

router.get('/', verificarAutenticacao, alunoController.listarTodos);
router.get('/novo', verificarAutenticacao, alunoController.novoFormulario);
router.post('/novo', verificarAutenticacao, alunoController.salvar);
router.get('/:id/editar', verificarAutenticacao, alunoController.editarFormulario);
router.post('/:id/editar', verificarAutenticacao, alunoController.atualizar)
router.get('/:id/excluir', verificarAutenticacao, alunoController.excluir);
module.exports = router;
