const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
router.get('/', alunoController.listar);   
router.get('/novo', alunoController.formNovo);   
router.post('/novo', alunoController.criar);   
router.get('/editar/:id', alunoController.formEditar);
router.post('/editar/:id', alunoController.editar);   
router.get('/deletar/:id', alunoController.deletar);   

module.exports = router;
