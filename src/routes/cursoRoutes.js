const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const auth = require('../middleware/auth');

router.get('/', auth.ensureRole(['admin','professor']), cursoController.listarComAlunos);
router.get('/novo', auth.ensureRole('admin'), cursoController.formNovo);
router.post('/novo', auth.ensureRole('admin'), cursoController.criar);
router.get('/:id/editar', auth.ensureRole('admin'), cursoController.formEditar);
router.post('/:id/editar', auth.ensureRole('admin'), cursoController.editar);
router.get('/:id/deletar', auth.ensureRole('admin'), cursoController.deletar);

module.exports = router;
