const Usuario = require('../models/usuario');

module.exports = {

    formLogin(req, res) {
        res.render('login');
    },

    async login(req, res) {
        const { email, senha } = req.body;

        const usuario = await Usuario.buscarPorEmail(email);

        if (!usuario || usuario.senha !== senha) {
            return res.send("Usuário ou senha incorretos");
        }

        req.session.usuario = usuario;
        res.redirect('/aluno');
    },

    formCadastro(req, res) {
        res.render('cadastro');
    },

    async cadastrar(req, res) {
        const { nome, email, senha } = req.body;

        await Usuario.criar({ nome, email, senha });

        res.redirect('/usuario/login');
    },

    logout(req, res) {
        req.session.destroy();
        res.redirect('/usuario/login');
    }
};
