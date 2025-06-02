const express = require('express');
const tipoRecurso = express.Router();
const tipoRecursoController = require('../controllers/TipoRecursoController');

tipoRecurso.post('/tipoRecurso', tipoRecursoController.createTipoRecurso);
tipoRecurso.get('/tipoRecurso', tipoRecursoController.getAllTipoRecurso);
tipoRecurso.get('/tipoRecurso/:id', tipoRecursoController.getTipoRecursoById);
tipoRecurso.put('/tipoRecurso/:id', tipoRecursoController.updateTipoRecurso);
tipoRecurso.delete('/tipoRecurs/:id', tipoRecursoController.deleteTipoRecurso);

module.exports = tipoRecurso;