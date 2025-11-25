const Aluno = require('../models/aluno');

module.exports = {
    
    async listar(req, res) {
        const alunos = await Aluno.listar();
        res.render('aluno/listar', { alunos });
    },

    async formNovo(req, res) {
        res.render('aluno/novo');
    },

    async criar(req, res) {
        const { nome, idade } = req.body;

        await Aluno.criar({ nome, idade });

        res.redirect('/aluno');
    },

    async formEditar(req, res) {
        const aluno = await Aluno.buscarPorId(req.params.id);
        res.render('aluno/editar', { aluno });
    },

    async editar(req, res) {
        const { nome, idade } = req.body;
        await Aluno.editar(req.params.id, { nome, idade });

        res.redirect('/aluno');
    },

    async deletar(req, res) {
        await Aluno.deletar(req.params.id);
        res.redirect('/aluno');
    }
};
