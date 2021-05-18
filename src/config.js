const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  dbConnection: {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    host: process.env.MONGO_HOST || '',
    scheme: process.env.MONGO_SCHEME || '',
    dbName: process.env.DB_NAME || '',
  },
  userCollection: {
    name: process.env.USERS_COLLECTION || '',
  },
  measurementsCollection: {
    name: process.env.MEASUREMENTS_COLLECTION || '',
  },
  jwtConfig: {
    secret: process.env.SECRET || '',
    expire: process.env.EXPIRE_AT || '',
  }
};
