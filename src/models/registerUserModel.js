const connection = require('./connection');

module.exports = async (name, cpf) => {
  const connect = await connection();
  const { insertedId } = await connect.collection('clients')
    .insertOne({ name, cpf, balance: 0 });

  return insertedId;
};
