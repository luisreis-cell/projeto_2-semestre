const db = require('../config/db');
module.exports = {
  async updateEnrollment(aluno_id, curso_id) {
    await db.execute(
      'UPDATE Matriculas SET curso_id=? WHERE aluno_id=?', [curso_id, aluno_id]
    );
  },
  async listCourses() {
    const [rows] = await db.execute('SELECT * FROM Cursos');
    return rows;
  },
  async getEnrollment(aluno_id) {
    const [rows] = await db.execute(
      'SELECT * FROM Matriculas WHERE aluno_id=?', [aluno_id]
    );
    return rows[0];
  }
};