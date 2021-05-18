const express = require('express');
const controller = require('../controllers/users.controller');
const {
    validateJwt
} = require('../../middlewares/auth.validation.middleware');
const userRouter = express.Router();

userRouter.get('/:id', [validateJwt, controller.getUserById]);

userRouter.post('/', controller.registerNewUser);

userRouter.post('/login', controller.loginRegisteredUser);

module.exports = userRouter;