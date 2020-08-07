const express = require('express');
const HomeController  = require('./../controllers/HomeController');
const Route = express.Router();

Route.get('/', HomeController.index);

module.exports = Route;