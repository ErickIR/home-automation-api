const express = require('express');
const logger = require('morgan');
const connectToMongoDb = require('./data/mongoContext');
const { Measurements, Power, Volume, WaterFlow, Weight } = require('./data/models/measurements.js');

const app = express();

connectToMongoDb();

app.use(logger('dev'));
app.use(express.json());

app.get('/', async (req, res) => {
  var measurements = await Measurements.find();
  res.send(measurements)
});

module.exports = app;
