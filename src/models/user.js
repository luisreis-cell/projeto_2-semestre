const db = require('../../config/db');

async function getUsers() {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
}

module.exports = { getUsers };


module.exports = {
  async create(name, email, hash, tipo = 'aluno') {
    const [result] = await db.execute(
      'INSERT INTO Usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
      [name, email, hash, tipo]
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM Usuarios WHERE email = ?', [email]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM Usuarios WHERE id = ?', [id]);
    return rows[0];
  },

  async list() {
    const [rows] = await db.execute('SELECT id, nome, email, tipo FROM Usuarios');
    return rows;
  },

  async update(id, name, email, tipo) {
    await db.execute(
      'UPDATE Usuarios SET nome = ?, email = ?, tipo = ? WHERE id = ?',
      [name, email, tipo, id]
    );
  },

  async updatePassword(id, newHash) {
    await db.execute(
      'UPDATE Usuarios SET senha = ? WHERE id = ?',
      [newHash, id]
    );
  },

  async remove(id) {
    await db.execute('DELETE FROM Usuarios WHERE id = ?', [id]);
  }
};
module.exports = {
  async update(id, name, email, tipo) {
    await db.execute('UPDATE Usuarios SET nome=?, email=?, tipo=? WHERE id=?', [name, email, tipo, id]);
  }
};
