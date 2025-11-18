const express = require('express');
const router = express.Router();
const matriculaController = require('../controllers/matriculaController');

// Rota GET para /matricula: Exibe a lista de matrículas (se listMatriculas existir)
router.get('/', matriculaController.listMatriculas);

// Rota GET para /matricula/form: Exibe o formulário de matrícula
router.get('/form', matriculaController.showMatriculaForm); 

// Rota POST para /matricula/form: Processa o envio do formulário de matrícula
router.post('/form', matriculaController.createMatricula);

module.exports = router;