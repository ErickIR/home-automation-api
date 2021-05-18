const express = require('express');
const controller = require('../controllers/measurements.controller');

const measurementRouter = express.Router();

measurementRouter.get('/', controller.getMeasurementsByType);

measurementRouter.post('/power', controller.createPowerMeasurement);

measurementRouter.post('/volume', controller.createVolumeMeasurement);

measurementRouter.post('/water-flow', controller.createWaterFlowMeasurement);

measurementRouter.post('/weight', controller.createWeightMeasurement);

measurementRouter.delete('/reset', controller.resetCollection);

module.exports = measurementRouter;
