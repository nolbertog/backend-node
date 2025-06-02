const express = require('express');
const user = express.Router();
const userController = require('../controllers/UserController');

user.post('/user', userController.createUser);
user.get('/user', userController.getAllUsers);
user.get('/user/:id', userController.getUserById);
user.put('/user/:id', userController.updateUser);
user.delete('/user/:id', userController.deleteUser);

module.exports = user;