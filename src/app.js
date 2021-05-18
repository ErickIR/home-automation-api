const express = require('express');
const logger = require('morgan');
const connectToMongoDb = require('./data/mongoContext');
const measurementsApi = require('./api/measurements/index');
const userApi = require('./api/users/index');

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../swagger.json');

const app = express();

connectToMongoDb();

app.use(logger('dev'));
app.use(express.json());

app.use(measurementsApi);
app.use(userApi);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use((err, req, res, next) => {
  res.status(400).json({error: err.message});
})

app.get('/health', (req, res) => {
  res.json({
    message: 'server is up!'
  })
});

module.exports = app;