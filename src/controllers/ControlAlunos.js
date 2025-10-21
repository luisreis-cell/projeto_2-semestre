const Student = require('../models/student');

module.exports = {
  async listWithCourses(req, res) {
    const students = await Student.listWithCourses();
    res.render('students/list', { students });
  }
};