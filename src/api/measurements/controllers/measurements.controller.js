const {
    Measurements,
    Power,
    Volume,
    WaterFlow,
    Weight
} = require('../models/measurements.model');

const getMeasurementsByType = (req, res) => {
    const measureType = req.query.measureType;
    Measurements.find({
            __t: measureType,
            userId: req.user.id,
        })
        .then(result => {
            res.status(200).json(result);
        }).catch((error) => {
            res.status(400).json(error);
        })
}

const createPowerMeasurement = async (req, res) => {
    const newMeasure = new Power({
        ...req.body,
        userId: req.user.id
    })
    try {
        const createResult = await newMeasure.save();
        res.status(200).json(createResult);
    } catch (e) {
        res.status(500).json(e);
    }
}

const createVolumeMeasurement = async (req, res) => {
    const newMeasure = new Volume({
        ...req.body,
        userId: req.user.id
    })
    try {
        const createResult = await newMeasure.save();
        res.status(200).json(createResult);
    } catch (e) {
        res.status(500).json(e);
    }
}

const createWaterFlowMeasurement = async (req, res) => {
    const newMeasure = new WaterFlow({
        ...req.body,
        userId: req.user.id
    })
    try {
        const createResult = await newMeasure.save();
        res.status(200).json(createResult);
    } catch (e) {
        res.status(500).json(e);
    }
}

const createWeightMeasurement = async (req, res) => {
    const newMeasure = new Weight({
        ...req.body,
        userId: req.user.id
    })
    try {
        const createResult = await newMeasure.save();
        res.status(200).json(createResult);
    } catch (e) {
        res.status(500).json(e);
    }
}

const resetCollection = async (req, res) => {
    try {
        const deleted = await Measurements.deleteMany()
        res.status(200).json(deleted);
    } catch (e) {
        res.status(500).json(e.message);
    }
}


module.exports = {
    getMeasurementsByType,
    createPowerMeasurement,
    createVolumeMeasurement,
    createWaterFlowMeasurement,
    createWeightMeasurement,
    resetCollection
}