const express = require('express');
const path = require('path');
const session = require('express-session'); 
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração de sessão (necessário para login)
app.use(session({
  secret: 'sua_chave_secreta', // troque por uma chave segura
  resave: false,
  saveUninitialized: false
}));

// Views e arquivos estáticos
// Ajuste para views dentro de src
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rotas
const usersRouter = require('./src/routes/users');
const authRouter = require('./src/routes/auth');
const studentsRouter = require('./src/routes/students');
const coursesRouter = require('./src/routes/courses');

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);

// Rota raiz
app.get('/', (req, res) => {
  res.render('index', { userName: req.session.userName });
});

module.exports = app;
