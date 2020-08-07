const express = require('express');
const MyprofileController = require('./../controllers/MyprofileController');
const AuthMiddleware = require('./../middleware/AuthMiddleware');
const Route = express.Router();

// Route
Route.get('/', AuthMiddleware, MyprofileController.index);

// Export
module.exports = Route;
