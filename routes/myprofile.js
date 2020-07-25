// Require modules
const express = require('express');

// Require controller
const MyprofileController = require('./../controllers/MyprofileController');

// Initialization Route
const Route = express.Router();

// Route
Route.get('/', MyprofileController.index);

// Export
module.exports = Route;
