const Curso = require('../models/curso');

module.exports = {
  async listarTodos(req, res) {
    try {
      const cursos = await Curso.listar();
      
      if (!cursos || cursos.length === 0) {
        req.flash('info', 'Nenhum curso cadastrado ainda.');
      }
      
      res.render('curso/listar', { 
        cursos,
        total: cursos.length, 
        titulo: 'Gerenciar Cursos'
      });
    } catch (erro) {
      console.error('Falha ao listar cursos da base:', erro.message);
      req.flash('error', 'Ops! Não conseguimos carregar os cursos. Tente novamente.');
      res.status(500).redirect('/');
    }
  },
  async novo(req, res) {
    try {
      res.render('curso/novo', { 
        titulo: 'Novo Curso',
        acao: 'criar'
      });
    } catch (erro) {
      console.error('Erro ao renderizar formulário:', erro);
      res.status(500).send('Não foi possível acessar o formulário.');
    }
  },

  async criar(req, res) {
    try {
      let { nome, descricao, duracao_meses } = req.body;

      if (!nome || !nome.trim()) {
        return res.render('curso/novo', { 
          erro: 'Nome do curso é obrigatório',
          dados: req.body
        });
      }
        
      duracao_meses = parseInt(duracao_meses, 10);
      if (isNaN(duracao_meses) || duracao_meses <= 0) {
        return res.render('curso/novo', { 
          erro: 'Duração deve ser um número positivo',
          dados: req.body
        });
      }
      
      await Curso.criar({ nome: nome.trim(), descricao, duracao_meses });
      
      req.flash('success', `Curso "${nome}" criado com sucesso!`);
      res.redirect('/curso');
    } catch (erro) {
      console.error('Erro ao criar curso:', erro);

      if (erro.code === 'ER_DUP_ENTRY') {
        req.flash('error', 'Já existe um curso com esse nome.');
        return res.redirect('/curso/novo');
      }
      
      req.flash('error', 'Algo deu errado ao salvar o curso. Verifique os dados.');
      res.redirect('/curso/novo');
    }
  }
};
