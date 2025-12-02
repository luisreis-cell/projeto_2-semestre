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
    if (!id || isNaN(id)) {
      throw new Error('ID do curso inválido');
    }

    const [cursos] = await pool.query(
      'SELECT id, nome, descricao, duracao_meses, criado_em FROM cursos WHERE id = ?',
      [id]
    );

    if (!cursos[0]) {
      return null; 
    }

    return {
      ...cursos[0],
      carga_horaria: cursos[0].duracao_meses
    };
  },

  async criar(dados) {
    const { nome, descricao = '', duracao_meses = 0 } = dados;

    // Validação básica
    if (!nome || !nome.trim()) {
      throw new Error('Nome do curso é obrigatório');
    }

    const [resultado] = await pool.query(
      'INSERT INTO cursos (nome, descricao, duracao_meses, criado_em) VALUES (?, ?, ?, NOW())',
      [nome.trim(), descricao, parseInt(duracao_meses) || 0]
    );

    return {
      id: resultado.insertId,
      nome,
      descricao,
      duracao_meses: parseInt(duracao_meses) || 0,
      carga_horaria: parseInt(duracao_meses) || 0
    };
  },

  async atualizar(id, dados) {
    const { nome, descricao, duracao_meses } = dados;

    const resultado = await this.buscarPorId(id);
    if (!resultado) {
      throw new Error(`Curso #${id} não encontrado`);
    }

    await pool.query(
      'UPDATE cursos SET nome = ?, descricao = ?, duracao_meses = ? WHERE id = ?',
      [nome.trim(), descricao, parseInt(duracao_meses), id]
    );

    return this.buscarPorId(id);
  },

  async excluir(id) {
    const curso = await this.buscarPorId(id);
    if (!curso) {
      throw new Error(`Não é possível excluir: curso #${id} não existe`);
    }

    await pool.query('DELETE FROM cursos WHERE id = ?', [id]);
    return true;
  }
};
