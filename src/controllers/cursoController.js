const Curso = require('../models/curso');

module.exports = {
  async listar(req, res) {
    try {
      let cursos = await Curso.listarTodos();
      res.render('curso/listar', { cursos });
    } catch (err) {
      console.log('erro listando cursos:', err);
      res.status(500).send("Erro ao listar cursos.");
    }
  },

  async formNovo(req, res) {
    try {
      res.render('curso/novo');
    } catch (err) {
      res.status(500).send("Erro no form novo.");
    }
  },

  async criar(req, res) {
    try {
      let { nome, descricao, duracao_meses } = req.body;
      await Curso.criar({ nome, descricao, duracao_meses });
      req.flash('success', 'Curso cadastrado!');
      res.redirect('/curso');
    } catch (err) {
      console.error('falha criando curso:', err);
      res.status(500).send("Erro ao criar curso.");
    }
  },

  async editarForm(req, res) {
    try {
      let curso = await Curso.buscarPorId(req.params.id);
      res.render('curso/editar', { curso });
    } catch (err) {
      res.status(500).send("Erro abrindo edição.");
    }
  },

  async atualizar(req, res) {
    try {
      let { nome, descricao, duracao_meses } = req.body;
      await Curso.atualizar(req.params.id, { nome, descricao, duracao_meses }); 
      req.flash('success', 'Curso atualizado!');
      res.redirect('/curso');
    } catch (err) {
      res.status(500).send("Erro salvando curso.");
    }
  },

  async remover(req, res) {
    try {
      await Curso.excluir(req.params.id); 
      req.flash('success', 'Curso deletado.');
      res.redirect('/curso');
    } catch (err) {
      console.log('deu erro removendo:', err);
      res.status(500).send("Erro ao excluir curso.");
    }
  }
};
