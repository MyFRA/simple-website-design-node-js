// Require modules
const express = require('express');

// Require Controller
const UploadDesignConstroller = require('./../controllers/UploadDesignController');

// Initialization Route
const Route = express.Router();

// Route
Route.get('/', UploadDesignConstroller.index);
Route.post('/', UploadDesignConstroller.upload);

// Export
module.exports = Route;