const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        default: null
    },
    firstname: {
        type: String,
        default: null
    },
    lastname: {
        type: String,
        default: null
    },
    picture: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    verified: {
        type: Boolean,
        default: false
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
