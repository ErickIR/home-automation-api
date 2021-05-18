const crypto = require('crypto');
const Users = require('../models/users.model');
const jwt = require('jsonwebtoken');
const {
    jwtConfig
} = require('../../../config');

const getUserById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await Users.findById(id);
        res.status(200).json(user);
    } catch (err) {
        err.status = 500;
        next(err);
    }
}

const registerNewUser = async (req, res, next) => {
    const user = new Users({
        ...req.body
    });

    try {
        const userExists = await Users.find({
            username: user.username
        });

        if (userExists.length) {
            throw new Error('Username already exists');
        }

        let salt = crypto
            .randomBytes(16)
            .toString('base64');
        let hash = crypto.createHmac('sha512', salt)
            .update(user.password)
            .digest('base64');

        user.password = hash;
        user.passwordSalt = salt;
        const createdUser = await user.save();
        res.status(200).json(createdUser);
    } catch (err) {
        next(err);
    }
}

const loginRegisteredUser = async (req, res, next) => {
    const userCredentials = req.body;

    try {
        const userExists = await Users
            .find({
                username: userCredentials.username
            })
            .select('_id username password passwordSalt');

        if (!userExists[0]) {
            return res.status(401).json({
                result: false,
                message: 'Invalid username/password.1'
            });
        }

        const registeredUser = userExists[0]
        const hashedPassword = registeredUser.password;
        const salt = registeredUser.passwordSalt;

        const hashToCompare = crypto.createHmac('sha512', salt)
            .update(userCredentials.password)
            .digest('base64');

        if (hashedPassword == hashToCompare) {
            return res.status(200).json({
                result: true,
                token: jwt.sign({
                    id: userExists[0]._id
                }, jwtConfig.secret, { algorithm: 'HS256'}),
                message: 'Succesfully login.'
            })
        } else {
            return res.status(401).json({
                result: false,
                message: 'Invalid username/password.2'
            })
        }


    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUserById,
    registerNewUser,
    loginRegisteredUser
}