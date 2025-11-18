const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

module.exports = {
    criarUsuario: async (dados) => {
        const hash = await bcrypt.hash(dados.senha, 10);
        return Usuario.create({ ...dados, senha: hash });
    },

    autenticar: async (email, senha) => {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) return null;

        const valido = await bcrypt.compare(senha, usuario.senha);
        return valido ? usuario : null;
    }
};
