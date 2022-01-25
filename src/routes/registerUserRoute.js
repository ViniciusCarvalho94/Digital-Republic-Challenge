const express = require('express');

const registerUserController = require('../controllers/registerUserController');

const registerUserRoute = express.Router();

registerUserRoute.post('/', registerUserController);

module.exports = registerUserRoute;
