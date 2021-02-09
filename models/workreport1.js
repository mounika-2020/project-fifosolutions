const mongoose = require('mongoose');

const workreport1schema = new mongoose.Schema({
    candidate: {
        type: String,
        required: true,
    },
    jobtitle: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    vendor: {
        type: String,
        required: true,
    },
   email: {
        type: Number,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },
    client: {
        type: String,
        required: true,
    },
    payrate:{
        type: String,
        required: true,
    },

    text: {
         type: String,
         required: true,
     },
});
//
module.exports = new mongoose.model('workreport', workreport1schema);
