require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const alunoRoutes = require("./routes/alunoRoutes");
const cursoRoutes = require("./routes/cursoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(session);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/alunos", alunoRoutes);
app.use("/cursos", cursoRoutes);
app.use("/usuarios", usuarioRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () =>
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`)
);
