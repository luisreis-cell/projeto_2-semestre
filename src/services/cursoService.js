const Curso = require("../models/curso");

module.exports = {
    listar: () => Curso.findAll(),
    criar: (dados) => Curso.create(dados)
};
