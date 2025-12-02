const Curso = require('../models/curso');

module.exports = {

    async listar(req, res) {
        try {
            const cursosDisponiveis = await Curso.listar();
            res.render('curso/listar', { cursos: cursosDisponiveis });
        } catch (error) {
            res.status(500).send("Erro ao listar cursos.");
        }
    },

    async mostrarFormularioNovo(req, res) {
        try {
            res.render('curso/novo');
        } catch (error) {
            res.status(500).send("Erro ao abrir formulário de novo curso.");
        }
    },

    async criar(req, res) {
        try {
            const { nome, descricao, duracao_meses } = req.body;

            await Curso.criar({
                nome,
                descricao,
                duracao_meses: Number(duracao_meses)
            });

            req.flash('success', 'Curso criado com sucesso.');
            res.redirect('/curso');
        } catch (error) {
            res.status(500).send("Erro ao criar curso.");
        }
    },

    async mostrarFormularioEditar(req, res) {
        try {
            const cursoParaEditar = await Curso.buscarPorId(req.params.id);
            res.render('curso/editar', { curso: cursoParaEditar });
        } catch (error) {
            res.status(500).send("Erro ao abrir formulário de edição.");
        }
    },
    async editar(req, res) {
        try {
            const { nome, descricao, duracao_meses } = req.body;

            await Curso.editar(req.params.id, {
                nome,
                descricao,
                duracao_meses: Number(duracao_meses)
            });

            req.flash('success', 'Curso atualizado com sucesso.');
            res.redirect('/curso');
        } catch (error) {
            res.status(500).send("Erro ao editar curso.");
        }
    },
    async deletar(req, res) {
        try {
            await Curso.deletar(req.params.id);
            req.flash('success', 'Curso excluído com sucesso.');
            res.redirect('/curso');
        } catch (error) {
            res.status(500).send("Erro ao excluir curso.");
        }
    }
};
