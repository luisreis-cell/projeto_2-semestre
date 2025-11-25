const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth.ensureAuthenticated, (req, res) => {
  const papel = req.session.usuario && req.session.usuario.papel;
  if (papel === 'admin') return res.render('painel/admin');
  if (papel === 'professor') return res.render('painel/professor');
  return res.render('painel/aluno');
});

module.exports = router;
