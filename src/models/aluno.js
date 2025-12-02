const pool = require('../config/db');

module.exports = {

  async listarComCurso() {
    const [alunos] = await pool.query(`
      SELECT 
        a.id, 
        a.nome, 
        a.idade, 
        a.matricula, 
        a.email, 
        a.data_nascimento, 
        a.criado_em,
        c.id AS curso_id,
        c.nome AS curso_nome
      FROM alunos a
      LEFT JOIN cursos c ON a.curso_id = c.id
      ORDER BY a.nome
    `);
    return alunos;
  },

  async buscarPorId(id) {
    const [alunos] = await pool.query(
      'SELECT * FROM alunos WHERE id = ?', 
      [id]
    );
    return alunos[0] || null;
  },

  async criar(dados) {
    const { nome, idade, matricula, email, curso_id, data_nascimento } = dados;
    const matriculaFinal = matricula || `MAT${Date.now().toString().slice(-6)}`;
    const [resultado] = await pool.query(
      `INSERT INTO alunos 
       (nome, idade, matricula, email, curso_id, data_nascimento) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, idade || null, matriculaFinal, email || null, curso_id || null, data_nascimento || null]
    );
    
    return { 
      id: resultado.insertId, 
      ...dados, 
      matricula: matriculaFinal 
    };
  }
};
