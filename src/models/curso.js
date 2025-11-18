const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Curso = db.define("Curso", {
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
});

module.exports = Curso;
