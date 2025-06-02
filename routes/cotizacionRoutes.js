const express = require('express');
const cotizacion = express.Router();
const cotizacionController = require('../controllers/CotizacionController');

cotizacion.post('/cotizacion', cotizacionController.createCotizacion);
cotizacion.get('/cotizacion', cotizacionController.getAllCotizacions);
cotizacion.get('/cotizacion/:id', cotizacionController.getCotizacionById);
cotizacion.put('/cotizacion/:id', cotizacionController.updateCotizacion);
cotizacion.delete('/cotizacion/:id', cotizacionController.deleteCotizacion);

module.exports = cotizacion;