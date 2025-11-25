const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const alunoRoutes = require('./routes/alunoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use('/usuario', usuarioRoutes);
app.use('/aluno', alunoRoutes);
app.use('/curso', cursoRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
