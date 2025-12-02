const Aluno = require('../models/aluno');
const Curso = require('../models/curso');

module.exports = {
    async listarTodos(req, res) {
        try {
            const alunos = await Aluno.listarComCurso();
            res.render('aluno/listar', { 
                alunos,
                quantidade: alunos.length,
                vazio: alunos.length === 0,
                titulo: 'Alunos Cadastrados'
            });
        } catch (erro) {
            console.error('Erro ao listar alunos:', erro.message);
            req.flash('error', 'Não conseguimos carregar a lista de alunos. Tente novamente.');
            res.redirect('/');
        }
    },

    async novoFormulario(req, res) {
        try {
            const cursos = await Curso.listar();
            if (!cursos || cursos.length === 0) {
                req.flash('warning', 'Cadastre um curso antes de adicionar alunos.');
                return res.redirect('/curso');
            }
            res.render('aluno/novo', { 
                cursos,
                titulo: 'Cadastrar Novo Aluno'
            });
        } catch (erro) {
            console.error('Erro ao carregar formulário de aluno:', erro);
            req.flash('error', 'Erro ao acessar o formulário.');
            res.redirect('/aluno');
        }
    },

    async salvar(req, res) {
        try {
            const { nome, idade, curso_id } = req.body;
            if (!nome || !nome.trim()) {
                return res.render('aluno/novo', {
                    erro: 'Digite o nome do aluno',
                    dados: req.body
                });
            }
            if (idade && (idade < 14 || idade > 60)) {
                req.flash('warning', 'Idade fora do intervalo comum. Confirme se está correta.');
            }
            const novoAluno = await Aluno.criar({ 
                nome: nome.trim(), 
                idade, 
                curso_id 
            });
            req.flash('success', `Aluno ${nome} registrado com matrícula ${novoAluno.matricula}`);
            res.redirect('/aluno');
        } catch (erro) {
            console.error('Erro ao criar aluno:', erro);
            req.flash('error', 'Falha ao registrar aluno. Verifique os dados.');
            res.redirect('/aluno/novo');
        }
    },

    async editarFormulario(req, res) {
        try {
            const aluno = await Aluno.buscarPorId(req.params.id);
            if (!aluno) {
                req.flash('error', 'Aluno não encontrado.');
                return res.redirect('/aluno');
            }
            const cursos = await Curso.listar();
            res.render('aluno/editar', { aluno, cursos });
        } catch (erro) {
            console.error('Erro ao abrir edição:', erro);
            req.flash('error', 'Erro ao acessar formulário de edição.');
            res.redirect('/aluno');
        }
    },

    async atualizar(req, res) {
        try {
            const { nome, idade, curso_id } = req.body;
            if (!nome || !nome.trim()) {
                return res.render('aluno/editar', {
                    erro: 'Nome é obrigatório',
                    dados: req.body
                });
            }
            await Aluno.editar(req.params.id, { nome: nome.trim(), idade, curso_id });
            req.flash('success', `Aluno ${nome} atualizado com sucesso!`);
            res.redirect('/aluno');
        } catch (erro) {
            console.error('Erro ao atualizar aluno:', erro);
            req.flash('error', 'Falha ao atualizar aluno. Tente novamente.');
            res.redirect('/aluno');
        }
    },

    async excluir(req, res) {
        try {
            const aluno = await Aluno.buscarPorId(req.params.id);
            if (!aluno) {
                req.flash('error', 'Aluno não encontrado.');
                return res.redirect('/aluno');
            }
            await Aluno.deletar(req.params.id);
            req.flash('success', `Aluno ${aluno.nome} removido do sistema.`);
            res.redirect('/aluno');
        } catch (erro) {
            console.error('Erro ao excluir aluno:', erro);
            req.flash('error', 'Não foi possível remover o aluno.');
            res.redirect('/aluno');
        }
    }
};
