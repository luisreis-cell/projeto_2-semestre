const pool = require('../config/db');

module.exports = {
    async listar() {
        const [rows] = await pool.query('SELECT id, nome, descricao, duracao_meses, criado_em FROM cursos');
        return rows.map(r => ({ ...r, carga_horaria: r.duracao_meses }));
    },
    async listarComContagemAlunos() {
        const [rows] = await pool.query(`
            SELECT c.id, c.nome, c.descricao, c.duracao_meses, c.criado_em, 
                   COUNT(a.id) as total_alunos
            FROM cursos c
            LEFT JOIN alunos a ON c.id = a.curso_id
            GROUP BY c.id, c.nome, c.descricao, c.duracao_meses, c.criado_em
            ORDER BY c.nome
        `);
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
        const [result] = await pool.query('INSERT INTO cursos (nome, descricao, duracao_meses) VALUES (?, ?, ?)', [nome, descricao, duracao_meses]);
        return { id: result.insertId, nome, descricao, duracao_meses, carga_horaria: duracao_meses };
    },
    async editar(id, { nome, descricao, duracao_meses }) {
        await pool.query('UPDATE cursos SET nome = ?, descricao = ?, duracao_meses = ? WHERE id = ?', [nome, descricao, duracao_meses, id]);
        return this.buscarPorId(id);
    },
    async contarAlunos(id) {
        const [rows] = await pool.query('SELECT COUNT(*) as total FROM alunos WHERE curso_id = ?', [id]);
        return rows[0].total || 0;
    },
    async deletar(id) {
        await pool.query('DELETE FROM cursos WHERE id = ?', [id]);
        return;
    }
};
