const Student = require('../models/student');

module.exports = {
  async listWithCourses(req, res) {
    const students = await Student.listWithCourses();
    res.render('students/list', { students });
  }
};

const Student = require('../models/student');

module.exports = {
  async remove(req, res) {
    await Student.remove(req.params.id);
    res.redirect('/students');
  }
};
const Student = require('../models/student');

module.exports = {
  showForm(req, res) {
    res.render('students/form');
  },
  async create(req, res) {
    const { nome, email, telefone } = req.body;
    await Student.create(nome, email, telefone);
    res.redirect('/students');
  }
};