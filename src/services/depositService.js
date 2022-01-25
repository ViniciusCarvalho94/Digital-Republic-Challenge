const objError = require('../functions/objError');
const findUserModel = require('../models/findUserModel');
const depositTransferModel = require('../models/depositTransferModel');
const depositSchema = require('../schemas/depositSchema');

const STATUS_400 = 400;
const DESCRIPTION = 'CPF ou valor inválidos, cpf no formato (xxx.xxx.xxx-xx) e valor inteiro entre 1 e 2000';

module.exports = async (cpf, value) => {
  const { error } = depositSchema.validate({ cpf, value });
  if (error) throw objError(STATUS_400, DESCRIPTION);

  const findUser = await findUserModel(cpf);
  if (!findUser) throw objError(STATUS_400, DESCRIPTION);

  const { _id, balance } = findUser;
  const id = _id;
  const newBalance = { balance: balance + value };
  await depositTransferModel(id, newBalance);

  return { message: 'Depósito efetuado com sucesso!', cpf, value };
};
