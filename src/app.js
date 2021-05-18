const express = require('express');
const logger = require('morgan');
const connectToMongoDb = require('./data/mongoContext');
const {
  MeasurementsModel,
  PowerModel,
  VolumeModel,
  WaterFlowModel,
  WeightModel,
} = require('./data/models/measurements.js');

const app = express();

connectToMongoDb();

app.use(logger('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  const power = new PowerModel({
    amperage: 1.0,
    voltage: 1.0,
    appaPower: 1.0,
    current: 1.0,
    powerFact: 1.0,
    realPower: 1.0,
  });
  const volume = new VolumeModel({ gallons: 1.0 });
  const waterFlow = new WaterFlowModel({ flow: 1.0 });
  const weight = new WeightModel({ pounds: 1.0 });

  Promise.all([power.save(), volume.save(), waterFlow.save(), weight.save()])
    .then(() => MeasurementsModel.find())
    .then((result) => {
      res.json({
        result,
      });
    });
});

module.exports = app;
