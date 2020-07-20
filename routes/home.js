// Require modules
const express = require('express');

// Require controller
const HomeController  = require('./../controllers/HomeController');

// Initialization route
const Route = express.Router();

// Route
Route.get('/', HomeController.index);

// Exports
module.exports = Route;