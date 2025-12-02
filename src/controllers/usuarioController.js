const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

module.exports = {
  
  mostrarTelaLogin(req, res) {
    res.render('login', { 
      titulo: 'Acesso ao Sistema',
      erroAnterior: req.flash('error')[0]
    });
  },

  async processarLogin(req, res) {
    try {
      const { email, senha } = req.body;
      
      if (!email || !senha) {
        return res.render('login', { 
          erro: 'Email e senha são obrigatórios'
        });
      }
      
      const usuario = await Usuario.buscarPorEmail(email);
      if (!usuario) {
        console.log(`[Login] Tentativa com email inexistente: ${email}`);
        return res.render('login', { 
          erro: 'Email ou senha incorretos'
        });
      }
      
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        console.log(`[Login] Senha incorreta para ${email}`);
        return res.render('login', { 
          erro: 'Email ou senha incorretos'
        });
      }
      
      delete usuario.senha;
      req.session.usuario = usuario;
      req.flash('success', `Bem-vindo, ${usuario.nome}!`);
      res.redirect('/aluno');
    } catch (erro) {
      console.error('Erro no processo de autenticação:', erro.message);
      res.render('login', { 
        erro: 'Erro do sistema. Por favor, tente novamente em alguns instantes.'
      });
    }
  },

  mostrarTelaCadastro(req, res) {
    res.render('cadastro', { titulo: 'Criar Conta' });
  },

  async criarUsuario(req, res) {
    try {
      const { nome, email, senha, confirmaSenha } = req.body;
      
      if (!nome || !email || !senha || !confirmaSenha) {
        return res.render('cadastro', {
          erro: 'Todos os campos são obrigatórios',
          email
        });
      }
      
      if (senha !== confirmaSenha) {
        return res.render('cadastro', {
          erro: 'As senhas não conferem',
          email
        });
      }
      
      if (senha.length < 6) {
        return res.render('cadastro', {
          erro: 'Senha deve ter pelo menos 6 caracteres',
          email
        });
      }
      
      const senhaHash = await bcrypt.hash(senha, 10);
      await Usuario.criar({ 
        nome: nome.trim(),
        email: email.toLowerCase().trim(),
        senha: senhaHash,
        papel: 'usuario'
      });
      
      req.flash('success', 'Conta criada com sucesso! Faça login para acessar o sistema.');
      res.redirect('/usuario/login');
    } catch (erro) {
      if (erro.code === 'ER_DUP_ENTRY') {
        console.log(`[Cadastro] Email já registrado: ${req.body.email}`);
        return res.render('cadastro', {
          erro: 'Este email já está cadastrado. Use outro ou faça login.',
          email: req.body.email
        });
      }
      
      console.error('Erro ao registrar usuário:', erro.message);
      res.render('cadastro', {
        erro: 'Não conseguimos completar seu cadastro. Tente novamente mais tarde.',
        email: req.body.email
      });
    }
  },

  logout(req, res) {
    const nomeUsuario = req.session.usuario?.nome || 'Usuário';
    
    req.session.destroy((erro) => {
      if (erro) {
        console.error('Erro ao encerrar sessão:', erro);
      }
      
      req.flash('success', `Até logo, ${nomeUsuario}!`);
      res.redirect('/usuario/login');
    });
  }
};
