const connection = require('./connection');

module.exports = async (cpf) => {
  const connect = await connection();
  const findUser = await connect.collection('clients')
    .findOne({ cpf });

  return findUser;
};
