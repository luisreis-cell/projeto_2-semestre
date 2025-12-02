const Aluno = require('../models/aluno');
const Curso = require('../models/curso');

module.exports = {

    async listar(req, res) {
        try {
            const alunosComCursos = await Aluno.listarComCurso();
            res.render('aluno/listar', { alunos: alunosComCursos });
        } catch (error) {
            res.status(500).send("Erro ao listar alunos.");
        }
    },

    async mostrarFormularioNovo(req, res) {
        try {
            const listaCursos = await Curso.listar();
            res.render('aluno/novo', { cursos: listaCursos });
        } catch (error) {
            res.status(500).send("Erro ao abrir formulário de novo aluno.");
        }
    },

    async criar(req, res) {
        try {
            const { nome, idade, curso_id } = req.body;
            await Aluno.criar({ nome, idade, curso_id });
            req.flash('success', 'Aluno criado com sucesso.');
            res.redirect('/aluno');
        } catch (error) {
            res.status(500).send("Erro ao criar aluno.");
        }
    },

    async mostrarFormularioEditar(req, res) {
        try {
            const alunoParaEditar = await Aluno.buscarPorId(req.params.id);
            const listaCursos = await Curso.listar();

            res.render('aluno/editar', { aluno: alunoParaEditar, cursos: listaCursos });
        } catch (error) {
            res.status(500).send("Erro ao abrir formulário de edição.");
        }
    },

    async editar(req, res) {
        try {
            const { nome, idade, curso_id } = req.body;
            await Aluno.editar(req.params.id, { nome, idade, curso_id });
            req.flash('success', 'Aluno atualizado com sucesso.');
            res.redirect('/aluno');
        } catch (error) {
            res.status(500).send("Erro ao editar aluno.");
        }
    },

    async deletar(req, res) {
        try {
            await Aluno.deletar(req.params.id);
            req.flash('success', 'Aluno excluído com sucesso.');
            res.redirect('/aluno');
        } catch (error) {
            res.status(500).send("Erro ao excluir aluno.");
        }
    }
};
