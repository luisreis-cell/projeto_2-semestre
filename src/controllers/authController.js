function showLogin(req, res) {
  // Idealmente, você renderizaria a view de login aqui.
  res.send("Página de login (implementar view futuramente)");
}

function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email e senha obrigatórios");
  }

  // Lógica de autenticação com o DB viria aqui
  res.send("Login realizado (implementar autenticação futuramente)");
}

function logout(req, res) {
  // Lógica para limpar a sessão/token viria aqui
  res.send("Logout realizado!");
}

module.exports = {
  showLogin,
  login,
  logout
};