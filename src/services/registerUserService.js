const { hash } = require('bcrypt');

const registerUserModel = require('../models/registerUserModel');
const objError = require('../functions/objError');
const registerUserSchema = require('../schemas/registerUserSchema');
const findUserModel = require('../models/findUserModel');
const saveUserPasswordModel = require('../models/saveUserPasswordModel');
const { STATUS_400, REGISTER_SCHEMA_DESCRIPTION, ALREADY_REGISTERED_DESCRIPTION } = require('../lib/constants');

function validateSchema(name, cpf, password) {
  const { error } = registerUserSchema.validate({ name, cpf, password });
  const fullname = name.split(' ');
  if (!fullname[1] || error) throw objError(STATUS_400, REGISTER_SCHEMA_DESCRIPTION);
}

async function checkUserAlreadyRegistered(cpf) {
  const user = await findUserModel(cpf);
  if (user) throw objError(STATUS_400, ALREADY_REGISTERED_DESCRIPTION);
}

module.exports = async ({ name, cpf, password }) => {
  validateSchema(name, cpf, password);
  await checkUserAlreadyRegistered(cpf);

  const bcryptPassword = await hash(password, 8);

  const id = await registerUserModel(name, cpf);
  if (id) await saveUserPasswordModel(cpf, bcryptPassword);

  return { _id: id, name, cpf };
};
