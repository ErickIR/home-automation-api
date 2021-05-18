const mongoose = require('mongoose');
const { measurementsCollection } = require('../../config');

const measurementsSchema = mongoose.Schema({
  timeStamp: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const powerSchema = mongoose.Schema({
  amperage: {
    type: Number,
    required: true,
  },
  voltage: {
    type: Number,
    required: true,
  },
  appaPower: {
    type: Number,
    required: true,
  },
  current: {
    type: Number,
    required: true,
  },
  powerFact: {
    type: Number,
    required: true,
  },
  realPower: {
    type: Number,
    required: true,
  },
});

const volumeSchema = mongoose.Schema({
  gallons: {
    type: Number,
    required: true,
  },
});

const waterFlowSchema = mongoose.Schema({
  flow: {
    type: Number,
    required: true,
  },
});

const weightSchema = mongoose.Schema({
  pounds: {
    type: Number,
    required: true,
  },
});

const Measurements = mongoose.model(measurementsCollection.name, measurementsSchema);
const Power = Measurements.discriminator('power', powerSchema);
const Volume = Measurements.discriminator('volume', volumeSchema);
const WaterFlow = Measurements.discriminator('waterFlow', waterFlowSchema);
const Weight = Measurements.discriminator('weight', weightSchema);

module.exports = {
  Measurements,
  Power,
  Volume,
  WaterFlow,
  Weight,
};
