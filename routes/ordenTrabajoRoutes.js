const express = require('express');
const ordenTrabajo = express.Router();
const ordenTrabajoController = require('../controllers/OrdenTrabajoController');

ordenTrabajo.post('/ordenTrabajo', ordenTrabajoController.createOrdenTrabajo);
ordenTrabajo.get('/ordenTrabajo', ordenTrabajoController.getAllOrdenTrabajos);
ordenTrabajo.get('/ordenTrabajo/:id', ordenTrabajoController.getOrdenTrabajoById);
ordenTrabajo.put('/ordenTrabajo/:id', ordenTrabajoController.updateOrdenTrabajo);
ordenTrabajo.delete('/ordenTrabajo/:id', ordenTrabajoController.deleteOrdenTrabajo);

module.exports = ordenTrabajo;