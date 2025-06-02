const express = require('express');
const apuRecurso = express.Router();
const apuRecursoController = require('../controllers/ApuRecursoController');

apuRecurso.post('/apuRecurso', apuRecursoController.createApuRecurso);
apuRecurso.get('/apuRecurso', apuRecursoController.getAllApuRecursos);
apuRecurso.get('/apuRecurso/:id', apuRecursoController.getApuRecursoById);
apuRecurso.put('/apuRecurso/:id', apuRecursoController.updateApuRecurso);
apuRecurso.delete('/apuRecurso/:id', apuRecursoController.deleteApuRecurso);

module.exports = apuRecurso;