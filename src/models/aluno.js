const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Aluno = db.define("Aluno", {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    cursoId: DataTypes.INTEGER
});

module.exports = Aluno;
