const Matricula = require('../models/matricula');
const Student = require('../models/students'); // Assumindo que o Model de Student existe
const Course = require('../models/courses');   // Assumindo que o Model de Course existe

module.exports = {
    async showMatriculaForm(req, res) {
        try {
            // Busca a lista de estudantes e cursos para popular os menus do formulário
            const students = await Student.list(); // Assumindo que Student tem um método list()
            const courses = await Course.list();   // Assumindo que Course tem um método list()
            
            res.render('matriculas/form', { 
                students: students,
                courses: courses 
            });
        } catch (err) {
            console.error('Erro ao preparar formulário de matrícula:', err);
            res.status(500).send('Erro interno ao carregar dados de matrícula.');
        }
    },

    async createMatricula(req, res) {
        const { student_id, course_id, data_matricula } = req.body;
        
        try {
            // Chama o Model para salvar a matrícula no banco de dados
            await Matricula.create(student_id, course_id, data_matricula);
            res.redirect('/matricula/success'); // Redireciona para uma página de sucesso
        } catch (err) {
            console.error('Erro ao criar matrícula:', err);
            res.status(500).send('Erro ao realizar matrícula.');
        }
    },
    
    // Método para exibir a lista de matrículas (opcional, mas útil)
    async listMatriculas(req, res) {
        try {
            const matriculas = await Matricula.listAllWithDetails(); // Assumindo método no Model
            res.render('matriculas/list', { matriculas });
        } catch (err) {
            console.error('Erro ao listar matrículas:', err);
            res.status(500).send('Erro ao buscar matrículas.');
        }
    }
};