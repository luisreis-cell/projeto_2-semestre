let alunos = [];
let idAtual = 1;

module.exports = {
    listar() {
        return alunos;
    },
    buscarPorId(id) {
        return alunos.find(a => a.id == id);
    },
    criar({ nome, idade }) {
        const novo = { id: idAtual++, nome, idade };
        alunos.push(novo);
        return novo;
    },
    editar(id, { nome, idade }) {
        const aluno = alunos.find(a => a.id == id);
        if (!aluno) return null;
        aluno.nome = nome;
        aluno.idade = idade;
        return aluno;
    },
    deletar(id) {
        alunos = alunos.filter(a => a.id != id);
    }
};
