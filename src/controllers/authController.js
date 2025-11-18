// src/controllers/authController.js (Criar este arquivo se não existir)

function showLogin(req, res) {
    // Renderiza a view de login
    res.render('auth/login'); 
}

function login(req, res) {
    const { email, password } = req.body;
    // Lógica de validação e autenticação (aqui você chamaria o Model)
    
    if (!email || !password) {
        return res.status(400).send("Email e senha obrigatórios");
    }

    // Exemplo de sucesso:
    // req.session.userId = user.id;
    // res.redirect('/');
    
    res.send("Login realizado (implementar autenticação futuramente)");
}

function logout(req, res) {
    // Lógica para encerrar a sessão
    // req.session.destroy();
    res.redirect('/');
}

module.exports = {
    showLogin,
    login,
    logout
};