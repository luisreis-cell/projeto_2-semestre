const usuarioService = require("../services/usuarioService");

module.exports = {
    mostrarLogin: (req, res) => {
        res.render("login");
    },
    login: async (req, res, next) => {
        try {
            const { email, senha } = req.body;
            const usuario = await usuarioService.autenticar(email, senha);
            if (!usuario) return res.status(401).send("Credenciais inválidas");
            
            req.session.user = usuario;
            res.redirect("/alunos");
        } catch (e) {
            next(e);
        }
    },
    cadastro: (req, res) => {
        res.render("cadastro");
    },
    criar: async (req, res, next) => {
        try {
            await usuarioService.criarUsuario(req.body);
            res.redirect("/usuarios/login");
        } catch (e) {
            next(e);
        }
    }
};
