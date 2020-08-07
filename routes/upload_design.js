const express = require('express');
const UploadDesignConstroller = require('./../controllers/UploadDesignController');
const AuthMiddleware = require('./../middleware/AuthMiddleware');
const Route = express.Router();

Route.get('/', AuthMiddleware, UploadDesignConstroller.index);
Route.post('/', AuthMiddleware, UploadDesignConstroller.upload);

module.exports = Route;