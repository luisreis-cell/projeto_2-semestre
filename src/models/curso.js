let cursos = [];
let idAtual = 1;

module.exports = {
    listar() {
        return cursos;
    },
    buscarPorId(id) {
        return cursos.find(c => c.id == id);
    },
    criar({ nome, carga_horaria }) {
        const novo = { id: idAtual++, nome, carga_horaria };
        cursos.push(novo);
        return novo;
    },
    editar(id, { nome, carga_horaria }) {
        const curso = cursos.find(c => c.id == id);
        if (!curso) return null;
        curso.nome = nome;
        curso.carga_horaria = carga_horaria;
        return curso;
    },
    deletar(id) {
        cursos = cursos.filter(c => c.id != id);
    }
};
