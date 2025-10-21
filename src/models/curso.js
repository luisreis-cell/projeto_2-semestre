const db = require('../config/db');

module.exports = {
  async findByDuration(duracao) {
    const [rows] = await db.execute(
      'SELECT * FROM Cursos WHERE duracao = ?', [duracao]
    );
    return rows;
  }
};