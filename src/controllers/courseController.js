const Course = require('../models/courses');
const db = require('../config/db');

module.exports = {
  async listByDuration(req, res) {
    const { duracao } = req.query;
    const courses = await Course.findByDuration(duracao);
    res.render('courses/list', { courses });
  },

  async list(req, res) {
    const courses = await Course.list ? await Course.list() : [];
    res.render('courses/list', { courses });
  },

  showForm(req, res) {
    res.render('courses/form');
  },

  async create(req, res) {
    const { nome, descricao, duracao, data_inicio, data_fim } = req.body;
    await Course.create(nome, descricao, duracao, data_inicio, data_fim);
    res.redirect('/courses');
  },

  async createOrUpdate(req, res) {
    const { id, nome, descricao, duracao, data_inicio, data_fim } = req.body;
    if (id) {
      await Course.update(id, nome, descricao, duracao, data_inicio, data_fim);
    } else {
      await Course.create(nome, descricao, duracao, data_inicio, data_fim);
    }
    res.redirect('/courses');
  },

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

  async details(req, res) {
    const course = await Course.findById(req.params.id);
    res.render('courses/details', { course });
  }
};
