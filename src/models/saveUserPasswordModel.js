const connection = require('./connection');

module.exports = async (cpf, password) => {
  const connect = await connection();
  await connect.collection('passwords')
    .insertOne({ cpf, password });
};
