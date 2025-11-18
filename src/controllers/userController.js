const db = require('../config/db');

async function listUsers(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM users'); 
    res.render('users', { users: rows });
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).send('Erro ao buscar usuários');
  }
}

async function getUserById(req, res) {
  const userId = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) {
      return res.status(404).send('Usuário não encontrado');
    }
    res.render('userDetail', { user: rows[0] });
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    res.status(500).send('Erro ao buscar usuário');
  }
}

async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
    res.redirect('/users');
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).send('Erro ao criar usuário');
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    await db.query('DELETE FROM users WHERE id = ?', [userId]);
    res.redirect('/users');
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    res.status(500).send('Erro ao deletar usuário');
  }
}

module.exports = {
  listUsers,
  getUserById,
  createUser,
  deleteUser,
};