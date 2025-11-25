const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

router.get('/', cursoController.listar);
router.get('/novo', cursoController.formNovo);
router.post('/novo', cursoController.criar);
router.get('/:id/editar', cursoController.formEditar);
router.post('/:id/editar', cursoController.editar);
router.get('/:id/deletar', cursoController.deletar);

module.exports = router;
