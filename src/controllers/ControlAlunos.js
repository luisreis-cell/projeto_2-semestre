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