const express = require('express');
const path = require('path');
const session = require('express-session'); 
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'sua_chave_secreta', 
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

const usersRouter = require('./src/routes/users');
const authRouter = require('./src/routes/auth');
const studentsRouter = require('./src/routes/students');
const coursesRouter = require('./src/routes/courses');

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);

app.get('/', (req, res) => {
  res.render('index', { userName: req.session.userName });
});

module.exports = app;
