const express = require('express');
const unidadMedida = express.Router();
const unidadMedidaController = require('../controllers/UnidadMedidaController');

unidadMedida.post('/unidadMedida', unidadMedidaController.createUnidadMedida);
unidadMedida.get('/unidadMedida', unidadMedidaController.getAllUnidadMedidas);
unidadMedida.get('/unidadMedida/:id', unidadMedidaController.getUnidadMedidaById);
unidadMedida.put('/unidadMedida/:id', unidadMedidaController.updateUnidadMedida);
unidadMedida.delete('/unidadMedida/:id', unidadMedidaController.deleteUnidadMedida);

module.exports = unidadMedida;