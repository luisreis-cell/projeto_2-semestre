const pool = require('../config/db');

module.exports = {
  async listar() {
    const [usuarios] = await pool.query(
      'SELECT id, nome, email, papel, criado_em FROM usuarios ORDER BY nome'
    );
    return usuarios;
  },

  async buscarPorId(id) {
    if (!id) return null;
    const [usuarios] = await pool.query(
      'SELECT id, nome, email, senha, papel, criado_em FROM usuarios WHERE id = ?',
      [id]
    );

    return usuarios[0] || null;
  },

  async buscarPorEmail(email) {
    if (!email) return null;

    const emailNormalizado = email.toLowerCase().trim();
    const [usuarios] = await pool.query(
      'SELECT id, nome, email, senha, papel, criado_em FROM usuarios WHERE LOWER(email) = ?',
      [emailNormalizado]
    );

    return usuarios[0] || null;
  },

  async criar(dados) {
    const { nome, email, senha, papel = 'usuario' } = dados;

    if (!nome || !email || !senha) {
      throw new Error('Nome, email e senha são obrigatórios');
    }

    const existente = await this.buscarPorEmail(email);
    if (existente) {
      throw new Error(`Email ${email} já está cadastrado no sistema`);
    }

    const emailNormalizado = email.toLowerCase().trim();

    const [resultado] = await pool.query(
      'INSERT INTO usuarios (nome, email, senha, papel, criado_em) VALUES (?, ?, ?, ?, NOW())',
      [nome.trim(), emailNormalizado, senha, papel]
    );

    return {
      id: resultado.insertId,
      nome,
      email: emailNormalizado,
      papel
    };
  },

  async atualizar(id, dados) {
    const { nome, papel } = dados;

    const usuarioExistente = await this.buscarPorId(id);
    if (!usuarioExistente) {
      throw new Error(`Usuário #${id} não encontrado`);
    }

    await pool.query(
      'UPDATE usuarios SET nome = ?, papel = ? WHERE id = ?',
      [nome.trim(), papel, id]
    );

    return this.buscarPorId(id);
  },

  async alterarSenha(id, novaSenha) {
    const usuario = await this.buscarPorId(id);
    if (!usuario) {
      throw new Error(`Usuário #${id} não encontrado`);
    }

    await pool.query(
      'UPDATE usuarios SET senha = ? WHERE id = ?',
      [novaSenha, id]
    );

    return true;
  }
};
