const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

module.exports = {

    formLogin(req, res) {
        res.render('login');
    },

    async login(req, res) {
        const { email, senha } = req.body;

        const usuario = await Usuario.buscarPorEmail(email);

        if (!usuario) {
            return res.render('login', { error: 'Usuário ou senha incorretos' });
        }

        const match = await bcrypt.compare(senha, usuario.senha);
        if (!match) {
            return res.render('login', { error: 'Usuário ou senha incorretos' });
        }

        // Remover senha antes de armazenar na sessão
        delete usuario.senha;
        req.session.usuario = usuario;
        res.redirect('/aluno');
    },

    formCadastro(req, res) {
        res.render('cadastro');
    },

    async cadastrar(req, res) {
        const { nome, email, senha } = req.body;

        const hash = await bcrypt.hash(senha, 10);
        try {
            await Usuario.criar({ nome, email, senha: hash, papel: 'user' });
            req.flash('success', 'Conta criada com sucesso. Faça login.');
            return res.redirect('/usuario/login');
        } catch (err) {
            // Duplicate email
            if (err && err.code === 'ER_DUP_ENTRY') {
                    req.flash('error', 'Este e-mail já está cadastrado.');
                    return res.redirect('/usuario/cadastro');
            }
            console.error(err);
            req.flash('error', 'Ocorreu um erro. Tente novamente.');
            return res.redirect('/usuario/cadastro');
        }
    },

    logout(req, res) {
        req.session.destroy();
        res.redirect('/usuario/login');
    }
};
