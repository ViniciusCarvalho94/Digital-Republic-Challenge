const express = require('express');

const depositController = require('../controllers/depositController');

const depositRoute = express.Router();

depositRoute.post('/', depositController);

module.exports = depositRoute;
