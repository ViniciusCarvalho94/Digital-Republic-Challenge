const jwt = require('jsonwebtoken');
const findUserModel = require('../models/findUserModel');
const SECRET = require('../auth/SECRET');
const objError = require('../functions/objError');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw objError(401, 'Está faltando o token de autorização');

    const decoded = jwt.verify(authorization, SECRET);
    const findUser = await findUserModel(decoded.data.cpf);
    if (!findUser) throw objError(401, 'Token inválido');

    req.findUser = findUser;

    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
