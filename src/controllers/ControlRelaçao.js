const Enrollment = require('../models/enrollment');

module.exports = {
  async editForm(req, res) {
    const aluno_id = req.params.id;
    const enrollment = await Enrollment.getEnrollment(aluno_id);
    const courses = await Enrollment.listCourses();
    res.render('enrollments/form', { aluno_id, enrollment, courses });
  },
  async update(req, res) {
    const { aluno_id, curso_id } = req.body;
    await Enrollment.updateEnrollment(aluno_id, curso_id);
    res.redirect('/students');
  }
};