const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'segredo_app_mvc',
  resave: false,
  saveUninitialized: false
}));

function authMiddleware(req, res, next) {
  const publicPaths = ['/login', '/register'];
  if (!req.session.userId && !publicPaths.includes(req.path)) {
    return res.redirect('/login');
  }
  next();
}

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
const userRoutes = require('./routes/users');

app.use(authRoutes);
app.use(authMiddleware);
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);
app.use(userRoutes);

app.get('/', (req, res) => {
  res.render('index', { user: req.session.userName });
});

app.use((err, req, res, next) => {
  res.status(500).send('Erro interno do servidor');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));