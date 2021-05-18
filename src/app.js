const express = require('express');
const logger = require('morgan');
const connectToMongoDb = require('./data/mongoContext');
const { Measurements, Power, Volume, WaterFlow, Weight } = require('./data/models/measurements.js');

const app = express();

connectToMongoDb();

app.use(logger('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  const power = new Power({
    amperage: 1.0,
    voltage: 1.0,
    appaPower: 1.0,
    current: 1.0,
    powerFact: 1.0,
    realPower: 1.0,
  });
  const volume = new Volume({ gallons: 1.0 });
  const waterFlow = new WaterFlow({ flow: 1.0 });
  const weight = new Weight({ pounds: 1.0 });

  Promise.all([power.save(), volume.save(), waterFlow.save(), weight.save()])
    .then(() => Measurements.find())
    .then((result) => {
      res.json({
        result,
      });
    });
});

module.exports = app;
