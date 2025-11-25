const pool = require('../config/db');

module.exports = {
    async listar() {
        const [rows] = await pool.query('SELECT id, nome, descricao, duracao_meses, criado_em FROM cursos');
        // adicionar alias carga_horaria para compatibilidade
        return rows.map(r => ({ ...r, carga_horaria: r.duracao_meses }));
    },
    async buscarPorId(id) {
        const [rows] = await pool.query('SELECT id, nome, descricao, duracao_meses FROM cursos WHERE id = ?', [id]);
        const row = rows[0] || null;
        if (!row) return null;
        row.carga_horaria = row.duracao_meses;
        return row;
    },
    async criar({ nome, descricao, duracao_meses = 0 }) {
        // aceitar carga_horaria por compatibilidade
        if (typeof nome === 'object') {
            // noop
        }
        const [result] = await pool.query('INSERT INTO cursos (nome, descricao, duracao_meses) VALUES (?, ?, ?)', [nome, descricao, duracao_meses]);
        return { id: result.insertId, nome, descricao, duracao_meses, carga_horaria: duracao_meses };
    },
    async editar(id, { nome, descricao, duracao_meses }) {
        await pool.query('UPDATE cursos SET nome = ?, descricao = ?, duracao_meses = ? WHERE id = ?', [nome, descricao, duracao_meses, id]);
        return this.buscarPorId(id);
    },
    async deletar(id) {
        await pool.query('DELETE FROM cursos WHERE id = ?', [id]);
        return;
    }
};
