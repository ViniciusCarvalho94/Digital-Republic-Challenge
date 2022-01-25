const connection = require('./connection');

module.exports = async (cpf) => {
  const connect = await connection();
  const { password } = await connect.collection('passwords')
    .findOne({ cpf });

  return password;
};
