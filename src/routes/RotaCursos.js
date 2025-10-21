const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Cadastro de curso (formulário)
router.get('/new', courseController.showForm);
// Cadastro de curso (processar)
router.post('/save', courseController.create);

// Listar cursos
router.get('/', courseController.list);

// Editar curso (formulário)
router.get('/:id/edit', courseController.showForm);
// Editar curso (processar)
router.post('/save', courseController.createOrUpdate);

// Excluir curso (com verificação de alunos associados)
router.get('/:id/delete', courseController.remove);

// Exibir detalhes do curso
router.get('/:id', courseController.details);

module.exports = router;