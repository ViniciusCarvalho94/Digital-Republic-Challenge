const express = require('express');

const registerUserRoute = require('./routes/registerUserRoute');
const loginUserRoute = require('./routes/loginUserRoute');
const depositRoute = require('./routes/depositRoute');
const transferRoute = require('./routes/transferRoute');

const jwtValidateMiddleware = require('./middlewares/jwtValidateMiddleware');
const handlerError = require('./middlewares/handlerError');

const app = express();

app.use(express.json());

app.use('/register', registerUserRoute);
app.use('/login', loginUserRoute);
app.use('/deposit', jwtValidateMiddleware, depositRoute);
app.use('/transfer', jwtValidateMiddleware, transferRoute);

app.use(handlerError);

module.exports = app;
