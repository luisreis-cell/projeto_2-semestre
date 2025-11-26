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
  
