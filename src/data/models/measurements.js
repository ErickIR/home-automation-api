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

const MeasurementsModel = mongoose.model(measurementsCollection.name, measurementsSchema);

module.exports = {
  MeasurementsModel,
  PowerModel: MeasurementsModel.discriminator('power', powerSchema),
  VolumeModel: MeasurementsModel.discriminator('volume', volumeSchema),
  WaterFlowModel: MeasurementsModel.discriminator('waterFlow', waterFlowSchema),
  WeightModel: MeasurementsModel.discriminator('weight', weightSchema),
};
