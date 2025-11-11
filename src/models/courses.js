const db = require('../config/db');

class Course {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM courses');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { name, description } = data;
    await db.query('INSERT INTO courses (name, description) VALUES (?, ?)', [name, description]);
  }

  static async delete(id) {
    await db.query('DELETE FROM courses WHERE id = ?', [id]);
  }
}

module.exports = Course;
