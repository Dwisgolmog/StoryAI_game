const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PW}@stone.jf0hj90.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true, // 이 줄을 추가했습니다.
  useUnifiedTopology: true, // 이 줄을 추가했습니다.
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = client;
