const mongoose = require('mongoose');

const trainingschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    tech: {
        type: String,
        required: true,
    },
    visa: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified : {
        type : Boolean
    }
});
//
module.exports = new mongoose.model('training-registration', trainingschema);
