// Require modules
const express = require('express');

// Require controller
const LoginController = require('./../controllers/Auth/LoginController');

// Require middlweware
const LoginMiddleware = require('./../middleware/LoginSystem');

// Initialization route
const Route = express.Router();

// Route
Route.get('/', LoginMiddleware, LoginController.index);
Route.post('/', LoginMiddleware, LoginController.login);

module.exports = Route;