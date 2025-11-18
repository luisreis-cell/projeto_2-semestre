const db = require('../database/connection');

const Student = {
    // Método para listar todos os estudantes
    getAll: async () => {
        const [rows] = await db.query("SELECT * FROM students");
        return rows;
    },

    // Método para obter um estudante por ID
    getById: async (id) => {
        const [rows] = await db.query("SELECT * FROM students WHERE id = ?", [id]);
        return rows[0];
    },

    // Método de CRIAÇÃO: AGORA INCLUI 'telefone' e espera um objeto
    create: async (studentData) => {
        // Assume que studentData contém { nome, email, telefone }
        const { nome, email, telefone } = studentData; 
        
        // Ajuste o SQL para a sua estrutura de tabela
        const [result] = await db.query(
            "INSERT INTO students (name, email, phone) VALUES (?, ?, ?)",
            [nome, email, telefone]
        );
        return result.insertId;
    },

    // Método para listar estudantes com seus cursos (necessário para corrigir o TypeError)
    listWithCourses: async () => {
        const query = `
            SELECT
              s.id AS student_id,
              s.name AS student_name,
              s.email AS student_email,
              c.id AS course_id,
              c.name AS course_name
            FROM students s
            LEFT JOIN student_courses sc ON s.id = sc.student_id
            LEFT JOIN courses c ON sc.course_id = c.id
            ORDER BY s.id;
        `;
        const [rows] = await db.query(query);
        return rows;
    },

    // Método para deletar um estudante
    delete: async (id) => {
        const [result] = await db.query("DELETE FROM students WHERE id = ?", [id]);
        return result.affectedRows;
    },
    
    // Método para buscar estudante por ID (renomeado de 'getById' para 'findById' para o Controller)
    findById: async (id) => {
        const [rows] = await db.query("SELECT * FROM students WHERE id = ?", [id]);
        return rows[0];
    },
    
    // Método de atualização (completo para referência)
    update: async (id, nome, email, telefone) => {
        const [result] = await db.query(
            "UPDATE students SET name = ?, email = ?, phone = ? WHERE id = ?",
            [nome, email, telefone, id]
        );
        return result.affectedRows;
    },
    
    // Método para remover (completo para referência)
    remove: async (id) => {
        const [result] = await db.query("DELETE FROM students WHERE id = ?", [id]);
        return result.affectedRows;
    }
};

module.exports = Student;