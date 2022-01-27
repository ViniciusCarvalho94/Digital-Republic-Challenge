const objError = require('../functions/objError');
const findUserModel = require('../models/findUserModel');
const updateBalanceModel = require('../models/updateBalanceModel');
const depositSchema = require('../schemas/depositSchema');
const { STATUS_400, DEPOSIT_DESCRIPTION } = require('../lib/constants');

function validateSchema(cpf, value) {
  const { error } = depositSchema.validate({ cpf, value });
  if (error) throw objError(STATUS_400, DEPOSIT_DESCRIPTION);
}

async function findUser(cpf) {
  const user = await findUserModel(cpf);
  if (!user) throw objError(STATUS_400, DEPOSIT_DESCRIPTION);

  return user;
}

module.exports = async (cpf, value) => {
  validateSchema(cpf, value);
  const { _id: id, balance } = await findUser(cpf);
  const newBalance = { balance: balance + value };
  await updateBalanceModel(id, newBalance);

  return { message: 'Depósito efetuado com sucesso!', cpf, value };
};
