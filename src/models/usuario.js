const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Usuario = db.define("Usuario", {
    nome: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    senha: DataTypes.STRING,
});

module.exports = Usuario;
