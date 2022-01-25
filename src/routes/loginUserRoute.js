const express = require('express');

const loginUserController = require('../controllers/loginUserController');

const loginUserRoute = express.Router();

loginUserRoute.post('/', loginUserController);

module.exports = loginUserRoute;
