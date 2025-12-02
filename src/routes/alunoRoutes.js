const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const auth = require('../middleware/auth');

router.get('/', auth.ensureRole(['admin','professor']), alunoController.listar);
router.get('/novo', auth.ensureRole(['admin','professor']), alunoController.formNovo);
router.post('/novo', auth.ensureRole(['admin','professor']), alunoController.criar);
router.get('/:id/editar', auth.ensureRole(['admin','professor']), alunoController.formEditar);
router.post('/:id/editar', auth.ensureRole(['admin','professor']), alunoController.editar);
router.get('/:id/deletar', auth.ensureRole(['admin','professor']), alunoController.deletar);

module.exports = router;
