// Require modules
const express = require('express');

// Require Controller
const RegisterController = require('./../controllers/Auth/RegisterController');

// Initialization route
const Route = express.Router();

// Route
Route.get('/', RegisterController.index);

// Export
module.exports = Route;