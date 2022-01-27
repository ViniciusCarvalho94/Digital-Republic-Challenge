const { compare } = require('bcrypt');

const loginUserSchema = require('../schemas/loginUserSchema');
const objError = require('../functions/objError');
const findUserModel = require('../models/findUserModel');
const matchPasswordModel = require('../models/matchPasswordModel');
const genJWT = require('../auth/genJWT');
const {
  STATUS_400,
  LOGIN_SCHEMA_DESCRIPTION,
  STATUS_401,
  LOGIN_DESCRIPTION,
} = require('../lib/constants');

function validateSchema(cpf, password) {
  const { error } = loginUserSchema.validate({ cpf, password });
  if (error) throw objError(STATUS_400, LOGIN_SCHEMA_DESCRIPTION);
}

async function findUser(cpf) {
  const user = await findUserModel(cpf);
  if (!user) throw objError(STATUS_401, LOGIN_DESCRIPTION);

  return user;
}

async function validatePassword(cpf, password) {
  const matchPassword = await matchPasswordModel(cpf);
  const passwordConfirmed = await compare(password, matchPassword);
  if (!passwordConfirmed) throw objError(STATUS_401, LOGIN_DESCRIPTION);
}

module.exports = async ({ cpf, password }) => {
  validateSchema(cpf, password);

  const user = await findUser(cpf);
  await validatePassword(cpf, password);

  const data = { name: user.name, cpf };
  const token = genJWT(data);

  return token;
};
