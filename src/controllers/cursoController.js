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
        try {
            const totalAlunos = await Curso.contarAlunos(req.params.id);
            if (totalAlunos > 0) {
                req.flash('error', `Não é possível excluir o curso. Existem ${totalAlunos} aluno(s) associado(s) a este curso.`);
                return res.redirect('/curso');
            }
            await Curso.deletar(req.params.id);
            req.flash('success', 'Curso excluído.');
            res.redirect('/curso');
        } catch (erro) {
            res.status(500).send("Erro ao excluir curso.");
        }
    },

    async listarComAlunos(req, res) {
        try {
            const cursos = await Curso.listarComContagemAlunos();
            res.render('curso/listar', { cursos, mostrarContagem: true });
        } catch (erro) {
            res.status(500).send("Erro ao listar cursos.");
        }
    }
};
