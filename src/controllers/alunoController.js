const Aluno = require('../models/aluno');
const Curso = require('../models/curso'); 

module.exports = {

    async listar(req, res) {
        try {
            const alunos = await Aluno.listarComCurso(); // <-- JOIN
            res.render('aluno/listar', { alunos });
        } catch (erro) {
            res.status(500).send("Erro ao listar alunos.");
        }
    },

    async formNovo(req, res) {
        try {
            const cursos = await Curso.listar();
            res.render('aluno/novo', { cursos });
        } catch (erro) {
            res.status(500).send("Erro ao abrir formulário de aluno.");
        }
    },

    async criar(req, res) {
        try {
            const { nome, idade, curso_id } = req.body;

            await Aluno.criar({ nome, idade, curso_id });

            req.flash('success', 'Aluno criado com sucesso.');
            res.redirect('/aluno');
        } catch (erro) {
            res.status(500).send("Erro ao criar aluno.");
        }
    },
    async formEditar(req, res) {
        try {
            const aluno = await Aluno.buscarPorId(req.params.id);
            const cursos = await Curso.listar(); // mantém select preenchido
            res.render('aluno/editar', { aluno, cursos });
        } catch (erro) {
            res.status(500).send("Erro ao abrir formulário de edição.");
        }
    },

    async editar(req, res) {
        try {
            const { nome, idade, curso_id } = req.body;

            await Aluno.editar(req.params.id, { nome, idade, curso_id });

            req.flash('success', 'Aluno atualizado com sucesso.');
            res.redirect('/aluno');
        } catch (erro) {
            res.status(500).send("Erro ao editar aluno.");
        }
    },

    async deletar(req, res) {
        try {
            await Aluno.deletar(req.params.id);
            req.flash('success', 'Aluno excluído.');
            res.redirect('/aluno');
        } catch (erro) {
            res.status(500).send("Erro ao excluir aluno.");
        }
    }
};
