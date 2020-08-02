// Require modules
const express = require('express');

// Requirt controller
const UploadDesignController = require('./../controllers/UploadDesignController');

// Initialization Route
const Route = express.Router();

// Route
Route.get('/', UploadDesignController.index);
Route.post('/', UploadDesignController.upload);


module.exports = Route;