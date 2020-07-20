// Require modules
const express = require('express');

// Require controller
const LoginController = require('./../controllers/Auth/LoginController');

// Initialization route
const Route = express.Router();

// Route
Route.get('/', LoginController.index);

module.exports = Route;