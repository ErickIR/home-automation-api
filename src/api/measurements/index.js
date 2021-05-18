const express = require('express');
const measurementRouter = require('./routes/measurements');

const router = express.Router();

router.use('/measurements', measurementRouter);

module.exports = router;