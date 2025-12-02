const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

router.get('/', cursoController.listar);            
router.get('/novo', cursoController.formNovo);        
router.post('/', cursoController.criar);             
router.get('/editar/:id', cursoController.editarForm);
router.post('/:id', cursoController.atualizar);       
router.post('/deletar/:id', cursoController.remover); 

module.exports = router;
