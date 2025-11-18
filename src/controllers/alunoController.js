const alunoService = require("../services/alunoService");

module.exports = {
    listar: async (req, res, next) => {
        try {
            const alunos = await alunoService.listar();
            res.render("cadastro", { alunos });
        } catch (e) {
            next(e);
        }
    },

    criar: async (req, res, next) => {
        try {
            await alunoService.criar(req.body);
            res.redirect("/alunos");
        } catch (e) {
            next(e);
        }
    }
};
