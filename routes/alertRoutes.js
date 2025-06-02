const express = require('express');
const { sendAlertEmail } = require('../controllers/emailController');

const alertRoutes = express.Router();

alertRoutes.post('/send-alert', sendAlertEmail);

module.exports = alertRoutes;