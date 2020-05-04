//this file contains all the routes for a student

const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students_controller');


router.get('/getAllStudents',studentsController.showAllStudents);

module.exports = router;
