const db = require('../config/db');

module.exports = {
  async create(name, email, hash) {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash]
    );
    return result.insertId;
  },
  async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  async list() {
    const [rows] = await db.execute('SELECT id, name, email FROM users');
    return rows;
  }
};