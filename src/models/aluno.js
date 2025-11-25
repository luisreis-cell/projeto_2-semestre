
const db = require('../config/db');

const Aluno = {
    create: (nome, curso_id) => {
        const query = 'INSERT INTO alunos (nome, curso_id) VALUES (?, ?)';
        return db.promise().execute(query, [nome, curso_id]);
    },

    findAll: () => {
        const query = 'SELECT alunos.nome, cursos.nome AS curso FROM alunos JOIN cursos ON alunos.curso_id = cursos.id';
        return db.promise().query(query);
    },

    update: (id, nome, curso_id) => {
        const query = 'UPDATE alunos SET nome = ?, curso_id = ? WHERE id = ?';
        return db.promise().execute(query, [nome, curso_id, id]);
    },

    delete: (id) => {
        const query = 'DELETE FROM alunos WHERE id = ?';
        return db.promise().execute(query, [id]);
    }
};

module.exports = Aluno;
