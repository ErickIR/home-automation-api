const mongoose = require('mongoose')
const { userCollection } = require('../../../config')

const usersSchema = mongoose.Schema({
    timeStamp: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    passwordSalt: {
        type: String,
        required: false,
        select: false,
    }
});

const User = mongoose.model(userCollection.name, usersSchema);

exports.findByUsername = (username) => {
    return Users.find({username});
};

module.exports = User;