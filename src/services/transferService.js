const transferSchema = require('../schemas/transferSchema');
const objError = require('../functions/objError');
const findUserModel = require('../models/findUserModel');
const updateBalanceModel = require('../models/updateBalanceModel');
const { STATUS_400, TRANSFER_DESCRIPTION, INSULFFICIENT_FUNDS_DESCRIPTION } = require('../lib/constants');

function validateSchema(cpf, value) {
  const { error } = transferSchema.validate({ cpf, value });
  if (error) throw objError(STATUS_400, TRANSFER_DESCRIPTION);
}

async function findToUser(cpf) {
  const user = await findUserModel(cpf);
  if (!user) throw objError(STATUS_400, TRANSFER_DESCRIPTION);

  return user;
}

function validateFromUserBalance(fromBalance, toValue) {
  if (fromBalance < toValue) throw objError(STATUS_400, INSULFFICIENT_FUNDS_DESCRIPTION);
}

module.exports = async ({ _id: fromId, balance: fromBalance }, { cpf: toCpf, value: toValue }) => {
  validateSchema(toCpf, toValue);
  const { _id: toId, balance: toBalance } = await findToUser(toCpf);
  validateFromUserBalance(fromBalance, toValue);

  const newFromBalance = { balance: fromBalance - toValue };
  await updateBalanceModel(fromId, newFromBalance);

  const newtoBalance = { balance: toBalance + toValue };
  await updateBalanceModel(toId, newtoBalance);

  return { message: 'Transferência realida com sucesso!', cpf: toCpf, value: toValue };
};
