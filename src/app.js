const express = require('express');
const logger = require('morgan');
const connectToMongoDb = require('./data/mongoContext');
const measurementsApi = require('./api/measurements/index');

const app = express();

connectToMongoDb();

app.use(logger('dev'));
app.use(express.json());

app.use(measurementsApi);

app.get('/health', (req, res) => {
  res.json({
    message: 'server is up!'
  })
});

module.exports = app;
