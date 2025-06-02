const express = require('express');
const estado = express.Router();
const estadoController = require('../controllers/EstadoController');

estado.post('/estado', estadoController.createEstado);
estado.get('/estado', estadoController.getAllEstados);
estado.get('/estado/:id', estadoController.getEstadoById);
estado.put('/estado/:id', estadoController.updateEstado);
estado.delete('/estado/:id', estadoController.deleteEstado);

module.exports = estado;