const Aluno = require("../models/aluno");

module.exports = {
    listar: () => Aluno.findAll(),
    criar: (dados) => Aluno.create(dados)
};
