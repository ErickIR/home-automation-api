const express = require('express');
const measurementRouter = require('./routes/measurements.route');
const {
    validateJwt
} = require('../middlewares/auth.validation.middleware');
const router = express.Router();

router.use('/measurements', [validateJwt, measurementRouter]);

module.exports = router;