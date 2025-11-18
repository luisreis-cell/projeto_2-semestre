require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const session = require("./config/session");
const errorHandler = require("./middlewares/errorHandler");

// Rotas
const alunoRoutes = require("./routes/alunoRoutes");
const cursoRoutes = require("./routes/cursoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

// Configurações
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(session);

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Rotas da aplicação
app.use("/alunos", alunoRoutes);
app.use("/cursos", cursoRoutes);
app.use("/usuarios", usuarioRoutes);

// Middleware de erro (sempre por último)
app.use(errorHandler);

// Iniciar servidor
app.listen(process.env.PORT || 3000, () =>
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`)
);
