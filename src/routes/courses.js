//courses.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/new', courseController.showForm);
router.post('/save', courseController.create);
router.get('/', courseController.list);
router.get('/:id/edit', courseController.showForm);
router.post('/save', courseController.createOrUpdate);
router.get('/:id/delete', courseController.remove);
router.get('/:id', courseController.details);
module.exports = router;
