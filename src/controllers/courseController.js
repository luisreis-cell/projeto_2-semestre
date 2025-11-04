const Course = require('../models/course');
const db = require('../config/db');

module.exports = {
  // Listar cursos por duração
  async listByDuration(req, res) {
    const { duracao } = req.query;
    const courses = await Course.findByDuration(duracao);
    res.render('courses/list', { courses });
  },

  // Listar todos os cursos
  async list(req, res) {
    const courses = await Course.list ? await Course.list() : [];
    res.render('courses/list', { courses });
  },

  // Exibir formulário de cadastro
  showForm(req, res) {
    res.render('courses/form');
  },

  // Criar curso
  async create(req, res) {
    const { nome, descricao, duracao, data_inicio, data_fim } = req.body;
    await Course.create(nome, descricao, duracao, data_inicio, data_fim);
    res.redirect('/courses');
  },

  // Criar ou atualizar curso
  async createOrUpdate(req, res) {
    const { id, nome, descricao, duracao, data_inicio, data_fim } = req.body;
    if (id) {
      await Course.update(id, nome, descricao, duracao, data_inicio, data_fim);
    } else {
      await Course.create(nome, descricao, duracao, data_inicio, data_fim);
    }
    res.redirect('/courses');
  },

  // Remover curso
  async remove(req, res) {
    const [matriculas] = await db.execute(
      'SELECT * FROM Matriculas WHERE curso_id = ?', [req.params.id]
    );
    if (matriculas.length > 0) {
      return res.render('courses/list', { 
        error: 'Não é possível excluir curso com alunos matriculados.', 
        courses: await Course.list() 
      });
    }
    await Course.remove(req.params.id);
    res.redirect('/courses');
  },

  // Detalhes do curso
  async details(req, res) {
    const course = await Course.findById(req.params.id);
    res.render('courses/details', { course });
  }
};
