const { ObjectId } = require('mongodb');

const connection = require('./connection');

module.exports = async (id, newBalance) => {
  const connect = await connection();
  const response = connect.collection('clients')
    .updateOne({ _id: ObjectId(id) }, { $set: { ...newBalance } });

  return response;
};
