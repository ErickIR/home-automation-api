const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const connectToMongoDb = require('./data/mongoContext');
const measurementsApi = require('./api/measurements/index');
const userApi = require('./api/users/index');
const errorHandlingMiddleware = require('./api/middlewares/common.errorhandling.middleware');
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../swagger.json');

const app = express();

connectToMongoDb();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(measurementsApi);
app.use(userApi);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandlingMiddleware);

app.get('/', (req, res) => {
  res.send('HOME AUTOMATION API');
});

app.get('/health', (req, res) => {
  res.json({
    message: 'server is up!',
  });
});

module.exports = app;
