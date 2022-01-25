const express = require('express');

const transferController = require('../controllers/transferController');

const transferRoute = express.Router();

transferRoute.post('/', transferController);

module.exports = transferRoute;
