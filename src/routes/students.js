const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/new', studentController.showForm);
router.post('/save', studentController.create);
router.get('/', studentController.listWithCourses);
router.get('/:id/edit', studentController.editForm);
router.post('/save', studentController.update);
router.get('/:id/delete', studentController.remove);
router.get('/:id', studentController.details);

module.exports = router;
