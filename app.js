// ...existing code...
const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// rotas
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth'); // se existir
const studentsRouter = require('./routes/students'); // se existir
const coursesRouter = require('./routes/courses'); // se existir

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);

// ...existing code...
module.exports = app;