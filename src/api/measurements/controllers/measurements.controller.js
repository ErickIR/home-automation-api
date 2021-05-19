const { Measurements, Power, Volume, WaterFlow, Weight } = require('../models/measurements.model');

const getMeasurementsByType = (req, res, next) => {
  const measureType = req.params.measureType;

  if (!measureType) {
    throw new Error('Measure Type should be required in params');
  }

  Measurements.find({
    __t: measureType,
    userId: req.user.id,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
};

const createPowerMeasurement = async (req, res, next) => {
  const newMeasure = new Power({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const createResult = await newMeasure.save();
    res.status(200).json(createResult);
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

const createVolumeMeasurement = async (req, res, next) => {
  const newMeasure = new Volume({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const createResult = await newMeasure.save();
    res.status(200).json(createResult);
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

const createWaterFlowMeasurement = async (req, res, next) => {
  const newMeasure = new WaterFlow({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const createResult = await newMeasure.save();
    res.status(200).json(createResult);
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

const createWeightMeasurement = async (req, res, next) => {
  const newMeasure = new Weight({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const createResult = await newMeasure.save();
    res.status(200).json(createResult);
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

const resetCollection = async (req, res, next) => {
  try {
    const deleted = await Measurements.deleteMany();
    res.status(200).json(deleted);
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

module.exports = {
  getMeasurementsByType,
  createPowerMeasurement,
  createVolumeMeasurement,
  createWaterFlowMeasurement,
  createWeightMeasurement,
  resetCollection,
};
