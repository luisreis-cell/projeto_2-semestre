// src/models/matricula.js
const db = require('../config/db'); // Assumindo que a conexão está em config/db

class Matricula {
    
    // Método para criar uma nova matrícula
    static async create(student_id, course_id, data_matricula) {
        // A data_matricula é opcional na sua chamada, ajuste conforme sua tabela
        const [result] = await db.execute(
            "INSERT INTO matriculas (student_id, course_id, registration_date) VALUES (?, ?, ?)",
            [student_id, course_id, data_matricula]
        );
        return result.insertId;
    }

    // Método para listar todas as matrículas com detalhes de aluno e curso
    static async listAllWithDetails() {
        const query = `
            SELECT 
                m.id AS matricula_id,
                m.registration_date,
                s.name AS student_name,
                c.name AS course_name
            FROM matriculas m
            JOIN students s ON m.student_id = s.id
            JOIN courses c ON m.course_id = c.id
            ORDER BY m.id DESC;
        `;
        const [rows] = await db.execute(query);
        return rows;
    }
    
    // Você pode adicionar outros métodos (delete, findById, etc.)
}

module.exports = Matricula;