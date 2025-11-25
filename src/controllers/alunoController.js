const Aluno = require('../models/aluno');

exports.create = (req, res) => {
    const { nome, curso_id } = req.body;
    Aluno.create(nome, curso_id)
        .then(result => res.redirect('/alunos'))
        .catch(err => res.status(500).send(err));
};
