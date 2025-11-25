const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'meuSegredo', 
  resave: false,
  saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

const alunoRoutes = require('./src/routes/alunoRoutes');
const cursoRoutes = require('./src/routes/cursoRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

app.use('/aluno', alunoRoutes);
app.use('/curso', cursoRoutes);
app.use('/usuario', usuarioRoutes);

app.get('/', (req, res) => {
  res.render('login');
});                                                                                                                                                      
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
