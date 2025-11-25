const express = require('express');
const app = express();
const sessionConfig = require('./config/session');
const alunoRoutes = require('./routes/alunoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

sessionConfig(app);

