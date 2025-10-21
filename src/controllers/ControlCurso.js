const Course = require('../models/course');

module.exports = {
  async listByDuration(req, res) {
    const { duracao } = req.query;
    const courses = await Course.findByDuration(duracao);
    res.render('courses/list', { courses });
  }
};

