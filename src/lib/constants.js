const STATUS_400 = 400;
const STATUS_401 = 401;
const DEPOSIT_DESCRIPTION = 'CPF ou valor inválidos, cpf no formato (xxx.xxx.xxx-xx) e valor inteiro entre 1 e 2000';
const TRANSFER_DESCRIPTION = 'CPF ou valor inválidos, cpf no formato (xxx.xxx.xxx-xx)';
const LOGIN_SCHEMA_DESCRIPTION = 'Preencha os dois campos';
const REGISTER_SCHEMA_DESCRIPTION = 'Digite o nome completo, cpf valido (xxx.xxx.xxx-xx) e senha de 6 caracteres';
const ALREADY_REGISTERED_DESCRIPTION = 'Úsuario já cadastrado';
const INSULFFICIENT_FUNDS_DESCRIPTION = 'Saldo insuficiente';
const LOGIN_DESCRIPTION = 'CPF ou senha inválidos';

const MONGODB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const MONGODB_URL = 'mongodb://localhost:27017/Bank';
const DB_NAME = 'Bank';

module.exports = {
  STATUS_400,
  STATUS_401,
  DEPOSIT_DESCRIPTION,
  TRANSFER_DESCRIPTION,
  LOGIN_SCHEMA_DESCRIPTION,
  REGISTER_SCHEMA_DESCRIPTION,
  ALREADY_REGISTERED_DESCRIPTION,
  INSULFFICIENT_FUNDS_DESCRIPTION,
  LOGIN_DESCRIPTION,
  MONGODB_OPTIONS,
  MONGODB_URL,
  DB_NAME,
};
