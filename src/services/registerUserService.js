const { hash } = require('bcrypt');

const registerUserModel = require('../models/registerUserModel');
const objError = require('../functions/objError');
const registerUserSchema = require('../schemas/registerUserSchema');
const findUserModel = require('../models/findUserModel');
const saveUserPasswordModel = require('../models/saveUserPasswordModel');

module.exports = async (userRegister) => {
  const { name, cpf, password } = userRegister;

  const { error } = registerUserSchema.validate({ name, cpf, password });
  const fullname = name.split(' ');
  if (!fullname[1] || error) {
    throw objError(
      400,
      'Digite o nome completo, cpf valido (xxx.xxx.xxx-xx) e senha de 6 caracteres',
    );
  }

  const findUser = await findUserModel(cpf);
  if (findUser) throw objError(400, 'Úsuario já cadastrado');

  const bcryptPassword = await hash(password, 8);

  const id = await registerUserModel(name, cpf);
  if (id) await saveUserPasswordModel(cpf, bcryptPassword);

  return { _id: id, name, cpf };
};
