const mongoose = require('mongoose');

const benchsalesaccountschema = new mongoose.Schema({
    position: {
        type: String,
        required: true,
    },
    client: {
        type: String,
        required: true,
    },
    visa: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
   vendor: {
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
    location:{
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    contacted: {
        type: String,
        required: true,
    },
    payrate:{
        type: String,
        required: true,
    },

    status: {
         type: String,
         required: true,
     },
});
//
module.exports = new mongoose.model('benchsalesaccount', benchsalesaccountschema);
