const Aluno = require('../models/aluno');
const Curso = require('../models/curso');

module.exports = {

    async listar(req, res) {
        try {
            let alunos = await Aluno.listarComCurso();
            res.render('aluno/listar', { alunos });
        } catch (err) {
            console.log('deu pau na listagem:', err);
            res.status(500).send("Erro ao listar alunos.");
        }
    },

    async novoAluno(req, res) {
        try {
            let cursos = await Curso.listar();
            res.render('aluno/novo', { cursos });
        } catch (err) {
            res.status(500).send("Erro no form novo aluno.");
        }
    },

    async criar(req, res) {
        try {
            let { nome, idade, curso_id } = req.body;
            
            await Aluno.criar({ nome, idade, curso_id });
            
            req.flash('success', 'Aluno cadastrado!');
            res.redirect('/aluno');
        } catch (err) {
            console.error('Erro criando aluno:', err);
            res.status(500).send("Erro ao criar aluno.");
        }
    },

    async editarForm(req, res) {
        try {
            let aluno = await Aluno.buscarPorId(req.params.id);
            let cursos = await Curso.listar();
            
            res.render('aluno/editar', { aluno, cursos });
        } catch (err) {
            res.status(500).send("Erro abrindo edição.");
        }
    },

    async atualizar(req, res) {
        try {
            let dados = req.body;
            await Aluno.editar(req.params.id, dados);
            
            req.flash('success', 'Aluno atualizado ok.');
            res.redirect('/aluno');
        } catch (err) {
            res.status(500).send("Erro ao salvar alterações.");
        }
    },

    async remover(req, res) {
        try {
            await Aluno.deletar(req.params.id);
            req.flash('success', 'Aluno removido.');
            res.redirect('/aluno');
        } catch (err) {
            console.log('Erro deletando:', err);
            res.status(500).send("Erro ao excluir.");
        }
    }
};
