// Require modules
const express = require('express');

// Require controller
const LoginController = require('./../controllers/Auth/LoginController');

// Require middlweware
const AuthMiddleware = require('../middleware/AuthMiddleware');

// Initialization route
const Route = express.Router();

// Route
Route.get('/', AuthMiddleware, LoginController.show);
Route.post('/', AuthMiddleware, LoginController.login);

module.exports = Route;