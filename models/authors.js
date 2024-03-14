const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 250,
    },
    surname: {
        type: String,
        max: 250,
    },
    email: {
        type: String,
    },
    birthday: {
        type: String,
    },
    avatar: {
        type: String,
        max: 250
    }
}, {timestamps: true, strict: true});

module.exports = mongoose.model('userModel', UserSchema, 'users')