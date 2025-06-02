const express = require('express');
const {login} = require('../controllers/authController'); // Ruta al controlador de autenticación

const publicRoutes = express.Router();

// Ruta de login (pública)
publicRoutes.post('/', login);

module.exports = publicRoutes;
