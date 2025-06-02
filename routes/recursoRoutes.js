const express = require('express');
const recurso = express.Router();
const recursoController = require('../controllers/RecursoController');

recurso.post('/recurso', recursoController.createRecurso);
recurso.get('/recurso', recursoController.getAllRecursos);
recurso.get('/recurso/:id', recursoController.getRecursoById);
recurso.put('/recurso/:id', recursoController.updateRecurso);
recurso.delete('/recurso/:id', recursoController.deleteRecurso);

module.exports = recurso;