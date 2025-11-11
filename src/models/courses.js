const db = require('../config/db');

module.exports = {
  async findByDuration(duracao) {
    const [rows] = await db.execute(
      'SELECT * FROM Cursos WHERE duracao = ?', [duracao]
    );
    return rows;
  }
};
const db = require('../config/db');
module.exports = {
  async create(nome, descricao, duracao, data_inicio, data_fim) {
    const [result] = await db.execute(
      'INSERT INTO Cursos (nome, descricao, duracao, data_inicio, data_fim) VALUES (?, ?, ?, ?, ?)',
      [nome, descricao, duracao, data_inicio, data_fim]
    );
    return result.insertId;
  }
};
