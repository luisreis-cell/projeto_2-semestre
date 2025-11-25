const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

router.get('/', cursoController.listar);
router.get('/novo', cursoController.formNovo);
router.post('/novo', cursoController.criar);
router.get('/editar/:id', cursoController.formEditar);
router.post('/editar/:id', cursoController.editar);
router.get('/deletar/:id', cursoController.deletar);

module.exports = router;
