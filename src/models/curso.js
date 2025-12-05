const pool = require('../config/db');

module.exports = {

  async listarTodos() {
    const [cursos] = await pool.query(
      'SELECT id, nome, descricao, duracao_meses, criado_em FROM cursos ORDER BY nome'
    );

    return cursos.map(curso => ({
      ...curso,
      carga_horaria: curso.duracao_meses,
      descricao: curso.descricao || 'Sem descrição'
    }));
  },

  async buscarPorId(id) {
    id = Number(id);

    if (!id) {
      throw new Error('ID inválido');
    }

   
