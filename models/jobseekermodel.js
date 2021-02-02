const mongoose = require('mongoose');

const jobseekerschema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
   mobile: {
        type: Number,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },

    experience: {
         type: Number,
         required: true,
     },

     resume: {
         type: String,
         required: true,
     },
     salary: {
         type: Number,
         required: true,
     },
     employment:{
         type: String,
         required: true,
     },
     relocate: {
         type: String,
         required: true,
     },
     visa: {
         type: String,
         required: true,
     },
    verified : {
        type : Boolean
    }
});
//
module.exports = new mongoose.model('jobseeker-registration', jobseekerschema);
