const Student = require('../models/student');

module.exports = {
  // Listar estudantes com cursos
  async listWithCourses(req, res) {
    const students = await Student.listWithCourses();
    res.render('students/list', { students });
  },

  // Exibir formulário de cadastro
  showForm(req, res) {
    res.render('students/form');
  },

  // Criar estudante
  async create(req, res) {
    const { nome, email, telefone } = req.body;
    await Student.create(nome, email, telefone);
    res.redirect('/students');
  },

  // Editar estudante
  async editForm(req, res) {
    const student = await Student.findById(req.params.id);
    res.render('students/form', { student });
  },

  async update(req, res) {
    const { id, nome, email, telefone } = req.body;
    await Student.update(id, nome, email, telefone);
    res.redirect('/students');
  },

  // Remover estudante
  async remove(req, res) {
    await Student.remove(req.params.id);
    res.redirect('/students');
  },

  // Detalhes do estudante
  async details(req, res) {
    const student = await Student.findById(req.params.id);
    res.render('students/details', { student });
  }
};
