const pool = require('../config/db');

module.exports = {
    // compat: listarComCurso usado pelo controller original
    async listarComCurso() {
        const [rows] = await pool.query(`
            SELECT a.id, a.nome, a.idade, a.matricula, c.id AS curso_id, c.nome AS curso_nome
            FROM alunos a
            LEFT JOIN cursos c ON a.curso_id = c.id
            ORDER BY a.nome
        `);
        return rows;
    },
    async listar() {
        return this.listarComCurso();
    },
    async buscarPorId(id) {
        const [rows] = await pool.query('SELECT * FROM alunos WHERE id = ?', [id]);
        return rows[0] || null;
    },
    // aceitar formato: { nome, idade, curso_id } (forms antigos) ou
    // { nome, matricula, curso_id }
    async criar({ nome, idade = null, matricula = null, curso_id = null }) {
        // gerar matrícula simples caso não fornecida
        if (!matricula) {
            const ts = Date.now().toString().slice(-6);
            matricula = 'MAT' + ts;
        }

        const [result] = await pool.query('INSERT INTO alunos (nome, idade, matricula, curso_id) VALUES (?, ?, ?, ?)', [nome, idade, matricula, curso_id]);
        return { id: result.insertId, nome, idade, matricula, curso_id };
    },
    async editar(id, { nome, idade = null, matricula = null, curso_id = null }) {
        await pool.query('UPDATE alunos SET nome = ?, idade = ?, matricula = ?, curso_id = ? WHERE id = ?', [nome, idade, matricula, curso_id, id]);
        return this.buscarPorId(id);
    },
    async deletar(id) {
        await pool.query('DELETE FROM alunos WHERE id = ?', [id]);
        return;
    }
};
