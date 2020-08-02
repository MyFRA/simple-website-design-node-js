// Require modules
const express = require('express');

// Require Controller
const RegisterController = require('./../controllers/Auth/RegisterController');

// Require middlweware
const AuthMiddleware = require('./../middleware/AuthMiddleware');

// Initialization route
const Route = express.Router();

// Route
Route.get('/', AuthMiddleware, RegisterController.show);
Route.post('/', AuthMiddleware, RegisterController.register);

// Export
module.exports = Route;