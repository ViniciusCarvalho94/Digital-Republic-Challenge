const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer();
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const mockConnectionMongo = async () => {
  const mockUrl = await mongoServer.getUri();
  return MongoClient.connect(mockUrl, OPTIONS);
};

module.exports = { mockConnectionMongo };
