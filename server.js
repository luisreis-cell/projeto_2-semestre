const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
// Ajuste para usar as views dentro de src/views
app.set('views', path.join(__dirname, 'src', 'views'));

// Debug: mostrar diretório de views e existência do template de cursos
const fs = require('fs');
const testePath = path.join(app.get('views'), 'curso', 'listar.ejs');
console.log('Views directory:', app.get('views'));
console.log('Teste arquivo curso/listar.ejs existe?', fs.existsSync(testePath), testePath);

// Session middleware (uses src/config/session.js)
require('./src/config/session')(app);

// Expor usuário da sessão para as views
app.use((req, res, next) => {
    res.locals.usuario = req.session ? req.session.usuario : null;
    next();
});

// connect-flash setup
const flash = require('connect-flash');
app.use(flash());
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

// Rota raiz: redireciona para login
app.get('/', (req, res) => {
    return res.render('index');
});

// Routes
const alunoRoutes = require('./src/routes/alunoRoutes');
const cursoRoutes = require('./src/routes/cursoRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const painelRoutes = require('./src/routes/painelRoutes');

app.use('/usuario', usuarioRoutes);
app.use('/aluno', alunoRoutes);
app.use('/curso', cursoRoutes);
app.use('/painel', painelRoutes);

// Acesso negado
app.get('/acesso-negado', (req, res) => res.render('acesso-negado'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
