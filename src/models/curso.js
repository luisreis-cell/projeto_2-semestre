const pool = require('../config/db');

module.exports = {
    async listar() {
        const [rows] = await pool.query(
          'SELECT id, nome, descricao, duracao_meses, criado_em FROM cursos'
        );
        return rows.map(r => ({ ...r, carga_horaria: r.duracao_meses }));
    },
    
    async buscarPorId(id) {
        const [rows] = await pool.query(
          'SELECT id, nome, descricao, duracao_meses FROM cursos WHERE id = ?',
          [id]
        );
  
      const row = rows[0] || null;
        if (!row) return null;
        row.carga_horaria = row.duracao_meses;
        return row;
    },

    async criar({ nome, descricao, duracao_meses = 0 }) {
        const [result] = await pool.query(
          'INSERT INTO cursos (nome, descricao, duracao_meses) VALUES (?, ?, ?)',
          [nome, descricao, duracao_meses]
        );
        return { id: result.insertId, nome, descricao, duracao_meses, carga_horaria: duracao_meses };
    },

   
