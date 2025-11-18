const Student = require('../models/students');

module.exports = {
    // Método que usa Student.listWithCourses()
    async listWithCourses(req, res) {
        const students = await Student.listWithCourses();
        res.render('students/list', { students });
    },

    showForm(req, res) {
        res.render('students/form');
    },

    // Método de CRIAÇÃO: Agora passa um objeto { nome, email, telefone }
    async create(req, res) {
        const { nome, email, telefone } = req.body;
        
        // Passando um OBJETO para o Model
        await Student.create({ nome, email, telefone }); 
        
        res.redirect('/students');
    },

    async editForm(req, res) {
        // Usa o método findById
        const student = await Student.findById(req.params.id); 
        res.render('students/form', { student });
    },

    async update(req, res) {
        const { id, nome, email, telefone } = req.body;
        // O Model precisa do 'id' como primeiro parâmetro e os dados em seguida
        await Student.update(id, nome, email, telefone); 
        res.redirect('/students');
    },

    async remove(req, res) {
        // Usa o método remove
        await Student.remove(req.params.id); 
        res.redirect('/students');
    },
    
    async details(req, res) {
        // Usa o método findById
        const student = await Student.findById(req.params.id); 
        res.render('students/details', { student });
    }
};