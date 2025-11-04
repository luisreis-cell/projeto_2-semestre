const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
  // Exibe formulário de login
  showLogin(req, res) {
    res.render('auth/login');
  },

  // Exibe formulário de registro
  showRegister(req, res) {
    res.render('auth/register');
  },

  // Registrar usuário
  async register(req, res) {
    const { name, email, password, tipo } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create(name, email, hash, tipo);
    res.redirect('/auth/login');
  },

  // Login
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (user && await bcrypt.compare(password, user.senha)) {
      req.session.userId = user.id;
      req.session.userName = user.nome;
      req.session.userTipo = user.tipo;
      res.redirect('/');
    } else {
      res.render('auth/login', { error: 'Email ou senha inválidos.' });
    }
  },

  // Logout
  logout(req, res) {
    req.session.destroy();
    res.redirect('/auth/login');
  },

  // Exibir perfil do usuário logado
  async profile(req, res) {
    const user = await User.findById(req.session.userId);
    res.render('users/profile', { user });
  },

  // Editar perfil
  async editForm(req, res) {
    const user = await User.findById(req.session.userId);
    res.render('users/profile', { user });
  },

  async update(req, res) {
    const { id, name, email, tipo } = req.body;
    await User.update(id, name, email, tipo);
    res.redirect('/users/profile');
  },

  // Remover usuário
  async remove(req, res) {
    await User.remove(req.params.id);
    res.redirect('/users');
  },

  // Listar todos os usuários
  async list(req, res) {
    const users = await User.list();
    res.render('users/list', { users });
  }
};
