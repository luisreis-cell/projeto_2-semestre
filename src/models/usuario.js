const pool = require('../config/db');

module.exports = {
    async listar() {
        const [rows] = await pool.query('SELECT id, nome, email, papel, criado_em FROM usuarios');
        return rows;
    },
    async buscarPorId(id) {
        const [rows] = await pool.query('SELECT id, nome, email, senha, papel FROM usuarios WHERE id = ?', [id]);
        return rows[0] || null;
    },
    async buscarPorEmail(email) {
        const [rows] = await pool.query('SELECT id, nome, email, senha, papel FROM usuarios WHERE email = ?', [email]);
        return rows[0] || null;
    },
    async criar({ nome, email, senha, papel = 'user' }) {
        const [result] = await pool.query('INSERT INTO usuarios (nome, email, senha, papel) VALUES (?, ?, ?, ?)', [nome, email, senha, papel]);
        return { id: result.insertId, nome, email, papel };
    },
    async editar(id, { nome, email, papel }) {
        await pool.query('UPDATE usuarios SET nome = ?, email = ?, papel = ? WHERE id = ?', [nome, email, papel, id]);
        return this.buscarPorId(id);
    },
    async editarSenha(id, senha) {
        await pool.query('UPDATE usuarios SET senha = ? WHERE id = ?', [senha, id]);
        return this.buscarPorId(id);
    },
    async deletar(id) {
        await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
        return;
    }
};
