const express = require('express');
const { register,updatePassword } = require('../controllers/authController');
const auth = express.Router();

auth.post('/register', register);
auth.post('/update-password', updatePassword);

module.exports = auth;