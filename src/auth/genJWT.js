const jwt = require('jsonwebtoken');
const JWT_CONFIG = require('./JWT_CONFIG');
const SECRET = require('./SECRET');

module.exports = (data) => jwt.sign({ data }, SECRET, JWT_CONFIG);
