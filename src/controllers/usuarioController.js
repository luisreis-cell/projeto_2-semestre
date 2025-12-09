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
    },

    async listar(req, res) {
        try {
            const usuarios = await Usuario.listar();
            res.render('usuario/listar', { usuarios });
        } catch (erro) {
            res.status(500).send("Erro ao listar usuários.");
        }
    },

    async formEditar(req, res) {
        try {
            const usuario = await Usuario.buscarPorId(req.params.id);
            if (!usuario) {
                req.flash('error', 'Usuário não encontrado.');
                return res.redirect('/usuario');
            }
            res.render('usuario/editar', { usuario });
        } catch (erro) {
            res.status(500).send("Erro ao abrir formulário de edição.");
        }
    },

    async editar(req, res) {
        try {
            const { nome, email, papel } = req.body;
            await Usuario.editar(req.params.id, { nome, email, papel });
            req.flash('success', 'Usuário atualizado com sucesso.');
            res.redirect('/usuario');
        } catch (erro) {
            if (erro && erro.code === 'ER_DUP_ENTRY') {
                req.flash('error', 'Este e-mail já está cadastrado.');
                return res.redirect(`/usuario/${req.params.id}/editar`);
            }
            res.status(500).send("Erro ao editar usuário.");
        }
    },

    async deletar(req, res) {
        try {

            if (req.session.usuario && req.session.usuario.id == req.params.id) {
                req.flash('error', 'Você não pode excluir sua própria conta.');
                return res.redirect('/usuario');
            }
            await Usuario.deletar(req.params.id);
            req.flash('success', 'Usuário excluído.');
            res.redirect('/usuario');
        } catch (erro) {
            res.status(500).send("Erro ao excluir usuário.");
        }
    },

    async perfil(req, res) {
        try {
            const usuario = await Usuario.buscarPorId(req.session.usuario.id);
            if (!usuario) {
                return res.redirect('/usuario/login');
            }
            delete usuario.senha;
            res.render('usuario/perfil', { usuario });
        } catch (erro) {
            res.status(500).send("Erro ao carregar perfil.");
        }
    }
};
