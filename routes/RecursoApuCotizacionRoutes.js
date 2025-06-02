const express = require('express');
const recursoApuCotizacion = express.Router();
const recursoApuCotizacionController = require('../controllers/RecursoApuCotizacionController');

recursoApuCotizacion.post('/recursoApuCotizacion', recursoApuCotizacionController.createRecursoApuCotizacion);
recursoApuCotizacion.get('/recursoApuCotizacion', recursoApuCotizacionController.getAllRecursoApuCotizacion);
recursoApuCotizacion.get('/recursoApuCotizacion/:id', recursoApuCotizacionController.getRecursoApuCotizacionById);
recursoApuCotizacion.put('/recursoApuCotizacion/:id', recursoApuCotizacionController.updateRecursoApuCotizacion);

recursoApuCotizacion.delete('/recursoApuCotizacion/:id_cotizacion', recursoApuCotizacionController.deleteRecursosByCotizacion);

module.exports = recursoApuCotizacion;
