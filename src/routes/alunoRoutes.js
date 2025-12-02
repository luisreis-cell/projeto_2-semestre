const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.get('/aluno', alunoController.listarTodos);
router.get('/aluno/novo', alunoController.novoFormulario);
router.post('/aluno', alunoController.salvar);
router.get('/aluno/editar/:id', alunoController.editarFormulario);
router.post('/aluno/:id', alunoController.atualizar);
router.post('/aluno/deletar/:id', alunoController.excluir);

module.exports = router;
