const express = require('express');
const LoginController = require('./../controllers/Auth/LoginController');
const LoginSystemMiddleware = require('../middleware/LoginSystemMiddleware');
const Route = express.Router();

Route.get('/', LoginSystemMiddleware, LoginController.show);
Route.post('/', LoginSystemMiddleware, LoginController.login);

module.exports = Route;