const express = require('express');
const apuRoutes = require('./apuRoutes');
const apuRecurso = require('./apuRecusoRoutes');
const cliente = require('./clienteRoutes');
const cotizacion = require('./cotizacionRoutes');
const estado = require('./estadoRoutes');
const ordenTrabajo = require('./ordenTrabajoRoutes');
const recurso = require('./recursoRoutes');
const tareasOrdenUnion = require('./tareasOrdenUnionRoutes');
const user = require('./userRoutes');
const tareasOT = require('./tareasOTRoutes');
const tipoRecurso = require('./tipoRecursoRoutes');
const unidadMedida = require('./unidadMedidaRoutes');
const recursoApuCotizacion = require('./RecursoApuCotizacionRoutes');
const alertRoutes = require('./alertRoutes');
const auth = require('./auth');


const master = express.Router();

master.use(apuRoutes);
master.use(apuRecurso);
master.use(cliente);
master.use(cotizacion);
master.use(estado);
master.use(ordenTrabajo);
master.use(recurso);
master.use(tareasOrdenUnion);
master.use(user);
master.use(tareasOT);
master.use(tipoRecurso);
master.use(unidadMedida);
master.use(recursoApuCotizacion);
master.use(alertRoutes);
master.use(auth);

module.exports = master;