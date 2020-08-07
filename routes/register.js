const express = require('express');
const RegisterController = require('./../controllers/Auth/RegisterController');
const LoginSystemMiddleware = require('./../middleware/LoginSystemMiddleware');
const Route = express.Router();

Route.get('/', LoginSystemMiddleware, RegisterController.show);
Route.post('/', LoginSystemMiddleware, RegisterController.register);

module.exports = Route;