const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

module.exports = {

    mostrarTelaLogin(req, res) {
        res.render('login');
    },

    async processarLogin(req, res) {
        try {
            const { email, senha } = req.body;

            const usuario = await Usuario.buscarPorEmail(email);

            if (!usuario) {
                return res.render('login', { 
                    error: 'Email ou senha incorretos' 
                });
            }
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

            if (!senhaCorreta) {
                return res.render('login', { 
                    error: 'Email ou senha incorretos' 
                });
            }

            delete usuario.senha;
            req.session.usuario = usuario;

            res.redirect('/aluno');
        } catch (error) {
            console.error('Erro no login:', error);
            res.render('login', { 
                error: 'Erro no sistema. Tente novamente.' 
            });
        }
    },
    mostrarTelaCadastro(req, res) {
        res.render('cadastro');
    },

    async criarUsuario(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const senhaHash = await bcrypt.hash(senha, 10);

            await Usuario.criar({ 
                nome, 
                email, 
                senha: senhaHash, 
                papel: 'user' 
            });

            req.flash('success', 'Conta criada! Faça login agora.');
            res.redirect('/usuario/login');
        } catch (error) {
            if (error && error.code === 'ER_DUP_ENTRY') {
                req.flash('error', 'Este email já está cadastrado.');
                return res.redirect('/usuario/cadastro');
            }

            console.error('Erro ao criar usuário:', error);
            req.flash('error', 'Erro no cadastro. Tente novamente.');
            res.redirect('/usuario/cadastro');
        }
    },

    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Erro no logout:', err);
            }
            res.redirect('/usuario/login');
        });
    }
};
