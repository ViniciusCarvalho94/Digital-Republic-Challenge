const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { MONGODB_OPTIONS } = require('../lib/constants');

const mongoServer = new MongoMemoryServer();

const mockConnectionMongo = async () => {
  const mockUrl = await mongoServer.getUri();
  return MongoClient.connect(mockUrl, MONGODB_OPTIONS);
};

module.exports = { mockConnectionMongo };
