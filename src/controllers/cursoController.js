const Curso = require('../models/curso');

module.exports = {

    async listar(req, res) {
        const cursos = await Curso.listar();
        res.render('curso/listar', { cursos });
    },

    async formNovo(req, res) {
        res.render('curso/novo');
    },

    async criar(req, res) {
        const { nome, descricao, duracao_meses } = req.body;

        await Curso.criar({ nome, descricao, duracao_meses: Number(duracao_meses) });

        req.flash('success', 'Curso criado com sucesso.');
        res.redirect('/curso');
    },

    async formEditar(req, res) {
        const curso = await Curso.buscarPorId(req.params.id);
        res.render('curso/editar', { curso });
    },

    async editar(req, res) {
        const { nome, descricao, duracao_meses } = req.body;

        await Curso.editar(req.params.id, { nome, descricao, duracao_meses: Number(duracao_meses) });

        req.flash('success', 'Curso atualizado com sucesso.');
        res.redirect('/curso');
    },

    async deletar(req, res) {
        await Curso.deletar(req.params.id);
        req.flash('success', 'Curso excluído.');
        res.redirect('/curso');
    }
};
