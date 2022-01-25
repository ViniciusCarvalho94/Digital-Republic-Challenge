const transferSchema = require('../schemas/transferSchema');
const objError = require('../functions/objError');
const findUserModel = require('../models/findUserModel');
const depositTransferModel = require('../models/depositTransferModel');

const STATUS_400 = 400;
const DESCRIPTION = 'CPF ou valor inválidos, cpf no formato (xxx.xxx.xxx-xx)';

module.exports = async (fromAccount, { cpf, value }) => {
  const { error } = transferSchema.validate({ cpf, value });
  if (error) throw objError(STATUS_400, DESCRIPTION);

  const toUser = await findUserModel(cpf);
  if (!toUser) throw objError(STATUS_400, DESCRIPTION);

  const fromBalance = fromAccount.balance;
  if (fromBalance < value) throw objError(STATUS_400, 'Saldo insuficiente');

  const { _id: fromId } = fromAccount;
  const newFromBalance = { balance: fromBalance - value };
  await depositTransferModel(fromId, newFromBalance);

  const { _id: toId } = toUser;
  const newtoBalance = { balance: toUser.balance + value };
  await depositTransferModel(toId, newtoBalance);

  return { message: 'Transferência realida com sucesso!', cpf, value };
};
