const cursoService = require("../services/cursoService");

module.exports = {
    listar: async (req, res, next) => {
        try {
            const cursos = await cursoService.listar();
            res.render("cursos", { cursos });
        } catch (e) {
            next(e);
        }
    },

    criar: async (req, res, next) => {
        try {
            await cursoService.criar(req.body);
            res.redirect("/cursos");
        } catch (e) {
            next(e);
        }
    }
};
