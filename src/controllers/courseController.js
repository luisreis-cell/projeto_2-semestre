const Course = require('../models/courses');
const db = require('../config/db');

module.exports = {
  // Busca cursos por duração
  async listByDuration(req, res) {
    const { duracao } = req.query;
    const courses = await Course.findByDuration(duracao);
    res.render('courses/list', { courses });
  },

  // Lista todos os cursos (CORRIGIDO: Chamada direta ao Model)
  async list(req, res) {
    const courses = await Course.list(); 
    res.render('courses/list', { courses });
  },

  // Exibe formulário
  showForm(req, res) {
    res.render('courses/form');
  },

  // Criação de curso (Chamando o método do Model)
  async create(req, res) {
    const { nome, descricao, duracao, data_inicio, data_fim } = req.body;
    await Course.create(nome, descricao, duracao, data_inicio, data_fim);
    res.redirect('/courses');
  },

  // Cria ou atualiza curso
  async createOrUpdate(req, res) {
    const { id, nome, descricao, duracao, data_inicio, data_fim } = req.body;
    if (id) {
      await Course.update(id, nome, descricao, duracao, data_inicio, data_fim);
    } else {
      await Course.create(nome, descricao, duracao, data_inicio, data_fim);
    }
    res.redirect('/courses');
  },

  // Remove curso (CONTÉM LÓGICA DE BANCO DE DADOS DIRETA - REVER)
  async remove(req, res) {
    const [matriculas] = await db.execute(
      'SELECT * FROM Matriculas WHERE curso_id = ?', [req.params.id]
    );
    if (matriculas.length > 0) {
      // Recarrega a lista para mostrar a mensagem de erro
      return res.render('courses/list', { 
        error: 'Não é possível excluir curso com alunos matriculados.', 
        courses: await Course.list() 
      });
    }
    await Course.remove(req.params.id);
    res.redirect('/courses');
  },

  // Exibe detalhes do curso
  async details(req, res) {
    const course = await Course.findById(req.params.id);
    res.render('courses/details', { course });
  }
};