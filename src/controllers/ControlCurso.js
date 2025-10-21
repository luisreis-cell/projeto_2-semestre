const Course = require('../models/course');

module.exports = {
  async listByDuration(req, res) {
    const { duracao } = req.query;
    const courses = await Course.findByDuration(duracao);
    res.render('courses/list', { courses });
  }
};

const Course = require('../models/course');
const db = require('../config/db');

module.exports = {
  async remove(req, res) {
    const [matriculas] = await db.execute(
      'SELECT * FROM Matriculas WHERE curso_id = ?', [req.params.id]
    );
    if (matriculas.length > 0) {
      return res.render('courses/list', { error: 'Não é possível excluir curso com alunos matriculados.', courses: await Course.list() });
    }
    await Course.remove(req.params.id);
    res.redirect('/courses');
  }
};