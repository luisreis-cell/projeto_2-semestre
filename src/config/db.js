const { Sequelize } = require("sequelize");

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
    }
);

db.authenticate()
    .then(() => console.log("📌 Banco conectado"))
    .catch(err => console.error("❌ Erro ao conectar:", err));

module.exports = db;
