// Require modules
const express = require('express');

// Require Controller
const RegisterController = require('./../controllers/Auth/RegisterController');

// Require middlweware
const RegisterMiddleware = require('./../middleware/LoginSystem');

// Initialization route
const Route = express.Router();

// Route
Route.get('/', RegisterMiddleware, RegisterController.show);
Route.post('/', RegisterMiddleware, RegisterController.register);

// Export
module.exports = Route;