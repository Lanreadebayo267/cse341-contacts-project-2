const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDb = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);

    database = client.db();

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
};

const getDb = () => {
  if (!database) {
    throw Error('Database not found');
  }

  return database;
};

module.exports = {
  initDb,
  getDb
};