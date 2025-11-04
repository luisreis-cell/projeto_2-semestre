//students.js
const db = require('../config/db');

module.exports = {
  async listWithCourses() {
    const [rows] = await db.execute(
      `SELECT a.id, a.nome AS aluno, a.email, c.nome AS curso
       FROM Alunos a
       LEFT JOIN Matriculas m ON a.id = m.aluno_id
       LEFT JOIN Cursos c ON m.curso_id = c.id`
    );
    return rows;
  }
};
const db = require('../config/db');
module.exports = {
  async create(nome, email, telefone) {
    const [resultado] = await db.execute(
      'INSERT INTO Alunos (nome, email, telefone) VALUES (?, ?, ?)', [nome, email, telefone]
    );
    return resultado.insertId;
  }
};
