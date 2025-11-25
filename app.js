const express = require('express');
const app = express();
const sessionConfig = require('./config/session');
const alunoRoutes = require('./routes/alunoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

sessionConfig(app);

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/alunos', alunoRoutes);
app.use('/cursos', cursoRoutes);
app.use('/usuarios', usuarioRoutes);
app.get('/', (req, res) => {
    res.render('index');
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
