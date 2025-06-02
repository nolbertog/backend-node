const express = require('express');
const cliente = express.Router();
const clienteController = require('../controllers/ClienteController');

cliente.post('/cliente', clienteController.createCliente);
cliente.get('/cliente', clienteController.getAllClientes);
cliente.get('/cliente/:id', clienteController.getClienteById);
cliente.put('/cliente/:id', clienteController.updateCliente);
cliente.delete('/cliente/:id', clienteController.deleteCliente);

module.exports = cliente;