const { compare } = require('bcrypt');

const loginUserSchema = require('../schemas/loginUserSchema');
const objError = require('../functions/objError');
const findUserModel = require('../models/findUserModel');
const matchPasswordModel = require('../models/matchPasswordModel');
const genJWT = require('../auth/genJWT');

const STATUS_401 = 401;
const DESCRIPTION = 'CPF ou senha inválidos';

module.exports = async (userLogin) => {
  const { cpf, password } = userLogin;

  const { error } = loginUserSchema.validate({ cpf, password });
  if (error) throw objError(400, 'Preencha os dois campos');

  const findUser = await findUserModel(cpf);
  if (!findUser) throw objError(STATUS_401, DESCRIPTION);

  const matchPassword = await matchPasswordModel(cpf);
  const passwordConfirmed = await compare(password, matchPassword);
  if (!passwordConfirmed) throw objError(STATUS_401, DESCRIPTION);

  const data = { name: findUser.name, cpf };

  const token = genJWT(data);

  return token;
};
