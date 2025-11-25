const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.get('/', alunoController.listar);
router.get('/novo', alunoController.formNovo);
router.post('/novo', alunoController.criar);
router.get('/:id/editar', alunoController.formEditar);
router.post('/:id/editar', alunoController.editar);
router.get('/:id/deletar', alunoController.deletar);

module.exports = router;
