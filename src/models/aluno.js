const pool = require('../config/db');

module.exports = {
    // compat: listarComCurso usado pelo controller original
    async listarComCurso() {
        const [rows] = await pool.query(`
            SELECT a.id, a.nome, a.idade, a.matricula, a.email, a.data_nascimento, a.criado_em, c.id AS curso_id, c.nome AS curso_nome
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
    // aceitar both formatos: { nome, idade, curso_id } (forms antigos) ou
    // { nome, matricula, email, curso_id, data_nascimento }
    async criar({ nome, idade = null, matricula = null, email = null, curso_id = null, data_nascimento = null }) {
        // gerar matrícula simples caso não fornecida
        if (!matricula) {
            const ts = Date.now().toString().slice(-6);
            matricula = 'MAT' + ts;
        }

        const [result] = await pool.query('INSERT INTO alunos (nome, idade, matricula, email, curso_id, data_nascimento) VALUES (?, ?, ?, ?, ?, ?)', [nome, idade, matricula, email, curso_id, data_nascimento]);
        return { id: result.insertId, nome, idade, matricula, email, curso_id, data_nascimento };
    },
    async editar(id, { nome, idade = null, matricula = null, email = null, curso_id = null, data_nascimento = null }) {
        await pool.query('UPDATE alunos SET nome = ?, idade = ?, matricula = ?, email = ?, curso_id = ?, data_nascimento = ? WHERE id = ?', [nome, idade, matricula, email, curso_id, data_nascimento, id]);
        return this.buscarPorId(id);
    },
    async deletar(id) {
        await pool.query('DELETE FROM alunos WHERE id = ?', [id]);
        return;
    }
};
