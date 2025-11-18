// server.js
const express = require('express');
const db = require('./db'); 
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs'); 

// Rota principal para listar os usuários
app.get('/', async (req, res) => {
    try {
        // Busca todos os usuários na tabela 'usuarios'
        const usuarios = await db.query('SELECT nome, email FROM usuarios'); 
        
        // Renderiza a view 'index.ejs' e envia o array de usuários para ela
        res.render('index', { 
            titulo: 'Lista de Usuários do DB',
            usuarios: usuarios 
        });

    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro interno do servidor ao acessar o DB.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});