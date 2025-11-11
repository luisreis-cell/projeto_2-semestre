const db = require('../database/connection');

const Student = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM students");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM students WHERE id = ?", [id]);
    return rows[0];
  },

  create: async (studentData) => {
    const { name, email } = studentData;
    const [result] = await db.query(
      "INSERT INTO students (name, email) VALUES (?, ?)",
      [name, email]
    );
    return result.insertId;
  },

  delete: async (id) => {
    const [result] = await db.query("DELETE FROM students WHERE id = ?", [id]);
    return result.affectedRows;
  }
};

module.exports = Student;
