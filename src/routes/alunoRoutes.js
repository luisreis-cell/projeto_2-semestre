const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.get('/', alunoController.list);
router.post('/add', alunoController.create);
router.put('/edit/:id', alunoController.update);
router.delete('/delete/:id', alunoController.delete);
module.exports = router;
