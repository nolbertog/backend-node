const express = require('express');
const tareasOrdenUnion = express.Router();
const tareasOrdenUnionController = require('../controllers/TareasOrdenUnionController');

tareasOrdenUnion.post('/tareasOrdenUnion', tareasOrdenUnionController.createTareasOrdenUnion);
tareasOrdenUnion.get('/tareasOrdenUnion', tareasOrdenUnionController.getAllTareasOrdenUnions);
tareasOrdenUnion.get('/tareasOrdenUnion/:id', tareasOrdenUnionController.getTareasOrdenUnionById);
tareasOrdenUnion.put('/tareasOrdenUnion/:id', tareasOrdenUnionController.updateTareasOrdenUnion);
tareasOrdenUnion.delete('/tareasOrdenUnion/:id', tareasOrdenUnionController.deleteTareasOrdenUnion);

module.exports = tareasOrdenUnion;