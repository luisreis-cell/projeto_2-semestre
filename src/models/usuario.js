let usuarios = [];
let idAtual = 1;

module.exports = {
    listar() {
        return usuarios;
    },
    buscarPorId(id) {
        return usuarios.find(u => u.id == id);
    },
    buscarPorEmail(email) {
        return usuarios.find(u => u.email === email);
    },
    criar({ nome, email, senha }) {
        const novo = { id: idAtual++, nome, email, senha };
        usuarios.push(novo);
        return novo;
    }
};
