const db = require('../config/db');

class Course {
    
    // 1. Método list (Correspondente ao getAll ou findAll)
    static async list() {
        // O Controller chama Course.list(). Usaremos findAll como o método principal.
        return this.findAll();
    }
    
    // Método base para listar todos
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM courses');
        return rows;
    }

    // 2. Método findById (Renomeado de 'findById' para corresponder ao Controller)
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
        return rows[0];
    }
    
    // 3. Método findByDuration (Requerido pelo Controller)
    static async findByDuration(duracao) {
        const [rows] = await db.query(
            "SELECT * FROM courses WHERE duration = ?", 
            [duracao]
        );
        return rows;
    }
    
    // 4. Método create (Ajustado para aceitar 5 argumentos, conforme o Controller)
    static async create(nome, descricao, duracao, data_inicio, data_fim) {
        // Se a sua tabela tem as colunas 'name', 'description', 'duration', 'start_date', 'end_date'
        const [result] = await db.query(
            "INSERT INTO courses (name, description, duration, start_date, end_date) VALUES (?, ?, ?, ?, ?)",
            [nome, descricao, duracao, data_inicio, data_fim]
        );
        return result.insertId;
    }
    
    // 5. Método update (Requerido pelo Controller)
    static async update(id, nome, descricao, duracao, data_inicio, data_fim) {
        const [result] = await db.query(
            "UPDATE courses SET name = ?, description = ?, duration = ?, start_date = ?, end_date = ? WHERE id = ?",
            [nome, descricao, duracao, data_inicio, data_fim, id]
        );
        return result.affectedRows;
    }

    // 6. Método remove (Corresponde a 'delete', mas o Controller usa 'remove')
    static async remove(id) {
        // Assumindo que seu Controller está chamando `Course.remove(req.params.id)`
        await this.delete(id); 
    }

    // Método base delete (mantido para clareza)
    static async delete(id) {
        await db.query('DELETE FROM courses WHERE id = ?', [id]);
    }
}

module.exports = Course;