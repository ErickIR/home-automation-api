const mongoose = require('mongoose');
const { dbConnection } = require('../config');

const { scheme, host, user, password, dbName } = dbConnection;

const dbUri = `${scheme}://${user}:${password}@${host}/${dbName}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

console.log(`Mongo DB URI: ${dbUri}`);

module.exports = function () {
  mongoose
    .connect(dbUri, options)
    .then(() => {
      console.log('MONGO DB CONNECTION DONE');
    })
    .catch((error) => {
      console.log('MONGO DB CONNECTION ERROR: ' + error.message);
    });
};
